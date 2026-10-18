// Exercise the actual bridge class without starting Electron or device services.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { transformSync } = require('@swc/core');
const source = fs.readFileSync(new URL('../src/main/bridge.ts', `file://${__filename}`), 'utf8');
const code = transformSync(source.slice(source.indexOf('export class BridgeOutput'))
  .replace('export class BridgeOutput', 'exports.BridgeOutput = class BridgeOutput'), { jsc: { parser: { syntax: 'typescript' }, target: 'es2022' } }).code;
const context = { exports: {}, clamp: (x, lo, hi) => Math.min(hi, Math.max(lo, x)) };
vm.runInNewContext(code, context);
const feature = { type: 'vibrate' };
const bridge = new context.exports.BridgeOutput(feature, {}, { entries: () => new Map() });
const config = { links: [{ kind: 'systemAudio', mutators: [
  { kind: 'motionBased' }, { kind: 'deadZone', level: 0 },
  { kind: 'smooth', riseSeconds: 1, fallSeconds: 2 },
] }] };
const sample = value => bridge.getLinkOutputs([], value, config, 100)[0];
assert.equal(sample(0).output, 0);
assert.ok(Math.abs(sample(1).output - 0.1) < 1e-9, 'smooth limits rise after motion and dead zone');
assert.ok(Math.abs(sample(1).output - 0.05) < 1e-9, 'smooth limits fall');
config.links[0].mutators = [{ kind: 'motionBased' }, { kind: 'deadZone', level: 0.5 }];
const reverse = sample(0.75);
assert.equal(reverse.output, 0, 'motion velocity is transformed before dead zone');
assert.equal(reverse.backward, true);
feature.type = 'linear';
assert.equal(sample(1).output, 0, 'audio cannot drive linear actuators');
console.log('Bridge motion, smoothing, direction and linear guards passed');

# OscGoesBrrr - NX-Patches

An unofficial fork of [OscGoesBrrr](https://github.com/OscToys/OscGoesBrrr) with patches by NX.

## Differences from upstream

- **New per-link "Smooth" mutator.** Ramps intensity changes over configurable rise and fall times.
  This is for toys that switch vibration programs based on intensity and never settle when values
  jump instantly — smoothing the transitions keeps them in one program instead of constantly
  re-triggering.
- **Renamed app identity and separate config directory.** The fork uses its own app id, product
  name and user data directory, so it installs and runs alongside a stock OscGoesBrrr install
  without conflicting.
- **Auto-updater disabled.** The app will never download or install upstream builds over itself.

## Upstream

Check out [osc.toys](https://osc.toys) for downloads and documentation of the original app.

## License and attribution

Licensed under CC BY-NC-SA 4.0. Original work by [OscToys](https://github.com/OscToys/OscGoesBrrr);
this fork is a derivative work distributed under the same license. See [LICENSE](LICENSE).

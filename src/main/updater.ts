import {Service} from "typedi";
import {handleIpc} from "./ipc";

interface AvailableUpdateInfo {
    version?: string;
    downloadUrl?: string;
    status: 'downloading' | 'installIpc' | 'download' | 'error';
}

/**
 * Auto-updating is permanently disabled in the NX-Patches fork.
 *
 * The upstream updater downloads and installs builds from updates.osc.toys, which would
 * replace this fork with the stock OscGoesBrrr app. The class, its IPC registration and its
 * public methods are kept so the frontend contract is unchanged: no update is ever reported,
 * so the update banner never appears, and installAvailableUpdate() always throws.
 */
@Service()
export default class Updater {
    private availableUpdate?: AvailableUpdateInfo;
    private pendingInstallAction?: () => void;

    constructor() {
        handleIpc('updater:install', async () => {
            await this.installAvailableUpdate();
        });
        void this.checkAndNotify();
    }

    getAvailableUpdate() {
        return this.availableUpdate;
    }

    async checkAndNotify() {
        console.log("Auto-update disabled in NX-Patches fork");
    }

    async installAvailableUpdate() {
        if (!this.pendingInstallAction) {
            throw new Error("Update is not ready to install yet");
        }
        this.pendingInstallAction();
    }
}

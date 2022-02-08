const { Plugin } = require("powercord/entities");
const DeviceManager = require('./lib/DeviceManager');
const ProcessWatch = require('./lib/ProcessWatch');
const Settings = require("./components/Settings");

module.exports = class PSpectrum extends Plugin {
  #watcher = null;

  startPlugin() {

    // register settings
    powercord.api.settings.registerSettings("vraudio-switch", {
      category: this.entityID,
      label: "VR Audio Switch",
      render: Settings,
    });

    // watch SteamVR process
    this.#watcher = new ProcessWatch(this.settings.get("process", "VirtualDesktop.Server.exe"));

    // handle state changes
    this.#watcher.on("stateChanged", isVR => {
      // get devices
      let normalDevice = DeviceManager.getDevice(this.settings.get("normalDevice", "default"));
      let vrDevice = DeviceManager.getDevice(this.settings.get("vrDevice", "Virtual Desktop Audio"));

      // switch to device depending on state
      if (isVR) {
        DeviceManager.setDevice(vrDevice);
      } else {
        DeviceManager.setDevice(normalDevice);
      }
    });

    // handle errors
    this.#watcher.on("error", e => console.error(`%c[VR Audio Switch] ${e}`, "color: red"));

  }

  pluginWillUnload() {
    // revert audio
    this.switchTo(normalDevice)

    // stop watching SteamVR process
    this.#watcher.destroy();

    // unregister settings
    powercord.api.settings.unregisterSettings("vraudio-switch");
  }
};
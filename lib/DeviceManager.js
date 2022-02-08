const Device = require('./Device');

const { getModule } = require("powercord/webpack");
const { setInputDevice, setOutputDevice } = getModule(["setInputDevice", "setOutputDevice"], false);
const { getInputDevices, getOutputDevices } = getModule(["getOutputDevices", "getInputDevices"], false);

module.exports = class DeviceManager {
  #DeviceManager() {
    // do nothing
  }

  static getDevice(name) {
    let input = Object.values(getInputDevices()).filter(d => d.name.includes(name))[0] || { name: "", index: -1, id: "", disabled: true };
    let output = Object.values(getOutputDevices()).filter(d => d.name.includes(name))[0] || { name: "", index: -1, id: "", disabled: true };

    return new Device(name, input, output);
  }

  static setDevice(device) {
    console.log(`Switching to ${device.name}...`);

    setInputDevice(device.input.id);
    setOutputDevice(device.output.id);
  }
}
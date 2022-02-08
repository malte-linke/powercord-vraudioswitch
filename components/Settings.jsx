const { React } = require("powercord/webpack");
const { TextInput } = require("powercord/components/settings");

const Settings = ({ getSetting, updateSetting }) => {
  return (
    <div>

      <TextInput
        style={{ marginTop: "16px" }}
        note="Set this to the name of your normal audio device."
        value={(getSetting("normalDevice", "default")).toString()}
        onChange={(value) => updateSetting("normalDevice", value)}
      >
        Normal Input Device Name
      </TextInput>

      <TextInput
        style={{ marginTop: "16px" }}
        note="Set this to the name of your audio device that is used when you play VR."
        value={(getSetting("vrDevice", "Virtual Desktop Audio")).toString()}
        onChange={(value) => updateSetting("vrDevice", value)}
      >
        VR Input Device Name
      </TextInput>

      <TextInput
        style={{ marginTop: "16px" }}
        note="This is the process to watch for when you are in VR. If you are using a custom process, you can set it here."
        value={(getSetting("process", "VirtualDesktop.Server.exe")).toString()}
        onChange={(value) => updateSetting("process", value)}
      >
        Trigger Process (Reload required!)
      </TextInput>
    </div>
  );
};

module.exports = Settings;
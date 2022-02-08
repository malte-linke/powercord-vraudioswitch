module.exports = class Device {
  name = "";
  input = "";
  output = "";

  constructor (name, input, output) {
    this.name = name;
    this.input = input;
    this.output = output;
  }
}
const EventEmitter = require('events');
const { spawn } = require('child_process');

module.exports = class ProcessWatch extends EventEmitter {
  #process = "";
  #lastState = null;
  #destroyed = false;

  constructor (process, interval = 1000) {
    super();
    this.#process = process;

    // start checking
    this.#checkInterval(interval);
  }

  destroy() {
    this.removeAllListeners();
    this.#destroyed = true;
  }

  #checkInterval(delay) {
    let data = "";
    let process = spawn(`tasklist`, [`/FI`, `IMAGENAME eq ${this.#process}`], { stdio: ["pipe", "pipe", "pipe"] });

    // capture result
    process.stdout.on("data", msg => data += msg.toString());

    // handle errors
    process.once("error", e => this.emit("error", e));

    // wait for process to exit
    process.once("exit", () => {
      let currentState = data.includes(this.#process);

      // emit event if state changed
      if (currentState !== this.#lastState) {
        this.emit("stateChanged", currentState);
        this.#lastState = currentState;
      }

      if (this.#destroyed) return;

      // check again in delay
      setTimeout(() => this.#checkInterval(delay), delay);
    });
  }
}
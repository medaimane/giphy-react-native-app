export interface Timer {
  start(callback: () => void, timeout: number): void;
  stop: () => void;
}

export class TimerImpl implements Timer {
  private timerHandler?: number;

  start(callback: () => void, timeout: number): void {
    this.timerHandler = setInterval(callback, timeout) as any;
  }

  stop() {
    clearInterval(this.timerHandler);
    this.timerHandler = undefined;
  }
}

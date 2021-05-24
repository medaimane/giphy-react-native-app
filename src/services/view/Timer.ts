export interface Timer {
  start(callback: () => void, timeout: number): void;
}

export class TimerImpl implements Timer {
  start(callback: () => void, timeout: number): void {
    setInterval(callback, timeout);
  }
}

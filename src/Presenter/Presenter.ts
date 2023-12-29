export type PartialUpdateHandler<Output> = (output: Partial<Output>) => void;

export abstract class Presenter<Output> {
  private updateHandler?: PartialUpdateHandler<Output>;

  abstract getInitialOutput(): Output;

  setUpdateHandler(updateHandler: PartialUpdateHandler<Output>): void {
    this.updateHandler = updateHandler;
  }

  protected update(output: Partial<Output>): void {
    if (this.updateHandler) {
      this.updateHandler(output);
    } else {
      throw new Error(
        'Presenter: you must set updateHandler before calling update: ' + this
      );
    }
  }
}

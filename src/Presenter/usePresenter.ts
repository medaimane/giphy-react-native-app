import {Presenter} from './Presenter';
import {useRef, useState} from 'react';

export function usePresenter<T>(presenter: Presenter<T>): T {
  const [state, setState] = useState(presenter.getInitialOutput());

  presenter.setUpdateHandler((output) => {
    setState((prevState) => ({
      ...prevState,
      ...output,
    }));
  });

  return state;
}

type ExtractOutput<P> = P extends Presenter<infer T> ? T : never;

export function usePresenterFactory<P extends Presenter<ExtractOutput<P>>>(
  factory: () => P
): {
  state: ExtractOutput<P>;
  presenter: P;
} {
  const presenterRef = useRef<P | null>(null);

  function getInstance() {
    if (!presenterRef.current) {
      presenterRef.current = factory();
    }

    return presenterRef.current;
  }

  const presenter = getInstance();

  return {
    state: usePresenter(presenter),
    presenter,
  };
}

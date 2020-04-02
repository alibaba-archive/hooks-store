import { useState, useEffect } from 'react';
import Dispatcher from './dispatcher';
import { Models } from './types';

export default function<Ms extends Models = Models>(useContext) {
  function useModel<K extends keyof Ms>(
    namespace: K,
  ): ReturnType<Ms[K]> {
    const dispatcher = useContext() as Dispatcher;
    const data = dispatcher.data[namespace];
    if (!dispatcher.callbacks[namespace]) {
      dispatcher.callbacks[namespace] = new Set();
    }
    const callbacks = dispatcher.callbacks[namespace];
    const [state, setState] = useState(() => data);

    useEffect(() => {
      const handler = (e: any) => {
        setState(e);
      };

      callbacks.add(handler);
      return () => {
        callbacks.delete(handler);
      };
    }, [callbacks, namespace]);

    return state;
  }

  return useModel;
}

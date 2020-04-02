import { useContext, createContext, Context } from 'react';
import Dispatcher from './dispatcher';

export interface UseIcestoreContext<T=any> {
  (): T;
}

export interface IcestoreContextContent<T=any> {
  context: Context<T>,
  useContext: UseIcestoreContext<T>,
}

export default function(): IcestoreContextContent {
  const ReactIcestoreContext = createContext(null);

  if (process.env.NODE_ENV !== 'production') {
    ReactIcestoreContext.displayName = 'ReactIcestore';
  }

  const useIcestoreContext: UseIcestoreContext = function () {
    const contextValue = useContext(ReactIcestoreContext);

    if (process.env.NODE_ENV !== 'production' && !contextValue) {
      throw new Error(
        'could not find icestore-next context value; please ensure the component is wrapped in a <Provider>',
      );
    }

    return contextValue as Dispatcher;
  }

  return {
    context: ReactIcestoreContext,
    useContext: useIcestoreContext,
  };
}

import { useContext, createContext, Context } from 'react';

export interface UseIcestoreContext<T=any> {
  (): T;
}

export interface IcestoreContextContent<T=any> {
  context: Context<T>;
  useContext: UseIcestoreContext<T>;
}

export default function<T>(): IcestoreContextContent<T> {
  const ReactIcestoreContext = createContext(null);

  if (process.env.NODE_ENV !== 'production') {
    ReactIcestoreContext.displayName = 'ReactIcestore';
  }

  const useIcestoreContext: UseIcestoreContext = function () {
    const contextValue = useContext(ReactIcestoreContext);

    if (process.env.NODE_ENV !== 'production' && !contextValue) {
      throw new Error(
        'could not find hooks-store context value; please ensure the component is wrapped in a <Provider>',
      );
    }

    return contextValue;
  };

  return {
    context: ReactIcestoreContext,
    useContext: useIcestoreContext,
  };
}

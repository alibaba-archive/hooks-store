import Dispatcher from './dispatcher';
import createContext from './createContext';
import createProvider from './createProvider';
import createUseHook from './createUseHook';
import createGetHook from './createGetHook';
import createWithHook from './createWithHook';
import { Hooks } from './types';

export const createStore = function<H extends Hooks>(hooks: H) {
  const dispatcher = new Dispatcher();
  const { context, useContext } = createContext<Dispatcher>();
  const Provider = createProvider(context, dispatcher, hooks);
  const useHook = createUseHook<H>(useContext);
  const getHook = createGetHook<H>(dispatcher);
  const withHook = createWithHook<H>(useHook);

  return {
    Provider,
    useHook,
    getHook,
    withHook,
  };
};

export default createStore;

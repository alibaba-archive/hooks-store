import Dispatcher from './dispatcher';
import createContext from './createContext';
import createProvider from './createProvider';
import createUseModel from './createUseModel';
import createGetModel from './createGetModel';
import createWithModel from './createWithModel';
import { Models } from './types';

export const createStore = function<M extends Models>(models: M) {
  const dispatcher = new Dispatcher();
  const { context, useContext } = createContext<Dispatcher>();
  const Provider = createProvider(context, dispatcher, models);
  const useModel = createUseModel<M>(useContext);
  const getModel = createGetModel<M>(dispatcher);
  const withModel = createWithModel<M>(useModel);

  return {
    Provider,
    useModel,
    getModel,
    withModel,
  };
};

export default createStore;

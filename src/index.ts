import Dispatcher from './dispatcher';
import createContext from './createContext';
import createProvider from './createProvider';
import createUseModel from './createUseModel';
import createGetModel from './createGetModel';
import createWithModel from './createWithModel';
import { Models } from './types';

export const createStore = function(models: Models) {
  const { context, useContext } = createContext();
  const dispatcher = new Dispatcher();
  type IModels = typeof models;
  const Provider = createProvider(context, dispatcher, models);
  const useModel = createUseModel<IModels>(useContext);
  const getModel = createGetModel(dispatcher);
  const withModel = createWithModel<IModels>(useModel);

  return {
    Provider,
    useModel,
    getModel,
    withModel,
  };
};


export default createStore;

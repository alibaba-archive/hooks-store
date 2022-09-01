import Dispatcher from './dispatcher';
import { Hooks } from './types';

export default function createGetHook<Hs extends Hooks = Hooks>(dispatcher: Dispatcher) {
  return function <K extends keyof Hs>(namespace: K): ReturnType<Hs[K]> {
    return dispatcher.data[namespace];
  };
}

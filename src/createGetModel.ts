import Dispatcher from './dispatcher';
import { Models } from './types';

export default function<Ms extends Models = Models>(dispatcher: Dispatcher) {
  return function<K extends keyof Ms>(namespace: K): ReturnType<Ms[K]> {
    return dispatcher.data[namespace];
  };
}

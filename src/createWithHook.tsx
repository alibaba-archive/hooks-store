import React from 'react';
import { Hooks } from './types';

type Optionalize<T extends K, K> = Omit<T, keyof K>;

export default function createWithHook<Ms extends Hooks = Hooks>(useHook) {
  return function withHook<
    K extends keyof Ms,
    M extends (hook: ReturnType<Ms[K]>) => Record<string, any>
  >(namespace: K, mapHookToProps?: M) {
    mapHookToProps = (mapHookToProps || ((hooks: ReturnType<Ms[K]>) => ({ [namespace]: hooks }))) as M;
    return <R extends ReturnType<typeof mapHookToProps>, P extends R>(Component: React.ComponentType<P>) => {
      return (props: Optionalize<P, R>): React.ReactElement => {
        const value = useHook(namespace);
        const withProps = mapHookToProps(value);
        return (
          <Component
            {...withProps}
            {...(props as P)}
          />
        );
      };
    };
  };
}

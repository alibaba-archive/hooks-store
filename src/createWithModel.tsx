import React from 'react';
import { Models } from './types';

type Optionalize<T extends K, K> = Omit<T, keyof K>;

export default function<Ms extends Models = Models>(useModel) {
  return function withModel<
    K extends keyof Ms,
    M extends (model: ReturnType<Ms[K]>) => Record<string, any>
  >(namespace: K, mapModelToProps?: M) {
    mapModelToProps = (mapModelToProps || ((model: ReturnType<Ms[K]>) => ({ [namespace]: model }))) as M;
    return <R extends ReturnType<typeof mapModelToProps>, P extends R>(Component: React.ComponentType<P>) => {
      return (props: Optionalize<P, R>): React.ReactElement => {
        const value = useModel(namespace);
        const withProps = mapModelToProps(value);
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

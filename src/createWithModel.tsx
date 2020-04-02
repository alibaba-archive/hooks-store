import React from 'react';

type Optionalize<T extends K, K> = Omit<T, keyof K>;

export default function<Models>(useModel) {
  return function withModel<K extends keyof Models, M extends (model: any) => Record<string, any>>(namespace: K, mapModelToProps?: M) {
    mapModelToProps = (mapModelToProps || ((model) => ({ [namespace]: model }))) as M;
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
  }
}

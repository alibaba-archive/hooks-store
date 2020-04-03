import React, { Context } from 'react';
import Executor from './executor';
import Dispatcher from './dispatcher';
import { Models } from './types';

export default function(context: Context<Dispatcher>, dispatcher: Dispatcher, models: Models) {
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <context.Provider value={dispatcher}>
        {Object.keys(models).map(namespace => {
          const useValue = models[namespace];
          return (
            <Executor
              key={namespace}
              namespace={namespace}
              useValue={useValue}
              onUpdate={(val) => {
                dispatcher.data[namespace] = val;
                dispatcher.update(namespace);
              }}
            />
          );
        })}
        {children}
      </context.Provider>
    );
  };
}

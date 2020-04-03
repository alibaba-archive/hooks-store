export type useValue =
  (...args: any) => any;

export interface Models {
  [key: string]: useValue;
}

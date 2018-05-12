declare module 'annotation' {
  interface performanceLogType {
    (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>
  }
  type methodsType = {
      [methodName: string]: {
          methodCallBeforeLog: number,
          calls: number
      }
  };
  export function performanceLog (methodCallBeforeLog: number): performanceLogType;
  export function setLogger (newLogger: any): void;
}

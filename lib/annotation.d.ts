declare module 'performance_annotation' {
  interface performanceLogType {
    (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>
  }
  type methodsType = {
      [methodName: string]: {
          methodCallBeforeLog: number,
          calls: number
      }
  };
  export default function performanceLog (methodCallBeforeLog?: number | null): performanceLogType;
  export function setLogger (newLogger: any): void;
}

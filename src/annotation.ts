import { performance } from 'perf_hooks';
// import util from 'util';
// const debug = util.debuglog('performance');

type methodsType = {
    [methodName: string]: {
        methodCallBeforeLog: number,
        calls: number
    }
};

interface performanceLogType {
  (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>
}

let logger: any = console.log;
const methods: methodsType = {};

export const setLogger = (newLogger: any): void => {
    logger = newLogger;
}

const performanceLog = (methodCallBeforeLog?: number | null): performanceLogType => {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (methodCallBeforeLog) {
            if (typeof methodCallBeforeLog !== "number") {
                throw new Error("methodCallBeforeLog must be a number");
            }
            if (!methods[propertyKey]) {
                let roundedMethodCallBeforeLog: number = Math.round(methodCallBeforeLog);
                methods[propertyKey] = {
                    methodCallBeforeLog: roundedMethodCallBeforeLog,
                    calls: 0
                }
            }
        }
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            performance.mark('starting method');
            const result = originalMethod.apply(this, args);
            performance.mark('ending method');
            performance.measure('getting method measure', 'starting method', 'ending method');
            const [methodMeasure] = performance.getEntriesByType('measure');
            let methodCalls = methods[propertyKey];
            if (methodCalls) {
                let { calls: timesCalled } = methodCalls;
                timesCalled++
                methodCalls = { ...methodCalls, calls: timesCalled };
                if (methodCalls.calls === methodCalls.methodCallBeforeLog) {
                    logger(`method measure is ${methodMeasure.duration}`);
                    methodCalls = { ...methodCalls, calls: 0 };
                }
                methods[propertyKey] = methodCalls;
            } else {
                logger(`method measure is ${methodMeasure.duration}`);
            }
            return result;
        };
        return descriptor;
    }
}

export default performanceLog;

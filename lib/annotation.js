"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var perf_hooks_1 = require("perf_hooks");
var logger = console.log;
var methods = {};
exports.setLogger = function (newLogger) {
    logger = newLogger;
};
var performanceLog = function (methodCallBeforeLog) {
    return function (target, propertyKey, descriptor) {
        if (methodCallBeforeLog) {
            if (typeof methodCallBeforeLog !== "number") {
                throw new Error("methodCallBeforeLog must be a number");
            }
            if (!methods[propertyKey]) {
                var roundedMethodCallBeforeLog = Math.round(methodCallBeforeLog);
                methods[propertyKey] = {
                    methodCallBeforeLog: roundedMethodCallBeforeLog,
                    calls: 0
                };
            }
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            perf_hooks_1.performance.mark('starting method');
            var result = originalMethod.apply(this, args);
            perf_hooks_1.performance.mark('ending method');
            perf_hooks_1.performance.measure('getting method measure', 'starting method', 'ending method');
            var methodMeasure = perf_hooks_1.performance.getEntriesByType('measure')[0];
            var methodCalls = methods[propertyKey];
            if (methodCalls) {
                var timesCalled = methodCalls.calls;
                timesCalled++;
                methodCalls = __assign({}, methodCalls, { calls: timesCalled });
                if (methodCalls.calls === methodCalls.methodCallBeforeLog) {
                    logger("method measure is " + methodMeasure.duration);
                    methodCalls = __assign({}, methodCalls, { calls: 0 });
                }
                methods[propertyKey] = methodCalls;
            }
            else {
                logger("method measure is " + methodMeasure.duration);
            }
            return result;
        };
        return descriptor;
    };
};
exports.default = performanceLog;

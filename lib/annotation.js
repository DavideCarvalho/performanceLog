"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var perf_hooks_1 = require("perf_hooks");
var logger = console.log;
exports.setLogger = function (newLogger) {
    logger = newLogger;
};
var annotation = function (target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("The method args are: " + JSON.stringify(args));
        perf_hooks_1.performance.mark('starting method');
        var result = originalMethod.apply(this, args);
        perf_hooks_1.performance.mark('ending method');
        perf_hooks_1.performance.measure('getting method measure', 'starting method', 'ending method');
        var methodMeasure = perf_hooks_1.performance.getEntriesByType('measure')[0];
        console.log("The return value is: " + result);
        console.log("method measure is " + methodMeasure.duration);
        return result;
    };
    return descriptor;
};
exports.default = annotation;

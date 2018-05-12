import performanceLog, { setLogger } from './annotation';
import { performance } from 'perf_hooks';
import bunyan from 'bunyan';
const log = bunyan.createLogger({ name: "annotation test" });


describe('annotation', () => {
    it('should call performance mark', () => {
        class Teste {
            @performanceLog()
            render() {
                console.log('inside render method');
            }
        }
        const spy = jest.spyOn(performance, 'mark');
        const todos = new Teste().render();
        expect(spy).toBeCalled();
    });
    it('should call performance measure', () => {
        class Teste {
            @performanceLog()
            render() {
                console.log('inside render method');
            }
        }
        const spy = jest.spyOn(performance, 'measure');
        const todos = new Teste().render();
        expect(spy).toBeCalled();
    });
    it('should call change logger', () => {
        class Teste {
            @performanceLog()
            render() {
                console.log('inside render method');
            }
        }
        setLogger(jest.fn());
        const spy = jest.spyOn(jest, 'fn');
        const todos = new Teste().render();
        expect(spy).toBeCalled;
    });
    it('should not log if its not the second time the method run', () => {
        class Teste {
            @performanceLog(2)
            render() {
                //console.log('inside render method');
            }
        }
        const spy = jest.spyOn(console, 'log');
        new Teste().render();
        expect(spy).not.toBeCalled();
    });
    it('should log if its the second time the method run', () => {
        class Teste {
            @performanceLog(2)
            render() {
                //console.log('inside render method');
            }
        }
        global.console = { log: jest.fn() }
        setLogger(global.console.log);
        const spy = jest.spyOn(global.console, 'log');
        new Teste().render();
        new Teste().render();
        expect(spy).toBeCalled();
    });
    it('should throw error if is not passed a number to the decorator parameter', () => {
      class Teste {
          render() {
              //console.log('inside render method');
          }
      }
        const performanceLogInstantiated = performanceLog("teste");

        expect(() => performanceLogInstantiated(new Teste().render())).toThrow();
    });
});

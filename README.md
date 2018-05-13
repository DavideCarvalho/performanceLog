# performance_annotation
> Annotation to log the performance time of a method

###### Since Node TIMING API had a breaking change on version 10, this api only works with Node <10. I'll work into make this package able to use on version 10.

This package uses NodeJS `TIMING API`, so it's very accurate!

To use it, just download it with `yarn` or `npm`

``npm i performance_annotation``

``yarn add performance_annotation``

And to use, just import it as any other package:
```typescript
  import performanceLog from 'performance_annotation';
```

Now decorate a class method with it
```typescript
  class MyClass {

    @performanceLog()
    myMethod() {
      // method logic inside
    }
  }
```

This way, everytime this method gets called, it will `console.log` the time the method took to perform the operation.
You can set how many times the method will execute before it will log. Just put a number inside the decorator call and it will do it for you, e.g:

If you put `@performanceLog(2)`, the method will execute 2 times, and only on the second time, it will log it.

```typescript
  class MyClass {

    @performanceLog(2)
    myMethod() {
      // method logic inside
    }
  }

  new MyClass().myMethod()// won't log
  new MyClass().myMethod()// will log
  new MyClass().myMethod()// won't log
  new MyClass().myMethod()// will log
```

## setLogger(newLogger: any) => void

By default, it uses `console.log` as default logger, but you can change that with `setLogger`, e.g:
```typescript
import { setLogger } from 'performance_annotation';
import bunyan from 'bunyan'
const log = bunyan.createLogger({ name: "my logger" });
setLogger(log.info);
```
Now the package will use your bunyan logger to log the measures!

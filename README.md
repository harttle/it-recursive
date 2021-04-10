# it-recursive

Iteratively evaluate recursive functions, avoiding \"Maximum call stack size exceeded\".

## Usage

Refactor your recursive function and evaluate it with `it`. In the following case, you'll need:

1. Add a `*` after the `function` keyword.
2. Wrap your recursive call (`recursive(i + 1)` in this case) with `yield () => <the recursive call>`
3. Evaluate the final result by calling `it(<initial call>)`

```javascript
const it = require('it-recursive')

function* recursive(i) {
  if (i === 1e6) return i
  return yield () => recursive(i + 1)
}
console.log(it(recursive(0)))   // Outputs 1000000
```

## Why?

Recursive calls in JavaScript is limited by stack size instead of heap memory. Thus we can't implement our functionality recursively when the stack size is expected to be large. For example, the following snippet throws "Maximum call stack size exceeded":
 
```javascript
function increment(i) {
  if (i === 1e6) return i
  return increment(i + 1)
}
increment(0)
```

The stack size limit varries in different JavaScript environments, it's roughly between 1k to 50k (see https://stackoverflow.com/questions/7826992/browser-javascript-stack-size-limit). As pointed out by [Dr. Alex](https://2ality.com/2014/04/call-stack-size.html), the following function lets you find out:

```javascript
function computeMaxCallStackSize() {
  try {
    return 1 + computeMaxCallStackSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
}
```

## Prerequisites

There's only one prerequisite: generator function support.

- Edge >= 13
- Firefox >= 26
- Chrome >= 39
- Safari >= 10
- Node.js >= 4.9.1

FYI:

- https://caniuse.com/es6-generators
- https://node.green/#ES2015-functions-generators

## Q&A

> Why don't you build a ES5 version to support older JavaScript environments?

This library relies on the [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) to flatten the recursive calls. Generators are typically compiled into recursive calls when targeting ES5 (as in [TypeScript](https://github.com/microsoft/tslib/blob/f7eea49789d7902f96802d37e674e75590f7eb66/tslib.js#L121)) so it's no point of using this lib where generators are not supported.

> Can I use it for arrow functions?

As per ECMA Standards, the `function*` statement defines a generator function. See [this proposal](https://github.com/tc39/proposal-generator-arrow-functions) for more information.
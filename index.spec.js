const it = require('./index')

test('should call a simple recursive function', () => {
    function* fact(n) {
        if (n <= 1) return 1
        let rest = yield () => fact(n - 1)
        return n * rest
    }
    expect(it(fact(5))).toEqual(120)
})
test('should call a simple function', () => {
    function* add(a, b) {
        return a + b
    }
    expect(it(add(5, 3))).toEqual(8)
})
test('should not throw for stack depth of 1e6', () => {
    function* fact(n) {
        if (n <= 1) return 1
        let rest = yield () => fact(n - 1)
        return n * rest
    }
    expect(it(fact(1e6))).toEqual(Infinity)
})
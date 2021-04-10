module.exports = function (it) {
    var stack = [it], ret = undefined
    while (stack.length) {
        var it = stack[stack.length - 1]
        var result = it.next(ret)
        if (result.done) {
            ret = result.value
            stack.pop()
        } else {
            stack.push(result.value())
        }
    }
    return ret
}
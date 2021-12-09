const getV = {
    getTextVal(vm, expression) {
        return expression.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    getVal(vm, expression) {
        expression = expression.split('.')
        // deal with expr liks a.b.c.d...
        return expression.reduce( (prev, next) => {
            return prev[next]
        }, vm.$data)
    },
}

module.exports = getV
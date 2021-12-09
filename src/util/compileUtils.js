const CompileUtil = {
    text(node, vm, expression) {
        let updateFn = this.updater['textUpdater']
        updateFn && updateFn(node, this.getTextVal(vm, expression))
    },
    model(node, vm, expression) {
        let updateFn = this.updater['modelUpdater']
        updateFn && updateFn(node, this.getVal(vm, expression))
    },
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
    updater: {
        textUpdater: function update(node, value) {
            node.textContent = value
        },
        modelUpdater: function update(node, value) {
            node.value = value
        }
    }
}


module.exports = CompileUtil

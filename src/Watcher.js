const getV = require('./util/getV')
const Dep = require('./util/dep')

class Watcher {
    constructor(vm, expression, callback) {
        this.vm = vm
        this.expression = expression
        this.callback = callback
        // cache old value
        this.value = this.get()
    }

    get() {
        Dep.target = this
        let value = getV.getVal(this.vm, this.expression)
        Dep.target = null
        return value
    }
    // exposed method
    update() {
        let newV = getV.getVal(this.vm, this.expression)
        let oldV = this.value
        if (newV != oldV) {
            this.callback(newV)
        }
    }
}

module.exports = Watcher
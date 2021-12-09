const Dep = require('./util/dep')

class Observer {
    constructor(data) {
        this.observe(data)
    }
    // data binding through defineProperty
    observe(data) {
        // need to object
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach( (key) => {
            this.defineReactive(data, key, data[key])
            this.observe(data[key])
        })
    }
    // set data property to be reactive
    defineReactive(obj, key, value) {
        let that = this
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newV) {
                if (newV != value) {
                    that.observe(newV)
                    value = newV
                    dep.notify()
                }
            }
        })
    }
}

module.exports = Observer
class Observer {
    constructor(data) {
        
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
        Object.defineProperties(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return value
            },
            set(newV) {
                if (newV != value) {
                    that.observe(newV)
                    value = newV
                }
            }
        })
    }
}

module.exports = Observer
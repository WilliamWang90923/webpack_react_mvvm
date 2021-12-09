const Compile = require('./Compile')
const Observer = require('./Observer')

class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        if (this.$el) {
            // console.log('this.$el' + this.$el)
            new Compile(this.$el, this)
            new Observer(this.$data)
            console.log('this.$data: ', this.$data)
        }
    }
}

module.exports = MVVM
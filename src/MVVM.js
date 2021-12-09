const Compile = require('./Compile')

class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        if (this.$el) {
            console.log('this.$el' + this.$el)
            new Compile(this.$el, this)
        }
    }
}

module.exports = MVVM
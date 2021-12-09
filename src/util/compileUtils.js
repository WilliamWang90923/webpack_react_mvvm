const getV = require('./getV')
const Watcher = require('../Watcher')

// define compilers for text node and element node 
const CompileUtil = {
    text(node, vm, expression) {
        let updateFn = this.updater['textUpdater']
        let value = getV.getTextVal(vm, expression)
        // add watcher whenever node is compiled
        expression.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            new Watcher(vm, args[1], (newV) => {
                updateFn && updateFn(node, getV.getTextVal(vm, expression))
            })
        }) 
        updateFn && updateFn(node, value)
    },
    model(node, vm, expression) {
        let updateFn = this.updater['modelUpdater']
        new Watcher(vm, expression, (newV) => {
            updateFn && updateFn(node, newV)
        })
        node.addEventListener('input', (event) => {
            let newV = event.target.value
            this.setVal(vm, expression, newV)
        })
        updateFn && updateFn(node, getV.getVal(vm, expression))
    },

    updater: {
        textUpdater: function update(node, value) {
            node.textContent = value
        },
        modelUpdater: function update(node, value) {
            node.value = value
        }
    },

    setVal(vm, expression, value) {
        expression = expression.split('.')
        return expression.reduce((prev, next,  currentIndex) => {
            if (currentIndex === expression.length - 1) {
                return prev[next] = value
            }
            return prev[next]
        }, vm.$data)
    }
}


module.exports = CompileUtil

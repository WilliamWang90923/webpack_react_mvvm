const updater = {
    textUpdater: {
        textUpdater: function update(node, value) {
            node.textContent = value
        },
        modelUpdater: function update(node, value) {
            node.value = value
        }
    }
}


const CompileUtil = {
    text(node, vm, expression) {
        let updateFn = updater['textUpdater']
        updateFn && updateFn(node, value)
    }
}


module.exports = {
    CompileUtil
}
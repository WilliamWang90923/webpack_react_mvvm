CompileUtils = require('./util/compileUtils')

class Compile {
    constructor(el, vm) {
        // see if el is DOM, if not try to obtain it
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        if (this.el) {
            // todo: move all these DOM to memory (fragment)
            let fragment = this.node2fragment(this.el)
            this.compile(fragment)
        }
    }

    isElementNode(node) {
        return node.nodeType === 1
    }
    isDirective(name) {
        return name.includes('v-')
    }

    compileElement(node) {

    }
    compileText(node) {
        let expression = node.textContent
        let regex = /\{\{([^}]+)\}\}/g
        if (regex.test(expression)) {
            // substitute expression for data
            CompileUtils
        }
    }
    compile(fragment) {
        let childNodes = fragment.childNodes
        Array.from(childNodes).forEach( (node) => {
            if (this.isElementNode(node)) {
                this.compileElement(node)
                this.compile(node)
            } else {
                // text node
                this.compileText(node)
            }
        })
    }
    node2fragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
}

module.exports = Compile
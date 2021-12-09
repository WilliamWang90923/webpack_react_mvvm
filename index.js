const Compile = require('./src/Compile.js')
const MVVM = require('./src/MVVM.js')

let vm = new MVVM({
    el:'#app',
    data:{
        message:{a:'jw'},
        b:'MVVM'
    }
})
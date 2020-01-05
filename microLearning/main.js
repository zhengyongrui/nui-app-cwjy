import Vue from 'vue'
import App from './App'
import appGlobalPlugin from './base/plugins/appGlobalPlugin.js'

Vue.config.productionTip = false

Vue.use(appGlobalPlugin)

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

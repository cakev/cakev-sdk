import Vue from 'vue'
import VueRouter from 'vue-router'

const routes: Array<any> = []
const context = require.context('./demo', true, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

Vue.use(VueRouter)

const router: any = new VueRouter({
	mode: 'history',
	routes,
})

export default router

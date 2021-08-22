import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<any> = []
const context = require.context('./demo', true, /\.(route.ts)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

const router: any = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'

const routes: Array<RouteRecordRaw> = []
const context = require.context('./demo', true, /\.(route.ts)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

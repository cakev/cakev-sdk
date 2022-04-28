import VueRouter, { Route } from 'vue-router'

declare module 'vue/types' {
	interface Vue {
		$route: Route
		$router: VueRouter
	}
}

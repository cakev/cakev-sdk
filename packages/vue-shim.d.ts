declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent
	// @ts-ignore
	export default component
}

import { computed, reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed({
	get: () => {
		const width = state.manager.screen.currentScreen.width
		const height = state.manager.screen.currentScreen.height
		if (width !== 1920 && width !== 1366 && width !== 1024 && width !== 750 && width !== 828) {
			return 'custom'
		}
		if (height !== 1080 && height !== 768 && height !== 1334 && height !== 1472) {
			return 'custom'
		}
		return `${width}*${height}`
	},
	set: value => {
		if (value !== 'custom') {
			const [width, height] = value.split('*')
			state.manager.screen.currentScreen.width = Number(width)
			state.manager.screen.currentScreen.height = Number(height)
		}
	},
})

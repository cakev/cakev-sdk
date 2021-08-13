import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		const width = manager.screen.currentScreen.width
		const height = manager.screen.currentScreen.height
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
			manager.screen.currentScreen.width = Number(width)
			manager.screen.currentScreen.height = Number(height)
		}
	},
})

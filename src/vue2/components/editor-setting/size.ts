import { computed } from '@vue/composition-api'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default computed({
	get: () => {
		const width = manager.screen.current.width
		const height = manager.screen.current.height
		if (width !== 1920 && width !== 1366 && width !== 1024) {
			return 'custom'
		}
		if (height !== 1080 && height !== 768) {
			return 'custom'
		}
		return `${width}*${height}`
	},
	set: value => {
		if (value !== 'custom') {
			const [width, height] = value.split('*')
			manager.screen.current.width = Number(width)
			manager.screen.current.height = Number(height)
		}
	},
})

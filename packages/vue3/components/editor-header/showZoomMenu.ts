import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import resetZoom from '@dorring/sdk/vue3/components/editor-content/resetZoom'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default data => {
	data.nameMenuState = false
	data.zoomMenuState = true
	data.zoomList = [
		{
			label: '放大',
			handler: () => state.manager.temporary.zoomIn(),
		},
		{
			label: '缩小',
			handler: () => state.manager.temporary.zoomOut(),
		},
		{
			label: '缩放以适应大小',
			handler: resetZoom,
		},
		{
			label: '缩放至100%',
			handler: () => (state.manager.temporary.zoom = 1),
		},
	]
}

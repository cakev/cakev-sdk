import { computed, reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed(() => {
	return {
		left: state.manager.temporary.widgetRightMenuX + 'px',
		top: state.manager.temporary.widgetRightMenuY + 'px',
	}
})

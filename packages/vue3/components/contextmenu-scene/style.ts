import { computed, reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default computed(() => {
	return {
		left: state.manager.temporary.sceneRightMenuX + 'px',
		top: state.manager.temporary.sceneRightMenuY + 'px',
	}
})

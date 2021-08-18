import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
export default ({ state, context }) => {
	if (manager.screen.currentScreen.name.replace(/[\r\n]/g, '') === '') {
		manager.screen.currentScreen.name = '未命名'
		context.refs['input'].focus()
		setTimeout(() => {
			context.refs['input'].select()
		})
	} else {
		state.editName = false
	}
}

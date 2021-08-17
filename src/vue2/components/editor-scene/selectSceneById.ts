import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default id => {
	manager.screen.selectSceneById(id)
}

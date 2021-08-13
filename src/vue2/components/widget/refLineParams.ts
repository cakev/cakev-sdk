import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default params => {
	const { vLine, hLine } = params
	manager.temporary.vLine = vLine
	manager.temporary.hLine = hLine
}

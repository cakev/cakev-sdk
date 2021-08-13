import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	return {
		left: manager.temporary.widgetRightMenuX + 'px',
		top: manager.temporary.widgetRightMenuY + 'px',
	}
}

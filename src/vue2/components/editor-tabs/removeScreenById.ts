import { Message, MessageBox } from 'element-ui'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default id => {
	if (manager.screen.checkChange(id)) {
		manager.screen.removeScreenById(id)
	} else {
		MessageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
			distinguishCancelAndClose: true,
			confirmButtonText: '保存',
			cancelButtonText: '放弃修改',
		})
			.then(() => {
				Message({
					type: 'info',
					message: '保存修改',
				})
				manager.screen.removeScreenById(id)
			})
			.catch(action => {
				Message({
					type: 'info',
					message: action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面',
				})
				manager.screen.removeScreenById(id)
			})
	}
}

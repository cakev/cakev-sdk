import { ElNotification, ElMessageBox } from 'element-plus'
import { reactive } from 'vue'
import Manager from '@dorring/sdk/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default id => {
	if (state.manager.screen.checkChange(id)) {
		state.manager.screen.removeScreenById(id)
	} else {
		ElMessageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
			confirmButtonText: '保存',
			cancelButtonText: '再等等',
		})
			.then(() => {
				// todo ajax
				ElNotification({
					title: '提示',
					type: 'success',
					message: '保存',
				})
				state.manager.screen.removeScreenById(id)
			})
			.catch(() => {})
	}
}

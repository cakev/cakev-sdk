import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default (e)=>{
	if(e.ctrlKey){
		if (e.wheelDelta > 0) {
			manager.temporary.zoomIn()
		} else {
			manager.temporary.zoomOut()
		}
	}else{
		if (e.wheelDelta > 0) {
			manager.temporary.scrollTop()
		} else {
			manager.temporary.scrollBottom()
		}
	}
}

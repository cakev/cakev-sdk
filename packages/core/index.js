import Editor from './Editor/index.ts'
import { loadCss, loadJs } from '@/core/utils'
import WidgetTask from '@/core/Widget/task'

const cakeV = {
	Editor,
	loadCss,
	loadJs,
	WidgetTask,
}
if (window !== undefined) {
	if (!window.cakeV) {
		window.cakeV = {}
	}
	window.cakeV = { ...window.cakeV, ...cakeV }
}
export { Editor, loadCss, loadJs, WidgetTask }
export default cakeV

import Editor from './Editor/index.ts'
import { loadCss, loadJs } from '@/core/utils'
import Widget from '@/core/Widget/normal'

const cakeV = {
	Editor,
	loadCss,
	loadJs,
	Widget,
}
if (window !== undefined) {
	if (!window.cakeV) {
		window.cakeV = {}
	}
	window.cakeV = { ...window.cakeV, ...cakeV }
}
export { Editor, loadCss, loadJs, Widget }
export default cakeV

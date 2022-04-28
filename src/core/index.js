import Editor from './Editor/index.ts'
import { loadCss, loadJs } from '@/core/utils'
import colorTheme from '@/core/colorTheme'
import Widget from '@/core/Widget/normal'

const eslinkV = {
	Editor,
	loadCss,
	loadJs,
	colorTheme,
	Widget,
}
if (window !== undefined) {
	if (!window.eslinkV) {
		window.eslinkV = {}
	}
	window.eslinkV = { ...window.eslinkV, ...eslinkV }
}
export { Editor, loadCss, loadJs, colorTheme, Widget }
export default eslinkV

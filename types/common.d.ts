export {}
declare global {
	interface Window {
		loadJS: any
		loadCSS: any
		eslinkVEditorInstance: any
		eslinkV: any
		echarts: any
	}
	export class MyMouseEvent extends MouseEvent {
		readonly layerX: number
		readonly layerY: number
	}
}

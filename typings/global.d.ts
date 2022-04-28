export {};
declare global {
	interface Window {
		echarts: any;
		dorring: any
		loadJS: any
		loadCSS: any
		eslinkVEditorInstance: any
		eslinkV: any
	}
	export class MyMouseEvent extends MouseEvent {
		readonly layerX: number
		readonly layerY: number
	}
}

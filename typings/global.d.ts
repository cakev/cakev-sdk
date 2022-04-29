export {};
declare global {
	interface Window {
		echarts: any;
		loadJS: any
		loadCSS: any
		cakeVEditorInstance: any
		cakeV: any
	}
	export class MyMouseEvent extends MouseEvent {
		readonly layerX: number
		readonly layerY: number
	}
}

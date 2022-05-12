export {}
declare global {
	interface window {
		G2: any
		cakeVEditorInstance: any
		cakeV: any
	}
	export class MyMouseEvent extends MouseEvent {
		readonly layerX: number
		readonly layerY: number
	}
}

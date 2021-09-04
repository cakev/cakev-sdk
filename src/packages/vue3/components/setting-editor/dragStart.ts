export default (e: DragEvent, widget) => {
	e.dataTransfer.setData('widget-drag', JSON.stringify(widget))
}

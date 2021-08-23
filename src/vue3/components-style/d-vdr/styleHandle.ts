export default (handle, data, props) => {
	const size = Number((props.handleInfo.size / props.scaleRatio).toFixed(2))
	const offset = Number((props.handleInfo.offset / props.scaleRatio).toFixed(2))
	const center = Number((size / 2).toFixed(2))

	const styleMap = {
		tl: {
			top: `${offset}px`,
			left: `${offset}px`,
		},
		tm: {
			top: `${offset}px`,
			left: `calc(50% - ${center}px)`,
		},
		tr: {
			top: `${offset}px`,
			right: `${offset}px`,
		},
		mr: {
			top: `calc(50% - ${center}px)`,
			right: `${offset}px`,
		},
		br: {
			bottom: `${offset}px`,
			right: `${offset}px`,
		},
		bm: {
			bottom: `${offset}px`,
			right: `calc(50% - ${center}px)`,
		},
		bl: {
			bottom: `${offset}px`,
			left: `${offset}px`,
		},
		ml: {
			top: `calc(50% - ${center}px)`,
			left: `${offset}px`,
		},
	}
	const handleStyle = {
		width: `${size}px`,
		height: `${size}px`,
		top: styleMap[handle].top,
		left: styleMap[handle].left,
		right: styleMap[handle].right,
		bottom: styleMap[handle].bottom,
		display: 'none',
	}
	handleStyle.display = data.enabled ? 'block' : 'none'
	return handleStyle
}

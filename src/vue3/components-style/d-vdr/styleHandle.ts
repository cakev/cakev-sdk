export default (handle, data, props) => {
	const size = 16 / props.scaleRatio
	const offset = -8 / props.scaleRatio
	const center = size / 2

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
		borderWidth: `${1 / props.scaleRatio}px`,
		top: styleMap[handle].top,
		left: styleMap[handle].left,
		right: styleMap[handle].right,
		bottom: styleMap[handle].bottom,
		display: 'none',
	}
	handleStyle.display = data.enabled ? 'block' : 'none'
	return handleStyle
}

export default widget => {
	let resultColor = {}
	if (widget.background) {
		resultColor = widget.background.style
		let backgroundColor = widget.background.color
		if (backgroundColor.length > 1) {
			resultColor = {
				'background-image': `linear-gradient(${
					widget.background.gradientDirection
				}deg, ${backgroundColor.toString()})`,
			}
		} else {
			resultColor = { 'background-color': widget.background.color[0] }
		}
	}

	let borderWidth = '',
		borderColor = '',
		borderStyle = ''
	if (widget.border) {
		borderStyle = widget.border.style
		borderColor = widget.border.color
		borderWidth = `${widget.border.width[0]}px ${widget.border.width[1]}px ${widget.border.width[2]}px ${widget.border.width[3]}px`
	}
	return {
		top: (widget.readonly ? widget.y : 0) + 'px',
		left: (widget.readonly ? widget.x : 0) + 'px',
		width: widget.width + 'px',
		height: widget.height + 'px',
		...resultColor,
		color: widget.color,
		fontSize: widget.fontSize + 'px',
		lineHeight: widget.lineHeight + 'px',
		textAlign: widget.textAlign,
		zIndex: widget.zIndex,
		borderWidth,
		borderColor,
		borderStyle,
		boxSizing: 'border-box',
	}
}

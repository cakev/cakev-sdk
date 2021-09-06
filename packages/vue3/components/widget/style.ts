export default widget => {
	let backgroundColor = widget.backgroundColor
	let resultColor = ''
	if (backgroundColor.length > 1) {
		resultColor = `linear-gradient(${widget.gradientDirection}deg, ${backgroundColor.toString()})`
	} else {
		resultColor = widget.backgroundColor[0]
	}
	return {
		top: (widget.readonly ? widget.y : 0) + 'px',
		left: (widget.readonly ? widget.x : 0) + 'px',
		width: widget.width + 'px',
		height: widget.height + 'px',
		[backgroundColor.length > 1 ? 'background-image' : 'background-color']: resultColor,
		color: widget.color,
		fontSize: widget.fontSize + 'px',
		lineHeight: widget.lineHeight + 'px',
		textAlign: widget.textAlign,
		zIndex: widget.zIndex,
		borderWidth: widget.borderWidth + 'px',
		borderColor: widget.borderColor,
		borderStyle: widget.borderStyle,
		boxSizing: 'border-box',
	}
}

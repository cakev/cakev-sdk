export default {
	id: {
		type: String,
	},
	classNameDraggable: {
		type: String,
		default: 'draggable',
	},
	classNameResizable: {
		type: String,
		default: 'resizable',
	},
	classNameDragging: {
		type: String,
		default: 'dragging',
	},
	classNameResizing: {
		type: String,
		default: 'resizing',
	},
	classNameActive: {
		type: String,
		default: 'active',
	},
	classNameHandle: {
		type: String,
		default: 'handle',
	},
	disableUserSelect: {
		type: Boolean,
		default: true,
	},
	preventDeactivation: {
		type: Boolean,
		default: false,
	},
	active: {
		type: Boolean,
		default: false,
	},
	draggable: {
		type: Boolean,
		default: true,
	},
	resizable: {
		type: Boolean,
		default: true,
	},
	// 锁定宽高比
	lockAspectRatio: {
		type: Boolean,
		default: false,
	},
	w: {
		type: Number,
		default: 200,
	},
	h: {
		type: Number,
		default: 200,
	},
	x: {
		type: Number,
		default: 0,
	},
	y: {
		type: Number,
		default: 0,
	},
	z: {
		type: Number,
		default: 'auto',
	},
	// 缩放比例
	scaleRatio: {
		type: Number,
		default: 1,
		validator: val => typeof val === 'number',
	},
	// handle是否缩放
	handleInfo: {
		type: Object,
		default: () => {
			return {
				size: 8,
				offset: -5,
				switch: true,
			}
		},
	},
}

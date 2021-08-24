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
		type: [Number, String],
		default: 200,
		validator: val => (typeof val === 'number' ? val > 0 : val === 'auto'),
	},
	h: {
		type: [Number, String],
		default: 200,
		validator: val => (typeof val === 'number' ? val > 0 : val === 'auto'),
	},
	minWidth: {
		type: Number,
		default: 0,
		validator: val => val >= 0,
	},
	minHeight: {
		type: Number,
		default: 0,
		validator: val => val >= 0,
	},
	maxWidth: {
		type: Number,
		default: null,
		validator: val => val >= 0,
	},
	maxHeight: {
		type: Number,
		default: null,
		validator: val => val >= 0,
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
		type: [String, Number],
		default: 'auto',
		validator: val => (typeof val === 'string' ? val === 'auto' : val >= 0),
	},
	handles: {
		type: Array,
		default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
		validator: (val: Array<string>) => {
			const s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])
			return new Set(val.filter(h => s.has(h))).size === val.length
		},
	},
	axis: {
		type: String,
		default: 'both',
		validator: (val: string) => ['x', 'y', 'both'].includes(val),
	},
	// 冲突检测
	isConflictCheck: {
		type: Boolean,
		default: false,
	},
	// 元素对齐
	snap: {
		type: Boolean,
		default: false,
	},
	// 当调用对齐时，用来设置组件与组件之间的对齐距离，以像素为单位
	snapTolerance: {
		type: Number,
		default: 5,
		validator: function (val) {
			return typeof val === 'number'
		},
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

const lineContext = require.context('../../../vue3-widgets/line', true, /conf\.ts/)
const pieContext = require.context('../../../vue3-widgets/pie', true, /conf\.ts/)
let line = [],
	pie = []
lineContext.keys().forEach(name => {
	line.push(lineContext(name).default)
})
pieContext.keys().forEach(name => {
	pie.push(pieContext(name).default)
})

export default [
	{
		label: '柱形图',
		icon: 'el-icon-pie-chart',
		children: line,
	},
	{
		label: '扇形图',
		icon: 'el-icon-pie-chart',
		children: pie,
	},
]

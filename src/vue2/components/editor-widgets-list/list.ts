const lineContext = require.context('../../../widgets/base/line', true, /conf\.ts/)
const pieContext = require.context('../../../widgets/base/pie', true, /conf\.ts/)
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
		label: '常规',
		icon: 'el-icon-pie-chart',
		children: [
			{ label: '柱形图', children: line },
			{ label: '饼图', children: pie },
		],
	},
]

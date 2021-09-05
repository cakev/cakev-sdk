const lineContext = require.context('../../../vue3-widgets/line', true, /conf\.ts/)
const decorateContext = require.context('../../../vue3-widgets/decorate', true, /conf\.ts/)
let line = [],
	decorate = []
lineContext.keys().forEach(name => {
	line.push(lineContext(name).default)
})
decorateContext.keys().forEach(name => {
	decorate.push(decorateContext(name).default)
})

export default [
	{
		label: '装饰',
		icon: 'el-icon-ship',
		children: decorate,
	},
	{
		label: '柱形图',
		icon: 'el-icon-pie-chart',
		children: line,
	},
]

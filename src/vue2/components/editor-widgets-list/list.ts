const lineContext = require.context('../../../widgets/base/line', true, /conf\.ts/)
let line = []
lineContext.keys().forEach(name => {
	line.push(lineContext(name).default)
})
export default [{ label: '常规', icon: 'el-icon-pie-chart', children: [{ label: '柱形图', children: line }] }]

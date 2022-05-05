import Editor from '@/core/Editor'

const editor: Editor = Editor.Instance()
const component = require.context(
	'../components-business',
	true,
	/index\.(vue)$/,
)
const avatar = require.context(
	'../components-business',
	true,
	/snapshot\.(jpg|png)$/,
)
const conf = require.context(
	'../components-business',
	true,
	/\.(component.ts)$/,
)

editor.localInit({ name: '本地组件', component, avatar, conf })

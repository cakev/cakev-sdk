import dShareDialog from './vue2/components-open/d-share-dialog/index.vue'
import Editor from './core/Editor'
import dDetail from './vue2/components-open/d-detail/index.vue'
import dView from './vue2/components-open/d-view/index.vue'
import dScreen from './vue2/components-open/d-screen/index.vue'

const version = process.env.version
const sdk = {
	version,
	dShareDialog,
	Editor,
	dDetail,
	dView,
	dScreen,
}

if (window !== undefined) {
	if (!window['cakeV-sdk']) {
		window['cakeV-sdk'] = sdk
	}
}

export { version, dShareDialog, Editor, dDetail, dView, dScreen }
export default sdk

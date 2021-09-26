// style
import './vue3/scss/index.scss'
import './vue3/scss/element-theme.scss'
import './vue3/scss/dorring.scss'

// core components
import Editor from './vue3/components/editor/index.vue'
import Preview from './vue3/components/preview/index.vue'

// core
import Manager from './core/Manager'

// install
import install from './make-installer'

// version
const version: string = process.env.version

export { version, Editor, install, Preview }

export default {
	version,
	Editor,
	Preview,
	install,
	Manager,
}

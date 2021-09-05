// style
import './vue3/scss/index.scss'
import './vue3/scss/dorring.scss'

// core components
import Editor from './vue3/components/editor/index.vue'

// core
import Manager from './core/Manager'

// install
import install from './make-installer'

// version
const version: string = process.env.version

export { version, Editor, install }

export default {
	version,
	Editor,
	install,
	Manager,
}

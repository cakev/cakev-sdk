// style
import '@dorring-sdk/scss/index.scss'
import '@dorring-sdk/scss/dorring.scss'

// core components
import Editor from '@dorring-sdk/vue3/components/editor/index.vue'

// core
import Manager from '@dorring-sdk/core/Manager'

// install
import install from './make-installer'

const version = process.env.version

export { version, Editor, install }

export default {
	version,
	Editor,
	install,
	Manager,
}

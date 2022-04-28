import Vue from 'vue'
import eSvg from '@/vue2/components-style/e-icon/index.vue'

Vue.component('e-svg', eSvg)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

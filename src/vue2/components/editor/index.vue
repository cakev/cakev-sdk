<template lang="pug">
el-container
	el-header
		editor-tabs
	el-container
		el-main(v-if="manager.screen.current")
			p {{ manager.screen.current }}
		el-main(v-if="!manager.screen.current")
			el-empty
		el-aside(width="350px" v-if="manager.screen.current")
			editor-setting
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import editorSetting from '@/vue2/components/editor-setting'
import editorTabs from '@/vue2/components/editor-tabs'
export default {
	components: {
		editorSetting,
		editorTabs,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
		}
	},
}
</script>

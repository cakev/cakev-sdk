<template lang="pug">
el-collapse.setting-editor-widget
	el-collapse-item(v-for="child in list", :key="child.label", :index="child.label")
		template(#title)
			d-svg(:type="child.icon" :size="16")
			span(:style="{marginLeft:'8px'}") {{child.label}}
		.cursor-pointer.fn-flex.flex-column(
			v-for="widget in child.children",
			:draggable="true",
			@dragstart="dragStart($event, widget)")
			d-img.widget-img(:src="widget.avatar")
			span.widget-title {{ widget.name }}
</template>
<script lang="ts">
import dragStart from './dragStart'
import list from './list'
import Manager from '@/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
	name: 'setting-editor-widget',
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ list, manager })
		return {
			...toRefs(state),
			dragStart,
		}
	},
})
</script>
<style lang="scss" scoped>
.setting-editor-widget {
	padding: 0 16px;
}
.widget-img {
	width: 120px;
	height: 60px;
}

.widget-title {
	width: 120px;
	text-align: center;
}
</style>

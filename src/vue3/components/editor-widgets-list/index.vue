<template lang="pug">
el-tabs(tab-position="left")
	el-tab-pane(v-for="item in list", :key="item.label")
		template(#label)
			d-svg(:type="item.icon")
			span {{ item.label }}
		el-collapse
			el-collapse-item(v-for="child in item.children", :key="child.label", :index="child.label", :title="child.label")
				.cursor-pointer.fn-flex.flex-column(
					v-for="widget in child.children",
					:key="item.type",
					:draggable="true",
					@dragstart="dragStart($event, widget)")
					d-img.widget-img(:src="widget.avatar")
					span.widget-title {{ widget.name }}
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import dragStart from './dragStart'
import list from './list'

export default defineComponent({
	name: 'editor-widgets-list',
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
.widget-img {
	width: 120px;
	height: 60px;
}

.widget-title {
	width: 120px;
	text-align: center;
}
</style>

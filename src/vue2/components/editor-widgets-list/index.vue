<template lang="pug">
el-tabs(tab-position="left")
	el-tab-pane(v-for="item in list", :key="item.label")
		template(slot="label")
			d-svg(:type="item.icon")
			span {{ item.label }}
		el-collapse
			el-collapse-item(v-for="child in item.children", :key="child.label", :index="child.label", :title="child.label")
				.cursor-pointer.fn-flex.flex-column(
					v-for="widget in child.children",
					:key="item.type",
					:draggable="manager.screen.currentScreen",
					@dragstart="dragStart($event, widget)")
					d-img.widget-img(:src="widget.avatar")
					span.widget-title {{ widget.name }}
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import dragStart from './dragStart'
import list from './list'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ list, manager })
		return {
			...toRefs(state),
			dragStart,
		}
	},
}
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

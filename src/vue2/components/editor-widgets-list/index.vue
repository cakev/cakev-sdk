<template lang="pug">
el-menu
	el-submenu(v-for="item in list", :index="item.label", :key="item.label")
		template(slot="title")
			i(:class="item.icon")
			span {{ item.label }}
		el-menu-item(v-for="child in item.children", :key="child.label", :index="child.label") {{ child.label }}
			el-menu-item(
				v-for="widget in child.children",
				:key="item.type",
				:draggable="manager.screen.currentScreen",
				@dragstart.native="dragstart($event, widget)")
				el-image(:src="widget.avatar")
				span {{ widget.name }}
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import dragstart from './dragstart'
import list from './list'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ list, manager })
		return {
			...toRefs(state),
			dragstart,
		}
	},
}
</script>
<style lang="scss" scoped></style>

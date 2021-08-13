<template lang="pug">
el-tabs(tab-position="left")
    el-tab-pane(v-for="item in list", :label="item.label", :key="item.label")
        el-collapse
            el-collapse-item( v-for="child in item.children", :key="child.label", :index="child.label" :title="child.label")
                div(
                    v-for="widget in child.children",
                    :key="item.type",
                    :draggable="manager.screen.currentScreen",
                    @dragstart="dragstart($event, widget)")
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

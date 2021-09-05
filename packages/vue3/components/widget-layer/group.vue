<template lang="pug">
.widget-layer-group
	dorring-widget-layer-normal(v-bind="$attrs")
		.widget-layer-group-icon.pos-r.fn-flex(@click.stop="active = !active")
			d-svg.icon-right(type="el-icon-caret-right", :class="{ active }")
	.widget-layer-list(v-if="active")
		dorring-widget-layer(:lockable="false", v-bind="{ ...item, ...manager.screen.currentScreen.widgets[item.id] }", v-for="item in $attrs.widgets")
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'

export default defineComponent({
	name: 'dorring-widget-layer-group',
	components: {
		dSvg,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ active: false, manager })
		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.widget-layer-group-icon {
	left: -8px;
	align-items: center;
	height: 100%;
}
.icon-right {
	&.active {
		transform: rotate(90deg);
	}
}
.widget-layer-group {
	width: 100%;
}
.widget-layer-list {
	padding-left: 20px;
}
</style>

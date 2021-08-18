<template lang="pug">
.widget-setting
	.widget-setting-header.fn-flex.flex-row
		span.cursor-nomral(
			:class="{ active: index === activeIndex }",
			@click="click(index)",
			v-for="(item, index) in list") {{ item.label }}
	component(:is="component")
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import Manager from '@/core/Manager'
import currentWidget from './currentWidget'
import base from './base.vue'
import data from './data.vue'
import interactive from './interactive.vue'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const list = [
			{ label: '基础', component: base },
			{ label: '数据', component: data },
			{ label: '交互', component: interactive },
		]
		const state = reactive({ manager, list, activeIndex: 0, component: null })
		const click = index => {
			state.activeIndex = index
			state.component = list[index].component
		}
		onMounted(() => {
			click(0)
		})
		return {
			...toRefs(state),
			currentWidget,
			click,
		}
	},
}
</script>
<style lang="scss" scoped>
.widget-setting {
	font-size: 12px;
}

.widget-setting-header {
	align-items: center;
	height: 40px;
	padding: 4px 16px;

	span {
		margin-right: 10px;
		color: #b3b3b3;

		&:hover {
			color: #333;
		}

		&.active {
			font-weight: bold;
			color: #333;
		}
	}
}

.widget-setting-form {
	padding: 0 16px;
}
</style>

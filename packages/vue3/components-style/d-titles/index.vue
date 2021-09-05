<template lang="pug">
.d-titles.fn-flex.flex-row
	span.cursor-nomral(
		:class="{ active: index === activeIndex }",
		@click="click(index)",
		v-for="(item, index) in list") {{ item.label }}
	slot
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { onMounted, reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
	name: 'd-titles',
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
	},
	// @ts-ignore
	setup(props, { emit }) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, activeIndex: 0 })
		const click = index => {
			state.activeIndex = index
			emit('change', index)
		}
		onMounted(() => {
			click(0)
			emit('init', 0)
		})
		return {
			...toRefs(state),
			click,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-titles {
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
</style>

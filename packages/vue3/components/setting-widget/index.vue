<template lang="pug">
.fn-flex.flex-column(style="height:100%")
	d-titles(:list="list", :left="true", @change="init", @init="init")
	.setting-widget
		component(:is="state.componentId")
</template>
<script lang="ts">
import { ref, shallowRef, defineComponent } from 'vue'
import sBase from './base/index.vue'
import sData from './data.vue'
import sInteractive from './interactive.vue'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'

export default defineComponent({
	name: 'setting-widget',
	components: {
		dTitles,
	},
	setup() {
		const list = [
			{ label: '基础', component: sBase },
			{ label: '数据', component: sData },
			{ label: '交互', component: sInteractive },
		]
		const state = shallowRef({ componentId: null })
		const init = index => {
			state.value = { componentId: list[index].component }
		}
		return {
			state,
			list: ref(list),
			init,
		}
	},
})
</script>
<style lang="scss" scoped>
.setting-widget {
	flex: 1;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0;
	}
}
</style>

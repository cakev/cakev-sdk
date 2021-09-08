<template lang="pug">
el-collapse.setting-editor-widget
	el-collapse-item(v-for="child in list", :key="child.label", :index="child.label")
		template(#title)
			d-svg(:type="child.icon" :size="16")
			span.ml-10 {{child.label}}
		.setting-editor-widget-list.fn-flex
			.setting-editor-widget-item.cursor-pointer.fn-flex.flex-column(
				v-for="widget in child.children",
				:draggable="true",
				@dragstart="dragStart($event, widget)")
				d-img.setting-editor-widget-img(:src="widget.avatar")
				span.setting-editor-widget-title {{ widget.name }}
</template>
<script lang="ts">
import dragStart from './dragStart'
import list from './list'
import Manager from '@dorring/sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'
import dImg from '@dorring/sdk/vue3/components-style/d-img/index.vue'

export default defineComponent({
	name: 'setting-editor-widget',
	components: {
		dSvg,
		dImg,
	},
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
.setting-editor-widget-list {
	flex-wrap: wrap;
}
.setting-editor-widget-item {
	margin-right: 10px;
	&:nth-child(2n) {
		margin-right: 0;
	}
}
.setting-editor-widget {
	padding: 0 16px;
}
.setting-editor-widget-img {
	width: 100px;
	height: 60px;
}

.setting-editor-widget-title {
	width: 90px;
	text-align: center;
}
</style>

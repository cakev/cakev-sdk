<template lang="pug">
.dr-more.pos-a(:style="style")
	d-dr-kuang
</template>
<script lang="ts">
import dDrKuang from '@/vue2/components-base/d-dr-kuang/index.vue'
import Editor from '@/core/Editor'

export default {
	name: 'd-dr-more',
	components: {
		dDrKuang,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	computed: {
		style() {
			if (!this.editor.current.widgetListConfig) return {}
			return {
				transform: `translate3d(${this.editor.currentWidgetListConfig.left}px, ${this.editor.currentWidgetListConfig.top}px,0)`,
				width: this.editor.currentWidgetListConfig.width + 'px',
				height: this.editor.currentWidgetListConfig.height + 'px',
				zIndex: this.editor.currentWidgetListConfig.z,
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.dr-more {
	pointer-events: none;
}
</style>

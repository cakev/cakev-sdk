<template lang="pug">
.dr-more.pos-a(:style="style")
	d-dr-kuang
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import dDrKuang from '@/vue2/components-base/d-dr-kuang/index.vue'
import Editor from '@/core/Editor'
@Component({
	components: {
		dDrKuang,
	},
})
export default class DDrMore extends Vue {
	editor: Editor = Editor.Instance()
	get style() {
		if (!this.editor.currentWidgetListConfig) return {}
		return {
			transform: `translate3d(${this.editor.currentWidgetListConfig.left}px, ${this.editor.currentWidgetListConfig.top}px,0)`,
			width: this.editor.currentWidgetListConfig.width + 'px',
			height: this.editor.currentWidgetListConfig.height + 'px',
			zIndex: this.editor.currentWidgetListConfig.z,
		}
	}
}
</script>
<style lang="scss" scoped>
.dr-more {
	pointer-events: none;
}
</style>

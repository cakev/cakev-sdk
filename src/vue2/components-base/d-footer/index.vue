<template lang="pug">
.d-footer.fn-flex.flex-row.pos-r.z-index-999
	left
	.d-footer-bar.fn-flex(:style="{ marginLeft: 'auto' }")
		i-tooltip(content="缩小")
			e-svg.pointer(:size="18", icon-class="zoomOut", @click.native="() => editor.zoomOut()")
	.d-footer-bar.fn-flex
		i-tooltip(content="放大")
			e-svg.pointer(:size="18", icon-class="zoomIn", @click.native="() => editor.zoomIn()")
	.d-footer-bar.fn-flex(:style="{ marginRight: '0' }")
		i-tooltip(:content="editor.current.fullscreen ? '退出全屏' : '全屏'")
			e-svg.pointer(
				:icon-class="editor.current.fullscreen ? 'unfullscreen' : 'fullscreen'",
				:size="18",
				@click="handleFullscreen")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Icon, Tooltip } from 'view-design'
import Editor from '@/core/Editor'
import { hotKeys } from '@/vue2/utils'
import left from './left.vue'

@Component({
	components: {
		'i-icon': Icon,
		'i-tooltip': Tooltip,
		left,
	},
})
export default class DFooter extends Vue {
	hotKeys = hotKeys
	editor: Editor = Editor.Instance()

	handleFullscreen(): void {
		if (this.editor.current.fullscreen) {
			document.exitFullscreen()
		} else {
			document.body.requestFullscreen()
		}
	}
}
</script>
<style lang="scss" scoped>
.d-footer {
	align-items: center;
	justify-content: space-between;
	height: 32px;
	padding: 0 10px 0 22px;
	color: var(--text-1);
	background: var(--background-3);
	border-top: 1px solid #0d0e10;
}

.d-footer-bar-box {
	right: 0;
	bottom: 15px;
	user-select: none;
}

.d-footer-bar {
	padding: 0 10px;
	line-height: 30px;
	cursor: pointer;
	user-select: none;

	.d-footer-bar-text {
		opacity: 0.5;
	}

	&:hover {
		.d-footer-bar-text {
			opacity: 1;
		}
	}
}
</style>

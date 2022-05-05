<template lang="pug">
.d-footer.fn-flex.flex-row.pos-r.z-index-999
	left
	.d-footer-bar.fn-flex(:style="{ marginLeft: 'auto' }")
		c-tooltip(content="缩小" placement="top")
			c-svg.pointer(:size="18", type="zoomOut", @click.native="() => editor.zoomOut()")
	.d-footer-bar.fn-flex
		c-tooltip(content="放大" placement="top")
			c-svg.pointer(:size="18", type="zoomIn", @click.native="() => editor.zoomIn()")
	.d-footer-bar.fn-flex(:style="{ marginRight: '0' }")
		c-tooltip(:content="editor.current.fullscreen ? '退出全屏' : '全屏'" placement="top")
			c-svg.pointer(
				:type="editor.current.fullscreen ? 'unfullscreen' : 'fullscreen'",
				:size="18",
				@click="handleFullscreen")
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import { hotKeys } from '@/vue2/utils'
import left from './left.vue'

export default {
	name: 'd-footer',
	components: {
		left,
	},
	data() {
		return {
			hotKeys: hotKeys,
			editor: Editor.Instance(),
		}
	},
	methods: {
		handleFullscreen(): void {
			if (this.editor.current.fullscreen) {
				document.exitFullscreen()
			} else {
				document.body.requestFullscreen()
			}
		},
	},
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

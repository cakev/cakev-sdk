<template lang="pug">
.widget-item-wrapper.pos-r.fn-flex
	.fn-flex.flex-column.d-widget-list-card.pointer(
		draggable="true",
		@dragstart="dragstart($event)",
		@click="handleClick")
		.d-widget-list-img.fn-flex(:style="{ backgroundImage: `url(${widget.widgetAvatar})` }")
		h2.ellipsis.text-center(:title="widget.widgetBase.name") {{ widget.widgetBase.name }}
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'item-card',
	props: {
		widget: {},
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
		handleClick() {
			this.editor.screen.createWidget({
				currentSceneIndex: this.editor.current.currentSceneIndex,
				currentMaxZIndex: this.editor.currentMaxZIndex,
				widgetLayout: this.widget.widgetLayout,
				widgetIs: this.widget.widgetIs,
				widgetType: this.widget.widgetType,
				widgetAvatar: this.widget.widgetAvatar,
				widgetMarket: this.widget.widgetMarket,
				widgetApi: this.widget.widgetApi,
				widgetBase: this.widget.widgetBase,
				widgetConfig: this.widget.widgetConfig,
			})
		},
		dragstart(e) {
			e.dataTransfer.setData(
				'widget-config',
				JSON.stringify({
					startX: e.offsetX,
					startY: e.offsetY,
					currentSceneIndex: this.editor.current.currentSceneIndex,
					currentMaxZIndex: this.editor.currentMaxZIndex,
					widgetLayout: this.widget.widgetLayout,
					widgetIs: this.widget.widgetIs,
					widgetType: this.widget.widgetType,
					widgetAvatar: this.widget.widgetAvatar,
					widgetMarket: this.widget.widgetMarket,
					widgetApi: this.widget.widgetApi,
					widgetBase: this.widget.widgetBase,
					widgetConfig: this.widget.widgetConfig,
				}),
			)
		},
	},
}
</script>
<style lang="scss" scoped>
.d-widget-list-card {
	width: 100%;

	h2 {
		padding: 0 5px;
		font-size: 12px;
		line-height: 22px;
		color: #bfbfbf;
		white-space: nowrap;
	}
}

.d-widget-list-img {
	width: 100%;
	height: 60px;
	background-color: #181b24;
	background-repeat: no-repeat;
	background-position: center;
	background-clip: content-box;
	background-size: contain;
}

.widget-item-wrapper {
	align-items: center;
	justify-content: center;
	width: 100px;
	margin-right: 10px;
	margin-bottom: 5px;
	overflow: hidden;
	transition: 0.3s;

	&:nth-child(3n) {
		margin-right: 0;
	}
}
</style>

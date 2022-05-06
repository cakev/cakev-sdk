<template lang="pug">
.widget-item-wrapper.pos-r.fn-flex
	.fn-flex.flex-column.d-widget-list-card.pointer(
		draggable="true",
		@dragstart="dragstart($event)",
		@click="handleClick")
		.d-widget-list-img.fn-flex(:style="{ backgroundImage: `url(${widgetAvatar})` }")
		h2.ellipsis.text-center(:title="widgetTitle") {{ widgetTitle }}
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'item-card',
	props: {
		widgetType: {
			type: String,
		},
		widgetIs: {
			type: String,
		},
		widgetAvatar: {
			type: String,
		},
		widgetTitle: {
			type: String,
		},
		widgetMarket: {
			type: Boolean,
		},
		widgetApi: {},
		widgetBase: {},
		widgetConfig: {},
		widgetLayout: {},
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
				widgetLayout: this.widgetLayout,
				widgetIs: this.widgetIs,
				widgetType: this.widgetType,
				widgetAvatar: this.widgetAvatar,
				widgetTitle: this.widgetTitle,
				widgetMarket: this.widgetMarket,
				widgetApi: this.widgetApi,
				widgetBase: this.widgetBase,
				widgetConfig: this.widgetConfig,
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
					widgetLayout: this.widgetLayout,
					widgetIs: this.widgetIs,
					widgetType: this.widgetType,
					widgetAvatar: this.widgetAvatar,
					widgetTitle: this.widgetTitle,
					widgetMarket: this.widgetMarket,
					widgetApi: this.widgetApi,
					widgetBase: this.widgetBase,
					widgetConfig: this.widgetConfig,
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

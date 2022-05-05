<template lang="pug">
.widget-item-wrapper.pos-r
	.fn-flex.flex-column.d-widget-list-card.pointer(
		draggable="true",
		@dragstart="dragstart($event)",
		@click="handleClick")
		.d-widget-list-img.fn-flex(:style="{ backgroundImage: `url(${componentAvatar})` }")
		h2.ellipsis(:title="componentTitle") {{ componentTitle }}
</template>
<script>
import Editor from '@/core/Editor'

export default {
	name: 'item-card',
	props: {
		widgetType: {},
		componentConfig: {},
		componentAvatar: {},
		widgetVersion: {},
		componentTitle: {},
		market: { type: Boolean },
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
		handleClick() {
			this.editor.screen.createWidget(0, 0, {
				type: this.widgetType,
				config: this.componentConfig,
				market: this.market,
				widgetVersion: this.widgetVersion,
				startX: 0,
				startY: 0,
			})
		},
		/**
		 * @description h5 原生拖拽事件
		 */
		dragstart(e) {
			e.dataTransfer.setData(
				'widget-config',
				JSON.stringify({
					type: this.widgetType,
					config: this.componentConfig,
					market: this.market,
					widgetVersion: this.widgetVersion,
					startX: e.offsetX,
					startY: e.offsetY,
				}),
			)
			setTimeout(() => {
				this.$parent.widgetShow = false
			}, 300)
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
		color: var(--text-1);
		text-align: center;
		white-space: nowrap;
	}
}

.d-widget-list-img {
	width: 100%;
	height: 60px;
	background-color: var(--component-background);
	background-repeat: no-repeat;
	background-position: center;
	background-clip: content-box;
	background-size: contain;
}

.widget-item-wrapper {
	display: flex;
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

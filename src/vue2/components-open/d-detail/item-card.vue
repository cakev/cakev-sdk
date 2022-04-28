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
import { Component, Vue, Prop } from 'vue-property-decorator'
import Editor from '@/core/Editor'

@Component
export default class ItemCard extends Vue {
	@Prop() componentEnTitle
	@Prop() componentConfig
	@Prop() componentAvatar
	@Prop() componentId
	@Prop() componentVersion
	@Prop() componentTitle
	@Prop({ type: Boolean }) market

	editor = Editor.Instance()
	handleClick() {
		this.editor.screen.createWidget(0, 0, {
			type: this.componentEnTitle,
			config: this.componentConfig,
			market: this.market,
			componentVersion: this.componentVersion,
			componentId: this.componentId,
			startX: 0,
			startY: 0,
		})
	}

	/**
	 * @description h5 原生拖拽事件
	 */
	dragstart(e) {
		e.dataTransfer.setData(
			'widget-config',
			JSON.stringify({
				type: this.componentEnTitle,
				config: this.componentConfig,
				market: this.market,
				componentVersion: this.componentVersion,
				componentId: this.componentId,
				startX: e.offsetX,
				startY: e.offsetY,
			}),
		)
		setTimeout(() => {
			this.$parent.widgetShow = false
		}, 300)
	}
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

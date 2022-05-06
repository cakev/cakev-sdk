<template lang="pug">
.d-left-widget.fn-flex.flex-row.pos-r(@mouseleave="mouseleave")
	ul.d-left-widget-top.fn-flex.flex-row
		li.fn-flex.pos-r.pointer(
			v-for="item in editor.local.widgetType",
			:key="item.widgetTypeId",
			@mouseenter="mouseenter(item)",
			:class="{ active: widgetShow && currentWidgetTypeId === item.widgetTypeId }")
			p.ellipsis {{ item.widgetTypeName }}
	.d-left-widget-bottom.pos-a.z-index-999.fn-flex.flex-row(v-show="widgetShow")
		ul.fn-flex.flex-column
			li(v-for="item in currentWidgetTypeList", :class="{ active: item.widgetTypeId===hoverWidgetTypeId }")
				.d-left-widget-bottom-title.fn-flex.pointer(
					@mouseenter="handleCheckType(item)")
					label.pointer {{ item.widgetTypeName }}
		.d-left-widget-list.fn-flex
			item-card(v-for="widget in editor.local.widgets[hoverWidgetTypeId]", v-bind="widget")
</template>
<script>
import itemCard from './item-card.vue'
import Editor from '@/core/Editor'

export default {
	name: 'widget',
	components: {
		itemCard,
	},
	data() {
		return {
			editor: Editor.Instance(),
			hoverWidgetTypeId: null, // 组件二级分类
			currentWidgetTypeId: null, // 组件一级分类
			currentWidgetTypeList: [], // 组件二级分类
			widgetShow: false,
		}
	},
	methods: {
		mouseenter(item) {
			this.currentWidgetTypeId = item.widgetTypeId
			this.editor.local.widgetType.forEach(i => {
				if (i.widgetTypeId === item.widgetTypeId) {
					this.currentWidgetTypeList = i.children
				}
			})
			this.widgetShow = true
			this.handleCheckType(item.children[0])
		},
		mouseleave() {
			this.currentWidgetTypeList = []
			this.currentWidgetTypeId = null
			this.hoverWidgetTypeId = null
			this.widgetShow = false
		},
		handleCheckType(child) {
			this.hoverWidgetTypeId = child.widgetTypeId
		},
	},
}
</script>
<style lang="scss" scoped>
.d-widget-list-img {
	height: 100px;
}

.d-left-widget {
	top: 0;
	left: 0;
	height: 100%;
	padding: 0;
	background-color: #191c21;
}

.d-left-widget-top {
	background-color: #22242b;

	li {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 60px;
		min-width: 0;
		height: 60px;
		line-height: 1.3;
		color: rgb(188, 201, 212);
		cursor: pointer;

		&:hover,
		&.active {
			background: var(--background-4);
		}
	}

	p {
		user-select: none;
	}
}

.d-left-widget-list {
	flex: 1;
	flex-wrap: wrap;
	align-items: baseline;
	padding: 10px;
	overflow-y: auto;
	background: var(--background-4);
	border: 1px solid rgba(36, 38, 46, 0.4);

	&::-webkit-scrollbar {
		display: none;
	}
}

.d-left-widget-bottom {
	top: 60px;
	width: 402px;
	max-height: 400px;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.57);

	ul {
		overflow-y: auto;
		background: var(--background-2);

		&::-webkit-scrollbar {
			display: none;
		}
	}

	li {
		color: rgb(188, 201, 212);
		.d-left-widget-bottom-title {
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 60px;
		}
		&:hover,
		&.active {
			color: var(--text-3);
			background-color: var(--primary-color);
		}
	}

	label {
		line-height: 40px;
		text-align: center;
		user-select: none;
	}
}
</style>

<template lang="pug">
.d-left-widget.fn-flex.flex-row.pos-r(@mouseleave="mouseleave")
	ul.d-left-widget-top.fn-flex.flex-row
		li.fn-flex.pos-r.pointer(
			v-for="item in editor.local.widgets",
			:key="item.componentTypeId",
			@mouseenter="mouseenter(item.componentTypeId)",
			:class="{ active: widgetShow && leftIndex === item.componentTypeId }")
			p.ellipsis {{ item.componentTypeName }}
	.d-left-widget-bottom.pos-a.z-index-999.fn-flex.flex-row(v-show="widgetShow")
		ul.fn-flex.flex-column
			li(v-for="item in childrenList", :class="{ active: openList[item.componentTypeId] }")
				.d-left-widget-bottom-title.fn-flex.pointer(
					:class="{ active: current && item.componentTypeId === current.componentTypeId }",
					@mouseenter="handleCheckType(item.componentTypeId, item.market, item)")
					label.pointer {{ item.componentTypeName }}
		.d-left-widget-list.fn-flex(v-if="current", v-show="openList[current.componentTypeId]")
			item-card(
				v-for="widget in list[current.componentTypeId]",
				:market="current.market",
				:componentEnTitle="widget.componentEnTitle",
				:componentConfig="widget.componentConfig",
				:componentVersion="widget.componentVersion",
				:componentId="widget.componentId",
				:componentAvatar="widget.componentAvatar",
				:componentTitle="widget.componentTitle")
</template>
<script lang="ts">
import itemCard from './item-card.vue'
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@/core/Editor'
import { typeList } from '@/vue2/api/marketComponent.api'

@Component({
	components: {
		itemCard,
	},
})
export default class Widget extends Vue {
	editor: Editor = Editor.Instance()
	leftIndex = null
	rightIndex = null
	list = {}
	current = null
	openList = {}
	widgetShow = false

	get childrenList() {
		if (this.leftIndex) {
			return this.editor.local.widgets[this.leftIndex].children
		}
		return []
	}
	mouseenter(componentTypeId: string): void {
		this.leftIndex = componentTypeId
		this.widgetShow = true
		const item = this.editor.local.widgets[this.leftIndex].children[0]
		this.handleCheckType(item.componentTypeId, item.market, item)
	}
	mouseleave(): void {
		this.widgetShow = false
	}
	handleCheckType(componentTypeId: string, market: boolean, item): void {
		this.$set(this.openList, componentTypeId, true)
		this.current = item
		if (!this.list[componentTypeId]) {
			if (market) {
				typeList({
					componentTypeId,
					isCurrentVersion: true,
					status: 'SUCCESS',
					pageNum: 1,
					pageSize: 999,
				}).then(res => {
					this.$set(this.list, componentTypeId, res.list)
				})
			} else {
				const list = this.editor.local.widgets[this.leftIndex].children
				list.forEach(item => {
					if (item.componentTypeId === componentTypeId) {
						this.$set(this.list, componentTypeId, item.children)
					}
				})
			}
		}
	}
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
		.d-left-widget-bottom-title {
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 60px;
			color: rgb(188, 201, 212);

			&:hover,
			&.active {
				color: var(--text-3);
				background-color: var(--primary-color);
			}
		}
	}

	label {
		line-height: 40px;
		text-align: center;
		user-select: none;
	}
}
</style>

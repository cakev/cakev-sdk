<template lang="pug">
// 操作区
#d-editor.d-editor.pos-r(
	ref="canvas-wrapper",
	:class="{ fullscreen: editor.current.fullscreen }",
	:style="{ width: `calc(100% - ${editor.xRoomL2 + editor.xRoomR1}px)`, marginLeft: `${editor.xRoomL2}px` }",
	@contextmenu.stop.prevent)
	// 标尺容器
	d-ruler(ref="rulerCanvas")
		// 大屏
		#screen.pos-r(:style="canvasStyle", @drop="createWidget", @click.stop, @dragover.prevent)
			// 小工具清单
			item-card(
				:id="item.id",
				:key="item.id",
				:zIndex="item.zIndex",
				v-for="item in showWidgets",
				:getRefLineParams="getRefLineParams",
				:ref="item.id")
			dr-more(v-show="editor.currentWidgetList&&editor.currentWidgetList.length>1")
			.d-editor-line(data-top="0px", data-left="0px")
			.d-editor-line(:data-top="`${editor.height}px`", data-left="0px")
			.d-editor-line(
				data-top="0px",
				:style="{ width: 0, height: `${editor.height}px` }",
				:data-left="`${editor.width}px`")
			.d-editor-line(data-top="0px", data-left="0px", :style="{ height: `${editor.height}px`, width: 0 }")
			// 参考线
			span.ref-line.v-line.pos-a(
				v-for="item in vLine",
				v-show="item.display",
				:style="{ left: item.position, top: item.origin, height: item.lineLength }")
			span.ref-line.h-line.pos-a(
				v-for="item in hLine",
				v-show="item.display",
				:style="{ top: item.position, left: item.origin, width: item.lineLength }")
	widget-right-menu
	d-footer
</template>
<script lang="ts">
import widgetRightMenu from '../right-menu/widget.vue'
import dRuler from '../d-ruler/index.vue'
import drMore from '@/vue2/components-base/d-dr-more/index.vue'
import dFooter from '../d-footer/index.vue'
import ItemCard from './item-card.vue'
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@/core/Editor'

@Component({
	components: {
		ItemCard,
		dRuler,
		dFooter,
		drMore,
		widgetRightMenu,
	},
})
export default class DEditor extends Vue {
	editor: Editor = Editor.Instance()
	vLine = []
	hLine = []
	get canvasStyle(): any {
		if (this.editor) {
			return {
				width: `${this.editor.width}px`,
				height: `${this.editor.height}px`,
				backgroundColor: this.editor.backgroundColor,
				backgroundImage: `url(${this.editor.backgroundImage})`,
				...this.editor.screen.screenFilterStyle,
			}
		}
		return {}
	}
	get showWidgets() {
		const list = []
		for (const key in this.editor.screen.screenWidgetsLays) {
			const widget = this.editor.screen.screenWidgetsLays[key]
			if ((widget.scene === this.editor.current.currentSceneIndex || widget.scene === 0) && !widget.hide) {
				list.push(widget)
			}
		}
		return list
	}
	createWidget(e: any): void {
		const widgetConfig = e.dataTransfer.getData('widget-config')
		if (widgetConfig) {
			this.editor.createWidget(e.offsetX, e.offsetY, JSON.parse(widgetConfig))
		}
	}

	getRefLineParams(params: any, item: any): void {
		const { vLine, hLine } = params
		this.vLine = vLine.map((child: any) => {
			child.w = item.config.layout.size.width
			child.h = item.config.layout.size.height
			return child
		})
		this.hLine = hLine.map((child: any) => {
			child.w = item.config.layout.size.width
			child.h = item.config.layout.size.height
			return child
		})
	}
	fullscreenchange(): void {
		this.editor.current.fullscreen = !this.editor.current.fullscreen
	}
	beforeDestroy(): void {
		this.editor.current.fullscreen = false
		this.editor.ruler = null
		document.removeEventListener('fullscreenchange', this.fullscreenchange)
	}
	created() {
		this.editor.updateEditorStatus('inEdit')
	}
	mounted(): void {
		document.addEventListener('fullscreenchange', this.fullscreenchange)
	}
}
</script>
<style lang="scss">
@import 'index.scss';
</style>
<style lang="scss" scoped>
.ref-line {
	background-color: var(--lineRed);
}

.v-line {
	width: 1px;
	height: 100%;
}

.h-line {
	width: 100%;
	height: 1px;
}

.d-editor {
	min-width: 500px;
	background-color: #313239;

	&.fullscreen {
		top: 0 !important;
		right: 0 !important;
		bottom: 0 !important;
		left: 0 !important;
		box-sizing: border-box !important;
		width: 100% !important;
		min-width: 0 !important;
		max-width: none !important;
		height: 100% !important;
		min-height: 0 !important;
		max-height: none !important;
		margin: 0 !important;
		transform: none !important;
		object-fit: contain;
	}
}

#screen {
	background-size: contain;
	box-shadow: rgba(0, 0, 0, 0.19) 0 6px 6px 0;
	transition: background-image 0.5s;

	&::before {
		display: flex;
		content: '';
	}
}
</style>

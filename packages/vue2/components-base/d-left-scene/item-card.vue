<template lang="pug">
li.pointer.pos-r.d-left-scene-list-li(
	:class="{ active: editor.currentWidgetList.includes(widgetId) }",
	@click.stop="handleClick")
	.parent.fn-flex
		.d-left-scene-left
			h2 {{ editor.screen.screenWidgets[widgetId].widgetBase.name }}
		.d-left-scene-right
			i-icon(
				v-if="hide",
				type="md-eye-off",
				title="显示",
				@click="handleTaggerHide(widgetId)",
				@click.stop)
			i-icon(
				style="margin-left: 10px",
				v-if="editor.screen.screenWidgets[widgetId].widgetBase.locked",
				type="md-unlock",
				title="解锁",
				@click="handleUnLock(widgetId)",
				@click.stop)
	//scene-group(:childList="item.children")
</template>
<script lang="ts">
import { Icon } from 'view-design'
import Editor from '@/core/Editor'

export default {
	components: {
		'i-icon': Icon,
	},
	name: 'd-left-scene-item',
	data() {
		return {
			editScene: false,
			copyModel: false,
			editor: Editor.Instance(),
		}
	},
	props: {
		hide: {
			type: Boolean,
		},
		scene: {
			type: Number | String,
		},
		widgetId: {
			type: String,
		},
		zIndex: {
			type: Number,
		},
	},
	methods: {
		handleClick(e): void {
			if (e.shiftKey) {
				this.editor.selectWidget(this.editor.screen.screenWidgets[this.widgetId])
			} else {
				this.editor.unSelectWidget()
				this.editor.selectWidget(this.editor.screen.screenWidgets[this.widgetId])
			}
		},
		handleUnLock(widgetId: string): void {
			this.editor.screen.screenWidgets[widgetId].widgetBase.locked = false
		},
		handleTaggerHide(widgetId: string): void {
			this.editor.screen.screenWidgetsLays[widgetId].hide = !this.editor.screen.screenWidgetsLays[widgetId].hide
		},
	},
}
</script>
<style lang="scss" scoped>
.d-left-scene-list-li {
	margin: 10px 0;
	font-size: 12px;
	border: 1px solid #393b4a;

	.parent {
		padding: 10px;
	}

	/deep/ {
		.ivu-input {
			font-size: 12px;
		}
	}

	h3,
	p {
		font-size: 12px;
		font-weight: normal;
	}

	h2 {
		font-size: 14px;
		font-weight: normal;
		color: #fff;
	}

	&.active {
		color: var(--white);
		background-color: var(--themeColor);
		border-color: var(--themeColor);
	}

	&:hover {
		border-color: var(--themeColor);
	}
}

.d-left-scene-left,
.d-left-scene-right {
	align-items: center;
}

.d-left-scene-left {
	width: 150px;

	.ivu-icon {
		margin-right: 4px;
		font-size: 14px;

		&:hover {
			color: var(--themeColor);
		}
	}
}

.d-left-scene-right {
	justify-content: center;
	margin-left: auto;
	font-weight: bold;
}

.child {
	padding: 10px 10px 10px 20px;
	background: #282f3a;

	&.active {
		color: var(--white);
		background-color: var(--themeColor);
		border-color: var(--themeColor);
	}

	&:hover {
		border-color: var(--themeColor);
	}
}
</style>

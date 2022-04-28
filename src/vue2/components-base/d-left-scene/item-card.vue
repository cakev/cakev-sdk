<template lang="pug">
li.pointer.pos-r.d-left-scene-list-li(
	:class="{ active: editor.currentWidgetList.includes(item.id) }",
	@click.stop="handleClick($event, item)")
	.parent.fn-flex
		.d-left-scene-left
			h2 {{ editor.screen.screenWidgets[item.id].config.widget.name }}
		.d-left-scene-right
			i-icon(
				v-if="editor.screen.screenWidgetsLays[item.id].hide",
				type="md-eye-off",
				title="显示",
				@click="handleTaggerHide(item.id)",
				@click.stop)
			i-icon(
				style="margin-left: 10px",
				v-if="editor.screen.screenWidgets[item.id].config.widget.locked",
				type="md-unlock",
				title="解锁",
				@click="handleUnLock(editor.screen.screenWidgets[item.id].id)",
				@click.stop)
	scene-group(:childList="item.children")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'view-design'
import Editor from '@/core/Editor'

@Component({
	components: {
		'i-icon': Icon,
	},
})
export default class DLeftSceneItem extends Vue {
	editScene = false
	copyModel = false
	editor: Editor = Editor.Instance()
	@Prop() item

	handleClick(e, item): void {
		if (e.shiftKey) {
			this.editor.selectWidget(this.editor.screen.screenWidgets[item.id])
		} else {
			this.editor.unSelectWidget()
			this.editor.selectWidget(this.editor.screen.screenWidgets[item.id])
		}
	}

	handleUnLock(id: string): void {
		this.editor.screen.screenWidgets[id].config.widget.locked = false
	}

	handleTaggerHide(id: string): void {
		this.editor.screen.screenWidgetsLays[id].hide = !this.editor.screen.screenWidgetsLays[id].hide
	}
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

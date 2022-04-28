<template lang="pug">
.main
	.child.fn-flex.flex-row(
		@click.stop="handleClick($event, child)",
		:class="{ active: editor.currentWidgetList[0] === child.id }")
		.d-left-scene-left
			h2 {{ editor.screen.screenWidgets[child.id].config.widget.name }}
		.d-left-scene-right
	scene-group(
		:childList="editor.screen.screenWidgets[child.id].children",
		v-if="editor.screen.screenWidgets[child.id].children")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Editor from '@/core/Editor'

@Component
export default class widgetGroupItem extends Vue {
	editor: Editor = Editor.Instance()
	@Prop() child

	handleClick(e, item): void {
		if (e.shiftKey) {
			this.editor.selectWidget(this.editor.screen.screenWidgets[item.id])
		} else {
			this.editor.unSelectWidget()
			this.editor.selectWidget(this.editor.screen.screenWidgets[item.id])
		}
	}
}
</script>
<style lang="scss" scoped>
.main {
	padding-left: 15px;
	background: #282f3a;
}

.child {
	padding: 10px 10px 10px 20px;

	&.active {
		color: var(--white);
		background-color: var(--themeColor);
		border-color: var(--themeColor);
	}

	&:hover {
		border-color: var(--themeColor);
	}

	h2 {
		font-size: 14px;
		font-weight: normal;

		&.group-title {
			color: #ecec43;
		}
	}
}
</style>

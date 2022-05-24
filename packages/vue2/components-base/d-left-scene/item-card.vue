<template lang="pug">
li.pointer.pos-r.d-left-scene-list-li(
	:class="{ active: editor.current.currentWidgetId === lay.widgetId }",
	@click.stop="handleClick"
)
	.parent.fn-flex
		c-row.d-left-scene-left
			h2 {{ editor.screen.screenWidgets[lay.widgetId].widgetBase.name }}
		c-row.d-left-scene-right
			c-svg(v-if="lay.hide", :size="14", type="eye", @click="editor.screen.hideWidget(lay.widgetId)", @click.stop)
			c-svg(
				style="margin-left: 10px",
				:size="14",
				v-if="editor.screen.screenWidgets[lay.widgetId].widgetBase.locked",
				type="lock",
				@click="editor.screen.lockWidget(lay.widgetId)",
				@click.stop
			)
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'd-left-scene-item',
	data() {
		return {
			editScene: false,
			copyModel: false,
			editor: Editor.Instance() as Editor,
		}
	},
	props: {
		lay: {},
	},
	computed: {
		widget() {
			return this.editor.screen.screenWidgets[this.lay.widgetId]
		},
	},
	methods: {
		handleClick(): void {
			this.editor.current.selectWidget(this.widget)
		},
	},
}
</script>
<style lang="scss" scoped>
.d-left-scene-list-li {
	margin: 10px 0;
	border: 1px solid var(--contentBorderColor);
	transition: all 0.3s;
	.parent {
		padding: 10px;
	}

	&:hover {
		background-color: var(--contentBorderColor);
		box-shadow: var(--panelBoxshowColor);
	}

	&.active {
		background-color: var(--themeColor);
	}
}

.d-left-scene-left {
	width: 150px;
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
		color: #fff;
		background-color: var(--themeColor);
		border-color: var(--themeColor);
	}

	&:hover {
		border-color: var(--themeColor);
	}
}
</style>

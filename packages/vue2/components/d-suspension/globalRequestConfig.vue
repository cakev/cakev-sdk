<template lang="pug">
c-drawer(title="全局请求设置", v-model="currentVal")
	c-column(align="start")
		c-label 请求链接前缀
		c-input(v-model="editor.screen.screenDomain", placeholder="http://example.com")
	c-column(align="start")
		c-label 请求头设置
		editor.d-manage-modal-control-editor(
			v-model="editor.screen.screenHeaders",
			@init="editorInit",
			lang="javascript",
			theme="idle_fingers",
			height="200")
</template>
<script lang="ts">
import Editor from '@/core/Editor'
const editor = require('vue2-ace-editor')

export default {
	name: 'global-request-config',
	components: {
		editor,
	},
	props: {
		value: {
			type: Boolean,
			default: false,
		},
	},
	data(props) {
		return {
			currentVal: props.value,
			editor: Editor.Instance() as Editor,
		}
	},
	watch: {
		value(val) {
			this.currentVal = val
		},
		currentVal(val) {
			this.$emit('input', val)
		},
	},
	methods: {
		editorInit() {
			require('brace/ext/language_tools')
			require('brace/mode/html')
			require('brace/mode/javascript')
			require('brace/mode/less')
			require('brace/mode/json')
			require('brace/theme/idle_fingers')
			require('brace/snippets/javascript')
		},
	},
}
</script>
<style lang="scss" scoped>
::v-deep {
	.ace_scrollbar-v {
		&::-webkit-scrollbar {
			width: 4px;
			height: 1px;
			transition: all 0.3s;
		}

		&::-webkit-scrollbar-thumb {
			background: rgba(83, 83, 83, 1);
			border-radius: 10px;
			transition: all 0.3s;
		}

		&::-webkit-scrollbar-track {
			background: rgba(237, 237, 237, 1);
			border-radius: 10px;
			transition: all 0.3s;
		}
	}

	.ace-idle-fingers {
		background-color: rgb(24, 27, 36) !important;
		border: 1px solid #393b4a;

		.ace_gutter {
			background-color: rgb(24, 27, 36) !important;
			border-right: 1px solid #393b4a;
		}

		.ace_gutter-active-line {
			background-color: rgb(24, 27, 36) !important;
		}

		.ace_cursor {
			color: #999 !important;
		}

		.ace_marker-layer {
			.ace_active-line {
				background-color: rgb(24, 27, 36) !important;
			}
		}

		.ace_string {
			color: var(--themeColor) !important;
		}

		.ace_variable {
			color: #a2adce;
		}

		.ace_numeric {
			color: #4cbd66 !important;
		}
	}
}
</style>

<template lang="pug">
d-drawer(title="全局请求设置", v-model="currentVal")
	e-form-item(direction="column", align="start")
		e-label(value="请求链接前缀")
		e-input(v-model="editor.screen.screenDomain", placeholder="http://example.com")
	e-form-item(direction="column", align="start")
		e-label(value="请求头设置")
		editor.d-manage-modal-control-editor(
			v-model="editor.screen.screenHeaders",
			@init="editorInit",
			lang="javascript",
			theme="idle_fingers",
			height="200")
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import eInput from '@/vue2/components-style/e-input/index.vue'
import eLabel from '@/vue2/components-style/e-label/index.vue'
import Editor from '@/core/Editor'
const editor = require('vue2-ace-editor')
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'
import EFormItem from '@/vue2/components-style/e-form-item/index.vue'
@Component({
	components: {
		editor,
		eInput,
		eLabel,
		DDrawer,
		EFormItem,
	},
})
export default class GlobalRequestConfig extends Vue {
	@Prop(Boolean) value!: boolean
	currentVal = false
	editor: Editor = Editor.Instance()

	@Watch('value')
	onValueChange(val: boolean): void {
		this.currentVal = val
	}

	@Watch('currentVal')
	onCurrentVal(val: boolean): void {
		this.$emit('input', val)
	}

	editorInit(): void {
		require('brace/ext/language_tools')
		require('brace/mode/html')
		require('brace/mode/javascript')
		require('brace/mode/less')
		require('brace/mode/json')
		require('brace/theme/idle_fingers')
		require('brace/snippets/javascript')
	}
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

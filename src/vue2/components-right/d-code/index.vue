<template lang="pug">
div
	d-right-control(:label="label", title="全屏编辑", icon="md-code-working")
		slot(name="right")
	.d-manage-modal-control(v-if="show")
		editor.d-manage-modal-control-editor(
			v-model="syncedCode",
			@init="editorInit",
			@on-foucs="console.log(1)",
			:lang="lang",
			:theme="theme",
			height="200")
		i-modal(v-model="modal", :footer-hide="true", :title="title")
			editor.d-manage-modal-control-editor(
				v-model="syncedCode",
				@init="editorInit",
				:lang="lang",
				:theme="theme",
				height="600")
</template>
<script>
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { Icon, Modal, Tooltip } from 'view-design'
import dRightControl from '@/vue2/components-right/d-right-control/index.vue'
const editor = require('vue2-ace-editor')

@Component({
	components: {
		editor,
		dRightControl,
		'i-icon': Icon,
		'i-modal': Modal,
		'i-tooltip': Tooltip,
	},
})
export default class DDcode extends Vue {
	modal = false
	@Prop({ default: '代码' }) label
	@Prop({ default: 'javascript' }) lang
	@Prop({ default: '全屏模式' }) title
	@Prop({ default: 'idle_fingers' }) theme
	@Prop({ default: true }) show
	@PropSync('code') syncedCode

	editorInit() {
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
.full-icon {
	padding-left: 6px;
	cursor: pointer;
}

.d-manage-modal-control-editor {
	margin-right: 10px;
}

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

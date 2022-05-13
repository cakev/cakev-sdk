<template lang="pug">
.d-detail-left.fn-flex
	.d-detail-title.fn-flex.pointer(:title="editor.screen.screenName", @click="editName = true")
		c-input(width="238px" v-model="editor.screen.screenName", v-if="editName", @blur="editName = false", :autofocus="true")
		span.fn-flex.ellipsis(v-else) {{ editor.screen.screenName }}
	widget
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import widget from './widget.vue'

export default {
	name: 'd-detail',
	components: {
		widget,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
			editName: false,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-detail-title {
	align-items: center;
	margin: 0 20px;
	span {
		align-items: center;
		width: 238px;
		height: 30px;
		padding: 4px 8px;
		border: 1px solid transparent;
		border-radius: var(--panelBorderRadius);
		&:hover {
			border: 1px solid var(--contentBorderColor);
		}
	}
}

.d-detail-left {
	height: 100%;
	margin-right: auto;
}
</style>

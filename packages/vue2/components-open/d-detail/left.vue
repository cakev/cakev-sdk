<template lang="pug">
.d-detail-left.fn-flex
	.d-detail-title.fn-flex.pointer(:title="editor.screen.screenName", @click="editName = true")
		c-input(width="152px" v-model="editor.screen.screenName", v-if="editName", @blur="editName = false", :autofocus="true")
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
	margin-right: auto;
	font-size: 15px;
	color: var(--text-tab);
	margin-left: 20px;
	span {
		align-items: center;
		width: 152px;
		height: 30px;
		padding: 0 8px;

		&:hover {
			background-color: #30333d;
		}
	}
}

.d-detail-left {
	height: 100%;
	margin-right: auto;
}
</style>

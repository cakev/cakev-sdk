<template lang="pug">
c-drawer(title="大屏外链", v-model="currentVal")
	template(v-for="(item, index) in editor.screen.screenHead")
		c-row.global-link-list
			c-column.global-link-content
				c-row(style="width: 100%")
					c-label 链接
					c-input(v-model="item.src")
				c-row(style="width: 100%")
					c-label 链接类型
					c-select(v-model="item.type")
						c-select-option(value="script", label="script")
						c-select-option(value="link", label="link")
			c-svg.global-link-remove(type="remove", @click="removeHandle(index)")
	c-row.global-link-add(@click="createHandle")
		c-svg(type="add")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'global-link',
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
		'editor.screen.screenHead': {
			handler(val) {
				this.editor.screen.loadHead(val)
			},
			deep: true,
		},
	},
	methods: {
		removeHandle(index): void {
			this.editor.screen.destroyHead(index)
		},
		createHandle(): void {
			this.editor.screen.createHead()
		},
	},
}
</script>
<style lang="scss" scoped>
.global-link-remove {
	color: var(--panelFontColor);
	cursor: pointer;
}
.global-link-list {
	margin-bottom: 10px;
}
.global-link-content {
	flex: 1;
	margin-right: 10px;
}
.global-link-add {
	color: var(--panelFontColor);
	cursor: pointer;
	padding: 10px;
	justify-content: center;
	border: 1px solid;
}
</style>

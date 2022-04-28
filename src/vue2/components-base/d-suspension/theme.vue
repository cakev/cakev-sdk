<template lang="pug">
d-drawer(title="主题风格", v-model="currentVal")
	i-form
		e-label(value="色盘")
		i-color-picker(
			:alpha="true",
			size="small",
			v-model="colorDiskArray[index]",
			@on-change="val => colorDiskChange(val, index)",
			v-for="(item, index) in colorTheme.colorDisk",
			:style="{ marginLeft: '10px', marginBottom: '10px' }")
		i-button(@click="handleResetColor", type="primary") 一键恢复官方主题色盘
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Button, ColorPicker, Form } from 'view-design'
import eLabel from '@/vue2/components-style/e-label/index.vue'
import Editor from '@/core/Editor'
import colorTheme from '@/core/colorTheme.js'
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'

@Component({
	components: {
		eLabel,
		DDrawer,
		'i-form': Form,
		'i-button': Button,
		'i-color-picker': ColorPicker,
	},
})
export default class Theme extends Vue {
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

	get colorTheme() {
		return this.editor.currentWidget.config.config.colorTheme
			? this.editor.currentWidget.config.config.colorTheme
			: colorTheme
	}
	get colorTheme() {
		return this.editor.currentWidget.config.config.colorTheme
			? this.editor.currentWidget.config.config.colorTheme
			: colorTheme
	}

	get colorDiskArray() {
		let obj = {}
		const theme = this.colorTheme
		theme.colorDisk.map((item, index) => {
			obj[index] = item
		})
		return obj
	}

	handleResetColor(): void {
		this.editor.currentWidget.config.config.colorTheme = colorTheme
		this.handleSync()
	}

	colorDiskChange(val: string, index: number): void {
		if (!this.editor.currentWidget.config.config.colorTheme) {
			this.editor.currentWidget.config.config.colorTheme = {}
		}
		if (!this.editor.currentWidget.config.config.colorTheme.colorDisk) {
			this.editor.currentWidget.config.config.colorTheme.colorDisk = []
		}
		this.editor.currentWidget.config.config.colorTheme.colorDisk[index] = val
		this.handleSync()
	}

	handleSync(): void {
		this.editor.refreshWidget()
	}
}
</script>

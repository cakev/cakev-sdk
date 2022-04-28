<template lang="pug">
.d-manage-modal-control-base
	d-right-control(label="色盘")
		i-color-picker(
			:alpha="true",
			size="small",
			v-model="colorDiskArray[index]",
			@on-change="val => colorDiskChange(val, index)",
			v-for="(item, index) in colorTheme.colorDisk",
			:style="{ marginLeft: '10px', marginBottom: '10px' }")
	d-right-control
		i-button(@click="handleResetColor", type="primary") 一键恢复官方主题色盘
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'
import colorTheme from '@/core/colorTheme.js'

@Component
export default class FuncAnimation extends func {
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

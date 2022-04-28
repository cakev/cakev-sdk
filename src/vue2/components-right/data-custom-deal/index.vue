<template lang="pug">
d-right-swiper(title="自定义数据过滤器", v-if="editor.currentWidget.settingDataHandle.length > 0")
	d-right-control(:label="item.label", v-for="item in editor.currentWidget.settingDataHandle")
		i-select(v-model="editor.currentWidget.settingData[item.key]", :multiple="true")
			i-option(v-for="item in list", :value="item") {{ item }}
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import { Component } from 'vue-property-decorator'

@Component
export default class DataEcharts extends func {
	get list() {
		const data = JSON.parse(this.editor.currentWidget.config.api.data)
		let result = []
		data.forEach(item => {
			for (const key in item) {
				if (result.indexOf(key) === -1) {
					result.push(key)
				}
			}
		})
		return result
	}
}
</script>

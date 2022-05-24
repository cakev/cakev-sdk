<template lang="pug">
.d-manage-modal-control-data
	c-collapse(label="数据请求", :value="true")
		c-control(label="数据类型")
			template(slot="right")
				c-select(v-model="apiType", :style="{ width: '208px' }")
					c-select-option(value="静态数据" label="静态数据")
					c-select-option(value="API接口" label="API接口")
		c-control(label="接口地址", v-if="apiType === 'API接口'")
			template(slot="right")
				c-input(v-model="widget.widgetApi.url")
		c-control(v-if="apiType === 'API接口'")
			template(slot="right")
				c-select(v-model="widget.widgetApi.method", :style="{ marginRight: '10px', width: '100px' }")
					c-select-option(value="GET" label="GET") 
					c-select-option(value="POST" label="POST") 
					c-select-option(value="PUT" label="PUT") 
					c-select-option(value="DELETE" label="DELETE") 
					c-select-option(value="PATCH" label="PATCH") 
				c-input(v-model="widget.widgetApi.path", :style="{ width: '100px' }")
		c-control(label="请求参数")
			template(slot="bottom")
				c-code(lang="json", v-model="widget.widgetApi.params")
		c-control(label="响应数据")
			template(slot="bottom")
				c-code(lang="json", v-model="widget.widgetApi.data")
	c-collapse(
		type="eye"
		label="数据过滤器",
		:enable="widget.widgetApi.processEnable",
		@open-click="widget.widgetApi.processEnable = true",
		@close-click="widget.widgetApi.processEnable = false")
		c-control(label="数据过滤器",)
			template(slot="bottom")
				c-code(v-model="widget.widgetApi.processBody")
	c-collapse(
		type="eye"
		label="自动更新",
		:enable="widget.widgetApi.autoFetchEnable",
		@open-click="widget.widgetApi.autoFetchEnable = true",
		@close-click="widget.widgetApi.autoFetchEnable = false")
		c-control
			template(slot="right")
				c-input(
					append="ms"
					v-model="widget.widgetApi.autoFetchDuration")
</template>
<script lang="ts">
import DataEvent from '@/vue2/components-right/data-event/index.vue'
import Editor from '@/core/Editor'

export default {
	components: {
		DataEvent,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	methods: {
		updateData(val: any): void {
			this.widget.widgetApi.data = val
		},
	},
	computed: {
		apiType: {
			get() {
				if (this.widget.widgetApi.url) {
					return 'API接口'
				} else {
					return '静态数据'
				}
			},
			set(val) {
				if (val === '静态数据') {
					this.widget.widgetApi.url = ''
				} else {
					this.widget.widgetApi.url = '/'
				}
			},
		},
		widget(){
			return this.editor.screen.screenWidgets[this.editor.current.currentWidgetId]
		}
	},
}
</script>

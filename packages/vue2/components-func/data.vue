<template lang="pug">
.d-manage-modal-control-data
	c-collapse(title="数据请求", :show="true")
		c-control(label="数据类型")
			template(slot="right")
				i-select(v-model="apiType", :style="{ width: apiType === '数仓平台' ? '122px' : '208px' }")
					i-option(value="静态数据") 静态数据
					i-option(value="API接口") API接口
		c-control(label="接口地址", v-if="apiType === 'API接口'")
			template(slot="right")
				i-input(v-model="editor.currentWidget.config.api.url")
		c-control(v-if="apiType === 'API接口'")
			template(slot="right")
				i-select(v-model="editor.currentWidget.config.api.method", :style="{ marginRight: '10px', width: '100px' }")
					i-option(value="GET") GET
					i-option(value="POST") POST
					i-option(value="PUT") PUT
					i-option(value="DELETE") DELETE
					i-option(value="PATCH") PATCH
				i-input(v-model="editor.currentWidget.config.api.path", :style="{ width: '100px' }")
		c-control(label="请求参数")
			template(slot="bottom")
				c-code(
				lang="json",
				:code="typeof editor.currentWidget.config.api.params === 'string' ? editor.currentWidget.config.api.params : JSON.stringify(editor.currentWidget.config.api.params)",
				@update:code="value => (editor.currentWidget.config.api.params = JSON.parse(value))")
		c-control(label="响应数据")
			template(slot="bottom")
				c-code( lang="json", :code="apiData", @update:code="value => (apiData = value)")
	c-collapse(
		type="eye"
		title="数据过滤器",
		:enable="editor.currentWidget.config.api.process.enable",
		@open-click="editor.currentWidget.config.api.process.enable = true",
		@close-click="editor.currentWidget.config.api.process.enable = false")
		c-control(label="数据过滤器",)
			template(slot="bottom")
				c-code(
					:code="editor.currentWidget.config.api.process.methodBody",
					@update:code="value => (editor.currentWidget.config.api.process.methodBody = value)")
	c-collapse(
		type="eye"
		title="自动更新",
		:enable="editor.currentWidget.config.api.autoFetch.enable",
		@open-click="editor.currentWidget.config.api.autoFetch.enable = true",
		@close-click="editor.currentWidget.config.api.autoFetch.enable = false")
		c-control
			template(slot="right")
				i-input-number(
					:min="1",
					:step="1",
					:formatter="value => `${value} ms`",
					v-model="editor.currentWidget.config.api.autoFetch.duration")
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import DataEvent from '@/vue2/components-right/data-event/index.vue'

export default {
	name: 'func-data',
	mixins: [func],
	components: {
		DataEvent,
	},
	computed: {
		apiType: {
			get() {
				if (this.editor.currentWidget.config.api.url) {
					return 'API接口'
				} else {
					return '静态数据'
				}
			},
			set(val) {
				if (val === '静态数据') {
					this.editor.currentWidget.config.api.url = ''
				} else {
					this.editor.currentWidget.config.api.url = '/'
				}
			},
		},
		apiData: {
			get() {
				const req = this.getItemValue('config.api.data')
				if (typeof req === 'object') {
					try {
						return JSON.stringify(req, null, '\t')
					} catch (e) {
						// @ts-ignore
					}
				} else {
					if (req) {
						try {
							return JSON.stringify(JSON.parse(req), null, '\t')
						} catch (e) {
							// @ts-ignore
						}
					}
					return ''
				}
			},
			set(v) {
				const data = this.getItemObj('config.api.data')
				const prop = 'config.api.data'.split('.').reverse()[0]
				if (v) {
					try {
						data[prop] = JSON.stringify(JSON.parse(v))
					} catch (err) {
						console.log(
							`${this.editor.currentWidget.config.widget.name} ${this.editor.currentWidget.config.widget.widgetVersion} JSON 格式化 响应数据有错误信息！！！`,
						)
						console.log(err.stack)
					}
				} else {
					data[prop] = ''
				}
			},
		},
	},
}
</script>

<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '数据请求' }]")
	template(#content)
		el-form-item(label="数据类型")
			el-select(v-model="api")
				el-option(value="no", label="无")
				el-option(value="static", label="静态数据")
				el-option(value="api", label="API接口")
div(v-if="currentWidget.api")
	d-setting-container(v-if="currentWidget.api.url")
		template(#title)
			d-titles(:list="[{ label: 'API配置' }]")
		template(#content)
			el-form-item(label="地址")
				d-input(v-model="currentWidget.api.url")
			el-form-item(label="方式")
				el-select(v-model="currentWidget.api.method")
					el-option(value="GET", label="GET")
					el-option(value="POST", label="POST")
					el-option(value="DELETE", label="DELETE")
					el-option(value="HEAD", label="HEAD")
					el-option(value="OPTIONS", label="OPTIONS")
					el-option(value="PUT", label="PUT")
					el-option(value="PATCH", label="PATCH")
					el-option(value="PURGE", label="PURGE")
					el-option(value="LINK", label="LINK")
					el-option(value="UNLINK", label="UNLINK")
			el-form-item(label="参数")
				d-input(v-model="currentWidget.api.params")
			el-form-item(label="路径")
				d-input(v-model="currentWidget.api.path")
			el-form-item
				el-button(@click="test") 测试接口
	d-setting-container
		template(#title)
			d-titles(:list="[{ label: '数据内容' }]")
		template(#content)
			el-form-item(:label="currentWidget.api.url?'接口数据':'模拟数据'")
				d-input(v-model="currentWidget.data")
			el-form-item(label="数据过滤器" v-if="currentWidget.api.url")
				d-input(v-model="currentWidget.api.params")
	d-setting-container(v-if="currentWidget.api.url")
		template(#title)
			d-titles(:list="[{ label: '自动更新' }]")
		template(#content)
			el-form-item(label="开启")
				el-checkbox(v-model="currentWidget.api.loop")
			el-form-item(label="时长")
				d-input(v-model="currentWidget.api.loopTime", format="number", append="ms")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import Manager from '@/core/Manager'
import WidgetApi from '@/core/Widget/api'
import currentWidget from './currentWidget'
import request from '@/vue3/widget/request'
import { Method } from 'axios'

export default defineComponent({
	name: 'setting-widget-data',
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		const createApi = (obj?: {
			method?: Method
			url: string
			params?: any
			loop?: boolean
			loopTime?: number
			headers?: any
			path?: string
		}) => {
			state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api = new WidgetApi(obj)
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}

		const api = computed({
			get: () => {
				if (state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api) {
					if (state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api.url) {
						return 'api'
					}
					return 'static'
				}
				return 'no'
			},
			set: val => {
				if (val === 'no')
					delete state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api
				if (val === 'static') createApi()
				if (val === 'api') createApi({ url: '/example' })
			},
		})

		const test = () => {
			request({
				id: state.manager.screen.currentWidgets[0],
				...state.manager.screen.currentScreen.widgets[state.manager.screen.currentWidgets[0]].api,
			})
		}

		return {
			...toRefs(state),
			currentWidget,
			api,
			test,
		}
	},
})
</script>

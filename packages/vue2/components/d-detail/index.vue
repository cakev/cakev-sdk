<template lang="pug">
header.d-detail.fn-flex
	left
	input#originFile.fn-hide(type="file", accept="application/json", @change="handleFile")
	ul.d-detail-right.fn-flex
		li.fn-flex.flex-column.pointer(@click="handleExport")
			c-svg(type="export", :size="20")
			span 导出
		label.fn-flex.flex-column.pointer(for="originFile")
			c-svg(type="import", :size="20")
			span 导入
		li.fn-flex.flex-column.pointer(@click="preview")
			c-svg(type="preview", :size="20")
			span 预览
		li.fn-flex.flex-column.pointer(@click="save", v-if="editor.config.api.saveUrl")
			c-svg(type="save", :size="20")
			span 保存
	c-loading(:show="loading")
</template>
<script lang="ts">
import { downloadFile } from '@cakev/util'
import Editor from '@/core/Editor'
import left from './left.vue'
import { CModal, CNotice } from '@cakev/ui'
import HttpTask from '@/core/Http/task'

export default {
	name: 'd-detail',
	components: {
		left,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
			loading: false,
		}
	},
	mounted() {
		this.editor.resetZoom()
	},
	methods: {
		save() {
			CModal.confirm({
				title: '提示',
				content: '是否确认保存',
				onOk: () => {
					this.editor.http.pushOne(
						new HttpTask({
							url: this.editor.config.api.saveUrl,
							method: 'post',
							params: this.editor.screen,
							domain: '',
							headers: {},
							loopTime: 0,
						})
							.then(() => {
								CNotice.info({ content: '保存成功' })
							})
							.catch(() => {
								CNotice.info({ content: '保存失败' })
							}),
					)
				},
				okText: '确定',
				cancelText: '取消',
			})
		},
		preview() {
			this.editor.screenCache.add('previewData', this.editor.screen).then(() => {
				window.open(`${location.origin}${this.editor.config.previewUrl}`)
			})
		},
		handleExport() {
			const fileName = this.editor.screen.screenName
			CModal.confirm({
				title: `导出文件：${fileName}.json`,
				content: '可用于看板数据备份、迁移。',
				onOk: () => {
					const config = this.editor.screen
					downloadFile(config, fileName, 'json')
				},
				okText: '确定',
				cancelText: '取消',
			})
		},
		handleFile(event) {
			const file = event.target.files[0]
			const reader: FileReader = new FileReader()
			reader.onload = (e: any) => {
				try {
					this.loading = true
					this.editor.screen.init(JSON.parse(e.target.result))
					this.loading = false
				} catch (error) {
					console.error(error)
					this.loading = false
					CNotice.info({ content: '配置文件识别失败' })
				}
			}
			reader.onerror = () => {
				this.loading = false
				CNotice.info({ content: '配置文件识别失败' })
			}
			reader.readAsText(file)
		},
	},
	beforeDestroy() {
		this.editor.screen.clear()
		this.editor.current.clear()
	},
}
</script>
<style lang="scss" scoped>
.d-detail-right {
	height: 100%;

	li,
	label {
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 15px;

		span {
			margin-top: 4px;
		}

		&:hover {
			color: #fff;
			background-color: #30333d;
		}
		&.active {
			&::before {
				position: absolute;
				top: 5px;
				right: 5px;
				width: 4px;
				height: 4px;
				content: '';
				background-color: var(--themeColor);
				border-radius: 50%;
			}
		}
	}
}

.d-detail-import-button {
	line-height: 32px;
}

.d-detail {
	align-items: center;
	width: 100%;
	min-width: 1088px;
	height: 60px;
	background: var(--panelBgColor);
	border-bottom: 1px solid #323232;
	font-size: var(--panelFontSize);
	color: var(--panelFontColor);
}
</style>

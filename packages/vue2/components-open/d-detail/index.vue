<template lang="pug">
header.d-detail.fn-flex(v-if="show")
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
	c-loading(:show="loading")
</template>
<script lang="ts">
import { downloadFile } from '@cakev/util'
import Editor from '@/core/Editor'
import left from './left.vue'
import { CModal, CNotice } from '@cakev/ui'

export default {
	name: 'd-detail',
	components: {
		left,
	},
	props: {
		show: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
			loading: false,
		}
	},
	mounted() {
		this.editor.current.resetZoom({
			screenHeight: this.editor.screen.screenHeight,
			screenWidth: this.editor.screen.screenWidth,
		})
	},
	methods: {
		preview() {
			const scene = this.editor.screen.screenMainScene
			this.editor.screenCache.add('previewData', this.editor.screen).then(() => {
				window.open(
					`${location.origin}#${this.editor.config.previewUrl}?scene=${scene}`,
				)
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
}
</style>

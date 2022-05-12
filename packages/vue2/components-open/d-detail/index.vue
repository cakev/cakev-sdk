<template lang="pug">
.d-detail.fn-flex(v-if="show")
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
	methods: {
		preview() {
			const scene = this.editor.screen.screenMainScene ? `&scene=${this.editor.screen.screenMainScene}` : ''
			this.editor.screenCache.add('previewData', this.editor.screen).then(() => {
				window.open(`${location.origin}/detail/preview?layoutMode=${this.editor.screen.screenLayoutMode}${scene}`)
			})
		},
		handleExport() {
			const fileName = this.editor.screen.screenName
			this.$Modal.confirm({
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
		handleFile(e) {
			const file = e.target.files[0]
			const reader = new FileReader()
			reader.onload = e => {
				try {
					this.loading = true
					this.editor.init(JSON.parse(e.target.result))
					// this.loading = false
				} catch (e) {
					console.error(e)
					this.loading = false
					this.$Message.error('配置文件识别失败')
				}
			}
			reader.onerror = () => {
				this.loading = false
				this.$Message.error('配置文件识别失败')
			}
			reader.readAsText(file)
		},
	},
	beforeDestroy() {
		this.editor.clear()
	},
	mounted() {
		this.editor.init()
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
		color: var(--text-tab);

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
				background-color: var(--primary-color);
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
	color: var(--text-tab);
	background: var(--background-2);

	/deep/ button {
		margin-left: 10px;
	}
}
</style>

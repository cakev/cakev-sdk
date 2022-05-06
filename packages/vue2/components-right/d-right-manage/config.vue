<template lang="pug">
.d-right-modal.d-scrollbar
	c-control(label="屏幕大小")
		template(slot="right")
			i-select(v-model="size")
				i-option(value="1920*1080") 大屏推荐尺寸1920*1080
				i-option(value="1366*768") web最常见尺寸1366*768
				i-option(value="1024*768") web最小尺寸1024*768
				i-option(value="other") 自定义
	c-control
		template(slot="right")
			d-input(
				append="W",
				:value="editor.width",
				:style="{ width: '100px' }",
				@on-change="widthChange")
			d-input(
				append="H",
				:value="editor.height",
				:style="{ marginLeft: '10px', width: '100px' }",
				@on-change="heightChange")
	c-control(label="背景色")
		template(slot="right")
			i-color-picker(
				:alpha="true",
				v-model="editor.backgroundColor",
				v-if="editor.backgroundColor")
			i-input(
				v-model="editor.backgroundColor",
				:disabled="true",
				:style="{ width: '166px', marginLeft: '9px' }")
	c-control(label="背景图", title="支持jpg，png，gif")
		template(slot="right")
		d-upload(v-model="editor.backgroundImage", :data="backGroundFormData")
	c-control(label="适配模式")
		template(slot="right")
			i-select(v-model="editor.layoutMode")
				i-option(value="full-size") 充满页面
				i-option(value="full-width") 100%宽度
				i-option(value="full-height") 100%高度
	c-control(label="封面", title="支持jpg，png，gif")
		template(slot="right")
			d-upload(v-model="editor.avatar", :data="screenAvatarFormData")
	c-control
		template(slot="right")
			i-button(
				@click="screenAvatar",
				type="primary",
				:loading="screenAvatarLoading") 截屏
	c-control(label="首场景")
		template(slot="right")
			i-select(filterable, v-model="editor.mainScene")
				i-option(:value="0") 主场景
				i-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
</template>
<script>
import func from '@/vue2/components-func/func.mx'
import html2canvas from 'html2canvas'
import dUpload from '@/vue2/components-right/d-upload/index.vue'
import Editor from '@/core/Editor'
import { file } from '@/vue2/api/upload.api'

export default {
	name: 'func-config',
	components: {
		dUpload,
	},
	mixins: [func],
	data() {
		return {
			backGroundFormData: {
				library: 'componentBackGround',
			},
			screenAvatarFormData: {
				library: 'screenAvatar',
			},
			screenAvatarLoading: false,
			editor: Editor.Instance(),
		}
	},
	computed: {
		size: {
			get() {
				const width = this.editor.width
				const height = this.editor.height
				if (width !== 1920 && width !== 1366 && width !== 1024) {
					return 'other'
				}
				if (height !== 1080 && height !== 768) {
					return 'other'
				}
				return `${width}*${height}`
			},
			set(value) {
				if (value !== 'other' && value) {
					const [width, height] = value.split('*')
					this.editor.screenSizeChange({ width: +width, height: +height })
				}
			},
		},
	},
	methods: {
		widthChange(e) {
			this.editor.screenSizeChange({ width: +e.target.value })
		},
		heightChange(e) {
			this.editor.screenSizeChange({ height: +e.target.value })
		},
		async screenAvatar() {
			this.screenAvatarLoading = true
			this.capture({
				selector: '#screen',
			})
				.then(res => {
					this.screenAvatarLoading = false
					this.editor.avatar = res.url
				})
				.catch(e => {
					console.warnning(e)
					this.screenAvatarLoading = false
					this.$Message.error('截屏创建失败')
				})
		},

		/**
		 * 快照上传
		 */
		upload(blob, resolve, reject) {
			const name = `screenShot-${Date.now()}.jpg`
			const data = new FormData()
			data.append('file', blob, name)
			data.append('library', 'screenAvatar')
			file(data)
				.then(data => {
					resolve(data)
				})
				.catch(reject)
		},

		/**
		 * 请求创建快照
		 */
		capture({ selector, returnSource = false, options = {} }) {
			return new Promise((resolve, reject) => {
				html2canvas(document.querySelector(selector), {
					allowTaint: true,
					scale: 1,
					useCORS: true,
					...options,
				})
					.then(canvas => {
						try {
							if (!returnSource) {
								canvas.toBlob(
									blob => {
										this.upload(blob, resolve, reject)
									},
									'image/jpeg',
									0.9,
								)
							} else {
								resolve(canvas.toDataURL('image/jpeg', 0.9))
							}
						} catch (e) {
							if (e.message.indexOf('Tainted canvases') > -1) {
								this.$Message.warning('外部素材可能导致截屏异常')
							}
							reject(e)
						}
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		saveSnapshot() {
			const nodes = document.querySelectorAll('.widget-part')
			nodes.forEach(node => {
				html2canvas(node, {
					allowTaint: true,
					scale: 1,
					useCORS: true,
					backgroundColor: 'transparent',
				}).then(canvas => {
					const link = document.createElement('a')
					link.href = canvas.toDataURL()
					link.setAttribute('download', 'screenAvatar.png')
					link.style.display = 'none'
					document.body.appendChild(link)
					link.click()
				})
			})
		},
	},
}
</script>

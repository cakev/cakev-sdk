<template lang="pug">
i-modal.check-modal(v-model="modalShow", :footer-hide="true")
	p(:style="{ marginBottom: '10px' }") 快生成链接，分享给你的好友吧
	.fn-flex.flex-row(:style="{ marginBottom: '10px' }")
		label 开启分享
		c-switch(v-model="openShare", :style="{ marginLeft: '10px' }")
	.fn-flex.flex-row(:style="{ marginBottom: '10px' }", v-if="openShare")
		label.ivu-btn.d-detail-share-button(
			:style="{ borderRadius: '2px 0 0 2px' }",
			:class="{ 'ivu-btn-primary': shareType === 'ALL' }",
			@click="shareSubmit('ALL')") 不限制
		label.ivu-btn.d-detail-share-button(
			:class="{ 'ivu-btn-primary': shareType === 'PASSWORD' }",
			@click="shareSubmit('PASSWORD')") 加密分享
		label.ivu-btn.d-detail-share-button(
			:style="{ borderRadius: '0 2px 2px 0' }",
			:class="{ 'ivu-btn-primary': shareType === 'TIME' }",
			@click="shareSubmit('TIME')") 时效分享
	.fn-flex.flex-row(:style="{ marginBottom: '10px', alignItems: 'center' }")
		i-input(
			v-show="shareType === 'PASSWORD'",
			:style="{ width: '150px' }",
			@on-change="shareSubmit('PASSWORD')",
			v-model="sharePassword")
			span(slot="prepend") 密钥
		i-input(
			v-show="shareType === 'TIME'",
			:style="{ width: '150px' }",
			@on-change="shareSubmit('TIME')",
			@on-keypress="keypressForTime",
			type="number",
			v-model="shareTime")
			span(slot="append") 小时
		.deadline(v-if="shareType === 'TIME'", :style="{ marginLeft: '10px' }") 到期时间：{{ deadline }}
	.fn-flex.flex-row(v-if="openShare")
		i-input(
			search,
			readonly,
			enter-button="复制",
			@on-search="handleCopy",
			v-model="shareUrl")
</template>
<script>
import { Modal, Button, Input } from 'view-design'
import shareMx from './share.mx'

export default {
	name: 'DShareDialog',
	components: {
		'i-button': Button,
		'i-modal': Modal,
		'i-input': Input,
	},
	mixins: [shareMx],
	props: {
		value: {
			type: Boolean,
		},
		sid: {
			type: String,
		},
		screenMainScene: {
			type: String | Number,
		},
		screenLayoutMode: {
			type: String,
		},
		autoInit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			screenId: '',
			modalShow: false,
			isInit: true,
		}
	},
	computed: {
		openShare: {
			get() {
				return this.shareType !== 'NO'
			},
			set(val) {
				if (val) {
					this.shareSubmit('ALL')
				} else {
					this.closeShare()
				}
			},
		},
	},
	watch: {
		value(val) {
			this.modalShow = val
			if (val && this.isInit && !this.autoInit) {
				this.init()
				this.isInit = false
			}
		},
		modalShow: val => {
			this.$emit('input', val)
		},
	},
}
</script>
<style lang="scss" scoped>
.d-detail-share-button {
	line-height: 32px;
	border-radius: 0;
}
</style>

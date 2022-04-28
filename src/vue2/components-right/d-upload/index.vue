<template lang="pug">
.d-upload
	.d-upload-img.pos-r
		img.pos-r.z-index-9(:src="value", v-if="value && type === 'img'")
		video.pos-r.z-index-9(ref="video", :src="value", v-if="value && type === 'video'", loop)
		.progress(v-if="isShowProgress")
			i-progress(
				:percent="percent",
				text-inside,
				:stroke-width="16",
				status="active")
		i-upload.pointer.pos-a(
			:class="{ 'd-upload-empty': !value }",
			:action="action",
			:data="data",
			:accept="accept",
			:on-progress="handleProgress",
			:show-upload-list="false",
			:before-upload="handleBeforeUpload",
			:on-success="handleSuccess")
			.d-upload-text(v-if="!value && !isShowProgress") 点击上传
		i-icon.d-upload-play-icon.pos-a.pointer(
			v-if="value && type === 'video'",
			title="播放",
			:type="isPlaying ? 'md-pause' : 'md-play'",
			color="#fff",
			size="14",
			@click="handlePlayVideo")
		i-icon.d-upload-download-icon.pos-a.pointer.z-index-9(
			v-if="value",
			title="下载",
			type="md-cloud-download",
			color="#fff",
			size="14",
			@click="handleDown")
		i-icon.d-upload-remove-icon.pos-a.pointer.z-index-9(
			v-if="value",
			title="删除",
			type="md-trash",
			color="#fff",
			size="14",
			@click="handleRemove")
</template>
<script>
import { baseURL } from '@/vue2/api/request.js'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Upload, Icon, Progress } from 'view-design'

@Component({
	components: {
		'i-upload': Upload,
		'i-icon': Icon,
		'i-progress': Progress,
	},
})
export default class DUpload extends Vue {
	@Prop({ default: `${baseURL}/upload/file` }) action
	@Prop() data
	@Prop() accept
	@Prop({ default: 'img' }) type
	@Prop() value

	percent = 0
	isShowProgress = false
	isPlaying = false

	handleDown() {
		const a = document.createElement('a')
		a.setAttribute('download', this.value)
		a.setAttribute('href', this.value)
		a.click()
	}

	handleRemove() {
		this.$emit('input', '')
		this.$emit('success', '')
	}

	handleSuccess(res) {
		this.isShowProgress = false
		this.isPlaying = false
		this.$emit('input', res.result.url)
		this.$emit('success', res)
	}

	handleProgress(event) {
		this.percent = event.percent
	}

	handleBeforeUpload(file) {
		if (this.type === 'img') {
			if (file.size > 1024 * 1024) {
				this.$Message.error('图片大小不能超过1M')
				return false
			}
		}
		this.isShowProgress = true
		return true
	}

	handlePlayVideo() {
		if (this.isPlaying) {
			this.$refs.video.pause()
		} else {
			this.$refs.video.play()
		}
		this.isPlaying = !this.isPlaying
	}
}
</script>
<style lang="scss" scoped>
.d-upload-download-icon {
	top: 10px;
	right: 30px;
}

.d-upload-remove-icon {
	top: 10px;
	right: 10px;
}

.d-upload-play-icon {
	top: 10px;
	right: 50px;
}

.d-upload-img {
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	width: 208px;
	height: 115px;

	video,
	img {
		max-width: 100%;
		max-height: 100%;
		pointer-events: none;
	}
}

.d-upload {
	border: 1px solid #393b4a;

	&:hover {
		border: 1px solid var(--themeColor);
	}

	/deep/ {
		.ivu-upload {
			background-color: #181b24;
		}

		.ivu-upload-select {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: center;
			width: 208px;
			height: 115px;
			transition: all 0.3s;

			.d-upload-text {
				font-size: 14px;
				color: #fafafa;
			}
		}
	}
}

.progress {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 80%;
	line-height: 1;
	transform: translate(-50%, -50%);
}
</style>

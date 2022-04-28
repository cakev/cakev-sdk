<template lang="pug">
.d-right-swiper
	.d-right-swiper-title.pointer.fn-flex.flex-row(
		:class="{ active, enable: !syncedEnable }",
		@click="handleClick")
		i-icon.pointer.d-right-swiper-title-down.fn-flex(type="ios-arrow-down")
		label.pointer {{ title }}
		.d-right-swiper-title-right.fn-flex.flex-row
			i-tooltip(v-for="item in icon", :content="item.msg")
				i-icon.pointer(
					:type="item.icon",
					@click="e => handleIconClick(e, item.icon)",
					size="14",
					@click.stop)
	.d-right-swiper-content(
		:class="{ active }",
		:style="{ height: active ? '' : '0' }")
		slot(v-if="enable")
</template>
<script>
import { Icon, Tooltip } from 'view-design'

export default {
	name: 'd-right-swiper-eye',
	components: {
		'i-icon': Icon,
		'i-tooltip': Tooltip,
	},
	props: {
		title: {
			type: String,
		},
		enable: {
			type: Boolean,
		},
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			active: this.show,
		}
	},
	computed: {
		icon() {
			if (this.syncedEnable) {
				return [
					{
						icon: 'md-eye-off',
						msg: '关闭',
					},
				]
			}
			return [
				{
					icon: 'md-eye',
					msg: '开启',
				},
			]
		},
		syncedEnable: {
			get() {
				return this.enable
			},
			set(value) {
				this.$emit('update:enable', value)
			},
		},
	},
	methods: {
		handleClick() {
			if (this.syncedEnable) {
				this.active = !this.active
			}
		},

		handleIconClick(e, value) {
			e.preventDefault()
			e.stopPropagation()
			if (value === 'md-eye') {
				this.active = true
				this.$emit('open-click', !this.syncedEnable)
			}
			if (value === 'md-eye-off') {
				this.active = false
				this.$emit('close-click', !this.syncedEnable)
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.d-right-swiper-content {
	overflow: hidden;
	transition: all 0.3s;

	&.active {
		margin-top: 10px;
	}
}

.d-right-swiper {
	+ .d-right-swiper {
		.d-right-swiper-title {
			border-top: none;
		}
	}

	/deep/ + .d-manage-modal-control-base {
		margin-top: 10px;
	}

	/deep/ + .d-manage-modal-control {
		margin-top: 10px;
	}
}

.d-right-swiper-title {
	align-items: center;
	height: 36px;
	line-height: 36px;
	background-color: #2d2f38;
	border-top: 1px solid rgb(57, 59, 74);
	border-bottom: 1px solid rgb(57, 59, 74);

	label {
		margin-left: 10px;
		font-size: 12px;
		line-height: 36px;
		color: rgb(250, 250, 250);
		user-select: none;
	}

	.ivu-icon {
		width: 12px;
		font-size: 12px;
		color: rgb(250, 250, 250);
	}

	.d-right-swiper-title-right {
		margin-right: 10px;
		margin-left: auto;

		.ivu-icon {
			margin-left: 10px;
		}
	}

	.d-right-swiper-title-down {
		width: 12px;
		height: 12px;
		margin-left: 10px;
		transition: all 0.3s;
		transform: rotate(-90deg);
	}

	&.enable {
		label,
		.d-right-swiper-title-down {
			color: rgb(102, 102, 102);
		}
	}

	&.active {
		.d-right-swiper-title-down {
			transform: rotate(0);
		}
	}
}
</style>

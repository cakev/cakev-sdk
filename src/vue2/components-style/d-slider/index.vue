<template lang="pug">
.d-slider.fn-flex(:class="`d-slider-${type}`")
	i-slider(size="small", v-bind="{ ...$props, ...$attrs }", v-on="$listeners", v-model="currentVal")
	e-input(v-model="currentVal", width="62px", height="26px")
</template>
<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Slider } from 'view-design'
import eInput from '@/vue2/components-style/e-input/index.vue'

@Component({
	components: {
		'i-slider': Slider,
		eInput,
	},
})
export default class DSlider extends Vue {
	@Prop() value
	currentVal = this.value
	@Prop() type
	@Watch('value')
	onValueChange(val) {
		this.currentVal = val
	}

	@Watch('currentVal')
	onCurrentVal(val) {
		this.$emit('input', val)
	}
}
</script>
<style lang="scss" scoped>
.d-slider {
	align-items: center;
	width: 232px;

	::v-deep {
		.ivu-slider-wrap {
			background-color: var(--background-gray-6);
		}

		.ivu-slider-bar {
			background-color: var(--primary-color);
		}

		.ivu-slider {
			width: 160px;
			margin-right: 10px;
		}

		.ivu-slider-button-wrap {
			top: -2px;
			z-index: 9;
			width: 8px;
			height: 8px;
		}

		.ivu-slider-button {
			width: 8px;
			height: 8px;
			background-color: var(--primary-color);
			border: 2px solid #fff;
		}

		.ivu-slider-button-dragging {
			box-shadow: 0 0 0 5px rgba(36, 145, 247, 0.5);
		}
	}
}

.d-slider-opacity,
.d-slider-saturate,
.d-slider-brightness,
.d-slider-hue-rotate {
	::v-deep {
		.ivu-slider-bar {
			background-color: transparent;
		}
	}
}

.d-slider-hue-rotate {
	::v-deep {
		.ivu-slider-wrap {
			background-image: linear-gradient(-90deg, #f00, #f0f, #00f, #0ff, #0f0, #ff0, #f00);
		}
	}
}

.d-slider-saturate {
	::v-deep {
		.ivu-slider-wrap {
			background-image: linear-gradient(90deg, #6d6d6d, #f00);
		}
	}
}

.d-slider-brightness {
	::v-deep {
		.ivu-slider-wrap {
			background-image: linear-gradient(90deg, #000, #fff);
		}
	}
}

.d-slider-opacity {
	::v-deep {
		.ivu-slider-wrap {
			background-color: #818181;
			background-image: linear-gradient(45deg, #969696 25%, transparent 0, transparent 75%, #969696 0),
				linear-gradient(45deg, #969696 25%, transparent 0, transparent 75%, #969696 0);
			background-position: 0 0, 3px 3px;
			background-size: 6px 6px;

			&::after {
				position: absolute;
				width: 100%;
				height: 100%;
				content: '';
				background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), #000);
			}
		}
	}
}
</style>

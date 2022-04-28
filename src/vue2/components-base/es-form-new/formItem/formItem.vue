<template>
	<div class="es-form-item" ref="esFormItem">
		<!-- label过长展示省略号，通过tooltip展示全部信息 -->
		<!-- todo: 移除es-form-new的依赖 -->
		<!-- 原先的todo: offset未支持动态绑定，官方修复中 -->
		<Tooltip
			:content="data.name"
			:disabled="disabledTooltip || disabledTip"
			placement="top"
			:offset="offset"
			class="w100"
		>
			<!-- 当类型等于23（卡片式表单）的时候；使用数组动态表单校验方式 -->
			<FormItem
				:prop="parentData.type === 23 ? parentData.enName + '.' + index + '.' + data.enName : data.enName"
				:label="data.labelWidth === 0 ? '' : data.name"
				:error="data.error"
				:rules="rules"
				:label-width="itemLabelWidth"
				:class="{
					w100: true,
					'ivu-form-item-required': data.type === 18 && data.required,
					'required-item': data.required,
					'normal-item': !data.required,
				}"
			>
				<es-item-content
					:data="data"
					:model="model"
					:width="width"
					:labelWidth="labelWidth"
					:editFlag="editFlag"
					:disabledTip="disabledTip"
					:class="{ 'disabled-ele': isDisabled(data) }"
					@validateField="validateField"
				>
					<template slot="itemContent">
						<slot name="itemContent"></slot>
					</template>
					<template :slot="'endItem-' + data.enName">
						<slot :name="'endItem-' + data.enName"></slot>
					</template>
				</es-item-content>
			</FormItem>
		</Tooltip>
	</div>
</template>
<script>
import { handlerRules } from '../../../utils'
import esItemContent from '../itemContent'
import { FormItem, Tooltip } from 'view-design'

export default {
	name: 'es-form-item',
	components: {
		esItemContent,
		FormItem,
		Tooltip,
	},
	data() {
		return {
			// tip是否禁用
			disabledTooltip: true,
			// tip的偏移量
			offset: 0,
		}
	},
	props: {
		// 数据源
		data: {
			type: Object,
			default() {
				return {}
			},
		},
		// 双向绑定model
		model: {
			type: Object,
			default() {
				return {}
			},
		},
		// formItem宽度
		width: {
			type: String,
			default: '100%',
		},
		// label宽度
		labelWidth: {
			type: Number,
		},
		// 编辑状态 0 - New新建  // 1 - Edit查看编辑 // 2 - Done已完成
		editFlag: {
			type: Number,
			default: 0,
		},
		// 是否禁用tooltip
		disabledTip: {
			type: Boolean,
			default: false,
		},
		// 当类型等于23的时候使用 --- 用于区分数组下标
		index: {
			type: Number,
			default: 0,
		},
		// 当类型等于23的时候使用 --- 用于获取父级数据
		parentData: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	methods: {
		// formItem是否禁用
		isDisabled(template) {
			if ((template.addEdit && this.editFlag === 0) || (template.modifyEdit && this.editFlag === 1)) {
				return false
			} else {
				return true
			}
		},
		validateField(params) {
			this.$emit('validateField', params)
		},
	},
	watch: {
		width: {
			handler() {
				const self = this

				self.$nextTick(() => {
					if (self.$refs.esFormItem) {
						self.$refs.esFormItem.style.width = self.width
					}
					const formItemWidth = self.$refs.esFormItem ? self.$refs.esFormItem.clientWidth : 0
					const formItemLabelWidth = self.labelWidth || self.itemLabelWidth
					self.offset = -(formItemWidth - formItemLabelWidth) / 2
				})
			},
			immediate: true,
		},
		model: {
			handler(value) {},
		},
		'data.name': {
			handler() {
				if (this.data.name) {
					let length = this.data.name.length
					this.data.required && length++
					this.disabledTooltip = length <= 7
				}
			},
			immediate: true,
		},
	},
	computed: {
		rules: {
			get() {
				let validate = []
				if (this.data.childrenList && this.data.childrenList.length > 0) {
				} else {
					validate = handlerRules(this.data)
				}
				return validate
			},
			set() {},
		},
		// 原先的todo 计算label宽度，目前只是粗略计算，按12px的字体大小，以13x作为单个字的平均宽度
		// item项的labelwidth，会覆盖form的labelwidth
		itemLabelWidth: {
			get() {
				if (this.data.name) {
					let length = this.data.name.length
					this.data.required && length++
					if (this.data.labelWidth >= 0) {
						return this.data.labelWidth
					} else if (this.labelWidth === 0 || this.labelWidth) {
						return undefined
					} else {
						return Math.min(length, 7) * 13 + 12
					}
				}
				return undefined
			},
			set() {},
		},
	},
}
</script>
<style lang="scss" scoped>
.es-form-item {
	display: inline-block;
	min-height: 50px;

	.required-item {
		min-height: 50px;
		padding-right: 10px;
		padding-bottom: 16px;
		margin-right: 0;
		margin-bottom: 0;
	}

	.normal-item {
		min-height: 30px;
		padding-right: 10px;
		padding-bottom: 0;
		margin-right: 0;
		margin-bottom: 0;
	}
}
</style>

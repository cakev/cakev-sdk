<template>
	<div class="es-form-new" ref="esFormNew">
		<Form
			:model="model"
			:label-position="data.labelPosition"
			:label-width="labelWidth"
			:show-message="data.showMessage"
			:autocomplete="data.autocomplete"
			v-if="showForm"
			ref="esNewForm"
			inline
			style="vertical-align: super"
			:class="{
				w100: true,
				enabledTip: !setDefaultBool(data.disabledTip, true),
				disabledTip: setDefaultBool(data.disabledTip, true),
				'disabled-form': isDisabled,
			}"
		>
			<slot name="templetDetailList">
				<template v-for="(templet, index) in data.templetDetailList">
					<!-- 普通form表单 -->
					<es-form-item
						v-if="isShow(templet)"
						@validateField="validateField"
						:width="getWidth(templet)"
						:labelWidth="labelWidth"
						:key="templet.enName + templet.id + index"
						:data="templet"
						:model="model"
						:editFlag="editFlag"
						:disabledTip="setDefaultBool(data.disabledTip, true)"
					>
						<template slot="itemContent">
							<slot name="itemContent" :data="templet"></slot>
						</template>
						<template :slot="'endItem-' + templet.enName">
							<slot :name="'endItem-' + templet.enName" :template="templet" :model="model"></slot>
						</template>
					</es-form-item>
				</template>
			</slot>
		</Form>
	</div>
</template>
<script>
import { setDefaultBool, toLength } from '../../utils'
import findIndex from 'lodash/findIndex'
import { Form } from 'view-design'
import esFormItem from './formItem'

export default {
	components: {
		Form,
		esFormItem,
	},
	name: 'es-form-new',
	data() {
		return {}
	},
	props: {
		// 数据源
		data: {
			type: Object,
			required: true,
		},
		// 表单数据对象
		model: {
			type: Object,
			required: true,
		},
		// 编辑状态 0 - New新建  // 1 - Edit查看编辑 // 2 - Done已完成
		editFlag: {
			type: Number,
			default: 0,
		},
		// 高
		height: {
			type: [Number, String],
			default: '',
		},
		// 宽
		width: {
			type: [Number, String],
			default: '',
		},
	},
	methods: {
		// formItem宽度
		getWidth(template) {
			const self = this
			const columns = self.data.columns ? Number(self.data.columns) : 1
			let colspan = template.colspan ? Number(template.colspan) : 1
			colspan = colspan > columns ? columns : colspan
			return Math.floor(100 / columns) * colspan + '%'
		},
		// formItem是否展示
		isShow(template) {
			if ((template.addHidden && this.editFlag === 0) || (template.modifyHidden && this.editFlag === 1)) {
				return false
			} else {
				return true
			}
		},
		// api - 重置表单
		resetFields() {
			this.$refs.esNewForm.resetFields()
		},
		// api - 校验表单
		validate() {
			return new Promise((resolve, reject) => {
				this.$refs.esNewForm
					.validate()
					.then(valid => {
						if (valid) {
							resolve(this.model)
						} else {
							reject(new Error('校验不通过'))
						}
					})
					.catch(data => {
						reject(data)
					})
			})
		},
		// api - 校验表单某个字段
		validateField(params) {
			const self = this
			return new Promise((resolve, reject) => {
				self.$refs.esNewForm.validateField(params, errorMsg => {
					if (errorMsg) {
						reject(new Error(errorMsg))
					} else {
						resolve(self.model)
					}
				})
			})
		},
	},
	watch: {
		height: {
			handler(value) {
				if (value) {
					this.$nextTick(() => {
						this.$refs.esFormNew.style.height = toLength(value)
					})
				}
			},
			immediate: true,
		},
		width: {
			handler(value) {
				if (value) {
					this.$nextTick(() => {
						this.$refs.esFormNew.style.width = toLength(value)
					})
				}
			},
			immediate: true,
		},
		data: {
			handler(value) {
				if (value && value.templetDetailList && value.templetDetailList.length > 0) {
					value.templetDetailList.forEach(item => {
						if (item.relation && item.relationList && item.relationList.length > 0) {
							this.$watch(
								'model.' + item.enName,
								(newValue, oldValue) => {
									console.log('watch change enName = ' + item.enName + ', value = ' + newValue)
									item.relationList.forEach(relation => {
										if (relation.enNameList && relation.enNameList.length > 0) {
											relation.enNameList.forEach(rule => {
												// 0:隐藏, 1:显示
												let hiddenFlag
												if (newValue === relation.relationValue) {
													if (rule.operateType === 0) {
														hiddenFlag = 1
													} else {
														hiddenFlag = 0
													}
												} else {
													if (rule.operateType === 0) {
														hiddenFlag = 0
													} else {
														hiddenFlag = 1
													}
												}
												const idx = findIndex(this.data.templetDetailList, {
													enName: rule.relationEnName,
												})
												/* eslint-disable */
												this.$set(this.data.templetDetailList[idx], 'addHidden', hiddenFlag)
												this.$set(this.data.templetDetailList[idx], 'modifyHidden', hiddenFlag)
												/* eslint-enable */
											})
										}
									})
								},
								{
									immediate: true,
								},
							)
						}
					})
				}
			},
			immediate: true,
			deep: true,
		},
	},
	computed: {
		showForm() {
			if ((this.data.addHidden && this.editFlag === 0) || (this.data.modifyHidden && this.editFlag === 1)) {
				return false
			} else {
				return true
			}
		},
		// formItem是否禁用
		isDisabled() {
			if ((this.data.addDisabled && this.editFlag === 0) || (this.data.modifyDisabled && this.editFlag === 1)) {
				return true
			} else {
				return false
			}
		},
		// 是否为单行
		singleRow: {
			get() {
				let length = 0
				let columns = 0
				if (this.data) {
					length = this.data.templetDetailList ? this.data.templetDetailList.length : 0
					columns = Number(this.data.columns) || 1
				}
				return length <= columns
			},
			set() {},
		},
		// todo 计算label宽度，目前只是粗略计算，按12px的字体大小，以13x作为单个字的平均宽度
		labelWidth: {
			set() {},
			get() {
				const self = this
				let maxLength = 0
				if (self.data.templetDetailList && self.data.templetDetailList.length > 0) {
					self.data.templetDetailList.forEach(item => {
						let length = item.name.length
						if (item.required) {
							length += 1
						}
						if (length > maxLength) {
							maxLength = length
						}
					})
				}
				// 单行时的labelwidth，交给formitem计算
				if (self.singleRow) {
					return undefined
				} else {
					return Math.min(maxLength, 7) * 13 + 12
				}
			},
		},
		setDefaultBool() {
			return setDefaultBool
		},
	},
}
</script>
<style lang="scss" scope>
.es-form-new {
	font-size: 0;

	.enabledTip.ivu-form .ivu-form-item-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.disabledTip.ivu-form .ivu-form-item-label {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 30px;
		line-height: 12px !important;
	}
}

.disabled-form .es-item-content {
	pointer-events: none;
	cursor: none;
	opacity: 0.4;
}
</style>

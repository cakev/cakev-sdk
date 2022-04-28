<template>
	<div class="es-item-content">
		<template v-if="data.type === 2">
			<i-select
				v-model="model[data.enName]"
				@on-change="onChange"
				@on-open-change="onOpenChange"
				@on-query-change="onQueryChange"
				:multiple="setDefaultBool(data.multiple, false)"
				:clearable="setDefaultBool(data.clearable, true)"
				:filterable="setDefaultBool(data.filterable, true)"
				:placeholder="data.placeholder || ''"
				:size="data.size || 'default'"
				:not-found-text="data.notFoundText || '无匹配数据'"
				:label-in-value="setDefaultBool(data.labelInValue, false)"
				:placement="data.placement || 'bottom-start'"
				:max-tag-count="data.maxTagCount"
				:id="'es-item-' + data.enName"
				:ref="'es-item-' + data.enName"
				transfer
			>
				<template v-for="item in data.dataSourceList">
					<i-option
						v-if="!item.hidden"
						:key="item.value"
						:value="item.value"
						:disabled="setDefaultBool(item.disabled, false)"
					>
						{{ item.label }}
					</i-option>
				</template>
			</i-select>
		</template>
		<slot :name="'endItem-' + data.enName"></slot>
	</div>
</template>
<script>
import { handlerRules, isEmpty, desensitize, setDefaultBool, isEmptyObject } from '../../../utils'
import findIndex from 'lodash/findIndex'

import { Select, Option } from 'view-design'
export default {
	name: 'es-item-content',
	components: {
		'i-select': Select,
		'i-option': Option,
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
	},
	data() {
		return {}
	},
	mounted() {
		if (this.data.enName) {
			this.$watch(
				'model.' + this.data.enName,
				value => {
					switch (this.data.type) {
						case 0:
							if (typeof value !== 'number') {
								value = Number(value)
							}
							break
						case 1:
							if (typeof value !== 'string') {
								value = String(value)
							}
							break
						case 2:
							if (this.data.multiple) {
								if (typeof value === 'string') {
									value = value.split(',')
								}
							} else {
								if (Array.isArray(value)) {
									value.join(',')
								}
							}
							break
						case 3:
							if (typeof value === 'string') {
								value = value.split(',')
							}
							break
						default:
							break
					}
					if (this.data.enName) {
						this.$set(this.model, this.data.enName, value)
						// 赋值给脱敏字段
						this.$set(this.data, 'desensitizeEnName', value)
					}
					if (this.data.desensitizeRegex) {
						this.desensitizeRegexFn()
					}
				},
				{
					immediate: true,
				},
			)
		}
		if (this.data.type === 2 && this.data.showInputbar === 1) {
			// setTimeout(() => {
			//     this.$nextTick(() => {
			//         this.$set(this.model, this.data.enName, '2');
			//     });
			// }, 1000);
			document
				.getElementById('es-item-' + this.data.enName)
				.querySelector('input[type="text"]')
				.addEventListener('blur', e => {
					const value = e.target.value
					if (!isEmpty(value)) {
						if (
							findIndex(this.data.dataSourceList, {
								label: value,
							}) < 0
						) {
							this.data.dataSourceList.push({
								label: value,
								value: value,
							})
							this.$nextTick(() => {
								// todo 调用内部api
								this.$refs['es-item-' + this.data.enName].onOptionClick({
									label: value,
									value: value,
								})
							})
						} else {
							this.$refs['es-item-' + this.data.enName].onOptionClick({
								label: value,
								value: value,
							})
						}
					}
				})
		}
	},
	methods: {
		clickIcon(e) {
			this.data.onClick && this.data.onClick.apply(this, [e, this.data, this.model])
		},
		onOpenChange(flag) {
			this.data.onOpenChange && this.data.onOpenChange.apply(this, [flag])
		},
		onQueryChange(query) {
			this.data.onQueryChange && this.data.onQueryChange.apply(this, [query])
		},
		onClear() {
			this.$set(this.model, this.data.enName, '')
			const params = this.model[this.data.enName]
			this.data.onClear && this.data.onClear.apply(this, [params])
		},
		onFocus() {
			// 获取到焦点，脱敏字段去除；
			this.$set(this.data, 'desensitizeEnName', this.model[this.data.enName])
			const params = this.model[this.data.enName]
			this.data.onFocus && this.data.onFocus.apply(this, [params])
		},
		onBlur() {
			// 脱敏字段赋值
			this.$set(this.model, this.data.enName, this.data.desensitizeEnName)
			this.desensitizeRegexFn()
			const params = this.model[this.data.enName]
			this.data.onBlur && this.data.onBlur.apply(this, [params])
		},
		desensitizeRegexFn() {
			// 脱敏正则。如果存在，开始脱敏
			if (this.data.desensitizeRegex) {
				const desensitizeEnName = desensitize(this.data.desensitizeEnName, this.data.desensitizeRegex)
				this.$set(this.data, 'desensitizeEnName', desensitizeEnName)
			}
		},
		onChange(params) {
			switch (this.data.type) {
				case 1:
					this.data.onChange && this.data.onChange.apply(this, [params.target.value])
					break
				case 5:
					this.data.onChange && this.data.onChange.apply(this, [params.target.value])
					break
				case 6:
					this.model[this.data.enName] = params
					this.data.onChange && this.data.onChange.apply(this, [params])
					break
				default:
					this.data.onChange && this.data.onChange.apply(this, [params])
					break
			}
		},
		// 级联：展示尾端文本值
		showSingleText(list) {
			if (list && list.length > 0) {
				return list[list.length - 1]
			}
		},
		// 级联：展示全部文本值
		showMultipleText(list) {
			if (list && list.length > 0) {
				return list.join('/')
			}
		},
		handlerRules(template) {
			return handlerRules(template)
		},
		setDefaultBool(targetValue, defaultValue) {
			return setDefaultBool(targetValue, defaultValue)
		},
		setDefaultBoolOrObject(targetValue, defaultValue) {
			if (typeof targetValue === 'boolean') {
				return targetValue
			} else if (typeof targetValue === 'object') {
				if (isEmptyObject(targetValue)) {
					return defaultValue || false
				} else {
					return targetValue
				}
			} else {
				return defaultValue || false
			}
		},
		validateField(params) {
			this.$emit('validateField', params)
		},
	},
}
</script>
<style lang="scss" scoped>
.es-item-content {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}
</style>

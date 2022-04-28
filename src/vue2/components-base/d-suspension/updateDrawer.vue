<template lang="pug">
d-drawer(title="组件升级", v-model="currentVal")
	.drawer-tool
		checkbox(:indeterminate="indeterminate", :value="checkAll", @click.prevent.native="handleCheckAll") 可更新组件
		.update-btn(@click="update") 更新
	checkbox-group.group(v-model="checkAllGroup", @on-change="checkAllGroupChange")
		.row(v-for="(k, i) in data", :key="i")
			checkbox(:label="k.componentTitle")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Checkbox, CheckboxGroup } from 'view-design'
import Editor from '@/core/Editor'
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'

@Component({
	components: {
		CheckboxGroup,
		Checkbox,
		DDrawer,
	},
})
export default class UpdateDrawer extends Vue {
	@Prop(Boolean) value!: boolean
	@Prop(Array) data: any
	currentVal = false
	checkAllGroup = []
	checkAll = false
	indeterminate = false
	editor: Editor = Editor.Instance()

	@Watch('value')
	onValueChange(val: boolean): void {
		this.currentVal = val
	}

	@Watch('currentVal')
	onCurrentVal(val: boolean): void {
		this.$emit('input', val)
	}

	handleCheckAll(): void {
		if (this.indeterminate) {
			this.checkAll = false
		} else {
			this.checkAll = !this.checkAll
		}
		this.indeterminate = false

		if (this.checkAll) {
			this.checkAllGroup = this.data.map((v: any) => v.componentTitle)
		} else {
			this.checkAllGroup = []
		}
	}
	checkAllGroupChange(data): void {
		if (data.length === this.data.length) {
			this.indeterminate = false
			this.checkAll = true
		} else if (data.length > 0) {
			this.indeterminate = true
			this.checkAll = false
		} else {
			this.indeterminate = false
			this.checkAll = false
		}
	}
	update(): void {
		if (this.checkAllGroup.length === 0) return
		this.$Modal.confirm({
			title: `更新组件`,
			content: '更新组件有可能导致组件不可用，如果有重要数据请备份大屏。是否确定要更新？',
			onOk: () => {
				this.checkAllGroup.forEach((v: any) => {
					const t = this.data.find((m: any) => m.componentTitle === v)
					this.editor.screen.screenWidgets[t.componentId].config.widget.componentVersion = t.componentVersion
					this.currentVal = false
					this.$Message.success('组件升级成功')
				})
			},
			okText: '确定',
			cancelText: '取消',
		})
	}
}
</script>
<style lang="scss" scoped>
.drawer-tool {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	padding: 0 10px;
	color: #fff;
	background-color: #313237;

	.update-btn {
		width: 56px;
		height: 18px;
		font-size: 12px;
		line-height: 18px;
		color: #aaa;
		text-align: center;
		cursor: pointer;
		background-color: #545454;
		border-radius: 2px;
	}
}

.group {
	color: rgb(191, 191, 191);

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 36px;
		padding: 0 14px;
		border-bottom: 1px solid #393b4a;
	}
}
</style>

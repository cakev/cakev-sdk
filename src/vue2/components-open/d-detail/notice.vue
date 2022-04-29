<template lang="pug">
d-drawer(title="消息通知", v-model="currentVal")
	.drawer-tool.fn-flex.flex-column
		.update-btn(@click="clear") 清空消息
		ul(v-if="Object.keys(this.editor.log.list).length")
			li.fn-flex.flex-row(v-for="item in editor.log.list")
				.fn-flex.flex-column.left-box
					h2 {{ message[item.code] }}
					h3(v-if="item.widget") {{ item.widget.config.widget.name }}
					p.ellipsis-multiLine(:title="item.errorMessage") {{ item.errorMessage }}
				i-button.look-btn(@click="handleClick(item.widget)", size="small", type="primary", v-if="item.widget") 查看组件
		.empty.fn-flex(v-else) 未检测到任何异常
</template>
<script>
import Editor from '@/core/Editor'
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'
import { Button } from 'view-design'

export default {
	name: 'notice',
	components: {
		DDrawer,
		'i-button': Button,
	},
	props: {
		value: {},
	},
	data() {
		return {
			currentVal: false,
			editor: Editor.Instance(),
			message: {
				HTTP_ERROR: '请求异常',
				OLD_METHOD_WARN: '方法过时',
				LOAD_COMPONENT_ERROR: '组件加载失败',
				DATA_FILTER_ERROR: '数据过滤器异常',
				OTHERS: '其他',
			},
		}
	},
	watch: {
		value(val) {
			this.currentVal = val
		},
		currentVal(val) {
			this.$emit('input', val)
		},
	},
	methods: {
		handleClick(widget) {
			this.editor.unSelectWidget()
			this.editor.selectSceneIndex(widget.scene)
			this.editor.selectWidget(widget)
		},

		clear() {
			this.editor.log.clear()
		},
	},
}
</script>
<style lang="scss" scoped>
.empty {
	align-items: center;
	justify-content: center;
	padding: 10px;
	font-size: 12px;
}
.drawer-tool {
	padding: 10px;
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
	.left-box {
		margin-right: auto;
	}
	li {
		align-items: center;
		padding: 10px 0;
		p {
			color: rgb(191, 191, 191);
			font-size: 12px;
		}
		h2 {
			font-size: 14px;
		}
	}
	.look-btn {
		margin-left: 20px;
	}
}
</style>

<template lang="pug">
.d-detail-left.fn-flex
	.d-detail-left-icon-box.fn-flex
		.d-detail-left-icon.fn-flex.pointer(@click="backHandler")
			i-icon(type="ios-arrow-dropleft", size="22")
	.d-detail-title.fn-flex.pointer(:title="editor.name", @click="editName = true")
		e-input(width="152px" v-model="editor.name", v-if="editName", @blur="editName = false", :autofocus="true")
		span.fn-flex.d-detail-title.ellipsis(v-else) {{ editor.name }}
	widget
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'view-design'
import Editor from '@/core/Editor'
import eInput from '@/vue2/components-style/e-input/index.vue'
import widget from './widget.vue'
@Component({
	components: {
		'i-icon': Icon,
		eInput,
		widget,
	},
})
export default class DDetail extends Vue {
	editor = Editor.Instance()
	editName = false

	backHandler() {
		this.$router.push('/editor/manger')
	}
}
</script>
<style lang="scss" scoped>
.d-detail-left-icon-box {
	align-items: center;
	height: 100%;
}

.d-detail-left-icon {
	align-items: center;
	height: 100%;
	padding: 0 20px;
	color: var(--text-tab);

	&:hover {
		color: #4fb0ff;
		background-color: #30333d;
	}
}

.d-detail-title {
	align-items: center;
	margin-right: auto;
	font-size: 15px;
	color: var(--text-tab);

	span {
		align-items: center;
		width: 152px;
		height: 30px;
		padding: 0 8px;

		&:hover {
			background-color: #30333d;
		}
	}
}

.d-detail-left {
	height: 100%;
	margin-right: auto;
}
</style>

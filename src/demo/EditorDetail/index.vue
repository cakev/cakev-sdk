<template lang="pug">
.detail-container
	.preview-wrapper.fit-mode(
		:style="{ backgroundColor: editor.backgroundColor }")
		d-view
		d-detail(:show="false")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import dDetail from '@/vue2/components-open/d-detail/index.vue'
import dView from '@/vue2/components-open/d-view/index.vue'
import Editor from '@/core/Editor'

@Component({
	components: {
		dView,
		dDetail,
	},
})
export default class detail extends Vue {
	editor: Editor = Editor.Instance()
}
</script>
<style lang="scss">
.detail-container {
	height: 100%;
}

.preview-wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#screen {
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
		background-size: contain;
	}

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
}
</style>

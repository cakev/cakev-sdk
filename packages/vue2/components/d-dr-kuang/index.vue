<template lang="pug">
.dr-line.pos-a
	.dr-line-top.pos-a(:style="{ height: `${returnRatio}px` }")
	.dr-line-bottom.pos-a(:style="{ height: `${returnRatio}px` }")
	.dr-line-left.pos-a(:style="{ width: `${returnRatio}px` }")
	.dr-line-right.pos-a(:style="{ width: `${returnRatio}px` }")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'Kuang',
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	computed: {
		returnRatio(): number {
			return this.editor.current.zoom < 1 ? 1 / this.editor.current.zoom : 1
		},
	},
}
</script>
<style lang="scss">
.dr-line {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.dr-line-top {
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
}

.dr-line-bottom {
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1px;
}

.dr-line-left {
	top: 0;
	left: 0;
	width: 1px;
	height: 100%;
}

.dr-line-right {
	top: 0;
	right: 0;
	width: 1px;
	height: 100%;
}

.dr-active,
.dr-more,
.widget-part-edit:hover {
	.dr-line-top,
	.dr-line-bottom,
	.dr-line-left,
	.dr-line-right {
		background-color: rgba(18, 120, 246, 0.8);
	}
}

.dr-active.locked:hover {
	.dr-line-top,
	.dr-line-bottom,
	.dr-line-left,
	.dr-line-right {
		background-color: rgba(18, 120, 246, 0.4);
	}

	&::after {
		opacity: 1;
	}
}
</style>

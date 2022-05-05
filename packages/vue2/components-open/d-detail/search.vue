<template lang="pug">
.container(
	:class="{ active: value }",
	:style="{ width: `calc(100% - ${editor.xRoomL2 + editor.xRoomR1}px)`, left: `${editor.xRoomL2}px` }")
	.d-detail-search.animated.searchFadeInDown(v-click-outside="hide")
		i-input.d-detail-input(:autofocus="true", suffix="ios-search", placeholder="请输入组件名", v-model="keyword")
		ul.result
			li.pointer(v-for="(k, i) in searchResult", :key="i", @click="check(k)") {{ k.config.widget.name }}
</template>
<script>
import { Icon, Input } from 'view-design'
import ClickOutside from 'vue-click-outside'
import Editor from '@/core/Editor'

export default {
	name: 'd-search',
	directives: { ClickOutside },
	components: {
		'i-icon': Icon,
		'i-input': Input,
	},
	props: {
		value: {},
		hide: {},
	},
	data() {
		return {
			searchResult: [],
			keyword: '',
			editor: Editor.Instance(),
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.keyword = ''
			}
		},
		keyword: val => {
			if (!val) {
				this.searchResult = []
				return
			}
			let arr = []
			for (const key in this.editor.screen.screenWidgets) {
				if (
					this.editor.screen.screenWidgets[key].config.widget.name.includes(val) &&
					this.editor.screen.screenWidgets[key].scene !== -1
				) {
					arr.push(this.editor.screen.screenWidgets[key])
				}
			}
			this.searchResult = arr
		},
	},
	methods: {
		close() {
			this.hide()
		},
		check(widget) {
			this.editor.selectSceneIndex(widget.scene)
			this.editor.selectWidget(widget)
			this.hide()
		},
	},
}
</script>
<style lang="scss" scoped>
.container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 9999;
	display: none;

	&.active {
		display: block;
	}
}

.d-detail-search {
	position: absolute;
	top: 100px;
	left: 50%;
	width: 80%;
	margin-left: -40%;
	border-radius: 4px;

	/deep/ {
		.d-detail-input {
			input {
				color: #fff;
				background: rgba(10, 10, 14, 0.7);
				border: none;
				border-radius: 0;
			}
		}
	}
}

.result {
	max-height: 200px;
	margin-top: 10px;
	overflow-y: auto;
	background: rgba(10, 10, 14, 0.7);

	li {
		height: 30px;
		padding: 0 10px;
		margin: 4px 0;
		line-height: 30px;
		color: #fff;

		&:hover {
			background: #2d8cf0;
		}
	}

	&::-webkit-scrollbar {
		width: 4px;
		height: 1px;
		transition: all 0.3s;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(83, 83, 83, 1);
		border-radius: 10px;
		transition: all 0.3s;
	}

	&::-webkit-scrollbar-track {
		background: rgba(237, 237, 237, 1);
		border-radius: 10px;
		transition: all 0.3s;
	}
}

.searchFadeInDown {
	animation-name: searchFadeInDown;
	animation-duration: 0.3s;
}

@keyframes searchFadeInDown {
	0% {
		opacity: 0;
		-webkit-transform: translateY(-20px);
		transform: translateY(-20px);
	}

	100% {
		opacity: 1;
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
}
</style>

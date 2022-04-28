<template lang="pug">
i-input.d-input(
	v-bind="{...$props,...$attrs}",
	v-on="$listeners",)
	span.d-input-append(slot="append", v-if="append") {{ append }}
</template>
<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Input } from 'view-design'

@Component({
	components: {
		'i-input': Input,
	},
})
export default class DInput extends Vue {
	@Prop() append
}
</script>
<style lang="scss" scoped>
.d-input {
	border: 1px solid #393b4a;

	/deep/ {
		.ivu-input {
			color: #fafafa;
			background-color: #181b24;
			border: none;
			border-radius: 2px;
		}

		.ivu-input-group-append {
			background-color: #181b24;
			border: none;
		}
	}
}
</style>

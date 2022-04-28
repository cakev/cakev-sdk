<template lang="pug">
label.e-label {{ value }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ELabel extends Vue {
	@Prop() value
}
</script>
<style lang="scss" scoped>
.e-label {
	display: block;
	min-width: 60px;
	min-height: 32px;
	margin-right: 10px;
	font-size: 12px;
	line-height: 32px;
	color: rgb(191, 191, 191);
}
</style>

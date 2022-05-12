<template lang="pug">
.fn-flex.flex-row.h-title-1(v-if="data")
	.h-title-1-icon
	h2(@click="__handleEvent__('click', test)", @mouseover="__handleEvent__('mouseover')") {{ data.title }} {{ config.config.title }}
</template>
<script lang="ts">
export default {
	data() {
		return {
			test: {
				data: {
					value: [
						{
							x: ['07/11', '07/13', '07/14', '07/15', '07/16', '07/17'],
							y: [250, 350, 120, 290, 240, 250],
							name: '数据1',
						},
						{
							x: ['08/12', '08/13', '08/14', '08/15', '08/16', '08/17'],
							y: [150, 250, 420, 390, 140, 350],
							name: '数据2',
						},
					],
				},
			},
			// value: value,
			// customConfig: customConfig,
		}
	},
}
</script>
<style lang="scss">
.h-title-1-icon {
	width: 34px;
	height: 34px;
	margin-right: 9px;
	background-image: url('./h-title1-1.svg');
}

.h-title-1 {
	align-items: center;
	padding-bottom: 8px;
	border-bottom: 1px solid var(--white_04);

	h2 {
		font-size: 24px;
		font-weight: 600;
		color: var(--white);
	}
}
</style>

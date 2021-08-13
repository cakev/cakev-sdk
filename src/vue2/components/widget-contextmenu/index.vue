<template lang="pug">
el-menu.pos-a(:style="style()")
	el-menu-item(index="delete") 删除
</template>
<script lang="ts">
import style from './style'

export default {
	setup() {
		return {
			style,
		}
	},
}
</script>

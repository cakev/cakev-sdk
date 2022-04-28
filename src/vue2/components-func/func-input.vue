<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`")
	i-input(v-model="obj[inputKey]")
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'

@Component
export default class FuncInput extends func {}
</script>

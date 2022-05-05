<template lang="pug" functional>
cakev-group(v-if="props.children && Object.values(props.children).length > 0", v-bind="{ ...props }")
cakev-normal(v-else, v-bind="{ ...props }")
</template>

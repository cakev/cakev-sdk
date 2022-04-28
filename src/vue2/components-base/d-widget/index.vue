<template lang="pug" functional>
eslinkv-group(v-if="props.children && Object.values(props.children).length > 0", v-bind="{ ...props }")
eslinkv-normal(v-else, v-bind="{ ...props }")
</template>

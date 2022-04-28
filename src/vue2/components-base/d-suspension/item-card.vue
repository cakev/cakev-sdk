<template lang="pug">
.d-suspension-item.pointer.pos-r.fn-flex(v-bind="{ ...$props, ...$attrs }", v-on="$listeners", :class="{ active }")
	i-tooltip(:content="title", placement="left")
		i-icon.pointer(:type="icon", :size="22")
	slot
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Icon, Tooltip } from 'view-design'

@Component({
	components: {
		'i-icon': Icon,
		'i-tooltip': Tooltip,
	},
})
export default class ItemCard extends Vue {
	@Prop() icon
	@Prop() title
	@Prop({ default: false }) active
}
</script>
<style lang="scss" scoped>
.d-suspension-item {
	align-items: center;
	justify-content: center;
	width: 46px;
	height: 46px;
	color: #bfbfbf;
	cursor: pointer;
	border-bottom: 1px solid #393b4a;

	&.active {
		&::before {
			position: absolute;
			top: 5px;
			right: 5px;
			width: 4px;
			height: 4px;
			content: '';
			background-color: var(--primary-color);
			border-radius: 50%;
		}
	}

	&:hover {
		::v-deep {
			.ivu-icon {
				color: var(--text-3);
			}
		}
	}

	&:last-child {
		border: none;
	}
}
</style>

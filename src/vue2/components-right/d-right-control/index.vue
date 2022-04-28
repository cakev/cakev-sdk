<template lang="pug">
.d-manage-modal-control
	label
		span(style="margin-right: 5px") {{ label }}
		i-tooltip(:content="title", placement="top", v-if="title")
			e-svg.pos-r.pointer(:icon-class="icon", :size="16", :style="{ top: '3px' }")
	.d-manage-modal-control-right
		slot
</template>
<script>
import { Tooltip, Icon } from 'view-design'

export default {
	name: 'd-right-control',
	components: {
		'i-tooltip': Tooltip,
		'i-icon': Icon,
	},
	props: {
		label: {
			type: String,
		},
		title: {
			type: String,
		},
		icon: {
			type: String,
			default: 'help',
		},
	},
}
</script>
<style lang="scss">
.d-manage-modal-control {
	display: flex;
	display: -webkit-flex;
	align-items: center;
	min-height: 32px;
	padding-left: 10px;
	margin-bottom: 10px;

	.ivu-select-placeholder {
		color: #fafafa !important;
	}

	.ivu-select-input {
		color: #fafafa;
	}

	.ivu-collapse {
		width: 100%;
		background-color: #2d2f38;
		border: none;
	}

	.ivu-collapse-content {
		background-color: #2d2f38;
	}

	.ivu-collapse-header {
		height: 32px !important;
		line-height: 32px !important;
	}

	.ivu-color-picker-confirm {
		.ivu-btn-default {
			margin-right: 5px;
		}
	}

	.ivu-color-picker-color {
		div {
			box-shadow: none;
		}
	}

	.d-manage-modal-control-text {
		line-height: 32px;
		color: #fafafa;
	}

	.d-manage-modal-control-right {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		width: 210px;
		min-height: 32px;
		margin-right: 10px;
	}

	.ivu-select-not-found {
		padding: 4px 0;
	}

	.ivu-input-number {
		border: none;
		border-radius: 2px;
	}

	.ivu-select-dropdown {
		padding: 0;
		margin: 0;
		background-color: #2d2f38;
		border-radius: 2px;

		li {
			&:hover,
			&.ivu-select-item-focus {
				color: var(--themeColor);
				background-color: #22242b;
			}
		}
	}

	.ivu-input-number-handler-wrap {
		background-color: #181b24;
	}

	.ivu-select-placeholder {
		color: #fafafa;
	}

	.ivu-input,
	.ivu-select-selection,
	.ivu-input-number-input {
		color: #fafafa;
		background-color: #181b24;
		border: 1px solid #393b4a;
		border-radius: 2px;

		&:focus {
			border: 1px solid var(--themeColor);
		}
	}

	.ivu-checkbox {
		margin-right: 4px;
	}

	.ivu-checkbox-wrapper {
		color: #fafafa;
	}

	.ivu-input-disabled {
		background-color: #181b24 !important;

		&:hover {
			border: 1px solid var(--themeColor) !important;
		}
	}

	.ivu-color-picker {
		display: block;
		cursor: pointer;

		.ivu-icon {
			display: none;
		}

		.ivu-input-icon-normal + .ivu-input {
			padding-right: 7px;
		}
	}

	> label {
		display: block;
		flex: 1;
		font-size: 12px;
		line-height: 32px;
		color: #fafafa;
	}

	.ivu-input-number {
		display: block;
	}

	.ivu-radio-group-button {
		display: block;
	}
}
</style>

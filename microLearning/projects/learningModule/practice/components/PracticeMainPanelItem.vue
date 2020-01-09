<template>
	<div class="flex-button">
		<div class="practice-button" @click="onClickItem">
			<div class="button-icon" :class="{'simulation-examine-icon': isBigIcon}">
				<img :src="iconSrc">
			</div>
			<div class="button-title white-font">{{buttonText}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'practice-main-panel-item',
		components: {},
		props: {
			iconSrc: {
				type: String,
				default: ''
			},
			buttonText: {
				type: String,
				default: 'æ¨¡æ‹Ÿè€ƒè¯•'
			},
			isBigIcon: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			onClickItem() {
				this.$emit('on-click-item');
			}
		}
	};
</script>

<style lang='scss' scoped>
	
	.flex-button {
		flex: 1 1 auto;
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;

		.practice-button {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.button-icon {
				width: 31px;
				height: 31px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.button-title {
				font-size: $fontSize13;
			}

			.white-font {
				color: #fff;
			}

			.simulation-examine-icon {
				width: 75px;
				height: 75px;
			}
		}
	}
</style>

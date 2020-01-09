<template>
	<view class="examination-main-wrapper">
<!-- 		<custom-toolbar :style="toolbarStyle" :showCatyle="toolbarStyle" :showCapsule="showCapsule" :showSplitLine="!showSelectType"
		 :switchFirst="practiceType" :switchOption="switchOption" @switchHandler="switchEvent">
			<select-toolbar v-if="showSelectType" :selectItem="selectItem" @selectHandler="chooseCategory"></select-toolbar>
			<tab-toolbar v-else :activeTabValue="examineVo.tabType" :tabButtonList="tabButtonList" @tabClickHandler="changeExamineTab"></tab-toolbar>
		</custom-toolbar> -->
		<practice-main-panel></practice-main-panel>
	</view>
</template>

<script>
	import PracticeMainPanel from '../components/PracticeMainPanel.vue';
	import CustomToolbar from '@/components/base/toolbar/CustomToolbar.vue';

	export default {
		components: {
			PracticeMainPanel,
			CustomToolbar
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.examination-main-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;

		.examination-main-container {
			flex: 1 1 300px;
			height: 300px;
			display: flex;
			flex-direction: column;
		}
	}
</style>

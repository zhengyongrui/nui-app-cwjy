<template>
	<view class="examination-main-wrapper">
		<custom-toolbar :style="toolbarStyle" :showCatyle="toolbarStyle" :showCapsule="showCapsule" :showSplitLine="!showSelectType"
		 :switchFirst="practiceType" :switchOption="switchOption" @switchHandler="switchEvent">
			<!-- <select-toolbar v-if="showSelectType" :selectItem="selectItem" @selectHandler="chooseCategory"></select-toolbar> -->
			<!-- <tab-toolbar v-else :activeTabValue="examineVo.tabType" :tabButtonList="tabButtonList" @tabClickHandler="changeExamineTab"></tab-toolbar> -->
		</custom-toolbar>
		<practice-main-panel></practice-main-panel>
	</view>
</template>

<script>
	import SelectToolbar from '@/components/base/toolbar/SelectToolbar.vue'
	import {
		examinationTabTypes
	} from '../constants/practiceConst';
	import PracticeMainPanel from '../components/PracticeMainPanel.vue';
	import CustomToolbar from '@/components/base/toolbar/CustomToolbar.vue';
	import practiceService from '../services/practiceService.js'

	export default {
		components: {
			PracticeMainPanel,
			CustomToolbar
		},
		data() {
			return {
				goBackToNative: true,
				caption: '提能考核',
				displayType: 'all', // all 全部, practice练习, examine考试
				practiceType: true, // 练习和考试页签切换
				switchOption: {
					firstLongText: '练习',
					firstShortText: '练',
					secondLongText: '考试',
					secondShortText: '考'
				},
				tabButtonList: [{
						title: '考试',
						value: examinationTabTypes.EXAMINE_LIST
					},
					{
						title: '记录',
						value: examinationTabTypes.EXAMINE_RECORD
					},
					{
						title: '排行榜',
						value: examinationTabTypes.EXAMINE_RANKING_LIST
					}
				],
				practiceVo: {
					// 练习数据模型
					categoryList: [], // 练习分类列表
					selectedCategoryItem: {
						// 选中的练习分类项
						categoryId: '',
						categoryName: ''
					}
				},
				examinePlanId: '',
				examineVo: {
					tabType: examinationTabTypes.EXAMINE_LIST, // 考试列表examineList和考试记录examineRecord
					localExamList: [],
					noTipFromDetail: false, // 用于考试完成以后不提示暂无练习试题的参数
					showNoPracticeCategoryDataKey: true // 直接进入到开始考试的页面不提示没有练习题目
				},
				isAutoInitPageTitle: false,
				pageDefaultTitle: '提能考核'
			}
		},
		computed: {
			showCapsule() {
				if (this.displayType === 'all') {
					return true;
				}
				return false;
			},
			showSelectType() {
				if (this.practiceType || this.displayType === 'practice') {
					return true;
				}
				return false;
			},
			toolbarStyle() {
				if (this.displayType === 'all' && this.practiceType) {
					return {
						paddingRight: '80px'
					};
				}
				if (this.displayType === 'practice') {
					return {
						padding: '0 40px'
					};
				}
				return {};
			},
			selectItem() {
				if (this.practiceVo.selectedCategoryItem) {
					return {
						text: this.practiceVo.selectedCategoryItem.categoryName,
						value: this.practiceVo.selectedCategoryItem.categoryId
					};
				}
				return {
					text: '',
					value: ''
				};
			},
			showExamineList() {
				return this.examineVo.tabType === examinationTabTypes.EXAMINE_LIST;
			},
			showExamineRecord() {
				return this.examineVo.tabType === examinationTabTypes.EXAMINE_RECORD;
			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			initPage() {
				this.caption = '练习';
				this.practiceType = true;
				this.queryPracticeCategoryData();
			},
			queryPracticeCategoryData(showLoading) {
				let param = {
					pageNo: 1,
					pageSize: 20
				};
				this.$http.get('/topicCategory/findWebTopicCategoryList', {
					params: param
				}).then(
					res => {
						if (!res || !res.data || res.data.length === 0) {
							this.practiceVo.categoryList = [];
							if (this.showNoPracticeCategoryDataKey) {
								this.showNoPracticeCategoryDataHint();
							}
							return;
						}
						// 设置练习数据
						this.practiceVo.categoryList = res.data;
						let selectedCategoryItem = practiceService.getPracticeCategoryItem(this.practiceVo.categoryList);
						this.changePracticeCategory(selectedCategoryItem);
					},
					error => {
						alert('还没开始处理错误')
					}
				);
			},
		}
	}
</script>

<style>
	html {
		font-size: 10px;
	}

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

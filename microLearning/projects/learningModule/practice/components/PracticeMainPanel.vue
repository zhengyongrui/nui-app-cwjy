<template>
	<div class="practice-main-panel">
		<div class="practice-bg-container">
			<div class="flex-button-container">
				<practice-main-panel-item :buttonText="'模拟考试'" :iconSrc="mockExamSrc" @on-click-item="beginSimulationExamine"
				 :isBigIcon="true"></practice-main-panel-item>
			</div>
			<div class="flex-button-container margin">
				<practice-main-panel-item :buttonText="'考试记录'" :iconSrc="examRecordSrc" @on-click-item="toSimulationExamineRecordPage"></practice-main-panel-item>
				<practice-main-panel-item :buttonText="'排行榜'" :iconSrc="rankingListSrc" @on-click-item="goRankingList"></practice-main-panel-item>
			</div>
		</div>
		<div class="practice-function-container">
			<div v-for="(buttonRow, index) in practiceButtonList" :key="index" class="flex-button-container">
				<div v-for="item in buttonRow" :key="item.value" class="flex-button" :class="{'no-content-flex-button':!item.title}"
				 @click="practiceButtonClick(item)">
					<div class="practice-button">
						<div class="button-icon">
							<img v-if="item.iconSrc" class="button-icon" :src="item.iconSrc">
						</div>
						<div>{{item.title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		practiceButtonTypes
	} from '../constants/practiceConst.js';

	import PracticeMainPanelItem from './PracticeMainPanelItem';

	export default {
		name: 'practice-main-panel',
		components: {
			PracticeMainPanelItem
		},
		data() {
			return {
				practiceTrainingType: {
					order: 1,
					error: 3,
					collection: 4,
					random: 5
				},
				mockExamSrc: require('@/assets/img/examination/icon_mockexam.png'),
				examRecordSrc: require('@/assets/img/examination/icon_examrecord.png'),
				rankingListSrc: require('@/assets/img/examination/icon_rankinglist.png'),
				practiceButtonList: [
					[{
							value: practiceButtonTypes.ORDER,
							title: '顺序练习',
							iconSrc: require('@/assets/img/examination/icon_Sequentialexercise.png')
						},
						{
							value: practiceButtonTypes.TYPE,
							title: '题型练习',
							iconSrc: require('@/assets/img/examination/icon_typeexercises.png')
						}
					],
					[{
							value: practiceButtonTypes.RANDOM,
							title: '随机练习',
							iconSrc: require('@/assets/img/examination/icon_random.png')
						},
						{
							value: practiceButtonTypes.MY_COLLECTION,
							title: '我的收藏',
							iconSrc: require('@/assets/img/examination/icon_collection.png')
						}
					],
					[{
						value: practiceButtonTypes.MY_ERROR,
						title: '我的错题',
						iconSrc: require('@/assets/img/examination/icon_wrong.png')
					}, {
						value: practiceButtonTypes.SPACE
					}]
				]
			};
		},
		props: {
			practiceVo: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		methods: {
			practiceButtonClick(item) {
				switch (item.value) {
					case practiceButtonTypes.ORDER:
						this.goOrderPractice();
						break;
					case practiceButtonTypes.TYPE:
						this.goTypePractice();
						break;
					case practiceButtonTypes.MY_ERROR:
						this.goErrorPractice();
						break;
					case practiceButtonTypes.MY_COLLECTION:
						this.goPracticeCollection();
						break;
					case practiceButtonTypes.RANDOM:
						this.goRandomPractice();
						break;
					default:
						break;
				}
			},
			// 前往考试开始页
			toSimulationBeginPage() {
				this.routeToPageWithCategoryId('simulationBegin');
			},
			// 前往练习——考试记录页面
			toSimulationExamineRecordPage() {
				this.$router.push({
					name: 'simulationExamRecord'
				});
			},
			// 前往排行榜页面
			toRankingListPage() {
				this.routeToPageWithCategoryId('simulationRankingListMain');
			},
			// 前往练习页面(顺序、随机、收藏、错题)
			toPracticeDetailPage(trainingType, reBegin) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId,
					trainingType: trainingType,
					reBegin: reBegin
				};
				this.$router.push({
					name: 'practiceDetail',
					params: param
				});
			},
			// 前往题型练习页面
			toTypePracticePage() {
				this.routeToPageWithCategoryId('questionTypePractice');
			},
			// 根据路由名称转向(公共方法)
			routeToPageWithCategoryId(routeName) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId
				};
				this.$router.push({
					name: routeName,
					params: param
				});
			},
			// 检查类别类型
			checkExistPracticeCategory() {
				let result = true;
				if (!this.practiceVo.categoryList || this.practiceVo.categoryList.length === 0) {
					this.showHintDialog('您好，暂无练习题目，<br>请联系管理员');
					result = false;
				}
				return result;
			},
			// 练习——模拟考试按钮
			beginSimulationExamine() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				this.queryExistSimulationExamineByCategoryID(result => {
					if (result.code === 4) {
						this.toSimulationBeginPage();
					} else {
						this.showHintDialog('您好, 当前没有模拟试卷, <br>请联系管理员');
					}
				});
			},
			// 练习——查看模拟考试排行榜
			goRankingList() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				this.queryExistRankingInfo(result => {
					// code=0表示该类别不存在， code=4表示没有试卷
					if (result.code === 0 || result.code === 4) {
						this.showHintDialog('您好, 当前没有模拟试卷, <br>请联系管理员');
						return;
					}
					if (result.code === 1) {
						let vm = this;
						this.$vux.confirm.show({
							content: '您好，暂无人员上榜，<br>要不您来挑战一下',
							confirmText: '挑战',
							cancelText: '取消',
							onConfirm() {
								vm.toSimulationBeginPage();
							}
						});
					} else {
						this.toRankingListPage();
					}
				});
			},
			// 练习——顺序练习按钮
			goOrderPractice() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				this.queryOrderPracticeInfo(result => {
					// 没做过直接进入练习
					if (result.doneTopicCount === 0) {
						this.toPracticeDetailPage(this.practiceTrainingType.order, true);
						return;
					}
					let vm = this;
					// 全部做完提示
					if (result.finished) {
						this.showConfirmDialog({
							content: '您已答完所有题目，重新练习？',
							confirmText: '查看上次',
							cancelText: '重新练习',
							onConfirm() {
								vm.toPracticeDetailPage(vm.practiceTrainingType.order, false);
							},
							onCancel() {
								vm.toPracticeDetailPage(vm.practiceTrainingType.order, true);
							}
						});
						return;
					}
					this.showConfirmDialog({
						content: '你上次已做' + result.doneTopicCount + '题,继续练习?',
						confirmText: '继续上次',
						cancelText: '重新开始',
						onConfirm() {
							vm.toPracticeDetailPage(vm.practiceTrainingType.order, false);
						},
						onCancel() {
							vm.toPracticeDetailPage(vm.practiceTrainingType.order, true);
						}
					});
				});
			},
			// 练习——题型练习按钮
			goTypePractice() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				this.toTypePracticePage();
			},
			// 练习——我的错题按钮
			goErrorPractice() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				let option = {
					trainingType: this.practiceTrainingType.error,
					routeName: 'errorPractice'
				};
				this.queryErrorOrFavoritePracticeInfo(option);
			},
			// 练习——我的收藏按钮
			goPracticeCollection() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				let option = {
					trainingType: this.practiceTrainingType.collection,
					routeName: 'practiceCollection'
				};
				this.queryErrorOrFavoritePracticeInfo(option);
			},
			// 练习--随机练习按钮
			goRandomPractice() {
				let exitData = this.checkExistPracticeCategory();
				if (!exitData) {
					return;
				}
				this.toPracticeDetailPage(this.practiceTrainingType.random, true);
			},
			// 根据练习分类id查询是否存在模拟考试试卷
			queryExistSimulationExamineByCategoryID(successCallback) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId
				};
				this.$http.get('/training/getTrainingExamAppByCategoryId', {
					params: param
				}).then(
					res => {
						if (res && res.data && successCallback) {
							successCallback(res.data);
						}
					},
					error => {
						if (error !== null) {
							this.$vux.toast.show({
								text: '数据加载失败',
								type: 'text'
							});
						}
					}
				);
			},
			// 显示提示对话框
			showHintDialog(hintText, hideCallback, buttonName) {
				let ButtonString;
				buttonName && buttonName.length > 0 ? (ButtonString = buttonName) : (ButtonString = '我知道了');
				this.$vux.alert.show({
					content: hintText,
					buttonText: ButtonString,
					onHide() {
						if (hideCallback) {
							hideCallback();
						}
					}
				});
			},
			// 查询是否有排行榜数据
			queryExistRankingInfo(successCallback) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId
				};
				this.$http.get('/training/checkSomeOneOnRankingByCategoryId', {
					params: param
				}).then(
					res => {
						if (res && res.data && successCallback) {
							successCallback(res.data);
						}
					},
					error => {
						if (error !== null) {
							this.$vux.toast.show({
								text: '数据加载失败',
								type: 'text'
							});
						}
					}
				);
			},
			// 查询顺序练习是否有数据
			queryOrderPracticeInfo(successCallback) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId,
					trainingType: 1
				};
				this.$http.get('/training/getTrainingDoneTopicCount', {
					params: param
				}).then(
					res => {
						if (res && res.data && successCallback) {
							successCallback(res.data);
						}
					},
					error => {
						if (error !== null) {
							this.$vux.toast.show({
								text: '数据加载失败',
								type: 'text'
							});
						}
					}
				);
			},
			// 查询错题与收藏题目
			queryErrorOrFavoritePracticeInfo(option) {
				let param = {
					categoryId: this.practiceVo.selectedCategoryItem.categoryId,
					trainingType: option.trainingType
				};
				this.$http.get('/training/getEorrorOrFavoritePracticeHasTopic', {
					params: param
				}).then(
					res => {
						if (res && res.data) {
							this.processErrorOrFavoritePracticeInfo(option, res.data);
						}
					},
					error => {
						if (error !== null) {
							this.$vux.toast.show({
								text: '数据加载失败',
								type: 'text'
							});
						}
					}
				);
			},
			// 处理练习——我的错题和收藏数据返回
			processErrorOrFavoritePracticeInfo(option, result) {
				// 无数据
				if (result.hasTopic === false) {
					this.showHintDialog('您好,暂无数据');
					return;
				}
				// 错题类型有数据时直接跳转页面
				if (option.trainingType === this.practiceTrainingType.error) {
					this.routeToPageWithCategoryId(option.routeName);
					return;
				}
				// 是否存在子类别
				let existSon = this.practiceVo.selectedCategoryItem.existSon;
				if (existSon === 1) {
					this.routeToPageWithCategoryId(option.routeName);
					return;
				}
				// 无子类别判断是否做过练习
				if (result.doneTopicCount === 0) {
					this.toPracticeDetailPage(option.trainingType, true);
					return;
				}
				// 做完全部题目则提示
				let vm = this;
				if (result.finished) {
					this.showConfirmDialog({
						content: '您已答完所有题目，重新练习？',
						confirmText: '查看上次',
						cancelText: '重新练习',
						onConfirm() {
							vm.toPracticeDetailPage(option.trainingType, false);
						},
						onCancel() {
							vm.toPracticeDetailPage(option.trainingType, true);
						}
					});
					return;
				}
				this.showConfirmDialog({
					content: '你上次已做' + result.doneTopicCount + '题,继续练习?',
					confirmText: '继续上次',
					cancelText: '重新开始',
					onConfirm() {
						vm.toPracticeDetailPage(option.trainingType, false);
					},
					onCancel() {
						vm.toPracticeDetailPage(option.trainingType, true);
					}
				});
			},
			// 显示确认框
			showConfirmDialog(option) {
				this.$emit('show-confirm-dialog', option);
			}
		}
	};
</script>

<style lang='scss' scoped>
	$fontSize13: 1.3rem;
	.practice-main-panel {
		flex: 1 1 300px;
		height: 300px;
		overflow-x: hidden;
		overflow-y: auto;
		text-align: center;

		.flex-button-container {
			display: flex;
		}

		.practice-bg-container {
			width: 100%;
			height: 180px;
			padding: 15px 0;
			background: url('../../../../assets/img/examination/train_mainpage_bannerpic.png');
			background-repeat: no-repeat;
			background-position: bottom center;
			background-size: 100% 100%;

			.margin {
				margin-top: 30px;
			}
		}

		.practice-function-container {
			.flex-button-container {
				.flex-button {
					padding: 15px 0;
					border-bottom: 1px solid #f2f4f5;
					border-right: 1px solid #f2f4f5;
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
						font-size: $fontSize13;

						.button-icon {
							width: 31px;
							height: 31px;
						}
					}
				}

				.no-content-flex-button {
					border-bottom: none;
				}

				.flex-button:last-child {
					border-right: none;
				}
			}
		}
	}
</style>
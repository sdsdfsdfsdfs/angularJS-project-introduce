## 逻辑代码

我么在新建问卷的时候时允许用户这样操作的，增加题目、修改题目、增加选项、修改选项、删除题目、删除选项，最后保存问卷和发布问卷。

废话不多说，我直接给出我是怎样写。

```bash
//为创建问卷视图创建的控制器
	.controller( 'createNewInvestigate', 
		function( $scope, $location, queryElement, promptControl, editDraft, deleteSpaceFilter ) {
		//在该视图中，如果用户没有点击创建的话，将显示创建问卷的按钮，否则该按钮将消失
		$scope.create = {
			isCreated : editDraft.isCreating,
			createNewInvestigate : function() {
				$scope.create.isCreated = !$scope.create.isCreated;
			}
		};
		
		//控制器起作用的时候初始化数据
		$scope.initialData = function() {
			//如果已经保存过草稿了，那么就使用草稿，否则使用默认的问题
			if ( !editDraft.isCreating ){
				$scope.detail = {
					title : '这里是标题，点击我就可以编辑,下面的所有的文字点击之后都可以编辑，试试吧！',
					publishTime : null,
					finishTime : null,
					state : '未发布',
					isSelcted : false,
					newInvestigateQuestion : [
						{
							type : 'radio',
							question : '你最喜欢下面中的哪一位？我喜欢第一个。',
							optional : [
								'覃小夫', 'Napoleon', '毛泽东', '戴高乐'
							],
							haveToAnwser : null
						}
					]
				};
			}
			else 
				$scope.detail = editDraft.draft;
		}
		$scope.initialData();
		
		
		$scope.action = {
			//当标题的元素失去焦点的时候，将该元素的innerHTML赋值给新建的问卷的标题
			titleBlur : function() {
				$scope.detail.title = queryElement.querySingle( '#artileTitle' ).html().trim();
			},
			blur : function( outerIndex, innerIndex, event, clickType ) {
				//clickType为question字符串的时候是问题的标题失去焦点
				if ( clickType === 'question' ) {
					//当用户点击每一个题目的标题之后，那么这个标题可能会发生变化，所以重新赋值
					$scope.detail.newInvestigateQuestion[outerIndex].question = 
								angular.element( event.target ).html().trim();
				}else {
					$scope.detail.newInvestigateQuestion[outerIndex].optional
						.splice( innerIndex, 1, angular.element( event.target ).html().trim() );
				}
			},
			//用户添加选项
			addOption : function( outerIndex ) {
				$scope.detail.newInvestigateQuestion[outerIndex]
					.optional
					.push( '新添加的选项，你可以直接编辑，别太注意那些数字' + parseInt( Math.random() * 2300 ) );
			},
			deleteOption : function( outerIndex, innerIndex ) {
				$scope.detail.newInvestigateQuestion[outerIndex]
					.optional
					.splice( innerIndex, 1 );
			},
			deleteQustion : function( outerIndex ) {
				$scope.detail.newInvestigateQuestion.splice( outerIndex, 1 );
			},
			createQuestion : function() {
				//在用户点击创建问题的时候显示选择问题类型的三个选项按钮
				if ( !$scope.action.isPanelDisplay )
					$scope.action.showSelectPanel();
				else 
					$scope.action.hideSelectPanel();
				$scope.action.isPanelDisplay = !$scope.action.isPanelDisplay;
			},
			isPanelDisplay : null,
			//让让用户选择是单选择题还是多选择题的面板展开
			showSelectPanel : function() {
				queryElement.querySingle( '.modelPanel' ).css( 'display', 'block' );
			},
			//将问题类型选项按钮隐藏掉
			hideSelectPanel : function() {
				queryElement.querySingle( '.modelPanel' ).css( 'display', 'none' );
			},
			//用户选择新建的问题的类型
			selectQuestionModel : function( type ) {
				var question = {
					type : type,
					question : '新的问题在这里编辑。',
					optional : ['第一个选项,选项里面直接点击我就可以编辑','第二个选项', '第三个选项', '第四个选项']
				};
				$scope.detail.newInvestigateQuestion.push( question );
				//装完逼就跑，非常刺激，现在选择完了之后就把面板隐藏掉
				$scope.action.hideSelectPanel();
			},
			save : function() {
				if ( $scope.detail.newInvestigateQuestion.length === 0 ) {
					alert( '问卷中没有任何的问题，请编辑你的问题。' )
					return;
				}
				$scope.detail.publishTime = new Date();
				//将写好的问题保存到editDraft服务中，保存的话就会将现在的草稿保存到draft属性中
				$scope.detail.state = '未发布';
				editDraft.draft = $scope.detail;
				editDraft.isCreating = true;
				editDraft.isPublish = false;
				//保存好了之后转向问卷列表里
				$location.path( '/list' );
			}, 
			publish : function() {
				if ( $scope.detail.newInvestigateQuestion.length === 0 ) {
					alert( '问卷中没有任何的问题，请编辑你的问题。' );
					return;
				}
				//把发布时间确定下来,如果没有选择发布时间，则默认10天之后消失
				var publishTime = queryElement.querySingle( '#limitTime' ).val();
				var finalTime = null;
				if ( !publishTime ) {
					var finalTime = new Date();
					finalTime.setDate( finalTime.getDate() + 10 );
					finalTime = finalTime.toLocaleDateString().split( ' ' )[0];
				}else {
					finalTime = publishTime;
				}
				
				//修改浮出层的文字
				$scope.detail.finishTime = finalTime;
				$scope.detail.publishTime = new Date();
				$scope.promptBox.message = $scope.promptBox.message.split(':')[0];
				$scope.promptBox.message += ':' + finalTime; 
				
				promptControl._showBox();
			}
		};
		//浮出层的控制器
		$scope.promptBox = {
			message : "确认要发布问卷吗？问卷截止日期为",
			cancel : function() {
				promptControl._hideBox();
			},
			confirm : function() {
				$scope.action.publish();
				promptControl._hideBox();
				
				$scope.detail.state = '已发布';
				
				editDraft.publish = $scope.detail;
				editDraft.isCreating = false;
				editDraft.isPublish = true;
				//这里还得向别的视图转移
				$location.path( '/list' );
			}
		}
	})
	
```
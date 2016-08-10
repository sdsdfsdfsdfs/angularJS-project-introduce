/*
*这个文件存放的是视图的控制器，当ng-view的视图发生变化的时候的视图的控制器 
*/

angular.module( 'viewerController', [ 'investigateService' ] )
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
//				console.log( $scope.detail.newInvestigateQuestion )
			},
			//用户选择文本输入的提醒是否为必答题
			requiredToFix : function( outIndex ) {
				//这个函数其实没有什么作用，就是检查一下是否点击有效了
				//另外需要注意下，在这里的参数中没有event参数却可以使用event，使用了就不能用了
//				console.log( angular.element( event.target).attr( 'checked' ),
//					$scope.detail.newInvestigateQuestion[outIndex].requiredToFix
//				)
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
	
	//为调查问卷显示页面指定的控制器
	.controller( 'investigateManager', 
		function( $scope,$location, queryElement, promptControl, 
			editDraft, allInvestigateList, currentInvestigateData ) {
		//这是所有问卷调查的列表页面，该页面包含删除、编辑、新建问卷、全选、以及查看数据是功能
		//在用户点击删除某一个问卷的时候会弹出一个提示框，用来提示用户是否需要继续操作
		
		//所有的调查问卷的数组
		$scope.allInvestigate = allInvestigateList;
		$scope.checkBoxSelectAll;
		//判断当前用户点击的是否是全选之后的那个删除按键，如果是，就为false
		$scope.isSingleClick;
		//检查一下用户是否在跳转到这个视图之前发布了问卷
		$scope.checkoutIfPublished = function() {
			//如果下面的表达式成立，说明用户已经在新建问卷的页面发布了他的页面
			if ( !editDraft.isCreating && editDraft.isPublish ) {
				//如果该问卷曾经被当作草稿保存过，那么就先移除一下。
				//因为angular中使用ng-repeat指令的时候数组或是对象是不能有两个相同的值的
				if ( editDraft.editIndex !== -1 ) {
					$scope.allInvestigate.splice( editDraft.editIndex, 1, editDraft.publish );
				}else if ( editDraft.isSaveAsDraft ) {
					$scope.allInvestigate.pop();
					$scope.allInvestigate.push( editDraft.publish );
					editDraft.isSaveAsDraft = false;
				}else
					$scope.allInvestigate.push( editDraft.publish );
					
				editDraft.editIndex = -1;
			}
			
			//如果用户只是保存了草稿，那么也显示出来
			else if ( editDraft.isCreating && !editDraft.isPublish  ) {
				if (editDraft.editIndex !== -1 ) {
					$scope.allInvestigate.splice( editDraft.editIndex, 1, editDraft.draft );
				}else if ( editDraft.isSaveAsDraft ) {
					$scope.allInvestigate.pop();
					$scope.allInvestigate.push( editDraft.draft );
				}else{
					$scope.allInvestigate.push( editDraft.draft );
					editDraft.isSaveAsDraft = true;
				}
					
				
				editDraft.editIndex = -1;
			}
		}
		//每一个这个控制器生效的时候都执行这个函数
		$scope.checkoutIfPublished();
//		console.log( $scope.allInvestigate, editDraft )
		$scope.investigate = {
			createNewInvestigate : function() {
				$location.path( '/create' );
			},
			seleceSingleInvestigate : function( index ) {
				$scope.allInvestigate[index].isSelected = !$scope.allInvestigate[index].isSelected;
				//将当前问卷的下标存放到currentSelected数组中,如果以前并不存在这个问卷
				if ($scope.investigate.currentSelected.indexOf( index ) === -1 ){
					if ( $scope.allInvestigate[index].isSelected )
						$scope.investigate.currentSelected.push( index );	
				}else {
					if ( !$scope.allInvestigate[index].isSelected ){
						var position = $scope.investigate.currentSelected.indexOf( index );
						$scope.investigate.currentSelected.splice( position, 1 );
					}
				}
			},
			edit : function( index ) {
				if ( $scope.allInvestigate[index].state === '已发布' ) {
					alert( '问卷已经发布，不能在修改了！')
					return;
				}
				editDraft.draft = $scope.allInvestigate[index];
				editDraft.isCreating = true;
				editDraft.publish = null;
				editDraft.editIndex = index;
				$location.path( '/create' );
			},
			delete : function( index ) {
				$scope.investigate.singleSelected = index;
				$scope.isSingleClick = true;
				//弹出浮出层
				promptControl._showBox();
			},
			checkout : function( index ) {
				//如果当前的问卷尚处于未发布的状态，那么就拒绝提供问卷分析，直接返回
				if ( $scope.allInvestigate[index].state === '未发布' ) {
					alert( '问卷未发布，没有数据分析' );
					return;
				}
				
				currentInvestigateData.detail = $scope.allInvestigate[index];
				editDraft.isCreating = false;
				editDraft.isPublish = false;
				
				//查看某一个问卷的数据，将视图转向/show
				$location.path( '/show' );
			},
			deleteAll : function() {
				if ( !$scope.checkBoxSelectAll )
					return;
				promptControl._showBox();
				$scope.isSingleClick = false;
			},
			selectAll : function() {
				$scope.investigate.currentSelected = [];
				if ( $scope.checkBoxSelectAll ) {
					for ( var i = 0; i < $scope.allInvestigate.length; i++ ) {
						$scope.investigate.currentSelected.push(i);
						$scope.allInvestigate[i].isSelected = true;
					}
				}else {
					for ( var i = 0; i < $scope.allInvestigate.length; i++ ) {
						$scope.allInvestigate[i].isSelected = false;
					}
				}
			},
			//当前被选中的调查问卷
			currentSelected : [],
			//单独被选中的调查问卷，为用户点击每个问卷的删除按钮时做准备
			singleSelected : -1
		};
		
		//浮出层的控制器,只是在这个控制器里管用，在别的控制器中如果你需要使用浮出层，需要同样
		//设置一个$scope.promptBox的对象，而且里面的方法也许必须一样
		$scope.promptBox = {
			cancel : function() {
				$scope.investigate.singleSelected = -1;
				promptControl._hideBox();
			},
			confirm : function() {
				//根据$scope.checkBoxSelectAll这个变量来决定是否删除多个调查列表
				if ( !$scope.isSingleClick ) {
					//更新视图模型
					var index;
					while( $scope.investigate.currentSelected.length > 0 ) {
						index = $scope.investigate.currentSelected.pop();
						$scope.allInvestigate.splice( index, 1 );
					}
					$scope.checkBoxSelectAll = !$scope.checkBoxSelectAll;
				}else {
					//在保存所有问卷列表的服务中删除完了，也要检查一下当前删除的是不是正在保存的草稿
					if ( $scope.allInvestigate[$scope.investigate.singleSelected].state === '未发布' ) {
						//未发布的就是草稿
						for ( i in editDraft ) {
							editDraft[i] = null;
						}
					}
					//更新数据模型
					$scope.allInvestigate.splice( $scope.investigate.singleSelected, 1 );
					//检查一下在currentSelected数组中是否存在相同的下标，有的话就删除
					if ( $scope.investigate.currentSelected.indexOf( $scope.investigate.singleSelected ) !== -1 ) {
						var a = $scope.investigate.currentSelected.splice( $scope.investigate.singleSelected, 1 );
						var i = 0;
						while( i < $scope.investigate.currentSelected.length ) {
							if ( $scope.investigate.currentSelected[i] > a ) 
								$scope.investigate.currentSelected[i]--;
							i++;
						}
					}
					
					//把当前被选中的数字换成-1
					$scope.investigate.singleSelected = -1;
				}
				
				promptControl._hideBox();
			},
			message : '确认要删除这个问卷吗？'
		};
	})
	
	//查看具体的问卷调查的时候的控制器
	.controller( 'showInvestigate', function( $scope, $location, currentInvestigateData ) {
		$scope.detail = currentInvestigateData.detail;
		$scope.goBack = function() {
			$location.path( './list' );
		};
		
		/*
		 * 查看数据的视图需要的数据模型是这样的,不过我不是为了开发一个问卷调查的网页，所以不涉及到后台的问题
		 * 所以我就不准备什么数据了，顺其自然吧，我现在要的是样式。
		 * [ 
			{ title: '这是某一个人题目的具体问题', optional : [
				{ text : "选项一", proportion : 23},
				{text : "选项二", proportion:30},
				{text: "选项三", proportion:40}
			]}
		]
		 */
		/*[ 
			{ title: '这是某一个人题目的具体问题', optional : [
					{ text : "选项一", proportion : 23},
					{text : "选项二", proportion:30},
					{text: "选项三", proportion:40}
				]，
				type : 'radio'
			}
		]*/
	})

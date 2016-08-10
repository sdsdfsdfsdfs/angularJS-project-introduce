/*
 *该文件提供服务 
 */
angular.module( 'investigateService', [] )
	//将查询到的元素转化成angular的类数组
	.service( 'queryElement', function() {
		var doc = document;
		var myObject = {
			querySingle : function( expression ) {
				return angular.element( doc.querySelector( expression ) );
			},
			queryAll : function( expression ) {
				return angular.element( doc.querySelectorAll( expression ) );
			}
		};
		
		return myObject;
	})
	
	//浮出层的显示与关闭控制
	.service( 'promptControl', function( queryElement ) {
		var myObject = {
			_showBox : function() {
				var modifyInfoBackground = queryElement.querySingle( '.deletePromptBackground' );
				var promptBox = queryElement.querySingle( '.promptBox');
				modifyInfoBackground.css( 'display', 'block' );
				promptBox.css( 'display', 'block' );
			},
			_hideBox : function() {
				var modifyInfoBackground = queryElement.querySingle( '.deletePromptBackground' );
				var promptBox = queryElement.querySingle( '.promptBox');
				modifyInfoBackground.css( {'display':'none'} );
				promptBox.css( 'display', 'none' );
			}
		};
		return myObject;
	})
	
	//提供保存问卷草稿以及即将将问卷发布之前的版本的内容
	.service( 'editDraft', function() {
		var myObject = {
			draft : null,
			publish : null,
			//当点击编辑的时候需要知道编辑的是第几个问卷,-1的时候是最后一个
			editIndex : -1,
			isPuslish : null,
			isCreating : null,
			//是否作为草稿被存储到问卷列表中的变量
			isSaveAsDraft : null
		};
		return myObject;
	})
	
	//保存用户所有的问卷列表的服务
	.service( 'allInvestigateList', function() {
		var myObject = [];
		return myObject;
	})
	
	//新建问卷中的具体问题
	.service( 'singleInvestigate', function() {
		var myObject  = {
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
		return myObject;
	})
	
	//查看问卷调查的数据
	.service( 'currentInvestigateData', function() {
		var myObject = {
			detail : {
				title : '这里是标题，点击我就可以编辑,下面的所有的文字点击之后都可以编辑，试试吧！',
				publishTime : null,
				finishTime : null,
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
			}
		};
		
		return myObject;
	})

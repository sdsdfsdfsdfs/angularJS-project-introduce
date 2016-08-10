angular.module( 'directive', [])
	.directive( 'navBar', function() {
		return {
			restrict : 'EA',
			repalce : true,
			//隔离作用域，使得这个组件的作用域与父级作用域是分开的
			scope : {},
			templateUrl : './template/nav-bar.html',
			link : function( scope, element, attr ) {
				scope.currentPage = 'manage';
				
				/*
				*number表示第几个连接，如果是第一个就是1，以此类推 
				*/
				scope.changeView = function( number ) {
					switch( number ) {
						case 1:
							if ( scope.currentPage === 2 )
								scope.currentPage = 1;
							break;
						case 2:
							if ( scope.currentPage === 1 )
								scope.currentPage = 2;
							break;
					}
				}
			}
		};
	})
	.directive( 'myFooter', function() {
		return {
			restrict : 'EA',
			repalce : true,
			templateUrl : './template/my-footer.html',
			link : function( scope, element, attr ) {
				//指不定什么时候用得上这个link函数呢！现在这儿写上，以后再添加
			}
		};
	})
	.directive( 'investigateList', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/investigateList.html'
		}
	})
	.directive( 'createNew', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/createNewInvestigate.html'
		};
	})
	.directive( 'promptBox', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/prompt.html'
		};
	})
	.directive( 'showInvestigate', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/singleInvestigate.html'
		};
	})
	.directive( 'progressBar', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/figure.html',
			link : function( scope, element, attr ) {
				angular.element( element ).children().children().css( 'width', attr['proportion']+'%')
				scope.width = attr['proportion'];
			}
		};
	})
	
	//定义画饼图的指令
	.directive( 'drawPie', function() {
		return {
			reatrict : 'EA',
			templateUrl : './template/pie.html',
			link : function( scope, element, attr ) {
				scope.id = 'id' + Math.floor( Math.random() * 1000000 + Date.now() );
				var child = angular.element( element ).children();
				var option = [
					{optional:'覃小夫',number:90},
					{optional:'拿破仑', number:60},
					{optional:'毛泽东', number:32}
				];
				pie( child[0], option ).renderPie().renderTip();
			}
		};
	})

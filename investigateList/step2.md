## 编写控制器的逻辑

我们在前面列出了控制器所包含的一些方法，所以我们要在这里都实现了他们。你注意看一下他们前面都带有一个investigate，说明在控制器中这是一个对象，后面的方法都是这个对象的方法。另外你在前面看见了承载问卷列表的数据变量——allInvestigate，我们也需要定义它。我们在下面编写代码的时候都是在控制器中编写，所以为了简便，我们将不再添加整个的控制器以供观察。

+ investigate.createNewInvestigate()
+ investigate.seleceSingleInvestigate( $index )
+ investigate.edit( $index )
+ investigate.delete( $index)
+ investigate.checkout( $index )
+ investigate.selectAll()
+ investigate.deleteAll()

1、定义allInvestigate这个数据承载变量

首先，我们刚开始进入这个视图页面的时候是没有任何的问卷的，所以这个变量其实不应该有任何的值。

```bash
//但是这样会有一些问题，每一次我们进入这个视图之后都会重新初始化这个变量
//所以我们的数据并不能保存，
//我们会在后面使用服务来解决这个问题
//为了显示我们的最初的功能，我们假设这里已经有了几个问卷调查了

$scope.allInvestigate = [
	{ title : '覃小夫', publishTime : '2017-08-07', state : '已发布', isSelected : false },
	{ title : 'Napoleon', publishTime : '2017-08-07', state : '未发布', isSelected : false },
	{ title : '毛泽东', publishTime : '2017-08-07', state : '已发布', isSelected : false }
];
```

2、定义investigate对象以及它的方法

```bash
$scope.investigate = {
	createNewInvestigate : function() {

	},
	seleceSingleInvestigate : function( index ) {

	},
	edit : function( index ) {

	},
	delete : function( index ) {

	},
	//查看问卷
	checkout : functino( index ) {

	},
	selectAll : function() {

	},
	deleteAll : function() {

	}
};
```

我们还需要一个存放了我们选择哪一个问卷的数组，这个数组存放的是这个问卷在allInvestigate的下标，还有当我们的用户任意的点击其中一个问卷的删除按钮的时候，我们需要记录一下他点击的是哪一个文件，我们也将这个问卷的下标存放进一个变量当中。

```bash
$scope.investigate = {
	····
	//当前被选中的调查问卷
	currentSelected : [],
	//单独被选中的调查问卷，为用户点击每个问卷的删除按钮时做准备，没有任何选中的时候为-1，这样比较安全
	singleSelected : -1
```

我们再来看一下在本页面操作的函数（也就是不会跳转到其他页面的函数），seleceSingleInvestigate、delete、selectAll、deleteAll。

seleceSingleInvestigate函数的作用在于当我们点击某一个问卷的复选框的时候，我们查看这个复选框是否被选中，如果选中了，我们将这个问卷的下标赋值到singleSelected中。

```bash
seleceSingleInvestigate : function( index ) {
	//先对allInvestigate里面的相对应的数据更改一下，如果选中了，那么那个问卷的isSelected就为true，否则为false
	$scope.allInvestigate[index].isSelected = !$scope.allInvestigate[index].isSelected;

	/*
		当我们点击某个问卷的时候，我们还要查一下这个问卷的下标是否在currentSelected数组里，如果在
		并且我们现在是将这个问卷有选中状态到未选中状态的时候，我们需要将这个下标在currentSelected
		中移除，否则就添加
	*/
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
}
```

好了，选择一个问卷的逻辑其实很清晰，我不知道你是不是这样认为的。下面我们开始来看一下，删除的函数。当用户点击某一个问卷的删除按钮的时候，我们需要弹出我们以前定义的浮出层，询问是否确认删除这个问卷。我们还没有定义浮出层的相关控制器呢！（我们在前面定义的浮出层的控制器都是为了测试使用的。

```bash
delete : function( index ) {
	//将当前的问卷的下标赋值给$scope.investigate.singleSelected，也就是我们定义的某一个问卷被点击时候的变量
	$scope.investigate.singleSelected = index;

	//表示这试一次单击事件
	$scope.isSingleClick = true;

	//弹出浮出层
	promptControl._showBox();
}
```

这里我们将浮出层的弹出与消逝写成一个服务，名叫promptControl，所以我们需要在这个controller.js文件中引入服务的文件，并在这个控制器中引入promptControl这个具体的服务。我相信你已经知道了如何在controller.js中引入服务了，也许我们前面就引入过呢！

```bash
//浮出层的显示与关闭控制
//这个服务它也需要引入queryElement服务
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
	
```

在控制器的开始部分我们可以对promptControl这样进行引入。

```bash
//我们还会引入更多的服务，所以这里不会列举完
.controller( 'investigateManager', 
		function( $scope, promptControl,···){....}
```

显示浮出层之后我们还没有完事儿呢，还要把确认和取消的函数完成了，那时我们定义浮出层时候设计的函数，不过现在我们要在这里写上，所以你必须把前面的控制器删除掉，也删除掉浮出层对那个控制器的依赖。你可以这样做，在directive.js中。

```bash
.directive( 'promptBox', function() {
	return {
		restrict : 'EA',
		templateUrl : './template/prompt.html'

		//把下卖弄一行注释掉,记得把前面的逗号去掉
		/*controller : 'promptController'*/
	};
})
```

这样做就成功地拜托了我们前面定义的控制器对浮出层的控制了。我们现在可以自己再次对浮出层进行逻辑设计，就写在我们investigateManager这个控制器上。

```bash
/浮出层的控制器,只是在这个控制器里管用，在别的控制器中如果你需要使用浮出层，需要同样
//设置一个$scope.promptBox的对象，而且里面的方法也许必须一样
$scope.promptBox = {
	//取消的时候的函数
	cancel : function() {
		$scope.investigate.singleSelected = -1;
		promptControl._hideBox();
	},

	confirm : function() {
		//根据$scope.checkBoxSelectAll这个变量来决定是否删除多个调查列表
		if ( !$scope.isSingleClick ) {
			//更新视图模型，把allInvestigate里面的值根据$scope.investigate.currentSelected
			//来进行删除
			var index;
			while( $scope.investigate.currentSelected.length > 0 ) {
				index = $scope.investigate.currentSelected.pop();
				$scope.allInvestigate.splice( index, 1 );
			}
			$scope.checkBoxSelectAll = !$scope.checkBoxSelectAll;
		}else {
			
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
```

## selectAll、deleteAll

这两个函数其实逻辑也很简单，当点击问卷列表下方的全选复选框的时候，把所有的问卷都选上，当点击这个复选框之后的删除按钮的时候，把所有选上的问卷都删除掉，当然，这里面还需要弹出浮出层来询问是否需要删除之类的。

```bash
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
}
```

这就完成了这些逻辑代码的编写。


## 删除某一个问卷

我们在前面讲了如何响应用户点击某一个问卷的删除按钮和点击全选之后的删除按钮，但是我么没有讲如何将这些数据删除，但是我这里不准备贴出代码，因为这就是数组的`pop`的问题，只不过你需要知道你要删除的数组元素是哪一个而已，还有一点就是我们将浮出层的控制器的代码删掉了，但是我么在这个组件上有引用了浮出层的组件，所以我们必须要重新定义一下浮出层的`confirm``cancel`的函数。这些我们在前面已经贴出了代码。




### 最后，为了庆祝我们写完成了这几个重要的功能，我们应该去测试一下，自己看一下哪儿会出错了，也许不会呢！现在是时候去看一下怎样来新建一个问卷了。
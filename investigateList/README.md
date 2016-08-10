## 所有的调查问卷显示的组件部分

在设计图的第二张，我们看到了问卷列表的显示样式，看着好像挺简单的，不过我需要提醒你一下，这个部分的样式并不简单，这个部分的代码逻辑也不会很简单，所以你最好做好一些准备。好了，我们还是先来写directive.js里面的内容吧，既然我们要将其变成一个组件，那么我们应该首先定义这儿组件的名称、模板之类的。

```bash
.directive( 'investigateList', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/investigateList.html',
			
			//在这里声明我们需要使用的控制器，不过这既然是controller.js的内容，
			//我们就需要在最上方添加我们对dontroller.js文件的依赖，也就是依赖注入
			controller : 'investigateManager'
		}
	})
```

我们看一看我们在directive.js的依赖部分加上的是什么。

```bash
angular.module( 'directive', ['viewerController'])
```

而我们在controller.js文件中的名字就是'viewerController'，来看一下。

```bash
angular.module( 'viewerController', ['investigateService'] )
```

现在我们又要转战到controller.js文件上，将我们刚才需要的控制器定义一下了。

```bash
angular.module( 'viewerController', ['investigateService'] )

	/*这一部分是先前我们写的代码*/
	
	//现在开始定义investigateManager控制器
	.controller( 'investigateManager', function( $scope ) {
		
	})
```

好了，我们所需要的逻辑层面上的工作基本完成了框架的搭建，现在我们要先写一下样式，我不具体讲解我为什么会写这样的样式，因为这些东西非常容易看懂，所以我只会贴出代码以及一些必要的解释，希望能理解。我们看一下这个指令的模板文件是怎样写的。

```bash
<div class="container-fluid">
	<div style="width:100%;height:50px;"></div>
	<div class="investigateShow">
		<div class="titleOfInvestigate clearfix">
			<div>
				<!--
                	作者：qxfnapoleon@163.com
                	时间：2016-07-25
                	描述：为了和下面的复选框对应,加上这个空格的作用是为了使得css样式生效，如果这个DIV
                	中空空如也，那么CSS就会选择放弃渲染
                -->
                &nbsp;
			</div>
			<div>标题</div>
			<div>时间</div>
			<div>状态</div>
			<div>操作</div>
			<div>
				<button ng-click="investigate.createNewInvestigate()">
					<span class="glyphicon glyphicon-plus"></span>新建问卷
				</button>
			</div>
		</div>
		<!--
        	作者：qxfnapoleon@163.com
        	时间：2016-07-26
        	描述：下面将有ng-repeat指令对模型中的问卷数据进行显示
        -->
		<div class="listOfInvestigate clearfix" ng-repeat="singleInvestigate in allInvestigate">
			<div>
				<input type="checkbox" 
					   ng-click="investigate.seleceSingleInvestigate( $index )" 
					   ng-checked="checkBoxSelectAll"
					   ng-model="singleInvestigate.isSelected" />
						<!--注意看上面的ng-model-->
			</div>
			<div>{{singleInvestigate.title}}</div>

			<!--问卷发布的时间，我们使用AngularJS的内置过滤器将时间格式化-->
			<div>{{singleInvestigate.publishTime | date:'yyyy-MM-dd HH:mm:ss'}}</div>

			<!--如果singleInvestigate.state（一个对象的属性）为未发布的话，那就显示publishing类的样式-->
			<div ng-class="{publishing:singleInvestigate.state=='未发布'}">{{singleInvestigate.state}}</div>

			<div>
				<button ng-click="investigate.edit( $index )">编辑</button>
				<button ng-click="investigate.delete( $index)">删除</button>
				<button ng-click="investigate.checkout( $index )">查看数据</button>
			</div>
		</div>
	
		<div class="subInvestigate clearfix">
			<div>
				<!--
				下面的复选框我们给它设置了一个ng-model，当我们点击这个复选框并将其选中的时候
				我们希望上面的所有问卷都被选中，所以你仔细看一下我们在上面的每一个问卷的复选框都加上了ng-checked
				这个指令，而且这个指令后面的值就是与我们在下面的ng-model是一样的
				-->
				<input type="checkbox" ng-click="investigate.selectAll()" ng-model="checkBoxSelectAll"/>全选
			</div>
			<div>
				<button ng-click="investigate.deleteAll()">删除</button>
			</div>
		</div>
	</div>
	
	<!--
    	作者：qxfnapoleon@163.com
    	时间：2016-07-25
    	描述：当用户点击删除某一个问卷的时候的浮出层，开始的时候是隐藏的，这是我们在前面定义的付出层的指令
   -->
	<prompt-box></prompt-box>
</div>
```

我们统计一下，我们在里面一共写了几个ng-click相应的函数。

+ investigate.createNewInvestigate()
+ investigate.seleceSingleInvestigate( $index )
+ investigate.edit( $index )
+ investigate.delete( $index)
+ investigate.checkout( $index )
+ investigate.selectAll()
+ investigate.deleteAll()

还有一些数据，不过一会你看到我们在写控制器的时候你就能明白了。

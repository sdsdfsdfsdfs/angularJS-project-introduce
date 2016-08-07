## 千里之行，始于足下

好了，废话不多说，我们开始编辑我们的directive.js文件，我想让浮出层也成为一个组件，那么我还是使用我最熟悉的方法——编写指令。类似于导航栏的设计，我们可以这样做。

```bash
//我们将这个组件命名为promptBox
.directive( 'promptBox', function() {
		return {
			restrict : 'EA',
			templateUrl : './template/prompt.html',
			controller : 'promptController'
		};
	})
```

你会看到我们没有像定义导航组件那样，将controller写在指令上了，为什么呢？因为这个指令控制器还比较麻烦，所以我们还是将其写在专门的controller.js文件上比较好，到时候我会对其进行讲解的。然后我们看看prompt.html到底是怎样写的。

```bash
<div>
	<div class="promptBackground"></div>
    <div class="promptBox">
		<div class="promptTitle">
			提示
			<div class="glyphicon glyphicon-remove promptRemove" ng-click="promptBox.cancel()"></div>
		</div>
		<div class="promptMessage">
			{{promptBox.message}}
		</div>
		<div class="promptFooter">
			<button ng-click="promptBox.confirm()">确定</button>
			<button ng-click="promptBox.cancel()">取消</button>
		</div>
	</div>
</div>
```

亲娘，这也不难啊，就这么几个元素。我们看到第一个div子元素的类名为`promptBackground`，这就是你在设计图中所看到的有几分透明度的背景了，它是通过position为fixed来进行定位的，这样我们就可以设置它的宽度和高度为我们所能看见的页面的全部宽度与高度。其次是哪一个提示的框，我将其命名为`promptBox`，它还有一些标题和提示文字以及两个提示框都会带有的按钮，具体样式的设计我就不讲了，一会我会贴出具体的样式代码。最后你还会注意到在这个模板文件中还有三个ng-click，这是AngularJS响应鼠标单击事件的指令，有点儿类似于onclick，里面的函数都是我一会会在controller.js文件中定义的，还有一个`{{promptBox.message}}`，这个也会在controller.js中定义，不过不是在浮出层的控制器上定义，而是在它的父级控制器重定义，为什么呢？因为我们要会在两个场景中使用到这个浮出层，而这两个场景下的提示信息都不一样，所以我们需要一个动态的提示信息。

先来看一下这个浮出层的样式类，你可以不看，如果你只是想学习AngularJS的话，不过我可不希望这样，毕竟内在美我们需要，外在美我们也需要，虽然我做的这个外在美不怎么样，但至少化了妆！这一次的样式类的代码就比较多了。

```bash
/*下面的样式是当用户点击删除的按钮的时候弹出的浮出层*/
.promptBackground {
	position:fixed;
	top:0;
	left:0;
	z-index: 10;
	opacity: 0.3;
	background: black;
	width:100%;
	height: 100%;
	/*初始化的时候浮出层是隐藏的，但是我们为了查看效果
	我们先不隐藏起来，到时候我们做完了之后才将其隐藏*/
	/*display: none;*/
}

.promptBox{
	position: fixed;
	z-index:12;
	/*下面的三行语句是为了让这个提示框是垂直居中的*/
	top:50%;
	left:50%;
	transform:translate( -50%, -50% );

	background:white;
	width:300px;
	height:200px;
	
	border-radius:6px;
	font-family: "微软雅黑", sans-serif;
	font-size: 18px;
	
	/*display: none;*/
}
.promptTitle{
	font-weight:bold;
	background: #F1F1F1;
	padding:10px;
	border-radius:6px;
}
.promptRemove{
	position: absolute;
	right:10px;
	padding: 10px;
	cursor:pointer;
}
.promptRemove:hover{
	color:gray;
}
.promptMessage{
	padding: 10px;
	position: absolute;
	top:50%
	left:50%;
	transform: translateY( 50% );
}
.promptFooter{
	position: absolute;
	bottom:20px;
	left:50%;
	transform: translateX( -50% );
}
.promptFooter button{
	font-size:16px;
	margin-left:10px;
	padding: 2px 10px;
	border-radius:2px;
	border:1px solid #BFBFBF;
	background: #FFFFFF;
}
.promptFooter button:hover{
	background: orangered;
}

```
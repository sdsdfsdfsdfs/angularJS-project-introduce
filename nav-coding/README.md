## 这里先讲解如何制作导航栏的组件

我们使用bootstrap的相关类来辅助我们进行编排，我们这里需要用到directive指令，所以我们需要引入directive文件夹下的文件，我们将其命名为directive.js，并最后将其注入到我们的AngularJS的应用中。很简单，就像下面这样。

```bash
<!--上面的部分我不在赘述，这是index.html文件的内容，所以你要在自己的index.html文件中添加下面的代码-->
</body>

	<!--引入AngularJS的主文件-->
	<script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
	<script src="./directive/directive.js"></script>
	<script>
		//下面传入directive作为AngularJS的依赖模块
		var investigate = angular.module( 'investigatePage', 
										['directive'] );
	</script>
</html>
```

而我们在directive.js文件中的初步代码是这样的，过会儿我们会再次编写里面的内容。

```bash
//module函数的第一个参数与我们在index.html依赖注入的名称是一样的
angular.module( 'directive', [])
```
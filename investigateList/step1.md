## 先看看样式怎么写

在上一章节中我们没有列出相关的样式的代码，所以你如果尝试进行显示的话，那么会变得比较的丑陋，现在我马上贴出样式的相关代码，你很快就能看见比较美观的页面了。因为样式你可能会写得比我好很多，所以你可以自己进行尝试。

```bash
/*下面的样式是调查主体的部分*/
.investigateShow{
	max-width:90%;
	margin:auto;
	border:1px solid red;
	font-family: '微软雅黑';
}
.investigateShow input[type="checkbox"]{
	/*display: inline-block;*/
	/*width:120%;
	height:120%;*/
	/*border:1px solid red;*/	
	color:red;
}
/*发布中的样式*/
.publishing{
	color:red;
}
.listOfInvestigate{
	border-bottom:1px solid gray;
	padding:10px 0 12px 0;
	background: #FFFFFF;
}
.listOfInvestigate:hover{
	background: #FFEEEE;
}
.titleOfInvestigate{
	background:#EFEFEF;
	padding:10px 0 12px 0;
}

.subInvestigate{
	padding:10px 0 12px 0;
	background: #FFFFFF;
}

.titleOfInvestigate>div, .listOfInvestigate>div, .subInvestigate>div{
	display: inline-block;
	height:100%;
	float:left;
}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{*+height:1%;}
.titleOfInvestigate>div:nth-child(1), 
.listOfInvestigate>div:nth-child(1), 
.subInvestigate>div:nth-child(1) {
	width:10%;
	height:100%;
	padding-left:20px;
}
.titleOfInvestigate>div:nth-child(2), 
.listOfInvestigate>div:nth-child(2), 
.subInvestigate>div:nth-child(2) {
	width:30%;
	height: 100%;
}
.titleOfInvestigate>div:nth-child(3), 
.listOfInvestigate>div:nth-child(3), 
.subInvestigate>div:nth-child(3) {
	width:20%;
	height: 100%;
}

.titleOfInvestigate>div:nth-child(4), 
.listOfInvestigate>div:nth-child(4), 
.subInvestigate>div:nth-child(4) {
	width:10%;
	height: 100%;
}

/*将titleOfInvestigate的第5、6个div单独写是因为有特殊的要求*/
.titleOfInvestigate>div:nth-child(5) {
	width:5%;
	height: 100%;
}
.titleOfInvestigate>div:nth-child(6) {
	width:25%;
	height: 100%;
	text-align: right;
}


.listOfInvestigate>div:nth-child(5), 
.subInvestigate>div:nth-child(5) {
	width:30%;
	height: 100%;
}

/*定义按钮的样式*/
.investigateShow button{
	padding:2px 10px;
	margin-left:10px;
	background: #FFFFFF;
	border:1px solid #BFBFBF;
}

```

看完这些样式代码，都有104行了，所以我决定先结束这一节，下一节我们再来看控制器怎么写。
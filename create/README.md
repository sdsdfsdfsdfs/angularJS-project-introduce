## 新建问卷

现在我们又要开始写一个新的组件了，那就是新建问卷的组件，你看到了，在每一次需要新建的时候都有一个新建的按钮，这个非常简单，你只需要设置相关的css样式，在视图引入的时候显示，并在你点击之后这个部分隐藏，点击之后则显示具体的添加问卷的问题之类的。我只给给出我的HTML和CSS代码。

```bash
<div class="container-fluid" ng-controller="createNewInvestigate">
	<div style="width:100%;height:50px;"></div>
	<div class="createNewInvestigate">
		<!--
        	作者：qxfnapoleon@163.com
        	时间：2016-07-27
        	描述：在没有创建任何问卷的时候显示的提示创建问卷的视图
        -->
		<div class="createButton" ng-click="create.createNewInvestigate()" ng-hide="create.isCreated">
			<span>+</span>
			新建问卷
		</div>
		<!--
        	作者：qxfnapoleon@163.com
        	时间：2016-07-27
        	描述：新建问卷中的具体的问题
        -->
		<div class="createArticle" ng-show="create.isCreated">
			<div style="height:20px;"></div>
			<div class="createTitle">
				<h3 ng-bind="detail.title" 
					contenteditable="true" 
					ng-blur="action.titleBlur()" 
					id="artileTitle">
					{{detail.title | deleteSpace }}
				</h3>
				<!--<input type="text" ng-model="detail.title" />-->
			</div>
			<!--
        	作者：qxfnapoleon@163.com
        	时间：2016-07-27
        	描述：所有的已经建立的问卷的题目列表
        -->
	        <div class="newInvestigateQuestionList">
	        	<div ng-repeat="question in detail.newInvestigateQuestion" class="singleQuestion">
	        		<ul>
	     				<li class="clearfix">
		     				Q{{$index+1}}&nbsp;&nbsp;
		     				<span contenteditable="true" 
		     					  ng-blur="action.blur($index, -1, $event, 'question')">
		     					{{question.question | deleteSpace }}
		     				</span>
		     				<span class="glyphicon glyphicon-remove" 
		     					  ng-click="action.deleteQustion($index)"></span>
		        			<span ng-class="{hide:question.type!='textArea'}" class="choiceOfTextArea">
		        				<input type="checkbox" 
		        					   ng-model="question.requiredToFix"
		        					   ng-change="action.requiredToFix($index)"/>
		        				&nbsp;&nbsp;此题是否为必答
		        			</span>
	     					<ul ng-init="index=$index;">
			        			<li ng-repeat="anwser in question.optional" 
			        				ng-init="name='anwser' + $index"
			        				ng-class="{hide:question.type!='radio'}">
			        				<input type="radio" name="name" />
			        				<span contenteditable="true" 
			        					  ng-blur="action.blur( index, $index, $event, 'anwser')">
			        					{{ anwser | deleteSpace }}
			        				</span>
			        				<span class="glyphicon glyphicon-remove" 
		     					  		  ng-click="action.deleteOption(index, $index)"></span>
			        			</li>
			        			<li ng-repeat="anwser in question.optional" 
			        				ng-init="name='anwser' + $index"
			        				ng-class="{hide:question.type!='checkbox'}">
			        				<input type="checkbox" name="name" />
			        				<span contenteditable="true" 
			        					  ng-blur="action.blur( index, $index, $event, 'answer')">
			        					{{ anwser | deleteSpace }}
			        				</span>
			        				<span class="glyphicon glyphicon-remove" 
		     					  		  ng-click="action.deleteOption(index, $index)"></span>
			        			</li>
			        			<li ng-class="{hide:question.type!='textArea'}">
			        				<div class="editArea" contenteditable="true"
			        					
			        				</div>
			        			</li>
			        			<p ng-class="{hide:question.type=='textArea'}" 
			        			   class="addOption"
			        			   ng-click="action.addOption(index)">添加选项</p>
	     					</ul>
	     				</li>
	        		</ul>
	        	</div>
	        </div>
			<div class="guide">
				<div class="modelPanel">
					<div ng-click="action.selectQuestionModel('radio')"><input type="radio"/ >单选</div>
					<div ng-click="action.selectQuestionModel('checkbox')"><input type="checkbox" />多选</div>
					<div ng-click="action.selectQuestionModel('textArea')">
						<span class="glyphicon glyphicon-list-alt"></span>文本题
					</div>
				</div>
				<div class="addQuestion" ng-click="action.createQuestion()">
					<span>+</span>&nbsp;新建问卷
				</div>
			</div>
			<div class="guide-footer clearfix">
				<div>
					问卷截止日期
					<input type="date" name="input" 
						id="limitTime" class="publishTime"
      					placeholder="YYYY-MM-dd" />
				</div>
      			
      			<button ng-click="action.publish()">发布问卷</button>
      			<button ng-click="action.save()">保存问卷</button>
			</div>
		</div>
	</div>

	<!--这里我们也引入了浮出层，因为当我们需要发布问卷的时候要询问一下-->
	<prompt-box></prompt-box>
</div>

```


CSS代码

```bash
/*新建问卷的标题*/
.createTitle{
	padding-top:10px;
	padding-bottom:10px;
	width:90%;
	margin:auto;
	border-bottom:2px solid gray;
}
.createTitle:hover{
	background: #FFEEEE;
}
.createTitle>input{
	display: block;
	width:100%;
	height:40px;
	border:1px solid gray;
	border-radius:6px;
}
.createTitle>h3{
	text-align: center;
}

.guide{
	width:90%;
	margin:auto;
	padding:20px 0;
	/*border-top:2px solid gray;*/
	border-bottom:2px solid gray;
}
/*单选、多选、文本题选择按钮的样式*/
.modelPanel{
	/*border:1px solid red;*/
	text-align: center;
	padding-top:10px;
	padding-bottom:10px;
	display: none;
}
.modelPanel>div{
	cursor: pointer;
	display:inline-block;
	margin-left:20px;
	padding:4px 24px;
	background: #A9A9A9;
	border:1px solid gray;
}
.addQuestion{
	width:90%;
	margin:auto;
	font-size: 20px;
	text-align: center;
	padding-top:30px;
	padding-bottom:30px;
	background: #BFBFBF;
	cursor:pointer;
}
.addQuestion span{
	display: inline-block;
	transform: scale(2);
}

/*新建问卷页面的页脚部分*/
.guide-footer{
	width:90%;
	margin:auto;
	padding:30px;
}
.publishTime{
	display: inline-block;
	max-width:300px;
	border-radius:2px;
	border:1px solid gray;
}
.guide-footer>*{
	display: inline-block;
}
.guide-footer>button:nth-child(2){
	float:right;
	background: #FFFFFF;
	border:1px solid gray;
	padding: 4px 20px;
}
.guide-footer>button:nth-child(3){
	margin-right:20px;
	float:right;
	background: #FFFFFF;
	border:1px solid gray;
	padding: 4px 20px;
}

/*下面是新建问卷的时候已经添加的问题的样式*/
.hide{
	display: none;
}
.newInvestigateQuestionList{
	width:90%;
	margin:auto;
	padding-top:20px;
}
.addOption{
	cursor:pointer;
}
.editArea{
	width:60%;
	min-height:70px;
	margin-top:10px;
	border:1px solid lightgray;
}
.choiceOfTextArea{
	float:right;
}
.singleQuestion:hover{
	background: #FFEEEE;
}
```
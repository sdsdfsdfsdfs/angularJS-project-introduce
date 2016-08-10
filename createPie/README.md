## 绘制饼图

这个在angularJs中并不提供，所以我么还得自己动手操作，当然你可以选择网上很多的组件，只不多这些组件大多包含很多功能我们不需要使用，这其中增加了文件的复杂，所以我选择自己写一个画饼图的小框架，模仿jQuery的创建方式来进行书写，下面是代码。

```bash
;(function(){
	/*
	 * option {object} ,传递需要绘制的参数,[ {optional:'选项一', number:23}, {},... ]
	 */
	var createCanvas = window.pie = function( wraper, option ) {
		return new pie.fn.init( wraper, option );
	}
	
	//仿造jQuery的写法
	pie.fn = pie.prototype = {
		init : function( wraper, option ) {
			var canvasWraper;
			var doc = document;
			if ( wraper ) 
				canvasWraper = wraper;
			else
				canvasWraper = doc.querySelector( '#canvasBackground' );
				
			var canvas = doc.createElement( 'canvas' );
			canvas.setAttribute( 'height', '200px;' );
			canvas.setAttribute( 'width', '200px;' );
			this.id = 'id' + Math.floor( Math.random() * 100000000 + Date.now() ) ;
			canvas.setAttribute( 'id', this.id );
			canvasWraper.appendChild( canvas );
			
			var canvasID = doc.querySelector( '#' + this.id );
	    	this.context = canvasID.getContext("2d");
	    	this.option = option;
	    	this._calcTotal();
	    	
	    	//主要是为了链式调用，不返回也可以
	    	return this;
		},
		//定义从原中伸出的线的长度
		firstLine : 10,
		secondLine : 10,
		total : 0,
		circleCenter : [ 130, 130 ],
		color : ['red', 'green', 'yellow', 'orange', 'pink', 'gray'],
		//计算总的数量
		_calcTotal : function() {
			var _this = this;
			this.option.forEach( function( item ) {
				_this.total += item['number'];
			})
		},
		/*
		 * clockwise:false为顺时针，true为逆时针
		 */
		circle : function( centerX, centerY, radius, startAngle, endAngle, fillColor ) {
			this.context.save();
			this.context.lineWidth = 1;
			this.context.fillStyle = fillColor;
			this.context.beginPath();
			this.context.arc( centerX, centerY, radius, startAngle, endAngle, false );
			this.context.moveTo(centerX, centerY);  
	        this.context.lineTo(centerX + radius * Math.cos(startAngle), 
	        					centerY + radius * Math.sin(startAngle) );
	        this.context.lineTo(centerX + radius * Math.cos(endAngle), 
	        					centerY + radius * Math.sin(endAngle) );
			this.context.lineTo(centerX, centerY); 
			 
	        this.context.closePath();
	        
			this.context.fill();
			return this;
		},
		_line : function( beginX, beginY, endX, endY, lineWidth, strokeStyle ) {
			this.context.save();
			this.context.beginPath();
			
			//将原点位置移动
//                  this.context.translate(100,100);
            this.context.lineWidth= lineWidth || 2;
            this.context.strokeStyle = strokeStyle || 'gray';

            this.context.moveTo(beginX, beginY);
            this.context.lineTo(endX, endY);
            this.context.closePath();
            
            this.context.stroke();
            this.context.restore();
            return this;
		},
		_text : function( x, y, string ) {
			this.context.save();
			this.context.font = '10px Georgia';
			this.context.fillText( string, x, y );
			this.context.restore();
			return this;
		},
		
		/*
		 * 画矩形
		 * pointStart : 保存左上角的顶点坐标
		 */
		_drawRect : function( pointStart, width, height, fillColor ) {
			this.context.save();
			this.context.fillStyle = fillColor;
			this.context.beginPath();
			this.context.rect( pointStart[0], pointStart[1], width, height );
			this.context.fill();
			this.context.closePath();
			this.context.restore();
			return this;
		},
		//这个函数才是真正开始讲数据画出来的函数
		renderPie : function() {
			var _this = this;
			
			//将每一个选项的角度计算出来
			this.option.forEach( function( item ) {
				item.angle = item['number'] / _this.total * Math.PI * 2; 
			});
			
			var startAngle = 0;
			this.option.forEach( function( item, index ) {
				_this.circle( _this.circleCenter[0],
							  _this.circleCenter[1], 
							  70,
							  startAngle, 
							  item['angle'] + startAngle, 
							  _this.color[index%_this.color.length] );
				startAngle += item['angle'];
			});
			return this;
		},
		renderLine : function() {
			var _this = this;
			var prevAngle = 0;
			this.option.forEach( function( item, index ) {
				var angle;
				if ( index < 1 )
					angle = item['angle'] / 2;
				else 
					angle = ( prevAngle + item['angle'] ) / 2;
				prevAngle += item['angle'] * 2;
				
				var radius = 70 + _this.firstLine;
				var pointX = radius * Math.cos( angle ) + _this.circleCenter[0];
				var pointY = radius * Math.sin( angle ) + _this.circleCenter[1];
				_this._line( _this.circleCenter[0], 
							_this.circleCenter[1], 
							pointX, 
							pointY, 
							2, 
							'black' );
			});
			return this;
		},
		/*
		 * 画出图示
		 */
		renderTip : function() {
			var _this = this;
			var startX = 8;
			var startY = 8;
			var textString;
			this.option.forEach( function( item, index ) {
				textString = item['optional'] + 
					parseInt( ( item['number'] / _this.total ) * 100 ) + '%';
				_this._drawRect( [startX, startY], 10, 10, _this.color[index%_this.color.length] )	
					 ._text( startX + 12, startY + 8, textString );
				startY += 20;
			});
			return this;
		}
	};
	
	pie.fn.init.prototype = pie.prototype;
})();


//调用的时候就可以这样Pie( wraper, option );
```
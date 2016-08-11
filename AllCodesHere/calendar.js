/*
 * 创建日历组件
 */
;(function(){
	window.calendar = function( wraper ) {
		this.wraper = wraper;
		this._renderCalendar()._renderTitle();
		return this;
	};
	
	calendar.prototype = {
		//当用户点击某一个日期的时候，那么这个日期就会被赋值给userTime
		userTime : new Date(),
		/*
		 * data New Date类型，如果没有的话，就是默认本月份
		 */
		_renderCalendar : function( date ) {
			var now = date || new Date();
			/*
			 * 需要6*7的小表格,不过先将原先的表格去掉先
			 */
			this._removePrevCalendar();
			
			//将日期调至1号
			now.setDate( 1 );
			
			//获取当前月份以及当前月的第一天是在星期几
			var startPos = now.getDay();
			var currentMonth = now.getMonth();
			
			var innerHTML = '';
			for ( var i = 0; i < 6; i++ ) {
				innerHTML += '<ul class="weekBar block">';
				for ( var j = 0; j < 7; j++ ) {
					if ( j < startPos && i === 0 ) {
						//上一月份的日期暂时不着急填补
						innerHTML += '<li class="dark">' +'</li>';
						continue;
					}else if ( now.getMonth() !== currentMonth ) {
						//如果该日期不再属于本月份了，那就将其变成灰色
						innerHTML += '<li class="dark">' + now.getDate() + '</li>';
					} else {
						innerHTML += '<li>' + now.getDate() + '</li>';
					}
					now.setDate( now.getDate() + 1 );
				}
				innerHTML += '</ul>';
			}
			this.wraper.innerHTML += innerHTML;
			
			//现在开始填补上一个月份在本日历中中的日期,先把日期调回本月份
			now.setMonth( now.getMonth() - 1 );
			
			//现在将日期调回本月份的上月份
			now.setDate( 1 );
			now.setDate( now.getDate() - 1 );
			
			//需要填补的li元素
			var needToFill = document.querySelectorAll( '.weekBar' )[1].querySelectorAll( 'li' );
			for ( var i = startPos - 1; i >= 0; i-- ) {
				needToFill[i].innerHTML = now.getDate();
				now.setDate( now.getDate() - 1 );
			}
			now.setMonth( now.getMonth() + 1 )
			this._listenClickBlocks()._changeTime();
			return this;
		},
		_renderTitle : function( now ) {
			now = now || new Date();
			var calendarTitle = document.querySelector( '.calendarTitle span' );
			
			calendarTitle.innerHTML = now.getFullYear()
									  + ' 年 ' + ( 1 + now.getMonth() ) + ' 月  '
									  +  now.getDate();
		},
		
		//将原先的日历表格去掉
		_removePrevCalendar : function() {
			var blocks = document.querySelectorAll( '.block' );
			var lis;
			for ( var i  = 0; i < blocks.length; i++ ) {
				lis = blocks[i].querySelectorAll( 'li' );
				for ( var j = 0; j < lis.length; j++ )
					lis[j].removeEventListener( 'click', this._blockClickEvent );
				this.wraper.removeChild( blocks[i] );
			}
			
			//移除事件
			var changeButton = document.querySelector( '.calendarTitle' ).querySelectorAll( 'button' );
			changeButton[0].removeEventListener( 'click', this._reduceYear );
			changeButton[3].removeEventListener( 'click', this._upYear );
			changeButton[1].removeEventListener( 'click', this._reduceMonth );
			changeButton[2].removeEventListener( 'click', this._upMonth );
		},
		//监听鼠标点击事件
		_changeTime : function() {
			var changeButton = document.querySelector( '.calendarTitle' ).querySelectorAll( 'button' );
			
			changeButton[0].addEventListener( 'click', this._reduceYear.bind( this ) );
			changeButton[3].addEventListener( 'click', this._upYear.bind( this ) );
			changeButton[1].addEventListener( 'click', this._reduceMonth.bind( this ) );
			changeButton[2].addEventListener( 'click', this._upMonth.bind( this ) );
			
			return this;
		},
		//监听当鼠标在日立的具体表格上点击的事件
		_listenClickBlocks : function() {
			var blocks = document.querySelectorAll( '.block li');
			for ( var i = 0, len = blocks.length; i < len; i++ ) {
				if ( !blocks[i].getAttribute( 'class' ) ) {
					blocks[i].addEventListener( 'click', this._blockClickEvent.bind( this ) );
				}
			}
			return this;
		},
		
		//具体的点击执行事件
		_blockClickEvent : function( e ) {
			this.userTime.setDate( parseInt( e.target.innerHTML, 10 ) );
			this._renderTitle( this.userTime );
		},
		_reduceMonth : function() {
			this.userTime.setMonth( this.userTime.getMonth() - 1 );
			this._reRender();
		},
		_upMonth : function() {
			this.userTime.setMonth( this.userTime.getMonth() + 1 );
			this._reRender();
		},
		_reduceYear : function() {
			this.userTime.setYear( this.userTime.getFullYear() - 1 );
			this._reRender();
		},
		_upYear : function() {
			this.userTime.setYear( this.userTime.getFullYear() + 1 );
			this._reRender();
		},
		
		//_reRender为上面几个更新时间的函数服务的
		_reRender : function() {
			this._renderTitle( this.userTime );
			this._renderCalendar( this.userTime );
		},
		
		
		//以下是对外提供的API
		/*
		 * data string 用户传递的字符串
		 * format string 规定的日期格式 yyyy、mm、dd的组合
		 */
		setDate : function( data, format ) {
			var month, day;
			switch( format ) {
				case 'yyyy-mm-dd' :
				case 'yyyy-mm' : 
				case 'mm-dd' :
					this.userTime = new Date( data );
					break;
				case 'yyyy':
					month = this.userTime.getMonth();
					day = this.userTime.getDate();
					this.userTime = new Date( data );
					this.userTime.setMonth( month );
					this.userTime.setDate( day );
					break;
				case 'mm':
					this.userTime.setMonth( parseInt( data, 10 ) - 1 );
					break;
				case 'dd':
					this.userTime.setDate( parseInt( data, 10 ) );
					break;
			}
			
			this._reRender();
		},
		getDate : function() {
			return this.userTime;
		},
		reset : function() {
			this.userTime = new Date();
			this._renderTitle( this.userTime );
			this._renderCalendar( this.userTime );
		}
	}
})();

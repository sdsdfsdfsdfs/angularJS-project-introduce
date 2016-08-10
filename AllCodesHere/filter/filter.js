/*
 * 创建angularJS 中的过滤器
 */
angular.module( 'pageFilter', [] )
	
	/*
	 * 当用户新建问卷的时候，如果对某个元素进行编辑，当该元素失去焦点之后，有可能会出现&nbsp;的字符串
	 * 所以这个过滤器就是将这些字符串去掉的。
	 */
	.filter( 'deleteSpace', function() {
		return function( input ) {
			var pattern = /&nbsp;/ig;
			var input = String( input );
			input = input.replace( pattern, '' );
			return input;
		};
	})

jQuery(function( $ ){
	
	// The default axis is 'y', but in this demo, I want to scroll both
	// You can modify any default like this
	$.localScroll.defaults.axis = 'xy';
	
	// Scroll initially if there's a hash (#something) in the url 
	$.localScroll.hash({
		target: '#main', // Could be a selector or a jQuery object too.
		queue:true,
		duration:1500
	});

	$.localScroll({
		target: '#main', // could be a selector or a jQuery object too.
		queue:true,
		duration:1500,
		hash:true,
		onBefore:function( e, anchor, $target ){
			// The 'this' is the settings object, can be modified
		},
		onAfter:function( anchor, settings ){
			// The 'this' contains the scrolled element (#content)
		}
	});
});

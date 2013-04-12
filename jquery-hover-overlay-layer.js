$(function(){
	$.fn.overLayer = function(options) {

		var settings = $.extend({}, 
			{
				selector: '',
				hoverClass: 'hover'
			}, options
		);

		console.log(settings);

		return this.each(function() {
			console.log($(this));
    	});

    	function reSort(arr, index){

    		var newArr = []
            initialIndex    = index,
            len             = arr.length,
            i               = 0,
            adder           = 1,
            n               = 1;
	        
	        while (i < len) {
	            if(typeof arr[index] === 'undefined')
	                return newArr;     // some

	            newArr[i] = arr[index];

	            index = initialIndex + (adder * n); i += 1; adder = -adder;

	            if(adder < 0)
	                n += 1;
	        }

	        return newArr;

    	}

		

			// get and merge options

			// check if elements exists: NOT - Stop silently to avloid issues on older browsers

			// keep reference to dom elements for improved speed


			// test if element is a link and trigger on click event 

			// allow for costumization of the link url - if a tag than href otherwise use data-href="bla.html"

			// take z-index into condireation


			// test if selector is array or dom element and act accordingly

			/* Option Array 
			selector: $('bottom_layer_objs')
			overlayObj: $('list_of_overlay_objs')
			hoverClass: 'hover'
			



			v2 - add some timedelay to the options in order to control mouse in and out events with more flex




		},


		/* Predictive array sorter */

	}
})(jQuery);
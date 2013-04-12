/* overLayer v0.2 | MIT & BSD
 * Joao C. Ribeiro
 * TODO: Accept selector as input for large objects list and parse everything according to the overlays. This is much more time consuming for the browser so maybe the best solution is to make a run on a dev environment which would output the proper array to the console which could then be copied and hardcoded
 */



(function($) {
    $.fn.overLayer = function(options) {

        var settings = $.extend({}, 
            {
                elementsArr: undefined,
                hoverClass: 'hover',
                mode: 'array',
                link: true           // for greater flexibility we only trigger a click event. this allows for ajax call, popups, etc. just set an click event on each element you desire with your own app logic
            }, options
        );

        console.log(typeof settings.selector);

        return this.each(function() {
            console.log($(this));

            if(typeof settings.selector == 'undefined' && typeof settings.elementsArr == 'undefined')
                return false;

            var baseObj     = settings.elementsArr.slice(0),
                sortedArr   = {},
                found       = {}
                overObj     = $('.'+settings.hoverClass);


            $(this).on('mousemove', function(e){
                found = findObj(settings.elementsArr,e);
                console.log('over');
                console.log(found);
                if(!found){
                    overObj.removeClass(settings.hoverClass);
                    if(settings.link)
                        $('body').css('cursor','auto');
                }
                else{

                    if(found.elem.hasClass(settings.hoverClass))
                        return;

                    $('.hover').removeClass(settings.hoverClass);   // remove the hover class if any obj has it set
                    found.elem.addClass(settings.hoverClass);
                    $('body').css('cursor','pointer');

                    reSort(settings.elementsArr, found.position, baseObj);
                    
                }

            });

            $(this).mouseout(function (){
                $('.hover').removeClass(settings.hoverClass);
            });

            if(settings.link){
                $(this).on('click', function(e){
                    found = findObj(settings.elementsArr,e);

                    if(!found){
                        return;
                    }
                    else{
                  
                        reSort(settings.elementsArr, found.position, baseObj);

                        found.elem.click();;

                    }

                });    
            }
                        
        });

        /* Returns an object with the element position on the array and the object itself or false if no element is found */
        function findObj(arr,e){

            for(var i = 0, size = arr.length ; i < size; i++){
                var curObj  = arr[i],
                    pos     = curObj.offset(),
                    height  = curObj.outerHeight(),
                    width   = curObj.outerWidth(),
                    startX  = pos.left,
                    endX    = startX + width,
                    startY  = pos.top,
                    endY    = startY + height,
                    mouseX  = e.pageX,
                    mouseY  = e.pageY;

                if( mouseX >= startX && mouseX < endX && mouseY >= startY && mouseY < endY) {
                    return {position: i, elem: curObj};
                }
            }
            return false;
        }

        function reSort(arr, index, baseObj){

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

            // if the new received arr length != expected we should put back the original array to avoid code breaks
            if(newArr.length === baseObj.length)
                settings.elementsArr = newArr;
            else
                settings.elementsArr = baseObj;          

        }

    }
})(jQuery);
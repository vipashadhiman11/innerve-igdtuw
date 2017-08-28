/*
	DraggScroll is a JQuery extension for scrolling by clicking and dragging from within a container.
	Author: James Climer (http://climers.com)
	Released under the Apache V2 License: http://www.apache.org/licenses/LICENSE-2.0.html
	Requires JQuery: http://jquery.com
	Get latest version from: https://github.com/jaclimer/JQuery-DraggScroll

    options: Currently not used
*/
(function ($) {
    $.fn.dragScroll = function (options) {
        /* Mouse dragg scroll */
        var x, y, top, left = 0, lastLeft = 0, down, direction;
        var $scrollArea = $(this);

        $($scrollArea).attr("onselectstart", "return false;");   // Disable text selection in IE8

        $($scrollArea).mousedown(function (e) {
            if(typeof options.limitTo == "object") {
                for(var i = 0; i < options.limitTo.length; i++) {
                    if($(e.target).hasClass(options.limitTo[i])) {
                        doMousedown(e);
                    }
                }
            } else {
                doMousedown(e);
            }
        });
        $($scrollArea).mouseleave(function (e) {
            down = false;
        });
        $("body").mousemove(function (e) {
            if (down) {
                var newX = e.pageX;
                var newY = e.pageY;
                var leftDrag = left - newX + x;

                if(lastLeft>0){
                    left = lastLeft;
                }else{
                    left = 1;
                }
                if(left > 20)
                $($scrollArea).scrollTop(top - newY + y);
                $($scrollArea).scrollLeft(leftDrag);

            }
        });
        $scrollArea.mouseup(function (e) {
            if(lastLeft < $scrollArea.scrollLeft()){
                if($scrollArea.scrollLeft()-lastLeft>0){
                    lastLeft = $scrollArea.scrollLeft() + 150;
                    $scrollArea.animate({scrollLeft: lastLeft},300,"easeOutCubic");
                    down = false;
                    setTimeout(function(){
                        lastLeft = $scrollArea.scrollLeft();
                    },800);
                }else{
                    lastLeft = $scrollArea.scrollLeft();
                    down = false;
                }
            }else{
                if(lastLeft-$scrollArea.scrollLeft()>0){
                    lastLeft = $scrollArea.scrollLeft() -150;
                    $scrollArea.animate({scrollLeft: lastLeft},300,"easeOutCubic");
                    down = false;
                    setTimeout(function(){
                        lastLeft = $scrollArea.scrollLeft();

                    },800);
                }else{
                    lastLeft = $scrollArea.scrollLeft();
                    down = false;
                }

            }
        });

        $scrollArea.next().mouseup(function (e) {
            if(lastLeft < $scrollArea.scrollLeft()){
                lastLeft = $scrollArea.scrollLeft() + 150;
                $scrollArea.animate({scrollLeft: lastLeft},300,"easeOutCubic");
                down = false;
                setTimeout(function(){
                    lastLeft = $scrollArea.scrollLeft();
                },800);
            }else{
                lastLeft = $scrollArea.scrollLeft() -150;
                $scrollArea.animate({scrollLeft: lastLeft},300,"easeOutCubic");
                down = false;
                setTimeout(function(){
                    lastLeft = $scrollArea.scrollLeft();

                },800);
            }
        });

        function doMousedown(e) {
            e.preventDefault();
            down = true;
            x = e.pageX;
            y = e.pageY;
            top = $(this).scrollTop();
            if(!left)
            left = $(this).scrollLeft();
            else
            left = lastLeft;

        }
    };
})(jQuery);

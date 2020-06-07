$(function() {
    // alert(1);
    var flag = true;
    var toolTop = $(".recom").offset().top;

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }

    // alert(toolTop);
    $(window).scroll(function() {
        toggleTool();

        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // alert(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }

    });
    // 点击导航页面可以滚动到相应位置
    $(".fixedtool li").click(function() {
        flag = false;
        // alert($(this).index());
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass("current");
    })

})
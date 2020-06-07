window.addEventListener('load', function() {
    // 1、获取元素
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var flag = false;
    // 获取focus的宽度
    var w = focus.offsetWidth;
    // 2、利用定时器自动轮播图片
    var index = 0
    var timer = setInterval(function() {
        index++;
        var translateX = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    // 等过渡完成后，再去判断监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 取出过渡 这样ul才能快速跳到第一张图
            ul.style.transition = 'none';
            // 然后再用最新的index计算ul运动距离
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            // 然后再用最新的index计算ul运动距离
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }

        // 3、小圆点跟随变化效果制作
        // 把ol里面带有current类名的选出来去掉类名 remove
        ol.querySelector('li.current').classList.remove('current');
        // 让当前索引号的li 加上current 类名 add
        ol.children[index].classList.add('current');
    });
    // 4、手指滑动轮播图
    // 触摸元素touchStart; 获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 触摸时停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove；计算手指滑动距离，并移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 计算手指移动位置
        moveX = e.targetTouches[0].pageX - startX;
        // 盒子移动距离 = 盒子初始位置 + 手指移动距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候，不需要动画，所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault(); // 阻住默认滚动屏幕的行为
    });
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // 移动距离大于50px，则切换图片
            if (Math.abs(moveX) > 50) {
                // 往右滑动，则是播放上一张 moveX 为正
                if (moveX > 0) {
                    index--;
                } else {
                    // 往左滑动，则是播放下一张 moveX 为负
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translatex(' + translatex + 'px)';
            } else {
                // 移动距离小于了50px，则回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translatex(' + translatex + 'px)';
            }
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }, 2000);
        }
    });
    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})
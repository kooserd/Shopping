window.addEventListener('load', function() {
    clearInterval(timer);
    // 1、获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    // 2、鼠标经过显示隐藏按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    });

    // 3、动态生成小圆圈
    var ul = this.document.querySelector('.bgc');
    var ol = this.document.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把li插入到ol里面
        ol.appendChild(li);
        // 4、小圆圈排他思想 直接在生成的小圆圈的同时绑定事件
        li.addEventListener('click', function() {
            // 1)清除所有人的属性 把所有li都清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 2)留下自己属性 当前li 设置current类名
            this.className = 'current';
            // 3)点击小圆圈移动图片，移动的是ul
            // ul的移动距离 = 小圆圈的索引号 * 图片的宽度 ， 最后值要为负值
            // 点击某个li 就得到当前li的index属性
            var index = this.getAttribute('index');
            //点击了li就把这个li的索引给num
            num = index;
            //点击了li就把这个li的索引给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // ol里的第一个小li设置类名current
    ol.children[0].className = 'current';
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 控制小圆圈的播放
    var circle = 0;
    var flag = true;
    // 5、点击右侧按钮，图片滚动一张

    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false; //关闭节流阀
                // 如果走到最后一张复制 的图片，则不做动画立马跳到第一张
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 6、点击右侧按钮，小圆圈一起跟着变化，可在声明一个变量控制小圆圈播放
                circle++;
                // 如果circle == ol.children.length 说明已经走到最后一张克隆出来的图片了，则circle = 0；
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 清除其余小圆圈的current类名
                circleChange();
            }

        })
        // 7、左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到最后一张复制 的图片，则不做动画立马跳到第一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 6、点击右侧按钮，小圆圈一起跟着变化，可在声明一个变量控制小圆圈播放
            circle--;
            // 如果circle < 0 说明已经走到最后一张克隆出来的图片了，则circle = 0；
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })

    function circleChange() {
        // 清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 8、定时器，自动播放
    var timer = setInterval(function() {
        arrow_r.click();
    }, 3000)

})
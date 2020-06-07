var div = document.querySelector('div');
var btn500 = document.querySelector('.move500');
var btn800 = document.querySelector('.move800');
// 获取div在页面中的位置
// console.log(div.offsetLeft);

function animate(obj, target, callBack) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写在定时器中
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {
            // 停止动画的本质就是清楚定时器
            clearInterval(obj.timer);
            // 回调函数写定时器里
            // if (callBack) {
            //     callBack();
            // }
            callBack && callBack();
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}
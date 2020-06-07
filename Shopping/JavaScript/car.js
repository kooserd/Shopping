$(function() {
    // 1、全选 全不选功能模块
    // 原理把全选按钮(checkall)的状态赋值给 三个小按钮(j-checkbox)就可以了
    // 使用change事件
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 2、如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则不全选
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3、点击加号或减号进行添加和删减商品数量
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块 = 数量 * 单价
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        // $(this).parent().parent().siblings(".p-sum").html("￥" + n * p).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 计算小计模块 = 数量 * 单价
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        // $(this).parent().parent().siblings(".p-sum").html("￥" + n * p).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });

    // 4、用户手动修改数量值 
    $(".itxt").change(function() {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();

    })
    getSum();
    // 5、总计和总和
    function getSum() {
        var count = 0; // 总件数
        var money = 0; // 总价格
        $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-num").find(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text(" ￥ " + money.toFixed(2));
    }

    // 6、删除商品模块
    // 1)、商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum()
    });
    // 2)、删除选中的按钮
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum()
    });
    // 3)、清空购物车 删除所有商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum()
    });

    // 7、选中商品变色
    // $(".j-checkbox:checked").parents(".cart-item").css("background", "#fff4e8")

})
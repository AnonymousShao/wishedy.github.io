/**
 * Created by 萤火虫 on 2016/8/13.
 */
$(document).ready(function(){
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        pagination : '.swiper-pagination',
        loop : true,
        speed:1000,
        touchRatio :1,
        followFinger : true,
        shortSwipes : true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }/**/
    })
    var theSwiper = new Swiper('.inner-swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        loop : true,
        speed:1000,
        touchRatio :1,
        followFinger : true,
        shortSwipes : true,
    })
    var APP_ID = 'UxhULwvl8kpMusv1XP3EQ60b-gzGzoHsz';

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = 'Qk2lIxE8nUMmAi4j6hJ0LgP2';

// 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    function saveData(saveStr){
        var TestObject = AV.Object.extend('TestObject');
        var testObject = new TestObject();
        testObject.save({
            testabc: saveStr,
        }).then(function() {
            alert("感谢您的留言，我将在最短的时间内回复您！");
            $("#your-name").val("");
            $("#email").val("");
            $("#your-subject").val("");
            $("#message").val("");
        }).catch(function(err) {
            alert('error:' + err);
        });
    }
    $(".submit").click(function(){
        var str = '';
        str = "用户名"+$("#your-name").val()+"电子邮箱"+$("#email").val()+"主题"+$("#your-subject").val()+"内容"+$("#message").val();
        saveData(str);
    });
    return false;
});

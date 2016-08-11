/**
 * Created by Administrator on 2016/7/29.
 */
$(document).ready(function(){
    console.log("hello world");
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,//可选选项，自动滑动
        effect : 'fade',
        speed:2000,
        pagination : '.swiper-pagination',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }/**/

    });
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
            $(".window").show(800);
            $(".nopro").click(function(){
                $(".window").hide(300);
                $(".swiper-slide-active .inner-mess").each(function(i){
                    $(this).val("");
                });
            });
            $(".noque").click(function(){
                $(".window").hide(300);
                $(".swiper-slide-active .inner-mess").each(function(i){
                    $(this).val("");
                });
            });
        }).catch(function(err) {
            alert('error:' + err);
        });
    }
    $(".submit").click(function(){
        var str = '';
        $(".swiper-slide-active .inner-mess").each(function(){
            str+= $(this).attr("placeholder")+$(this).val();

        });
        saveData(str);
        });
    console.log($(".out-slide2 .scan"))
    function scan(){
        var img = ["images/play1.png","images/play2.png","images/play3.png","images/play4.png","images/play5.png","images/play6.png"];
        $(".out-slide2 .scan").each(function(i){
            $(this).click(function(){
                console.log(i)
                console.log($(".canvas img"))
                $(".canvas img").attr({
                    "src":img[i]
                });
                $(".canvas").animate({
                    "left":"60%",
                },2000);
                $(".picok").click(function(){
                    $(".canvas").animate({
                        "left":"100%",
                    },1000);
                })
            })
        });
    }
    scan();
    var skillSwiper = new Swiper(".skill-swiper-container",{
        autoplay: 3000,//可选选项，自动滑动
        pagination : '.swiper-pagination',
        slideToClickedSlide:true,
        paginationClickable :true,
        speed:2000,
        onSlideChangeEnd: function(swiper){
            if(outmySwiper.activeIndex==1){
                animateInit($(".skill-swiper-container .swiper-wrapper .skilllist").eq(skillSwiper.activeIndex));
            }

        }
    })
    var outmySwiper = new Swiper('#out-container', {
        direction : 'vertical',
        speed:1000,
        mousewheelControl : true,
        scrollbar:'.swiper-scrollbar',
        scrollbarHide:false,
        scrollbarDraggable : true ,
        keyboardControl : true,
        paginationType : 'bullets',
        pagination : '.navlist',
        paginationElement : 'span',
        bulletClass : 'my-bullet',
        bulletActiveClass : 'my-bullet-active',
        followFinger : true,
        shortSwipes : true,
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            var navlist = ["Home","About Me","H5 Demo","PORTFOLIO"];
            return '<span class="' + className + '">' + navlist[index] + '</span>';
        },
        freeMode : false,
        onSlideChangeStart: function(swiper){
            $("#navcontainer").css({
                "display":"none",
            });
        },
        onSlideChangeEnd: function(swiper){
            $("#navcontainer").css({
                "display":"block",
            });
            if(outmySwiper.activeIndex!=1){
                animateInit($("#out-container #out-wrapper .out-slide").eq(outmySwiper.activeIndex));
            }

        }

    });
    function setTransition(animateObj){
        var animateTime = animateObj.attr('set-during-time');
        var animateFunc = animateObj.attr('set-func');
        var animateDelay =animateObj.attr('set-delay');

        return "all "+animateTime+"ms "+animateFunc+" "+animateDelay+"ms";
    }
    function setTransform(animateObj){
        var transform = (animateObj.attr("set-tran"))?true:false;
        if(transform){
            return animateObj.attr("set-tran");
        }else{
            return '';
        }
    }
    function setAnimation(animateObj){
        var animation = (animateObj.attr("set-animate"))?true:false;
        if(animation){
            return animateObj.attr("set-animate");
        }else{
            return '';
        }
    }
    function animateInit(whichSlide){
        var animateInit = (whichSlide.attr("init-animate"))?false:true;
        if(animateInit){
            whichSlide.attr({
                "init-animate":"had",
            });
            var animateAobj = whichSlide.find(".animate-active");
            animateAobj.each(function(){
                $(this).css({
                    "transition":setTransition($(this)),
                    "transform":setTransform($(this)),
                    "animation":setAnimation($(this)),
                });
            });
        }else{
            return ;
        }
    };
    animateInit();

});

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

    })
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

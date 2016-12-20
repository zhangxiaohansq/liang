/**
 * Created by dell on 2016/12/2.
 */
(function (win,doc) {
    function change(){
        doc.documentElement.style.fontSize = 50*doc.documentElement.clientWidth/750+'px';
    }
    change();
    win.addEventListener('resize',change,false);
})(window,document);

document.addEventListener('DOMContentLoaded',function(){
    $('#btn').click(function(){
        $('#menu').css('display','block');
    });

    $('#menu li').click(function(){
        $('#menu').css('display','none');

    });
    var oNav=document.getElementById('nav');
    var aLi=oNav.children;
    var oDiv=document.getElementById('jianjie');
    var aDiv=oDiv.children;
    var aswiper = new Swiper('.swiper-container', {

        onSlideChangeEnd: function(swiper){
            for(var i=0;i<aLi.length;i++){
                aLi[i].className='';
            }
            aLi[swiper.activeIndex].className='active cur';
        }
    });
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].className='';
            }
            this.className='active cur';
            aswiper.slideTo(this.index, 1000, false);
        };
    }
},false);
(function(win,doc){
    function change() {
        doc.documentElement.style.fontSize = 50*doc.documentElement.clientWidth/750+'px';
    }
    change();
    win.addEventListener('resize',change,false);
})(window,document);
$(function(){
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,scrollbar:'.swiper-scrollbar'
    });

    $('#btn').click(function(){
    	$('#menu').css('display','block');
    });

    $('#menu li').click(function(){
    	$('#menu').css('display','none');

    });

    var map = new BMap.Map("map");    // 创建Map实例
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别

    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.disableDragging();     //禁止拖拽
});

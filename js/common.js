// JavaScript Document

'use strict'

//随机函数m到n之间不包括n---------------------[m,n);
	function rnd(m,n){
		return parseInt(Math.random()*(n-m)+m);
	}

//在长度为n的数组中找重复数是否存在--------(arr,n,value);
	function findInArray(arr,value){
		for(var i=0;i<arr.length; i++){
			if(value == arr[i]){
				return true;
			}
		}
		return false;
	}
	
//把一个一位的整数变成两位数--------(value);
	function toDou(value){
		return value<10 ? '0'+value : ''+value;
	}
	
//取行间样式（兼容各个浏览器）-------(obj,name);
	function getStyle(obj,name){
		return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj,false)[name];
	}
	
//通过className获取元素
	function getByClass(obj,value){
		if(obj.getElementsByClassName){    //高级浏览器支持getElementsByClassName；
			return obj.getElementsByClassName(value);
		}else{                                      //兼容低版本IE；
			var arr = [];
			var aElt = obj.getElementsByTagName('*');
			for(var i=0; i<aElt.length; i++){
				var arr1 = aElt[i].className.split(' ');
				if(findInArray(arr1,value)){
					arr.push(aElt[i]);
				}
			}
			return arr;
		}
	}
	
//获取某种编码方式下的字符串长度
	function getLengthByType(str,type){
		var oResult = 0;
		for(var i=0; i<str.length; i++){
			//比较字符串中是否出现汉字
			if(str.charAt(i) < '\u4e00' || str.charAt(i) > '\u9f5a'){
				oResult++;
			}else{
				//编码不一样，字符的长度不同
				if(type == 'gb2312' || type == 'gbk'){
					oResult += 2;
				}else{
					oResult += 3;
				}
			}
		}
		return oResult;
	}
	
//获取定位元素至左边框或上边框就绝对距离;
	function getPos(obj){
		var l = 0;
		var t = 0;
		while(obj){
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {'left':l,'top':t}   //以json的形式返回;
	}
		
	
// 获取物体坐标
	function getCoPos(ev){
		var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		return {'x':oEvent.clientX + scrollL,'y':oEvent.clientY + scrollT} 
	}
	
//事件绑定
	function addEvent(obj,sEv,fn){
		if(obj.addEventListener){ // addEventListener(在高级浏览器下使用其中：事件不加‘on’)
			obj.addEventListener(sEv,fn,false);
		}else{
			obj.attachEvent('on'+sEv,fn);   // attachEvent(iE8-使用，事件必须加‘on’)
		}
	}

//事件解除绑定    
	function removeEvent(obj,sEv,fn){    
		if(obj.removeEventListener){ //事件解除绑定（高级浏览器使用‘remove’）
			obj.removeEventListener(sEv,fn,false);
		}else{
			obj.detachEvent('on'+sEv,fn);   //事件解除绑定（IE8-使用‘detach’）
		}
	}
	
//鼠标滚轮
	function addWheel(obj,fn){
		/*if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			addEvent(obj,'DOMMouseScroll',wheel);
		}else{
			addEvent(obj,'mousewheel',wheel);
		}*/
		if(obj.onmousewheel === null){
			addEvent(obj,'mousewheel',wheel);
		}else{
			addEvent(obj,'DOMMouseScroll',wheel);
		}
		/*function addEvent(obj,sEv,fn){
			if(obj.addEventListener){
				obj.addEventListener(sEv,fn,false);
			}else{
				attachEvent('on'+sEv,fn);
			}
		}*/
		function wheel(ev){
			var oEvent = ev || event;
			var bDown = oEvent.wheelDelta ? oEvent.wheelDelta<0 : oEvent.detail>0;
			fn && fn(bDown);
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		}
	}
	
//domReady
	function domReady(fn){
		if(document.addEventListener){   //高级浏览器支持
			document.addEventListener('DOMContentLoaded',function(){
				fn && fn();
			},false)
		}else{                    //低级浏览器支持
			document.onreadystatechange = function(){
				if(document.readyState == 'complete'){
					fn && fn();
				}
			};
		}
	}
	
//  碰撞检测
	function collTest(obj1,obj2){
		var l1 = getPos(obj2).left - obj1.offsetWidth;
		var l2 = getPos(obj2).left + obj2.offsetWidth;
		var t1 = getPos(obj2).top - obj1.offsetHeight;
		var t2 = getPos(obj2).top + obj2.offsetHeight;
		var l = getPos(obj1).left;
		var t = getPos(obj1).top;
		if(l>l1&&l<l2&&t>t1&&t<t2){
			return true;
		}else{
			return false;
		}
	}

//   运动框架
	function move(obj,json,option){
		clearInterval(obj.timer);
		var option = option || {};
		var duration = option.duration || 1000;
		var easing = option.easing || 'linear';
		var start = {};
		var dis = {};
		for(var name in json){
			if(name == 'opacity'){
				start[name] = Math.round(parseFloat(getStyle(obj,name))*100);
			}else{
				start[name] = parseInt(getStyle(obj,name));
			}
			dis[name] = json[name] - start[name];
		}
		var count = Math.floor(duration/30);
		var n = 0;
		obj.timer = setInterval(function(){
			n++;
			for(var name in json){
				var current = start[name] + n*dis[name] / count;
				switch(easing){
					case 'linear':
						var a = n/count;
						var current = start[name] + dis[name]*a;
						break;
					case 'easeIn':
						var a = n/count;
						var current = start[name] + dis[name]*Math.pow(a,3);
						break;
					case 'easeOut':
						var a = 1 - n/count;
						var current = start[name] + dis[name]*(1 - Math.pow(a,3));
						break;
				}
				if(name == 'opacity'){
					obj.style.opacity = current/100;
					obj.style.filter = 'alpha(opacity:'+current+')';
				}else{
					obj.style[name] =current + 'px';
				}
			}
			if(n == count){
				clearInterval(obj.timer);
				option.complete && option.complete();
			}
		},30);
	}
	
//  获取child
	function getChild(obj){
		var firstChild = obj.firstElementChild || obj.firstChild;
		var lastChild = obj.lastElementChild || obj.lastChild;
		return {first:firstChild,last:lastChild};
	}
	
// 获取sibling
	function getSibling(obj){
		var n = obj.nextElementSibling || obj.nextSibling;
		var p = obj.previousElementSibling || obj.previousSibling;
		return {next:n,prev:p};
	}
//  实时获取文本框中输入的字符个数
	function getTextLength(obj){
		if(navigator.userAgent.indexOf('MSIE 9.0') != -1){
			var timer = null;
			obj.onfocus = function(){
				timer = setInterval(function(){
					return obj.value.length;
				},100);
			};
			oT.onblur = function(){
				clearInterval(timer);
			};
		}else{
			obj.oninput = obj.onpropertychange= function(){
				return obj.value.length;
			};
		}
	}
	
	
	
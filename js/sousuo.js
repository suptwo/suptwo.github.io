(function(){
	var oIframe=document.querySelector('iframe');
	var oBoxSection=document.querySelector('.sousuobox');
	var oLog=document.querySelector('.sousuolog');
	var ojsclose=document.querySelector('.js-close');
	var iNow=-1;
	var oldValue='';
	oLog.bClick=true;
	var oT=document.querySelector('.sousuotxt1');
	var oUl=document.querySelector('.sousuosearchlist');
	var oBtn=document.querySelector('.sousuosearchBtn');
	oUl.dis=false;
	ojsclose.addEventListener('touchstart',addTouch,false);
	ojsclose.clickFn=function(ev){
		oBoxSection.style.display='block';
		oIframe.style.display='none';
		ev.cancelBubble=true;
	}
	oT.addEventListener('change',function(ev){
		if(oUl.dis){
			oUl.style.display='block';
		}
		var url='';
		var json={};
		var cbName='';
		if(oLog.children[1].className=='q360'){
			url='http://sug.so.360.cn/suggest';
			cbName='callback';
			json={
				'word':oT.value,
			}
			}else{
				cbName:'cb';
				url='http://suggestion.baidu.com/su';
				json={
					wd:oT.value,
				}
			}
		jsonp2({
			url:url,
			data:json,
			cbName:cbName,
			success:function(json){
				var arr=json.s;
				oUl.innerHTML='';
				for(var i=0; i<arr.length; i++){
					var oLi=document.createElement('li');
					oLi.innerHTML=arr[i];
					oUl.appendChild(oLi);
				}
			}	
		});
		oUl.addEventListener('touchstart',addTouch,false)
		oUl.clickFn=function(ev){
			var oSrc=ev.srcElement;
			if(oSrc.tagName=='LI'){
				oT.value=oSrc.innerHTML;
				oUl.style.display='none';
				oUl.innerHTML='';
				oUl.dis=true;
				if(oLog.children[1].className=='q360'){
					oIframe.src='http://www.haosou.com/s?q='+oT.value;
					
				}else{
					oIframe.src='http://www.baidu.com/s?wd='+oT.value;
				}
				oBoxSection.style.display='none';
				oIframe.style.display='block';
			}
			ev.preventDefault();
			ev.cancelBubble=true;
		}
		oldValue=oT.value;
	},false);
	//触发搜索事件
	oBtn.addEventListener('touchstart',addTouch,false)
	oBtn.clickFn=function(ev){
		if(oLog.children[1].className=='q360'){
			oIframe.src='http://www.haosou.com/s?q='+oT.value;
			
		}else{
			oIframe.src='http://www.baidu.com/s?wd='+oT.value;
		}
		oBoxSection.style.display='none';
		oIframe.style.display='block';	
		ev.preventDefault();
		ev.cancelBubble=true;
	};
	//搜索引擎切换
	oLog.children[1].addEventListener('touchstart',addTouch,false)
	oLog.children[1].clickFn=function(ev){
		var _this=this;
		if(oLog.bClick){
			oLog.children[2].style.display='block';
			for(var i=0;i<oLog.children[2].children.length;i++){
				oLog.children[2].children[i].addEventListener('touchstart',addTouch,false)
				oLog.children[2].children[i].clickFn=function(ev){
					var oEvent=ev||event;
					oLog.bClick=true;
					oLog.children[2].style.display='none';
					_this.className=this.className;
					this.onclick=null;
					ev.preventDefault();
					ev.cancelBubble=true;
				};
			}
		}else{
			oLog.children[2].style.display='none';
		}
		oLog.bClick=!oLog.bClick;
		ev.cancelBubble=true;
	};
	function jsonp2(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	var fnName='jsonp'+Math.random();
	fnName=fnName.replace('.','');	
	window[fnName]=function(data){
		json.success && json.success(data);
		oHead.removeChild(oS);
	};
	json.data[json.cbName]=fnName;
	
	var arr=[];
	for(var name in json.data){
		arr.push(name+'='+json.data[name]);
	}
	var oS=document.createElement('script');
	oS.src=json.url+'?'+arr.join('&');
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}

})();


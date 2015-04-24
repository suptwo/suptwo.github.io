(function(){
	var oLog=document.querySelector('.sousuolog');
	oLog.bClick=true;
	var oT=document.querySelector('.sousuotxt1');
	var oUl=document.querySelector('.sousuosearchlist');
	var oBtn=document.querySelector('.sousuosearchBtn');
	var oIframe=document.querySelector('iframe');
	oUl.dis=false;
	oIframe.style.height=window.innerHeight+'px';
	oT.focus();
	oT.addEventListener('input',function(ev){
		if(oUl.dis){
			oUl.style.display='block';
		}
		var url='';
		var json={};
		var cbName='';
		if(oLog.children[1].className=='sousuoq360'){
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
		jsonp({
			url:url,
			data:json,
			cbName:cbName,
			success:function(json){
				var arr=json.s;
				oUl.innerHTML='';
				for(var i=0; i<arr.length; i++){
					var oLi=document.createElement('li');
					oLi.innerHTML=arr[i];
					oUl.appendChild(oLi);;
				}
				//加事件
				oUl.addEventListener('touchstart',addTouch,false);
				oUl.clickFn=function(ev){
					var oSrc=ev.srcElement||ev.target;
					if(oSrc.tagName=='LI'){
						oT.value=oSrc.innerHTML;
						oUl.style.display='none';
						oUl.innerHTML='';
						oUl.dis=true;
						oUl.clickFn=null;
					}
				}
			}	
		});
	},false);	
	//触发搜索事件
	oBtn.addEventListener('touchstart',addTouch,false);
	oBtn.clickFn=function(ev){
		oIframe.style.display='block';
		oLog.parentNode.style.display='none';
		if(oLog.children[1].className=='sousuoq360'){
			oIframe.src='http://www.haosou.com/s?q='+oT.value;
		}else{
			oIframe.src='http://www.baidu.com/s?wd='+oT.value;
		}	
	}
	//搜索引擎切换
	oLog.children[1].addEventListener('touchstart',addTouch,false);
	oLog.children[1].clickFn=function(){
		var _this=this;
		if(oLog.bClick){
			oLog.children[2].style.display='block';
			for(var i=0;i<oLog.children[2].children.length;i++){
				oLog.children[2].children[i].addEventListener('touchstart',addTouch,false);
				oLog.children[2].children[i].clickFn=function(){
					oLog.bClick=true;
					oLog.children[2].style.display='none';
					_this.className=this.className;
					this.clickFn=null;
				};
			}
		}else{
			oLog.children[2].style.display='none';
		}
		oLog.bClick=!oLog.bClick;
	}
})();

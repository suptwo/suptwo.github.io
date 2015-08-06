(function(){
	var oBox=document.getElementById('clickBox');
	var oH=document.querySelector('.hour');
	var oM=document.querySelector('.min');
	var oS=document.querySelector('.sec');
	
	//生成刻度
	var N=60;
	for(var i=0; i<N; i++){
		var oSpan=document.createElement('span');
		
		if(i%5==0){
			oSpan.className='bs';
			var num=i/5==0?12:i/5;
			oSpan.innerHTML='<em>'+num+'<\/em>';
			oSpan.children[0].style.webkitTransform='rotate('+-i*6+'deg)';
		}else{
			oSpan.className='scale';	
		}
		
		oBox.appendChild(oSpan);
		
		oSpan.style.webkitTransform='rotate('+6*i+'deg)';
	}
	
	function clock(){
		var oDate=new Date();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var ms=oDate.getMilliseconds();
		
		oH.style.webkitTransform='rotate('+(h*30+m/60*30)+'deg)';
		oM.style.webkitTransform='rotate('+(m*6+s/60*6)+'deg)';
		oS.style.webkitTransform='rotate('+(s*6+ms/1000*6)+'deg)';	
	}
	clock();
	setInterval(clock,30);
})();
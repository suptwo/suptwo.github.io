(function(){
	var arr=['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
	
	var oDiv=document.getElementById('div11');
	var oHour=oDiv.getElementsByClassName('hour')[0];
	var oMin=oDiv.getElementsByClassName('min')[0];
	var oSec=oDiv.getElementsByClassName('sec')[0];
	
	//走
	function tick()
	{
		var oDate=new Date();
		
		oHour.style.WebkitTransform='rotate('+30*(oDate.getHours()+oDate.getMinutes()/60)+'deg)';
		oMin.style.WebkitTransform='rotate('+6*(oDate.getMinutes()+oDate.getSeconds()/60)+'deg)';
		oSec.style.WebkitTransform='rotate('+6*oDate.getSeconds()+'deg)';
	}
	setInterval(tick, 1000);
	tick();
	
	//生成刻度
	for(var i=0;i<60;i++)
	{
		var oS=document.createElement('span');
		
		if(i%5)
		{
			oS.className='scaler';
		}
		else
		{
			oS.className='big_scaler';
			oS.innerHTML='<em>'+arr[i/5]+'<\/em>';
			oS.children[0].style.WebkitTransform='rotate('+-6*i+'deg)';
		}
		
		oS.style.WebkitTransform='rotate('+6*i+'deg)';
		oDiv.appendChild(oS);
	}
})();
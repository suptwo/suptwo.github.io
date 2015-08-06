// JavaScript Document
(function(){
	alert("携程在手，说没就没");
	alert("由于没开发完，暂由此内容填充");
    var oBanner=document.getElementById('banner');
    var oUl=oBanner.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oOl=oBanner.getElementsByTagName('ol')[0];
    var aLi2=oOl.getElementsByTagName('li');
    var num=0;
    var timer=null;
   
    for(var i=0; i<aLi.length; i++){
        aLi[i].index=i;
        aLi[i].addEventListener('touchmove',function(){
            for(var j=0; j<aLi.length; j++){
                aLi2[j].className='';
                aLi[j].className='';
            }
            num=this.index+1;
            if(num>3){
                num=0;
            }
            aLi[num].className='active';
            aLi2[num].className='active';
        },false)
    }

    autoPlay();
    function autoPlay(){
		clearInterval(timer);	
		timer=setInterval(function(){	
			num++;
			if(num==aLi.length){	
				num=0;
			}
			 for(var j=0; j<aLi.length; j++){
                aLi2[j].className='';
                aLi[j].className='';
            }
            aLi[num].className='active';
            aLi2[num].className='active';
		},2500)
	}

    oBanner.addEventListener('touchstart',function(){
        clearInterval(timer);
    },false);

    oBanner.addEventListener('touchend',function(){
        autoPlay();
    },false);

})();   
   
    
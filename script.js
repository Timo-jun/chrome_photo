window.onload = function(){
    if(document.body.clientHeight<800 || document.body.clientWidth<1000){
        return
    }
    console.log('加载了photo')
	var a =document.createElement('div');
    var b = document.createElement('img')
    a.setAttribute("style","width:100px;height:100px;position:fixed;bottom:10px;right:10px");
    a.style.zIndex = 9999999999
    b.id = 'Diyphoto'
    b.style.opacity = 1
    b.onmouseenter  =function(){
        // b.style.opacity = 0
        imgX = b.x - 10
        imgY = b.y - 10
        a.style.display = 'none'
        // a.style.opacity = '0'
        // console.log('11111')
        //2222
        //33333
        document.body.onmousemove = function(e){
            // console.log(e.clientY,imgY)
            // console.log(e.clientX,imgX)
            if(e.clientY>imgY && e.clientX > imgX){
                return;
            }
            else{
                a.style.display = 'block'
                document.body.onmousemove = null
            }
    }
 

    }

    chrome.runtime.sendMessage('nehabjkbcniedcppebbiejlpnhpdnmjc',{qq:'hello'},function(response){
        // console.log('qqqq')
        // console.log(response)
        if(response.farewell != undefined){
            b.src = response.farewell
            b.style.maxWidth='100px'
            a.appendChild(b)
            document.body.appendChild(a)
            var astyle = ''
            var bstyle = ''
            divPro = ['width','height','top','bottom','left','right']
            for(let key in response.pro){
                if(divPro.includes(key)){
                    astyle = astyle + key + ':' + response.pro[key] + ';'
                }
                else{
                    bstyle = bstyle + key + ':' + response.pro[key] + ';'               
                }
            }
            astyle = astyle + 'position:fixed;'+'z-index:999999999999;'
            a.setAttribute('style',astyle)
            b.setAttribute('style',bstyle)
        }
    });    
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    b = document.getElementById('Diyphoto')
    a = b.parentNode
    // console.log(request)
    b.src = request.farewell
    var astyle = ''
    var bstyle = ''
    divPro = ['width','height','top','bottom','left','right']
    for(let key in request.pro){
        if(divPro.includes(key)){
            astyle = astyle + key + ':' + request.pro[key] + ';'
        }
        else{
            bstyle = bstyle + key + ':' + request.pro[key] + ';'               
        }
    }
    astyle = astyle + 'position:fixed;'+'z-index:999999999999;'
    b.style.maxWidth='100px'
    a.setAttribute('style',astyle)
    b.setAttribute('style',bstyle)
})















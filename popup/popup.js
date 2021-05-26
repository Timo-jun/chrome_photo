window.onload = function(){
    chrome.storage.local.get(['result','aa','qrcode'],function(result){
        for(let key in result.result){
            create_input(key,result.result[key])
        }
        if(result.aa != undefined){
            preImg(result.aa)
        }
        var a = $('#code')
        console.log(result)
        if(result.qrcode == undefined || result.qrcode == ""){
            var qrcode = new QRCode(a[0], {
                text: "http://www.runoob.com",
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }else{
            var qrcode = new QRCode(a[0], {
                text: result.qrcode,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
        window.qrcode = qrcode
    })
}

$('#file').change(function(e){
    var reads = new FileReader()
    f = document.getElementById('file')
    reads.readAsDataURL(f.files[0]);
    reads.onload =function(e){
        var bas = this.result
        preImg(bas)
        // chrome.storage.local.set({aa : bas},function(){console.log('successful')})
    }

})


function preImg(bas){
    var a = $('#photo')[0]
    a.setAttribute('src',bas)
    a.onload = function(){
        var nh = a.naturalHeight
        var nw = a.naturalWidth
        if (nh > nw){
        newH =  parseInt(nw*100/nh)
        a.width = newH;
        a.height = 100
        } 
        else{
          newW = parseInt(nh*100/nw)
          a.height = newW;
          a.width = 100
        }
    }
}


$('#addop').click(function(){
    create_input()
})

function create_input(pro=null,prov=null){
    var a = document.createElement('input')
    var b = document.createElement('input')
    var c = document.createElement('div')
    a.setAttribute("style","display: inline-block;width:70px;")
    b.setAttribute("style","display: inline-block;width:100px")
    if(pro == null){
        a.setAttribute("placeholder","样式属性")
        b.setAttribute("placeholder","对应属性的值")
    }
    else{
        $(a).val(pro)
        $(b).val(prov)
    }
    c.append(a)
    $(c).append("<span>:</span>")
    c.append(b)
    $(c).append("<div style='cursor:pointer;display:inline-block;vertical-align:middle'><img class='delete' src='../images/delete.png'></div>")
    $('#option').append(c)
}


$('.upload').hover(function(){
    if($('#photo')[0].src.length == 0){
      return
    }
    var b = document.createElement('div')
    b.id = 'mask'
    b.setAttribute('style','pointer-events:none;position:absolute;width:100%;height:100%;left:0;top:0;background-color:#BEBEBE;opacity:0.4;')
    $('.upload').append(b)
    $('.qq')[0].style.zIndex = 9999999
  },function(){
    $('#mask').remove()
    $('.qq')[0].style.zIndex = 0
  })

$("#option").click(function(e){
    if(e.target.className == 'delete'){
        var a = e.target.parentNode.parentNode
        a.remove()
    }
})


$("#save").click(function(){
    var result = $('#option').find('input')
    var parm = {}
    for(i=0;i<result.length;i++){
        // console.log(result[i+1].value,result[i].value)
        parm[result[i].value] = result[i+1].value
        i++
    }
    bas = $('#photo')[0].src
    chrome.storage.local.set({result: parm,aa : bas}) 
    chrome.extension.getBackgroundPage().send_message(parm,bas)
    window.close()
})


$(".navigator").click(function(e){
    $(".navigator").css({"background-color":"#fff","color":"black"})
    $(e.target).css({"background-color":"#1E90FF","color":"#fff"})
    var b = e.target.classList[1]
    var tar = document.getElementById(b)
    var bef = $('#container').children('div')
    for(i of bef){
        i.style.display = 'none'
    }
    tar.style.display='block'
})

$("#product").click(function(e){
    // new QRCode(a[0], "http://www.runoob.com")
    var a = $('#qrCode > textarea')
    var b = $('#code')
    console.log(a)
    if(a.css('display')=='none'){
        b.css('display','none')
        a.css('display','block')
        e.target.innerText ='生成'
    }else{
        qrcode.makeCode(a.val())
        console.log(a.text())
        a.css('display','none')
        b.css('display','block')
        e.target.innerText ='重新生成'
        chrome.storage.local.set({qrcode: a.val()})
    }
})

window.onbeforeunload= function(event) { 
    return confirm("21121212？"); 
}
// window.onunload = function(event) { return confirm("确定离开此页面吗？"); }
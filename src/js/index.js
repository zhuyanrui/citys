var bscroll = new BScroll('.wrap', {
    probeType: 2,
    click: true
})
var list = document.querySelector('.list');
var city = document.querySelector('.city');
var uls = document.querySelector('.uls');
//渲染数据
var xhr = new XMLHttpRequest();
xhr.open('get', '/api/load', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data.data);
            if (data.code === 0) {
                render(data.data);
            }
        }
    }
}
xhr.send();

function render(data) {
    console.log(data);
    var html = "";
    var str = "";
    for (var i in data) {
        html += ` <h2 >${i}</h2>`
        str += `<li>${i}</li>`
        html += `<ul>`
        data[i].forEach(function(v) {
            html += `<li>${v.name}</li>`
        })
        html += `</ul>`
    }
    list.innerHTML = html;
    uls.innerHTML = str;
    var lis = uls.querySelectorAll('li');
    //点击每个li的时候跳转相对的城市
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
            console.log(i);
            var h2 = document.querySelectorAll('h2');
            bscroll.scrollToElement(h2[i], 1000);
        }
    }

}
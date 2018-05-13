// IE10以前的版本不支持getElementsByClassName()
function getByClass(clsName,parent) {
    var oParent = parent ? document.getElementById(parent) : document,
        eles = [],
        elements = oParent.getElementsByTagName('*');  // 通过获取父节点下的所有元素节点

    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].className === clsName) {
            eles.push(elements[i]);
        }
    }

    return eles;
}

window.onload = function () {
    var oTitle = getByClass('login_logo_webqq','loginPanel')[0],
        oClose = document.getElementById('ui_boxyClose'),
        oDrag = document.getElementById('loginPanel'),
        loginState = document.getElementById('loginState'),
        stateList = document.getElementById('loginStatePanel'),
        lis = stateList.getElementsByTagName('li'),
        stateText = document.getElementById('login2qq_state_txt'),
        loginStateShow = document.getElementById('loginStateShow');

    // onmousedown()事件可以由按下鼠标任意键触发
    oTitle.onmousedown = function (event) {
        event = event || window.event;

        var disX = event.clientX - oDrag.offsetLeft, // offsetLeft获取到的是数字
            disY = event.clientY - oDrag.offsetTop;

        document.onmousemove = function (event) {
            event = event || window.event;
            fnMove(event,disX,disY);
        };
    };

    oTitle.onmouseup = function () {
        document.onmousemove = null;
    };

    oClose.onclick = function () {
        oDrag.style.display = 'none';
    };

    loginState.onclick = function (event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
        stateList.style.display = 'block';
    };

    for (var i = 0, l = lis.length; i < l; i++) {
        lis[i].onmouseover = function () {
            this.style.backgroundColor = '#567';
        };
        lis[i].onmouseout = function () {
            this.style.backgroundColor = '#fff';
        };
        lis[i].onclick = function (e) {
            e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation();
            }else {
                e.cancelBubble = true;
            }
            var id = this.id;
            stateList.style.display = 'none';
            stateText.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
            loginStateShow.className = '';
            loginStateShow.className = 'login-state-show '+ id ;
        }
    }

    document.onclick = function () {
        stateList.style.display = 'none';
    }
};

function fnMove(e,posX,posY) {
    var oDrag = document.getElementById('loginPanel'),
        left = e.clientX - posX,
        top = e.clientY - posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW - oDrag.offsetWidth,
        maxH = winH - oDrag.offsetHeight;

    if (left < 0) {
        left = 0;
    }else if (left > maxW) {
        left = maxW;
    }

    if (top < 0) {
        top = 0;
    }else if (top > maxH) {
        top = maxH;
    }

    oDrag.style.left = left + 'px';
    oDrag.style.top = top + 'px';
}
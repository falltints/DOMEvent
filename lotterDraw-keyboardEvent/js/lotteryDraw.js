var data = ['Phone5','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'],
    timer = null, // 计时器
    isBegin = true;  // 标志位

window.onload = function () {
    var begin = document.getElementById('begin'),
        end = document.getElementById('end'),
        title = document.getElementById('title');

    function beginGame() {
        clearInterval(timer);  // 修复点的次数越多，定时器间隔越短的bug
        timer = setInterval(function () {
            var random = Math.floor(Math.random() * data.length);
            title.innerHTML = data[random];
        }, 50);

        begin.style.background='#999';
    }
    function endGame() {
        clearInterval(timer);

        begin.style.background='#036';
    }

    begin.onclick = function () {
        beginGame();
    };

    end.onclick = function () {
        endGame();
    };

    document.onkeyup = function (event) {
        event = event || window.event;

        if (event.keyCode === 13) {  // 如果摁下的是enter键
            if (!isBegin) {
                isBegin = true;
                beginGame();
            }else {
                isBegin = false;
                endGame();
            }
        }
    }

};


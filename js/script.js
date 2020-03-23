//简化书写
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

var index = 0;
var timer = null;
var pics = byId("banner").getElementsByTagName("div");
var dots = byId("dots").getElementsByTagName("span");
var prev = byId("prev");
var next = byId("next");
var len = pics.length;

var menu = byId("menu-content");
var menuItems = menu.getElementsByClassName("menu-item"); //不要在ie8中使用
var subMenu = byId("sub-menu");
var innerBoxs = subMenu.getElementsByClassName("inner-box");

function slideImg() {
    var main = byId("main");
    //图片滑动
	main.onmouseover = function () {
        if (timer) {
            clearInterval(timer)
        }; //清除定时器
    }
    main.onmouseout = function () {
        timer = setInterval(function () {
                index++;
                changeImg();
            }, 2000); //定时器的使用
    }
    main.onmouseout(); //调用onmouseout()方法
    //点击原点
    for (var i = 0; i < len; i++) {
        dots[i].id = i; //添加并覆盖id
        dots[i].onclick = function () {
            //i为上面的局部变量
            index = this.id;
            changeImg();
        }
    }
    next.onclick = function () {
        index++;
        changeImg();
    }
    prev.onclick = function () {
        index++;
        changeImg();
    }
	
    //导航菜单
    for (var i = 0; i < menuItems.length; i++) {
        //防止id冲突,添加自定义属性
        menuItems[i].setAttribute("data-index", i);
        menuItems[i].onmouseover = function () {
            subMenu.style.display = "block";
			//i为上面的局部变量	
            var index = this.getAttribute("data-index");
			//先全部隐藏，再显示其中一个
            for (var i = 0; i < menuItems.length; i++) {
                innerBoxs[i].style.display = "none";
                menuItems[i].style.background = "none";
            } 
            menuItems[index].style.background = "rgba(0,0,0,.1)";
            innerBoxs[index].style.display = "block";
        }
    }
	//离开一级菜单，隐藏二级菜单
    menu.onmouseout = function () {
        subMenu.style.display = "none";
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].style.background = "none";
        }
    }
	//移动到二级菜单
    subMenu.onmouseover = function () {
        this.style.display = "block";
    }
	//离开二级菜单
    subMenu.onmouseout = function () {
        this.style.display = "none";
    }

}

//图片滑动
function changeImg() {
    for (var i = 0; i < len; i++) {
        pics[i].style.display = "none";
        dots[i].className = ""; //重新覆盖class
    }
    pics[index % 3].style.display = "block";
    dots[index % 3].className = "active";
}

slideImg();

<<<<<<< HEAD
/*
timeStep=0.1;	// 每 0.1 秒顯示一次時間
accumulated=0;	// 目前累計的時間
function showTime(form){
	form.value=accumulated;
	accumulated+=timeStep;
	timer=setTimeout("showTime(form);", timeStep*1000);
}
*/
var oneTomatoTime = 25;	//	One Tomato timer. (default: 25 mins)
var totalMin = oneTomatoTime;
var totalSec = 0;
var clock;

var audio = document.getElementById("bgMusic"); 


// Timer Start button 的主要功能.
function go(form){
	switch(form.startButton.value){
		case "Start":			
			form.startButton.value="Stop";	// 將按鈕文字改為「Stop」			
			where = form;
			totalMin = oneTomatoTime;
			totalSec = 0;
			clock = setInterval('show(where);', 1000);	
			break;
		case "Stop":			
			form.startButton.value="Continue";
			clearInterval(clock);		
			break;
		case "Continue":
			form.startButton.value="Stop";
			where = form;
			clock = setInterval('show(where);', 1000);	
			break;		
		default:
			alert("Error!");
			break;
	}
}

// Reset all value.
function goReset(form){
	form.startButton.value="Start";
	clearInterval(clock);	
	form.count.value = oneTomatoTime+":00"
	document.title = "Tomato Timer Simple Version";
	audio.pause();	
}

function show(form){	
	//計算每分每秒的遞減.
	if (totalMin != 0) {		
		if(totalSec != 0){
			totalSec--;
		}else{
			totalMin--;
			totalSec=59;
		}
	}else{	
		if(totalSec != 0){
			totalSec--;
		}else{	//	時間為00:00時的動作.
			document.title = "!!!!!!!!!!!!";
			clearInterval(clock);
			form.startButton.value="Start";
			form.count.value = oneTomatoTime+":00";	
			audio.currentTime = 65;  // 設定從65秒處開始播放
			audio.play();	//播放
            setTimeout('musicTime()', 4700);

			//alert("Time up !! Well Done !!");
			//question();
		}
	}

	//	正規時間表示->[00:00]
	if(totalMin<10)
		var totalMinNow = "0"+totalMin;
	else
		var totalMinNow = totalMin;

	if(totalSec<10)
		var totalSecNow = "0"+totalSec;
	else
		var totalSecNow = totalSec;
	
	// Set Timer.
	form.count.value = totalMinNow+":"+totalSecNow;
	document.title = "("+form.count.value+") Starting Timer";
}

// 設定一個時鐘的時間.
function setOneTomatoTime(form){
	goReset(form);
	var oneTomatoTimeTmp = form.oneTomatoTimeValue.value;
	rule = /[0-9]/;
	if (rule.test(oneTomatoTimeTmp)){
		oneTomatoTime = oneTomatoTimeTmp;
		form.count.value = oneTomatoTime+":00";
	}else{
		form.oneTomatoTimeValue.value = 25;
		form.count.value = "25:00";
		oneTomatoTime = 25;
		alert("失敗！請輸入數字 0-9！");
	}	
}

// Time up 時詢問完成什麼事情.
function question(){
	var doWhat = prompt("剛剛完成了什麼事情呢 ?");
	addListDone(doWhat);
}

var i=0;	// 代辦事項之標籤.
var j=0;	// 已完成代辦事項之標籤.

// 增加一件空的代辦事項.
function addList(){	
	i++;
    var str="<div id='myList"+i+"'><input type=text size=15 id='myListValue"+i+"'><input type='checkbox' name='CB_list' id="+i+" onclick='listDone(this.id);'><input type=button value='X' id="+i+" onclick='delList(this.id);' ;></input></div>";
    document.all["TodoList"].insertAdjacentHTML('beforeend',str);
}

// 增加一件已完成的代辦事項.
function addListDone(doWhat){	
	j++;
    var str="<div id='myListDone"+j+"'><input type=text size=15 value="+doWhat+"><input type=button value='X' id="+j+" onclick='delListDone(this.id);' ;></input></div>";
    document.all["TodoListDone"].insertAdjacentHTML('beforeend',str);
}

// 刪除指定的代辦事項.
function delList(index){
	window.console.log(index);
	index = "myList" + index;
	//alert(document.getElementById(index).outerHTML);
	eval(document.getElementById(index)).outerHTML = "";
}

// 刪除指定的已完成代辦事項.
function delListDone(index){
	window.console.log(index);
	index = "myListDone" + index;
	//alert(document.getElementById(index).outerHTML);
	eval(document.getElementById(index)).outerHTML = "";
}

// 勾選代辦事項中的指定任務，標示為完成，並移至已完成代辦事項列表裡.
function listDone(index){
	var doWhat = document.getElementById("myListValue" + index).value;
	addListDone(doWhat);
	delList(index);
}

function musicTime(){
    //clearInterval(musicClock);
    audio.pause();
    window.alert("很好哦 ! 確定有專注一陣子吧 ~");
    question();
}


/*
 function notifyMe() {
    // 检查浏览器是否支持 Notification
    if (!("Notification" in window)) {
        alert("你的不支持 Notification!  TAT");
    }

    // 检查用户是否已经允许使用通知
    else if (Notification.permission === "granted") {
        // 创建 Notification
        var notification = new Notification("Hey guy!");
        notification.iconurl = 'http://img.hacpai.com/avatar/1450241301546-260.jpg?1451971807339';
        autoClose(notification);

    }

    // 重新发起请求，让用户同意使用通知
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

            // 用户同意使用通知
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            if (permission === "granted") {
                // 创建 Notification
                var notification = new Notification("Hey guy!");
            }
        });
    }

    // 注意：如果浏览器禁止弹出任何通知，将无法使用
}

function autoClose(notification) {
    if (typeof notification.time === 'undefined' || notification.time <= 0) {
        notification.close();
    } else {
        setTimeout(function () {
            notification.close();
        }, notification.time);
    }

    notification.addEventListener('click', function () {
        notification.close();
    }, false)
}

window.addEventListener("load", function(){
    if(Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        });
    }
    var button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(){
        var t = new Date().toLocaleString();
        var options={
            dir: "ltr",
            lang: "utf-8",
            icon: "http://ihuster.com/static/avatar/m_default.png",
            body: "你好呀，欢迎留言交流呀"
        };
        if(Notification && Notification.permission === "granted"){
            var n = new Notification("HUSTecho: "+ t, options);    
            n.onshow = function(){
                console.log("You got me!");
            };
            n.onclick = function() {
                alert("You clicked me!");
                window.location = "/";
            };
            n.onclose = function(){
                console.log("notification closed!");
            };        
            n.onerror = function() {
                console.log("An error accured");
            }            
        }else if(Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status){
                if(Notification.permission !== status){
                    Notification.permission = status;
                }

                if(status === "granted"){
                    for(var i = 0; i < 3; i++){
                        var n = new Notification("Hi! " + i, {
                            tag: "Beyoung",
                            icon: "http://ihuster.com/static/avatar/b_default.png",
                            body: "你好呀，我是第" + i +"条消息啦！"
                        });
                    }
                }
            });
        }else{
            alert("Hi!");
        }
    });
});

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!",
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
    };

  }

}
=======
/*
timeStep=0.1;	// 每 0.1 秒顯示一次時間
accumulated=0;	// 目前累計的時間
function showTime(form){
	form.value=accumulated;
	accumulated+=timeStep;
	timer=setTimeout("showTime(form);", timeStep*1000);
}
*/
var oneTomatoTime = 25;	//	One Tomato timer. (default: 25 mins)
var totalMin = oneTomatoTime;
var totalSec = 0;
var clock;

var audio = document.getElementById("bgMusic"); 


// Timer Start button 的主要功能.
function go(form){
	switch(form.startButton.value){
		case "Start":			
			form.startButton.value="Stop";	// 將按鈕文字改為「Stop」			
			where = form;
			totalMin = oneTomatoTime;
			totalSec = 0;
			clock = setInterval('show(where);', 1000);	
			break;
		case "Stop":			
			form.startButton.value="Continue";
			clearInterval(clock);		
			break;
		case "Continue":
			form.startButton.value="Stop";
			where = form;
			clock = setInterval('show(where);', 1000);	
			break;		
		default:
			alert("Error!");
			break;
	}
}

// Reset all value.
function goReset(form){
	form.startButton.value="Start";
	clearInterval(clock);	
	form.count.value = oneTomatoTime+":00"
	document.title = "Tomato Timer Simple Version";
	audio.pause();	
}

function show(form){	
	//計算每分每秒的遞減.
	if (totalMin != 0) {		
		if(totalSec != 0){
			totalSec--;
		}else{
			totalMin--;
			totalSec=59;
		}
	}else{	
		if(totalSec != 0){
			totalSec--;
		}else{	//	時間為00:00時的動作.
			document.title = "!!!!!!!!!!!!";
			clearInterval(clock);
			form.startButton.value="Start";
			form.count.value = oneTomatoTime+":00";	
			audio.currentTime = 65;  // 設定從65秒處開始播放
			audio.play();	//播放
            setTimeout('musicTime()', 4700);

			//alert("Time up !! Well Done !!");
			//question();
		}
	}

	//	正規時間表示->[00:00]
	if(totalMin<10)
		var totalMinNow = "0"+totalMin;
	else
		var totalMinNow = totalMin;

	if(totalSec<10)
		var totalSecNow = "0"+totalSec;
	else
		var totalSecNow = totalSec;
	
	// Set Timer.
	form.count.value = totalMinNow+":"+totalSecNow;
	document.title = "("+form.count.value+") Starting Timer";
}

// 設定一個時鐘的時間.
function setOneTomatoTime(form){
	goReset(form);
	var oneTomatoTimeTmp = form.oneTomatoTimeValue.value;
	rule = /[0-9]/;
	if (rule.test(oneTomatoTimeTmp)){
		oneTomatoTime = oneTomatoTimeTmp;
		form.count.value = oneTomatoTime+":00";
	}else{
		form.oneTomatoTimeValue.value = 25;
		form.count.value = "25:00";
		oneTomatoTime = 25;
		alert("失敗！請輸入數字 0-9！");
	}	
}

// Time up 時詢問完成什麼事情.
function question(){
	var doWhat = prompt("剛剛完成了什麼事情呢 ?");
	addListDone(doWhat);
}

var i=0;	// 代辦事項之標籤.
var j=0;	// 已完成代辦事項之標籤.

// 增加一件空的代辦事項.
function addList(){	
	i++;
    var str="<div id='myList"+i+"'><input type=text size=15 id='myListValue"+i+"'><input type='checkbox' name='CB_list' id="+i+" onclick='listDone(this.id);'><input type=button value='X' id="+i+" onclick='delList(this.id);' ;></input></div>";
    document.all["TodoList"].insertAdjacentHTML('beforeend',str);
}

// 增加一件已完成的代辦事項.
function addListDone(doWhat){	
	j++;
    var str="<div id='myListDone"+j+"'><input type=text size=15 value="+doWhat+"><input type=button value='X' id="+j+" onclick='delListDone(this.id);' ;></input></div>";
    document.all["TodoListDone"].insertAdjacentHTML('beforeend',str);
}

// 刪除指定的代辦事項.
function delList(index){
	window.console.log(index);
	index = "myList" + index;
	//alert(document.getElementById(index).outerHTML);
	eval(document.getElementById(index)).outerHTML = "";
}

// 刪除指定的已完成代辦事項.
function delListDone(index){
	window.console.log(index);
	index = "myListDone" + index;
	//alert(document.getElementById(index).outerHTML);
	eval(document.getElementById(index)).outerHTML = "";
}

// 勾選代辦事項中的指定任務，標示為完成，並移至已完成代辦事項列表裡.
function listDone(index){
	var doWhat = document.getElementById("myListValue" + index).value;
	addListDone(doWhat);
	delList(index);
}

function musicTime(){
    //clearInterval(musicClock);
    audio.pause();
    window.alert("很好哦 ! 確定有專注一陣子吧 ~");
    question();
}


/*
 function notifyMe() {
    // 检查浏览器是否支持 Notification
    if (!("Notification" in window)) {
        alert("你的不支持 Notification!  TAT");
    }

    // 检查用户是否已经允许使用通知
    else if (Notification.permission === "granted") {
        // 创建 Notification
        var notification = new Notification("Hey guy!");
        notification.iconurl = 'http://img.hacpai.com/avatar/1450241301546-260.jpg?1451971807339';
        autoClose(notification);

    }

    // 重新发起请求，让用户同意使用通知
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {

            // 用户同意使用通知
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            if (permission === "granted") {
                // 创建 Notification
                var notification = new Notification("Hey guy!");
            }
        });
    }

    // 注意：如果浏览器禁止弹出任何通知，将无法使用
}

function autoClose(notification) {
    if (typeof notification.time === 'undefined' || notification.time <= 0) {
        notification.close();
    } else {
        setTimeout(function () {
            notification.close();
        }, notification.time);
    }

    notification.addEventListener('click', function () {
        notification.close();
    }, false)
}

window.addEventListener("load", function(){
    if(Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        });
    }
    var button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(){
        var t = new Date().toLocaleString();
        var options={
            dir: "ltr",
            lang: "utf-8",
            icon: "http://ihuster.com/static/avatar/m_default.png",
            body: "你好呀，欢迎留言交流呀"
        };
        if(Notification && Notification.permission === "granted"){
            var n = new Notification("HUSTecho: "+ t, options);    
            n.onshow = function(){
                console.log("You got me!");
            };
            n.onclick = function() {
                alert("You clicked me!");
                window.location = "/";
            };
            n.onclose = function(){
                console.log("notification closed!");
            };        
            n.onerror = function() {
                console.log("An error accured");
            }            
        }else if(Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status){
                if(Notification.permission !== status){
                    Notification.permission = status;
                }

                if(status === "granted"){
                    for(var i = 0; i < 3; i++){
                        var n = new Notification("Hi! " + i, {
                            tag: "Beyoung",
                            icon: "http://ihuster.com/static/avatar/b_default.png",
                            body: "你好呀，我是第" + i +"条消息啦！"
                        });
                    }
                }
            });
        }else{
            alert("Hi!");
        }
    });
});

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!",
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
    };

  }

}
>>>>>>> 058a5fb3cb72d2c2b467764b7c2e503b559c051f
*/
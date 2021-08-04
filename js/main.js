window.onload = function() {


    /**
     * 
     * 
     * @param {any} tagName 
     * @param {any} classname 
     * @returns 
     */
    function getClassName(tagName, classname) {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(classname);
        } else {
            var results = [];
            var elems = document.getElementsByTagName('*');
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].className.indexOf(classname) != -1) {
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    }



    function forLi(check) {
        for (let i in li) {

            if (li.hasOwnProperty(i)) { //只输出私有属性

                let classT = li[i].className;
                let classN = classT.split(' ');

                if (!check) {
                    if (classN[classN.length - 1] == 'target') { //移除 target
                        li[i].classList.remove('target');
                    }


                    if (classN[1] == 'num' + num) { //添加 target 实现颜色切换

                        let allClass = classT + ' target';
                        li[i].setAttribute('class', allClass);

                       
                        resultText[0].innerHTML = '命運轉盤的選擇是-: '+li[i].innerHTML;
                    }

                } else {
                    if (classN[classN.length - 1] == 'target') {
                        resultText[0].innerHTML = '🎉恭喜 臭弟弟獲得: '+li[i].innerHTML;
                        resultText[0].setAttribute('class','resultText target')
                        flag = true;

                        //重置
                        cut = Math.random() * 10 + 90;
                        turns = Math.ceil(Math.random() * 3 + 1); //旋转次数
                        speed = Math.floor((Math.random() * 10)) + 3; //速度


                    }
                }


            }
        }


    }



    var li = getClassName('li','valueNum');
    var resultText = getClassName('p','resultText');


    var num = 0; //编号
    var times = Math.ceil(Math.random() * 50 + (Math.random() * 3)); //随机时间

    var flag = true;


    var speed = Math.floor((Math.random() * 10)) + 10; //速度
    var turns = Math.ceil(Math.random() * 2 + 1); //旋转次数
    var cut = Math.random() * 10 + 90;




    function startTurn() {

        if (num == 8) { num = 0; } //归零

        forLi()//切换颜色

        num++;
        times += speed;


        if (times > cut) {
            times = 30;
            speed -= 0.5;
            turns--;

            if (turns == 1) { //最后一圈降低速度
                speed =  Math.ceil(Math.random() * 3 );
                times = 500;
                cut = 503;
            }
        }



        if (turns == 0) {

            forLi(true)//输出结果

        } else {
            setTimeout(startTurn, times);
        }

    }




    var star = document.getElementsByClassName('star');


    document.onclick = function(e) {
        var target = e.target || e.srcElement;
        if (target.className == 'star' && flag == true) {
            flag = false;
            resultText[0].classList.remove('none')
            setTimeout(startTurn, times);
        }
    }

}
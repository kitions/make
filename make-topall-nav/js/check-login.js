/**
 * Created by hp on 2017-4-20.
 */
function checklog() {
    var name = document.querySelector('#user_tell').value;
    var re =/^1[34578]\d{9}$/;
    if (!re.test(name)){ //不正确
        var surename = document.querySelector("#check-tell");
        surename.innerHTML = '请输入正确的手机号或邮箱';
        surename.style.color = "red";
        document.querySelector('#name').value = '';
        document.querySelector('#name').focus();
    }else{  //正确
        var surename = document.querySelector('#check-tell');
        surename.innerHTML = '格式正确';
        surename.style.color = "blue";
        return true;
    }
}

function checkpwd() {
    var pwd = document.querySelector('#user_password').value;
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/;
    if(!re.test(pwd)){
        var surepwd = document.querySelector('#check-loginpwd');
        surepwd.innerHTML = '必须包含大小写字母和数字的组合';
        surepwd.style.color = "red";
        document.getElementById('pwd').value = '';
        document.getElementById('pwd').focus();
    }else{
        var surepwd = document.querySelector('#check-loginpwd');
        surepwd.innerHTML = '格式正确';
        surepwd.style.color = "blue";
        return true;
    }
}
//
function checkregisttel() {
   var name = document.querySelector('#registel').value;
   var re =/^1[34578]\d{9}$/;
   if (!re.test(name)){ //不正确
       var surename = document.querySelector("#check-name");
       surename.innerHTML = '请输入正确的手机号';
       surename.style.color = "red";
       document.querySelector('#name').value = '';
       document.querySelector('#name').focus();
   }else{  //正确
       var surename = document.querySelector('#check-name');
       surename.innerHTML = '格式正确';
       surename.style.color = "blue";
       return true;
   }
}
function checkregistPwd() {
   var pwd = document.getElementById('registpwd').value;
   var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
   if(!re.test(pwd)){
       var surepwd = document.querySelector('#check-pwd');
       surepwd.innerHTML = '必须包含大小写字母和数字的组合';
       surepwd.style.color = "red";
       document.getElementById('pwd').value = '';
       document.getElementById('pwd').focus();
   }else{
       var surepwd = document.querySelector('#check-pwd');
       surepwd.innerHTML = '格式正确';
       surepwd.style.color = "blue";
       return true;
   }
}


// var verifyCode = new GVerify("v_container");
// function checkCode(){
//     var res = verifyCode.validate(document.getElementById("code_input").value);
//     var codes = document.querySelector('#check-code');
//     if(res){
//         codes.innerHTML = '验证码正确';
//         codes.style.color = "blue";
//     }else{
//         codes.innerHTML = '验证码错误';
//         codes.style.color = "red";
//     }
// }
function checks() {
    if(checkPwd()&&checkCode()==true){
        alert('ok');
    }
}

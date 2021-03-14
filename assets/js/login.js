$(function () {
    $("#link-reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
        
    });
    $("#link-login").on('click',function () {
       $(".login-box").show() 
       $(".reg-box").hide()
    })
       // 取到layui的form对象
       let form = layui.form;
       // console.log(form);
       // 定义表单中的repwd属性设置
       form.verify({
           pwd: [
               /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
           ],
           // 操作里面的登录密码校验 value是repwd的值
           // 需求2 密码的再次确认
           repwd: function (value, ) {
               // console.log(value);
   
               var pwd = $('.reg_box  input[name="password"]').val()
   
               if (value != pwd) {
                   return "两次密码不一致"
               }
           }
   
   
   
       })
       // ajax获取服务器数据
       // 表单提交注册事件 
       var layer=layui.layer
       $("#form-reg").on("submit", function (e) {
          
           // 阻止表单提交
           e.preventDefault();
           $.ajax({
               type: 'post',
               url: '/api/reguser',
               data: {
                   username: $('.reg_box  input[name="username"]').val(),
                   password: $('.reg_box  input[name="password"]').val()
               },
               success: (res) => {
                   console.log(res);
                   // 判定并添加layui弹出层组件
                   if (res.status != 0) {
                       return layer.msg(res.message);
                       // return'1'
                   }
                   // 提交成功后处理代码
                   layer.msg("注册成功,请登录!")
                   // 手动切换到登录页面
                   $("#link-login").click();
                   // 重置form表单 需要将jq对象转化为Dom对象 
                   $("#form-reg")[0].reset();
               }
           })
   
       })
   
        $("#form-login").submit(function (e) {
           // 阻止表单提交
           e.preventDefault();
           $.ajax({
               type: 'post',
               url: '/api/login',
               data:  $(this).serialize() ,
               success: (res) => {
                   console.log(res);
                   // 判定并添加layui弹出层组件
                   if (res.status != 0) {
                       return layer.msg(res.message);
                   }
                   // 提交成功后处理代码
                   layer.msg("登录成功")
                 
                 localStorage.setItem("token",res.token)
                   // 重置form表单 需要将jq对象转化为Dom对象 
                   location.href = "/index.html";
               }
           })
   
       }) 

})
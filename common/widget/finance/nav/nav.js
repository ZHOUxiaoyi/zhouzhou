;$(function(){

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
    var hmsr = getQueryString('hmsr'),
        _reg_addtion_query = hmsr ? '/' + loginProjectName + '?tj_sr=' + encodeURIComponent(hmsr) + '&tj_act=register' : '/' + loginProjectName;
    if (hmsr){
        var _register_btn = $('#register_btn');
        _register_btn.attr('href', _register_btn.attr('href') + encodeURIComponent(_reg_addtion_query))
    }
    
    var LICAI_DOMAIN = location.protocol + '//' + location.host,
        PASS_DOMAIN = "http://passport.baidu.com",
        loginDialog,
        loginCall = function(){},   //成功登录回调
        closeCall = function(){},   //隐藏登陆框回调
        config = {
            tangram: true, 
            cache:true, 
            apiOpt:{
                product:'bp', 
                staticPage: LICAI_DOMAIN + '/static/common/html/v3Jump.html',
                memberPass: true, 
                u: LICAI_DOMAIN + _reg_addtion_query,
                registerLink: 'https://passport.baidu.com/v2/?reg&tpl=&u=' + encodeURIComponent(LICAI_DOMAIN + _reg_addtion_query)
            },
            id:'login_btn',
            onLoginSuccess: function(args){
                args.returnValue = false;
                loginDialog.hide();
                $.ajax({
                    type: 'get',
                    url: LICAI_DOMAIN + '/checklogin/0',
                    dataType: 'jsonp',
                    success: function(response){
                        if(response.is_login == 1){
                            var userName = response.user_name || response.user_login_name;
                            $('.fin-user-center [data-has-login=false]').hide();
                            $('.fin-user-center [data-has-login=true]').show().find('.user-name').html(userName);
                            $('.fin-user-center [data-has-login=true] .user-name').attr("title",userName);
                        }
                        if(window.financeLoginCall){
                            if( window.financeLoginCall() ){
                                return;
                            }
                        }
                        loginCall();
                    }
                });
            },
            onHide: function(){
                if(window.financeCloseCall){
                    if( window.financeCloseCall() ){
                        return;
                    }
                }
                closeCall();
            }
        };

    loginDialog = passport.pop.init(config);

    //检测登陆状态(成功登录回调,是否显示弹出层,隐藏登陆框回调)
    window.CheckLogin = function(callback,showDialog,closeback) {
        callback = callback || function(){};
        closeback = closeback || function(){};
        showDialog = showDialog == undefined ? true : showDialog;
        $.ajax({
            type: 'get',
            url: LICAI_DOMAIN + '/checklogin/0',
            dataType: 'jsonp',
            success: function(response){
                if(response.is_login == 1){
                    var userName = response.user_name || response.user_login_name;
                    $('.fin-user-center [data-has-login=false]').hide();
                    $('.fin-user-center [data-has-login=true]').show().find('.user-name').html(userName);
                    $('.fin-user-center [data-has-login=true] .user-name').attr("title",userName);
                    callback();
                } else if(showDialog){
                    loginDialog.show();
                    loginCall = callback;
                    closeCall = closeback;
                }
            }
        });
    };
    CheckLogin(null,false);

    //J_drop
    $(".fin-header").on("mouseenter",".J_drop-sya",function(){
        var $this = $(this);
        $this.addClass('drop-open');
    }).on("mouseleave",".J_drop-sya",function(){
        var $this = $(this);
        $this.removeClass('drop-open');
    });

});



//////////////////////////////////////////////////////////////////////////////////////

    //var login_to_buy = false;
    //var buy_url = "";
    //var buy_target = null;

//////////////////////////////////////////////////////////////////////////////////////

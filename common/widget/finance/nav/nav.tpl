<%
    var domain = "http://8.baidu.com";
%>
    
<div class="fin-header">
    <div class="fin-logo"><a href="/" class="fin-logo-chief" title="百度金融">百度金融</a></div>
    <div class="fin-nav">
        <ul class="nav-list">
            <li class="home nav-item"><a href="${domain}/">首页</a></li>
            <li class="investment nav-item"><a href="${domain}/investment/0">投资</a></li>
            <li class="rich nav-item"><a href="${domain}/rich/">消费金融</a></li>
            <li class="loan nav-item"><a href="${domain}/finance91/0">贷款</a></li>
            <li class="interaction nav-item"><a href="${domain}/ask/0">互动金融</a></li>
        </ul>
    </div>

    <div class="fin-user-center">
        <!-- login-before -->
        <div class="login-before" data-has-login="false">
            <div class="login-tip">欢迎来发财</div>
            <div class="drop-down J_drop-sya">
                <ul class="drop-list">
                    <li class="drop-item"><a href="javascript:void(0)" class="fin-login" target="_self" id="login_btn">登录我的小金库</a></li>
                    <li class="drop-item"><a href="http://passport.baidu.com/v2/?reg&tpl=bp&u=http%3A%2F%2F8.baidu.com%2F${project}" class="fin-reg" target="_blank" id="register_btn">注册</a></li>
                    <li class="drop-item"><a href="http://co.baifubao.com/content/payhelp/licai/" class="fin-help" target="_blank">帮助中心</a></li>
                    <li class="drop-item"><a href="http://www.baifubao.com/" class="fin-baifubao" target="_blank">百度钱包</a></li>
                </ul>
            </div>
        </div>
        <!-- //login-before -->
        <!-- login-after -->
        <div class="login-after" data-has-login="true" style="display:none">
            <div class="login-tip"><a href="/user/center/" class="user-login" target="_blank"><span class="user-name"></span>，欢迎来发财</a></div>
            <div class="drop-down J_drop-sya">
                <ul class="drop-list">
                    <li class="drop-item"><a href="/user/center/" class="fin-login" target="_blank">我的小金库<b class="icon-nav-arrow"></b></a></li>
                    <li class="drop-item"><a href="http://passport.baidu.com/?logout&tpl=bp&u=http%3A%2F%2F8.baidu.com%2F${project}" class="fin-exit">安全退出</a></li>
                    <li class="drop-item"><a href="http://co.baifubao.com/content/payhelp/licai/" class="fin-help" target="_blank">帮助中心</a></li>
                    <li class="drop-item"><a href="http://www.baifubao.com/" class="fin-baifubao" target="_blank">百度钱包</a></li>
                </ul>
            </div>
        </div>
        <!-- //login-after -->
    </div>
    <!-- app -->
    <% include('/cms/common/nav_app_java.inc'){}%>
    <!-- //app -->
    <div class="fin-nav-qianbao">
        <a href="http://www.baifubao.com/" target="_blank" class="bfb-logo" title="百度钱包"></a>
    </div>
</div>
<script>
var loginProjectName = "${project}";
(function(){
    var navItem = "${nav}";
    navItem && $('.fin-header .nav-item.'+navItem).addClass('select');
})();
</script>
<script src="//passport.baidu.com/passApi/js/uni_login_wrapper.js?cdnversion=20140808"></script>
<script src="/assets/common/build/nav.js"></script>
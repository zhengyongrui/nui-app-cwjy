(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["modules/reg/reg"],{"24bd":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("4a6f"));function o(t){return t&&t.__esModule?t:{default:t}}var u=function(){return e.e("components/m-input").then(e.bind(null,"016f"))},i={components:{mInput:u},data:function(){return{account:"",password:"",email:""}},methods:{register:function(){if(this.account.length<5)t.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else if(this.email.length<3||!~this.email.indexOf("@"))t.showToast({icon:"none",title:"邮箱地址不合法"});else{var n={account:this.account,password:this.password,email:this.email};a.default.addUser(n),t.showToast({title:"注册成功"}),t.navigateBack({delta:1})}}}};n.default=i}).call(this,e("6e42")["default"])},b570:function(t,n,e){"use strict";e.r(n);var a=e("ff6f"),o=e("d68a");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);var i,f=e("f0c5"),c=Object(f["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=c.exports},d68a:function(t,n,e){"use strict";e.r(n);var a=e("24bd"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},ff6f:function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return a})},ffaf:function(t,n,e){"use strict";(function(t){e("7c3f"),e("921b");a(e("66fd"));var n=a(e("b570"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])}},[["ffaf","common/runtime","common/vendor"]]]);
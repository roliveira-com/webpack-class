webpackJsonp([1],{119:function(e,n,t){"use strict";var r=t(3),a=t.n(r),o=function(){for(var e=[],n=0;n<50;n+=1)e.push(new a.a("Message "+(n+1),Date.now()-parseInt(2e6*Math.random(),10)));return e};n.a=o},124:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),a=t.n(r),o=t(119),s=t(2),u=t.n(s),c=t(1);t.n(c);a.a.locale("pt-BR");var i=t.i(o.a)(),l=i.map(function(e){return u()({m:e,relativeTime:a()(e.created).fromNow()})}).reduce(function(e,n){return e+n});document.getElementById("messages").innerHTML=l,console.log("old-messages")}},[124]);
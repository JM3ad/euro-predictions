(this["webpackJsonpeuro-predictions"]=this["webpackJsonpeuro-predictions"]||[]).push([[0],{24:function(e,t,n){},25:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var c,r=n(0),s=n.n(r),o=n(15),i=n.n(o),a=(n(24),n(18)),u=n(2),l=n(9),d=(n(25),n(16)),j=n(17);!function(e){e[e.HOME_WIN=0]="HOME_WIN",e[e.DRAW=1]="DRAW",e[e.AWAY_WIN=2]="AWAY_WIN"}(c||(c={}));var h=function e(){var t=this;Object(j.a)(this,e),this.determineResult=function(e){var t=e.split("-")[0],n=e.split("-")[1];return t==n?c.DRAW:t>n?c.HOME_WIN:c.AWAY_WIN},this.determinePointsForGame=function(e,n){return n?e==n?3:t.determineResult(e)===t.determineResult(n)?1:0:0},this.determinePoints=function(e){return e.players.map((function(n,c){return{player:n,score:e.games.map((function(e){return t.determinePointsForGame(e.predictions[c],e.result)})).reduce((function(e,t){return e+t}),0)}}))}},b=n(1),p=function(e){var t=e.scores;return Object(b.jsx)("table",{className:"score-table",children:Object(b.jsxs)("tbody",{children:[Object(b.jsx)("tr",{children:t.map((function(e,t){return Object(b.jsx)("td",{children:e.player},t)}))}),Object(b.jsx)("tr",{children:t.map((function(e,t){return Object(b.jsx)("td",{children:e.score},t)}))})]})})},f=function(e){return Object(b.jsx)("table",{className:"results-table",children:Object(b.jsx)("tbody",{children:e.sheet.values.map((function(e,t){return Object(b.jsx)("tr",{children:e.map((function(e,t){return Object(b.jsx)("td",{children:e},t)}))},t)}))})})},m=function(e){var t,n={players:(t=e.sheet).values[0].slice(5),games:t.values.slice(1).map((function(e){return{round:e[0],time:e[1],teamA:e[2],teamB:e[3],result:e[4],predictions:e.slice(5)}}))},c=(new h).determinePoints(n);return Object(b.jsxs)("div",{children:[Object(b.jsx)(p,{scores:c}),Object(b.jsx)(f,{sheet:e.sheet})]})},O=function(){var e=Object(r.useState)(),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(localStorage.getItem("token")||""),o=Object(l.a)(s,2),i=o[0],a=o[1],u=Object(r.useState)(!!localStorage.getItem("token")),j=Object(l.a)(u,2),h=j[0],p=j[1];Object(r.useEffect)((function(){i&&fetch("https://sheets.googleapis.com/v4/spreadsheets/".concat("1TSSfGF2fWCKnjg1dIV7eUcnQwPlgncJl6WURdyd40pM","/values/Sheet1!A1:K20?access_token=").concat(i)).then((function(e){if(!e.ok)throw a(""),p(!1),localStorage.removeItem("token"),Error("");return e.json()})).then((function(e){c(e)}))}),[i]);var f="".concat("109764536947-mh2j0gmud5sg3dvpko3q9f8tsutr5tks.apps.googleusercontent.com");return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("div",{children:n?Object(b.jsx)(m,{sheet:n}):null}),h?null:Object(b.jsx)(d.GoogleLogin,{clientId:f,buttonText:"Login",onSuccess:function(e){var t=e;t&&(localStorage.setItem("token",t.accessToken),a(t.accessToken),p(!0))},onFailure:function(e){p(!1)},cookiePolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets.readonly"})]})},g=function(){var e=sessionStorage.redirect;return delete sessionStorage.redirect,e&&e!=location.href&&history.replaceState(null,"euro-predictions",e),Object(b.jsx)(a.a,{basename:"euro-predictions",children:Object(b.jsx)("div",{children:Object(b.jsx)(u.c,{children:Object(b.jsx)(u.a,{path:"/",children:Object(b.jsx)(O,{})})})})})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),s(e),o(e)}))};i.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(g,{})}),document.getElementById("root")),x()}},[[32,1,2]]]);
//# sourceMappingURL=main.dbf08628.chunk.js.map
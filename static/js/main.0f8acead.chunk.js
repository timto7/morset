(this.webpackJsonpmorset=this.webpackJsonpmorset||[]).push([[0],{11:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return l}));var o={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",0:"-----",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----.",".":".-.-.-",",":"--..--","?":"..--..","'":".----.",'"':".-..-.","!":"-.-.--","/":"-..-.","(":"-.--.",")":"-.--.-","&":".-...",":":"---...",";":"-.-.-.","=":"-...-","+":".-.-.","-":"-....-",_:"..--.-","@":".--.-.",\u00c0:".--.-",\u00c4:".-.-",\u00c5:".--.-",\u0104:".-.-",\u00c6:".-.-",\u0106:"-.-..",\u0108:"-.-..",\u00c7:"-.-..",\u0110:"..-..",\u00c9:"..-..",\u00c8:".-..-",\u0118:"..-..",\u011c:"--.-.",\u0124:"----",\u0134:".---.",\u0141:".-..-",\u0143:"--.--",\u00d1:"--.--",\u00d3:"---.",\u00d6:"---.",\u00d8:"---.",\u015a:"...-...",\u015c:"...-.",\u0160:"----",\u00de:".--..",\u00dc:"..--",\u016c:"..--",\u0179:"--..-.",\u017b:"--..-"," ":"/"};function a(e){return e.match(/^[-.|/\s]+$/g)}function r(e){return e=e.replace(/[\t\r\n]*/g,"").replace(/\u2212/g,"-").replace(/\xb7/g,".").replace(/^[\s/]*|[\s/]*$/g,"").replace(/\/\s*\//g,"/").replace(/\s*\//g,"/").replace(/\/\s*/g,"/").replace(/\/{2,}/g,"/").replace(/[\s+]{4,}/g,"/").replace(/[\s+]{2,3}/g," ")}function i(e){var t="";return(e||"").split("").forEach((function(e){if("|"===e)t+="|";else{var n=o[e.toUpperCase()];n&&(t+="/ "===n?"".concat(n):"".concat(n," "))}})),t}function l(e){var t=e.split(""),n={};return t.map((function(e){return n[e]=i(e)})),n}t.a={isValidMorse:a,formatMorse:r,translateTextToMorse:i}},2:function(e,t,n){"use strict";n.d(t,"b",(function(){return T}));var o=n(11),a=new(window.AudioContext||window.webkitAudioContext),r=a.createOscillator(),i=new StereoPannerNode(a,{pan:0}),l=a.createGain();l.gain.setValueAtTime(Math.pow(.8,2),a.currentTime);var c,u,s,d,f=600,g=.0025,m=!1,p=!0,v=0,w=0,b=0,S=0,y=["sine","square","triangle"];k(15,18);var I=function(e,t){t?h(e,t):h(e)},h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(e=o.b(e),!1===m){m=!0,(r=a.createOscillator()).onended=function(){m=!1,void 0!==t&&t()};var n=a.currentTime;r.type=y[b],r.frequency.value=f;var I=a.createGain();I.gain.setValueAtTime(0,n),n+=.05,n+=v,e.split("").forEach((function(e){if(" "===e)n+=s;else if("/"===e)n+=d;else if("|"===e)n+=S;else{var t;switch(e){case".":t=c;break;case"-":t=u;break;default:t=0}I.gain.setValueAtTime(p?0:1,n),I.gain.linearRampToValueAtTime(1,n+g),n+=t,I.gain.setValueAtTime(p?1:0,n),I.gain.linearRampToValueAtTime(0,n+g),n+=c}})),n+=w,r.connect(I),I.connect(i),i.connect(l),l.connect(a.destination),r.start(),r.stop(n)}};function N(e){void 0!==e?(v="preDelay"in e?e.preDelay:0,w="postDelay"in e?e.postDelay:0,S="pipeDelay"in e?e.pipeDelay:0):v=w=S=0}function k(e,t){if(!(t<1||e<1)){t<e&&(t=e),u=3*(c=1.2/t);var n=(60*t-37.2*e)/(e*t);s=3*n/19-c,d=7*n/19-c,g=1/(t/18)*.0025}}function T(e){p=e}t.a={play:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;N(n),o.c(e)||(e=o.a.translateTextToMorse(e)),I(e,t)},playMorse:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;N(n),o.c(e)?I(e,t):t&&t()},playText:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;N(n),e=o.a.translateTextToMorse(e),I(e,t)},stop:function(){!0===m&&r.stop(a.currentTime)},setSpeed:k,setVolume:function(e){l.gain.setValueAtTime(Math.pow(e/100,2),a.currentTime)},setFrequency:function(e){f=e,r.frequency.value=f},setPanning:function(e){i.pan.value=e},setEnvelope:T,isPlaying:function(){return m},setWaveform:function(e){b=e,r.type=y[b]}}},20:function(e,t,n){"use strict";n.d(t,"e",(function(){return I})),n.d(t,"c",(function(){return h})),n.d(t,"d",(function(){return N})),n.d(t,"a",(function(){return T}));var o,a=n(0),r=n.n(a),i=n(2),l=n(30),c=n.n(l),u=n(31),s=n.n(u),d=n(32),f=n.n(d),g=[c.a,s.a,f.a],m=new(window.AudioContext||window.webkitAudioContext),p=parseFloat(Math.pow(window.localStorage.getItem("volume")/100,2)),v=parseFloat(Math.pow(window.localStorage.getItem("stereo")/100,2)),w=m.createGain();w.gain.value=p;var b=new StereoPannerNode(m,{pan:v});var S={playSound:function(e){o=new Audio(g[e]),m.createMediaElementSource(o).connect(w).connect(b).connect(m.destination),o.play()},setVolume:function(e){p=parseFloat(Math.pow(e/100,2)),w.gain.value=p},setPanning:function(e){var t=parseFloat(e/100);b.pan.value=t}},y=r.a.createContext({playing:!1,play:function(){},stop:function(){},setVolume:function(){},setFrequency:function(){},setSpeed:function(){},setPanning:function(){},isPlaying:function(){}});t.b=y;function I(e){return null===e||void 0===e||Number.isNaN(e)?70:e<0?0:e>100?100:Number(e)}function h(e){return null===e||void 0===e||Number.isNaN(e)?600:e<200?200:e>1200?1200:Number(e)}function N(e){return null===e||void 0===e||Number.isNaN(e)?0:e>100?100:e<-100?-100:Number(e)}function k(e){return null===(e=parseInt(e))||void 0===e||Number.isNaN(e)?0:e>2?2:e<0?0:e}function T(e){var t=I(window.localStorage.getItem("volume"));i.a.setVolume(t);var n=h(window.localStorage.getItem("frequency"));i.a.setFrequency(n);var o=h(window.localStorage.getItem("envelope"));i.a.setEnvelope(o);var a=k(parseInt(window.localStorage.getItem("waveform")));i.a.setWaveform(a);var l=function(e,t){i.a.setSpeed(parseInt(e),parseInt(t)),window.localStorage.setItem("overallSpeed",parseInt(e)),window.localStorage.setItem("charSpeed",parseInt(t))},c=function(){var e=parseInt(window.localStorage.getItem("overallSpeed"));(null===e||void 0===e||Number.isNaN(e))&&(e=parseInt(15));var t=parseInt(window.localStorage.getItem("charSpeed"));return(null===t||void 0===t||Number.isNaN(t))&&(t=parseInt(18)),[e,t]},u=c();l(u[0],u[1]);var s=function(){var e=parseInt(window.localStorage.getItem("charAmount"));return(null===e||void 0===e||Number.isNaN(e))&&(e=50),e},d=function(e){window.localStorage.setItem("charAmount",e)};d(s());var f=function(){var e=window.localStorage.getItem("preDelay");return(null===e||void 0===e||Number.isNaN(e))&&(e=.5),e},g=function(e){window.localStorage.setItem("preDelay",e)};g(f());var m=function(){var e=window.localStorage.getItem("postDelay");return(null===e||void 0===e||Number.isNaN(e))&&(e=2),e},p=function(e){window.localStorage.setItem("postDelay",e)};p(m());var v=function(){window.localStorage.getItem("randomSpacing");return"false"!==window.localStorage.getItem("randomSpacing")},w=function(e){window.localStorage.setItem("randomSpacing",e)};w(v());var b=function(){var e=parseInt(window.localStorage.getItem("charSpacing"));return(null===e||void 0===e||Number.isNaN(e))&&(e=10),e},N=function(e){window.localStorage.setItem("charSpacing",e)};N(b());var T=function(){var e=parseInt(window.localStorage.getItem("durationMode"));return(null===e||void 0===e||Number.isNaN(e))&&(e=0),e},x=function(e){window.localStorage.setItem("durationMode",e)};x(T());var E=function(){var e=parseFloat(window.localStorage.getItem("sessionTimeLimit"));return(null===e||void 0===e||Number.isNaN(e))&&(e=1),e},P=function(e){window.localStorage.setItem("sessionTimeLimit",e)};P(E());return r.a.createElement(y.Provider,{value:{play:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;i.a.play(e,t,n)},playText:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;i.a.playText(e,t,n)},stop:function(){i.a.stop()},setVolume:function(e){i.a.setVolume(e),S.setVolume(e)},setFrequency:function(e){i.a.setFrequency(e)},setPanning:function(e){var t=e/100;i.a.setPanning(t),S.setPanning(e)},setEnvelope:function(e){i.a.setEnvelope(e)},isPlaying:function(){return i.a.isPlaying()},setSpeed:l,getSpeed:c,getWaveform:function(){return k(window.localStorage.getItem("waveform"))},setWaveform:function(e){e=k(e),window.localStorage.setItem("waveform",e),i.a.setWaveform(e)},getPreDelay:f,setPreDelay:g,getPostDelay:m,setPostDelay:p,getSessionCharAmount:s,setSessionCharAmount:d,getRandomSpacing:v,setRandomSpacing:w,getCharSpacing:b,setCharSpacing:N,getDurationMode:T,setDurationMode:x,getSessionTimeLimit:E,setSessionTimeLimit:P,getProgressBar:function(){var e=window.localStorage.getItem("progressBar");return null!==e&&void 0!==e||(e="true"),"true"===e},setProgressBar:function(e){window.localStorage.setItem("progressBar",e)},getReviewSounds:function(){var e=window.localStorage.getItem("reviewSounds");return null!==e&&void 0!==e||(e="true"),"true"===e},setReviewSounds:function(e){window.localStorage.setItem("reviewSounds",e)},getSessionSource:function(){var e;return e=window.localStorage.getItem("sessionSource"),null===(e=parseInt(e))||void 0===e||Number.isNaN(e)?0:e>1?1:e<0?0:e},setSessionSource:function(e){window.localStorage.setItem("sessionSource",e)},getTextEntryString:function(){var e=window.localStorage.getItem("textEntryString");return null!==e&&void 0!==e||(e=""),e=e.toString().toLowerCase()},setTextEntryString:function(e){window.localStorage.setItem("textEntryString",e.toString().toLowerCase())},getFullTextMode:function(){var e=parseInt(window.localStorage.getItem("fullTextMode"));return(null===e||void 0===e||Number.isNaN(e)||e<0||e>1)&&(e=0),e},setFullTextMode:function(e){window.localStorage.setItem("fullTextMode",e)},getTextLineLimit:function(){var e=parseInt(window.localStorage.getItem("textLineLimit"));return(null===e||void 0===e||Number.isNaN(e)||e<1)&&(e=1),e},setTextLineLimit:function(e){window.localStorage.setItem("textLineLimit",parseInt(e))},getPipeDelay:function(){var e=parseFloat(window.localStorage.getItem("pipeDelay"));return(null===e||void 0===e||Number.isNaN(e)||e<=0)&&(e=1),e},setPipeDelay:function(e){window.localStorage.setItem("pipeDelay",parseFloat(e))},playReviewSound:function(e){S.playSound(e)}}},e.children)}},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var o=n(19),a=n(0),r=n.n(a),i=n(46),l=n(48),c=r.a.createContext({dark:!1,toggle:function(){}});function u(e){var t=Object(a.useState)(window.localStorage.getItem("darkTheme")),n=Object(o.a)(t,2),u=n[0],f=n[1],g=u?"dark":"light",m=Object(i.a)({palette:{primary:{main:"#3ea6ff",contrastText:"#fff"},text:{light:"#000",dark:"#fff"},type:g},typography:{fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),fontSize:12}});Object(a.useLayoutEffect)((function(){var e=window.localStorage.getItem("darkTheme");"true"===e&&(f(!0),p(d)),e&&"false"!==e||(f(!1),p(s))}),[u]);var p=function(e){document.getElementsByTagName("html")[0].style.cssText=e.join(";")};return r.a.createElement(c.Provider,{value:{dark:u,toggle:function(){document.getElementsByTagName("body")[0].style.cssText="transition: background .5s ease",f(!u),window.localStorage.setItem("darkTheme",!u)}}},r.a.createElement(l.a,{theme:m},e.children))}t.b=c;var s=["--border: rgba(0, 0, 0, 0.2);","--tooltip: rgba(60, 64, 67, 0.92);","--dropdownBG: #fff;","--prompt: rgba(0, 0, 0, 0.54);","--shadow: rgba(0, 0, 0, 0.13);","--shadow-2: rgba(0, 0, 0, 0.08);","--idle: rgba(0, 0, 0, 0.6);","--text: #000;","--textAlt: #222;","--inactive: rgba(0, 0, 0, 0.3);","--background: #fff;","--tlk-red: #ff082c;","--tlk-yellow: #ffdb08;","--tlk-green: #00d4b5;","--tlk-blue: #3ea6ff;","--tlk-dark-blue: #2980b9;","--tlk-purple: #9b59b6;","--tlk-orange: #fbc02d;","--tlk-gray: #546e7a;","--tlk-brand-1: #fff;","--tlk-brand-2: #fff;","--tlk-contrast: #000;","--session-background: #fff;","--home-shadow: rgba(0, 0, 0, 0.16);","--home-outline: rbga(255, 255, 255, 0);","--home-outline-idle: rbga(255, 255, 255, 0);","--home-icon: #444;","--mark-miss: #ffdb0877;","--mark-sub: #ff082c66;","--mark-extra: #ffdb0877;","--info-background: rgba(255, 255, 255, 0.65);","--logo-colour1: #3ea6ff;","--logo-colour2: #1abc9c;","--textBox: #fff;"],d=["--border: rgba(255, 255, 255, 0.14);","--tooltip: #303136;","--dropdownBG: #40424f;","--prompt: rgba(255, 255, 255, 0.7);","--idle: rgba(255, 255, 255, 0.6);","--text: #fff;","--textAlt: #eee;","--inactive: rgba(0, 0, 0, 0.3);","--background: #fff;","--tlk-red: #ff082c;","--tlk-yellow: #ffdb08;","--tlk-green: #00d4b5;","--tlk-blue: #3ea6ff;","--tlk-dark-blue: #2980b9;","--tlk-purple: #9b59b6;","--tlk-orange: #ff973e;","--tlk-gray: #546e7a;","--tlk-brand-1: #1c1d22;","--tlk-brand-2: #191a1f;","--tlk-contrast: #fff;","--session-background: #1f1f28;","--shadow: rgba(0, 0, 0, 0.39);","--shadow-2: rgba(0, 0, 0, 0.24);","--home-outline: #3498db;","--home-outline-idle: rbga(52, 152, 219, 0);","--home-icon: #ccc;","--mark-miss: #ffdb0877;","--mark-sub: #ff082c77;","--mark-extra: #ffdb08aa;","--info-background: #191a1f99;","--logo-colour1: #3ea6ff;","--logo-colour2: #9b59b6;","--textBox: #15161b;"]},30:function(e,t,n){e.exports=n.p+"static/media/Flawless.3cbe033e.mp3"},31:function(e,t,n){e.exports=n.p+"static/media/Good.ae0a113b.mp3"},32:function(e,t,n){e.exports=n.p+"static/media/NotGood.14e4aa62.mp3"},35:function(e,t,n){e.exports=n(47)},40:function(e,t,n){},41:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(21),i=n.n(r);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(40),n(41);var l=function(){return a.a.createElement("div",{className:"loading"},a.a.createElement("div",{className:"spinner"}),a.a.createElement("span",{className:"loadingLogo"}))},c=n(23),u=n(22),s=n(20),d=Object(o.lazy)((function(){return Promise.all([n.e(3),n.e(2)]).then(n.bind(null,226))}));i.a.render(a.a.createElement(u.a,null,a.a.createElement(o.Suspense,{fallback:a.a.createElement(l,null)},a.a.createElement(s.a,null,a.a.createElement(c.a,null,a.a.createElement(d,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[35,1,4]]]);
//# sourceMappingURL=main.0f8acead.chunk.js.map
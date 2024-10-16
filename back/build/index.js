(()=>{var e={694:(e,t,n)=>{"use strict";var a=n(925);function r(){}function l(){}l.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,l,o){if(o!==a){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:r};return n.PropTypes=n,n}},556:(e,t,n)=>{e.exports=n(694)()},925:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},941:(e,t,n)=>{e.exports=n(133)},656:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=(a=n(609))&&a.__esModule?a:{default:a},o=n(154),i=n(132),c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"buildURI",value:function(){return o.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,n=e.headers,a=e.separator,r=e.enclosingCharacter,l=e.uFEFF,o=e.target,i=e.specs,c=e.replace;this.state.page=window.open(this.buildURI(t,l,n,a,r),o,i,c)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(l.default.Component);c.defaultProps=Object.assign(i.defaultProps,{target:"_blank"}),c.propTypes=i.propTypes,t.default=c},968:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=(a=n(609))&&a.__esModule?a:{default:a},i=n(154),c=n(132),s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.buildURI=n.buildURI.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"buildURI",value:function(){return i.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var n=this.props,a=n.data,r=n.headers,l=n.separator,o=n.filename,c=n.enclosingCharacter,s=n.uFEFF,u=t&&"function"==typeof a?a():a,p=new Blob([s?"\ufeff":"",(0,i.toCSV)(u,r,l,c)]);return window.navigator.msSaveBlob(p,o),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(n){!1!==n?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"==typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.headers,l=t.separator,i=t.filename,c=t.uFEFF,s=t.children,u=(t.onClick,t.asyncOnClick,t.enclosingCharacter),p=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),d="undefined"==typeof window?"":this.buildURI(n,c,a,l,u);return o.default.createElement("a",r({download:i},p,{ref:function(t){return e.link=t},target:"_self",href:d,onClick:this.handleClick()}),s)}}]),t}(o.default.Component);s.defaultProps=c.defaultProps,s.propTypes=c.propTypes,t.default=s},154:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var r=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},l=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===(void 0===e?"undefined":n(e))&&!(e instanceof Array)}))},o=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},i=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(a(e),a(t)))}),[]))},c=t.jsons2arrays=function(e,t){var n=t=t||i(e),r=t;l(t)&&(n=t.map((function(e){return e.label})),r=t.map((function(e){return e.key})));var o=e.map((function(e){return r.map((function(t){return s(t,e)}))}));return[n].concat(a(o))},s=t.getHeaderValue=function(e,t){var n=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,n,a){var r=e[t];if(null!=r)return r;a.splice(1)}),t);return void 0===n?e in t?t[e]:"":n},u=t.elementOrEmpty=function(e){return null==e?"":e},p=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return u(e)})).map((function(e){return""+n+e+n})).join(t)})).join("\n")},d=t.arrays2csv=function(e,t,n,r){return p(t?[t].concat(a(e)):e,n,r)},m=t.jsons2csv=function(e,t,n,a){return p(c(e,t),n,a)},f=t.string2csv=function(e,t,n,a){return t?t.join(n)+"\n"+e:e.replace(/"/g,'""')},h=t.toCSV=function(e,t,n,a){if(l(e))return m(e,t,n,a);if(o(e))return d(e,t,n,a);if("string"==typeof e)return f(e,t,n);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,n,a,l){var o=h(e,n,a,l),i=r()?"application/csv":"text/csv",c=new Blob([t?"\ufeff":"",o],{type:i}),s="data:"+i+";charset=utf-8,"+(t?"\ufeff":"")+o,u=window.URL||window.webkitURL;return void 0===u.createObjectURL?s:u.createObjectURL(c)}},133:(e,t,n)=>{"use strict";t.CSVLink=void 0;var a=l(n(656)),r=l(n(968));function l(e){return e&&e.__esModule?e:{default:e}}a.default,t.CSVLink=r.default},132:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var a,r=((a=n(609))&&a.__esModule,n(556));t.propTypes={data:(0,r.oneOfType)([r.string,r.array,r.func]).isRequired,headers:r.array,target:r.string,separator:r.string,filename:r.string,uFEFF:r.bool,onClick:r.func,asyncOnClick:r.bool,enclosingCharacter:r.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]},609:e=>{"use strict";e.exports=window.React}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var l=t[a]={exports:{}};return e[a](l,l.exports,n),l.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(609);const t=window.wp.domReady;var a=n.n(t);const r=window.wp.element,l=window.ReactDOM;function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}var i;!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(i||(i={}));const c="popstate";function s(e,t){if(!1===e||null==e)throw new Error(t)}function u(e,t){if(!e){"undefined"!=typeof console&&console.warn(t);try{throw new Error(t)}catch(e){}}}function p(e,t){return{usr:e.state,key:e.key,idx:t}}function d(e,t,n,a){return void 0===n&&(n=null),o({pathname:"string"==typeof e?e:e.pathname,search:"",hash:""},"string"==typeof t?f(t):t,{state:n,key:t&&t.key||a||Math.random().toString(36).substr(2,8)})}function m(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),a&&"#"!==a&&(t+="#"===a.charAt(0)?a:"#"+a),t}function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}var h;function v(e,t,n){return void 0===n&&(n="/"),function(e,t,n,a){let r=N(("string"==typeof t?f(t):t).pathname||"/",n);if(null==r)return null;let l=y(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){return e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]))?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(l);let o=null;for(let e=0;null==o&&e<l.length;++e){let t=P(r);o=k(l[e],t,a)}return o}(e,t,n,!1)}function y(e,t,n,a){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===a&&(a="");let r=(e,r,l)=>{let o={relativePath:void 0===l?e.path||"":l,caseSensitive:!0===e.caseSensitive,childrenIndex:r,route:e};o.relativePath.startsWith("/")&&(s(o.relativePath.startsWith(a),'Absolute route path "'+o.relativePath+'" nested under path "'+a+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),o.relativePath=o.relativePath.slice(a.length));let i=U([a,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(s(!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+i+'".'),y(e.children,t,c,i)),(null!=e.path||e.index)&&t.push({path:i,score:O(i,e.index),routesMeta:c})};return e.forEach(((e,t)=>{var n;if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let n of g(e.path))r(e,t,n);else r(e,t)})),t}function g(e){let t=e.split("/");if(0===t.length)return[];let[n,...a]=t,r=n.endsWith("?"),l=n.replace(/\?$/,"");if(0===a.length)return r?[l,""]:[l];let o=g(a.join("/")),i=[];return i.push(...o.map((e=>""===e?l:[l,e].join("/")))),r&&i.push(...o),i.map((t=>e.startsWith("/")&&""===t?"/":t))}!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(h||(h={})),new Set(["lazy","caseSensitive","path","id","index","children"]);const E=/^:[\w-]+$/,b=3,_=2,w=1,C=10,x=-2,S=e=>"*"===e;function O(e,t){let n=e.split("/"),a=n.length;return n.some(S)&&(a+=x),t&&(a+=_),n.filter((e=>!S(e))).reduce(((e,t)=>e+(E.test(t)?b:""===t?w:C)),a)}function k(e,t,n){void 0===n&&(n=!1);let{routesMeta:a}=e,r={},l="/",o=[];for(let e=0;e<a.length;++e){let i=a[e],c=e===a.length-1,s="/"===l?t:t.slice(l.length)||"/",u=R({path:i.relativePath,caseSensitive:i.caseSensitive,end:c},s),p=i.route;if(!u&&c&&n&&!a[a.length-1].route.index&&(u=R({path:i.relativePath,caseSensitive:i.caseSensitive,end:!1},s)),!u)return null;Object.assign(r,u.params),o.push({params:r,pathname:U([l,u.pathname]),pathnameBase:L(U([l,u.pathnameBase])),route:p}),"/"!==u.pathnameBase&&(l=U([l,u.pathnameBase]))}return o}function R(e,t){"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!0),u("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(a.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));return e.endsWith("*")?(a.push({paramName:"*"}),r+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":""!==e&&"/"!==e&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let l=r[0],o=l.replace(/(.)\/+$/,"$1"),i=r.slice(1);return{params:a.reduce(((e,t,n)=>{let{paramName:a,isOptional:r}=t;if("*"===a){let e=i[n]||"";o=l.slice(0,l.length-e.length).replace(/(.)\/+$/,"$1")}const c=i[n];return e[a]=r&&!c?void 0:(c||"").replace(/%2F/g,"/"),e}),{}),pathname:l,pathnameBase:o,pattern:e}}function P(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return u(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}function N(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&"/"!==a?null:e.slice(n)||"/"}function j(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}function T(e,t){let n=function(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}(e);return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}function F(e,t,n,a){let r;void 0===a&&(a=!1),"string"==typeof e?r=f(e):(r=o({},e),s(!r.pathname||!r.pathname.includes("?"),j("?","pathname","search",r)),s(!r.pathname||!r.pathname.includes("#"),j("#","pathname","hash",r)),s(!r.search||!r.search.includes("#"),j("#","search","hash",r)));let l,i=""===e||""===r.pathname,c=i?"/":r.pathname;if(null==c)l=n;else{let e=t.length-1;if(!a&&c.startsWith("..")){let t=c.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}l=e>=0?t[e]:"/"}let u=function(e,t){void 0===t&&(t="/");let{pathname:n,search:a="",hash:r=""}="string"==typeof e?f(e):e,l=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:l,search:A(a),hash:D(r)}}(r,l),p=c&&"/"!==c&&c.endsWith("/"),d=(i||"."===c)&&n.endsWith("/");return u.pathname.endsWith("/")||!p&&!d||(u.pathname+="/"),u}const U=e=>e.join("/").replace(/\/\/+/g,"/"),L=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),A=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",D=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";Error;const B=["post","put","patch","delete"],M=(new Set(B),["get",...B]);function W(){return W=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},W.apply(this,arguments)}new Set(M),new Set([301,302,303,307,308]),new Set([307,308]),Symbol("deferred");const I=e.createContext(null),$=e.createContext(null),V=e.createContext(null),H=e.createContext(null),J=e.createContext({outlet:null,matches:[],isDataRoute:!1}),z=e.createContext(null);function K(){return null!=e.useContext(H)}function X(){return K()||s(!1),e.useContext(H).location}function q(t){e.useContext(V).static||e.useLayoutEffect(t)}function Y(){let{isDataRoute:t}=e.useContext(J);return t?function(){let{router:t}=function(){let t=e.useContext(I);return t||s(!1),t}(ae.UseNavigateStable),n=le(re.UseNavigateStable),a=e.useRef(!1);return q((()=>{a.current=!0})),e.useCallback((function(e,r){void 0===r&&(r={}),a.current&&("number"==typeof e?t.navigate(e):t.navigate(e,W({fromRouteId:n},r)))}),[t,n])}():function(){K()||s(!1);let t=e.useContext(I),{basename:n,future:a,navigator:r}=e.useContext(V),{matches:l}=e.useContext(J),{pathname:o}=X(),i=JSON.stringify(T(l,a.v7_relativeSplatPath)),c=e.useRef(!1);return q((()=>{c.current=!0})),e.useCallback((function(e,a){if(void 0===a&&(a={}),!c.current)return;if("number"==typeof e)return void r.go(e);let l=F(e,JSON.parse(i),o,"path"===a.relative);null==t&&"/"!==n&&(l.pathname="/"===l.pathname?n:U([n,l.pathname])),(a.replace?r.replace:r.push)(l,a.state,a)}),[n,r,i,o,t])}()}function G(t,n){let{relative:a}=void 0===n?{}:n,{future:r}=e.useContext(V),{matches:l}=e.useContext(J),{pathname:o}=X(),i=JSON.stringify(T(l,r.v7_relativeSplatPath));return e.useMemo((()=>F(t,JSON.parse(i),o,"path"===a)),[t,i,o,a])}function Q(t,n,a,r){K()||s(!1);let{navigator:l}=e.useContext(V),{matches:o}=e.useContext(J),c=o[o.length-1],u=c?c.params:{},p=(c&&c.pathname,c?c.pathnameBase:"/");c&&c.route;let d,m=X();if(n){var h;let e="string"==typeof n?f(n):n;"/"===p||(null==(h=e.pathname)?void 0:h.startsWith(p))||s(!1),d=e}else d=m;let y=d.pathname||"/",g=y;if("/"!==p){let e=p.replace(/^\//,"").split("/");g="/"+y.replace(/^\//,"").split("/").slice(e.length).join("/")}let E=v(t,{pathname:g}),b=function(t,n,a,r){var l;if(void 0===n&&(n=[]),void 0===a&&(a=null),void 0===r&&(r=null),null==t){var o;if(!a)return null;if(a.errors)t=a.matches;else{if(!(null!=(o=r)&&o.v7_partialHydration&&0===n.length&&!a.initialized&&a.matches.length>0))return null;t=a.matches}}let i=t,c=null==(l=a)?void 0:l.errors;if(null!=c){let e=i.findIndex((e=>e.route.id&&void 0!==(null==c?void 0:c[e.route.id])));e>=0||s(!1),i=i.slice(0,Math.min(i.length,e+1))}let u=!1,p=-1;if(a&&r&&r.v7_partialHydration)for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(p=e),t.route.id){let{loaderData:e,errors:n}=a,r=t.route.loader&&void 0===e[t.route.id]&&(!n||void 0===n[t.route.id]);if(t.route.lazy||r){u=!0,i=p>=0?i.slice(0,p+1):[i[0]];break}}}return i.reduceRight(((t,r,l)=>{let o,s=!1,d=null,m=null;var f;a&&(o=c&&r.route.id?c[r.route.id]:void 0,d=r.route.errorElement||ee,u&&(p<0&&0===l?(oe[f="route-fallback"]||(oe[f]=!0),s=!0,m=null):p===l&&(s=!0,m=r.route.hydrateFallbackElement||null)));let h=n.concat(i.slice(0,l+1)),v=()=>{let n;return n=o?d:s?m:r.route.Component?e.createElement(r.route.Component,null):r.route.element?r.route.element:t,e.createElement(ne,{match:r,routeContext:{outlet:t,matches:h,isDataRoute:null!=a},children:n})};return a&&(r.route.ErrorBoundary||r.route.errorElement||0===l)?e.createElement(te,{location:a.location,revalidation:a.revalidation,component:d,error:o,children:v(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):v()}),null)}(E&&E.map((e=>Object.assign({},e,{params:Object.assign({},u,e.params),pathname:U([p,l.encodeLocation?l.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?p:U([p,l.encodeLocation?l.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),o,a,r);return n&&b?e.createElement(H.Provider,{value:{location:W({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:i.Pop}},b):b}function Z(){let t=function(){var t;let n=e.useContext(z),a=function(){let t=e.useContext($);return t||s(!1),t}(re.UseRouteError),r=le(re.UseRouteError);return void 0!==n?n:null==(t=a.errors)?void 0:t[r]}(),n=function(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"boolean"==typeof e.internal&&"data"in e}(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),a=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return e.createElement(e.Fragment,null,e.createElement("h2",null,"Unexpected Application Error!"),e.createElement("h3",{style:{fontStyle:"italic"}},n),a?e.createElement("pre",{style:r},a):null,null)}const ee=e.createElement(Z,null);class te extends e.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?e.createElement(J.Provider,{value:this.props.routeContext},e.createElement(z.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ne(t){let{routeContext:n,match:a,children:r}=t,l=e.useContext(I);return l&&l.static&&l.staticContext&&(a.route.errorElement||a.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=a.route.id),e.createElement(J.Provider,{value:n},r)}var ae=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ae||{}),re=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(re||{});function le(t){let n=function(){let t=e.useContext(J);return t||s(!1),t}(),a=n.matches[n.matches.length-1];return a.route.id||s(!1),a.route.id}const oe={};function ie(e){s(!1)}function ce(t){let{basename:n="/",children:a=null,location:r,navigationType:l=i.Pop,navigator:o,static:c=!1,future:u}=t;K()&&s(!1);let p=n.replace(/^\/*/,"/"),d=e.useMemo((()=>({basename:p,navigator:o,static:c,future:W({v7_relativeSplatPath:!1},u)})),[p,u,o,c]);"string"==typeof r&&(r=f(r));let{pathname:m="/",search:h="",hash:v="",state:y=null,key:g="default"}=r,E=e.useMemo((()=>{let e=N(m,p);return null==e?null:{location:{pathname:e,search:h,hash:v,state:y,key:g},navigationType:l}}),[p,m,h,v,y,g,l]);return null==E?null:e.createElement(V.Provider,{value:d},e.createElement(H.Provider,{children:a,value:E}))}function se(e){let{children:t,location:n}=e;return Q(ue(t),n)}function ue(t,n){void 0===n&&(n=[]);let a=[];return e.Children.forEach(t,((t,r)=>{if(!e.isValidElement(t))return;let l=[...n,r];if(t.type===e.Fragment)return void a.push.apply(a,ue(t.props.children,l));t.type!==ie&&s(!1),t.props.index&&t.props.children&&s(!1);let o={id:t.props.id||l.join("-"),caseSensitive:t.props.caseSensitive,element:t.props.element,Component:t.props.Component,index:t.props.index,path:t.props.path,loader:t.props.loader,action:t.props.action,errorElement:t.props.errorElement,ErrorBoundary:t.props.ErrorBoundary,hasErrorBoundary:null!=t.props.ErrorBoundary||null!=t.props.errorElement,shouldRevalidate:t.props.shouldRevalidate,handle:t.props.handle,lazy:t.props.lazy};t.props.children&&(o.children=ue(t.props.children,l)),a.push(o)})),a}function pe(){return pe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},pe.apply(this,arguments)}function de(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}e.startTransition,new Promise((()=>{})),e.Component,new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const me=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],fe=["aria-current","caseSensitive","className","end","style","to","unstable_viewTransition","children"];try{window.__reactRouterVersion="6"}catch(e){}const he=e.createContext({isTransitioning:!1});new Map;const ve=e.startTransition;function ye(t){let{basename:n,children:a,future:r,window:l}=t,u=e.useRef();var f;null==u.current&&(u.current=(void 0===(f={window:l,v5Compat:!0})&&(f={}),function(e,t,n,a){void 0===a&&(a={});let{window:r=document.defaultView,v5Compat:l=!1}=a,u=r.history,f=i.Pop,h=null,v=y();function y(){return(u.state||{idx:null}).idx}function g(){f=i.Pop;let e=y(),t=null==e?null:e-v;v=e,h&&h({action:f,location:b.location,delta:t})}function E(e){let t="null"!==r.location.origin?r.location.origin:r.location.href,n="string"==typeof e?e:m(e);return n=n.replace(/ $/,"%20"),s(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}null==v&&(v=0,u.replaceState(o({},u.state,{idx:v}),""));let b={get action(){return f},get location(){return e(r,u)},listen(e){if(h)throw new Error("A history only accepts one active listener");return r.addEventListener(c,g),h=e,()=>{r.removeEventListener(c,g),h=null}},createHref:e=>t(r,e),createURL:E,encodeLocation(e){let t=E(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){f=i.Push;let a=d(b.location,e,t);n&&n(a,e),v=y()+1;let o=p(a,v),c=b.createHref(a);try{u.pushState(o,"",c)}catch(e){if(e instanceof DOMException&&"DataCloneError"===e.name)throw e;r.location.assign(c)}l&&h&&h({action:f,location:b.location,delta:1})},replace:function(e,t){f=i.Replace;let a=d(b.location,e,t);n&&n(a,e),v=y();let r=p(a,v),o=b.createHref(a);u.replaceState(r,"",o),l&&h&&h({action:f,location:b.location,delta:0})},go:e=>u.go(e)};return b}((function(e,t){let{pathname:n,search:a,hash:r}=e.location;return d("",{pathname:n,search:a,hash:r},t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"==typeof t?t:m(t)}),null,f)));let h=u.current,[v,y]=e.useState({action:h.action,location:h.location}),{v7_startTransition:g}=r||{},E=e.useCallback((e=>{g&&ve?ve((()=>y(e))):y(e)}),[y,g]);return e.useLayoutEffect((()=>h.listen(E)),[h,E]),e.createElement(ce,{basename:n,children:a,location:v.location,navigationType:v.action,navigator:h,future:r})}l.flushSync,e.useId;const ge="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,Ee=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,be=e.forwardRef((function(t,n){let a,{onClick:r,relative:l,reloadDocument:o,replace:i,state:c,target:u,to:p,preventScrollReset:d,unstable_viewTransition:f}=t,h=de(t,me),{basename:v}=e.useContext(V),y=!1;if("string"==typeof p&&Ee.test(p)&&(a=p,ge))try{let e=new URL(window.location.href),t=p.startsWith("//")?new URL(e.protocol+p):new URL(p),n=N(t.pathname,v);t.origin===e.origin&&null!=n?p=n+t.search+t.hash:y=!0}catch(e){}let g=function(t,n){let{relative:a}=void 0===n?{}:n;K()||s(!1);let{basename:r,navigator:l}=e.useContext(V),{hash:o,pathname:i,search:c}=G(t,{relative:a}),u=i;return"/"!==r&&(u="/"===i?r:U([r,i])),l.createHref({pathname:u,search:c,hash:o})}(p,{relative:l}),E=function(t,n){let{target:a,replace:r,state:l,preventScrollReset:o,relative:i,unstable_viewTransition:c}=void 0===n?{}:n,s=Y(),u=X(),p=G(t,{relative:i});return e.useCallback((e=>{if(function(e,t){return!(0!==e.button||t&&"_self"!==t||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e))}(e,a)){e.preventDefault();let n=void 0!==r?r:m(u)===m(p);s(t,{replace:n,state:l,preventScrollReset:o,relative:i,unstable_viewTransition:c})}}),[u,s,p,r,l,a,t,o,i,c])}(p,{replace:i,state:c,target:u,preventScrollReset:d,relative:l,unstable_viewTransition:f});return e.createElement("a",pe({},h,{href:a||g,onClick:y||o?r:function(e){r&&r(e),e.defaultPrevented||E(e)},ref:n,target:u}))})),_e=e.forwardRef((function(t,n){let{"aria-current":a="page",caseSensitive:r=!1,className:l="",end:o=!1,style:i,to:c,unstable_viewTransition:u,children:p}=t,d=de(t,fe),m=G(c,{relative:d.relative}),f=X(),h=e.useContext($),{navigator:v,basename:y}=e.useContext(V),g=null!=h&&function(t,n){void 0===n&&(n={});let a=e.useContext(he);null==a&&s(!1);let{basename:r}=function(){let t=e.useContext(I);return t||s(!1),t}(we.useViewTransitionState),l=G(t,{relative:n.relative});if(!a.isTransitioning)return!1;let o=N(a.currentLocation.pathname,r)||a.currentLocation.pathname,i=N(a.nextLocation.pathname,r)||a.nextLocation.pathname;return null!=R(l.pathname,i)||null!=R(l.pathname,o)}(m)&&!0===u,E=v.encodeLocation?v.encodeLocation(m).pathname:m.pathname,b=f.pathname,_=h&&h.navigation&&h.navigation.location?h.navigation.location.pathname:null;r||(b=b.toLowerCase(),_=_?_.toLowerCase():null,E=E.toLowerCase()),_&&y&&(_=N(_,y)||_);const w="/"!==E&&E.endsWith("/")?E.length-1:E.length;let C,x=b===E||!o&&b.startsWith(E)&&"/"===b.charAt(w),S=null!=_&&(_===E||!o&&_.startsWith(E)&&"/"===_.charAt(E.length)),O={isActive:x,isPending:S,isTransitioning:g},k=x?a:void 0;C="function"==typeof l?l(O):[l,x?"active":null,S?"pending":null,g?"transitioning":null].filter(Boolean).join(" ");let P="function"==typeof i?i(O):i;return e.createElement(be,pe({},d,{"aria-current":k,className:C,ref:n,style:P,to:c,unstable_viewTransition:u}),"function"==typeof p?p(O):p)}));var we,Ce;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(we||(we={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(Ce||(Ce={}));const xe=()=>(0,e.createElement)("div",{className:"header_back"},(0,e.createElement)(_e,{to:"/adhesions",className:({isActive:e})=>e?"active":"link_menu"},"Adhesions"),(0,e.createElement)(_e,{to:"/tarifs",className:({isActive:e})=>e?"active":"link_menu"},"Tarifs")),Se=()=>(0,e.createElement)("h2",null,"Home"),Oe=t=>{const[n,a]=(()=>{const t=the_ajax_script.rootUrl+"back-helloasso/v1/set_tarifs",[n,a]=(0,e.useState)();return[n,function(e=""){const n=new FormData;n.append("nonce",the_ajax_script.nonce),n.append("data",JSON.stringify(e)),fetch(t,{method:"POST",body:n,headers:{"X-WP-Nonce":the_ajax_script.rootNonce}}).then((e=>e.json())).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}]})(),[r,l]=(0,e.useState)(!1),{item:o}=t,[i,c]=(0,e.useState)({id:o.id,titre:o.titre,type_licence:o.type_licence,descriptif:o.descriptif,plein_tarif:o.plein_tarif,demi_tarif:o.demi_tarif,secteur:o.secteur});return(0,e.createElement)(e.Fragment,null,r?(0,e.createElement)("div",{className:"module_tarifs"},(0,e.createElement)("h4",null,i.titre),(0,e.createElement)("form",{onSubmit:e=>{e.preventDefault();const t=new FormData(e.target),n=Object.fromEntries(t);n.descriptif==i.descriptif&&n.plein_tarif==i.plein_tarif&&n.demi_tarif==i.demi_tarif||(console.log("Y a une différence...on Update"),a(n),c(n)),l(!1)}},(0,e.createElement)("input",{type:"hidden",name:"id",value:i.id}),(0,e.createElement)("input",{type:"hidden",name:"titre",value:i.titre}),(0,e.createElement)("input",{type:"hidden",name:"type_licence",value:i.type_licence}),(0,e.createElement)("input",{type:"hidden",name:"secteur",value:i.secteur}),(0,e.createElement)("label",null,(0,e.createElement)("span",null,"Description:"),(0,e.createElement)("input",{type:"text",name:"descriptif",defaultValue:i.descriptif})),(0,e.createElement)("p",null,"ATTENTION!! les tarifs doivent être en centimes..."),(0,e.createElement)("label",null,(0,e.createElement)("span",null,"Plein tarif:"),(0,e.createElement)("input",{type:"text",name:"plein_tarif",defaultValue:i.plein_tarif})),"options"!=i.secteur?(0,e.createElement)("label",null,(0,e.createElement)("span",null,"Demi tarif:"),(0,e.createElement)("input",{type:"text",name:"demi_tarif",defaultValue:i.demi_tarif})):"",(0,e.createElement)("div",{className:"nav_bottom"},(0,e.createElement)("button",{type:"submit",className:"bt_valider_modif"},"✔ Valider")))):(0,e.createElement)("div",{className:"module_tarifs"},(0,e.createElement)("h4",null,i.titre),(0,e.createElement)("span",null,(0,e.createElement)("b",null,i.descriptif)),i.type_licence?(0,e.createElement)("span",null,"Type d'adhésion: ",(0,e.createElement)("b",null,i.type_licence)):"",(0,e.createElement)("span",null,"Plein tarif: ",(0,e.createElement)("b",null,i.plein_tarif/100,"€")),"options"!=i.secteur?(0,e.createElement)("span",null,"Demi tarif: ",(0,e.createElement)("b",null,i.demi_tarif/100,"€")):"",(0,e.createElement)("div",{className:"nav_bottom"},(0,e.createElement)("button",{type:"button",className:"bt_modifier",onClick:e=>{l(!0)}},"Modifier"))))},ke=t=>{const{tarifs:n}=t,[a,r]=(0,e.useState)(n);return(0,e.createElement)(e.Fragment,null,a.map(((t,n)=>(0,e.createElement)(Oe,{key:`${t.secteur}-${t.id}`,item:t}))))},Re=()=>(0,e.createElement)("div",{className:"hello_loader"}),Pe=()=>{const[t,n]=(()=>{const t=the_ajax_script.rootUrl+"back-helloasso/v1/get_tarifs",[n,a]=(0,e.useState)();return[n,function(){console.log(t);const e=new FormData;e.append("nonce",the_ajax_script.nonce),fetch(t,{method:"POST",body:e,headers:{"X-WP-Nonce":the_ajax_script.rootNonce}}).then((e=>e.json())).then((e=>{a(e)})).catch((e=>{console.log(e)}))}]})();return(0,e.useEffect)((()=>{t?console.log(t):n()}),[t]),(0,e.createElement)("div",null,(0,e.createElement)("h1",null,"Tarifs Adhésions au Club"),(0,e.createElement)("div",{className:"content_tarifs"},t?.cotisations?(0,e.createElement)(ke,{tarifs:t.cotisations}):(0,e.createElement)(Re,null)),(0,e.createElement)("h1",null,"Tarifs FFME"),(0,e.createElement)("div",{className:"content_tarifs"},t?.cotisations?(0,e.createElement)(ke,{tarifs:t.ffme}):(0,e.createElement)(Re,null)),(0,e.createElement)("h1",null,"Tarifs options FFME"),(0,e.createElement)("div",{className:"content_tarifs"},t?.ffme_options?(0,e.createElement)(ke,{tarifs:t.ffme_options}):(0,e.createElement)(Re,null)),(0,e.createElement)("h1",null,"Tarifs FFR"),(0,e.createElement)("div",{className:"content_tarifs"},t?.cotisations?(0,e.createElement)(ke,{tarifs:t.ffr}):(0,e.createElement)(Re,null)))};var Ne=n(941);const je=t=>{const{dates:n,clients:a,handelClients:r}=t,[l,o]=(0,e.useState)(0),i=(0,e.useRef)(null),[c,s]=(0,e.useState)([]);return console.log(a.adherents),(0,e.useEffect)((()=>{c.length>0&&i.current.link.click()}),[c]),(0,e.createElement)("div",{className:"navig_dates"},(0,e.createElement)("select",{onChange:e=>{const{value:t}=e.target,n=t.split("-");r(n[0],n[1])}},n?n.map(((t,n)=>(0,e.createElement)("option",{key:n,selected:t.checked,value:t.value},t.option))):""),(0,e.createElement)("button",{onClick:e=>{let t=[["firstname","lastname","email","cotisation","cotisation_tarif","mur","soutien","licence","licence_tarif"]],n=[];a.adherents.map(((e,a)=>{n=[e.metas.metadata.payer.lastName,e.metas.metadata.payer.firstName,e.metas.metadata.payer.email,e.metas.metadata.cotisation,e.metas.metadata.tarif_cotisation/100,e.metas.metadata.mur/100,e.metas.metadata.soutien/100,e.metas.metadata.type_licence,e.metas.metadata.tarif_licence/100],t.push(n)})),s(t)},className:"export_csv"},"Export en CSV"),(0,e.createElement)(Ne.CSVLink,{data:c,ref:i,filename:"export_clients.csv",target:"_blank",className:"hidde"}))},Te=t=>{const{famille_adulte:n,famille_enfant:a,famille_supp:r}=t;return(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Liste des membres"),(0,e.createElement)("span",null,n.firstName," ",n.lastName),(0,e.createElement)("span",null,a.firstName," ",a.lastName),r.map(((t,n)=>(0,e.createElement)("span",null,t.firstName," ",t.lastName," "))))},Fe=t=>(0,e.createElement)(e.Fragment,null,""!=t.type_licence?(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Licence / Assurance"),(0,e.createElement)("span",null,"Licence: ",(0,e.createElement)("b",null,t.type_licence)),(0,e.createElement)("span",null,"Type: ",(0,e.createElement)("b",null,t.licence_famille)),(0,e.createElement)("span",null,"Prix: ",(0,e.createElement)("b",null,t.tarif_licence/100," €"))),(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Options"),t.options_ffme.map(((t,n)=>t.checked&&(0,e.createElement)("span",null,t.titre,": ",(0,e.createElement)("b",null,t.plein_tarif/100," €")))))):(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Licence / Assurance")),(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Options")))),Ue=t=>{const{metadata:n}=t.metas;return(0,e.createElement)("div",{key:t.id,className:"ligne_client"},(0,e.createElement)("div",{className:"cellule_titre"},(0,e.createElement)("h2",null,t.metas.metadata?.payer.lastName," - ",t.metas.metadata?.payer.firstName),(0,e.createElement)("span",null,"Date du paiement: ",t.date_create),(0,e.createElement)("span",{className:"cellule_statut"},"Statut du paiement: ",(0,e.createElement)("b",null,t.statut))),(0,e.createElement)("div",{className:"contant_cellules"},(0,e.createElement)("div",{className:"cellule_client"},(0,e.createElement)("h4",null,"Cotisation club"),(0,e.createElement)("span",null,"Cotisation club: ",(0,e.createElement)("b",null,t.metas.metadata?.cotisation)),(0,e.createElement)("span",null,"Type: ",(0,e.createElement)("b",null,t.metas.metadata?.cotisation_famille)),(0,e.createElement)("span",null,"Prix: ",(0,e.createElement)("b",null,t.metas.metadata.tarif_cotisation/100," €")),(0,e.createElement)("span",null,"Mur d'escalade: ",(0,e.createElement)("b",null,t.metas.metadata.mur/100," €")),(0,e.createElement)("span",null,"Soutien: ",(0,e.createElement)("b",null,t.metas.metadata.soutien/100," €"))),(0,e.createElement)(Te,{...n}),(0,e.createElement)(Fe,{...n})))},Le=()=>{const[t,n]=(()=>{const t=the_ajax_script.rootUrl+"back-helloasso/v1/get_clients",[n,a]=(0,e.useState)();return[n,function(e="",n=""){a([]);const r=new FormData;r.append("nonce",the_ajax_script.nonce),r.append("year",e),r.append("month",n),fetch(t,{method:"POST",body:r,headers:{"X-WP-Nonce":the_ajax_script.rootNonce}}).then((e=>e.json())).then((e=>{a(e)})).catch((e=>{console.log(e)}))}]})();return(0,e.useEffect)((()=>{t?console.log("Adhésions page",t.adherents):n()}),[t]),(0,e.createElement)("div",{className:"hello_content_clients"},(0,e.createElement)("h1",null,"ADHESIONS"),t?.dates?(0,e.createElement)(je,{dates:t.dates,clients:t,handelClients:n}):"",t?.adherents?t.adherents.map(((t,n)=>(0,e.createElement)(Ue,{...t}))):(0,e.createElement)(Re,null))},Ae=()=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)(xe,null),(0,e.createElement)(se,null,(0,e.createElement)(ie,{exact:!0,path:"/",element:(0,e.createElement)(Se,null)}),(0,e.createElement)(ie,{exact:!0,path:"/tarifs",element:(0,e.createElement)(Pe,null)}),(0,e.createElement)(ie,{exact:!0,path:"/adhesions",element:(0,e.createElement)(Le,null)}),(0,e.createElement)(ie,{exact:!0,path:"*",element:(0,e.createElement)(Se,null)})));a()((()=>{(0,r.createRoot)(document.getElementById("admin_hello")).render((0,e.createElement)(ye,{basename:"/wp-admin"},(0,e.createElement)(Ae,null)))}))})()})();
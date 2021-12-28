var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function i(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let r,l;function a(e,t){return r||(r=document.createElement("a")),r.href=t,e===r.href}function c(e,t,n,s){if(e){const i=u(e,t,n,s);return e[0](i)}}function u(e,t,n,s){return e[1]&&s?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](s(t))):n.ctx}function d(e,t,n,s){if(e[2]&&s){const i=e[2](s(n));if(void 0===t.dirty)return i;if("object"==typeof i){const e=[],n=Math.max(t.dirty.length,i.length);for(let s=0;s<n;s+=1)e[s]=t.dirty[s]|i[s];return e}return t.dirty|i}return t.dirty}function f(e,t,n,s,i,o){if(i){const r=u(t,n,s,o);e.p(r,i)}}function g(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function h(e,t){e.appendChild(t)}function p(e,t,n){e.insertBefore(t,n||null)}function m(e){e.parentNode.removeChild(e)}function v(e){return document.createElement(e)}function $(e){return document.createTextNode(e)}function b(){return $(" ")}function w(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function y(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function _(e){l=e}const k=[],x=[],j=[],B=[],C=Promise.resolve();let T=!1;function M(e){j.push(e)}let A=!1;const R=new Set;function E(){if(!A){A=!0;do{for(let e=0;e<k.length;e+=1){const t=k[e];_(t),H(t.$$)}for(_(null),k.length=0;x.length;)x.pop()();for(let e=0;e<j.length;e+=1){const t=j[e];R.has(t)||(R.add(t),t())}j.length=0}while(k.length);for(;B.length;)B.pop()();T=!1,A=!1,R.clear()}}function H(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}const P=new Set;let L;function q(e,t){e&&e.i&&(P.delete(e),e.i(t))}function S(e,t,n,s){if(e&&e.o){if(P.has(e))return;P.add(e),L.c.push((()=>{P.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}}function z(e){e&&e.c()}function U(e,n,o,r){const{fragment:l,on_mount:a,on_destroy:c,after_update:u}=e.$$;l&&l.m(n,o),r||M((()=>{const n=a.map(t).filter(i);c?c.push(...n):s(n),e.$$.on_mount=[]})),u.forEach(M)}function D(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function N(e,t){-1===e.$$.dirty[0]&&(k.push(e),T||(T=!0,C.then(E)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function W(t,i,o,r,a,c,u,d=[-1]){const f=l;_(t);const g=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:i.target||f.$$.root};u&&u(g.root);let h=!1;if(g.ctx=o?o(t,i.props||{},((e,n,...s)=>{const i=s.length?s[0]:n;return g.ctx&&a(g.ctx[e],g.ctx[e]=i)&&(!g.skip_bound&&g.bound[e]&&g.bound[e](i),h&&N(t,e)),n})):[],g.update(),h=!0,s(g.before_update),g.fragment=!!r&&r(g.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);g.fragment&&g.fragment.l(e),e.forEach(m)}else g.fragment&&g.fragment.c();i.intro&&q(t.$$.fragment),U(t,i.target,i.anchor,i.customElement),E()}_(f)}class V{$destroy(){D(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function O(t){let n,s,o,r,l,c,u;return{c(){n=v("section"),s=v("img"),r=b(),l=v("div"),l.innerHTML='<h1 class="svelte-fn4sf6"><a href="https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&amp;recruiter=26187358&amp;utm_source=share_petition&amp;utm_medium=copylink&amp;utm_campaign=share_petition" class="svelte-fn4sf6">Sign the Petition</a></h1> \n        <h1 class="svelte-fn4sf6"><a href="#meetings" class="svelte-fn4sf6">Attend a Council Meeting</a></h1>',y(s,"class","x-button svelte-fn4sf6"),a(s.src,o="assets/img/x_icon.png")||y(s,"src","assets/img/x_icon.png"),y(s,"alt","close menu"),y(l,"class","svelte-fn4sf6"),y(n,"class","svelte-fn4sf6")},m(e,o){p(e,n,o),h(n,s),h(n,r),h(n,l),c||(u=w(s,"click",(function(){i(t[0])&&t[0].apply(this,arguments)})),c=!0)},p(e,[n]){t=e},i:e,o:e,d(e){e&&m(n),c=!1,u()}}}function I(e,t,n){let{dismiss:s}=t;return e.$$set=e=>{"dismiss"in e&&n(0,s=e.dismiss)},[s]}class Y extends V{constructor(e){super(),W(this,e,I,O,o,{dismiss:0})}}function F(t){let n,s,i,o;return{c(){n=v("img"),a(n.src,s="assets/img/hamburger_icon.svg")||y(n,"src","assets/img/hamburger_icon.svg"),y(n,"alt","menu")},m(e,s){p(e,n,s),i||(o=w(n,"click",t[2]),i=!0)},p:e,d(e){e&&m(n),i=!1,o()}}}function G(t){let n;return{c(){n=v("div"),n.innerHTML='<h2 class="nav-button svelte-klws3g"><a href="https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&amp;recruiter=26187358&amp;utm_source=share_petition&amp;utm_medium=copylink&amp;utm_campaign=share_petition" class="svelte-klws3g">Sign the Petition</a></h2> \n\t\t\t\t<h2 class="nav-button svelte-klws3g"><a href="#meetings" class="svelte-klws3g">Attend a Council Meeting</a></h2>',y(n,"class","buttons-wrapper svelte-klws3g")},m(e,t){p(e,n,t)},p:e,d(e){e&&m(n)}}}function J(t){let n,s;return n=new Y({props:{dismiss:t[2]}}),{c(){z(n.$$.fragment)},m(e,t){U(n,e,t),s=!0},p:e,i(e){s||(q(n.$$.fragment,e),s=!0)},o(e){S(n.$$.fragment,e),s=!1},d(e){D(n,e)}}}function K(e){let t,n,i,o,r,l,a;let c=function(e,t){return e[1]?F:G}(e),u=c(e),d=e[0]&&J(e);return{c(){t=v("header"),n=v("div"),i=v("div"),i.innerHTML='<h1 class="svelte-klws3g">Build a Better Bike Path</h1>',o=b(),u.c(),r=b(),d&&d.c(),l=$(""),y(n,"class","header-inner svelte-klws3g"),y(t,"class","header svelte-klws3g")},m(e,s){p(e,t,s),h(t,n),h(n,i),h(n,o),u.m(n,null),p(e,r,s),d&&d.m(e,s),p(e,l,s),a=!0},p(e,[t]){u.p(e,t),e[0]?d?(d.p(e,t),1&t&&q(d,1)):(d=J(e),d.c(),q(d,1),d.m(l.parentNode,l)):d&&(L={r:0,c:[],p:L},S(d,1,1,(()=>{d=null})),L.r||s(L.c),L=L.p)},i(e){a||(q(d),a=!0)},o(e){S(d),a=!1},d(e){e&&m(t),u.d(),e&&m(r),d&&d.d(e),e&&m(l)}}}function X(e,t,n){let s=window.innerWidth<=600,i=!1;return[i,s,function(e){e.preventDefault(),console.log("here!"),n(0,i=!i)}]}class Q extends V{constructor(e){super(),W(this,e,X,K,o,{})}}function Z(t){let n;return{c(){n=v("section"),n.innerHTML='<div class="info-box svelte-tgjjss"><div class="info-box-inner svelte-tgjjss"><h1 class="svelte-tgjjss">Re-route the Rincon bike path to preserve our coastal bluffs!</h1> \n            <a href="https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&amp;recruiter=26187358&amp;utm_source=share_petition&amp;utm_medium=copylink&amp;utm_campaign=share_petition" class="link-button svelte-tgjjss">Sign the Petition!</a></div></div>',y(n,"class","svelte-tgjjss")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&m(n)}}}class ee extends V{constructor(e){super(),W(this,e,null,Z,o,{})}}const te=e=>({}),ne=e=>({}),se=e=>({}),ie=e=>({});function oe(e){let t,n,s,i,o;const r=e[1].col1,l=c(r,e,e[0],ie),a=e[1].col2,u=c(a,e,e[0],ne);return{c(){t=v("section"),n=v("div"),l&&l.c(),s=b(),i=v("div"),u&&u.c(),y(n,"class","column svelte-14tg5js"),y(i,"class","column svelte-14tg5js"),y(t,"class","svelte-14tg5js")},m(e,r){p(e,t,r),h(t,n),l&&l.m(n,null),h(t,s),h(t,i),u&&u.m(i,null),o=!0},p(e,[t]){l&&l.p&&(!o||1&t)&&f(l,r,e,e[0],o?d(r,e[0],t,se):g(e[0]),ie),u&&u.p&&(!o||1&t)&&f(u,a,e,e[0],o?d(a,e[0],t,te):g(e[0]),ne)},i(e){o||(q(l,e),q(u,e),o=!0)},o(e){S(l,e),S(u,e),o=!1},d(e){e&&m(t),l&&l.d(e),u&&u.d(e)}}}function re(e,t,n){let{$$slots:s={},$$scope:i}=t;return e.$$set=e=>{"$$scope"in e&&n(0,i=e.$$scope)},[i,s]}class le extends V{constructor(e){super(),W(this,e,re,oe,o,{})}}function ae(e){let t;return{c(){t=v("div"),t.innerHTML='<h2 class="svelte-3e4gdo">Current Bike Path Design</h2> \n                <img src="../assets/img/path1.png" alt="Path over gap in bluffs, requiring bridge" class="route-image svelte-3e4gdo"/> \n                <ul class="svelte-3e4gdo"><li class="svelte-3e4gdo">Requires the construction of a bridge over eroding and unstable soil</li> \n                    <li class="svelte-3e4gdo">Empties bikes into the crowded Rincon parking lot, a recipie for disaster</li> \n                    <li class="svelte-3e4gdo">Will cost over $14,000,000 of taxpayer money to fund construction of the bridge</li></ul>',y(t,"class","column-inner svelte-3e4gdo"),y(t,"slot","col1")},m(e,n){p(e,t,n)},d(e){e&&m(t)}}}function ce(e){let t;return{c(){t=v("div"),t.innerHTML='<h2 class="svelte-3e4gdo">Alternate # 4 (preferred route)</h2> \n                <img src="../assets/img/path-alt-4.png" alt="Path along existing bench in north side of freeway" class="route-image svelte-3e4gdo"/> \n                <ul class="svelte-3e4gdo"><li class="svelte-3e4gdo">On the North side of the freeway, on stable ground</li> \n                    <li class="svelte-3e4gdo">Will still connect with Rincon Beach and the rest of the Ventura trail</li> \n                    <li class="svelte-3e4gdo">Will preserve our coastal bluffs and avoid massive seaside erosion/pollution</li> \n                    <li class="svelte-3e4gdo">Will allow hang gliders and paragliders to continue to soar the historic Bates Bluff flying site</li> \n                    <li class="svelte-3e4gdo">Far fewer truckloads of earth that needs to be moved and a fraction of the cost</li></ul>',y(t,"class","column-inner svelte-3e4gdo"),y(t,"slot","col2")},m(e,n){p(e,t,n)},d(e){e&&m(t)}}}function ue(e){let t,n,s,i,o;return i=new le({props:{$$slots:{col2:[ce],col1:[ae]},$$scope:{ctx:e}}}),{c(){t=v("section"),n=v("div"),n.innerHTML='<h1 class="svelte-3e4gdo">The Rincon Bike Path - End of Carpinteria Avenue to Rincon Beach Parking Lot</h1> \n                <ul class="svelte-3e4gdo"><li class="svelte-3e4gdo">This bike path will connect Carpineteria Avenue with Rincon Beach and the rest of the coastal trail, however the current design has some serious drawbacks</li> \n                    <li class="svelte-3e4gdo">The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)</li> \n                    <li class="svelte-3e4gdo">Construction will require over 40,000 truckloads of dirt to be removed from the bluff, creating severe coastal erosion and greatly exascerbating traffic along the 101</li> \n                    <li class="svelte-3e4gdo">The current design has a steep (5%) slope and empties into the Rincon Beach parking lot. This will likely lead to many accidents as bikers colide with cars at high speed.</li> \n                    <li class="svelte-3e4gdo">Better alternatives to this design exist, such as building the bike path on the north side of highway 101 and connecting it to the existing Ventura trail. However, <strong class="svelte-3e4gdo">they are not being considered by project planners or regulators</strong></li> \n                    <li class="svelte-3e4gdo">This design would destroy the historic Bates Bluff hang gliding and paragliding site, which attracts pilots from all over the world</li> \n                    <li class="svelte-3e4gdo">Approving this design would open the doors for development of the rest of Carpinteria&#39;s beautiful, pristine coastal bluffs.</li></ul>',s=b(),z(i.$$.fragment),y(n,"class","text-block svelte-3e4gdo"),y(t,"class","svelte-3e4gdo")},m(e,r){p(e,t,r),h(t,n),h(t,s),U(i,t,null),o=!0},p(e,[t]){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),i.$set(n)},i(e){o||(q(i.$$.fragment,e),o=!0)},o(e){S(i.$$.fragment,e),o=!1},d(e){e&&m(t),D(i)}}}class de extends V{constructor(e){super(),W(this,e,null,ue,o,{})}}function fe(t){let n;return{c(){n=v("section"),n.innerHTML='<h1 class="svelte-v9b4tl">Make Your Voice Heard</h1> \n\n    <div class="info-box svelte-v9b4tl"><div class="info-box-inner"><h2 class="svelte-v9b4tl">Upcoming Meetings:</h2> \n            <ul class="svelte-v9b4tl"><li><strong class="svelte-v9b4tl">December 2021</strong> - City of Carpinteria review/approval of Environmental Impact Statement (date TBD)</li> \n                <li><strong class="svelte-v9b4tl">March 2022</strong> - Santa Barbara County Planning Comission hearing for project review, will determine if project will get a county coastal permit (date TBD)</li></ul></div></div>',y(n,"id","meetings"),y(n,"class","svelte-v9b4tl")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&m(n)}}}class ge extends V{constructor(e){super(),W(this,e,null,fe,o,{})}}function he(t){let n;return{c(){n=v("section"),n.innerHTML='<div class="inner"><h1 class="svelte-h3jz0q">Contact Your Representatives</h1> \n            <h2 class="svelte-h3jz0q">California Costal Commison</h2> \n            <h3 class="svelte-h3jz0q"><a href="https://docs.google.com/document/d/18GzjsAAAoeVEBP7dWNe5vJUpCHzTA2KvVbRPXD4noCI/view" class="svelte-h3jz0q">(Sample Email)</a></h3> \n            <ul class="svelte-h3jz0q"><li>Meagan Harmon - Meagan.Harmon@coastal.ca.gov</li> \n                <li>Roberto Uranga - Roberto.Uranga@coastal.ca.gov</li> \n                <li>Rick Rivas - Rick.Rivas@coastal.ca.gov</li></ul></div>',y(n,"class","svelte-h3jz0q")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&m(n)}}}class pe extends V{constructor(e){super(),W(this,e,null,he,o,{})}}function me(t){let n,s,i,o,r,l,a,c,u,d;return n=new Q({}),i=new ee({}),r=new de({}),a=new ge({}),u=new pe({}),{c(){z(n.$$.fragment),s=b(),z(i.$$.fragment),o=b(),z(r.$$.fragment),l=b(),z(a.$$.fragment),c=b(),z(u.$$.fragment)},m(e,t){U(n,e,t),p(e,s,t),U(i,e,t),p(e,o,t),U(r,e,t),p(e,l,t),U(a,e,t),p(e,c,t),U(u,e,t),d=!0},p:e,i(e){d||(q(n.$$.fragment,e),q(i.$$.fragment,e),q(r.$$.fragment,e),q(a.$$.fragment,e),q(u.$$.fragment,e),d=!0)},o(e){S(n.$$.fragment,e),S(i.$$.fragment,e),S(r.$$.fragment,e),S(a.$$.fragment,e),S(u.$$.fragment,e),d=!1},d(e){D(n,e),e&&m(s),D(i,e),e&&m(o),D(r,e),e&&m(l),D(a,e),e&&m(c),D(u,e)}}}return new class extends V{constructor(e){super(),W(this,e,null,me,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
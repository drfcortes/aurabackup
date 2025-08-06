import{j as M}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.RH_Wq4ov.js";let F={data:""},_=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||F,H=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,R=/\/\*[^]*?\*\/|  +/g,N=/\n+/g,b=(e,t)=>{let a="",s="",n="";for(let r in e){let i=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+i+";":s+=r[1]=="f"?b(i,r):r+"{"+b(i,r[1]=="k"?"":t)+"}":typeof i=="object"?s+=b(i,t?t.replace(/([^,])+/g,o=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,o):o?o+" "+l:l)):r):i!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=b.p?b.p(r,i):r+":"+i+";")}return a+(t&&n?t+"{"+n+"}":n)+s},y={},P=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+P(e[a]);return t}return e},L=(e,t,a,s,n)=>{let r=P(e),i=y[r]||(y[r]=(l=>{let d=0,p=11;for(;d<l.length;)p=101*p+l.charCodeAt(d++)>>>0;return"go"+p})(r));if(!y[i]){let l=r!==e?e:(d=>{let p,f,m=[{}];for(;p=H.exec(d.replace(R,""));)p[4]?m.shift():p[3]?(f=p[3].replace(N," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][p[1]]=p[2].replace(N," ").trim();return m[0]})(e);y[i]=b(n?{["@keyframes "+i]:l}:l,a?"":"."+i)}let o=a&&y.g?y.g:null;return a&&(y.g=y[i]),((l,d,p,f)=>{f?d.data=d.data.replace(f,l):d.data.indexOf(l)===-1&&(d.data=p?l+d.data:d.data+l)})(y[i],t,s,o),i},U=(e,t,a)=>e.reduce((s,n,r)=>{let i=t[r];if(i&&i.call){let o=i(a),l=o&&o.props&&o.props.className||/^go/.test(o)&&o;i=l?"."+l:o&&typeof o=="object"?o.props?"":b(o,""):o===!1?"":o}return s+n+(i??"")},"");function O(e){let t=this||{},a=e.call?e(t.p):e;return L(a.unshift?a.raw?U(a,[].slice.call(arguments,1),t.p):a.reduce((s,n)=>Object.assign(s,n&&n.call?n(t.p):n),{}):a,_(t.target),t.g,t.o,t.k)}let S,z,A;O.bind({g:1});let h=O.bind({k:1});function q(e,t,a,s){b.p=t,S=e,z=a,A=s}function v(e,t){let a=this||{};return function(){let s=arguments;function n(r,i){let o=Object.assign({},r),l=o.className||n.className;a.p=Object.assign({theme:z&&z()},o),a.o=/ *go\d+/.test(l),o.className=O.apply(a,s)+(l?" "+l:"");let d=e;return e[0]&&(d=o.as||e,delete o.as),A&&d[0]&&A(o),S(d,o)}return n}}var Y=e=>typeof e=="function",D=(e,t)=>Y(e)?e(t):e,Z=(()=>{let e=0;return()=>(++e).toString()})(),T=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),B=20,I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,B)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return I(e,{type:e.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(r=>r.id===s||s===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+n}))}}},j=[],x={toasts:[],pausedAt:void 0},w=e=>{x=I(x,e),j.forEach(t=>{t(x)})},J={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},K=(e={})=>{let[t,a]=c.useState(x),s=c.useRef(x);c.useEffect(()=>(s.current!==x&&a(x),j.push(a),()=>{let r=j.indexOf(a);r>-1&&j.splice(r,1)}),[]);let n=t.toasts.map(r=>{var i,o,l;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((i=e[r.type])==null?void 0:i.removeDelay)||e?.removeDelay,duration:r.duration||((o=e[r.type])==null?void 0:o.duration)||e?.duration||J[r.type],style:{...e.style,...(l=e[r.type])==null?void 0:l.style,...r.style}}});return{...t,toasts:n}},V=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||Z()}),$=e=>(t,a)=>{let s=V(t,e,a);return w({type:2,toast:s}),s.id},u=(e,t)=>$("blank")(e,t);u.error=$("error");u.success=$("success");u.loading=$("loading");u.custom=$("custom");u.dismiss=e=>{w({type:3,toastId:e})};u.remove=e=>w({type:4,toastId:e});u.promise=(e,t,a)=>{let s=u.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let r=t.success?D(t.success,n):void 0;return r?u.success(r,{id:s,...a,...a?.success}):u.dismiss(s),n}).catch(n=>{let r=t.error?D(t.error,n):void 0;r?u.error(r,{id:s,...a,...a?.error}):u.dismiss(s)}),e};var W=(e,t)=>{w({type:1,toast:{id:e,height:t}})},X=()=>{w({type:5,time:Date.now()})},E=new Map,G=1e3,Q=(e,t=G)=>{if(E.has(e))return;let a=setTimeout(()=>{E.delete(e),w({type:4,toastId:e})},t);E.set(e,a)},ee=e=>{let{toasts:t,pausedAt:a}=K(e);c.useEffect(()=>{if(a)return;let r=Date.now(),i=t.map(o=>{if(o.duration===1/0)return;let l=(o.duration||0)+o.pauseDuration-(r-o.createdAt);if(l<0){o.visible&&u.dismiss(o.id);return}return setTimeout(()=>u.dismiss(o.id),l)});return()=>{i.forEach(o=>o&&clearTimeout(o))}},[t,a]);let s=c.useCallback(()=>{a&&w({type:6,time:Date.now()})},[a]),n=c.useCallback((r,i)=>{let{reverseOrder:o=!1,gutter:l=8,defaultPosition:d}=i||{},p=t.filter(g=>(g.position||d)===(r.position||d)&&g.height),f=p.findIndex(g=>g.id===r.id),m=p.filter((g,C)=>C<f&&g.visible).length;return p.filter(g=>g.visible).slice(...o?[m+1]:[0,m]).reduce((g,C)=>g+(C.height||0)+l,0)},[t]);return c.useEffect(()=>{t.forEach(r=>{if(r.dismissed)Q(r.id,r.removeDelay);else{let i=E.get(r.id);i&&(clearTimeout(i),E.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:W,startPause:X,endPause:s,calculateOffset:n}}},te=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,re=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,oe=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ae} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,se=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ie=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${se} 1s linear infinite;
`,ne=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,le=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,de=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ne} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${le} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ce=v("div")`
  position: absolute;
`,pe=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ue=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,me=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ue} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,fe=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?c.createElement(me,null,t):t:a==="blank"?null:c.createElement(pe,null,c.createElement(ie,{...s}),a!=="loading"&&c.createElement(ce,null,a==="error"?c.createElement(oe,{...s}):c.createElement(de,{...s})))},ge=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ye=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,he="0%{opacity:0;} 100%{opacity:1;}",be="0%{opacity:1;} 100%{opacity:0;}",ve=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,xe=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,we=(e,t)=>{let a=e.includes("top")?1:-1,[s,n]=T()?[he,be]:[ge(a),ye(a)];return{animation:t?`${h(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ee=c.memo(({toast:e,position:t,style:a,children:s})=>{let n=e.height?we(e.position||t||"top-center",e.visible):{opacity:0},r=c.createElement(fe,{toast:e}),i=c.createElement(xe,{...e.ariaProps},D(e.message,e));return c.createElement(ve,{className:e.className,style:{...n,...a,...e.style}},typeof s=="function"?s({icon:r,message:i}):c.createElement(c.Fragment,null,r,i))});q(c.createElement);var $e=({id:e,className:t,style:a,onHeightUpdate:s,children:n})=>{let r=c.useCallback(i=>{if(i){let o=()=>{let l=i.getBoundingClientRect().height;s(e,l)};o(),new MutationObserver(o).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return c.createElement("div",{ref:r,className:t,style:a},n)},ke=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:T()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...n}},je=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,De=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:n,containerStyle:r,containerClassName:i})=>{let{toasts:o,handlers:l}=ee(a);return c.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...r},className:i,onMouseEnter:l.startPause,onMouseLeave:l.endPause},o.map(d=>{let p=d.position||t,f=l.calculateOffset(d,{reverseOrder:e,gutter:s,defaultPosition:t}),m=ke(p,f);return c.createElement($e,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?je:"",style:m},d.type==="custom"?D(d.message,d):n?n(d):c.createElement(Ee,{toast:d,position:p}))}))};function ze(){return M.jsx(De,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#2b361c",color:"#fefae3",fontSize:"0.9rem",borderRadius:"0.5rem"},iconTheme:{primary:"#34d399",secondary:"#fefae3"}}})}export{ze as default};

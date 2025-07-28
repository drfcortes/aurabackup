import"./index.CMFzYXQQ.js";var a={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=Symbol.for("react.transitional.element"),x=Symbol.for("react.fragment");function c(o,t,e){var n=null;if(e!==void 0&&(n=""+e),t.key!==void 0&&(n=""+t.key),"key"in t){e={};for(var r in t)r!=="key"&&(e[r]=t[r])}else e=t;return t=e.ref,{$$typeof:p,type:o,key:n,ref:t!==void 0?t:null,props:e}}s.Fragment=x;s.jsx=c;s.jsxs=c;a.exports=s;var i=a.exports;function b({jsonData:o}){const t=()=>{const n=JSON.stringify(o,null,2);navigator.clipboard.writeText(n).then(()=>{alert("Copied to clipboard!")})},e=()=>{const n=JSON.stringify(o,null,2),r=new Blob([n],{type:"application/json"}),d=URL.createObjectURL(r),u=`${o.uid||"aura_block"}.json`,l=document.createElement("a");l.href=d,l.download=u,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(d)};return i.jsxs("div",{className:"mt-4 space-x-4",children:[i.jsx("button",{onClick:t,className:"px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition",children:"Copy"}),i.jsx("button",{onClick:e,className:"px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition",children:"Download JSON"})]})}export{b as default};

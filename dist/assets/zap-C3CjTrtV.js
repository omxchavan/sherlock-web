import{h as n,M as q,q as v,b as I,u as H,P as T,C as W,j as D,L as K,o as $}from"./index-vZVVSOSS.js";function N(e,r){if(typeof e=="function")return e(r);e!=null&&(e.current=r)}function U(...e){return r=>{let t=!1;const o=e.map(u=>{const c=N(u,r);return!t&&typeof c=="function"&&(t=!0),c});if(t)return()=>{for(let u=0;u<o.length;u++){const c=o[u];typeof c=="function"?c():N(e[u],null)}}}}function V(...e){return n.useCallback(U(...e),e)}class Z extends n.Component{getSnapshotBeforeUpdate(r){const t=this.props.childRef.current;if(t&&r.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=t.offsetParent,u=I(o)&&o.offsetWidth||0,c=I(o)&&o.offsetHeight||0,s=this.props.sizeRef.current;s.height=t.offsetHeight||0,s.width=t.offsetWidth||0,s.top=t.offsetTop,s.left=t.offsetLeft,s.right=u-s.width-s.left,s.bottom=c-s.height-s.top}return null}componentDidUpdate(){}render(){return this.props.children}}function B({children:e,isPresent:r,anchorX:t,anchorY:o,root:u,pop:c}){var a;const s=n.useId(),m=n.useRef(null),M=n.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:w}=n.useContext(q),f=((a=e.props)==null?void 0:a.ref)??(e==null?void 0:e.ref),k=V(m,f);return n.useInsertionEffect(()=>{const{width:l,height:h,top:x,left:C,right:E,bottom:P}=M.current;if(r||c===!1||!m.current||!l||!h)return;const _=t==="left"?`left: ${C}`:`right: ${E}`,d=o==="bottom"?`bottom: ${P}`:`top: ${x}`;m.current.dataset.motionPopId=s;const y=document.createElement("style");w&&(y.nonce=w);const g=u??document.head;return g.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${l}px !important;
            height: ${h}px !important;
            ${_}px !important;
            ${d}px !important;
          }
        `),()=>{g.contains(y)&&g.removeChild(y)}},[r]),v.jsx(Z,{isPresent:r,childRef:m,sizeRef:M,pop:c,children:c===!1?e:n.cloneElement(e,{ref:k})})}const F=({children:e,initial:r,isPresent:t,onExitComplete:o,custom:u,presenceAffectsLayout:c,mode:s,anchorX:m,anchorY:M,root:w})=>{const f=H(G),k=n.useId();let a=!0,l=n.useMemo(()=>(a=!1,{id:k,initial:r,isPresent:t,custom:u,onExitComplete:h=>{f.set(h,!0);for(const x of f.values())if(!x)return;o&&o()},register:h=>(f.set(h,!1),()=>f.delete(h))}),[t,f,o]);return c&&a&&(l={...l}),n.useMemo(()=>{f.forEach((h,x)=>f.set(x,!1))},[t]),n.useEffect(()=>{!t&&!f.size&&o&&o()},[t]),e=v.jsx(B,{pop:s==="popLayout",isPresent:t,anchorX:m,anchorY:M,root:w,children:e}),v.jsx(T.Provider,{value:l,children:e})};function G(){return new Map}const b=e=>e.key||"";function A(e){const r=[];return n.Children.forEach(e,t=>{n.isValidElement(t)&&r.push(t)}),r}const te=({children:e,custom:r,initial:t=!0,onExitComplete:o,presenceAffectsLayout:u=!0,mode:c="sync",propagate:s=!1,anchorX:m="left",anchorY:M="top",root:w})=>{const[f,k]=W(s),a=n.useMemo(()=>A(e),[e]),l=s&&!f?[]:a.map(b),h=n.useRef(!0),x=n.useRef(a),C=H(()=>new Map),E=n.useRef(new Set),[P,_]=n.useState(a),[d,y]=n.useState(a);D(()=>{h.current=!1,x.current=a;for(let p=0;p<d.length;p++){const i=b(d[p]);l.includes(i)?(C.delete(i),E.current.delete(i)):C.get(i)!==!0&&C.set(i,!1)}},[d,l.length,l.join("-")]);const g=[];if(a!==P){let p=[...a];for(let i=0;i<d.length;i++){const R=d[i],z=b(R);l.includes(z)||(p.splice(i,0,R),g.push(R))}return c==="wait"&&g.length&&(p=g),y(A(p)),_(a),null}const{forceRender:j}=n.useContext(K);return v.jsx(v.Fragment,{children:d.map(p=>{const i=b(p),R=s&&!f?!1:a===d||l.includes(i),z=()=>{if(E.current.has(i))return;if(E.current.add(i),C.has(i))C.set(i,!0);else return;let L=!0;C.forEach(S=>{S||(L=!1)}),L&&(j==null||j(),y(x.current),s&&(k==null||k()),o&&o())};return v.jsx(F,{isPresent:R,initial:!h.current||t?void 0:!1,custom:r,presenceAffectsLayout:u,mode:c,root:w,onExitComplete:R?void 0:z,anchorX:m,anchorY:M,children:p},i)})})};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],ne=$("cpu",X);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],se=$("eye",Y);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],oe=$("lock",J);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],re=$("terminal",O);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ie=$("zap",Q);export{te as A,ne as C,se as E,oe as L,re as T,ie as Z};

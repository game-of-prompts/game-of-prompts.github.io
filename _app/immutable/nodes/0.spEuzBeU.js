import{d as q,a as v,f as u,e as E,g as x}from"../chunks/Clly37Ij.js";import{B as p,aK as f,F as b,C as y,R as g,x as c,aM as w,D as T,G as k,I as M,aJ as A,J as m}from"../chunks/CpGejCaS.js";import{s as C,a as L}from"../chunks/CbmekIKG.js";import{i as _}from"../chunks/C5zt9MTz.js";import{i as j}from"../chunks/D0hRXHxR.js";const O=!0,N=Object.freeze(Object.defineProperty({__proto__:null,prerender:O},Symbol.toStringTag,{value:"Module"}));function S(d,i){p(i,!1),f(()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(max-width: 768px)").matches)return;const e=document.createElement("div");e.id="gop-cursor",e.innerHTML=`
			<div class="gc-dot"></div>
			<div class="gc-corner gc-tl"></div>
			<div class="gc-corner gc-tr"></div>
			<div class="gc-corner gc-br"></div>
			<div class="gc-corner gc-bl"></div>
		`,e.style.cssText=`
			position: fixed;
			top: 0; left: 0;
			width: 0; height: 0;
			pointer-events: none;
			z-index: 99999;
			transform: translate(-50%, -50%);
		`;const r=document.createElement("style");r.textContent=`
			body, body * { cursor: none !important; }
			#gop-cursor .gc-dot {
				position: absolute;
				left: 50%; top: 50%;
				width: 5px; height: 5px;
				background: #22c55e;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				box-shadow: 0 0 10px rgba(34,197,94,0.8), 0 0 20px rgba(34,197,94,0.4);
			}
			#gop-cursor .gc-corner {
				position: absolute;
				left: 50%; top: 50%;
				width: 12px; height: 12px;
				border: 2px solid #22c55e;
				filter: drop-shadow(0 0 4px rgba(34,197,94,0.7));
				transition: width 0.15s, height 0.15s, transform 0.15s;
			}
			#gop-cursor .gc-tl { transform: translate(-150%, -150%); border-right: none; border-bottom: none; }
			#gop-cursor .gc-tr { transform: translate(50%, -150%); border-left: none; border-bottom: none; }
			#gop-cursor .gc-br { transform: translate(50%, 50%); border-left: none; border-top: none; }
			#gop-cursor .gc-bl { transform: translate(-150%, 50%); border-right: none; border-top: none; }
			#gop-cursor.hovering .gc-corner { width: 18px; height: 18px; }
			#gop-cursor.hovering .gc-tl { transform: translate(-175%, -175%); }
			#gop-cursor.hovering .gc-tr { transform: translate(75%, -175%); }
			#gop-cursor.hovering .gc-br { transform: translate(75%, 75%); }
			#gop-cursor.hovering .gc-bl { transform: translate(-175%, 75%); }
		`,document.head.appendChild(r),document.body.appendChild(e);let o;const n=h=>{cancelAnimationFrame(o),o=requestAnimationFrame(()=>{e.style.left=h.clientX+"px",e.style.top=h.clientY+"px"})},l=()=>e.classList.add("hovering"),a=()=>e.classList.remove("hovering");document.addEventListener("mousemove",n,{passive:!0});const t=()=>{document.querySelectorAll("a, button, input, select, [role=button], .cursor-target").forEach(h=>{h.addEventListener("mouseenter",l),h.addEventListener("mouseleave",a)})};t();const s=new MutationObserver(t);return s.observe(document.body,{childList:!0,subtree:!0}),()=>{cancelAnimationFrame(o),document.removeEventListener("mousemove",n),s.disconnect(),e.remove(),r.remove()}}),_(),b()}var P=u('<div aria-hidden="true"><div class="scanline svelte-1jhhqnw"></div> <div class="content svelte-1jhhqnw"><div class="logo-wrap svelte-1jhhqnw"><img src="/gop-logo.png" alt="Game of Prompts" class="logo svelte-1jhhqnw"/> <div class="logo-glow svelte-1jhhqnw"></div></div> <div class="title-wrap svelte-1jhhqnw"><h1 class="title svelte-1jhhqnw" data-text="GAME OF PROMPTS">GAME OF PROMPTS</h1></div> <p class="subtitle svelte-1jhhqnw">WHERE AI MEETS BLOCKCHAIN COMPETITION</p> <div class="progress-bar svelte-1jhhqnw"><div class="progress-fill svelte-1jhhqnw"></div></div></div> <div class="corner-tl svelte-1jhhqnw"></div> <div class="corner-tr svelte-1jhhqnw"></div> <div class="corner-bl svelte-1jhhqnw"></div> <div class="corner-br svelte-1jhhqnw"></div></div>');function I(d,i){p(i,!0);let e=w(!0),r=w("show");f(()=>{const a=setTimeout(()=>{g(r,"fadeout"),setTimeout(()=>{g(e,!1)},700)},3e3);return()=>clearTimeout(a)});var o=q(),n=y(o);{var l=a=>{var t=P();let s;T(()=>s=C(t,1,"splash svelte-1jhhqnw",null,s,{fadeout:c(r)==="fadeout"})),v(a,t)};j(n,a=>{c(e)&&a(l)})}v(d,o),b()}var F=x('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'),B=x('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'),G=u('<button class="theme-toggle svelte-lu0t34" aria-label="Toggle theme"><!></button>');function H(d,i){p(i,!1);let e=A("dark");f(()=>{const t=localStorage.getItem("theme"),s=window.matchMedia("(prefers-color-scheme: dark)").matches;t?g(e,t):g(e,s?"dark":"light"),document.documentElement.setAttribute("data-theme",c(e))});function r(){g(e,c(e)==="light"?"dark":"light"),localStorage.setItem("theme",c(e)),document.documentElement.setAttribute("data-theme",c(e))}_();var o=G(),n=k(o);{var l=t=>{var s=F();v(t,s)},a=t=>{var s=B();v(t,s)};j(n,t=>{c(e)==="light"?t(l):t(a,!1)})}M(o),E("click",o,r),v(d,o),b()}var R=u("<!> <!> <!> <!>",1);function W(d,i){var e=R(),r=y(e);I(r,{});var o=m(r,2);S(o,{});var n=m(o,2);H(n,{});var l=m(n,2);L(l,()=>i.children),v(d,e)}export{W as component,N as universal};

// Runs inside the sandboxed iframe: captures console, defines test helpers.
export const HARN=`(()=>{const L=[],P=o=>parent.postMessage(Object.assign({r:RID},o),'*'),f=a=>{try{return typeof a==='string'?a:a instanceof Error?a.name+': '+a.message:a===undefined?'undefined':typeof a==='function'?'ƒ '+(a.name||'anonymous'):JSON.stringify(a)}catch(e){return String(a)}};
['log','info','warn','error'].forEach(k=>{console[k]=(...a)=>{const s=a.map(f).join(' ');if(k=='log'||k=='info')L.push(s);P({t:'log',k,s})}});
addEventListener('error',e=>P({t:'log',k:'error',s:(e.error&&e.error.name||'Error')+': '+e.message}));
addEventListener('unhandledrejection',e=>P({t:'log',k:'error',s:'Unhandled rejection: '+f(e.reason)}));
const Q=[];window.__h={L,test:(n,fn)=>Q.push([n,fn]),delay:ms=>new Promise(r=>setTimeout(r,ms)),eq:(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw new Error('Expected '+JSON.stringify(b)+', got '+JSON.stringify(a))}};
window.__go=async()=>{for(const[n,fn]of Q){try{await fn();P({t:'test',n,ok:1})}catch(e){P({t:'test',n,ok:0,m:e.message})}}P({t:'done'})}})();`;

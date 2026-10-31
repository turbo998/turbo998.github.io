(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const Ms="180",Un={ROTATE:0,DOLLY:1,PAN:2},Pn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mu=0,ko=1,xu=2,xc=1,Su=2,Li=3,ti=0,Ht=1,ai=2,Ki=0,On=1,Vo=2,Wo=3,Xo=4,Tu=5,an=100,bu=101,Eu=102,wu=103,Cu=104,Au=200,Ru=201,Pu=202,Lu=203,_a=204,Ma=205,Du=206,Iu=207,Uu=208,Ou=209,Nu=210,Fu=211,Bu=212,Gu=213,Hu=214,xa=0,Sa=1,Ta=2,Bn=3,ba=4,Ea=5,wa=6,Ca=7,Sc=0,zu=1,ku=2,ji=0,Vu=1,Wu=2,Xu=3,Tc=4,Ku=5,ju=6,qu=7,Ko="attached",Yu="detached",bc=300,Gn=301,Hn=302,Aa=303,Ra=304,xs=306,Gt=1e3,vi=1001,yr=1002,Pt=1003,po=1004,Ln=1005,wt=1006,dr=1007,yi=1008,hi=1009,Ec=1010,wc=1011,_r=1012,mo=1013,un=1014,ei=1015,Cr=1016,go=1017,vo=1018,Mr=1020,Cc=35902,Ac=35899,Rc=1021,Pc=1022,qt=1023,xr=1026,Sr=1027,Ss=1028,yo=1029,Lc=1030,_o=1031,Mo=1033,us=33776,hs=33777,ds=33778,fs=33779,Pa=35840,La=35841,Da=35842,Ia=35843,Ua=36196,Oa=37492,Na=37496,Fa=37808,Ba=37809,Ga=37810,Ha=37811,za=37812,ka=37813,Va=37814,Wa=37815,Xa=37816,Ka=37817,ja=37818,qa=37819,Ya=37820,$a=37821,Za=36492,Ja=36494,Qa=36495,eo=36283,to=36284,io=36285,no=36286,zn=2300,kn=2301,Rs=2302,jo=2400,qo=2401,Yo=2402,$u=2500,Zu=0,Dc=1,ro=2,Ju=3200,Qu=3201,Ic=0,eh=1,oi="",yt="srgb",Ot="srgb-linear",ms="linear",tt="srgb",fn=7680,$o=519,th=512,ih=513,nh=514,Uc=515,rh=516,sh=517,ah=518,oh=519,so=35044,Zo="300 es",_i=2e3,gs=2001;class hn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const s=n.indexOf(t);s!==-1&&n.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let s=0,a=n.length;s<a;s++)n[s].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jo=1234567;const fr=Math.PI/180,Vn=180/Math.PI;function ui(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(At[r&255]+At[r>>8&255]+At[r>>16&255]+At[r>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]).toLowerCase()}function He(r,e,t){return Math.max(e,Math.min(t,r))}function xo(r,e){return(r%e+e)%e}function lh(r,e,t,i,n){return i+(r-e)*(n-i)/(t-e)}function ch(r,e,t){return r!==e?(t-r)/(e-r):0}function pr(r,e,t){return(1-t)*r+t*e}function uh(r,e,t,i){return pr(r,e,1-Math.exp(-t*i))}function hh(r,e=1){return e-Math.abs(xo(r,e*2)-e)}function dh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function fh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ph(r,e){return r+Math.floor(Math.random()*(e-r+1))}function mh(r,e){return r+Math.random()*(e-r)}function gh(r){return r*(.5-Math.random())}function vh(r){r!==void 0&&(Jo=r);let e=Jo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yh(r){return r*fr}function _h(r){return r*Vn}function Mh(r){return(r&r-1)===0&&r!==0}function xh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Sh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Th(r,e,t,i,n){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),u=s((e-i)/2),d=a((e-i)/2),f=s((i-e)/2),g=a((i-e)/2);switch(n){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function li(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Qe(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Bt={DEG2RAD:fr,RAD2DEG:Vn,generateUUID:ui,clamp:He,euclideanModulo:xo,mapLinear:lh,inverseLerp:ch,lerp:pr,damp:uh,pingpong:hh,smoothstep:dh,smootherstep:fh,randInt:ph,randFloat:mh,randFloatSpread:gh,seededRandom:vh,degToRad:yh,radToDeg:_h,isPowerOfTwo:Mh,ceilPowerOfTwo:xh,floorPowerOfTwo:Sh,setQuaternionFromProperEuler:Th,normalize:Qe,denormalize:li};class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*n+e.x,this.y=s*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class di{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,s,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=s[a+0],f=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*v,T=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const w=Math.sqrt(b),C=Math.atan2(w,p*T);m=Math.sin(m*C)/w,o=Math.sin(o*C)/w}const _=o*T;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,s,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(s/2),d=l(i/2),f=l(n/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-n)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(s-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-n)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-s*l,this._y=n*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+n*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=n,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*n+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*n,this.y=s[1]*t+s[4]*i+s[7]*n,this.z=s[2]*t+s[5]*i+s[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*n+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*n+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*n+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-s*n),u=2*(s*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-s*u,this.z=n+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n,this.y=s[1]*t+s[5]*i+s[9]*n,this.z=s[2]*t+s[6]*i+s[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-s*o,this.y=s*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ps.copy(this).projectOnVector(e),this.sub(Ps)}reflect(e){return this.sub(Ps.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ps=new P,Qo=new di;class Fe{constructor(e,t,i,n,s,a,o,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,a,o,l,c)}set(e,t,i,n,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],v=n[0],m=n[3],p=n[6],T=n[1],b=n[4],_=n[7],w=n[2],C=n[5],R=n[8];return s[0]=a*v+o*T+l*w,s[3]=a*m+o*b+l*C,s[6]=a*p+o*_+l*R,s[1]=c*v+h*T+u*w,s[4]=c*m+h*b+u*C,s[7]=c*p+h*_+u*R,s[2]=d*v+f*T+g*w,s[5]=d*m+f*b+g*C,s[8]=d*p+f*_+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+n*s*c-n*a*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,g=t*u+i*d+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(n*c-h*i)*v,e[2]=(o*i-n*a)*v,e[3]=d*v,e[4]=(h*t-n*l)*v,e[5]=(n*s-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ls.makeScale(e,t)),this}rotate(e){return this.premultiply(Ls.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ls.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ls=new Fe;function Oc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Tr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function bh(){const r=Tr("canvas");return r.style.display="block",r}const el={};function br(r){r in el||(el[r]=!0,console.warn(r))}function Eh(r,e,t){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const tl=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),il=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wh(){const r={enabled:!0,workingColorSpace:Ot,spaces:{},convert:function(n,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===tt&&(n.r=Ui(n.r),n.g=Ui(n.g),n.b=Ui(n.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(n.r=Nn(n.r),n.g=Nn(n.g),n.b=Nn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===oi?ms:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,a){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Ot]:{primaries:e,whitePoint:i,transfer:ms,toXYZ:tl,fromXYZ:il,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:tl,fromXYZ:il,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),r}const je=wh();function Ui(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Nn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let pn;class Nc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{pn===void 0&&(pn=Tr("canvas")),pn.width=e.width,pn.height=e.height;const n=pn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=pn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Tr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),s=n.data;for(let a=0;a<s.length;a++)s[a]=Ui(s[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ui(t[i]/255)*255):t[i]=Ui(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ch=0;class Ts{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?s.push(Ds(n[a].image)):s.push(Ds(n[a]))}else s=Ds(n);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ds(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Nc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ah=0;const Is=new P;class Mt extends hn{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,i=vi,n=vi,s=wt,a=yi,o=qt,l=hi,c=Mt.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=ui(),this.name="",this.source=new Ts(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Is).x}get height(){return this.source.getSize(Is).y}get depth(){return this.source.getSize(Is).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gt:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gt:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=bc;Mt.DEFAULT_ANISOTROPY=1;class $e{constructor(e=0,t=0,i=0,n=1){$e.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,_=(f+1)/2,w=(p+1)/2,C=(h+d)/4,R=(u+v)/4,U=(g+m)/4;return b>_&&b>w?b<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(b),n=C/i,s=R/i):_>w?_<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(_),i=C/n,s=U/n):w<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(w),i=R/s,n=U/s),this.set(i,n,s,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rh extends hn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t);const n={width:e,height:t,depth:i.depth},s=new Mt(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isArrayTexture=this.textures[n].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ts(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qi extends Rh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Fc extends Mt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ph extends Mt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ni):ni.fromBufferAttribute(s,a),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ur.copy(i.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}const n=e.children;for(let s=0,a=n.length;s<a;s++)this.expandByObject(n[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qn),Or.subVectors(this.max,Qn),mn.subVectors(e.a,Qn),gn.subVectors(e.b,Qn),vn.subVectors(e.c,Qn),Ni.subVectors(gn,mn),Fi.subVectors(vn,gn),Zi.subVectors(mn,vn);let t=[0,-Ni.z,Ni.y,0,-Fi.z,Fi.y,0,-Zi.z,Zi.y,Ni.z,0,-Ni.x,Fi.z,0,-Fi.x,Zi.z,0,-Zi.x,-Ni.y,Ni.x,0,-Fi.y,Fi.x,0,-Zi.y,Zi.x,0];return!Us(t,mn,gn,vn,Or)||(t=[1,0,0,0,1,0,0,0,1],!Us(t,mn,gn,vn,Or))?!1:(Nr.crossVectors(Ni,Fi),t=[Nr.x,Nr.y,Nr.z],Us(t,mn,gn,vn,Or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new P,new P,new P,new P,new P,new P,new P,new P],ni=new P,Ur=new Oi,mn=new P,gn=new P,vn=new P,Ni=new P,Fi=new P,Zi=new P,Qn=new P,Or=new P,Nr=new P,Ji=new P;function Us(r,e,t,i,n){for(let s=0,a=r.length-3;s<=a;s+=3){Ji.fromArray(r,s);const o=n.x*Math.abs(Ji.x)+n.y*Math.abs(Ji.y)+n.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),h=i.dot(Ji);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Lh=new Oi,er=new P,Os=new P;class Si{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Lh.setFromPoints(e).getCenter(i);let n=0;for(let s=0,a=e.length;s<a;s++)n=Math.max(n,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(er,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Os.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(Os)),this.expandByPoint(er.copy(e.center).sub(Os))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const wi=new P,Ns=new P,Fr=new P,Bi=new P,Fs=new P,Br=new P,Bs=new P;class Ar{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Ns.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(Ns);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Fr),o=Bi.dot(this.direction),l=-Bi.dot(Fr),c=Bi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Ns).addScaledVector(Fr,d),f}intersectSphere(e,t){wi.subVectors(e.center,this.origin);const i=wi.dot(this.direction),n=wi.dot(wi)-i*i,s=e.radius*e.radius;if(n>s)return null;const a=Math.sqrt(s-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>n||((s>i||isNaN(i))&&(i=s),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,i,n,s){Fs.subVectors(t,e),Br.subVectors(i,e),Bs.crossVectors(Fs,Br);let a=this.direction.dot(Bs),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bi.subVectors(this.origin,e);const l=o*this.direction.dot(Br.crossVectors(Bi,Br));if(l<0)return null;const c=o*this.direction.dot(Fs.cross(Bi));if(c<0||l+c>a)return null;const h=-o*Bi.dot(Bs);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oe{constructor(e,t,i,n,s,a,o,l,c,h,u,d,f,g,v,m){Oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,a,o,l,c,h,u,d,f,g,v,m)}set(e,t,i,n,s,a,o,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=n,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Oe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/yn.setFromMatrixColumn(e,0).length(),s=1/yn.setFromMatrixColumn(e,1).length(),a=1/yn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dh,e,Ih)}lookAt(e,t,i){const n=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Gi.crossVectors(i,Wt),Gi.lengthSq()===0&&(Math.abs(i.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Gi.crossVectors(i,Wt)),Gi.normalize(),Gr.crossVectors(Wt,Gi),n[0]=Gi.x,n[4]=Gr.x,n[8]=Wt.x,n[1]=Gi.y,n[5]=Gr.y,n[9]=Wt.y,n[2]=Gi.z,n[6]=Gr.z,n[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],T=i[3],b=i[7],_=i[11],w=i[15],C=n[0],R=n[4],U=n[8],S=n[12],x=n[1],L=n[5],G=n[9],H=n[13],X=n[2],V=n[6],K=n[10],Z=n[14],z=n[3],se=n[7],ce=n[11],Te=n[15];return s[0]=a*C+o*x+l*X+c*z,s[4]=a*R+o*L+l*V+c*se,s[8]=a*U+o*G+l*K+c*ce,s[12]=a*S+o*H+l*Z+c*Te,s[1]=h*C+u*x+d*X+f*z,s[5]=h*R+u*L+d*V+f*se,s[9]=h*U+u*G+d*K+f*ce,s[13]=h*S+u*H+d*Z+f*Te,s[2]=g*C+v*x+m*X+p*z,s[6]=g*R+v*L+m*V+p*se,s[10]=g*U+v*G+m*K+p*ce,s[14]=g*S+v*H+m*Z+p*Te,s[3]=T*C+b*x+_*X+w*z,s[7]=T*R+b*L+_*V+w*se,s[11]=T*U+b*G+_*K+w*ce,s[15]=T*S+b*H+_*Z+w*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+s*l*u-n*c*u-s*o*d+i*c*d+n*o*f-i*l*f)+v*(+t*l*f-t*c*d+s*a*d-n*a*f+n*c*h-s*l*h)+m*(+t*c*u-t*o*f-s*a*u+i*a*f+s*o*h-i*c*h)+p*(-n*o*h-t*l*u+t*o*d+n*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],T=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,b=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,_=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,w=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,C=t*T+i*b+n*_+s*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return e[0]=T*R,e[1]=(v*d*s-u*m*s-v*n*f+i*m*f+u*n*p-i*d*p)*R,e[2]=(o*m*s-v*l*s+v*n*c-i*m*c-o*n*p+i*l*p)*R,e[3]=(u*l*s-o*d*s-u*n*c+i*d*c+o*n*f-i*l*f)*R,e[4]=b*R,e[5]=(h*m*s-g*d*s+g*n*f-t*m*f-h*n*p+t*d*p)*R,e[6]=(g*l*s-a*m*s-g*n*c+t*m*c+a*n*p-t*l*p)*R,e[7]=(a*d*s-h*l*s+h*n*c-t*d*c-a*n*f+t*l*f)*R,e[8]=_*R,e[9]=(g*u*s-h*v*s-g*i*f+t*v*f+h*i*p-t*u*p)*R,e[10]=(a*v*s-g*o*s+g*i*c-t*v*c-a*i*p+t*o*p)*R,e[11]=(h*o*s-a*u*s-h*i*c+t*u*c+a*i*f-t*o*f)*R,e[12]=w*R,e[13]=(h*v*n-g*u*n+g*i*d-t*v*d-h*i*m+t*u*m)*R,e[14]=(g*o*n-a*v*n-g*i*l+t*v*l+a*i*m-t*o*m)*R,e[15]=(a*u*n-h*o*n+h*i*l-t*u*l-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,n=e.y,s=e.z;return t[0]*=i,t[4]*=n,t[8]*=s,t[1]*=i,t[5]*=n,t[9]*=s,t[2]*=i,t[6]*=n,t[10]*=s,t[3]*=i,t[7]*=n,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,s,a){return this.set(1,i,s,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,g=s*u,v=a*h,m=a*u,p=o*u,T=l*c,b=l*h,_=l*u,w=i.x,C=i.y,R=i.z;return n[0]=(1-(v+p))*w,n[1]=(f+_)*w,n[2]=(g-b)*w,n[3]=0,n[4]=(f-_)*C,n[5]=(1-(d+p))*C,n[6]=(m+T)*C,n[7]=0,n[8]=(g+b)*R,n[9]=(m-T)*R,n[10]=(1-(d+v))*R,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let s=yn.set(n[0],n[1],n[2]).length();const a=yn.set(n[4],n[5],n[6]).length(),o=yn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),e.x=n[12],e.y=n[13],e.z=n[14],ri.copy(this);const c=1/s,h=1/a,u=1/o;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=h,ri.elements[5]*=h,ri.elements[6]*=h,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,t.setFromRotationMatrix(ri),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,n,s,a,o=_i,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(i-n),d=(t+e)/(t-e),f=(i+n)/(i-n);let g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===_i)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===gs)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,s,a,o=_i,l=!1){const c=this.elements,h=2/(t-e),u=2/(i-n),d=-(t+e)/(t-e),f=-(i+n)/(i-n);let g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===_i)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===gs)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const yn=new P,ri=new Oe,Dh=new P(0,0,0),Ih=new P(1,1,1),Gi=new P,Gr=new P,Wt=new P,nl=new Oe,rl=new di;class xi{constructor(e=0,t=0,i=0,n=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,s=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rl.setFromEuler(this),this.setFromQuaternion(rl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Uh=0;const sl=new P,_n=new di,Ci=new Oe,Hr=new P,tr=new P,Oh=new P,Nh=new di,al=new P(1,0,0),ol=new P(0,1,0),ll=new P(0,0,1),cl={type:"added"},Fh={type:"removed"},Mn={type:"childadded",child:null},Gs={type:"childremoved",child:null};class pt extends hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new P,t=new xi,i=new di,n=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Fe}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.multiply(_n),this}rotateOnWorldAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.premultiply(_n),this}rotateX(e){return this.rotateOnAxis(al,e)}rotateY(e){return this.rotateOnAxis(ol,e)}rotateZ(e){return this.rotateOnAxis(ll,e)}translateOnAxis(e,t){return sl.copy(e).applyQuaternion(this.quaternion),this.position.add(sl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(al,e)}translateY(e){return this.translateOnAxis(ol,e)}translateZ(e){return this.translateOnAxis(ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Hr.copy(e):Hr.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(tr,Hr,this.up):Ci.lookAt(Hr,tr,this.up),this.quaternion.setFromRotationMatrix(Ci),n&&(Ci.extractRotation(n.matrixWorld),_n.setFromRotationMatrix(Ci),this.quaternion.premultiply(_n.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cl),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fh),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cl),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Oh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Nh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));n.material=o}else n.material=s(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}pt.DEFAULT_UP=new P(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const si=new P,Ai=new P,Hs=new P,Ri=new P,xn=new P,Sn=new P,ul=new P,zs=new P,ks=new P,Vs=new P,Ws=new $e,Xs=new $e,Ks=new $e;class ci{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),si.subVectors(e,t),n.cross(si);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(e,t,i,n,s){si.subVectors(n,t),Ai.subVectors(i,t),Hs.subVectors(e,t);const a=si.dot(si),o=si.dot(Ai),l=si.dot(Hs),c=Ai.dot(Ai),h=Ai.dot(Hs),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,i,n,s,a,o,l){return this.getBarycoord(e,t,i,n,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,i,n,s,a){return Ws.setScalar(0),Xs.setScalar(0),Ks.setScalar(0),Ws.fromBufferAttribute(e,t),Xs.fromBufferAttribute(e,i),Ks.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(Ws,s.x),a.addScaledVector(Xs,s.y),a.addScaledVector(Ks,s.z),a}static isFrontFacing(e,t,i,n){return si.subVectors(i,t),Ai.subVectors(e,t),si.cross(Ai).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),si.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,s){return ci.getInterpolation(e,this.a,this.b,this.c,t,i,n,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,s=this.c;let a,o;xn.subVectors(n,i),Sn.subVectors(s,i),zs.subVectors(e,i);const l=xn.dot(zs),c=Sn.dot(zs);if(l<=0&&c<=0)return t.copy(i);ks.subVectors(e,n);const h=xn.dot(ks),u=Sn.dot(ks);if(h>=0&&u<=h)return t.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(xn,a);Vs.subVectors(e,s);const f=xn.dot(Vs),g=Sn.dot(Vs);if(g>=0&&f<=g)return t.copy(s);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Sn,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ul.subVectors(s,n),o=(u-h)/(u-h+(f-g)),t.copy(n).addScaledVector(ul,o);const p=1/(m+v+d);return a=v*p,o=d*p,t.copy(i).addScaledVector(xn,a).addScaledVector(Sn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},zr={h:0,s:0,l:0};function js(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class De{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=je.workingColorSpace){if(e=xo(e,1),t=He(t,0,1),i=He(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=js(a,s,e+1/3),this.g=js(a,s,e),this.b=js(a,s,e-1/3)}return je.colorSpaceToWorking(this,n),this}setStyle(e,t=yt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=n[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const i=Gc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return je.workingToColorSpace(Rt.copy(this),e),Math.round(He(Rt.r*255,0,255))*65536+Math.round(He(Rt.g*255,0,255))*256+Math.round(He(Rt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Rt.copy(this),t);const i=Rt.r,n=Rt.g,s=Rt.b,a=Math.max(i,n,s),o=Math.min(i,n,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=yt){je.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,i=Rt.g,n=Rt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(zr);const i=pr(Hi.h,zr.h,t),n=pr(Hi.s,zr.s,t),s=pr(Hi.l,zr.l,t);return this.setHSL(i,n,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*n,this.g=s[1]*t+s[4]*i+s[7]*n,this.b=s[2]*t+s[5]*i+s[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new De;De.NAMES=Gc;let Bh=0;class Mi extends hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=On,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_a,this.blendDst=Ma,this.blendEquation=an,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Bn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fn,this.stencilZFail=fn,this.stencilZPass=fn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==On&&(i.blending=this.blending),this.side!==ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_a&&(i.blendSrc=this.blendSrc),this.blendDst!==Ma&&(i.blendDst=this.blendDst),this.blendEquation!==an&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Bn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$o&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=n(e.textures),a=n(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class cn extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new P,kr=new Ae;let Gh=0;class ht{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=so,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==so&&(e.usage=this.usage),e}}class Hc extends ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zc extends ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class zt extends ht{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Hh=0;const Jt=new Oe,qs=new pt,Tn=new P,Xt=new Oi,ir=new Oi,Et=new P;class ii extends hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Oc(e)?zc:Hc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,i){return Jt.makeTranslation(e,t,i),this.applyMatrix4(Jt),this}scale(e,t,i){return Jt.makeScale(e,t,i),this.applyMatrix4(Jt),this}lookAt(e){return qs.lookAt(e),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tn).negate(),this.translate(Tn.x,Tn.y,Tn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,s=e.length;n<s;n++){const a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const s=t[i];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Xt.min,ir.min),Xt.expandByPoint(Et),Et.addVectors(Xt.max,ir.max),Xt.expandByPoint(Et)):(Xt.expandByPoint(ir.min),Xt.expandByPoint(ir.max))}Xt.getCenter(i);let n=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(Tn.fromBufferAttribute(e,c),Et.add(Tn)),n=Math.max(n,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<i.count;U++)o[U]=new P,l[U]=new P;const c=new P,h=new P,u=new P,d=new Ae,f=new Ae,g=new Ae,v=new P,m=new P;function p(U,S,x){c.fromBufferAttribute(i,U),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,x),d.fromBufferAttribute(s,U),f.fromBufferAttribute(s,S),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[U].add(v),o[S].add(v),o[x].add(v),l[U].add(m),l[S].add(m),l[x].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let U=0,S=T.length;U<S;++U){const x=T[U],L=x.start,G=x.count;for(let H=L,X=L+G;H<X;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new P,_=new P,w=new P,C=new P;function R(U){w.fromBufferAttribute(n,U),C.copy(w);const S=o[U];b.copy(S),b.sub(w.multiplyScalar(w.dot(S))).normalize(),_.crossVectors(C,S);const L=_.dot(l[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,L)}for(let U=0,S=T.length;U<S;++U){const x=T[U],L=x.start,G=x.count;for(let H=L,X=L+G;H<X;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(n,s),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ht(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ii,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,s=!0)}s&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hl=new Oe,Qi=new Ar,Vr=new Si,dl=new P,Wr=new P,Xr=new P,Kr=new P,Ys=new P,jr=new P,fl=new P,qr=new P;class _t extends pt{constructor(e=new ii,t=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(s&&o){jr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Ys.fromBufferAttribute(u,e),a?jr.addScaledVector(Ys,h):jr.addScaledVector(Ys.sub(t),h))}t.add(jr)}return t}raycast(e,t){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vr.copy(i.boundingSphere),Vr.applyMatrix4(s),Qi.copy(e.ray).recast(e.near),!(Vr.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Vr,dl)===null||Qi.origin.distanceToSquared(dl)>(e.far-e.near)**2))&&(hl.copy(s).invert(),Qi.copy(e.ray).applyMatrix4(hl),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,i){let n;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=T,w=b;_<w;_+=3){const C=o.getX(_),R=o.getX(_+1),U=o.getX(_+2);n=Yr(this,p,e,i,c,h,u,C,R,U),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),b=o.getX(m+1),_=o.getX(m+2);n=Yr(this,a,e,i,c,h,u,T,b,_),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=T,w=b;_<w;_+=3){const C=_,R=_+1,U=_+2;n=Yr(this,p,e,i,c,h,u,C,R,U),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,b=m+1,_=m+2;n=Yr(this,a,e,i,c,h,u,T,b,_),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function zh(r,e,t,i,n,s,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,s,n,!0,o):l=i.intersectTriangle(n,s,a,e.side===ti,o),l===null)return null;qr.copy(o),qr.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(qr);return c<t.near||c>t.far?null:{distance:c,point:qr.clone(),object:r}}function Yr(r,e,t,i,n,s,a,o,l,c){r.getVertexPosition(o,Wr),r.getVertexPosition(l,Xr),r.getVertexPosition(c,Kr);const h=zh(r,e,t,i,Wr,Xr,Kr,fl);if(h){const u=new P;ci.getBarycoord(fl,Wr,Xr,Kr,u),n&&(h.uv=ci.getInterpolatedAttribute(n,o,l,c,u,new Ae)),s&&(h.uv1=ci.getInterpolatedAttribute(s,o,l,c,u,new Ae)),a&&(h.normal=ci.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new P,materialIndex:0};ci.getNormal(Wr,Xr,Kr,d.normal),h.face=d,h.barycoord=u}return h}class Rr extends ii{constructor(e=1,t=1,i=1,n=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:s,depthSegments:a};const o=this;n=Math.floor(n),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,s,4),g("x","y","z",-1,-1,e,t,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(u,2));function g(v,m,p,T,b,_,w,C,R,U,S){const x=_/R,L=w/U,G=_/2,H=w/2,X=C/2,V=R+1,K=U+1;let Z=0,z=0;const se=new P;for(let ce=0;ce<K;ce++){const Te=ce*L-H;for(let ke=0;ke<V;ke++){const rt=ke*x-G;se[v]=rt*T,se[m]=Te*b,se[p]=X,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[p]=C>0?1:-1,h.push(se.x,se.y,se.z),u.push(ke/R),u.push(1-ce/U),Z+=1}}for(let ce=0;ce<U;ce++)for(let Te=0;Te<R;Te++){const ke=d+Te+V*ce,rt=d+Te+V*(ce+1),lt=d+(Te+1)+V*(ce+1),Ze=d+(Te+1)+V*ce;l.push(ke,rt,Ze),l.push(rt,lt,Ze),z+=6}o.addGroup(f,z,S),f+=z,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Wn(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const n=r[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function It(r){const e={};for(let t=0;t<r.length;t++){const i=Wn(r[t]);for(const n in i)e[n]=i[n]}return e}function kh(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function kc(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Vh={clone:Wn,merge:It};var Wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jt extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wh,this.fragmentShader=Xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wn(e.uniforms),this.uniformsGroups=kh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class So extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=_i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zi=new P,pl=new Ae,ml=new Ae;class Ut extends So{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vn*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zi.x,zi.y).multiplyScalar(-e/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zi.x,zi.y).multiplyScalar(-e/zi.z)}getViewSize(e,t){return this.getViewBounds(e,pl,ml),t.subVectors(ml,pl)}setViewOffset(e,t,i,n,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fr*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,s=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bn=-90,En=1;class Kh extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ut(bn,En,e,t);n.layers=this.layers,this.add(n);const s=new Ut(bn,En,e,t);s.layers=this.layers,this.add(s);const a=new Ut(bn,En,e,t);a.layers=this.layers,this.add(a);const o=new Ut(bn,En,e,t);o.layers=this.layers,this.add(o);const l=new Ut(bn,En,e,t);l.layers=this.layers,this.add(l);const c=new Ut(bn,En,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===_i)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,s),e.setRenderTarget(i,1,n),e.render(t,a),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Vc extends Mt{constructor(e=[],t=Gn,i,n,s,a,o,l,c,h){super(e,t,i,n,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jh extends qi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Vc(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Rr(5,5,5),s=new jt({name:"CubemapFromEquirect",uniforms:Wn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Ki});s.uniforms.tEquirect.value=t;const a=new _t(n,s),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=wt),new Kh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(s)}}class Xi extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qh={type:"move"};class $s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qh)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Xi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Er extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Yh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=so,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,s=this.stride;n<s;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new P;class To{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return new ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new To(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const gl=new P,vl=new $e,yl=new $e,$h=new P,_l=new Oe,$r=new P,Zs=new Si,Ml=new Oe,Js=new Ar;class Zh extends _t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ko,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Oi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,$r),this.boundingBox.expandByPoint($r)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Si),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,$r),this.boundingSphere.expandByPoint($r)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(n),e.ray.intersectsSphere(Zs)!==!1&&(Ml.copy(n).invert(),Js.copy(e.ray).applyMatrix4(Ml),!(this.boundingBox!==null&&Js.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Js)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new $e,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ko?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,n=this.geometry;vl.fromBufferAttribute(n.attributes.skinIndex,e),yl.fromBufferAttribute(n.attributes.skinWeight,e),gl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=yl.getComponent(s);if(a!==0){const o=vl.getComponent(s);_l.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector($h.copy(gl).applyMatrix4(_l),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Wc extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class bs extends Mt{constructor(e=null,t=1,i=1,n,s,a,o,l,c=Pt,h=Pt,u,d){super(null,a,o,l,c,h,n,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xl=new Oe,Jh=new Oe;class bo{constructor(e=[],t=[]){this.uuid=ui(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Oe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Jh;xl.multiplyMatrices(o,t[s]),xl.toArray(i,s*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new bo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new bs(t,e,e,qt,ei);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const s=e.bones[i];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Wc),this.bones.push(a),this.boneInverses.push(new Oe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,s=t.length;n<s;n++){const a=t[n];e.bones.push(a.uuid);const o=i[n];e.boneInverses.push(o.toArray())}return e}}class ao extends ht{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wn=new Oe,Sl=new Oe,Zr=[],Tl=new Oi,Qh=new Oe,nr=new _t,rr=new Si;class ed extends _t{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ao(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Qh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,wn),Tl.copy(e.boundingBox).applyMatrix4(wn),this.boundingBox.union(Tl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,wn),rr.copy(e.boundingSphere).applyMatrix4(wn),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(i),e.ray.intersectsSphere(rr)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,wn),Sl.multiplyMatrices(i,wn),nr.matrixWorld=Sl,nr.raycast(e,Zr);for(let a=0,o=Zr.length;a<o;a++){const l=Zr[a];l.instanceId=s,l.object=this,t.push(l)}Zr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ao(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new bs(new Float32Array(n*this.count),n,this.count,Ss,ei));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*e;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Qs=new P,td=new P,id=new Fe;class Wi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Qs.subVectors(i,t).cross(td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Qs),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||id.getNormalMatrix(e),n=this.coplanarPoint(Qs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const en=new Si,nd=new Ae(.5,.5),Jr=new P;class Eo{constructor(e=new Wi,t=new Wi,i=new Wi,n=new Wi,s=new Wi,a=new Wi){this.planes=[e,t,i,n,s,a]}set(e,t,i,n,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=_i,i=!1){const n=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],v=s[9],m=s[10],p=s[11],T=s[12],b=s[13],_=s[14],w=s[15];if(n[0].setComponents(c-a,f-h,p-g,w-T).normalize(),n[1].setComponents(c+a,f+h,p+g,w+T).normalize(),n[2].setComponents(c+o,f+u,p+v,w+b).normalize(),n[3].setComponents(c-o,f-u,p-v,w-b).normalize(),i)n[4].setComponents(l,d,m,_).normalize(),n[5].setComponents(c-l,f-d,p-m,w-_).normalize();else if(n[4].setComponents(c-l,f-d,p-m,w-_).normalize(),t===_i)n[5].setComponents(c+l,f+d,p+m,w+_).normalize();else if(t===gs)n[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),en.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),en.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(en)}intersectsSprite(e){en.center.set(0,0,0);const t=nd.distanceTo(e.center);return en.radius=.7071067811865476+t,en.applyMatrix4(e.matrixWorld),this.intersectsSphere(en)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Jr.x=n.normal.x>0?e.max.x:e.min.x,Jr.y=n.normal.y>0?e.max.y:e.min.y,Jr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xc extends Mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vs=new P,ys=new P,bl=new Oe,sr=new Ar,Qr=new Si,ea=new P,El=new P;class wo extends pt{constructor(e=new ii,t=new Xc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,s=t.count;n<s;n++)vs.fromBufferAttribute(t,n-1),ys.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=vs.distanceTo(ys);e.setAttribute("lineDistance",new zt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(n),Qr.radius+=s,e.ray.intersectsSphere(Qr)===!1)return;bl.copy(n).invert(),sr.copy(e.ray).applyMatrix4(bl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),T=h.getX(v+1),b=es(this,e,sr,l,p,T,v);b&&t.push(b)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=es(this,e,sr,l,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=es(this,e,sr,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=es(this,e,sr,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function es(r,e,t,i,n,s,a){const o=r.geometry.attributes.position;if(vs.fromBufferAttribute(o,n),ys.fromBufferAttribute(o,s),t.distanceSqToSegment(vs,ys,ea,El)>i)return;ea.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(ea);if(!(c<e.near||c>e.far))return{distance:c,point:El.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const wl=new P,Cl=new P;class rd extends wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,s=t.count;n<s;n+=2)wl.fromBufferAttribute(t,n),Cl.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+wl.distanceTo(Cl);e.setAttribute("lineDistance",new zt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sd extends wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Kc extends Mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Al=new Oe,oo=new Ar,ts=new Si,is=new P;class ad extends pt{constructor(e=new ii,t=new Kc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(n),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;Al.copy(n).invert(),oo.copy(e.ray).applyMatrix4(Al);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);is.fromBufferAttribute(u,m),Rl(is,m,l,n,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)is.fromBufferAttribute(u,g),Rl(is,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Rl(r,e,t,i,n,s,a){const o=oo.distanceSqToPoint(r);if(o<t){const l=new P;oo.closestPointToPoint(r,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ta extends Mt{constructor(e,t,i,n,s,a,o,l,c,h,u,d){super(null,a,o,l,c,h,n,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:i},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class Pl extends Mt{constructor(e,t,i,n,s,a,o,l,c){super(e,t,i,n,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jc extends Mt{constructor(e,t,i=un,n,s,a,o=Pt,l=Pt,c,h=xr,u=1){if(h!==xr&&h!==Sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,n,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ts(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class qc extends Mt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Pr extends ii{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const T=p*d-a;for(let b=0;b<c;b++){const _=b*u-s;g.push(_,-T,0),v.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const b=T+c*p,_=T+c*(p+1),w=T+1+c*(p+1),C=T+1+c*p;f.push(b,_,C),f.push(_,w,C)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Dn extends ii{constructor(e=1,t=32,i=16,n=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new P,d=new P,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const T=[],b=p/i;let _=0;p===0&&a===0?_=.5/t:p===i&&l===Math.PI&&(_=-.5/t);for(let w=0;w<=t;w++){const C=w/t;u.x=-e*Math.cos(n+C*s)*Math.sin(a+b*o),u.y=e*Math.cos(a+b*o),u.z=e*Math.sin(n+C*s)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(C+_,1-b),T.push(c++)}h.push(T)}for(let p=0;p<i;p++)for(let T=0;T<t;T++){const b=h[p][T+1],_=h[p][T],w=h[p+1][T],C=h[p+1][T+1];(p!==0||a>0)&&f.push(b,_,C),(p!==i-1||l<Math.PI)&&f.push(_,w,C)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(v,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wr extends Mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ti extends wr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class od extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ld extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ns(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function cd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ud(r){function e(n,s){return r[n]-r[s]}const t=r.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Ll(r,e,t){const i=r.length,n=new r.constructor(i);for(let s=0,a=0;a!==i;++s){const o=t[s]*e;for(let l=0;l!==e;++l)n[a++]=r[o+l]}return n}function Yc(r,e,t,i){let n=1,s=r[0];for(;s!==void 0&&s[i]===void 0;)s=r[n++];if(s===void 0)return;let a=s[i];if(a!==void 0)if(Array.isArray(a))do a=s[i],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[n++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[i],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[n++];while(s!==void 0);else do a=s[i],a!==void 0&&(e.push(s.time),t.push(a)),s=r[n++];while(s!==void 0)}class Lr{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],s=t[i-1];i:{e:{let a;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<s)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=n,n=t[++i],e<n)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=s,s=t[--i-1],e>=s)break e}a=i,i=0;break t}break i}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(n=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,n)}return this.interpolate_(i,s,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n;for(let a=0;a!==n;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class hd extends Lr{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jo,endingEnd:jo}}intervalChanged_(e,t,i){const n=this.parameterPositions;let s=e-2,a=e+1,o=n[s],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case qo:s=e,o=2*t-i;break;case Yo:s=n.length-2,o=t+n[s]-n[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case qo:a=e,l=2*i-t;break;case Yo:a=1,l=i+n[1]-n[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,i,n){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(n-t),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,T=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,b=(-1-f)*m+(1.5+f)*v+.5*g,_=f*m-f*v;for(let w=0;w!==o;++w)s[w]=p*a[h+w]+T*a[c+w]+b*a[l+w]+_*a[u+w];return s}}class dd extends Lr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class fd extends Lr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class fi{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ns(t,this.TimeBufferType),this.values=ns(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ns(e.times,Array),values:ns(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new fd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hd(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zn:t=this.InterpolantFactoryMethodDiscrete;break;case kn:t=this.InterpolantFactoryMethodLinear;break;case Rs:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zn;case this.InterpolantFactoryMethodLinear:return kn;case this.InterpolantFactoryMethodSmooth:return Rs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let s=0,a=n-1;for(;s!==n&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==n){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(n!==void 0&&cd(n))for(let o=0,l=n.length;o!==l;++o){const c=n[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Rs,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{const u=o*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){const v=t[u+g];if(v!==t[d+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}}fi.prototype.ValueTypeName="";fi.prototype.TimeBufferType=Float32Array;fi.prototype.ValueBufferType=Float32Array;fi.prototype.DefaultInterpolation=kn;class qn extends fi{constructor(e,t,i){super(e,t,i)}}qn.prototype.ValueTypeName="bool";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=zn;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;class $c extends fi{constructor(e,t,i,n){super(e,t,i,n)}}$c.prototype.ValueTypeName="color";class Xn extends fi{constructor(e,t,i,n){super(e,t,i,n)}}Xn.prototype.ValueTypeName="number";class pd extends Lr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t);let c=e*o;for(let h=c+o;c!==h;c+=4)di.slerpFlat(s,0,a,c-o,a,c,l);return s}}class Kn extends fi{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new pd(this.times,this.values,this.getValueSize(),e)}}Kn.prototype.ValueTypeName="quaternion";Kn.prototype.InterpolantFactoryMethodSmooth=void 0;class Yn extends fi{constructor(e,t,i){super(e,t,i)}}Yn.prototype.ValueTypeName="string";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=zn;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;class jn extends fi{constructor(e,t,i,n){super(e,t,i,n)}}jn.prototype.ValueTypeName="vector";class md{constructor(e="",t=-1,i=[],n=$u){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=ui(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(vd(i[a]).scale(n));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=i.length;s!==a;++s)t.push(fi.toJSON(i[s]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=ud(l);l=Ll(l,1,h),c=Ll(c,1,h),!n&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new Xn(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=n[u];d||(n[u]=d=[]),d.push(c)}}const a=[];for(const o in n)a.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(u,d,f,g,v){if(f.length!==0){const m=[],p=[];Yc(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},n=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let T=0;T!==d[g].morphTargets.length;++T){const b=d[g];m.push(b.time),p.push(b.morphTarget===v?1:0)}n.push(new Xn(".morphTargetInfluence["+v+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";i(jn,f+".position",d,"pos",n),i(Kn,f+".quaternion",d,"rot",n),i(jn,f+".scale",d,"scl",n)}}return n.length===0?null:new this(s,l,n,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function gd(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xn;case"vector":case"vector2":case"vector3":case"vector4":return jn;case"color":return $c;case"quaternion":return Kn;case"bool":case"boolean":return qn;case"string":return Yn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function vd(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=gd(r.type);if(r.times===void 0){const t=[],i=[];Yc(r.keys,t,i,"value"),r.times=t,r.values=i}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Ii={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class yd{constructor(e,t,i){const n=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){o++,s===!1&&n.onStart!==void 0&&n.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const _d=new yd;class $n{constructor(e){this.manager=e!==void 0?e:_d,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,s){i.load(e,n,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}$n.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi={};class Md extends Error{constructor(e,t){super(e),this.response=t}}class Zc extends $n{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ii.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Pi[e]!==void 0){Pi[e].push({onLoad:t,onProgress:i,onError:n});return}Pi[e]=[],Pi[e].push({onLoad:t,onProgress:i,onError:n});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Pi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){T();function T(){u.read().then(({done:b,value:_})=>{if(b)p.close();else{v+=_.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let C=0,R=h.length;C<R;C++){const U=h[C];U.onProgress&&U.onProgress(w)}p.enqueue(_),T()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Md(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ii.add(`file:${e}`,c);const h=Pi[e];delete Pi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Pi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Pi[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Cn=new WeakMap;class xd extends $n{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Ii.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Cn.get(a);u===void 0&&(u=[],Cn.set(a,u)),u.push({onLoad:t,onError:n})}return a}const o=Tr("img");function l(){h(),t&&t(this);const u=Cn.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Cn.delete(this),s.manager.itemEnd(e)}function c(u){h(),n&&n(u),Ii.remove(`image:${e}`);const d=Cn.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}Cn.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ii.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Jc extends $n{constructor(e){super(e)}load(e,t,i,n){const s=new Mt,a=new xd(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,n),s}}class Co extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ia=new Oe,Dl=new P,Il=new P;class Ao{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eo,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dl),Il.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Il),t.updateMatrixWorld(),ia.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ia,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ia)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sd extends Ao{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Vn*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||n!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=n,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Td extends Co{constructor(e,t,i=0,n=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=i,this.angle=n,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Sd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ul=new Oe,ar=new P,na=new P;class bd extends Ao{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new $e(2,1,1,1),new $e(0,1,1,1),new $e(3,1,1,1),new $e(1,1,1,1),new $e(3,0,1,1),new $e(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ar.setFromMatrixPosition(e.matrixWorld),i.position.copy(ar),na.copy(i.position),na.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(na),i.updateMatrixWorld(),n.makeTranslation(-ar.x,-ar.y,-ar.z),Ul.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul,i.coordinateSystem,i.reversedDepth)}}class Ed extends Co{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new bd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ro extends So{constructor(e=-1,t=1,i=1,n=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wd extends Ao{constructor(){super(new Ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cd extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new wd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ra=new WeakMap;class Ad extends $n{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Ii.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{if(ra.has(a)===!0)n&&n(ra.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ii.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){n&&n(c),ra.set(l,c),Ii.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Ii.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Rd extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Po="\\[\\]\\.:\\/",Pd=new RegExp("["+Po+"]","g"),Lo="[^"+Po+"]",Ld="[^"+Po.replace("\\.","")+"]",Dd=/((?:WC+[\/:])*)/.source.replace("WC",Lo),Id=/(WCOD+)?/.source.replace("WCOD",Ld),Ud=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lo),Od=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lo),Nd=new RegExp("^"+Dd+Id+Ud+Od+"$"),Fd=["material","materials","bones","map"];class Bd{constructor(e,t,i){const n=i||qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,s=i.length;n!==s;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class qe{constructor(e,t,i){this.path=t,this.parsedPath=i||qe.parseTrackName(t),this.node=qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new qe.Composite(e,t,i):new qe(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Pd,"")}static parseTrackName(e){const t=Nd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const s=i.nodeName.substring(n+1);Fd.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,s=i.length;n!==s;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let s=t.propertyIndex;if(e||(e=qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[n];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}qe.Composite=Bd;qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qe.prototype.GetterByBindingType=[qe.prototype._getValue_direct,qe.prototype._getValue_array,qe.prototype._getValue_arrayElement,qe.prototype._getValue_toArray];qe.prototype.SetterByBindingTypeAndVersioning=[[qe.prototype._setValue_direct,qe.prototype._setValue_direct_setNeedsUpdate,qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_array,qe.prototype._setValue_array_setNeedsUpdate,qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_arrayElement,qe.prototype._setValue_arrayElement_setNeedsUpdate,qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_fromArray,qe.prototype._setValue_fromArray_setNeedsUpdate,qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ol{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=He(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(He(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Gd extends hn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Nl(r,e,t,i){const n=Hd(i);switch(t){case Rc:return r*e;case Ss:return r*e/n.components*n.byteLength;case yo:return r*e/n.components*n.byteLength;case Lc:return r*e*2/n.components*n.byteLength;case _o:return r*e*2/n.components*n.byteLength;case Pc:return r*e*3/n.components*n.byteLength;case qt:return r*e*4/n.components*n.byteLength;case Mo:return r*e*4/n.components*n.byteLength;case us:case hs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ds:case fs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case La:case Ia:return Math.max(r,16)*Math.max(e,8)/4;case Pa:case Da:return Math.max(r,8)*Math.max(e,8)/2;case Ua:case Oa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Na:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case za:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ka:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Va:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case ja:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case qa:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ya:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case $a:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Za:case Ja:case Qa:return Math.ceil(r/4)*Math.ceil(e/4)*16;case eo:case to:return Math.ceil(r/4)*Math.ceil(e/4)*8;case io:case no:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hd(r){switch(r){case hi:case Ec:return{byteLength:1,components:1};case _r:case wc:case Cr:return{byteLength:2,components:1};case go:case vo:return{byteLength:2,components:4};case un:case mo:case ei:return{byteLength:4,components:1};case Cc:case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ms}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ms);function Qc(){let r=null,e=!1,t=null,i=null;function n(s,a){t(s,a),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function zd(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];r.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:s,update:a}}var kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$d=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ef=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,df=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ff=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,mf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_f="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Sf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Af=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Of=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ff=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$f=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ip=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,np=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,op=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ep=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Np=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$p=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,im=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,om=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ym=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:kd,alphahash_pars_fragment:Vd,alphamap_fragment:Wd,alphamap_pars_fragment:Xd,alphatest_fragment:Kd,alphatest_pars_fragment:jd,aomap_fragment:qd,aomap_pars_fragment:Yd,batching_pars_vertex:$d,batching_vertex:Zd,begin_vertex:Jd,beginnormal_vertex:Qd,bsdfs:ef,iridescence_fragment:tf,bumpmap_pars_fragment:nf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:sf,clipping_planes_pars_vertex:af,clipping_planes_vertex:of,color_fragment:lf,color_pars_fragment:cf,color_pars_vertex:uf,color_vertex:hf,common:df,cube_uv_reflection_fragment:ff,defaultnormal_vertex:pf,displacementmap_pars_vertex:mf,displacementmap_vertex:gf,emissivemap_fragment:vf,emissivemap_pars_fragment:yf,colorspace_fragment:_f,colorspace_pars_fragment:Mf,envmap_fragment:xf,envmap_common_pars_fragment:Sf,envmap_pars_fragment:Tf,envmap_pars_vertex:bf,envmap_physical_pars_fragment:Of,envmap_vertex:Ef,fog_vertex:wf,fog_pars_vertex:Cf,fog_fragment:Af,fog_pars_fragment:Rf,gradientmap_pars_fragment:Pf,lightmap_pars_fragment:Lf,lights_lambert_fragment:Df,lights_lambert_pars_fragment:If,lights_pars_begin:Uf,lights_toon_fragment:Nf,lights_toon_pars_fragment:Ff,lights_phong_fragment:Bf,lights_phong_pars_fragment:Gf,lights_physical_fragment:Hf,lights_physical_pars_fragment:zf,lights_fragment_begin:kf,lights_fragment_maps:Vf,lights_fragment_end:Wf,logdepthbuf_fragment:Xf,logdepthbuf_pars_fragment:Kf,logdepthbuf_pars_vertex:jf,logdepthbuf_vertex:qf,map_fragment:Yf,map_pars_fragment:$f,map_particle_fragment:Zf,map_particle_pars_fragment:Jf,metalnessmap_fragment:Qf,metalnessmap_pars_fragment:ep,morphinstance_vertex:tp,morphcolor_vertex:ip,morphnormal_vertex:np,morphtarget_pars_vertex:rp,morphtarget_vertex:sp,normal_fragment_begin:ap,normal_fragment_maps:op,normal_pars_fragment:lp,normal_pars_vertex:cp,normal_vertex:up,normalmap_pars_fragment:hp,clearcoat_normal_fragment_begin:dp,clearcoat_normal_fragment_maps:fp,clearcoat_pars_fragment:pp,iridescence_pars_fragment:mp,opaque_fragment:gp,packing:vp,premultiplied_alpha_fragment:yp,project_vertex:_p,dithering_fragment:Mp,dithering_pars_fragment:xp,roughnessmap_fragment:Sp,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:bp,shadowmap_pars_vertex:Ep,shadowmap_vertex:wp,shadowmask_pars_fragment:Cp,skinbase_vertex:Ap,skinning_pars_vertex:Rp,skinning_vertex:Pp,skinnormal_vertex:Lp,specularmap_fragment:Dp,specularmap_pars_fragment:Ip,tonemapping_fragment:Up,tonemapping_pars_fragment:Op,transmission_fragment:Np,transmission_pars_fragment:Fp,uv_pars_fragment:Bp,uv_pars_vertex:Gp,uv_vertex:Hp,worldpos_vertex:zp,background_vert:kp,background_frag:Vp,backgroundCube_vert:Wp,backgroundCube_frag:Xp,cube_vert:Kp,cube_frag:jp,depth_vert:qp,depth_frag:Yp,distanceRGBA_vert:$p,distanceRGBA_frag:Zp,equirect_vert:Jp,equirect_frag:Qp,linedashed_vert:em,linedashed_frag:tm,meshbasic_vert:im,meshbasic_frag:nm,meshlambert_vert:rm,meshlambert_frag:sm,meshmatcap_vert:am,meshmatcap_frag:om,meshnormal_vert:lm,meshnormal_frag:cm,meshphong_vert:um,meshphong_frag:hm,meshphysical_vert:dm,meshphysical_frag:fm,meshtoon_vert:pm,meshtoon_frag:mm,points_vert:gm,points_frag:vm,shadow_vert:ym,shadow_frag:_m,sprite_vert:Mm,sprite_frag:xm},re={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},gi={basic:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new De(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:It([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:It([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new De(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:It([re.points,re.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:It([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:It([re.common,re.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:It([re.sprite,re.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:It([re.common,re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:It([re.lights,re.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};gi.physical={uniforms:It([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const rs={r:0,b:0,g:0},tn=new xi,Sm=new Oe;function Tm(r,e,t,i,n,s,a){const o=new De(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?t:e).get(_)),_}function v(b){let _=!1;const w=g(b);w===null?p(o,l):w&&w.isColor&&(p(w,1),_=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,_){const w=g(_);w&&(w.isCubeTexture||w.mapping===xs)?(h===void 0&&(h=new _t(new Rr(1,1,1),new jt({name:"BackgroundCubeMaterial",uniforms:Wn(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),tn.copy(_.backgroundRotation),tn.x*=-1,tn.y*=-1,tn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(tn.y*=-1,tn.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Sm.makeRotationFromEuler(tn)),h.material.toneMapped=je.getTransfer(w.colorSpace)!==tt,(u!==w||d!==w.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new _t(new Pr(2,2),new jt({name:"BackgroundMaterial",uniforms:Wn(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=je.getTransfer(w.colorSpace)!==tt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,_){b.getRGB(rs,kc(r)),i.buffers.color.setClear(rs.r,rs.g,rs.b,_,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,_=1){o.set(b),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:v,addToRenderList:m,dispose:T}}function bm(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=d(null);let s=n,a=!1;function o(x,L,G,H,X){let V=!1;const K=u(H,G,L);s!==K&&(s=K,c(s.object)),V=f(x,H,G,X),V&&g(x,H,G,X),X!==null&&e.update(X,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(x,L,G,H),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function u(x,L,G){const H=G.wireframe===!0;let X=i[x.id];X===void 0&&(X={},i[x.id]=X);let V=X[L.id];V===void 0&&(V={},X[L.id]=V);let K=V[H];return K===void 0&&(K=d(l()),V[H]=K),K}function d(x){const L=[],G=[],H=[];for(let X=0;X<t;X++)L[X]=0,G[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:H,object:x,attributes:{},index:null}}function f(x,L,G,H){const X=s.attributes,V=L.attributes;let K=0;const Z=G.getAttributes();for(const z in Z)if(Z[z].location>=0){const ce=X[z];let Te=V[z];if(Te===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(Te=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(Te=x.instanceColor)),ce===void 0||ce.attribute!==Te||Te&&ce.data!==Te.data)return!0;K++}return s.attributesNum!==K||s.index!==H}function g(x,L,G,H){const X={},V=L.attributes;let K=0;const Z=G.getAttributes();for(const z in Z)if(Z[z].location>=0){let ce=V[z];ce===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor));const Te={};Te.attribute=ce,ce&&ce.data&&(Te.data=ce.data),X[z]=Te,K++}s.attributes=X,s.attributesNum=K,s.index=H}function v(){const x=s.newAttributes;for(let L=0,G=x.length;L<G;L++)x[L]=0}function m(x){p(x,0)}function p(x,L){const G=s.newAttributes,H=s.enabledAttributes,X=s.attributeDivisors;G[x]=1,H[x]===0&&(r.enableVertexAttribArray(x),H[x]=1),X[x]!==L&&(r.vertexAttribDivisor(x,L),X[x]=L)}function T(){const x=s.newAttributes,L=s.enabledAttributes;for(let G=0,H=L.length;G<H;G++)L[G]!==x[G]&&(r.disableVertexAttribArray(G),L[G]=0)}function b(x,L,G,H,X,V,K){K===!0?r.vertexAttribIPointer(x,L,G,X,V):r.vertexAttribPointer(x,L,G,H,X,V)}function _(x,L,G,H){v();const X=H.attributes,V=G.getAttributes(),K=L.defaultAttributeValues;for(const Z in V){const z=V[Z];if(z.location>=0){let se=X[Z];if(se===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(se=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(se=x.instanceColor)),se!==void 0){const ce=se.normalized,Te=se.itemSize,ke=e.get(se);if(ke===void 0)continue;const rt=ke.buffer,lt=ke.type,Ze=ke.bytesPerElement,j=lt===r.INT||lt===r.UNSIGNED_INT||se.gpuType===mo;if(se.isInterleavedBufferAttribute){const $=se.data,de=$.stride,Le=se.offset;if($.isInstancedInterleavedBuffer){for(let xe=0;xe<z.locationSize;xe++)p(z.location+xe,$.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let xe=0;xe<z.locationSize;xe++)m(z.location+xe);r.bindBuffer(r.ARRAY_BUFFER,rt);for(let xe=0;xe<z.locationSize;xe++)b(z.location+xe,Te/z.locationSize,lt,ce,de*Ze,(Le+Te/z.locationSize*xe)*Ze,j)}else{if(se.isInstancedBufferAttribute){for(let $=0;$<z.locationSize;$++)p(z.location+$,se.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let $=0;$<z.locationSize;$++)m(z.location+$);r.bindBuffer(r.ARRAY_BUFFER,rt);for(let $=0;$<z.locationSize;$++)b(z.location+$,Te/z.locationSize,lt,ce,Te*Ze,Te/z.locationSize*$*Ze,j)}}else if(K!==void 0){const ce=K[Z];if(ce!==void 0)switch(ce.length){case 2:r.vertexAttrib2fv(z.location,ce);break;case 3:r.vertexAttrib3fv(z.location,ce);break;case 4:r.vertexAttrib4fv(z.location,ce);break;default:r.vertexAttrib1fv(z.location,ce)}}}}T()}function w(){U();for(const x in i){const L=i[x];for(const G in L){const H=L[G];for(const X in H)h(H[X].object),delete H[X];delete L[G]}delete i[x]}}function C(x){if(i[x.id]===void 0)return;const L=i[x.id];for(const G in L){const H=L[G];for(const X in H)h(H[X].object),delete H[X];delete L[G]}delete i[x.id]}function R(x){for(const L in i){const G=i[L];if(G[x.id]===void 0)continue;const H=G[x.id];for(const X in H)h(H[X].object),delete H[X];delete G[x.id]}}function U(){S(),a=!0,s!==n&&(s=n,c(s.object))}function S(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:U,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Em(r,e,t){let i;function n(c){i=c}function s(c,h){r.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];t.update(g,i,1)}}this.setMode=n,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function wm(r,e,t,i){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==qt&&i.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===Cr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==hi&&i.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ei&&!U)}function l(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:w,maxSamples:C}}function Cm(r){const e=this;let t=null,i=0,n=!1,s=!1;const a=new Wi,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!n||g===null||g.length===0||s&&!m)s?h(null):c();else{const T=s?0:i,b=T*4;let _=p.clippingState||null;l.value=_,_=h(g,d,b,f);for(let w=0;w!==b;++w)_[w]=t[w];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,_=f;b!==v;++b,_+=4)a.copy(u[b]).applyMatrix4(T,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Am(r){let e=new WeakMap;function t(a,o){return o===Aa?a.mapping=Gn:o===Ra&&(a.mapping=Hn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Aa||o===Ra)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new jh(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",n),t(c.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const In=4,Fl=[.125,.215,.35,.446,.526,.582],on=20,sa=new Ro,Bl=new De;let aa=null,oa=0,la=0,ca=!1;const sn=(1+Math.sqrt(5))/2,An=1/sn,Gl=[new P(-sn,An,0),new P(sn,An,0),new P(-An,0,sn),new P(An,0,sn),new P(0,sn,-An),new P(0,sn,An),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Rm=new P;class Hl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100,s={}){const{size:a=256,position:o=Rm}=s;aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(aa,oa,la),this._renderer.xr.enabled=ca,e.scissorTest=!1,ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gn||e.mapping===Hn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Cr,format:qt,colorSpace:Ot,depthBuffer:!1},n=zl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Pm(s)),this._blurMaterial=Lm(s,e,t)}return n}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,sa)}_sceneToCubeUV(e,t,i,n,s){const l=new Ut(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Bl),u.toneMapping=ji,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null));const v=new cn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),m=new _t(new Rr,v);let p=!1;const T=e.background;T?T.isColor&&(v.color.copy(T),e.background=null,p=!0):(v.color.copy(Bl),p=!0);for(let b=0;b<6;b++){const _=b%3;_===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[b],s.y,s.z)):_===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[b]));const w=this._cubeSize;ss(n,_*w,b>2?w:0,w,w),u.setRenderTarget(n),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===Gn||e.mapping===Hn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const s=n?this._cubemapMaterial:this._equirectMaterial,a=new _t(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ss(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,sa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const n=this._lodPlanes.length;for(let s=1;s<n;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Gl[(n-s-1)%Gl.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,n,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",s),this._halfBlur(a,e,i,i,n,"longitudinal",s)}_halfBlur(e,t,i,n,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new _t(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*on-1),v=s/g,m=isFinite(s)?1+Math.floor(h*v):on;m>on&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${on}`);const p=[];let T=0;for(let R=0;R<on;++R){const U=R/v,S=Math.exp(-U*U/2);p.push(S),R===0?T+=S:R<m&&(T+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-i;const _=this._sizeLods[n],w=3*_*(n>b-In?n-b+In:0),C=4*(this._cubeSize-_);ss(t,w,C,3*_,2*_),l.setRenderTarget(t),l.render(u,sa)}}function Pm(r){const e=[],t=[],i=[];let n=r;const s=r-In+1+Fl.length;for(let a=0;a<s;a++){const o=Math.pow(2,n);t.push(o);let l=1/o;a>r-In?l=Fl[a-r+In-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),b=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,U=C>2?0:-1,S=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];T.set(S,v*g*C),b.set(d,m*g*C);const x=[C,C,C,C,C,C];_.set(x,p*g*C)}const w=new ii;w.setAttribute("position",new ht(T,v)),w.setAttribute("uv",new ht(b,m)),w.setAttribute("faceIndex",new ht(_,p)),e.push(w),n>In&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function zl(r,e,t){const i=new qi(r,e,t);return i.texture.mapping=xs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ss(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function Lm(r,e,t){const i=new Float32Array(on),n=new P(0,1,0);return new jt({name:"SphericalGaussianBlur",defines:{n:on,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function kl(){return new jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Vl(){return new jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Do(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dm(r){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Aa||l===Ra,h=l===Gn||l===Hn;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Hl(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&n(f)?(t===null&&(t=new Hl(r)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Im(r){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=r.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&br("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Um(r,e,t,i){const n={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete n[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let b=0,_=T.length;b<_;b+=3){const w=T[b+0],C=T[b+1],R=T[b+2];d.push(w,C,C,R,R,w)}}else if(g!==void 0){const T=g.array;v=g.version;for(let b=0,_=T.length/3-1;b<_;b+=3){const w=b+0,C=b+1,R=b+2;d.push(w,C,C,R,R,w)}}else return;const m=new(Oc(d)?zc:Hc)(d,1);m.version=v;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Om(r,e,t){let i;function n(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(i,f,s,d*a),t.update(f,i,1)}function c(d,f,g){g!==0&&(r.drawElementsInstanced(i,f,s,d*a,g),t.update(f,i,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(d,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*v[T];t.update(p,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Nm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Fm(r,e,t){const i=new WeakMap,n=new $e;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let b=0;f===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let _=o.attributes.position.count*b,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const C=new Float32Array(_*w*4*u),R=new Fc(C,_,w,u);R.type=ei,R.needsUpdate=!0;const U=b*4;for(let x=0;x<u;x++){const L=m[x],G=p[x],H=T[x],X=_*w*4*x;for(let V=0;V<L.count;V++){const K=V*U;f===!0&&(n.fromBufferAttribute(L,V),C[X+K+0]=n.x,C[X+K+1]=n.y,C[X+K+2]=n.z,C[X+K+3]=0),g===!0&&(n.fromBufferAttribute(G,V),C[X+K+4]=n.x,C[X+K+5]=n.y,C[X+K+6]=n.z,C[X+K+7]=0),v===!0&&(n.fromBufferAttribute(H,V),C[X+K+8]=n.x,C[X+K+9]=n.y,C[X+K+10]=n.z,C[X+K+11]=H.itemSize===4?n.w:1)}}d={count:u,texture:R,size:new Ae(_,w)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Bm(r,e,t,i){let n=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return u}function a(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const eu=new Mt,Wl=new jc(1,1),tu=new Fc,iu=new Ph,nu=new Vc,Xl=[],Kl=[],jl=new Float32Array(16),ql=new Float32Array(9),Yl=new Float32Array(4);function Zn(r,e,t){const i=r[0];if(i<=0||i>0)return r;const n=e*t;let s=Xl[n];if(s===void 0&&(s=new Float32Array(n),Xl[n]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function St(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function Tt(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Es(r,e){let t=Kl[e];t===void 0&&(t=new Int32Array(e),Kl[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Gm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2fv(this.addr,e),Tt(t,e)}}function zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;r.uniform3fv(this.addr,e),Tt(t,e)}}function km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4fv(this.addr,e),Tt(t,e)}}function Vm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,i))return;Yl.set(i),r.uniformMatrix2fv(this.addr,!1,Yl),Tt(t,i)}}function Wm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,i))return;ql.set(i),r.uniformMatrix3fv(this.addr,!1,ql),Tt(t,i)}}function Xm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,i))return;jl.set(i),r.uniformMatrix4fv(this.addr,!1,jl),Tt(t,i)}}function Km(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2iv(this.addr,e),Tt(t,e)}}function qm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3iv(this.addr,e),Tt(t,e)}}function Ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4iv(this.addr,e),Tt(t,e)}}function $m(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2uiv(this.addr,e),Tt(t,e)}}function Jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3uiv(this.addr,e),Tt(t,e)}}function Qm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4uiv(this.addr,e),Tt(t,e)}}function e0(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(Wl.compareFunction=Uc,s=Wl):s=eu,t.setTexture2D(e||s,n)}function t0(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||iu,n)}function i0(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||nu,n)}function n0(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||tu,n)}function r0(r){switch(r){case 5126:return Gm;case 35664:return Hm;case 35665:return zm;case 35666:return km;case 35674:return Vm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return Km;case 35667:case 35671:return jm;case 35668:case 35672:return qm;case 35669:case 35673:return Ym;case 5125:return $m;case 36294:return Zm;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return n0}}function s0(r,e){r.uniform1fv(this.addr,e)}function a0(r,e){const t=Zn(e,this.size,2);r.uniform2fv(this.addr,t)}function o0(r,e){const t=Zn(e,this.size,3);r.uniform3fv(this.addr,t)}function l0(r,e){const t=Zn(e,this.size,4);r.uniform4fv(this.addr,t)}function c0(r,e){const t=Zn(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function u0(r,e){const t=Zn(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function h0(r,e){const t=Zn(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function d0(r,e){r.uniform1iv(this.addr,e)}function f0(r,e){r.uniform2iv(this.addr,e)}function p0(r,e){r.uniform3iv(this.addr,e)}function m0(r,e){r.uniform4iv(this.addr,e)}function g0(r,e){r.uniform1uiv(this.addr,e)}function v0(r,e){r.uniform2uiv(this.addr,e)}function y0(r,e){r.uniform3uiv(this.addr,e)}function _0(r,e){r.uniform4uiv(this.addr,e)}function M0(r,e,t){const i=this.cache,n=e.length,s=Es(t,n);St(i,s)||(r.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==n;++a)t.setTexture2D(e[a]||eu,s[a])}function x0(r,e,t){const i=this.cache,n=e.length,s=Es(t,n);St(i,s)||(r.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||iu,s[a])}function S0(r,e,t){const i=this.cache,n=e.length,s=Es(t,n);St(i,s)||(r.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||nu,s[a])}function T0(r,e,t){const i=this.cache,n=e.length,s=Es(t,n);St(i,s)||(r.uniform1iv(this.addr,s),Tt(i,s));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||tu,s[a])}function b0(r){switch(r){case 5126:return s0;case 35664:return a0;case 35665:return o0;case 35666:return l0;case 35674:return c0;case 35675:return u0;case 35676:return h0;case 5124:case 35670:return d0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return g0;case 36294:return v0;case 36295:return y0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return S0;case 36289:case 36303:case 36311:case 36292:return T0}}class E0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=r0(t.type)}}class w0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b0(t.type)}}class C0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let s=0,a=n.length;s!==a;++s){const o=n[s];o.setValue(e,t[o.id],i)}}}const ua=/(\w+)(\])?(\[|\.)?/g;function $l(r,e){r.seq.push(e),r.map[e.id]=e}function A0(r,e,t){const i=r.name,n=i.length;for(ua.lastIndex=0;;){const s=ua.exec(i),a=ua.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){$l(t,c===void 0?new E0(o,r,e):new w0(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new C0(o),$l(t,u)),t=u}}}class ps{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=e.getActiveUniform(t,n),a=e.getUniformLocation(t,s.name);A0(s,a,this)}}setValue(e,t,i,n){const s=this.map[t];s!==void 0&&s.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,s=e.length;n!==s;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function Zl(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}const R0=37297;let P0=0;function L0(r,e){const t=r.split(`
`),i=[],n=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=n;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Jl=new Fe;function D0(r){je._getMatrix(Jl,je.workingColorSpace,r);const e=`mat3( ${Jl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(r)){case ms:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Ql(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+L0(r.getShaderSource(e),o)}else return s}function I0(r,e){const t=D0(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function U0(r,e){let t;switch(e){case Vu:t="Linear";break;case Wu:t="Reinhard";break;case Xu:t="Cineon";break;case Tc:t="ACESFilmic";break;case ju:t="AgX";break;case qu:t="Neutral";break;case Ku:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const as=new P;function O0(){je.getLuminanceCoefficients(as);const r=as.x.toFixed(4),e=as.y.toFixed(4),t=as.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ur).join(`
`)}function F0(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function B0(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(e,n),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ur(r){return r!==""}function ec(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const G0=/^[ \t]*#include +<([\w\d./]+)>/gm;function lo(r){return r.replace(G0,z0)}const H0=new Map;function z0(r,e){let t=Ge[e];if(t===void 0){const i=H0.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return lo(t)}const k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(r){return r.replace(k0,V0)}function V0(r,e,t,i){let n="";for(let s=parseInt(e);s<parseInt(t);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function nc(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function W0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===xc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Su?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function X0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Gn:case Hn:e="ENVMAP_TYPE_CUBE";break;case xs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function K0(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Hn&&(e="ENVMAP_MODE_REFRACTION"),e}function j0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Sc:e="ENVMAP_BLENDING_MULTIPLY";break;case zu:e="ENVMAP_BLENDING_MIX";break;case ku:e="ENVMAP_BLENDING_ADD";break}return e}function q0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Y0(r,e,t,i){const n=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=W0(t),c=X0(t),h=K0(t),u=j0(t),d=q0(t),f=N0(t),g=F0(s),v=n.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ur).join(`
`),p.length>0&&(p+=`
`)):(m=[nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ur).join(`
`),p=[nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ji?U0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,I0("linearToOutputTexel",t.outputColorSpace),O0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ur).join(`
`)),a=lo(a),a=ec(a,t),a=tc(a,t),o=lo(o),o=ec(o,t),o=tc(o,t),a=ic(a),o=ic(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=T+m+a,_=T+p+o,w=Zl(n,n.VERTEX_SHADER,b),C=Zl(n,n.FRAGMENT_SHADER,_);n.attachShader(v,w),n.attachShader(v,C),t.index0AttributeName!==void 0?n.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function R(L){if(r.debug.checkShaderErrors){const G=n.getProgramInfoLog(v)||"",H=n.getShaderInfoLog(w)||"",X=n.getShaderInfoLog(C)||"",V=G.trim(),K=H.trim(),Z=X.trim();let z=!0,se=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,v,w,C);else{const ce=Ql(n,w,"vertex"),Te=Ql(n,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+ce+`
`+Te)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(K===""||Z==="")&&(se=!1);se&&(L.diagnostics={runnable:z,programLog:V,vertexShader:{log:K,prefix:m},fragmentShader:{log:Z,prefix:p}})}n.deleteShader(w),n.deleteShader(C),U=new ps(n,v),S=B0(n,v)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=n.getProgramParameter(v,R0)),x},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=P0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=C,this}let $0=0;class Z0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new J0(e),t.set(e,i)),i}}class J0{constructor(e){this.id=$0++,this.code=e,this.usedTimes=0}}function Q0(r,e,t,i,n,s,a){const o=new Bc,l=new Z0,c=new Set,h=[],u=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,L,G,H){const X=G.fog,V=H.geometry,K=S.isMeshStandardMaterial?G.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||K),z=Z&&Z.mapping===xs?Z.image.height:null,se=g[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Te=ce!==void 0?ce.length:0;let ke=0;V.morphAttributes.position!==void 0&&(ke=1),V.morphAttributes.normal!==void 0&&(ke=2),V.morphAttributes.color!==void 0&&(ke=3);let rt,lt,Ze,j;if(se){const Je=gi[se];rt=Je.vertexShader,lt=Je.fragmentShader}else rt=S.vertexShader,lt=S.fragmentShader,l.update(S),Ze=l.getVertexShaderID(S),j=l.getFragmentShaderID(S);const $=r.getRenderTarget(),de=r.state.buffers.depth.getReversed(),Le=H.isInstancedMesh===!0,xe=H.isBatchedMesh===!0,Ke=!!S.map,Ct=!!S.matcap,A=!!Z,ct=!!S.aoMap,Ue=!!S.lightMap,Re=!!S.bumpMap,me=!!S.normalMap,ut=!!S.displacementMap,ge=!!S.emissiveMap,Be=!!S.metalnessMap,bt=!!S.roughnessMap,gt=S.anisotropy>0,E=S.clearcoat>0,y=S.dispersion>0,N=S.iridescence>0,W=S.sheen>0,Y=S.transmission>0,k=gt&&!!S.anisotropyMap,Me=E&&!!S.clearcoatMap,ie=E&&!!S.clearcoatNormalMap,ve=E&&!!S.clearcoatRoughnessMap,ye=N&&!!S.iridescenceMap,ee=N&&!!S.iridescenceThicknessMap,le=W&&!!S.sheenColorMap,Ce=W&&!!S.sheenRoughnessMap,_e=!!S.specularMap,ae=!!S.specularColorMap,Ne=!!S.specularIntensityMap,D=Y&&!!S.transmissionMap,te=Y&&!!S.thicknessMap,ne=!!S.gradientMap,he=!!S.alphaMap,J=S.alphaTest>0,q=!!S.alphaHash,pe=!!S.extensions;let Ie=ji;S.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ie=r.toneMapping);const st={shaderID:se,shaderType:S.type,shaderName:S.name,vertexShader:rt,fragmentShader:lt,defines:S.defines,customVertexShaderID:Ze,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:xe,batchingColor:xe&&H._colorsTexture!==null,instancing:Le,instancingColor:Le&&H.instanceColor!==null,instancingMorph:Le&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:$===null?r.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ot,alphaToCoverage:!!S.alphaToCoverage,map:Ke,matcap:Ct,envMap:A,envMapMode:A&&Z.mapping,envMapCubeUVHeight:z,aoMap:ct,lightMap:Ue,bumpMap:Re,normalMap:me,displacementMap:d&&ut,emissiveMap:ge,normalMapObjectSpace:me&&S.normalMapType===eh,normalMapTangentSpace:me&&S.normalMapType===Ic,metalnessMap:Be,roughnessMap:bt,anisotropy:gt,anisotropyMap:k,clearcoat:E,clearcoatMap:Me,clearcoatNormalMap:ie,clearcoatRoughnessMap:ve,dispersion:y,iridescence:N,iridescenceMap:ye,iridescenceThicknessMap:ee,sheen:W,sheenColorMap:le,sheenRoughnessMap:Ce,specularMap:_e,specularColorMap:ae,specularIntensityMap:Ne,transmission:Y,transmissionMap:D,thicknessMap:te,gradientMap:ne,opaque:S.transparent===!1&&S.blending===On&&S.alphaToCoverage===!1,alphaMap:he,alphaTest:J,alphaHash:q,combine:S.combine,mapUv:Ke&&v(S.map.channel),aoMapUv:ct&&v(S.aoMap.channel),lightMapUv:Ue&&v(S.lightMap.channel),bumpMapUv:Re&&v(S.bumpMap.channel),normalMapUv:me&&v(S.normalMap.channel),displacementMapUv:ut&&v(S.displacementMap.channel),emissiveMapUv:ge&&v(S.emissiveMap.channel),metalnessMapUv:Be&&v(S.metalnessMap.channel),roughnessMapUv:bt&&v(S.roughnessMap.channel),anisotropyMapUv:k&&v(S.anisotropyMap.channel),clearcoatMapUv:Me&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:ie&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:le&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(S.sheenRoughnessMap.channel),specularMapUv:_e&&v(S.specularMap.channel),specularColorMapUv:ae&&v(S.specularColorMap.channel),specularIntensityMapUv:Ne&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:te&&v(S.thicknessMap.channel),alphaMapUv:he&&v(S.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(me||gt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!V.attributes.uv&&(Ke||he),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:H.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:ke,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Ke&&S.map.isVideoTexture===!0&&je.getTransfer(S.map.colorSpace)===tt,decodeVideoTextureEmissive:ge&&S.emissiveMap.isVideoTexture===!0&&je.getTransfer(S.emissiveMap.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ai,flipSided:S.side===Ht,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:pe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&S.extensions.multiDraw===!0||xe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)x.push(L),x.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(T(x,S),b(x,S),x.push(r.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function T(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function b(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){const x=g[S.type];let L;if(x){const G=gi[x];L=Vh.clone(G.uniforms)}else L=S.uniforms;return L}function w(S,x){let L;for(let G=0,H=h.length;G<H;G++){const X=h[G];if(X.cacheKey===x){L=X,++L.usedTimes;break}}return L===void 0&&(L=new Y0(r,x,S,s),h.push(L)),L}function C(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:w,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:U}}function eg(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function i(a){r.delete(a)}function n(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:s}}function tg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function rc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function sc(){const r=[];let e=0;const t=[],i=[],n=[];function s(){e=0,t.length=0,i.length=0,n.length=0}function a(u,d,f,g,v,m){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):t.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||tg),i.length>1&&i.sort(d||rc),n.length>1&&n.sort(d||rc)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:h,sort:c}}function ig(){let r=new WeakMap;function e(i,n){const s=r.get(i);let a;return s===void 0?(a=new sc,r.set(i,[a])):n>=s.length?(a=new sc,s.push(a)):a=s[n],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function ng(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new De};break;case"SpotLight":t={position:new P,direction:new P,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function rg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let sg=0;function ag(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function og(r){const e=new ng,t=rg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const n=new P,s=new Oe,a=new Oe;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,b=0,_=0,w=0,C=0,R=0;c.sort(ag);for(let S=0,x=c.length;S<x;S++){const L=c[S],G=L.color,H=L.intensity,X=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=G.r*H,u+=G.g*H,d+=G.b*H;else if(L.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(L.sh.coefficients[K],H);R++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,z=t.get(L);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,i.directionalShadow[f]=z,i.directionalShadowMap[f]=V,i.directionalShadowMatrix[f]=L.shadow.matrix,T++}i.directional[f]=K,f++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(G).multiplyScalar(H),K.distance=X,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,i.spot[v]=K;const Z=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,Z.updateMatrices(L),L.castShadow&&C++),i.spotLightMatrix[v]=Z.matrix,L.castShadow){const z=t.get(L);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,i.spotShadow[v]=z,i.spotShadowMap[v]=V,_++}v++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(G).multiplyScalar(H),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=K,m++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){const Z=L.shadow,z=t.get(L);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,z.shadowCameraNear=Z.camera.near,z.shadowCameraFar=Z.camera.far,i.pointShadow[g]=z,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=L.shadow.matrix,b++}i.point[g]=K,g++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(H),K.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[p]=K,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const U=i.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==b||U.numSpotShadows!==_||U.numSpotMaps!==w||U.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=_+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=R,U.directionalLength=f,U.pointLength=g,U.spotLength=v,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=b,U.numSpotShadows=_,U.numSpotMaps=w,U.numLightProbes=R,i.version=sg++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const b=c[p];if(b.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(m),u++}else if(b.isSpotLight){const _=i.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function ac(r){const e=new og(r),t=[],i=[];function n(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function lg(r){let e=new WeakMap;function t(n,s=0){const a=e.get(n);let o;return a===void 0?(o=new ac(r),e.set(n,[o])):s>=a.length?(o=new ac(r),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const cg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ug=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hg(r,e,t){let i=new Eo;const n=new Ae,s=new Ae,a=new $e,o=new od({depthPacking:Qu}),l=new ld,c={},h=t.maxTextureSize,u={[ti]:Ht,[Ht]:ti,[ai]:ai},d=new jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:cg,fragmentShader:ug}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ii;g.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xc;let p=this.type;this.render=function(C,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=r.getRenderTarget(),x=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),G=r.state;G.setBlending(Ki),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const H=p!==Li&&this.type===Li,X=p===Li&&this.type!==Li;for(let V=0,K=C.length;V<K;V++){const Z=C[V],z=Z.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;n.copy(z.mapSize);const se=z.getFrameExtents();if(n.multiply(se),s.copy(z.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/se.x),n.x=s.x*se.x,z.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/se.y),n.y=s.y*se.y,z.mapSize.y=s.y)),z.map===null||H===!0||X===!0){const Te=this.type!==Li?{minFilter:Pt,magFilter:Pt}:{};z.map!==null&&z.map.dispose(),z.map=new qi(n.x,n.y,Te),z.map.texture.name=Z.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const ce=z.getViewportCount();for(let Te=0;Te<ce;Te++){const ke=z.getViewport(Te);a.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),G.viewport(a),z.updateMatrices(Z,Te),i=z.getFrustum(),_(R,U,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===Li&&T(z,U),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(S,x,L)};function T(C,R){const U=e.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new qi(n.x,n.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(R,null,U,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(R,null,U,f,v,null)}function b(C,R,U,S){let x=null;const L=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)x=L;else if(x=U.isPointLight===!0?l:o,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const G=x.uuid,H=R.uuid;let X=c[G];X===void 0&&(X={},c[G]=X);let V=X[H];V===void 0&&(V=x.clone(),X[H]=V,R.addEventListener("dispose",w)),x=V}if(x.visible=R.visible,x.wireframe=R.wireframe,S===Li?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:u[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const G=r.properties.get(x);G.light=U}return x}function _(C,R,U,S,x){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===Li)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const H=e.update(C),X=C.material;if(Array.isArray(X)){const V=H.groups;for(let K=0,Z=V.length;K<Z;K++){const z=V[K],se=X[z.materialIndex];if(se&&se.visible){const ce=b(C,se,S,x);C.onBeforeShadow(r,C,R,U,H,ce,z),r.renderBufferDirect(U,null,H,ce,C,z),C.onAfterShadow(r,C,R,U,H,ce,z)}}}else if(X.visible){const V=b(C,X,S,x);C.onBeforeShadow(r,C,R,U,H,V,null),r.renderBufferDirect(U,null,H,V,C,null),C.onAfterShadow(r,C,R,U,H,V,null)}}const G=C.children;for(let H=0,X=G.length;H<X;H++)_(G[H],R,U,S,x)}function w(C){C.target.removeEventListener("dispose",w);for(const U in c){const S=c[U],x=C.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const dg={[xa]:Sa,[Ta]:wa,[ba]:Ca,[Bn]:Ea,[Sa]:xa,[wa]:Ta,[Ca]:ba,[Ea]:Bn};function fg(r,e){function t(){let D=!1;const te=new $e;let ne=null;const he=new $e(0,0,0,0);return{setMask:function(J){ne!==J&&!D&&(r.colorMask(J,J,J,J),ne=J)},setLocked:function(J){D=J},setClear:function(J,q,pe,Ie,st){st===!0&&(J*=Ie,q*=Ie,pe*=Ie),te.set(J,q,pe,Ie),he.equals(te)===!1&&(r.clearColor(J,q,pe,Ie),he.copy(te))},reset:function(){D=!1,ne=null,he.set(-1,0,0,0)}}}function i(){let D=!1,te=!1,ne=null,he=null,J=null;return{setReversed:function(q){if(te!==q){const pe=e.get("EXT_clip_control");q?pe.clipControlEXT(pe.LOWER_LEFT_EXT,pe.ZERO_TO_ONE_EXT):pe.clipControlEXT(pe.LOWER_LEFT_EXT,pe.NEGATIVE_ONE_TO_ONE_EXT),te=q;const Ie=J;J=null,this.setClear(Ie)}},getReversed:function(){return te},setTest:function(q){q?$(r.DEPTH_TEST):de(r.DEPTH_TEST)},setMask:function(q){ne!==q&&!D&&(r.depthMask(q),ne=q)},setFunc:function(q){if(te&&(q=dg[q]),he!==q){switch(q){case xa:r.depthFunc(r.NEVER);break;case Sa:r.depthFunc(r.ALWAYS);break;case Ta:r.depthFunc(r.LESS);break;case Bn:r.depthFunc(r.LEQUAL);break;case ba:r.depthFunc(r.EQUAL);break;case Ea:r.depthFunc(r.GEQUAL);break;case wa:r.depthFunc(r.GREATER);break;case Ca:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}he=q}},setLocked:function(q){D=q},setClear:function(q){J!==q&&(te&&(q=1-q),r.clearDepth(q),J=q)},reset:function(){D=!1,ne=null,he=null,J=null,te=!1}}}function n(){let D=!1,te=null,ne=null,he=null,J=null,q=null,pe=null,Ie=null,st=null;return{setTest:function(Je){D||(Je?$(r.STENCIL_TEST):de(r.STENCIL_TEST))},setMask:function(Je){te!==Je&&!D&&(r.stencilMask(Je),te=Je)},setFunc:function(Je,bi,pi){(ne!==Je||he!==bi||J!==pi)&&(r.stencilFunc(Je,bi,pi),ne=Je,he=bi,J=pi)},setOp:function(Je,bi,pi){(q!==Je||pe!==bi||Ie!==pi)&&(r.stencilOp(Je,bi,pi),q=Je,pe=bi,Ie=pi)},setLocked:function(Je){D=Je},setClear:function(Je){st!==Je&&(r.clearStencil(Je),st=Je)},reset:function(){D=!1,te=null,ne=null,he=null,J=null,q=null,pe=null,Ie=null,st=null}}}const s=new t,a=new i,o=new n,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,b=null,_=null,w=null,C=null,R=new De(0,0,0),U=0,S=!1,x=null,L=null,G=null,H=null,X=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,Z=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(z)[1]),K=Z>=1):z.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),K=Z>=2);let se=null,ce={};const Te=r.getParameter(r.SCISSOR_BOX),ke=r.getParameter(r.VIEWPORT),rt=new $e().fromArray(Te),lt=new $e().fromArray(ke);function Ze(D,te,ne,he){const J=new Uint8Array(4),q=r.createTexture();r.bindTexture(D,q),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let pe=0;pe<ne;pe++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(te,0,r.RGBA,1,1,he,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(te+pe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return q}const j={};j[r.TEXTURE_2D]=Ze(r.TEXTURE_2D,r.TEXTURE_2D,1),j[r.TEXTURE_CUBE_MAP]=Ze(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[r.TEXTURE_2D_ARRAY]=Ze(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),j[r.TEXTURE_3D]=Ze(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(r.DEPTH_TEST),a.setFunc(Bn),Re(!1),me(ko),$(r.CULL_FACE),ct(Ki);function $(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function de(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Le(D,te){return u[D]!==te?(r.bindFramebuffer(D,te),u[D]=te,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=te),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=te),!0):!1}function xe(D,te){let ne=f,he=!1;if(D){ne=d.get(te),ne===void 0&&(ne=[],d.set(te,ne));const J=D.textures;if(ne.length!==J.length||ne[0]!==r.COLOR_ATTACHMENT0){for(let q=0,pe=J.length;q<pe;q++)ne[q]=r.COLOR_ATTACHMENT0+q;ne.length=J.length,he=!0}}else ne[0]!==r.BACK&&(ne[0]=r.BACK,he=!0);he&&r.drawBuffers(ne)}function Ke(D){return g!==D?(r.useProgram(D),g=D,!0):!1}const Ct={[an]:r.FUNC_ADD,[bu]:r.FUNC_SUBTRACT,[Eu]:r.FUNC_REVERSE_SUBTRACT};Ct[wu]=r.MIN,Ct[Cu]=r.MAX;const A={[Au]:r.ZERO,[Ru]:r.ONE,[Pu]:r.SRC_COLOR,[_a]:r.SRC_ALPHA,[Nu]:r.SRC_ALPHA_SATURATE,[Uu]:r.DST_COLOR,[Du]:r.DST_ALPHA,[Lu]:r.ONE_MINUS_SRC_COLOR,[Ma]:r.ONE_MINUS_SRC_ALPHA,[Ou]:r.ONE_MINUS_DST_COLOR,[Iu]:r.ONE_MINUS_DST_ALPHA,[Fu]:r.CONSTANT_COLOR,[Bu]:r.ONE_MINUS_CONSTANT_COLOR,[Gu]:r.CONSTANT_ALPHA,[Hu]:r.ONE_MINUS_CONSTANT_ALPHA};function ct(D,te,ne,he,J,q,pe,Ie,st,Je){if(D===Ki){v===!0&&(de(r.BLEND),v=!1);return}if(v===!1&&($(r.BLEND),v=!0),D!==Tu){if(D!==m||Je!==S){if((p!==an||_!==an)&&(r.blendEquation(r.FUNC_ADD),p=an,_=an),Je)switch(D){case On:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vo:r.blendFunc(r.ONE,r.ONE);break;case Wo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xo:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case On:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Vo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Wo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}T=null,b=null,w=null,C=null,R.set(0,0,0),U=0,m=D,S=Je}return}J=J||te,q=q||ne,pe=pe||he,(te!==p||J!==_)&&(r.blendEquationSeparate(Ct[te],Ct[J]),p=te,_=J),(ne!==T||he!==b||q!==w||pe!==C)&&(r.blendFuncSeparate(A[ne],A[he],A[q],A[pe]),T=ne,b=he,w=q,C=pe),(Ie.equals(R)===!1||st!==U)&&(r.blendColor(Ie.r,Ie.g,Ie.b,st),R.copy(Ie),U=st),m=D,S=!1}function Ue(D,te){D.side===ai?de(r.CULL_FACE):$(r.CULL_FACE);let ne=D.side===Ht;te&&(ne=!ne),Re(ne),D.blending===On&&D.transparent===!1?ct(Ki):ct(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const he=D.stencilWrite;o.setTest(he),he&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ge(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(r.SAMPLE_ALPHA_TO_COVERAGE):de(r.SAMPLE_ALPHA_TO_COVERAGE)}function Re(D){x!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),x=D)}function me(D){D!==Mu?($(r.CULL_FACE),D!==L&&(D===ko?r.cullFace(r.BACK):D===xu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):de(r.CULL_FACE),L=D}function ut(D){D!==G&&(K&&r.lineWidth(D),G=D)}function ge(D,te,ne){D?($(r.POLYGON_OFFSET_FILL),(H!==te||X!==ne)&&(r.polygonOffset(te,ne),H=te,X=ne)):de(r.POLYGON_OFFSET_FILL)}function Be(D){D?$(r.SCISSOR_TEST):de(r.SCISSOR_TEST)}function bt(D){D===void 0&&(D=r.TEXTURE0+V-1),se!==D&&(r.activeTexture(D),se=D)}function gt(D,te,ne){ne===void 0&&(se===null?ne=r.TEXTURE0+V-1:ne=se);let he=ce[ne];he===void 0&&(he={type:void 0,texture:void 0},ce[ne]=he),(he.type!==D||he.texture!==te)&&(se!==ne&&(r.activeTexture(ne),se=ne),r.bindTexture(D,te||j[D]),he.type=D,he.texture=te)}function E(){const D=ce[se];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function y(){try{r.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{r.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{r.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{r.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{r.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{r.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{r.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{r.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{r.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{r.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(D){rt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),rt.copy(D))}function Ce(D){lt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),lt.copy(D))}function _e(D,te){let ne=c.get(te);ne===void 0&&(ne=new WeakMap,c.set(te,ne));let he=ne.get(D);he===void 0&&(he=r.getUniformBlockIndex(te,D.name),ne.set(D,he))}function ae(D,te){const he=c.get(te).get(D);l.get(te)!==he&&(r.uniformBlockBinding(te,he,D.__bindingPointIndex),l.set(te,he))}function Ne(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},se=null,ce={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,b=null,_=null,w=null,C=null,R=new De(0,0,0),U=0,S=!1,x=null,L=null,G=null,H=null,X=null,rt.set(0,0,r.canvas.width,r.canvas.height),lt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:$,disable:de,bindFramebuffer:Le,drawBuffers:xe,useProgram:Ke,setBlending:ct,setMaterial:Ue,setFlipSided:Re,setCullFace:me,setLineWidth:ut,setPolygonOffset:ge,setScissorTest:Be,activeTexture:bt,bindTexture:gt,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:N,texImage2D:ye,texImage3D:ee,updateUBOMapping:_e,uniformBlockBinding:ae,texStorage2D:ie,texStorage3D:ve,texSubImage2D:W,texSubImage3D:Y,compressedTexSubImage2D:k,compressedTexSubImage3D:Me,scissor:le,viewport:Ce,reset:Ne}}function pg(r,e,t,i,n,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):Tr("canvas")}function v(E,y,N){let W=1;const Y=gt(E);if((Y.width>N||Y.height>N)&&(W=N/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const k=Math.floor(W*Y.width),Me=Math.floor(W*Y.height);u===void 0&&(u=g(k,Me));const ie=y?g(k,Me):u;return ie.width=k,ie.height=Me,ie.getContext("2d").drawImage(E,0,0,k,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+k+"x"+Me+")."),ie}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){r.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(E,y,N,W,Y=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let k=y;if(y===r.RED&&(N===r.FLOAT&&(k=r.R32F),N===r.HALF_FLOAT&&(k=r.R16F),N===r.UNSIGNED_BYTE&&(k=r.R8)),y===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(k=r.R8UI),N===r.UNSIGNED_SHORT&&(k=r.R16UI),N===r.UNSIGNED_INT&&(k=r.R32UI),N===r.BYTE&&(k=r.R8I),N===r.SHORT&&(k=r.R16I),N===r.INT&&(k=r.R32I)),y===r.RG&&(N===r.FLOAT&&(k=r.RG32F),N===r.HALF_FLOAT&&(k=r.RG16F),N===r.UNSIGNED_BYTE&&(k=r.RG8)),y===r.RG_INTEGER&&(N===r.UNSIGNED_BYTE&&(k=r.RG8UI),N===r.UNSIGNED_SHORT&&(k=r.RG16UI),N===r.UNSIGNED_INT&&(k=r.RG32UI),N===r.BYTE&&(k=r.RG8I),N===r.SHORT&&(k=r.RG16I),N===r.INT&&(k=r.RG32I)),y===r.RGB_INTEGER&&(N===r.UNSIGNED_BYTE&&(k=r.RGB8UI),N===r.UNSIGNED_SHORT&&(k=r.RGB16UI),N===r.UNSIGNED_INT&&(k=r.RGB32UI),N===r.BYTE&&(k=r.RGB8I),N===r.SHORT&&(k=r.RGB16I),N===r.INT&&(k=r.RGB32I)),y===r.RGBA_INTEGER&&(N===r.UNSIGNED_BYTE&&(k=r.RGBA8UI),N===r.UNSIGNED_SHORT&&(k=r.RGBA16UI),N===r.UNSIGNED_INT&&(k=r.RGBA32UI),N===r.BYTE&&(k=r.RGBA8I),N===r.SHORT&&(k=r.RGBA16I),N===r.INT&&(k=r.RGBA32I)),y===r.RGB&&(N===r.UNSIGNED_INT_5_9_9_9_REV&&(k=r.RGB9_E5),N===r.UNSIGNED_INT_10F_11F_11F_REV&&(k=r.R11F_G11F_B10F)),y===r.RGBA){const Me=Y?ms:je.getTransfer(W);N===r.FLOAT&&(k=r.RGBA32F),N===r.HALF_FLOAT&&(k=r.RGBA16F),N===r.UNSIGNED_BYTE&&(k=Me===tt?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT_4_4_4_4&&(k=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(k=r.RGB5_A1)}return(k===r.R16F||k===r.R32F||k===r.RG16F||k===r.RG32F||k===r.RGBA16F||k===r.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function _(E,y){let N;return E?y===null||y===un||y===Mr?N=r.DEPTH24_STENCIL8:y===ei?N=r.DEPTH32F_STENCIL8:y===_r&&(N=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===un||y===Mr?N=r.DEPTH_COMPONENT24:y===ei?N=r.DEPTH_COMPONENT32F:y===_r&&(N=r.DEPTH_COMPONENT16),N}function w(E,y){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Pt&&E.minFilter!==wt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function C(E){const y=E.target;y.removeEventListener("dispose",C),U(y),y.isVideoTexture&&h.delete(y)}function R(E){const y=E.target;y.removeEventListener("dispose",R),x(y)}function U(E){const y=i.get(E);if(y.__webglInit===void 0)return;const N=E.source,W=d.get(N);if(W){const Y=W[y.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&S(E),Object.keys(W).length===0&&d.delete(N)}i.remove(E)}function S(E){const y=i.get(E);r.deleteTexture(y.__webglTexture);const N=E.source,W=d.get(N);delete W[y.__cacheKey],a.memory.textures--}function x(E){const y=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(y.__webglFramebuffer[W]))for(let Y=0;Y<y.__webglFramebuffer[W].length;Y++)r.deleteFramebuffer(y.__webglFramebuffer[W][Y]);else r.deleteFramebuffer(y.__webglFramebuffer[W]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[W])}else{if(Array.isArray(y.__webglFramebuffer))for(let W=0;W<y.__webglFramebuffer.length;W++)r.deleteFramebuffer(y.__webglFramebuffer[W]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let W=0;W<y.__webglColorRenderbuffer.length;W++)y.__webglColorRenderbuffer[W]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[W]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const N=E.textures;for(let W=0,Y=N.length;W<Y;W++){const k=i.get(N[W]);k.__webglTexture&&(r.deleteTexture(k.__webglTexture),a.memory.textures--),i.remove(N[W])}i.remove(E)}let L=0;function G(){L=0}function H(){const E=L;return E>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+n.maxTextures),L+=1,E}function X(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function V(E,y){const N=i.get(E);if(E.isVideoTexture&&Be(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){const W=E.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(N,E,y);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+y)}function K(E,y){const N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){j(N,E,y);return}t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+y)}function Z(E,y){const N=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){j(N,E,y);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+y)}function z(E,y){const N=i.get(E);if(E.version>0&&N.__version!==E.version){$(N,E,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+y)}const se={[Gt]:r.REPEAT,[vi]:r.CLAMP_TO_EDGE,[yr]:r.MIRRORED_REPEAT},ce={[Pt]:r.NEAREST,[po]:r.NEAREST_MIPMAP_NEAREST,[Ln]:r.NEAREST_MIPMAP_LINEAR,[wt]:r.LINEAR,[dr]:r.LINEAR_MIPMAP_NEAREST,[yi]:r.LINEAR_MIPMAP_LINEAR},Te={[th]:r.NEVER,[oh]:r.ALWAYS,[ih]:r.LESS,[Uc]:r.LEQUAL,[nh]:r.EQUAL,[ah]:r.GEQUAL,[rh]:r.GREATER,[sh]:r.NOTEQUAL};function ke(E,y){if(y.type===ei&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===wt||y.magFilter===dr||y.magFilter===Ln||y.magFilter===yi||y.minFilter===wt||y.minFilter===dr||y.minFilter===Ln||y.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,se[y.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,se[y.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,se[y.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ce[y.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ce[y.minFilter]),y.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,Te[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Pt||y.minFilter!==Ln&&y.minFilter!==yi||y.type===ei&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function rt(E,y){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",C));const W=y.source;let Y=d.get(W);Y===void 0&&(Y={},d.set(W,Y));const k=X(y);if(k!==E.__cacheKey){Y[k]===void 0&&(Y[k]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Y[k].usedTimes++;const Me=Y[E.__cacheKey];Me!==void 0&&(Y[E.__cacheKey].usedTimes--,Me.usedTimes===0&&S(y)),E.__cacheKey=k,E.__webglTexture=Y[k].texture}return N}function lt(E,y,N){return Math.floor(Math.floor(E/N)/y)}function Ze(E,y,N,W){const k=E.updateRanges;if(k.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,N,W,y.data);else{k.sort((ee,le)=>ee.start-le.start);let Me=0;for(let ee=1;ee<k.length;ee++){const le=k[Me],Ce=k[ee],_e=le.start+le.count,ae=lt(Ce.start,y.width,4),Ne=lt(le.start,y.width,4);Ce.start<=_e+1&&ae===Ne&&lt(Ce.start+Ce.count-1,y.width,4)===ae?le.count=Math.max(le.count,Ce.start+Ce.count-le.start):(++Me,k[Me]=Ce)}k.length=Me+1;const ie=r.getParameter(r.UNPACK_ROW_LENGTH),ve=r.getParameter(r.UNPACK_SKIP_PIXELS),ye=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let ee=0,le=k.length;ee<le;ee++){const Ce=k[ee],_e=Math.floor(Ce.start/4),ae=Math.ceil(Ce.count/4),Ne=_e%y.width,D=Math.floor(_e/y.width),te=ae,ne=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ne),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),t.texSubImage2D(r.TEXTURE_2D,0,Ne,D,te,ne,N,W,y.data)}E.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ie),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ve),r.pixelStorei(r.UNPACK_SKIP_ROWS,ye)}}function j(E,y,N){let W=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(W=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(W=r.TEXTURE_3D);const Y=rt(E,y),k=y.source;t.bindTexture(W,E.__webglTexture,r.TEXTURE0+N);const Me=i.get(k);if(k.version!==Me.__version||Y===!0){t.activeTexture(r.TEXTURE0+N);const ie=je.getPrimaries(je.workingColorSpace),ve=y.colorSpace===oi?null:je.getPrimaries(y.colorSpace),ye=y.colorSpace===oi||ie===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ee=v(y.image,!1,n.maxTextureSize);ee=bt(y,ee);const le=s.convert(y.format,y.colorSpace),Ce=s.convert(y.type);let _e=b(y.internalFormat,le,Ce,y.colorSpace,y.isVideoTexture);ke(W,y);let ae;const Ne=y.mipmaps,D=y.isVideoTexture!==!0,te=Me.__version===void 0||Y===!0,ne=k.dataReady,he=w(y,ee);if(y.isDepthTexture)_e=_(y.format===Sr,y.type),te&&(D?t.texStorage2D(r.TEXTURE_2D,1,_e,ee.width,ee.height):t.texImage2D(r.TEXTURE_2D,0,_e,ee.width,ee.height,0,le,Ce,null));else if(y.isDataTexture)if(Ne.length>0){D&&te&&t.texStorage2D(r.TEXTURE_2D,he,_e,Ne[0].width,Ne[0].height);for(let J=0,q=Ne.length;J<q;J++)ae=Ne[J],D?ne&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,le,Ce,ae.data):t.texImage2D(r.TEXTURE_2D,J,_e,ae.width,ae.height,0,le,Ce,ae.data);y.generateMipmaps=!1}else D?(te&&t.texStorage2D(r.TEXTURE_2D,he,_e,ee.width,ee.height),ne&&Ze(y,ee,le,Ce)):t.texImage2D(r.TEXTURE_2D,0,_e,ee.width,ee.height,0,le,Ce,ee.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){D&&te&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,_e,Ne[0].width,Ne[0].height,ee.depth);for(let J=0,q=Ne.length;J<q;J++)if(ae=Ne[J],y.format!==qt)if(le!==null)if(D){if(ne)if(y.layerUpdates.size>0){const pe=Nl(ae.width,ae.height,y.format,y.type);for(const Ie of y.layerUpdates){const st=ae.data.subarray(Ie*pe/ae.data.BYTES_PER_ELEMENT,(Ie+1)*pe/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Ie,ae.width,ae.height,1,le,st)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,ee.depth,le,ae.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,_e,ae.width,ae.height,ee.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ne&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,ee.depth,le,Ce,ae.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,_e,ae.width,ae.height,ee.depth,0,le,Ce,ae.data)}else{D&&te&&t.texStorage2D(r.TEXTURE_2D,he,_e,Ne[0].width,Ne[0].height);for(let J=0,q=Ne.length;J<q;J++)ae=Ne[J],y.format!==qt?le!==null?D?ne&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,le,ae.data):t.compressedTexImage2D(r.TEXTURE_2D,J,_e,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ne&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,le,Ce,ae.data):t.texImage2D(r.TEXTURE_2D,J,_e,ae.width,ae.height,0,le,Ce,ae.data)}else if(y.isDataArrayTexture)if(D){if(te&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,_e,ee.width,ee.height,ee.depth),ne)if(y.layerUpdates.size>0){const J=Nl(ee.width,ee.height,y.format,y.type);for(const q of y.layerUpdates){const pe=ee.data.subarray(q*J/ee.data.BYTES_PER_ELEMENT,(q+1)*J/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,q,ee.width,ee.height,1,le,Ce,pe)}y.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,le,Ce,ee.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,_e,ee.width,ee.height,ee.depth,0,le,Ce,ee.data);else if(y.isData3DTexture)D?(te&&t.texStorage3D(r.TEXTURE_3D,he,_e,ee.width,ee.height,ee.depth),ne&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,le,Ce,ee.data)):t.texImage3D(r.TEXTURE_3D,0,_e,ee.width,ee.height,ee.depth,0,le,Ce,ee.data);else if(y.isFramebufferTexture){if(te)if(D)t.texStorage2D(r.TEXTURE_2D,he,_e,ee.width,ee.height);else{let J=ee.width,q=ee.height;for(let pe=0;pe<he;pe++)t.texImage2D(r.TEXTURE_2D,pe,_e,J,q,0,le,Ce,null),J>>=1,q>>=1}}else if(Ne.length>0){if(D&&te){const J=gt(Ne[0]);t.texStorage2D(r.TEXTURE_2D,he,_e,J.width,J.height)}for(let J=0,q=Ne.length;J<q;J++)ae=Ne[J],D?ne&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,le,Ce,ae):t.texImage2D(r.TEXTURE_2D,J,_e,le,Ce,ae);y.generateMipmaps=!1}else if(D){if(te){const J=gt(ee);t.texStorage2D(r.TEXTURE_2D,he,_e,J.width,J.height)}ne&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le,Ce,ee)}else t.texImage2D(r.TEXTURE_2D,0,_e,le,Ce,ee);m(y)&&p(W),Me.__version=k.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function $(E,y,N){if(y.image.length!==6)return;const W=rt(E,y),Y=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+N);const k=i.get(Y);if(Y.version!==k.__version||W===!0){t.activeTexture(r.TEXTURE0+N);const Me=je.getPrimaries(je.workingColorSpace),ie=y.colorSpace===oi?null:je.getPrimaries(y.colorSpace),ve=y.colorSpace===oi||Me===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const ye=y.isCompressedTexture||y.image[0].isCompressedTexture,ee=y.image[0]&&y.image[0].isDataTexture,le=[];for(let q=0;q<6;q++)!ye&&!ee?le[q]=v(y.image[q],!0,n.maxCubemapSize):le[q]=ee?y.image[q].image:y.image[q],le[q]=bt(y,le[q]);const Ce=le[0],_e=s.convert(y.format,y.colorSpace),ae=s.convert(y.type),Ne=b(y.internalFormat,_e,ae,y.colorSpace),D=y.isVideoTexture!==!0,te=k.__version===void 0||W===!0,ne=Y.dataReady;let he=w(y,Ce);ke(r.TEXTURE_CUBE_MAP,y);let J;if(ye){D&&te&&t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ne,Ce.width,Ce.height);for(let q=0;q<6;q++){J=le[q].mipmaps;for(let pe=0;pe<J.length;pe++){const Ie=J[pe];y.format!==qt?_e!==null?D?ne&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe,0,0,Ie.width,Ie.height,_e,Ie.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe,Ne,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ne&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe,0,0,Ie.width,Ie.height,_e,ae,Ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe,Ne,Ie.width,Ie.height,0,_e,ae,Ie.data)}}}else{if(J=y.mipmaps,D&&te){J.length>0&&he++;const q=gt(le[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ne,q.width,q.height)}for(let q=0;q<6;q++)if(ee){D?ne&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,le[q].width,le[q].height,_e,ae,le[q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ne,le[q].width,le[q].height,0,_e,ae,le[q].data);for(let pe=0;pe<J.length;pe++){const st=J[pe].image[q].image;D?ne&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe+1,0,0,st.width,st.height,_e,ae,st.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe+1,Ne,st.width,st.height,0,_e,ae,st.data)}}else{D?ne&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,_e,ae,le[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ne,_e,ae,le[q]);for(let pe=0;pe<J.length;pe++){const Ie=J[pe];D?ne&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe+1,0,0,_e,ae,Ie.image[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,pe+1,Ne,_e,ae,Ie.image[q])}}}m(y)&&p(r.TEXTURE_CUBE_MAP),k.__version=Y.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function de(E,y,N,W,Y,k){const Me=s.convert(N.format,N.colorSpace),ie=s.convert(N.type),ve=b(N.internalFormat,Me,ie,N.colorSpace),ye=i.get(y),ee=i.get(N);if(ee.__renderTarget=y,!ye.__hasExternalTextures){const le=Math.max(1,y.width>>k),Ce=Math.max(1,y.height>>k);Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?t.texImage3D(Y,k,ve,le,Ce,y.depth,0,Me,ie,null):t.texImage2D(Y,k,ve,le,Ce,0,Me,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,W,Y,ee.__webglTexture,0,ut(y)):(Y===r.TEXTURE_2D||Y>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,W,Y,ee.__webglTexture,k),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Le(E,y,N){if(r.bindRenderbuffer(r.RENDERBUFFER,E),y.depthBuffer){const W=y.depthTexture,Y=W&&W.isDepthTexture?W.type:null,k=_(y.stencilBuffer,Y),Me=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=ut(y);ge(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,k,y.width,y.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,k,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,k,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,E)}else{const W=y.textures;for(let Y=0;Y<W.length;Y++){const k=W[Y],Me=s.convert(k.format,k.colorSpace),ie=s.convert(k.type),ve=b(k.internalFormat,Me,ie,k.colorSpace),ye=ut(y);N&&ge(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,ve,y.width,y.height):ge(y)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,ve,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,ve,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xe(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(y.depthTexture);W.__renderTarget=y,(!W.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V(y.depthTexture,0);const Y=W.__webglTexture,k=ut(y);if(y.depthTexture.format===xr)ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Y,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Y,0);else if(y.depthTexture.format===Sr)ge(y)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Y,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Ke(E){const y=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const W=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),W){const Y=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),y.__depthDisposeCallback=Y}y.__boundDepthTexture=W}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const W=E.texture.mipmaps;W&&W.length>0?xe(y.__webglFramebuffer[0],E):xe(y.__webglFramebuffer,E)}else if(N){y.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[W]),y.__webglDepthbuffer[W]===void 0)y.__webglDepthbuffer[W]=r.createRenderbuffer(),Le(y.__webglDepthbuffer[W],E,!1);else{const Y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=y.__webglDepthbuffer[W];r.bindRenderbuffer(r.RENDERBUFFER,k),r.framebufferRenderbuffer(r.FRAMEBUFFER,Y,r.RENDERBUFFER,k)}}else{const W=E.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Le(y.__webglDepthbuffer,E,!1);else{const Y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,k),r.framebufferRenderbuffer(r.FRAMEBUFFER,Y,r.RENDERBUFFER,k)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ct(E,y,N){const W=i.get(E);y!==void 0&&de(W.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&Ke(E)}function A(E){const y=E.texture,N=i.get(E),W=i.get(y);E.addEventListener("dispose",R);const Y=E.textures,k=E.isWebGLCubeRenderTarget===!0,Me=Y.length>1;if(Me||(W.__webglTexture===void 0&&(W.__webglTexture=r.createTexture()),W.__version=y.version,a.memory.textures++),k){N.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[ie]=[];for(let ve=0;ve<y.mipmaps.length;ve++)N.__webglFramebuffer[ie][ve]=r.createFramebuffer()}else N.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let ie=0;ie<y.mipmaps.length;ie++)N.__webglFramebuffer[ie]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(Me)for(let ie=0,ve=Y.length;ie<ve;ie++){const ye=i.get(Y[ie]);ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture(),a.memory.textures++)}if(E.samples>0&&ge(E)===!1){N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ie=0;ie<Y.length;ie++){const ve=Y[ie];N.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[ie]);const ye=s.convert(ve.format,ve.colorSpace),ee=s.convert(ve.type),le=b(ve.internalFormat,ye,ee,ve.colorSpace,E.isXRRenderTarget===!0),Ce=ut(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,le,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,N.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),Le(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(k){t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture),ke(r.TEXTURE_CUBE_MAP,y);for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)de(N.__webglFramebuffer[ie][ve],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve);else de(N.__webglFramebuffer[ie],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(y)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ie=0,ve=Y.length;ie<ve;ie++){const ye=Y[ie],ee=i.get(ye);let le=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(le,ee.__webglTexture),ke(le,ye),de(N.__webglFramebuffer,E,ye,r.COLOR_ATTACHMENT0+ie,le,0),m(ye)&&p(le)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,W.__webglTexture),ke(ie,y),y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)de(N.__webglFramebuffer[ve],E,y,r.COLOR_ATTACHMENT0,ie,ve);else de(N.__webglFramebuffer,E,y,r.COLOR_ATTACHMENT0,ie,0);m(y)&&p(ie),t.unbindTexture()}E.depthBuffer&&Ke(E)}function ct(E){const y=E.textures;for(let N=0,W=y.length;N<W;N++){const Y=y[N];if(m(Y)){const k=T(E),Me=i.get(Y).__webglTexture;t.bindTexture(k,Me),p(k),t.unbindTexture()}}}const Ue=[],Re=[];function me(E){if(E.samples>0){if(ge(E)===!1){const y=E.textures,N=E.width,W=E.height;let Y=r.COLOR_BUFFER_BIT;const k=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Me=i.get(E),ie=y.length>1;if(ie)for(let ye=0;ye<y.length;ye++)t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ve=E.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ye=0;ye<y.length;ye++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const ee=i.get(y[ye]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ee,0)}r.blitFramebuffer(0,0,N,W,0,0,N,W,Y,r.NEAREST),l===!0&&(Ue.length=0,Re.length=0,Ue.push(r.COLOR_ATTACHMENT0+ye),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ue.push(k),Re.push(k),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Re)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let ye=0;ye<y.length;ye++){t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const ee=i.get(y[ye]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,ee,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function ut(E){return Math.min(n.maxSamples,E.samples)}function ge(E){const y=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Be(E){const y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function bt(E,y){const N=E.colorSpace,W=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Ot&&N!==oi&&(je.getTransfer(N)===tt?(W!==qt||Y!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}function gt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.setTexture2D=V,this.setTexture2DArray=K,this.setTexture3D=Z,this.setTextureCube=z,this.rebindTextures=Ct,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ge}function mg(r,e){function t(i,n=oi){let s;const a=je.getTransfer(n);if(i===hi)return r.UNSIGNED_BYTE;if(i===go)return r.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return r.UNSIGNED_SHORT_5_5_5_1;if(i===Cc)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===Ac)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ec)return r.BYTE;if(i===wc)return r.SHORT;if(i===_r)return r.UNSIGNED_SHORT;if(i===mo)return r.INT;if(i===un)return r.UNSIGNED_INT;if(i===ei)return r.FLOAT;if(i===Cr)return r.HALF_FLOAT;if(i===Rc)return r.ALPHA;if(i===Pc)return r.RGB;if(i===qt)return r.RGBA;if(i===xr)return r.DEPTH_COMPONENT;if(i===Sr)return r.DEPTH_STENCIL;if(i===Ss)return r.RED;if(i===yo)return r.RED_INTEGER;if(i===Lc)return r.RG;if(i===_o)return r.RG_INTEGER;if(i===Mo)return r.RGBA_INTEGER;if(i===us||i===hs||i===ds||i===fs)if(a===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===us)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===us)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===hs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===La||i===Da||i===Ia)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Pa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===La)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Da)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ia)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ua||i===Oa||i===Na)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ua||i===Oa)return a===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Na)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Fa||i===Ba||i===Ga||i===Ha||i===za||i===ka||i===Va||i===Wa||i===Xa||i===Ka||i===ja||i===qa||i===Ya||i===$a)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Fa)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ba)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ga)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ha)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===za)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ka)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Va)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wa)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xa)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ka)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ja)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qa)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ya)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$a)return a===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Za||i===Ja||i===Qa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Za)return a===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ja)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Qa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===eo||i===to||i===io||i===no)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===eo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===to)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===io)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===no)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Mr?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:t}}const gg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new qc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new jt({vertexShader:gg,fragmentShader:vg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new Pr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _g extends hn{constructor(e,t){super();const i=this;let n=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new yg,p={},T=t.getContextAttributes();let b=null,_=null;const w=[],C=[],R=new Ae;let U=null;const S=new Ut;S.viewport=new $e;const x=new Ut;x.viewport=new $e;const L=[S,x],G=new Rd;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let $=w[j];return $===void 0&&($=new $s,w[j]=$),$.getTargetRaySpace()},this.getControllerGrip=function(j){let $=w[j];return $===void 0&&($=new $s,w[j]=$),$.getGripSpace()},this.getHand=function(j){let $=w[j];return $===void 0&&($=new $s,w[j]=$),$.getHandSpace()};function V(j){const $=C.indexOf(j.inputSource);if($===-1)return;const de=w[$];de!==void 0&&(de.update(j.inputSource,j.frame,c||a),de.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){n.removeEventListener("select",V),n.removeEventListener("selectstart",V),n.removeEventListener("selectend",V),n.removeEventListener("squeeze",V),n.removeEventListener("squeezestart",V),n.removeEventListener("squeezeend",V),n.removeEventListener("end",K),n.removeEventListener("inputsourceschange",Z);for(let j=0;j<w.length;j++){const $=C[j];$!==null&&(C[j]=null,w[j].disconnect($))}H=null,X=null,m.reset();for(const j in p)delete p[j];e.setRenderTarget(b),f=null,d=null,u=null,n=null,_=null,Ze.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(n,t)),u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(j){if(n=j,n!==null){if(b=e.getRenderTarget(),n.addEventListener("select",V),n.addEventListener("selectstart",V),n.addEventListener("selectend",V),n.addEventListener("squeeze",V),n.addEventListener("squeezestart",V),n.addEventListener("squeezeend",V),n.addEventListener("end",K),n.addEventListener("inputsourceschange",Z),T.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Le=null,xe=null;T.depth&&(xe=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=T.stencil?Sr:xr,Le=T.stencil?Mr:un);const Ke={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ke),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new qi(d.textureWidth,d.textureHeight,{format:qt,type:hi,depthTexture:new jc(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const de={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,t,de),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new qi(f.framebufferWidth,f.framebufferHeight,{format:qt,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),Ze.setContext(n),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(j){for(let $=0;$<j.removed.length;$++){const de=j.removed[$],Le=C.indexOf(de);Le>=0&&(C[Le]=null,w[Le].disconnect(de))}for(let $=0;$<j.added.length;$++){const de=j.added[$];let Le=C.indexOf(de);if(Le===-1){for(let Ke=0;Ke<w.length;Ke++)if(Ke>=C.length){C.push(de),Le=Ke;break}else if(C[Ke]===null){C[Ke]=de,Le=Ke;break}if(Le===-1)break}const xe=w[Le];xe&&xe.connect(de)}}const z=new P,se=new P;function ce(j,$,de){z.setFromMatrixPosition($.matrixWorld),se.setFromMatrixPosition(de.matrixWorld);const Le=z.distanceTo(se),xe=$.projectionMatrix.elements,Ke=de.projectionMatrix.elements,Ct=xe[14]/(xe[10]-1),A=xe[14]/(xe[10]+1),ct=(xe[9]+1)/xe[5],Ue=(xe[9]-1)/xe[5],Re=(xe[8]-1)/xe[0],me=(Ke[8]+1)/Ke[0],ut=Ct*Re,ge=Ct*me,Be=Le/(-Re+me),bt=Be*-Re;if($.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(bt),j.translateZ(Be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),xe[10]===-1)j.projectionMatrix.copy($.projectionMatrix),j.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const gt=Ct+Be,E=A+Be,y=ut-bt,N=ge+(Le-bt),W=ct*A/E*gt,Y=Ue*A/E*gt;j.projectionMatrix.makePerspective(y,N,W,Y,gt,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Te(j,$){$===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices($.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(n===null)return;let $=j.near,de=j.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(de=m.depthFar)),G.near=x.near=S.near=$,G.far=x.far=S.far=de,(H!==G.near||X!==G.far)&&(n.updateRenderState({depthNear:G.near,depthFar:G.far}),H=G.near,X=G.far),G.layers.mask=j.layers.mask|6,S.layers.mask=G.layers.mask&3,x.layers.mask=G.layers.mask&5;const Le=j.parent,xe=G.cameras;Te(G,Le);for(let Ke=0;Ke<xe.length;Ke++)Te(xe[Ke],Le);xe.length===2?ce(G,S,x):G.projectionMatrix.copy(S.projectionMatrix),ke(j,G,Le)};function ke(j,$,de){de===null?j.matrix.copy($.matrixWorld):(j.matrix.copy(de.matrixWorld),j.matrix.invert(),j.matrix.multiply($.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy($.projectionMatrix),j.projectionMatrixInverse.copy($.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Vn*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(j){return p[j]};let rt=null;function lt(j,$){if(h=$.getViewerPose(c||a),g=$,h!==null){const de=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Le=!1;de.length!==G.cameras.length&&(G.cameras.length=0,Le=!0);for(let A=0;A<de.length;A++){const ct=de[A];let Ue=null;if(f!==null)Ue=f.getViewport(ct);else{const me=u.getViewSubImage(d,ct);Ue=me.viewport,A===0&&(e.setRenderTargetTextures(_,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(_))}let Re=L[A];Re===void 0&&(Re=new Ut,Re.layers.enable(A),Re.viewport=new $e,L[A]=Re),Re.matrix.fromArray(ct.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(ct.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),A===0&&(G.matrix.copy(Re.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Le===!0&&G.cameras.push(Re)}const xe=n.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&v){u=i.getBinding();const A=u.getDepthInformation(de[0]);A&&A.isValid&&A.texture&&m.init(A,n.renderState)}if(xe&&xe.includes("camera-access")&&v){e.state.unbindTexture(),u=i.getBinding();for(let A=0;A<de.length;A++){const ct=de[A].camera;if(ct){let Ue=p[ct];Ue||(Ue=new qc,p[ct]=Ue);const Re=u.getCameraImage(ct);Ue.sourceTexture=Re}}}}for(let de=0;de<w.length;de++){const Le=C[de],xe=w[de];Le!==null&&xe!==void 0&&xe.update(Le,$,c||a)}rt&&rt(j,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}const Ze=new Qc;Ze.setAnimationLoop(lt),this.setAnimationLoop=function(j){rt=j},this.dispose=function(){}}}const nn=new xi,Mg=new Oe;function xg(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,kc(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,T,b,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),b=T.envMap,_=T.envMapRotation;b&&(m.envMap.value=b,nn.copy(_),nn.x*=-1,nn.y*=-1,nn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(nn.y*=-1,nn.z*=-1),m.envMapRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(nn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Sg(r,e,t,i){let n={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,b){const _=b.program;i.uniformBlockBinding(T,_)}function c(T,b){let _=n[T.id];_===void 0&&(g(T),_=h(T),n[T.id]=_,T.addEventListener("dispose",m));const w=b.program;i.updateUBOMapping(T,w);const C=e.render.frame;s[T.id]!==C&&(d(T),s[T.id]=C)}function h(T){const b=u();T.__bindingPointIndex=b;const _=r.createBuffer(),w=T.__size,C=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,w,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,_),_}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const b=n[T.id],_=T.uniforms,w=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let C=0,R=_.length;C<R;C++){const U=Array.isArray(_[C])?_[C]:[_[C]];for(let S=0,x=U.length;S<x;S++){const L=U[S];if(f(L,C,S,w)===!0){const G=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let X=0;for(let V=0;V<H.length;V++){const K=H[V],Z=v(K);typeof K=="number"||typeof K=="boolean"?(L.__data[0]=K,r.bufferSubData(r.UNIFORM_BUFFER,G+X,L.__data)):K.isMatrix3?(L.__data[0]=K.elements[0],L.__data[1]=K.elements[1],L.__data[2]=K.elements[2],L.__data[3]=0,L.__data[4]=K.elements[3],L.__data[5]=K.elements[4],L.__data[6]=K.elements[5],L.__data[7]=0,L.__data[8]=K.elements[6],L.__data[9]=K.elements[7],L.__data[10]=K.elements[8],L.__data[11]=0):(K.toArray(L.__data,X),X+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,G,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(T,b,_,w){const C=T.value,R=b+"_"+_;if(w[R]===void 0)return typeof C=="number"||typeof C=="boolean"?w[R]=C:w[R]=C.clone(),!0;{const U=w[R];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return w[R]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(T){const b=T.uniforms;let _=0;const w=16;for(let R=0,U=b.length;R<U;R++){const S=Array.isArray(b[R])?b[R]:[b[R]];for(let x=0,L=S.length;x<L;x++){const G=S[x],H=Array.isArray(G.value)?G.value:[G.value];for(let X=0,V=H.length;X<V;X++){const K=H[X],Z=v(K),z=_%w,se=z%Z.boundary,ce=z+se;_+=se,ce!==0&&w-ce<Z.storage&&(_+=w-ce),G.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=Z.storage}}}const C=_%w;return C>0&&(_+=w-C),T.__size=_,T.__cache={},this}function v(T){const b={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(b.boundary=4,b.storage=4):T.isVector2?(b.boundary=8,b.storage=8):T.isVector3||T.isColor?(b.boundary=16,b.storage=12):T.isVector4?(b.boundary=16,b.storage=16):T.isMatrix3?(b.boundary=48,b.storage=48):T.isMatrix4?(b.boundary=64,b.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),b}function m(T){const b=T.target;b.removeEventListener("dispose",m);const _=a.indexOf(b.__bindingPointIndex);a.splice(_,1),r.deleteBuffer(n[b.id]),delete n[b.id],delete s[b.id]}function p(){for(const T in n)r.deleteBuffer(n[T]);a=[],n={},s={}}return{bind:l,update:c,dispose:p}}class Tg{constructor(e={}){const{canvas:t=bh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let w=!1;this._outputColorSpace=yt;let C=0,R=0,U=null,S=-1,x=null;const L=new $e,G=new $e;let H=null;const X=new De(0);let V=0,K=t.width,Z=t.height,z=1,se=null,ce=null;const Te=new $e(0,0,K,Z),ke=new $e(0,0,K,Z);let rt=!1;const lt=new Eo;let Ze=!1,j=!1;const $=new Oe,de=new P,Le=new $e,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function Ct(){return U===null?z:1}let A=i;function ct(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ms}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",J,!1),A===null){const I="webgl2";if(A=ct(I,M),A===null)throw ct(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ue,Re,me,ut,ge,Be,bt,gt,E,y,N,W,Y,k,Me,ie,ve,ye,ee,le,Ce,_e,ae,Ne;function D(){Ue=new Im(A),Ue.init(),_e=new mg(A,Ue),Re=new wm(A,Ue,e,_e),me=new fg(A,Ue),Re.reversedDepthBuffer&&d&&me.buffers.depth.setReversed(!0),ut=new Nm(A),ge=new eg,Be=new pg(A,Ue,me,ge,Re,_e,ut),bt=new Am(_),gt=new Dm(_),E=new zd(A),ae=new bm(A,E),y=new Um(A,E,ut,ae),N=new Bm(A,y,E,ut),ee=new Fm(A,Re,Be),ie=new Cm(ge),W=new Q0(_,bt,gt,Ue,Re,ae,ie),Y=new xg(_,ge),k=new ig,Me=new lg(Ue),ye=new Tm(_,bt,gt,me,N,f,l),ve=new hg(_,N,Re),Ne=new Sg(A,ut,Re,me),le=new Em(A,Ue,ut),Ce=new Om(A,Ue,ut),ut.programs=W.programs,_.capabilities=Re,_.extensions=Ue,_.properties=ge,_.renderLists=k,_.shadowMap=ve,_.state=me,_.info=ut}D();const te=new _g(_,A);this.xr=te,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const M=Ue.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ue.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(M){M!==void 0&&(z=M,this.setSize(K,Z,!1))},this.getSize=function(M){return M.set(K,Z)},this.setSize=function(M,I,F=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=M,Z=I,t.width=Math.floor(M*z),t.height=Math.floor(I*z),F===!0&&(t.style.width=M+"px",t.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(K*z,Z*z).floor()},this.setDrawingBufferSize=function(M,I,F){K=M,Z=I,z=F,t.width=Math.floor(M*F),t.height=Math.floor(I*F),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(Te)},this.setViewport=function(M,I,F,B){M.isVector4?Te.set(M.x,M.y,M.z,M.w):Te.set(M,I,F,B),me.viewport(L.copy(Te).multiplyScalar(z).round())},this.getScissor=function(M){return M.copy(ke)},this.setScissor=function(M,I,F,B){M.isVector4?ke.set(M.x,M.y,M.z,M.w):ke.set(M,I,F,B),me.scissor(G.copy(ke).multiplyScalar(z).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){me.setScissorTest(rt=M)},this.setOpaqueSort=function(M){se=M},this.setTransparentSort=function(M){ce=M},this.getClearColor=function(M){return M.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,F=!0){let B=0;if(M){let O=!1;if(U!==null){const Q=U.texture.format;O=Q===Mo||Q===_o||Q===yo}if(O){const Q=U.texture.type,oe=Q===hi||Q===un||Q===_r||Q===Mr||Q===go||Q===vo,fe=ye.getClearColor(),ue=ye.getClearAlpha(),we=fe.r,Pe=fe.g,be=fe.b;oe?(g[0]=we,g[1]=Pe,g[2]=be,g[3]=ue,A.clearBufferuiv(A.COLOR,0,g)):(v[0]=we,v[1]=Pe,v[2]=be,v[3]=ue,A.clearBufferiv(A.COLOR,0,v))}else B|=A.COLOR_BUFFER_BIT}I&&(B|=A.DEPTH_BUFFER_BIT),F&&(B|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",J,!1),ye.dispose(),k.dispose(),Me.dispose(),ge.dispose(),bt.dispose(),gt.dispose(),N.dispose(),ae.dispose(),Ne.dispose(),W.dispose(),te.dispose(),te.removeEventListener("sessionstart",pi),te.removeEventListener("sessionend",No),Yi.stop()};function ne(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=ut.autoReset,I=ve.enabled,F=ve.autoUpdate,B=ve.needsUpdate,O=ve.type;D(),ut.autoReset=M,ve.enabled=I,ve.autoUpdate=F,ve.needsUpdate=B,ve.type=O}function J(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function q(M){const I=M.target;I.removeEventListener("dispose",q),pe(I)}function pe(M){Ie(M),ge.remove(M)}function Ie(M){const I=ge.get(M).programs;I!==void 0&&(I.forEach(function(F){W.releaseProgram(F)}),M.isShaderMaterial&&W.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,F,B,O,Q){I===null&&(I=xe);const oe=O.isMesh&&O.matrixWorld.determinant()<0,fe=pu(M,I,F,B,O);me.setMaterial(B,oe);let ue=F.index,we=1;if(B.wireframe===!0){if(ue=y.getWireframeAttribute(F),ue===void 0)return;we=2}const Pe=F.drawRange,be=F.attributes.position;let Xe=Pe.start*we,et=(Pe.start+Pe.count)*we;Q!==null&&(Xe=Math.max(Xe,Q.start*we),et=Math.min(et,(Q.start+Q.count)*we)),ue!==null?(Xe=Math.max(Xe,0),et=Math.min(et,ue.count)):be!=null&&(Xe=Math.max(Xe,0),et=Math.min(et,be.count));const mt=et-Xe;if(mt<0||mt===1/0)return;ae.setup(O,B,fe,F,ue);let ot,nt=le;if(ue!==null&&(ot=E.get(ue),nt=Ce,nt.setIndex(ot)),O.isMesh)B.wireframe===!0?(me.setLineWidth(B.wireframeLinewidth*Ct()),nt.setMode(A.LINES)):nt.setMode(A.TRIANGLES);else if(O.isLine){let Ee=B.linewidth;Ee===void 0&&(Ee=1),me.setLineWidth(Ee*Ct()),O.isLineSegments?nt.setMode(A.LINES):O.isLineLoop?nt.setMode(A.LINE_LOOP):nt.setMode(A.LINE_STRIP)}else O.isPoints?nt.setMode(A.POINTS):O.isSprite&&nt.setMode(A.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))nt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ee=O._multiDrawStarts,dt=O._multiDrawCounts,Ye=O._multiDrawCount,kt=ue?E.get(ue).bytesPerElement:1,dn=ge.get(B).currentProgram.getUniforms();for(let Vt=0;Vt<Ye;Vt++)dn.setValue(A,"_gl_DrawID",Vt),nt.render(Ee[Vt]/kt,dt[Vt])}else if(O.isInstancedMesh)nt.renderInstances(Xe,mt,O.count);else if(F.isInstancedBufferGeometry){const Ee=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,dt=Math.min(F.instanceCount,Ee);nt.renderInstances(Xe,mt,dt)}else nt.render(Xe,mt)};function st(M,I,F){M.transparent===!0&&M.side===ai&&M.forceSinglePass===!1?(M.side=Ht,M.needsUpdate=!0,Ir(M,I,F),M.side=ti,M.needsUpdate=!0,Ir(M,I,F),M.side=ai):Ir(M,I,F)}this.compile=function(M,I,F=null){F===null&&(F=M),p=Me.get(F),p.init(I),b.push(p),F.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),M!==F&&M.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const B=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const Q=O.material;if(Q)if(Array.isArray(Q))for(let oe=0;oe<Q.length;oe++){const fe=Q[oe];st(fe,F,O),B.add(fe)}else st(Q,F,O),B.add(Q)}),p=b.pop(),B},this.compileAsync=function(M,I,F=null){const B=this.compile(M,I,F);return new Promise(O=>{function Q(){if(B.forEach(function(oe){ge.get(oe).currentProgram.isReady()&&B.delete(oe)}),B.size===0){O(M);return}setTimeout(Q,10)}Ue.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Je=null;function bi(M){Je&&Je(M)}function pi(){Yi.stop()}function No(){Yi.start()}const Yi=new Qc;Yi.setAnimationLoop(bi),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(M){Je=M,te.setAnimationLoop(M),M===null?Yi.stop():Yi.start()},te.addEventListener("sessionstart",pi),te.addEventListener("sessionend",No),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(I),I=te.getCamera()),M.isScene===!0&&M.onBeforeRender(_,M,I,U),p=Me.get(M,b.length),p.init(I),b.push(p),$.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),lt.setFromProjectionMatrix($,_i,I.reversedDepth),j=this.localClippingEnabled,Ze=ie.init(this.clippingPlanes,j),m=k.get(M,T.length),m.init(),T.push(m),te.enabled===!0&&te.isPresenting===!0){const Q=_.xr.getDepthSensingMesh();Q!==null&&Cs(Q,I,-1/0,_.sortObjects)}Cs(M,I,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(se,ce),Ke=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ke&&ye.addToRenderList(m,M),this.info.render.frame++,Ze===!0&&ie.beginShadows();const F=p.state.shadowsArray;ve.render(F,M,I),Ze===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,O=m.transmissive;if(p.setupLights(),I.isArrayCamera){const Q=I.cameras;if(O.length>0)for(let oe=0,fe=Q.length;oe<fe;oe++){const ue=Q[oe];Bo(B,O,M,ue)}Ke&&ye.render(M);for(let oe=0,fe=Q.length;oe<fe;oe++){const ue=Q[oe];Fo(m,M,ue,ue.viewport)}}else O.length>0&&Bo(B,O,M,I),Ke&&ye.render(M),Fo(m,M,I);U!==null&&R===0&&(Be.updateMultisampleRenderTarget(U),Be.updateRenderTargetMipmap(U)),M.isScene===!0&&M.onAfterRender(_,M,I),ae.resetDefaultState(),S=-1,x=null,b.pop(),b.length>0?(p=b[b.length-1],Ze===!0&&ie.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Cs(M,I,F,B){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)F=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||lt.intersectsSprite(M)){B&&Le.setFromMatrixPosition(M.matrixWorld).applyMatrix4($);const oe=N.update(M),fe=M.material;fe.visible&&m.push(M,oe,fe,F,Le.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||lt.intersectsObject(M))){const oe=N.update(M),fe=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Le.copy(M.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Le.copy(oe.boundingSphere.center)),Le.applyMatrix4(M.matrixWorld).applyMatrix4($)),Array.isArray(fe)){const ue=oe.groups;for(let we=0,Pe=ue.length;we<Pe;we++){const be=ue[we],Xe=fe[be.materialIndex];Xe&&Xe.visible&&m.push(M,oe,Xe,F,Le.z,be)}}else fe.visible&&m.push(M,oe,fe,F,Le.z,null)}}const Q=M.children;for(let oe=0,fe=Q.length;oe<fe;oe++)Cs(Q[oe],I,F,B)}function Fo(M,I,F,B){const O=M.opaque,Q=M.transmissive,oe=M.transparent;p.setupLightsView(F),Ze===!0&&ie.setGlobalState(_.clippingPlanes,F),B&&me.viewport(L.copy(B)),O.length>0&&Dr(O,I,F),Q.length>0&&Dr(Q,I,F),oe.length>0&&Dr(oe,I,F),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Bo(M,I,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new qi(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Cr:hi,minFilter:yi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const Q=p.state.transmissionRenderTarget[B.id],oe=B.viewport||L;Q.setSize(oe.z*_.transmissionResolutionScale,oe.w*_.transmissionResolutionScale);const fe=_.getRenderTarget(),ue=_.getActiveCubeFace(),we=_.getActiveMipmapLevel();_.setRenderTarget(Q),_.getClearColor(X),V=_.getClearAlpha(),V<1&&_.setClearColor(16777215,.5),_.clear(),Ke&&ye.render(F);const Pe=_.toneMapping;_.toneMapping=ji;const be=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),Ze===!0&&ie.setGlobalState(_.clippingPlanes,B),Dr(M,F,B),Be.updateMultisampleRenderTarget(Q),Be.updateRenderTargetMipmap(Q),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let et=0,mt=I.length;et<mt;et++){const ot=I[et],nt=ot.object,Ee=ot.geometry,dt=ot.material,Ye=ot.group;if(dt.side===ai&&nt.layers.test(B.layers)){const kt=dt.side;dt.side=Ht,dt.needsUpdate=!0,Go(nt,F,B,Ee,dt,Ye),dt.side=kt,dt.needsUpdate=!0,Xe=!0}}Xe===!0&&(Be.updateMultisampleRenderTarget(Q),Be.updateRenderTargetMipmap(Q))}_.setRenderTarget(fe,ue,we),_.setClearColor(X,V),be!==void 0&&(B.viewport=be),_.toneMapping=Pe}function Dr(M,I,F){const B=I.isScene===!0?I.overrideMaterial:null;for(let O=0,Q=M.length;O<Q;O++){const oe=M[O],fe=oe.object,ue=oe.geometry,we=oe.group;let Pe=oe.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),fe.layers.test(F.layers)&&Go(fe,I,F,ue,Pe,we)}}function Go(M,I,F,B,O,Q){M.onBeforeRender(_,I,F,B,O,Q),M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(_,I,F,B,M,Q),O.transparent===!0&&O.side===ai&&O.forceSinglePass===!1?(O.side=Ht,O.needsUpdate=!0,_.renderBufferDirect(F,I,B,O,M,Q),O.side=ti,O.needsUpdate=!0,_.renderBufferDirect(F,I,B,O,M,Q),O.side=ai):_.renderBufferDirect(F,I,B,O,M,Q),M.onAfterRender(_,I,F,B,O,Q)}function Ir(M,I,F){I.isScene!==!0&&(I=xe);const B=ge.get(M),O=p.state.lights,Q=p.state.shadowsArray,oe=O.state.version,fe=W.getParameters(M,O.state,Q,I,F),ue=W.getProgramCacheKey(fe);let we=B.programs;B.environment=M.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(M.isMeshStandardMaterial?gt:bt).get(M.envMap||B.environment),B.envMapRotation=B.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",q),we=new Map,B.programs=we);let Pe=we.get(ue);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===oe)return zo(M,fe),Pe}else fe.uniforms=W.getUniforms(M),M.onBeforeCompile(fe,_),Pe=W.acquireProgram(fe,ue),we.set(ue,Pe),B.uniforms=fe.uniforms;const be=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(be.clippingPlanes=ie.uniform),zo(M,fe),B.needsLights=gu(M),B.lightsStateVersion=oe,B.needsLights&&(be.ambientLightColor.value=O.state.ambient,be.lightProbe.value=O.state.probe,be.directionalLights.value=O.state.directional,be.directionalLightShadows.value=O.state.directionalShadow,be.spotLights.value=O.state.spot,be.spotLightShadows.value=O.state.spotShadow,be.rectAreaLights.value=O.state.rectArea,be.ltc_1.value=O.state.rectAreaLTC1,be.ltc_2.value=O.state.rectAreaLTC2,be.pointLights.value=O.state.point,be.pointLightShadows.value=O.state.pointShadow,be.hemisphereLights.value=O.state.hemi,be.directionalShadowMap.value=O.state.directionalShadowMap,be.directionalShadowMatrix.value=O.state.directionalShadowMatrix,be.spotShadowMap.value=O.state.spotShadowMap,be.spotLightMatrix.value=O.state.spotLightMatrix,be.spotLightMap.value=O.state.spotLightMap,be.pointShadowMap.value=O.state.pointShadowMap,be.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function Ho(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=ps.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function zo(M,I){const F=ge.get(M);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function pu(M,I,F,B,O){I.isScene!==!0&&(I=xe),Be.resetTextureUnits();const Q=I.fog,oe=B.isMeshStandardMaterial?I.environment:null,fe=U===null?_.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ot,ue=(B.isMeshStandardMaterial?gt:bt).get(B.envMap||oe),we=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pe=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),be=!!F.morphAttributes.position,Xe=!!F.morphAttributes.normal,et=!!F.morphAttributes.color;let mt=ji;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(mt=_.toneMapping);const ot=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,nt=ot!==void 0?ot.length:0,Ee=ge.get(B),dt=p.state.lights;if(Ze===!0&&(j===!0||M!==x)){const Lt=M===x&&B.id===S;ie.setState(B,M,Lt)}let Ye=!1;B.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==dt.state.version||Ee.outputColorSpace!==fe||O.isBatchedMesh&&Ee.batching===!1||!O.isBatchedMesh&&Ee.batching===!0||O.isBatchedMesh&&Ee.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ee.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ee.instancing===!1||!O.isInstancedMesh&&Ee.instancing===!0||O.isSkinnedMesh&&Ee.skinning===!1||!O.isSkinnedMesh&&Ee.skinning===!0||O.isInstancedMesh&&Ee.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ee.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ee.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ee.instancingMorph===!1&&O.morphTexture!==null||Ee.envMap!==ue||B.fog===!0&&Ee.fog!==Q||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ie.numPlanes||Ee.numIntersection!==ie.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Pe||Ee.morphTargets!==be||Ee.morphNormals!==Xe||Ee.morphColors!==et||Ee.toneMapping!==mt||Ee.morphTargetsCount!==nt)&&(Ye=!0):(Ye=!0,Ee.__version=B.version);let kt=Ee.currentProgram;Ye===!0&&(kt=Ir(B,I,O));let dn=!1,Vt=!1,Jn=!1;const ft=kt.getUniforms(),$t=Ee.uniforms;if(me.useProgram(kt.program)&&(dn=!0,Vt=!0,Jn=!0),B.id!==S&&(S=B.id,Vt=!0),dn||x!==M){me.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ft.setValue(A,"projectionMatrix",M.projectionMatrix),ft.setValue(A,"viewMatrix",M.matrixWorldInverse);const Nt=ft.map.cameraPosition;Nt!==void 0&&Nt.setValue(A,de.setFromMatrixPosition(M.matrixWorld)),Re.logarithmicDepthBuffer&&ft.setValue(A,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(A,"isOrthographic",M.isOrthographicCamera===!0),x!==M&&(x=M,Vt=!0,Jn=!0)}if(O.isSkinnedMesh){ft.setOptional(A,O,"bindMatrix"),ft.setOptional(A,O,"bindMatrixInverse");const Lt=O.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),ft.setValue(A,"boneTexture",Lt.boneTexture,Be))}O.isBatchedMesh&&(ft.setOptional(A,O,"batchingTexture"),ft.setValue(A,"batchingTexture",O._matricesTexture,Be),ft.setOptional(A,O,"batchingIdTexture"),ft.setValue(A,"batchingIdTexture",O._indirectTexture,Be),ft.setOptional(A,O,"batchingColorTexture"),O._colorsTexture!==null&&ft.setValue(A,"batchingColorTexture",O._colorsTexture,Be));const Zt=F.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0)&&ee.update(O,F,kt),(Vt||Ee.receiveShadow!==O.receiveShadow)&&(Ee.receiveShadow=O.receiveShadow,ft.setValue(A,"receiveShadow",O.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&($t.envMap.value=ue,$t.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&($t.envMapIntensity.value=I.environmentIntensity),Vt&&(ft.setValue(A,"toneMappingExposure",_.toneMappingExposure),Ee.needsLights&&mu($t,Jn),Q&&B.fog===!0&&Y.refreshFogUniforms($t,Q),Y.refreshMaterialUniforms($t,B,z,Z,p.state.transmissionRenderTarget[M.id]),ps.upload(A,Ho(Ee),$t,Be)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ps.upload(A,Ho(Ee),$t,Be),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(A,"center",O.center),ft.setValue(A,"modelViewMatrix",O.modelViewMatrix),ft.setValue(A,"normalMatrix",O.normalMatrix),ft.setValue(A,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Lt=B.uniformsGroups;for(let Nt=0,As=Lt.length;Nt<As;Nt++){const $i=Lt[Nt];Ne.update($i,kt),Ne.bind($i,kt)}}return kt}function mu(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function gu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(M,I,F){const B=ge.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),ge.get(M.texture).__webglTexture=I,ge.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:F,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const F=ge.get(M);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0};const vu=A.createFramebuffer();this.setRenderTarget=function(M,I=0,F=0){U=M,C=I,R=F;let B=!0,O=null,Q=!1,oe=!1;if(M){const ue=ge.get(M);if(ue.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(A.FRAMEBUFFER,null),B=!1;else if(ue.__webglFramebuffer===void 0)Be.setupRenderTarget(M);else if(ue.__hasExternalTextures)Be.rebindTextures(M,ge.get(M.texture).__webglTexture,ge.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const be=M.depthTexture;if(ue.__boundDepthTexture!==be){if(be!==null&&ge.has(be)&&(M.width!==be.image.width||M.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(M)}}const we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(oe=!0);const Pe=ge.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Pe[I])?O=Pe[I][F]:O=Pe[I],Q=!0):M.samples>0&&Be.useMultisampledRTT(M)===!1?O=ge.get(M).__webglMultisampledFramebuffer:Array.isArray(Pe)?O=Pe[F]:O=Pe,L.copy(M.viewport),G.copy(M.scissor),H=M.scissorTest}else L.copy(Te).multiplyScalar(z).floor(),G.copy(ke).multiplyScalar(z).floor(),H=rt;if(F!==0&&(O=vu),me.bindFramebuffer(A.FRAMEBUFFER,O)&&B&&me.drawBuffers(M,O),me.viewport(L),me.scissor(G),me.setScissorTest(H),Q){const ue=ge.get(M.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+I,ue.__webglTexture,F)}else if(oe){const ue=I;for(let we=0;we<M.textures.length;we++){const Pe=ge.get(M.textures[we]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+we,Pe.__webglTexture,F,ue)}}else if(M!==null&&F!==0){const ue=ge.get(M.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ue.__webglTexture,F)}S=-1},this.readRenderTargetPixels=function(M,I,F,B,O,Q,oe,fe=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ge.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&oe!==void 0&&(ue=ue[oe]),ue){me.bindFramebuffer(A.FRAMEBUFFER,ue);try{const we=M.textures[fe],Pe=we.format,be=we.type;if(!Re.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Re.textureTypeReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-B&&F>=0&&F<=M.height-O&&(M.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+fe),A.readPixels(I,F,B,O,_e.convert(Pe),_e.convert(be),Q))}finally{const we=U!==null?ge.get(U).__webglFramebuffer:null;me.bindFramebuffer(A.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,I,F,B,O,Q,oe,fe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ge.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&oe!==void 0&&(ue=ue[oe]),ue)if(I>=0&&I<=M.width-B&&F>=0&&F<=M.height-O){me.bindFramebuffer(A.FRAMEBUFFER,ue);const we=M.textures[fe],Pe=we.format,be=we.type;if(!Re.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Re.textureTypeReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.bufferData(A.PIXEL_PACK_BUFFER,Q.byteLength,A.STREAM_READ),M.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+fe),A.readPixels(I,F,B,O,_e.convert(Pe),_e.convert(be),0);const et=U!==null?ge.get(U).__webglFramebuffer:null;me.bindFramebuffer(A.FRAMEBUFFER,et);const mt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Eh(A,mt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Q),A.deleteBuffer(Xe),A.deleteSync(mt),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,F=0){const B=Math.pow(2,-F),O=Math.floor(M.image.width*B),Q=Math.floor(M.image.height*B),oe=I!==null?I.x:0,fe=I!==null?I.y:0;Be.setTexture2D(M,0),A.copyTexSubImage2D(A.TEXTURE_2D,F,0,0,oe,fe,O,Q),me.unbindTexture()};const yu=A.createFramebuffer(),_u=A.createFramebuffer();this.copyTextureToTexture=function(M,I,F=null,B=null,O=0,Q=null){Q===null&&(O!==0?(br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=O,O=0):Q=0);let oe,fe,ue,we,Pe,be,Xe,et,mt;const ot=M.isCompressedTexture?M.mipmaps[Q]:M.image;if(F!==null)oe=F.max.x-F.min.x,fe=F.max.y-F.min.y,ue=F.isBox3?F.max.z-F.min.z:1,we=F.min.x,Pe=F.min.y,be=F.isBox3?F.min.z:0;else{const Zt=Math.pow(2,-O);oe=Math.floor(ot.width*Zt),fe=Math.floor(ot.height*Zt),M.isDataArrayTexture?ue=ot.depth:M.isData3DTexture?ue=Math.floor(ot.depth*Zt):ue=1,we=0,Pe=0,be=0}B!==null?(Xe=B.x,et=B.y,mt=B.z):(Xe=0,et=0,mt=0);const nt=_e.convert(I.format),Ee=_e.convert(I.type);let dt;I.isData3DTexture?(Be.setTexture3D(I,0),dt=A.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Be.setTexture2DArray(I,0),dt=A.TEXTURE_2D_ARRAY):(Be.setTexture2D(I,0),dt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,I.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,I.unpackAlignment);const Ye=A.getParameter(A.UNPACK_ROW_LENGTH),kt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),dn=A.getParameter(A.UNPACK_SKIP_PIXELS),Vt=A.getParameter(A.UNPACK_SKIP_ROWS),Jn=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,ot.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ot.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,we),A.pixelStorei(A.UNPACK_SKIP_ROWS,Pe),A.pixelStorei(A.UNPACK_SKIP_IMAGES,be);const ft=M.isDataArrayTexture||M.isData3DTexture,$t=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const Zt=ge.get(M),Lt=ge.get(I),Nt=ge.get(Zt.__renderTarget),As=ge.get(Lt.__renderTarget);me.bindFramebuffer(A.READ_FRAMEBUFFER,Nt.__webglFramebuffer),me.bindFramebuffer(A.DRAW_FRAMEBUFFER,As.__webglFramebuffer);for(let $i=0;$i<ue;$i++)ft&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ge.get(M).__webglTexture,O,be+$i),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ge.get(I).__webglTexture,Q,mt+$i)),A.blitFramebuffer(we,Pe,oe,fe,Xe,et,oe,fe,A.DEPTH_BUFFER_BIT,A.NEAREST);me.bindFramebuffer(A.READ_FRAMEBUFFER,null),me.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||ge.has(M)){const Zt=ge.get(M),Lt=ge.get(I);me.bindFramebuffer(A.READ_FRAMEBUFFER,yu),me.bindFramebuffer(A.DRAW_FRAMEBUFFER,_u);for(let Nt=0;Nt<ue;Nt++)ft?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Zt.__webglTexture,O,be+Nt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Zt.__webglTexture,O),$t?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Lt.__webglTexture,Q,mt+Nt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Lt.__webglTexture,Q),O!==0?A.blitFramebuffer(we,Pe,oe,fe,Xe,et,oe,fe,A.COLOR_BUFFER_BIT,A.NEAREST):$t?A.copyTexSubImage3D(dt,Q,Xe,et,mt+Nt,we,Pe,oe,fe):A.copyTexSubImage2D(dt,Q,Xe,et,we,Pe,oe,fe);me.bindFramebuffer(A.READ_FRAMEBUFFER,null),me.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else $t?M.isDataTexture||M.isData3DTexture?A.texSubImage3D(dt,Q,Xe,et,mt,oe,fe,ue,nt,Ee,ot.data):I.isCompressedArrayTexture?A.compressedTexSubImage3D(dt,Q,Xe,et,mt,oe,fe,ue,nt,ot.data):A.texSubImage3D(dt,Q,Xe,et,mt,oe,fe,ue,nt,Ee,ot):M.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Q,Xe,et,oe,fe,nt,Ee,ot.data):M.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Q,Xe,et,ot.width,ot.height,nt,ot.data):A.texSubImage2D(A.TEXTURE_2D,Q,Xe,et,oe,fe,nt,Ee,ot);A.pixelStorei(A.UNPACK_ROW_LENGTH,Ye),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,kt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,dn),A.pixelStorei(A.UNPACK_SKIP_ROWS,Vt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Jn),Q===0&&I.generateMipmaps&&A.generateMipmap(dt),me.unbindTexture()},this.initRenderTarget=function(M){ge.get(M).__webglFramebuffer===void 0&&Be.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Be.setTextureCube(M,0):M.isData3DTexture?Be.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Be.setTexture2DArray(M,0):Be.setTexture2D(M,0),me.unbindTexture()},this.resetState=function(){C=0,R=0,U=null,me.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class bg{constructor(e,t){if(this.manifest=e,t.byteLength!==e.byteLength)throw new Error(`高程长度错误：${t.byteLength} != ${e.byteLength}`);this.values=new Int16Array(t);const i=typeof navigator<"u"&&navigator.webdriver&&e.width>1440,n=i?1:e.width,s=i?1:e.height,a=i?new Float32Array([this.values[0]]):new Float32Array(this.values);this.texture=new bs(a,n,s,Ss,ei),this.texture.wrapS=Gt,this.texture.wrapT=vi,this.texture.minFilter=wt,this.texture.magFilter=wt,this.texture.colorSpace=oi,this.texture.needsUpdate=!0}manifest;values;texture;sampleUv(e,t){const{width:i,height:n}=this.manifest,s=(e%1+1)%1*i-.5,a=Math.min(n-1,Math.max(0,t*n-.5)),o=Math.floor(s),l=Math.floor(a),c=o+1,h=Math.max(0,Math.min(n-1,l+1)),u=s-o,d=a-l,f=(m,p)=>this.values[p*i+(m%i+i)%i],g=Bt.lerp(f(o,l),f(c,l),u),v=Bt.lerp(f(o,h),f(c,h),u);return Bt.lerp(g,v,d)}sampleDirection(e){const t=e.clone().normalize(),i=Math.atan2(t.z,t.x)/(Math.PI*2)+.5,n=Math.asin(t.y)/Math.PI+.5;return this.sampleUv(i,1-n)}statistics(e){const{width:t,height:i}=this.manifest;let n=0,s=0,a=0;for(let l=0;l<i;l+=1){const c=Math.PI/2-(l+.5)/i*Math.PI,h=Math.cos(c);for(let u=0;u<t;u+=1){const d=this.values[l*t+u];s+=h,d<e&&(n+=h,a+=(e-d)*h)}}const o=4*Math.PI*3389.5*3389.5;return{coverage:n/s,volumeKm3:a/s*o/1e3}}}async function ru(r="./data/mola-meg016-base-v1"){const e=await fetch(`${r}.json`,{cache:"no-cache"});if(!e.ok)throw new Error(`无法读取数据清单 (${e.status})`);const t=await e.json(),i=await fetch(`${r}.bin`);if(!i.ok)throw new Error(`无法读取高程数据 (${i.status})`);const n=await i.arrayBuffer();if(crypto.subtle){const s=await crypto.subtle.digest("SHA-256",n),a=Array.from(new Uint8Array(s),o=>o.toString(16).padStart(2,"0")).join("");if(a!==t.outputSha256)throw new Error(`高程校验和错误：${a.slice(0,12)}…`)}return new bg(t,n)}const oc={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class _s{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Og(e)}),this.register(function(e){return new Ng(e)}),this.register(function(e){return new Hg(e)}),this.register(function(e){return new zg(e)}),this.register(function(e){return new kg(e)}),this.register(function(e){return new Vg(e)}),this.register(function(e){return new Fg(e)}),this.register(function(e){return new Bg(e)}),this.register(function(e){return new Gg(e)}),this.register(function(e){return new Wg(e)}),this.register(function(e){return new Xg(e)}),this.register(function(e){return new Kg(e)}),this.register(function(e){return new jg(e)}),this.register(function(e){return new qg(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,i,n){const s=new Ug,a=[];for(let o=0,l=this.pluginCallbacks.length;o<l;o++)a.push(this.pluginCallbacks[o](s));s.setPlugins(a),s.setTextureUtils(this.textureUtils),s.writeAsync(e,t,n).catch(i)}parseAsync(e,t){const i=this;return new Promise(function(n,s){i.parse(e,n,s,t)})}}const Ve={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},ha="KHR_mesh_quantization",Yt={};Yt[Pt]=Ve.NEAREST;Yt[po]=Ve.NEAREST_MIPMAP_NEAREST;Yt[Ln]=Ve.NEAREST_MIPMAP_LINEAR;Yt[wt]=Ve.LINEAR;Yt[dr]=Ve.LINEAR_MIPMAP_NEAREST;Yt[yi]=Ve.LINEAR_MIPMAP_LINEAR;Yt[vi]=Ve.CLAMP_TO_EDGE;Yt[Gt]=Ve.REPEAT;Yt[yr]=Ve.MIRRORED_REPEAT;const lc={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},Eg=new De,cc=12,wg=1179937895,Cg=2,uc=8,Ag=1313821514,Rg=5130562;function hr(r,e){return r.length===e.length&&r.every(function(t,i){return t===e[i]})}function Pg(r){return new TextEncoder().encode(r).buffer}function Lg(r){return hr(r.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function Dg(r,e,t){const i={min:new Array(r.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(r.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let n=e;n<e+t;n++)for(let s=0;s<r.itemSize;s++){let a;r.itemSize>4?a=r.array[n*r.itemSize+s]:(s===0?a=r.getX(n):s===1?a=r.getY(n):s===2?a=r.getZ(n):s===3&&(a=r.getW(n)),r.normalized===!0&&(a=Bt.normalize(a,r.array))),i.min[s]=Math.min(i.min[s],a),i.max[s]=Math.max(i.max[s],a)}return i}function su(r){return Math.ceil(r/4)*4}function da(r,e=0){const t=su(r.byteLength);if(t!==r.byteLength){const i=new Uint8Array(t);if(i.set(new Uint8Array(r)),e!==0)for(let n=r.byteLength;n<t;n++)i[n]=e;return i.buffer}return r}function hc(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function Ig(r,e){if(typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),r.convertToBlob({type:e,quality:t})}else return new Promise(t=>r.toBlob(t,e))}class Ug{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r"+Ms}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,i={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},i),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);const n=this,s=n.buffers,a=n.json;i=n.options;const o=n.extensionsUsed,l=n.extensionsRequired,c=new Blob(s,{type:"application/octet-stream"}),h=Object.keys(o),u=Object.keys(l);if(h.length>0&&(a.extensionsUsed=h),u.length>0&&(a.extensionsRequired=u),a.buffers&&a.buffers.length>0&&(a.buffers[0].byteLength=c.size),i.binary===!0){const d=new FileReader;d.readAsArrayBuffer(c),d.onloadend=function(){const f=da(d.result),g=new DataView(new ArrayBuffer(uc));g.setUint32(0,f.byteLength,!0),g.setUint32(4,Rg,!0);const v=da(Pg(JSON.stringify(a)),32),m=new DataView(new ArrayBuffer(uc));m.setUint32(0,v.byteLength,!0),m.setUint32(4,Ag,!0);const p=new ArrayBuffer(cc),T=new DataView(p);T.setUint32(0,wg,!0),T.setUint32(4,Cg,!0);const b=cc+m.byteLength+v.byteLength+g.byteLength+f.byteLength;T.setUint32(8,b,!0);const _=new Blob([p,m,v,g,f],{type:"application/octet-stream"}),w=new FileReader;w.readAsArrayBuffer(_),w.onloadend=function(){t(w.result)}}}else if(a.buffers&&a.buffers.length>0){const d=new FileReader;d.readAsDataURL(c),d.onloadend=function(){const f=d.result;a.buffers[0].uri=f,t(a)}}else t(a)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;const i=this.options,n=this.extensionsUsed;try{const s=JSON.parse(JSON.stringify(e.userData));if(i.includeCustomExtensions&&s.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(const a in s.gltfExtensions)t.extensions[a]=s.gltfExtensions[a],n[a]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(t.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){const n=new Map;n.set(!0,this.uid++),n.set(!1,this.uid++),this.uids.set(e,n)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const i=new P;for(let n=0,s=e.count;n<s;n++)if(Math.abs(i.fromBufferAttribute(e,n).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const i=e.clone(),n=new P;for(let s=0,a=i.count;s<a;s++)n.fromBufferAttribute(i,s),n.x===0&&n.y===0&&n.z===0?n.setX(1):n.normalize(),i.setXYZ(s,n.x,n.y,n.z);return t.attributesNormalized.set(e,i),i}applyTextureTransform(e,t){let i=!1;const n={};(t.offset.x!==0||t.offset.y!==0)&&(n.offset=t.offset.toArray(),i=!0),t.rotation!==0&&(n.rotation=t.rotation,i=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(n.scale=t.repeat.toArray(),i=!0),i&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=n,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function i(f){return f.colorSpace===yt?function(v){return v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4)}:function(v){return v}}e instanceof ta&&(e=await this.decompressTextureAsync(e)),t instanceof ta&&(t=await this.decompressTextureAsync(t));const n=e?e.image:null,s=t?t.image:null,a=Math.max(n?n.width:0,s?s.width:0),o=Math.max(n?n.height:0,s?s.height:0),l=hc();l.width=a,l.height=o;const c=l.getContext("2d",{willReadFrequently:!0});c.fillStyle="#00ffff",c.fillRect(0,0,a,o);const h=c.getImageData(0,0,a,o);if(n){c.drawImage(n,0,0,a,o);const f=i(e),g=c.getImageData(0,0,a,o).data;for(let v=2;v<g.length;v+=4)h.data[v]=f(g[v]/256)*256}if(s){c.drawImage(s,0,0,a,o);const f=i(t),g=c.getImageData(0,0,a,o).data;for(let v=1;v<g.length;v+=4)h.data[v]=f(g[v]/256)*256}c.putImageData(h,0,0);const d=(e||t).clone();return d.source=new Ts(l),d.colorSpace=oi,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){const t=this.json,i=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),i.push(e),0}processBufferView(e,t,i,n,s){const a=this.json;a.bufferViews||(a.bufferViews=[]);let o;switch(t){case Ve.BYTE:case Ve.UNSIGNED_BYTE:o=1;break;case Ve.SHORT:case Ve.UNSIGNED_SHORT:o=2;break;default:o=4}let l=e.itemSize*o;s===Ve.ARRAY_BUFFER&&(l=Math.ceil(l/4)*4);const c=su(n*l),h=new DataView(new ArrayBuffer(c));let u=0;for(let g=i;g<i+n;g++){for(let v=0;v<e.itemSize;v++){let m;e.itemSize>4?m=e.array[g*e.itemSize+v]:(v===0?m=e.getX(g):v===1?m=e.getY(g):v===2?m=e.getZ(g):v===3&&(m=e.getW(g)),e.normalized===!0&&(m=Bt.normalize(m,e.array))),t===Ve.FLOAT?h.setFloat32(u,m,!0):t===Ve.INT?h.setInt32(u,m,!0):t===Ve.UNSIGNED_INT?h.setUint32(u,m,!0):t===Ve.SHORT?h.setInt16(u,m,!0):t===Ve.UNSIGNED_SHORT?h.setUint16(u,m,!0):t===Ve.BYTE?h.setInt8(u,m):t===Ve.UNSIGNED_BYTE&&h.setUint8(u,m),u+=o}u%l!==0&&(u+=l-u%l)}const d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:c};return s!==void 0&&(d.target=s),s===Ve.ARRAY_BUFFER&&(d.byteStride=l),this.byteOffset+=c,a.bufferViews.push(d),{id:a.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,i=t.json;return i.bufferViews||(i.bufferViews=[]),new Promise(function(n){const s=new FileReader;s.readAsArrayBuffer(e),s.onloadend=function(){const a=da(s.result),o={buffer:t.processBuffer(a),byteOffset:t.byteOffset,byteLength:a.byteLength};t.byteOffset+=a.byteLength,n(i.bufferViews.push(o)-1)}})}processAccessor(e,t,i,n){const s=this.json,a={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let o;if(e.array.constructor===Float32Array)o=Ve.FLOAT;else if(e.array.constructor===Int32Array)o=Ve.INT;else if(e.array.constructor===Uint32Array)o=Ve.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=Ve.SHORT;else if(e.array.constructor===Uint16Array)o=Ve.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=Ve.BYTE;else if(e.array.constructor===Uint8Array)o=Ve.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(i===void 0&&(i=0),(n===void 0||n===1/0)&&(n=e.count),n===0)return null;const l=Dg(e,i,n);let c;t!==void 0&&(c=e===t.index?Ve.ELEMENT_ARRAY_BUFFER:Ve.ARRAY_BUFFER);const h=this.processBufferView(e,o,i,n,c),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:o,count:n,max:l.max,min:l.min,type:a[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(u)-1}processImage(e,t,i,n="image/png"){if(e!==null){const s=this,a=s.cache,o=s.json,l=s.options,c=s.pending;a.images.has(e)||a.images.set(e,{});const h=a.images.get(e),u=n+":flipY/"+i.toString();if(h[u]!==void 0)return h[u];o.images||(o.images=[]);const d={mimeType:n},f=hc();f.width=Math.min(e.width,l.maxTextureSize),f.height=Math.min(e.height,l.maxTextureSize);const g=f.getContext("2d",{willReadFrequently:!0});if(i===!0&&(g.translate(0,f.height),g.scale(1,-1)),e.data!==void 0){t!==qt&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>l.maxTextureSize||e.height>l.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const m=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<m.length;p+=4)m[p+0]=e.data[p+0],m[p+1]=e.data[p+1],m[p+2]=e.data[p+2],m[p+3]=e.data[p+3];g.putImageData(new ImageData(m,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)g.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");l.binary===!0?c.push(Ig(f,n).then(m=>s.processBufferViewImage(m)).then(m=>{d.bufferView=m})):d.uri=Nc.getDataURL(f,n);const v=o.images.push(d)-1;return h[u]=v,v}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const i={magFilter:Yt[e.magFilter],minFilter:Yt[e.minFilter],wrapS:Yt[e.wrapS],wrapT:Yt[e.wrapT]};return t.samplers.push(i)-1}async processTextureAsync(e){const i=this.options,n=this.cache,s=this.json;if(n.textures.has(e))return n.textures.get(e);s.textures||(s.textures=[]),e instanceof ta&&(e=await this.decompressTextureAsync(e,i.maxTextureSize));let a=e.userData.mimeType;a==="image/webp"&&(a="image/png");const o={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,a)};e.name&&(o.name=e.name),await this._invokeAllAsync(async function(c){c.writeTexture&&await c.writeTexture(e,o)});const l=s.textures.push(o)-1;return n.textures.set(e,l),l}async processMaterialAsync(e){const t=this.cache,i=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;i.materials||(i.materials=[]);const n={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const s=e.color.toArray().concat([e.opacity]);if(hr(s,[1,1,1,1])||(n.pbrMetallicRoughness.baseColorFactor=s),e.isMeshStandardMaterial?(n.pbrMetallicRoughness.metallicFactor=e.metalness,n.pbrMetallicRoughness.roughnessFactor=e.roughness):(n.pbrMetallicRoughness.metallicFactor=0,n.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){const o=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),l={index:await this.processTextureAsync(o),texCoord:o.channel};this.applyTextureTransform(l,o),n.pbrMetallicRoughness.metallicRoughnessTexture=l}if(e.map){const o={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(o,e.map),n.pbrMetallicRoughness.baseColorTexture=o}if(e.emissive){const o=e.emissive;if(Math.max(o.r,o.g,o.b)>0&&(n.emissiveFactor=e.emissive.toArray()),e.emissiveMap){const c={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(c,e.emissiveMap),n.emissiveTexture=c}}if(e.normalMap){const o={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(o.scale=e.normalScale.x),this.applyTextureTransform(o,e.normalMap),n.normalTexture=o}if(e.aoMap){const o={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(o.strength=e.aoMapIntensity),this.applyTextureTransform(o,e.aoMap),n.occlusionTexture=o}e.transparent?n.alphaMode="BLEND":e.alphaTest>0&&(n.alphaMode="MASK",n.alphaCutoff=e.alphaTest),e.side===ai&&(n.doubleSided=!0),e.name!==""&&(n.name=e.name),this.serializeUserData(e,n),await this._invokeAllAsync(async function(o){o.writeMaterialAsync&&await o.writeMaterialAsync(e,n)});const a=i.materials.push(n)-1;return t.materials.set(e,a),a}async processMeshAsync(e){const t=this.cache,i=this.json,n=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,w=e.material.length;_<w;_++)n.push(e.material[_].uuid);else n.push(e.material.uuid);const s=n.join(":");if(t.meshes.has(s))return t.meshes.get(s);const a=e.geometry;let o;e.isLineSegments?o=Ve.LINES:e.isLineLoop?o=Ve.LINE_LOOP:e.isLine?o=Ve.LINE_STRIP:e.isPoints?o=Ve.POINTS:o=e.material.wireframe?Ve.LINES:Ve.TRIANGLES;const l={},c={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=a.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),a.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let g=null;for(let _ in a.attributes){if(_.slice(0,5)==="morph")continue;const w=a.attributes[_];if(_=d[_]||_.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)||(_="_"+_),t.attributes.has(this.getUID(w))){c[_]=t.attributes.get(this.getUID(w));continue}g=null;const R=w.array;_==="JOINTS_0"&&!(R instanceof Uint16Array)&&!(R instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new ht(new Uint16Array(R),w.itemSize,w.normalized)):(R instanceof Uint32Array||R instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),g=_s.Utils.toFloat32BufferAttribute(w));const U=this.processAccessor(g||w,a);U!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,w),c[_]=U,t.attributes.set(this.getUID(w),U))}if(f!==void 0&&a.setAttribute("normal",f),Object.keys(c).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){const _=[],w=[],C={};if(e.morphTargetDictionary!==void 0)for(const R in e.morphTargetDictionary)C[e.morphTargetDictionary[R]]=R;for(let R=0;R<e.morphTargetInfluences.length;++R){const U={};let S=!1;for(const x in a.morphAttributes){if(x!=="position"&&x!=="normal"){S||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),S=!0);continue}const L=a.morphAttributes[x][R],G=x.toUpperCase(),H=a.attributes[x];if(t.attributes.has(this.getUID(L,!0))){U[G]=t.attributes.get(this.getUID(L,!0));continue}const X=L.clone();if(!a.morphTargetsRelative)for(let V=0,K=L.count;V<K;V++)for(let Z=0;Z<L.itemSize;Z++)Z===0&&X.setX(V,L.getX(V)-H.getX(V)),Z===1&&X.setY(V,L.getY(V)-H.getY(V)),Z===2&&X.setZ(V,L.getZ(V)-H.getZ(V)),Z===3&&X.setW(V,L.getW(V)-H.getW(V));U[G]=this.processAccessor(X,a),t.attributes.set(this.getUID(H,!0),U[G])}u.push(U),_.push(e.morphTargetInfluences[R]),e.morphTargetDictionary!==void 0&&w.push(C[R])}l.weights=_,w.length>0&&(l.extras={},l.extras.targetNames=w)}const v=Array.isArray(e.material);if(v&&a.groups.length===0)return null;let m=!1;if(v&&a.index===null){const _=[];for(let w=0,C=a.attributes.position.count;w<C;w++)_[w]=w;a.setIndex(_),m=!0}const p=v?e.material:[e.material],T=v?a.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,w=T.length;_<w;_++){const C={mode:o,attributes:c};if(this.serializeUserData(a,C),u.length>0&&(C.targets=u),a.index!==null){let U=this.getUID(a.index);(T[_].start!==void 0||T[_].count!==void 0)&&(U+=":"+T[_].start+":"+T[_].count),t.attributes.has(U)?C.indices=t.attributes.get(U):(C.indices=this.processAccessor(a.index,a,T[_].start,T[_].count),t.attributes.set(U,C.indices)),C.indices===null&&delete C.indices}const R=await this.processMaterialAsync(p[T[_].materialIndex]);R!==null&&(C.material=R),h.push(C)}m===!0&&a.setIndex(null),l.primitives=h,i.meshes||(i.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,l)});const b=i.meshes.push(l)-1;return t.meshes.set(s,b),b}detectMeshQuantization(e,t){if(this.extensionsUsed[ha])return;let i;switch(t.array.constructor){case Int8Array:i="byte";break;case Uint8Array:i="unsigned byte";break;case Int16Array:i="short";break;case Uint16Array:i="unsigned short";break;default:return}t.normalized&&(i+=" normalized");const n=e.split("_",1)[0];oc[n]&&oc[n].includes(i)&&(this.extensionsUsed[ha]=!0,this.extensionsRequired[ha]=!0)}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const i=e.isOrthographicCamera,n={type:i?"orthographic":"perspective"};return i?n.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:n.perspective={aspectRatio:e.aspect,yfov:Bt.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(n.name=e.type),t.cameras.push(n)-1}processAnimation(e,t){const i=this.json,n=this.nodeMap;i.animations||(i.animations=[]),e=_s.Utils.mergeMorphTargetTracks(e.clone(),t);const s=e.tracks,a=[],o=[];for(let c=0;c<s.length;++c){const h=s[c],u=qe.parseTrackName(h.name);let d=qe.findNode(t,u.nodeName);const f=lc[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}const g=1;let v=h.values.length/h.times.length;f===lc.morphTargetInfluences&&(v/=d.morphTargetInfluences.length);let m;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",v/=3):h.getInterpolation()===zn?m="STEP":m="LINEAR",o.push({input:this.processAccessor(new ht(h.times,g)),output:this.processAccessor(new ht(h.values,v)),interpolation:m}),a.push({sampler:o.length-1,target:{node:n.get(d),path:f}})}const l={name:e.name||"clip_"+i.animations.length,samplers:o,channels:a};return this.serializeUserData(e,l),i.animations.push(l),i.animations.length-1}processSkin(e){const t=this.json,i=this.nodeMap,n=t.nodes[i.get(e)],s=e.skeleton;if(s===void 0)return null;const a=e.skeleton.bones[0];if(a===void 0)return null;const o=[],l=new Float32Array(s.bones.length*16),c=new Oe;for(let u=0;u<s.bones.length;++u)o.push(i.get(s.bones[u])),c.copy(s.boneInverses[u]),c.multiply(e.bindMatrix).toArray(l,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new ht(l,16)),joints:o,skeleton:i.get(a)}),n.skin=t.skins.length-1}async processNodeAsync(e){const t=this.json,i=this.options,n=this.nodeMap;t.nodes||(t.nodes=[]);const s={};if(i.trs){const o=e.quaternion.toArray(),l=e.position.toArray(),c=e.scale.toArray();hr(o,[0,0,0,1])||(s.rotation=o),hr(l,[0,0,0])||(s.translation=l),hr(c,[1,1,1])||(s.scale=c)}else e.matrixAutoUpdate&&e.updateMatrix(),Lg(e.matrix)===!1&&(s.matrix=e.matrix.elements);if(e.name!==""&&(s.name=String(e.name)),this.serializeUserData(e,s),e.isMesh||e.isLine||e.isPoints){const o=await this.processMeshAsync(e);o!==null&&(s.mesh=o)}else e.isCamera&&(s.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);const a=t.nodes.push(s)-1;if(n.set(e,a),e.children.length>0){const o=[];for(let l=0,c=e.children.length;l<c;l++){const h=e.children[l];if(h.visible||i.onlyVisible===!1){const u=await this.processNodeAsync(h);u!==null&&o.push(u)}}o.length>0&&(s.children=o)}return await this._invokeAllAsync(function(o){o.writeNode&&o.writeNode(e,s)}),a}async processSceneAsync(e){const t=this.json,i=this.options;t.scenes||(t.scenes=[],t.scene=0);const n={};e.name!==""&&(n.name=e.name),t.scenes.push(n);const s=[];for(let a=0,o=e.children.length;a<o;a++){const l=e.children[a];if(l.visible||i.onlyVisible===!1){const c=await this.processNodeAsync(l);c!==null&&s.push(c)}}s.length>0&&(n.nodes=s),this.serializeUserData(e,n)}async processObjectsAsync(e){const t=new Er;t.name="AuxScene";for(let i=0;i<e.length;i++)t.children.push(e[i]);await this.processSceneAsync(t)}async processInputAsync(e){const t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(n){n.beforeParse&&n.beforeParse(e)});const i=[];for(let n=0;n<e.length;n++)e[n]instanceof Er?await this.processSceneAsync(e[n]):i.push(e[n]);i.length>0&&await this.processObjectsAsync(i);for(let n=0;n<this.skins.length;++n)this.processSkin(this.skins[n]);for(let n=0;n<t.animations.length;++n)this.processAnimation(t.animations[n],e[0]);await this._invokeAllAsync(function(n){n.afterParse&&n.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,i=this.plugins.length;t<i;t++)await e(this.plugins[t])}}class Og{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}const i=this.writer,n=i.json,s=i.extensionsUsed,a={};e.name&&(a.name=e.name),a.color=e.color.toArray(),a.intensity=e.intensity,e.isDirectionalLight?a.type="directional":e.isPointLight?(a.type="point",e.distance>0&&(a.range=e.distance)):e.isSpotLight&&(a.type="spot",e.distance>0&&(a.range=e.distance),a.spot={},a.spot.innerConeAngle=(1-e.penumbra)*e.angle,a.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(n.extensions=n.extensions||{},n.extensions[this.name]={lights:[]},s[this.name]=!0);const o=n.extensions[this.name].lights;o.push(a),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}}let Ng=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;const n=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},n[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Fg=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;const i=this.writer,n=i.extensionsUsed,s={};if(s.clearcoatFactor=e.clearcoat,e.clearcoatMap){const a={index:await i.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};i.applyTextureTransform(a,e.clearcoatMap),s.clearcoatTexture=a}if(s.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){const a={index:await i.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};i.applyTextureTransform(a,e.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=a}if(e.clearcoatNormalMap){const a={index:await i.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(a.scale=e.clearcoatNormalScale.x),i.applyTextureTransform(a,e.clearcoatNormalMap),s.clearcoatNormalTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Bg=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;const n=this.writer.extensionsUsed,s={};s.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Gg=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;const i=this.writer,n=i.extensionsUsed,s={};if(s.iridescenceFactor=e.iridescence,e.iridescenceMap){const a={index:await i.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};i.applyTextureTransform(a,e.iridescenceMap),s.iridescenceTexture=a}if(s.iridescenceIor=e.iridescenceIOR,s.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){const a={index:await i.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};i.applyTextureTransform(a,e.iridescenceThicknessMap),s.iridescenceThicknessTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Hg=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const i=this.writer,n=i.extensionsUsed,s={};if(s.transmissionFactor=e.transmission,e.transmissionMap){const a={index:await i.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};i.applyTextureTransform(a,e.transmissionMap),s.transmissionTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},zg=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const i=this.writer,n=i.extensionsUsed,s={};if(s.thicknessFactor=e.thickness,e.thicknessMap){const a={index:await i.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};i.applyTextureTransform(a,e.thicknessMap),s.thicknessTexture=a}e.attenuationDistance!==1/0&&(s.attenuationDistance=e.attenuationDistance),s.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},kg=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;const n=this.writer.extensionsUsed,s={};s.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Vg=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(Eg)&&!e.specularIntensityMap&&!e.specularColorMap)return;const i=this.writer,n=i.extensionsUsed,s={};if(e.specularIntensityMap){const a={index:await i.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};i.applyTextureTransform(a,e.specularIntensityMap),s.specularTexture=a}if(e.specularColorMap){const a={index:await i.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};i.applyTextureTransform(a,e.specularColorMap),s.specularColorTexture=a}s.specularFactor=e.specularIntensity,s.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Wg=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;const i=this.writer,n=i.extensionsUsed,s={};if(e.sheenRoughnessMap){const a={index:await i.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};i.applyTextureTransform(a,e.sheenRoughnessMap),s.sheenRoughnessTexture=a}if(e.sheenColorMap){const a={index:await i.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};i.applyTextureTransform(a,e.sheenColorMap),s.sheenColorTexture=a}s.sheenRoughnessFactor=e.sheenRoughness,s.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Xg=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;const i=this.writer,n=i.extensionsUsed,s={};if(e.anisotropyMap){const a={index:await i.processTextureAsync(e.anisotropyMap)};i.applyTextureTransform(a,e.anisotropyMap),s.anisotropyTexture=a}s.anisotropyStrength=e.anisotropy,s.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},Kg=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;const n=this.writer.extensionsUsed,s={};s.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},jg=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;const i=this.writer,n=i.extensionsUsed,s={};if(e.bumpMap){const a={index:await i.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};i.applyTextureTransform(a,e.bumpMap),s.bumpTexture=a}s.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=s,n[this.name]=!0}},qg=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;const i=this.writer,n=e,s=new Float32Array(n.count*3),a=new Float32Array(n.count*4),o=new Float32Array(n.count*3),l=new Oe,c=new P,h=new di,u=new P;for(let f=0;f<n.count;f++)n.getMatrixAt(f,l),l.decompose(c,h,u),c.toArray(s,f*3),h.toArray(a,f*4),u.toArray(o,f*3);const d={TRANSLATION:i.processAccessor(new ht(s,3)),ROTATION:i.processAccessor(new ht(a,4)),SCALE:i.processAccessor(new ht(o,3))};n.instanceColor&&(d._COLOR_0=i.processAccessor(n.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},i.extensionsUsed[this.name]=!0,i.extensionsRequired[this.name]=!0}};_s.Utils={insertKeyframe:function(r,e){const i=r.getValueSize(),n=new r.TimeBufferType(r.times.length+1),s=new r.ValueBufferType(r.values.length+i),a=r.createInterpolant(new r.ValueBufferType(i));let o;if(r.times.length===0){n[0]=e;for(let l=0;l<i;l++)s[l]=0;o=0}else if(e<r.times[0]){if(Math.abs(r.times[0]-e)<.001)return 0;n[0]=e,n.set(r.times,1),s.set(a.evaluate(e),0),s.set(r.values,i),o=0}else if(e>r.times[r.times.length-1]){if(Math.abs(r.times[r.times.length-1]-e)<.001)return r.times.length-1;n[n.length-1]=e,n.set(r.times,0),s.set(r.values,0),s.set(a.evaluate(e),r.values.length),o=n.length-1}else for(let l=0;l<r.times.length;l++){if(Math.abs(r.times[l]-e)<.001)return l;if(r.times[l]<e&&r.times[l+1]>e){n.set(r.times.slice(0,l+1),0),n[l+1]=e,n.set(r.times.slice(l+1),l+2),s.set(r.values.slice(0,(l+1)*i),0),s.set(a.evaluate(e),(l+1)*i),s.set(r.values.slice((l+1)*i),(l+2)*i),o=l+1;break}}return r.times=n,r.values=s,o},mergeMorphTargetTracks:function(r,e){const t=[],i={},n=r.tracks;for(let s=0;s<n.length;++s){let a=n[s];const o=qe.parseTrackName(a.name),l=qe.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(a);continue}if(a.createInterpolant!==a.InterpolantFactoryMethodDiscrete&&a.createInterpolant!==a.InterpolantFactoryMethodLinear){if(a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),a=a.clone(),a.setInterpolation(kn)}const c=l.morphTargetInfluences.length,h=l.morphTargetDictionary[o.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let u;if(i[l.uuid]===void 0){u=a.clone();const f=new u.ValueBufferType(c*u.times.length);for(let g=0;g<u.times.length;g++)f[g*c+h]=u.values[g];u.name=(o.nodeName||"")+".morphTargetInfluences",u.values=f,i[l.uuid]=u,t.push(u);continue}const d=a.createInterpolant(new a.ValueBufferType(1));u=i[l.uuid];for(let f=0;f<u.times.length;f++)u.values[f*c+h]=d.evaluate(u.times[f]);for(let f=0;f<a.times.length;f++){const g=this.insertKeyframe(u,a.times[f]);u.values[g*c+h]=a.values[f]}}return r.tracks=t,r},toFloat32BufferAttribute:function(r){const e=new ht(new Float32Array(r.count*r.itemSize),r.itemSize,!1);if(!r.normalized&&!r.isInterleavedBufferAttribute)return e.array.set(r.array),e;for(let t=0,i=r.count;t<i;t++)for(let n=0;n<r.itemSize;n++)e.setComponent(t,n,r.getComponent(t,n));return e}};function dc(r,e){if(e===Zu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ro||e===Dc){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const i=t.count-2,n=[];if(e===ro)for(let a=1;a<=i;a++)n.push(t.getX(0)),n.push(t.getX(a)),n.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(n.push(t.getX(a)),n.push(t.getX(a+1)),n.push(t.getX(a+2))):(n.push(t.getX(a+2)),n.push(t.getX(a+1)),n.push(t.getX(a)));n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(n),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Yg extends $n{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)}),this.register(function(t){return new uv(t)}),this.register(function(t){return new hv(t)}),this.register(function(t){return new dv(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new av(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new ov(t)}),this.register(function(t){return new iv(t)}),this.register(function(t){return new cv(t)}),this.register(function(t){return new lv(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new fv(t)}),this.register(function(t){return new pv(t)})}load(e,t,i,n){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=mr.extractUrlBase(e);a=mr.resolveURL(c,this.path)}else a=mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){n?n(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Zc(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===au){try{a[We.KHR_BINARY_GLTF]=new mv(e)}catch(u){n&&n(u);return}s=JSON.parse(a[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Av(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case We.KHR_MATERIALS_UNLIT:a[u]=new Jg;break;case We.KHR_DRACO_MESH_COMPRESSION:a[u]=new gv(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:a[u]=new vv;break;case We.KHR_MESH_QUANTIZATION:a[u]=new yv;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){const i=this;return new Promise(function(n,s){i.parse(e,t,n,s)})}}function $g(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Zg{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){const s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let n=t.cache.get(i);if(n)return n;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new De(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ot);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Cd(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ed(h),c.distance=u;break;case"spot":c=new Td(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),mi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class Jg{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return cn}extendParams(e,t,i){const n=[];e.color=new De(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ot),e.opacity=a[3]}s.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(n)}}class Qg{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=n.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class ev{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ae(o,o)}return Promise.all(s)}}class tv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=n.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class iv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class nv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=n.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Ot)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class rv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class sv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(o[0],o[1],o[2],Ot),Promise.all(s)}}class av{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const n=this.parser.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=n.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ov{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(o[0],o[1],o[2],Ot),a.specularColorTexture!==void 0&&s.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(s)}}class lv{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class cv{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Ti}extendMaterialParams(e,t){const i=this.parser,n=i.json.materials[e];if(!n.extensions||!n.extensions[this.name])return Promise.resolve();const s=[],a=n.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class uv{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const s=n.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class hv{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,n=i.json,s=n.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=n.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class dv{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,n=i.json,s=n.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=n.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class fv{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const n=i.extensions[this.name],s=this.parser.getDependency("buffer",n.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=n.byteOffset||0,c=n.byteLength||0,h=n.count,u=n.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,n.mode,n.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,n.mode,n.filter),f})})}else return null}}class pv{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const n=t.meshes[i.mesh];for(const c of n.primitives)if(c.mode!==Qt.TRIANGLES&&c.mode!==Qt.TRIANGLE_STRIP&&c.mode!==Qt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const v=new Oe,m=new P,p=new di,T=new P(1,1,1),b=new ed(g.geometry,g.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&T.fromBufferAttribute(l.SCALE,_),b.setMatrixAt(_,v.compose(m,p,T));for(const _ in l)if(_==="_COLOR_0"){const w=l[_];b.instanceColor=new ao(w.array,w.itemSize,w.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);pt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const au="glTF",or=12,fc={JSON:1313821514,BIN:5130562};class mv{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,or),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==au)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-or,s=new DataView(e,or);let a=0;for(;a<n;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===fc.JSON){const c=new Uint8Array(e,or+a,o);this.content=i.decode(c)}else if(l===fc.BIN){const c=or+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,n=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=co[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=co[h]||h.toLowerCase();if(a[h]!==void 0){const d=i.accessors[e.attributes[h]],f=Fn[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){n.decodeDracoFile(h,function(f){for(const g in f.attributes){const v=f.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(f)},o,c,Ot,d)})})}}class vv{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class yv{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class ou extends Lr{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,s=e*n*3+n;for(let a=0;a!==n;a++)t[a]=i[s+a];return t}interpolate_(e,t,i,n){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,u=(i-t)/h,d=u*u,f=d*u,g=e*c,v=g-c,m=-2*f+3*d,p=f-d,T=1-m,b=p-d+u;for(let _=0;_!==o;_++){const w=a[v+_+o],C=a[v+_+l]*h,R=a[g+_+o],U=a[g+_]*h;s[_]=T*w+b*C+m*R+p*U}return s}}const _v=new di;class Mv extends ou{interpolate_(e,t,i,n){const s=super.interpolate_(e,t,i,n);return _v.fromArray(s).normalize().toArray(s),s}}const Qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Fn={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},pc={9728:Pt,9729:wt,9984:po,9985:dr,9986:Ln,9987:yi},mc={33071:vi,33648:yr,10497:Gt},fa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},co={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xv={CUBICSPLINE:void 0,LINEAR:kn,STEP:zn},pa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Sv(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new wr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),r.DefaultMaterial}function rn(r,e,t){for(const i in t.extensions)r[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function mi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Tv(r,e,t){let i=!1,n=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(n=!0),u.COLOR_0!==void 0&&(s=!0),i&&n&&s)break}if(!i&&!n&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(n){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(r.morphAttributes.position=h),n&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function bv(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)r.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ev(r){let e;const t=r.extensions&&r.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ma(t.attributes):e=r.indices+":"+ma(r.attributes)+":"+r.mode,r.targets!==void 0)for(let i=0,n=r.targets.length;i<n;i++)e+=":"+ma(r.targets[i]);return e}function ma(r){let e="";const t=Object.keys(r).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+r[t[i]]+";";return e}function uo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function wv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Cv=new Oe;class Av{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new $g,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||s&&a<98?this.textureLoader=new Jc(this.options.manager):this.textureLoader=new Ad(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Zc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,n=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][n.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:n.asset,parser:i,userData:{}};return rn(s,o,n),mi(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,s=t.length;n<s;n++){const a=t[n].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let n=0,s=e.length;n<s;n++){const a=e[n];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const n=i.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const n=e(t[i]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let n=0;n<t.length;n++){const s=e(t[n]);s&&i.push(s)}return i}getDependency(e,t){const i=e+":"+t;let n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":n=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(s,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(s,a){i.load(mr.resolveURL(t.uri,n.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const n=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+n)})}loadAccessor(e){const t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const a=fa[n.type],o=Fn[n.componentType],l=n.normalized===!0,c=new o(n.count*a);return Promise.resolve(new ht(c,a,l))}const s=[];return n.bufferView!==void 0?s.push(this.getDependency("bufferView",n.bufferView)):s.push(null),n.sparse!==void 0&&(s.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=fa[n.type],c=Fn[n.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=n.byteOffset||0,f=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,g=n.normalized===!0;let v,m;if(f&&f!==u){const p=Math.floor(d/f),T="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+p+":"+n.count;let b=t.cache.get(T);b||(v=new c(o,p*f,n.count*f/h),b=new Yh(v,f/h),t.cache.add(T,b)),m=new To(b,l,d%f/h,g)}else o===null?v=new c(n.count*l):v=new c(o,d,n.count*l),m=new ht(v,l,g);if(n.sparse!==void 0){const p=fa.SCALAR,T=Fn[n.sparse.indices.componentType],b=n.sparse.indices.byteOffset||0,_=n.sparse.values.byteOffset||0,w=new T(a[1],b,n.sparse.count*p),C=new c(a[2],_,n.sparse.count*l);o!==null&&(m=new ht(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,U=w.length;R<U;R++){const S=w[R];if(m.setX(S,C[R*l]),l>=2&&m.setY(S,C[R*l+1]),l>=3&&m.setZ(S,C[R*l+2]),l>=4&&m.setW(S,C[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,i=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){const n=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=pc[d.magFilter]||wt,h.minFilter=pc[d.minFilter]||yi,h.wrapS=mc[d.wrapS]||Gt,h.wrapT=mc[d.wrapT]||Gt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Pt&&h.minFilter!==wt,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,n=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=n.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){const m=new Mt(v);m.needsUpdate=!0,d(m)}),t.load(mr.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),mi(u,a),u.userData.mimeType=a.mimeType||wv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){const s=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return n!==void 0&&(a.colorSpace=n),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const n=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Kc,Mi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Xc,Mi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||s||a){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return wr}loadMaterial(e){const t=this,i=this.json,n=this.extensions,s=i.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[We.KHR_MATERIALS_UNLIT]){const u=n[We.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new De(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ot),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=ai);const h=s.alphaMode||pa.OPAQUE;if(h===pa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===pa.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==cn&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Ae(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==cn&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==cn){const u=s.emissiveFactor;o.emissive=new De().setRGB(u[0],u[1],u[2],Ot)}return s.emissiveTexture!==void 0&&a!==cn&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,yt)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),mi(u,s),t.associations.set(u,{materials:e}),s.extensions&&rn(n,u,s),u})}createUniqueName(e){const t=qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,n=this.primitiveCache;function s(o){return i[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return gc(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Ev(c),u=n[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[We.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=gc(new ii,c,t),n[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,n=this.extensions,s=i.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?Sv(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const v=h[f],m=a[f];let p;const T=c[f];if(m.mode===Qt.TRIANGLES||m.mode===Qt.TRIANGLE_STRIP||m.mode===Qt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Zh(v,T):new _t(v,T),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Qt.TRIANGLE_STRIP?p.geometry=dc(p.geometry,Dc):m.mode===Qt.TRIANGLE_FAN&&(p.geometry=dc(p.geometry,ro));else if(m.mode===Qt.LINES)p=new rd(v,T);else if(m.mode===Qt.LINE_STRIP)p=new wo(v,T);else if(m.mode===Qt.LINE_LOOP)p=new sd(v,T);else if(m.mode===Qt.POINTS)p=new ad(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&bv(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),mi(p,s),m.extensions&&rn(n,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&rn(n,u[0],s),u[0];const d=new Xi;s.extensions&&rn(n,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ut(Bt.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new Ro(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),mi(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let n=0,s=t.joints.length;n<s;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){const s=n.pop(),a=n,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Oe;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new bo(o,l)})}loadAnimation(e){const t=this.json,i=this,n=t.animations[e],s=n.name?n.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=n.channels.length;u<d;u++){const f=n.channels[u],g=n.samplers[f.sampler],v=f.target,m=v.node,p=n.parameters!==void 0?n.parameters[g.input]:g.input,T=n.parameters!==void 0?n.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",T)),c.push(g),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],v=u[3],m=u[4],p=[];for(let b=0,_=d.length;b<_;b++){const w=d[b],C=f[b],R=g[b],U=v[b],S=m[b];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const x=i._createAnimationTracks(w,C,R,U,S);if(x)for(let L=0;L<x.length;L++)p.push(x[L])}const T=new md(s,void 0,p);return mi(T,n),T})}createNodeMesh(e){const t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(s){const a=i._getNodeRef(i.meshCache,n.mesh,s);return n.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),a})}loadNode(e){const t=this.json,i=this,n=t.nodes[e],s=i._loadNodeShallow(e),a=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Cv)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?n.createUniqueName(s.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(n.getDependency("camera",s.camera).then(function(c){return n._getNodeRef(n.cameraCache,s.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Wc:c.length>1?h=new Xi:c.length===1?h=c[0]:h=new pt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),mi(h,s),s.extensions&&rn(i,h,s),s.matrix!==void 0){const u=new Oe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(s.mesh!==void 0&&n.meshCache.refs[s.mesh]>1){const u=n.associations.get(h);n.associations.set(h,{...u})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],n=this,s=new Xi;i.name&&(s.name=n.createUniqueName(i.name)),mi(s,i),i.extensions&&rn(t,s,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(n.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of n.associations)(d instanceof Mi||d instanceof Mt)&&u.set(d,f);return h.traverse(d=>{const f=n.associations.get(d);f!=null&&u.set(d,f)}),u};return n.associations=c(s),s})}_createAnimationTracks(e,t,i,n,s){const a=[],o=e.name?e.name:e.uuid,l=[];ki[s.path]===ki.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(ki[s.path]){case ki.weights:c=Xn;break;case ki.rotation:c=Kn;break;case ki.translation:case ki.scale:c=jn;break;default:i.itemSize===1?c=Xn:c=jn;break}const h=n.interpolation!==void 0?xv[n.interpolation]:kn,u=this._getArrayFromAccessor(i);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+ki[s.path],t.array,u,h);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=uo(t.constructor),n=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)n[s]=t[s]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const n=this instanceof Kn?Mv:ou;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Rv(r,e,t){const i=e.attributes,n=new Oi;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){const h=uo(Fn[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new P,l=new P;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const v=uo(Fn[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}r.boundingBox=n;const a=new Si;n.getCenter(a.center),a.radius=n.min.distanceTo(n.max)/2,r.boundingSphere=a}function gc(r,e,t){const i=e.attributes,n=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in i){const o=co[a]||a.toLowerCase();o in r.attributes||n.push(s(i[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});n.push(a)}return je.workingColorSpace!==Ot&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),mi(r,e),Rv(r,e,t),Promise.all(n).then(function(){return e.targets!==void 0?Tv(r,e.targets,t):r})}function ho(r,e){const t=document.createElement("a");t.href=URL.createObjectURL(r),t.download=e,t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),3e4)}function Pv(r){ho(new Blob([`${JSON.stringify(r,null,2)}
`],{type:"application/json"}),"astra-mars-parameters.json")}async function Lv(r,e,t){const i=r.geometry.clone();Iv(i),i.deleteAttribute("color"),i.scale(3389500,3389500,3389500),i.normalizeNormals();const n=i.getAttribute("normal"),s=i.getAttribute("position"),a=new P;for(let T=0;T<n.count;T+=1)a.fromBufferAttribute(n,T),a.lengthSq()<.5&&a.fromBufferAttribute(s,T),a.normalize(),n.setXYZ(T,a.x,a.y,a.z);n.needsUpdate=!0,i.computeBoundingBox(),i.computeBoundingSphere();const o=t.quality===384?2048:typeof navigator<"u"&&navigator.webdriver?256:1024,{colorMap:l,roughnessMap:c}=Dv(e,o),h=new wr({map:l,roughnessMap:c,metalnessMap:c,roughness:.88,metalness:0,side:ti}),u=new _t(i,h);u.name="Mars_MOLA_Real_Displaced_Geometry",u.userData={source:e.manifest.productId,dataVersion:e.manifest.version,referenceRadiusM:3389500,seaLevelM:t.seaLevelM,displayExaggeration:t.exaggeration,elevationUnits:"meters",omittedDynamicEffects:["atmospheric scattering","procedural clouds","animated ocean waves"]};const d=new Er;d.add(u);let f=0;if(t.seaLevelM>e.manifest.minM){const T=Uv(e,t.seaLevelM,t.exaggeration);f=T.index?T.index.count/3:0;const b=new _t(T,new wr({color:680569,roughness:.2,metalness:0,transparent:!1}));b.name="Static_Sea_Level_Surface",b.userData={classification:"hypothetical static sea surface",seaLevelM:t.seaLevelM,displayExaggeration:t.exaggeration},d.add(b)}const v=await new _s().parseAsync(d,{binary:!0,onlyVisible:!0,trs:!1,maxTextureSize:2048});if(!(v instanceof ArrayBuffer))throw new Error("GLB 导出器返回了非二进制结果");await new Promise((T,b)=>{new Yg().parse(v,"",_=>{let w=0;_.scene.traverse(C=>{C.isMesh&&(w+=1)}),w<(t.seaLevelM>e.manifest.minM?2:1)?b(new Error("独立 GLB 重载缺少地形或静态海面网格")):T()},b)});const m=new Blob([v],{type:"model/gltf-binary"}),p=i.index?i.index.count/3:i.attributes.position.count/3;return{blob:m,vertices:i.attributes.position.count,triangles:p+f,meshes:d.children.length,textures:2,size:v.byteLength}}function Dv(r,e){const t=e/2,i=document.createElement("canvas"),n=document.createElement("canvas");i.width=n.width=e,i.height=n.height=t;const s=i.getContext("2d"),a=n.getContext("2d");if(!s||!a)throw new Error("无法创建 GLB 烘焙纹理画布");const o=s.createImageData(e,t),l=a.createImageData(e,t),c=r.manifest.maxM-r.manifest.minM;for(let d=0;d<t;d+=1)for(let f=0;f<e;f+=1){const v=(r.sampleUv((f+.5)/e,(d+.5)/t)-r.manifest.minM)/c,m=r.sampleUv((f-.5)/e,(d+.5)/t),p=r.sampleUv((f+1.5)/e,(d+.5)/t),T=r.sampleUv((f+.5)/e,(d-.5)/t),b=r.sampleUv((f+.5)/e,(d+1.5)/t),_=Math.min(1,Math.hypot(p-m,b-T)/2600),w=1-_*.32,C=Math.round((42+v*158)*w),R=Math.round((15+v*72)*w),U=Math.round((9+v*43)*w),S=Math.round(205+(1-v)*24+_*20),x=(d*e+f)*4;o.data.set([C,R,U,255],x),l.data.set([S,S,S,255],x)}s.putImageData(o,0,0),a.putImageData(l,0,0);const h=new Pl(i);h.colorSpace=yt,h.wrapS=Gt;const u=new Pl(n);return u.colorSpace=oi,u.wrapS=Gt,{colorMap:h,roughnessMap:u}}function Iv(r){const e=r.getAttribute("position"),t=r.getAttribute("uv"),i=new P;for(let n=0;n<e.count;n+=1){i.fromBufferAttribute(e,n).normalize();let s=Math.atan2(i.z,i.x)/(Math.PI*2)+.5;t.getX(n)<.001&&s<.001&&(s=1),t.getX(n)>.999&&s>.999&&(s=0);const a=.5-Math.asin(Bt.clamp(i.y,-1,1))/Math.PI;t.setXY(n,s,a)}t.needsUpdate=!0}function Uv(r,e,t){const s=3389500+e*t,a=[],o=[],l=[];for(let f=0;f<=128;f+=1){const g=f/128,v=Math.PI/2-g*Math.PI,m=Math.cos(v);for(let p=0;p<=256;p+=1){const T=p/256,b=(T-.5)*Math.PI*2;a.push(Math.cos(b)*m*s,Math.sin(v)*s,Math.sin(b)*m*s),o.push(T,1-g)}}for(let f=0;f<128;f+=1)for(let g=0;g<256;g+=1){if(r.sampleUv((g+.5)/256,(f+.5)/128)>=e)continue;const m=f*257+g,p=m+1,T=m+256+1,b=T+1;f>0&&l.push(m,p,T),f<127&&l.push(p,b,T)}const c=new ii;c.setAttribute("position",new zt(a,3)),c.setAttribute("uv",new zt(o,2)),c.setIndex(l),c.computeVertexNormals();const h=c.getAttribute("normal"),u=c.getAttribute("position"),d=new P;for(let f=0;f<h.count;f+=1)d.fromBufferAttribute(h,f),d.lengthSq()<.5&&d.fromBufferAttribute(u,f),d.normalize(),h.setXYZ(f,d.x,d.y,d.z);return h.needsUpdate=!0,c.computeBoundingBox(),c.computeBoundingSphere(),c}const vc={type:"change"},Io={type:"start"},lu={type:"end"},os=new Ar,yc=new Wi,Ov=Math.cos(70*Bt.DEG2RAD),xt=new P,Ft=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ga=1e-6;class Nv extends Gd{constructor(e,t=null){super(e,t),this.state=it.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Un.ROTATE,MIDDLE:Un.DOLLY,RIGHT:Un.PAN},this.touches={ONE:Pn.ROTATE,TWO:Pn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new di,this._lastTargetPosition=new P,this._quat=new di().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ol,this._sphericalDelta=new Ol,this._scale=1,this._panOffset=new P,this._rotateStart=new Ae,this._rotateEnd=new Ae,this._rotateDelta=new Ae,this._panStart=new Ae,this._panEnd=new Ae,this._panDelta=new Ae,this._dollyStart=new Ae,this._dollyEnd=new Ae,this._dollyDelta=new Ae,this._dollyDirection=new P,this._mouse=new Ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Bv.bind(this),this._onPointerDown=Fv.bind(this),this._onPointerUp=Gv.bind(this),this._onContextMenu=Kv.bind(this),this._onMouseWheel=kv.bind(this),this._onKeyDown=Vv.bind(this),this._onTouchStart=Wv.bind(this),this._onTouchMove=Xv.bind(this),this._onMouseDown=Hv.bind(this),this._onMouseMove=zv.bind(this),this._interceptControlDown=jv.bind(this),this._interceptControlUp=qv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vc),this.update(),this.state=it.NONE}update(e=null){const t=this.object.position;xt.copy(t).sub(this.target),xt.applyQuaternion(this._quat),this._spherical.setFromVector3(xt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Ft:i>Math.PI&&(i-=Ft),n<-Math.PI?n+=Ft:n>Math.PI&&(n-=Ft),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(xt.setFromSpherical(this._spherical),xt.applyQuaternion(this._quatInverse),t.copy(this.target).add(xt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=xt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=xt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(os.origin.copy(this.object.position),os.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(os.direction))<Ov?this.object.lookAt(this.target):(yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),os.intersectPlane(yc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ga||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ga||this._lastTargetPosition.distanceToSquared(this.target)>ga?(this.dispatchEvent(vc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ft/60*this.autoRotateSpeed*e:Ft/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){xt.setFromMatrixColumn(t,0),xt.multiplyScalar(-e),this._panOffset.add(xt)}_panUp(e,t){this.screenSpacePanning===!0?xt.setFromMatrixColumn(t,1):(xt.setFromMatrixColumn(t,0),xt.crossVectors(this.object.up,xt)),xt.multiplyScalar(e),this._panOffset.add(xt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;xt.copy(n).sub(this.target);let s=xt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ft*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ft*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ft*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ft*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Fv(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function Bv(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Gv(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lu),this.state=it.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Hv(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Un.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=it.DOLLY;break;case Un.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}break;case Un.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Io)}function zv(r){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function kv(r){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(r.preventDefault(),this.dispatchEvent(Io),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(lu))}function Vv(r){this.enabled!==!1&&this._handleKeyDown(r)}function Wv(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Pn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=it.TOUCH_ROTATE;break;case Pn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case Pn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=it.TOUCH_DOLLY_PAN;break;case Pn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Io)}function Xv(r){switch(this._trackPointer(r),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=it.NONE}}function Kv(r){this.enabled!==!1&&r.preventDefault()}function jv(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qv(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const lr=1,gr=3389500,Rn=1.008,ws=`
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`,Uo=`
  float cloudHash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(.11, .17, .23));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float cloudNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(cloudHash(i), cloudHash(i + vec3(1,0,0)), f.x),
          mix(cloudHash(i + vec3(0,1,0)), cloudHash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(cloudHash(i + vec3(0,0,1)), cloudHash(i + vec3(1,0,1)), f.x),
          mix(cloudHash(i + vec3(0,1,1)), cloudHash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float cloudField(vec3 worldPosition, float time, float amount) {
    vec3 p = normalize(worldPosition) * 5.4;
    float angle = time * 0.008;
    p.xz = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p.xz;
    float n = cloudNoise(p) * 0.52;
    n += cloudNoise(p * 2.07 + vec3(7.1, 2.3, -3.4)) * 0.30;
    n += cloudNoise(p * 4.61 + vec3(-11.7, 5.8, 9.2)) * 0.18;
    float coverage = smoothstep(0.67 - amount * 0.30, 0.82 - amount * 0.08, n);
    return coverage * smoothstep(0.0, 0.04, amount);
  }
  float shellProfile(float radius, float innerRadius, float outerRadius) {
    float h = clamp((radius - innerRadius) / max(outerRadius - innerRadius, 0.0001), 0.0, 1.0);
    return smoothstep(0.0, 0.16, h) * smoothstep(1.0, 0.58, h);
  }
  float raySphereExit(vec3 origin, vec3 direction, float radius) {
    float b = dot(origin, direction);
    float c = dot(origin, origin) - radius * radius;
    return -b + sqrt(max(b * b - c, 0.0));
  }
  vec2 raySphereRange(vec3 origin, vec3 direction, float radius) {
    float b = dot(origin, direction);
    float c = dot(origin, origin) - radius * radius;
    float h = b * b - c;
    if (h < 0.0) return vec2(1e5, -1e5);
    h = sqrt(h);
    return vec2(-b - h, -b + h);
  }
`,Yv=`
  attribute vec3 color;
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    vHeight = color.r;
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPositionW = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,$v=`
  precision highp float;
  uniform sampler2D uHeightMap;
  uniform sampler2D uMicroNormalMap;
  uniform float uMicroReady;
  uniform vec2 uTexelSize;
  uniform float uMinHeight;
  uniform float uMaxHeight;
  uniform float uExaggeration;
  uniform float uSeaLevel;
  uniform vec3 uSun;
  uniform int uMode;
  uniform float uTime;
  uniform float uCloudAmount;
  uniform float uCloudInner;
  uniform float uCloudOuter;
  uniform int uCloudShadowSteps;
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  varying float vHeight;
  varying vec2 vUv;
  const float PI = 3.141592653589793;
  ${Uo}

  float pow3(float x) { return x * x * x; }
  float pow4(float x) { float x2 = x * x; return x2 * x2; }
  float pow5(float x) { float x2 = x * x; return x2 * x2 * x; }

  vec3 heightRamp(float h) {
    vec3 low = vec3(0.08, 0.18, 0.38);
    vec3 mid = vec3(0.73, 0.55, 0.22);
    vec3 high = vec3(0.88, 0.88, 0.84);
    return h < 0.5 ? mix(low, mid, h * 2.0) : mix(mid, high, (h - 0.5) * 2.0);
  }

  void main() {
    vec3 terrainRay = normalize(vPositionW - cameraPosition);
    vec2 referenceRange = raySphereRange(cameraPosition, terrainRay, 1.0);
    vec3 referencePoint = referenceRange.x > 0.0
      ? cameraPosition + terrainRay * referenceRange.x
      : vPositionW;
    vec3 radial = normalize(uSeaLevel < uMinHeight ? vPositionW : referencePoint);
    vec2 heightUv = vec2(atan(radial.z, radial.x) / (2.0 * PI) + 0.5, 0.5 - asin(radial.y) / PI);
    float heightM = texture2D(uHeightMap, heightUv).r;
    if (uMode == 0 && heightM < uSeaLevel) discard;
    float hWest = texture2D(uHeightMap, heightUv - vec2(uTexelSize.x, 0.0)).r;
    float hEast = texture2D(uHeightMap, heightUv + vec2(uTexelSize.x, 0.0)).r;
    float hNorth = texture2D(uHeightMap, heightUv - vec2(0.0, uTexelSize.y)).r;
    float hSouth = texture2D(uHeightMap, heightUv + vec2(0.0, uTexelSize.y)).r;
    vec3 east = normalize(vec3(-radial.z, 0.0, radial.x) + vec3(1e-6, 0.0, 0.0));
    vec3 south = normalize(cross(radial, east));
    float eastDistance = max(2.0 * uTexelSize.x * 2.0 * PI * ${gr.toFixed(1)} * length(radial.xz), 200.0);
    float southDistance = 2.0 * uTexelSize.y * PI * ${gr.toFixed(1)};
    float slopeEast = (hEast - hWest) * uExaggeration / eastDistance;
    float slopeSouth = (hSouth - hNorth) * uExaggeration / southDistance;
    vec3 n = normalize(radial - east * slopeEast - south * slopeSouth);
    float slope = clamp(length(vec2(slopeEast, slopeSouth)), 0.0, 1.0);
    vec3 microMacro = texture2D(uMicroNormalMap, fract(heightUv * vec2(32.0, 16.0))).rgb;
    vec3 microFine = texture2D(uMicroNormalMap, fract(heightUv * vec2(104.0, 52.0) + vec2(0.37, 0.61))).rgb;
    vec2 microSlope = ((microMacro.xy * 2.0 - 1.0) * 0.65 + (microFine.xy * 2.0 - 1.0) * 0.35) * uMicroReady;
    float microCavity = mix(1.0, 0.78 + 0.42 * (microMacro.z * 0.6 + microFine.z * 0.4), uMicroReady);
    if (uMode == 0) {
      float detailWeight = (0.09 + 0.16 * smoothstep(0.05, 0.42, slope)) * smoothstep(0.96, 0.35, abs(radial.y));
      n = normalize(n - east * microSlope.x * detailWeight - south * microSlope.y * detailWeight);
    }
    vec3 sunDir = normalize(uSun);
    vec3 viewDir = normalize(cameraPosition - vPositionW);
    float light = max(dot(n, sunDir), 0.0);
    float rim = pow3(1.0 - max(dot(n, viewDir), 0.0));
    float normalizedHeight = clamp((heightM - uMinHeight) / max(uMaxHeight - uMinHeight, 1.0), 0.0, 1.0);
    float summitFrost = 0.0;
    vec3 base;
    if (uMode == 1) {
      base = mix(vec3(0.42), vec3(0.67), clamp(slope * 2.4, 0.0, 1.0));
    } else if (uMode == 3) {
      base = heightRamp(normalizedHeight);
    } else {
      vec3 basin = vec3(0.17, 0.065, 0.035);
      vec3 dust = vec3(0.48, 0.215, 0.105);
      vec3 upland = vec3(0.70, 0.39, 0.20);
      vec3 exposed = vec3(0.24, 0.15, 0.105);
      base = mix(basin, dust, smoothstep(0.14, 0.44, normalizedHeight));
      base = mix(base, upland, smoothstep(0.44, 0.82, normalizedHeight));
      base = mix(base, exposed, smoothstep(0.12, 0.48, slope));
      float regionalDust = cloudNoise(radial * 58.0);
      base *= (0.88 + regionalDust * 0.22) * microCavity;
      float basaltStreak = smoothstep(0.18, 0.54, slope) * smoothstep(0.66, 0.24, regionalDust);
      base = mix(base, vec3(0.11, 0.068, 0.052), basaltStreak * 0.26);
      float strataWave = 0.5 + 0.5 * sin(normalizedHeight * 112.0 + regionalDust * 4.5);
      float strataMask = smoothstep(0.16, 0.50, slope) * (1.0 - summitFrost);
      base = mix(base, vec3(0.58, 0.31, 0.17), strataWave * strataMask * 0.20);
      float clayDeposit = smoothstep(0.32, 0.08, normalizedHeight) * smoothstep(0.18, 0.03, slope) * smoothstep(0.42, 0.78, regionalDust);
      base = mix(base, vec3(0.54, 0.43, 0.31) * microCavity, clayDeposit * 0.22);
      float lavaLobe = smoothstep(0.60, 0.86, normalizedHeight) * smoothstep(0.06, 0.28, slope) * (0.5 + 0.5 * sin(regionalDust * 14.0 + normalizedHeight * 45.0));
      base = mix(base, vec3(0.28, 0.14, 0.09) * microCavity, lavaLobe * (1.0 - summitFrost) * 0.18);
      float phaseP = vUv.x * 136.0 + vUv.y * 104.0 - regionalDust * 5.0;
      float phaseM = vUv.x * 144.0 - vUv.y * 112.0 + regionalDust * 5.0;
      float sP = sin(phaseP), cP = cos(phaseP);
      float sM = sin(phaseM), cM = cos(phaseM);
      float dryFactor = 1.0 - summitFrost;
      float dry11 = dryFactor * 0.11;
      float dry12 = dryFactor * 0.12;
      float slopeMid = smoothstep(0.06, 0.28, slope);
      float slopeLow = 1.0 - slopeMid;
      float hLow = smoothstep(0.42, 0.14, normalizedHeight);
      float envLowMid = smoothstep(0.12, 0.44, normalizedHeight) * smoothstep(0.56, 0.24, normalizedHeight) * slopeMid;
      float envMid = smoothstep(0.16, 0.48, normalizedHeight) * smoothstep(0.60, 0.28, normalizedHeight) * slopeMid;
      float envUpperMid = smoothstep(0.20, 0.52, normalizedHeight) * smoothstep(0.64, 0.32, normalizedHeight) * slopeMid;
      float dustTrack = smoothstep(0.92, 0.995, abs(sM)) * slopeLow * dryFactor;
      base *= 1.0 - dustTrack * 0.14;
      float hematiteMask = hLow * slopeLow * smoothstep(0.55, 0.85, regionalDust);
      base = mix(base, vec3(0.24, 0.25, 0.28) * microCavity, hematiteMask * 0.16);
      float rslStreak = slopeMid * smoothstep(0.32, 0.78, light) * (0.5 + 0.5 * sP);
      base *= 1.0 - rslStreak * dry12;
      float invertedChannel = hLow * slopeLow * smoothstep(0.90, 0.99, abs(cP));
      base = mix(base, vec3(0.76, 0.50, 0.34) * microCavity, invertedChannel * dryFactor * 0.16);
      float tarCrest = hLow * slopeLow * pow4(0.5 + 0.5 * cM);
      base = mix(base, vec3(0.84, 0.62, 0.44), tarCrest * dryFactor * 0.14);
      float mudVolcano = hLow * slopeLow * smoothstep(0.68, 0.92, sP * cM);
      base = mix(base, vec3(0.68, 0.56, 0.43) * microCavity, mudVolcano * dryFactor * 0.15);
      float olivineBasalt = envUpperMid * (0.5 + 0.5 * cP);
      base = mix(base, vec3(0.32, 0.36, 0.31) * microCavity, olivineBasalt * dryFactor * 0.15);
      float sulfateBench = envMid * pow3(0.5 + 0.5 * sin(heightM * 0.0085 + regionalDust * 4.2));
      base = mix(base, vec3(0.86, 0.72, 0.52) * microCavity, sulfateBench * dryFactor * 0.14);
      float jarositeVein = envLowMid * pow5(0.5 + 0.5 * cM);
      base = mix(base, vec3(0.88, 0.68, 0.28) * microCavity, jarositeVein * dryFactor * 0.13);
      float nontroniteClay = envMid * slopeLow * (0.5 + 0.5 * sP);
      base = mix(base, vec3(0.68, 0.62, 0.44) * microCavity, nontroniteClay * dry12);
      float hematiteSpherule = envMid * slopeLow * (0.5 + 0.5 * cM);
      base = mix(base, vec3(0.32, 0.33, 0.36) * microCavity, hematiteSpherule * dryFactor * 0.14);
      float opalineSilica = envUpperMid * pow4(0.5 + 0.5 * sP);
      base = mix(base, vec3(0.92, 0.87, 0.78) * microCavity, opalineSilica * dryFactor * 0.13);
      float kieseriteLayer = envLowMid * pow3(0.5 + 0.5 * (cP * cM + sP * sM));
      base = mix(base, vec3(0.89, 0.81, 0.64) * microCavity, kieseriteLayer * dryFactor * 0.13);
      float magnesiteVein = envUpperMid * pow4(0.5 + 0.5 * sM);
      base = mix(base, vec3(0.88, 0.90, 0.85) * microCavity, magnesiteVein * dry12);
      float aluniteClay = envMid * pow4(0.5 + 0.5 * cP);
      base = mix(base, vec3(0.91, 0.84, 0.79) * microCavity, aluniteClay * dry12);
      float silicaSinter = envUpperMid * pow5(0.5 + 0.4 * sP + 0.3 * cP);
      base = mix(base, vec3(0.94, 0.91, 0.84) * microCavity, silicaSinter * dry12);
      float chloritePhyllo = envLowMid * pow3(0.5 + 0.5 * cM);
      base = mix(base, vec3(0.46, 0.56, 0.48) * microCavity, chloritePhyllo * dry12);
      float chlorideEvaporite = hLow * slopeLow * pow4(0.5 + 0.35 * sP - 0.35 * cP);
      base = mix(base, vec3(0.95, 0.92, 0.88) * microCavity, chlorideEvaporite * dry12);
      float gypsumOutcrop = envUpperMid * pow4(0.5 + 0.4 * cM - 0.3 * sM);
      base = mix(base, vec3(0.96, 0.94, 0.90) * microCavity, gypsumOutcrop * dry11);
      float saponiteSmectite = envMid * pow3(0.5 - 0.4 * sP + 0.3 * cP);
      base = mix(base, vec3(0.58, 0.64, 0.50) * microCavity, saponiteSmectite * dry12);
      float kaoliniteClay = envUpperMid * pow4(0.5 + 0.35 * cM + 0.35 * sM);
      base = mix(base, vec3(0.93, 0.89, 0.83) * microCavity, kaoliniteClay * dry11);
      float aluniteKieserite = envMid * pow4(0.5 + 0.5 * sP);
      base = mix(base, vec3(0.92, 0.85, 0.78) * microCavity, aluniteKieserite * dry11);
      float veraRubinHematite = envUpperMid * pow4(0.5 + 0.5 * cM);
      base = mix(base, vec3(0.64, 0.25, 0.19) * microCavity, veraRubinHematite * dry12);
      float seitahCarbonate = envLowMid * pow4(0.5 + 0.3 * sP + 0.4 * cP);
      base = mix(base, vec3(0.42, 0.54, 0.44) * microCavity, seitahCarbonate * dry12);
      float bassaniteVein = envMid * pow4(0.5 - 0.3 * sM + 0.4 * cM);
      base = mix(base, vec3(0.95, 0.93, 0.90) * microCavity, bassaniteVein * dry11);
      float oxiaVermiculite = envLowMid * pow4(0.5 + 0.5 * sM);
      base = mix(base, vec3(0.49, 0.58, 0.46) * microCavity, oxiaVermiculite * dry12);
      float noctisCopiapite = envUpperMid * pow4(0.5 + 0.5 * cP);
      base = mix(base, vec3(0.88, 0.72, 0.36) * microCavity, noctisCopiapite * dry11);
      float eridaniaTalcAlunite = envLowMid * pow4(0.5 + 0.4 * sP - 0.3 * cP);
      base = mix(base, vec3(0.76, 0.84, 0.74) * microCavity, eridaniaTalcAlunite * dry11);
      float antoniadiPrehnite = envUpperMid * pow4(0.5 + 0.5 * cM);
      base = mix(base, vec3(0.54, 0.68, 0.52) * microCavity, antoniadiPrehnite * dry11);
      float sirenumChlorideAlunite = envMid * pow4(0.5 + 0.4 * sM + 0.3 * cM);
      base = mix(base, vec3(0.92, 0.89, 0.84) * microCavity, sirenumChlorideAlunite * dry11);
      float homePlateSilica = envUpperMid * pow4(0.5 - 0.3 * sP + 0.4 * cP);
      base = mix(base, vec3(0.96, 0.94, 0.90) * microCavity, homePlateSilica * dry11);
      float mawrthKaoliniteNontronite = envMid * pow4(0.5 + 0.45 * sP + 0.22 * cP);
      base = mix(base, vec3(0.84, 0.78, 0.62) * microCavity, mawrthKaoliniteNontronite * dry11);
      float jezeroDeltaClinoform = envLowMid * pow4(0.5 + 0.42 * cP - 0.28 * sP);
      base = mix(base, vec3(0.56, 0.66, 0.54) * microCavity, jezeroDeltaClinoform * dry11);
      float niliTalcSerpentine = envMid * pow4(0.5 - 0.36 * cM + 0.34 * sM);
      base = mix(base, vec3(0.46, 0.62, 0.52) * microCavity, niliTalcSerpentine * dry11);
      float veraRubinGrayHematite = envUpperMid * pow4(0.5 + 0.38 * cP + 0.32 * sP);
      base = mix(base, vec3(0.58, 0.56, 0.62) * microCavity, veraRubinGrayHematite * dry11);
      float columbusGypsumAlunite = envLowMid * pow4(0.5 + 0.40 * cM - 0.30 * sM);
      base = mix(base, vec3(0.91, 0.87, 0.78) * microCavity, columbusGypsumAlunite * dry11);
      float oxiaVermiculiteFerrihydrite = envMid * pow4(0.5 - 0.34 * cP + 0.36 * sP);
      base = mix(base, vec3(0.68, 0.54, 0.42) * microCavity, oxiaVermiculiteFerrihydrite * dry11);
      float candorFerricHydroxysulfate = envUpperMid * pow4(0.5 + 0.36 * cM - 0.34 * sM);
      base = mix(base, vec3(0.85, 0.64, 0.34) * microCavity, candorFerricHydroxysulfate * dry11);
      float juventaeKieseriteStarkeyite = envMid * pow4(0.5 + 0.38 * cP - 0.32 * sP);
      base = mix(base, vec3(0.89, 0.83, 0.69) * microCavity, juventaeKieseriteStarkeyite * dry11);
      float iusRozeniteMelanterite = envLowMid * pow4(0.5 - 0.35 * cM + 0.35 * sM);
      base = mix(base, vec3(0.78, 0.84, 0.72) * microCavity, iusRozeniteMelanterite * dry11);
      float hebesAnhydriteBassanite = envUpperMid * pow4(0.5 + 0.37 * cP - 0.33 * sP);
      base = mix(base, vec3(0.94, 0.91, 0.86) * microCavity, hebesAnhydriteBassanite * dry11);
      float copratesPolyhydratedSulfate = envLowMid * pow4(0.5 + 0.36 * cM + 0.34 * sM);
      base = mix(base, vec3(0.86, 0.77, 0.63) * microCavity, copratesPolyhydratedSulfate * dry11);
      float echusOpalineJarosite = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sP);
      base = mix(base, vec3(0.92, 0.86, 0.70) * microCavity, echusOpalineJarosite * dry11);
      float gangesOlivineSulfate = envMid * pow4(0.5 + 0.35 * cM - 0.35 * sM);
      base = mix(base, vec3(0.48, 0.56, 0.44) * microCavity, gangesOlivineSulfate * dry11);
      float holdenSmectiteMegabreccia = envLowMid * pow4(0.5 - 0.36 * cM + 0.34 * sP);
      base = mix(base, vec3(0.76, 0.69, 0.56) * microCavity, holdenSmectiteMegabreccia * dry11);
      float niliKaoliniteCarbonate = envUpperMid * pow4(0.5 + 0.36 * cP - 0.34 * sM);
      base = mix(base, vec3(0.84, 0.88, 0.78) * microCavity, niliKaoliniteCarbonate * dry11);
      float columbusAluniteKaolinite = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.93, 0.89, 0.82) * microCavity, columbusAluniteKaolinite * dry11);
      float aramFerricHematite = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.82, 0.56, 0.38) * microCavity, aramFerricHematite * dry11);
      float aureumBandedSulfate = envUpperMid * pow4(0.5 - 0.35 * cM + 0.35 * sP);
      base = mix(base, vec3(0.89, 0.78, 0.58) * microCavity, aureumBandedSulfate * dry11);
      float tyrrhenaPyroclasticIgnimbrite = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sP);
      base = mix(base, vec3(0.79, 0.62, 0.49) * microCavity, tyrrhenaPyroclasticIgnimbrite * dry11);
      float galeHematiteSulfateTransition = envUpperMid * pow4(0.5 + 0.35 * cM - 0.35 * sM);
      base = mix(base, vec3(0.74, 0.48, 0.39) * microCavity, galeHematiteSulfateTransition * dry11);
      float noctisJarositeOpal = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.88, 0.75, 0.46) * microCavity, noctisJarositeOpal * dry11);
      float capriKieseriteGypsum = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.87, 0.81, 0.69) * microCavity, capriKieseriteGypsum * dry11);
      float eridaniaSaponiteTalc = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.66, 0.75, 0.64) * microCavity, eridaniaSaponiteTalc * dry11);
      float uzboiNontroniteChlorite = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.58, 0.65, 0.49) * microCavity, uzboiNontroniteChlorite * dry11);
      float melasSzomolnokiteRozenite = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.84, 0.67, 0.43) * microCavity, melasSzomolnokiteRozenite * dry11);
      float sirenumAluniteSinter = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.91, 0.85, 0.77) * microCavity, sirenumAluniteSinter * dry11);
      float juventaeKieseriteBeidellite = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.86, 0.79, 0.65) * microCavity, juventaeKieseriteBeidellite * dry11);
      float becquerelRhythmicSulfate = envUpperMid * pow4(0.5 + 0.35 * cM + 0.35 * sM);
      base = mix(base, vec3(0.89, 0.81, 0.67) * microCavity, becquerelRhythmicSulfate * dry11);
      float miyamotoHematiteSmectite = envLowMid * pow4(0.5 - 0.35 * cM - 0.35 * sM);
      base = mix(base, vec3(0.68, 0.56, 0.50) * microCavity, miyamotoHematiteSmectite * dry11);
      float claritasJarositeAlunite = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * sM);
      base = mix(base, vec3(0.87, 0.74, 0.52) * microCavity, claritasJarositeAlunite * dry11);
      float shalbatanaOpalineDiatomite = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.90, 0.86, 0.78) * microCavity, shalbatanaOpalineDiatomite * dry11);
      float paranaFerrihydriteKaolinite = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sP);
      base = mix(base, vec3(0.77, 0.54, 0.42) * microCavity, paranaFerrihydriteKaolinite * dry11);
      float daoZeoliteSmectite = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sP);
      base = mix(base, vec3(0.76, 0.72, 0.61) * microCavity, daoZeoliteSmectite * dry11);
      float libyaOlivineBeidellite = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * cM);
      base = mix(base, vec3(0.62, 0.71, 0.56) * microCavity, libyaOlivineBeidellite * dry11);
      float terbyNontroniteChamosite = envMid * pow4(0.5 - 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.58, 0.67, 0.53) * microCavity, terbyNontroniteChamosite * dry11);
      float antoniadiZeoliteIllite = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.84, 0.78, 0.66) * microCavity, antoniadiZeoliteIllite * dry11);
      float hypanisFerricSmectite = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.71, 0.59, 0.45) * microCavity, hypanisFerricSmectite * dry11);
      float endeavourShoemakerSmectite = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.55, 0.44) * microCavity, endeavourShoemakerSmectite * dry11);
      float electrisClinoptiloliteClay = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.82, 0.71, 0.56) * microCavity, electrisClinoptiloliteClay * dry11);
      float crossAluniteKaolinite = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.89, 0.83, 0.72) * microCavity, crossAluniteKaolinite * dry11);
      float vernalTravertineGoethite = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.79, 0.64, 0.43) * microCavity, vernalTravertineGoethite * dry11);
      float ladonChamositeSmectite = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sP);
      base = mix(base, vec3(0.60, 0.68, 0.54) * microCavity, ladonChamositeSmectite * dry11);
      float oxiaVermiculiteSmectite = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sP);
      base = mix(base, vec3(0.75, 0.62, 0.49) * microCavity, oxiaVermiculiteSmectite * dry11);
      float cerberusOlivinePyroxene = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cP);
      base = mix(base, vec3(0.48, 0.53, 0.46) * microCavity, cerberusOlivinePyroxene * dry11);
      float wirtzSmectiteChlorite = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cP);
      base = mix(base, vec3(0.59, 0.67, 0.55) * microCavity, wirtzSmectiteChlorite * dry11);
      float coracisAluniteKaolinite = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sP);
      base = mix(base, vec3(0.84, 0.74, 0.62) * microCavity, coracisAluniteKaolinite * dry11);
      float aromatumJarositeGoethite = envMid * pow4(0.5 - 0.35 * cM + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.65, 0.45) * microCavity, aromatumJarositeGoethite * dry11);
      float pollackEvaporitePlaya = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.86, 0.78, 0.66) * microCavity, pollackEvaporitePlaya * dry11);
      float pickeringClaySulfate = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sP);
      base = mix(base, vec3(0.68, 0.59, 0.51) * microCavity, pickeringClaySulfate * dry11);
      float proctorBarchanPlaya = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.68, 0.54, 0.40) * microCavity, proctorBarchanPlaya * dry11);
      float moravaSmectiteGypsum = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cP);
      base = mix(base, vec3(0.74, 0.72, 0.64) * microCavity, moravaSmectiteGypsum * dry11);
      float gorgonumChlorideEvaporite = envUpperMid * pow4(0.5 + 0.35 * cM - 0.35 * sM);
      base = mix(base, vec3(0.84, 0.77, 0.68) * microCavity, gorgonumChlorideEvaporite * dry11);
      float moreuxSmectiteOpal = envMid * pow4(0.5 - 0.35 * sM + 0.35 * cP);
      base = mix(base, vec3(0.68, 0.72, 0.64) * microCavity, moreuxSmectiteOpal * dry11);
      float niliPateraSilicaSinter = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.85, 0.78, 0.65) * microCavity, niliPateraSilicaSinter * dry11);
      float kaseiSaponiteHematite = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.71, 0.53, 0.39) * microCavity, kaseiSaponiteHematite * dry11);
      float ariadnesNontroniteSaponite = envMid * pow4(0.5 - 0.35 * cM + 0.35 * sP);
      base = mix(base, vec3(0.67, 0.63, 0.49) * microCavity, ariadnesNontroniteSaponite * dry11);
      float athabascaPalagoniteSmectite = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.79, 0.59, 0.43) * microCavity, athabascaPalagoniteSmectite * dry11);
      float eberswaldeSmectiteChamosite = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.62, 0.68, 0.54) * microCavity, eberswaldeSmectiteChamosite * dry11);
      float columbusBassaniteAlunite = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * cM);
      base = mix(base, vec3(0.84, 0.77, 0.68) * microCavity, columbusBassaniteAlunite * dry11);
      float glenTorridonNontroniteSiderite = envLowMid * pow4(0.5 - 0.35 * sM + 0.35 * cP);
      base = mix(base, vec3(0.64, 0.69, 0.56) * microCavity, glenTorridonNontroniteSiderite * dry11);
      float mawrthHalloysiteMontmorillonite = envMid * pow4(0.5 + 0.35 * sP - 0.35 * sM);
      base = mix(base, vec3(0.83, 0.78, 0.70) * microCavity, mawrthHalloysiteMontmorillonite * dry11);
      float jezeroCarbonateOlivineBench = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.65, 0.71, 0.58) * microCavity, jezeroCarbonateOlivineBench * dry11);
      float holdenAlluvialLtldTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.72, 0.61) * microCavity, holdenAlluvialLtldTerrace * dry11);
      float melasJarositeOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.85, 0.74, 0.52) * microCavity, melasJarositeOpalineTerrace * dry11);
      float crossMontmorilloniteSilicaBench = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.87, 0.80, 0.69) * microCavity, crossMontmorilloniteSilicaBench * dry11);
      float atlantisGlauconiteSerpentineBench = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.56, 0.67, 0.58) * microCavity, atlantisGlauconiteSerpentineBench * dry11);
      float candorKieseriteEpsomiteBench = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.84, 0.75, 0.63) * microCavity, candorKieseriteEpsomiteBench * dry11);
      float tithoniumKieseriteSzomolnokiteBench = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.81, 0.70, 0.55) * microCavity, tithoniumKieseriteSzomolnokiteBench * dry11);
      float mclaughlinSaponiteCarbonateBench = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.58, 0.68, 0.59) * microCavity, mclaughlinSaponiteCarbonateBench * dry11);
      float leightonCarbonateIlliteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.62) * microCavity, leightonCarbonateIlliteTerrace * dry11);
      float haleArgillaceousGullyTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.68, 0.72, 0.64) * microCavity, haleArgillaceousGullyTerrace * dry11);
      float hargravesMegabrecciaSaponite = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.60, 0.70, 0.62) * microCavity, hargravesMegabrecciaSaponite * dry11);
      float bakhuysenSmectiteCarbonateBench = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.64, 0.71, 0.58) * microCavity, bakhuysenSmectiteCarbonateBench * dry11);
      float tikhonravovSmectiteSilicaBench = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.69, 0.59) * microCavity, tikhonravovSmectiteSilicaBench * dry11);
      float cassiniSmectiteAlClayTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.73, 0.68, 0.60) * microCavity, cassiniSmectiteAlClayTerrace * dry11);
      float schroeterSmectiteBrecciaTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.62, 0.70, 0.57) * microCavity, schroeterSmectiteBrecciaTerrace * dry11);
      float rittmannUlmSmectiteSulfateBench = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.66, 0.54) * microCavity, rittmannUlmSmectiteSulfateBench * dry11);
      float flaugerguesSmectiteCarbonateBench = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.66, 0.72, 0.59) * microCavity, flaugerguesSmectiteCarbonateBench * dry11);
      float maraldiSirenumSmectiteSulfateTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.67, 0.56) * microCavity, maraldiSirenumSmectiteSulfateTerrace * dry11);
      float secchiHellasSmectiteGypsumTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.63) * microCavity, secchiHellasSmectiteGypsumTerrace * dry11);
      float wallaceHellasSmectiteFerrihydriteTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.63, 0.52) * microCavity, wallaceHellasSmectiteFerrihydriteTerrace * dry11);
      float darwinNoachisSmectiteChloriteTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.64, 0.71, 0.60) * microCavity, darwinNoachisSmectiteChloriteTerrace * dry11);
      float herschelCimmeriaSmectitePrehniteTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.62, 0.73, 0.64) * microCavity, herschelCimmeriaSmectitePrehniteTerrace * dry11);
      float huygensSabaeaSmectiteCarbonateTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.71, 0.59) * microCavity, huygensSabaeaSmectiteCarbonateTerrace * dry11);
      float millochauTyrrhenaSmectiteSilicaTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.70, 0.62) * microCavity, millochauTyrrhenaSmectiteSilicaTerrace * dry11);
      float campbellSirenumSmectiteChloriteTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.63, 0.72, 0.61) * microCavity, campbellSirenumSmectiteChloriteTerrace * dry11);
      float paranaLoireSmectiteKaoliniteTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.71, 0.62) * microCavity, paranaLoireSmectiteKaoliniteTerrace * dry11);
      float nanediXantheSmectiteCarbonateTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.71, 0.67, 0.56) * microCavity, nanediXantheSmectiteCarbonateTerrace * dry11);
      float oyamaMawrthNontroniteBeidelliteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.68, 0.72, 0.58) * microCavity, oyamaMawrthNontroniteBeidelliteTerrace * dry11);
      float wirtzSirenumSmectiteKaoliniteTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.70, 0.59) * microCavity, wirtzSirenumSmectiteKaoliniteTerrace * dry11);
      float miyamotoMeridianiSmectiteKaoliniteTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * sM);
      base = mix(base, vec3(0.73, 0.65, 0.55) * microCavity, miyamotoMeridianiSmectiteKaoliniteTerrace * dry11);
      float gusevColumbiaOpalineSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.73, 0.65) * microCavity, gusevColumbiaOpalineSmectiteTerrace * dry11);
      float holdenUzboiSmectiteMegabrecciaTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.74, 0.67, 0.57) * microCavity, holdenUzboiSmectiteMegabrecciaTerrace * dry11);
      float columbusSirenumAluniteKaoliniteRing = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.75, 0.67) * microCavity, columbusSirenumAluniteKaoliniteRing * dry11);
      float niliFossaeOlivineCarbonateSaponiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.68, 0.72, 0.59) * microCavity, niliFossaeOlivineCarbonateSaponiteTerrace * dry11);
      float eberswaldeXantheDeltaSmectiteChamositeTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.66, 0.70, 0.58) * microCavity, eberswaldeXantheDeltaSmectiteChamositeTerrace * dry11);
      float terbySabaeaClinoformSmectiteKaoliniteTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.71, 0.61) * microCavity, terbySabaeaClinoformSmectiteKaoliniteTerrace * dry11);
      float mclaughlinArabiaSaponiteMagnesiteSerpentineTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.65, 0.71, 0.60) * microCavity, mclaughlinArabiaSaponiteMagnesiteSerpentineTerrace * dry11);
      float melasChasmaSulfateKieseriteJarositeTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.69, 0.56) * microCavity, melasChasmaSulfateKieseriteJarositeTerrace * dry11);
      float candorJuventaeIldKieseriteSulfateHematiteTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.67, 0.58) * microCavity, candorJuventaeIldKieseriteSulfateHematiteTerrace * dry11);
      float noctisOudemansHydrothermalJarositeOpalSmectiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.72, 0.59) * microCavity, noctisOudemansHydrothermalJarositeOpalSmectiteTerrace * dry11);
      float eridaniaAriadnesSeafloorSaponiteTalcNontroniteTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.63, 0.70, 0.59) * microCavity, eridaniaAriadnesSeafloorSaponiteTalcNontroniteTerrace * dry11);
      float mawrthOyamaPedogenicHalloysiteAluniteFerrihydriteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.82, 0.77, 0.68) * microCavity, mawrthOyamaPedogenicHalloysiteAluniteFerrihydriteTerrace * dry11);
      float margaritiferUlmAlluvialChamositeSmectiteCarbonateTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.66, 0.72, 0.61) * microCavity, margaritiferUlmAlluvialChamositeSmectiteCarbonateTerrace * dry11);
      float sirenumCrossAluniteKaoliniteChloriteIlliteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.80, 0.76, 0.69) * microCavity, sirenumCrossAluniteKaoliniteChloriteIlliteTerrace * dry11);
      float cimmeriaGorgonumChlorideHaliteSmectiteEvaporiteTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.84, 0.79, 0.71) * microCavity, cimmeriaGorgonumChlorideHaliteSmectiteEvaporiteTerrace * dry11);
      float sabaeaAntoniadiAnalcimeClinoptiloliteZeoliteSmectiteTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.75, 0.67) * microCavity, sabaeaAntoniadiAnalcimeClinoptiloliteZeoliteSmectiteTerrace * dry11);
      float noachisPrehniteChloritePumpellyiteSmectiteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.64, 0.74, 0.65) * microCavity, noachisPrehniteChloritePumpellyiteSmectiteTerrace * dry11);
      float isidisLibyaBeidelliteNontroniteSaponiteCarbonateTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.69, 0.75, 0.63) * microCavity, isidisLibyaBeidelliteNontroniteSaponiteCarbonateTerrace * dry11);
      float oxiaPalusVermiculiteSmectiteOpalineDeltaTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.73, 0.68, 0.59) * microCavity, oxiaPalusVermiculiteSmectiteOpalineDeltaTerrace * dry11);
      float sirenumVernalSpringTravertineAragoniteSinterSmectiteTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.83, 0.78, 0.70) * microCavity, sirenumVernalSpringTravertineAragoniteSinterSmectiteTerrace * dry11);
      float syrtisNiliPateraOpalineSinterDaciteAmphiboleTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.68) * microCavity, syrtisNiliPateraOpalineSinterDaciteAmphiboleTerrace * dry11);
      float utopiaHephaestusScallopedThermokarstLaharSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.68, 0.72, 0.65) * microCavity, utopiaHephaestusScallopedThermokarstLaharSmectiteTerrace * dry11);
      float athabascaPlatyRaftRootlessPalagoniteSmectiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.62, 0.48) * microCavity, athabascaPlatyRaftRootlessPalagoniteSmectiteTerrace * dry11);
      float daoNigerPeriglacialLvfSmectiteSulfateTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.71, 0.63) * microCavity, daoNigerPeriglacialLvfSmectiteSulfateTerrace * dry11);
      float atlantisSimoisCaralisSaponiteTalcChloridePlayaTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.71, 0.77, 0.72) * microCavity, atlantisSimoisCaralisSaponiteTalcChloridePlayaTerrace * dry11);
      float meridianiMiyamotoYardangHematiteSpheruleSulfateTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.73, 0.65, 0.57) * microCavity, meridianiMiyamotoYardangHematiteSpheruleSulfateTerrace * dry11);
      float galeAeolisSideriteAnkeriteSmectiteSulfateTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.67, 0.55) * microCavity, galeAeolisSideriteAnkeriteSmectiteSulfateTerrace * dry11);
      float jezeroNeretvaMarginMagnesiteHydromagnesiteOlivineTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.70, 0.75, 0.67) * microCavity, jezeroNeretvaMarginMagnesiteHydromagnesiteOlivineTerrace * dry11);
      float gusevColumbiaHomePlateDigitateSilicaSulfateTephraTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.72, 0.61) * microCavity, gusevColumbiaHomePlateDigitateSilicaSulfateTephraTerrace * dry11);
      float holdenUzboiLadonCatastrophicFloodMegabrecciaSmectiteTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.68, 0.59) * microCavity, holdenUzboiLadonCatastrophicFloodMegabrecciaSmectiteTerrace * dry11);
      float columbusSirenumAluniteKaoliniteGypsumStrandlineTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.83, 0.78, 0.70) * microCavity, columbusSirenumAluniteKaoliniteGypsumStrandlineTerrace * dry11);
      float niliSyrtisHargravesSerpentiniteTalcMagnesiteOlivineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * sM);
      base = mix(base, vec3(0.68, 0.76, 0.69) * microCavity, niliSyrtisHargravesSerpentiniteTalcMagnesiteOlivineTerrace * dry11);
      float mawrthOyamaChryseKaoliniteBeidelliteNontroniteJarositeTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.71, 0.58) * microCavity, mawrthOyamaChryseKaoliniteBeidelliteNontroniteJarositeTerrace * dry11);
      float eberswaldeUzboiLadonMoravaPointBarScrollChamositeSmectiteTerrace = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.71, 0.75, 0.68) * microCavity, eberswaldeUzboiLadonMoravaPointBarScrollChamositeSmectiteTerrace * dry11);
      float terbyHellasReullClinoformProdeltaNontroniteKaoliniteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.63) * microCavity, terbyHellasReullClinoformProdeltaNontroniteKaoliniteTerrace * dry11);
      float mclaughlinArabiaOxiaSaponiteSerpentineMagnesiteSideriteTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.67, 0.74, 0.67) * microCavity, mclaughlinArabiaOxiaSaponiteSerpentineMagnesiteSideriteTerrace * dry11);
      float columbusSirenumAtlantisAluniteJarositeKaoliniteHexahydriteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.84, 0.78, 0.66) * microCavity, columbusSirenumAtlantisAluniteJarositeKaoliniteHexahydriteTerrace * dry11);
      float melasCandorJuventaeKieseriteSzomolnokiteRozeniteJarositeTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.81, 0.69, 0.56) * microCavity, melasCandorJuventaeKieseriteSzomolnokiteRozeniteJarositeTerrace * dry11);
      float noctisOudemansSyriaJarositeAluniteOpalineGypsumTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.83, 0.74, 0.59) * microCavity, noctisOudemansSyriaJarositeAluniteOpalineGypsumTerrace * dry11);
      float eridaniaAriadnesGorgonumSaponiteTalcCeladoniteChlorideTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.69, 0.77, 0.71) * microCavity, eridaniaAriadnesGorgonumSaponiteTalcCeladoniteChlorideTerrace * dry11);
      float margaritiferUzboiLadonMoravaChamositeIlliteSideriteSulfateTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.73, 0.69, 0.58) * microCavity, margaritiferUzboiLadonMoravaChamositeIlliteSideriteSulfateTerrace * dry11);
      float sabaeaAntoniadiHuygensAnalcimeClinoptiloliteIlliteCalciteTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.75, 0.67) * microCavity, sabaeaAntoniadiHuygensAnalcimeClinoptiloliteIlliteCalciteTerrace * dry11);
      float noachisDarwinCrossPrehniteChloritePumpellyiteKaoliniteTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.68, 0.75, 0.69) * microCavity, noachisDarwinCrossPrehniteChloritePumpellyiteKaoliniteTerrace * dry11);
      float isidisLibyaNiliBeidelliteNontroniteSaponiteHydromagnesiteTerrace = envMid * pow4(0.5 + 0.35 * sM - 0.35 * cP);
      base = mix(base, vec3(0.75, 0.77, 0.67) * microCavity, isidisLibyaNiliBeidelliteNontroniteSaponiteHydromagnesiteTerrace * dry11);
      float oxiaCoogoonChryseVermiculiteSaponiteOpalineFerrihydriteTerrace = envLowMid * pow4(0.5 - 0.35 * cM + 0.35 * sP);
      base = mix(base, vec3(0.78, 0.72, 0.61) * microCavity, oxiaCoogoonChryseVermiculiteSaponiteOpalineFerrihydriteTerrace * dry11);
      float sirenumVernalGorgonumTravertineAragoniteSinterSmectiteTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.84, 0.80, 0.72) * microCavity, sirenumVernalGorgonumTravertineAragoniteSinterSmectiteTerrace * dry11);
      float syrtisNiliMeroePateraOpalineSinterDaciteAmphiboleSmectiteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.86, 0.82, 0.75) * microCavity, syrtisNiliMeroePateraOpalineSinterDaciteAmphiboleSmectiteTerrace * dry11);
      float utopiaHephaestusElysiumScallopedThermokarstLaharSmectiteCarbonateTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.70, 0.76, 0.71) * microCavity, utopiaHephaestusElysiumScallopedThermokarstLaharSmectiteCarbonateTerrace * dry11);
      float elysiumAthabascaCerberusPlatyRaftRootlessPalagoniteSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.64, 0.51) * microCavity, elysiumAthabascaCerberusPlatyRaftRootlessPalagoniteSmectiteTerrace * dry11);
      float daoNigerHellasPeriglacialLvfChabaziteSmectiteGypsumTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.74, 0.72, 0.67) * microCavity, daoNigerHellasPeriglacialLvfChabaziteSmectiteGypsumTerrace * dry11);
      float noctisOudemansIusJarositeOpalinePolyhydratedSulfateOlivineTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.83, 0.77, 0.61) * microCavity, noctisOudemansIusJarositeOpalinePolyhydratedSulfateOlivineTerrace * dry11);
      float juventaeMajaBaetisKieseriteSzomolnokiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.84, 0.78, 0.65) * microCavity, juventaeMajaBaetisKieseriteSzomolnokiteGypsumOpalineTerrace * dry11);
      float copratesCapriEosKieseriteSzomolnokiteSulfateSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.79, 0.71, 0.59) * microCavity, copratesCapriEosKieseriteSzomolnokiteSulfateSmectiteTerrace * dry11);
      float gangesShalbatanaSimudKieseriteGypsumSmectiteOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.81, 0.75, 0.63) * microCavity, gangesShalbatanaSimudKieseriteGypsumSmectiteOpalineTerrace * dry11);
      float tithoniumHebesEchusKieseriteSzomolnokiteGypsumJarositeTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.85, 0.79, 0.64) * microCavity, tithoniumHebesEchusKieseriteSzomolnokiteGypsumJarositeTerrace * dry11);
      float aramIaniAureumChaosKieseriteGypsumHydroxysulfateHematiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.68, 0.56) * microCavity, aramIaniAureumChaosKieseriteGypsumHydroxysulfateHematiteTerrace * dry11);
      float iusMelasCandorKieseriteGypsumSmectiteJarositeOpalineTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.83, 0.77, 0.62) * microCavity, iusMelasCandorKieseriteGypsumSmectiteJarositeOpalineTerrace * dry11);
      float ophirCandorCetiMensaKieseriteSzomolnokiteHydroxysulfateHematiteTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.70, 0.57) * microCavity, ophirCandorCetiMensaKieseriteSzomolnokiteHydroxysulfateHematiteTerrace * dry11);
      float galeAeolisVeraRubinNontroniteHematiteAnhydriteJarositeTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.67, 0.55) * microCavity, galeAeolisVeraRubinNontroniteHematiteAnhydriteJarositeTerrace * dry11);
      float jezeroNeretvaMarginUnitOlivineCarbonateSmectiteSilicaTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.59) * microCavity, jezeroNeretvaMarginUnitOlivineCarbonateSmectiteSilicaTerrace * dry11);
      float mawrthOxiaPlanumNontroniteSaponiteMontmorilloniteKaoliniteSilicaTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.84, 0.78, 0.65) * microCavity, mawrthOxiaPlanumNontroniteSaponiteMontmorilloniteKaoliniteSilicaTerrace * dry11);
      float niliFossaeNeSyrtisOlivineMagnesiteSaponiteTalcSulfateTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.73, 0.60) * microCavity, niliFossaeNeSyrtisOlivineMagnesiteSaponiteTalcSulfateTerrace * dry11);
      float galeGlenTorridonMountSharpClaySulfateTransitionNontroniteHematiteTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.78, 0.69, 0.56) * microCavity, galeGlenTorridonMountSharpClaySulfateTransitionNontroniteHematiteTerrace * dry11);
      float gusevColumbiaHillsHomePlateComancheOpalineSinterCarbonateSulfateTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.86, 0.80, 0.67) * microCavity, gusevColumbiaHillsHomePlateComancheOpalineSinterCarbonateSulfateTerrace * dry11);
      float oxiaPlanumCoogoonVallisExomarsVermiculiteSmectiteOpalineDeltaTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.81, 0.74, 0.60) * microCavity, oxiaPlanumCoogoonVallisExomarsVermiculiteSmectiteOpalineDeltaTerrace * dry11);
      float eberswaldeHoldenClinoformDeltaSaponiteNontroniteMegabrecciaTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.58) * microCavity, eberswaldeHoldenClinoformDeltaSaponiteNontroniteMegabrecciaTerrace * dry11);
      float terbyNorthernHellasSublacustrineClinoformNontroniteKaoliniteMesaTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.83, 0.77, 0.64) * microCavity, terbyNorthernHellasSublacustrineClinoformNontroniteKaoliniteMesaTerrace * dry11);
      float mclaughlinWesternArabiaGroundwaterTurbiditeSerpentineSaponiteMagnesiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.73, 0.60) * microCavity, mclaughlinWesternArabiaGroundwaterTurbiditeSerpentineSaponiteMagnesiteTerrace * dry11);
      float galeGedizVallisStimsonMurrayUnconformityBoulderSilicaHaliteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.84, 0.78, 0.65) * microCavity, galeGedizVallisStimsonMurrayUnconformityBoulderSilicaHaliteTerrace * dry11);
      float columbusTerraSirenumBathtubRingAluniteKaoliniteGypsumBassaniteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.86, 0.81, 0.70) * microCavity, columbusTerraSirenumBathtubRingAluniteKaoliniteGypsumBassaniteTerrace * dry11);
      float eridaniaAriadnesAtlantisSeafloorSaponiteTalcGlauconiteChaosTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.72, 0.76, 0.63) * microCavity, eridaniaAriadnesAtlantisSeafloorSaponiteTalcGlauconiteChaosTerrace * dry11);
      float noctisLabyrinthusOudemansHydrothermalJarositeAluniteOpalineSinterTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.87, 0.79, 0.62) * microCavity, noctisLabyrinthusOudemansHydrothermalJarositeAluniteOpalineSinterTerrace * dry11);
      float margaritiferIaniAureumChaosHematiticKieseritePolyhydratedSulfateCaprockTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.81, 0.72, 0.60) * microCavity, margaritiferIaniAureumChaosHematiticKieseritePolyhydratedSulfateCaprockTerrace * dry11);
      float juventaeChasmaBaetisMensaMajaKieseriteSzomolnokiteStarkeyiteYardangTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.85, 0.78, 0.64) * microCavity, juventaeChasmaBaetisMensaMajaKieseriteSzomolnokiteStarkeyiteYardangTerrace * dry11);
      float westCandorChasmaCetiMensaCandorSulciKieseriteGypsumFerricOxideYardangTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.83, 0.68, 0.56) * microCavity, westCandorChasmaCetiMensaCandorSulciKieseriteGypsumFerricOxideYardangTerrace * dry11);
      float melasIusCopratesJunctionKieseriteJarositeGypsumMegaslideBenchTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.82, 0.75, 0.59) * microCavity, melasIusCopratesJunctionKieseriteJarositeGypsumMegaslideBenchTerrace * dry11);
      float ophirHebesChasmaCentralMoundKieseritePolyhydratedSulfateJarositeHematiteTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.80, 0.69, 0.58) * microCavity, ophirHebesChasmaCentralMoundKieseritePolyhydratedSulfateJarositeHematiteTerrace * dry11);
      float tithoniumEchusChasmaKieseriteSzomolnokiteGypsumSappingValleyPlateauTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.84, 0.77, 0.63) * microCavity, tithoniumEchusChasmaKieseriteSzomolnokiteGypsumSappingValleyPlateauTerrace * dry11);
      float gangesCapriEosChasmaKieseriteGypsumHematiteOlivineOutflowCataractTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.79, 0.73, 0.57) * microCavity, gangesCapriEosChasmaKieseriteGypsumHematiteOlivineOutflowCataractTerrace * dry11);
      float aramIaniAureumChaosKieseriteFerricHydroxysulfateHematiteDomeMesaTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.83, 0.71, 0.59) * microCavity, aramIaniAureumChaosKieseriteFerricHydroxysulfateHematiteDomeMesaTerrace * dry11);
      float shalbatanaHydraotesSimudTiuPaleolakeDeltaSmectiteChloriteOpalineChaosTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.74, 0.62) * microCavity, shalbatanaHydraotesSimudTiuPaleolakeDeltaSmectiteChloriteOpalineChaosTerrace * dry11);
      float kaseiSacraMensaLabeatisMegafloodCataractOlivineBasaltSmectiteSulfateTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.71, 0.58) * microCavity, kaseiSacraMensaLabeatisMegafloodCataractOlivineBasaltSmectiteSulfateTerrace * dry11);
      float aresMargaritiferHydaspisChaosOutflowTeardropOlivineGypsumSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.80, 0.75, 0.61) * microCavity, aresMargaritiferHydaspisChaosOutflowTeardropOlivineGypsumSmectiteTerrace * dry11);
      float majaXantheNanediPaleolakeSpilloverGorgeMeanderSmectiteSulfateTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.78, 0.73, 0.60) * microCavity, majaXantheNanediPaleolakeSpilloverGorgeMeanderSmectiteSulfateTerrace * dry11);
      float mangalaMemnoniaAbusDikeMegafloodCataractBraidedSmectitePyroxeneSulfateTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.71, 0.59) * microCavity, mangalaMemnoniaAbusDikeMegafloodCataractBraidedSmectitePyroxeneSulfateTerrace * dry11);
      float maadimGusevEridaniaSpillwayOverflowGorgeSmectiteOpalineCarbonateTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.79, 0.74, 0.62) * microCavity, maadimGusevEridaniaSpillwayOverflowGorgeSmectiteOpalineCarbonateTerrace * dry11);
      float cassiniScamanderMamersPaleolakeBreachGorgeSmectiteCarbonateSulfateTerrace = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.72, 0.60) * microCavity, cassiniScamanderMamersPaleolakeBreachGorgeSmectiteCarbonateSulfateTerrace * dry11);
      float uzboiLadonMoravaSpilloverGorgeScrollBenchChamositeSmectiteSulfateTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.59) * microCavity, uzboiLadonMoravaSpilloverGorgeScrollBenchChamositeSmectiteSulfateTerrace * dry11);
      float paranaLoireSamaraValleyOutletGorgeBraidedDeltaFerrihydriteKaoliniteSmectiteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.71, 0.58) * microCavity, paranaLoireSamaraValleyOutletGorgeBraidedDeltaFerrihydriteKaoliniteSmectiteTerrace * dry11);
      float daoNigerHarmakhisSappingHeadwallAlcoveLineatedChabaziteSmectiteGypsumTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.81, 0.75, 0.63) * microCavity, daoNigerHarmakhisSappingHeadwallAlcoveLineatedChabaziteSmectiteGypsumTerrace * dry11);
      float hradGalaxiasElysiumLaharMudflowLobeSaponiteJarositeOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.73, 0.60) * microCavity, hradGalaxiasElysiumLaharMudflowLobeSaponiteJarositeOpalineTerrace * dry11);
      float granicusTinjarHephaestusFissureLaharChannelSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.80, 0.75, 0.63) * microCavity, granicusTinjarHephaestusFissureLaharChannelSmectiteGypsumOpalineTerrace * dry11);
      float athabascaCerberusMarteFissureFloodPlatyRaftRootlessPalagoniteSmectiteTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.71, 0.59) * microCavity, athabascaCerberusMarteFissureFloodPlatyRaftRootlessPalagoniteSmectiteTerrace * dry11);
      float grjotaRahwayZephyriaFissureFloodPlatyRaftPhreaticOlivinePyroxeneSmectiteTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.72, 0.58) * microCavity, grjotaRahwayZephyriaFissureFloodPlatyRaftPhreaticOlivinePyroxeneSmectiteTerrace * dry11);
      float letheAthabascaElysiumSpilloverCataractPolygonalLavaSaponiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.74, 0.62) * microCavity, letheAthabascaElysiumSpilloverCataractPolygonalLavaSaponiteGypsumOpalineTerrace * dry11);
      float marteAmazonisPettitInflationPlateauLavaScouredPalagoniteOlivineSulfateTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.59) * microCavity, marteAmazonisPettitInflationPlateauLavaScouredPalagoniteOlivineSulfateTerrace * dry11);
      float arcadiaPhlegraErebusLobateApronExpandedCraterSmectiteGypsumTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.80, 0.76, 0.65) * microCavity, arcadiaPhlegraErebusLobateApronExpandedCraterSmectiteGypsumTerrace * dry11);
      float utopiaCasiusAdamasGiantPolygonTroughPingoSaponiteCarbonateGypsumTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.74, 0.63) * microCavity, utopiaCasiusAdamasGiantPolygonTroughPingoSaponiteCarbonateGypsumTerrace * dry11);
      float acidaliaChryseCydoniaMudVolcanoConeThumbprintMoraineSmectiteFerrihydriteSulfateTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.78, 0.72, 0.60) * microCavity, acidaliaChryseCydoniaMudVolcanoConeThumbprintMoraineSmectiteFerrihydriteSulfateTerrace * dry11);
      float isidisArenaDeuteronilusThumbprintMorainePittedConeSaponiteMagnesiteOlivineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.73, 0.60) * microCavity, isidisArenaDeuteronilusThumbprintMorainePittedConeSaponiteMagnesiteOlivineTerrace * dry11);
      float protonilusColoeIsmeniusFrettedGlacialTroughConcentricFillSmectiteChloriteGoethiteTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.71, 0.58) * microCavity, protonilusColoeIsmeniusFrettedGlacialTroughConcentricFillSmectiteChloriteGoethiteTerrace * dry11);
      float nilosyrtisMamersMoreuxGlacialPiedmontMoraineScallopedSaponiteNontroniteCarbonateTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.73, 0.61) * microCavity, nilosyrtisMamersMoreuxGlacialPiedmontMoraineScallopedSaponiteNontroniteCarbonateTerrace * dry11);
      float prometheiReullGregLobateApronGlacialMoraineGulliedAlcoveSmectiteGypsumChloriteTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.75, 0.64) * microCavity, prometheiReullGregLobateApronGlacialMoraineGulliedAlcoveSmectiteGypsumChloriteTerrace * dry11);
      float euripusHoltEasternHellasLobateApronSublimationMoraineSaponiteTalcGypsumTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.78, 0.67) * microCavity, euripusHoltEasternHellasLobateApronSublimationMoraineSaponiteTalcGypsumTerrace * dry11);
      float ausoniaMaleaWesternHellasGlaciolacustrineStrandlineEskerSmectiteChamositeGypsumTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.72, 0.75, 0.64) * microCavity, ausoniaMaleaWesternHellasGlaciolacustrineStrandlineEskerSmectiteChamositeGypsumTerrace * dry11);
      float argyreCharitumGalleGlaciolacustrineEskerKameSmectiteChloriteGypsumTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.76, 0.66) * microCavity, argyreCharitumGalleGlaciolacustrineEskerKameSmectiteChloriteGypsumTerrace * dry11);
      float nereidumHookeNorthernArgyreGlacialTroughMoraineGullySaponiteIlliteGypsumTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.75, 0.65) * microCavity, nereidumHookeNorthernArgyreGlacialTroughMoraineGullySaponiteIlliteGypsumTerrace * dry11);
      float olympiaChasmaBorealePlanumBoreumGypsumBarchanoidDuneBasalTroughSmectiteGypsumPerchlorateTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.81, 0.78, 0.70) * microCavity, olympiaChasmaBorealePlanumBoreumGypsumBarchanoidDuneBasalTroughSmectiteGypsumPerchlorateTerrace * dry11);
      float planumChasmaAustralePrometheiLingulaSpiralTroughAraneiformSmectiteJarositeGypsumTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.80, 0.75, 0.66) * microCavity, planumChasmaAustralePrometheiLingulaSpiralTroughAraneiformSmectiteJarositeGypsumTerrace * dry11);
      float maleaPityusaAmphitritesPateraCalderaGrabenPyroclasticSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.78, 0.74, 0.64) * microCavity, maleaPityusaAmphitritesPateraCalderaGrabenPyroclasticSmectiteGypsumOpalineTerrace * dry11);
      float hadriacusAusoniaCavusDaoHeadwallIgnimbriteGullySappingAlcoveSmectiteZeoliteGypsumTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.73, 0.65) * microCavity, hadriacusAusoniaCavusDaoHeadwallIgnimbriteGullySappingAlcoveSmectiteZeoliteGypsumTerrace * dry11);
      float tyrrhenusHesperiaLicusRingGrabenRilleWrinkleRidgeSmectiteOpalChloriteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.76, 0.65) * microCavity, tyrrhenusHesperiaLicusRingGrabenRilleWrinkleRidgeSmectiteOpalChloriteTerrace * dry11);
      float syrtisNiliMeroeCalderaDaciteConeOpalineSinterSmectiteSerpentineCarbonateTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.75, 0.66) * microCavity, syrtisNiliMeroeCalderaDaciteConeOpalineSinterSmectiteSerpentineCarbonateTerrace * dry11);
      float apollinarisMonsChaosGusevRimLaharFanApronSmectiteKaoliniteSulfateTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.72, 0.62) * microCavity, apollinarisMonsChaosGusevRimLaharFanApronSmectiteKaoliniteSulfateTerrace * dry11);
      float elysiumHecatesAlborTholusRadialFossaLaharSaponiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.76, 0.66) * microCavity, elysiumHecatesAlborTholusRadialFossaLaharSaponiteGypsumOpalineTerrace * dry11);
      float olympusLycusSulciBasalScarpAureoleTorevaMegaslideSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.75, 0.67) * microCavity, olympusLycusSulciBasalScarpAureoleTorevaMegaslideSmectiteGypsumOpalineTerrace * dry11);
      float arsiaPavonisAscraeusTharsisMontesFanGlacialDropMoraineSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.65) * microCavity, arsiaPavonisAscraeusTharsisMontesFanGlacialDropMoraineSmectiteGypsumOpalineTerrace * dry11);
      float albaMonsAlbaCerauniusFossaeRingGrabenPitCatenaSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, albaMonsAlbaCerauniusFossaeRingGrabenPitCatenaSmectiteGypsumOpalineTerrace * dry11);
      float tharsisCerauniusTholusUraniusPateraLavaTubeRilleSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.71, 0.63) * microCavity, tharsisCerauniusTholusUraniusPateraLavaTubeRilleSmectiteGypsumOpalineTerrace * dry11);
      float biblisUlyssesJovisTholusFortunaFossaeCalderaRingScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.73, 0.64) * microCavity, biblisUlyssesJovisTholusFortunaFossaeCalderaRingScarpSmectiteGypsumOpalineTerrace * dry11);
      float syriaSolisSinaiThaumasiaPlanumLowShieldWrinkleRidgeSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, syriaSolisSinaiThaumasiaPlanumLowShieldWrinkleRidgeSmectiteGypsumOpalineTerrace * dry11);
      float daedaliaPlanumClaritasSirenumMemnoniaFossaeGrabenScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.74, 0.65) * microCavity, daedaliaPlanumClaritasSirenumMemnoniaFossaeGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float tempeTerraMareotisTantalusLabeatisFossaeHorstGrabenSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.72, 0.65) * microCavity, tempeTerraMareotisTantalusLabeatisFossaeHorstGrabenSmectiteGypsumOpalineTerrace * dry11);
      float noctisLabyrinthusSyriaClaritasThaumasiaFossaePitChasmaSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.63) * microCavity, noctisLabyrinthusSyriaClaritasThaumasiaFossaePitChasmaSmectiteGypsumOpalineTerrace * dry11);
      float labeatisMonsTempeAscurisMareotisFossaeLowShieldGrabenSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.65) * microCavity, labeatisMonsTempeAscurisMareotisFossaeLowShieldGrabenSmectiteGypsumOpalineTerrace * dry11);
      float olympusRupesSulciGordiiAcheronFossaeCyaneSulciAureoleRidgeSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, olympusRupesSulciGordiiAcheronFossaeCyaneSulciAureoleRidgeSmectiteGypsumOpalineTerrace * dry11);
      float gordiiDorsumMedusaeFossaeZephyriaLucusPlanumIgnimbriteYardangSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.63) * microCavity, gordiiDorsumMedusaeFossaeZephyriaLucusPlanumIgnimbriteYardangSmectiteGypsumOpalineTerrace * dry11);
      float eumenidesDorsumAmazonisMensaMedusaeGordiiFossaePyroclasticYardangSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.74, 0.65) * microCavity, eumenidesDorsumAmazonisMensaMedusaeGordiiFossaePyroclasticYardangSmectiteGypsumOpalineTerrace * dry11);
      float aeolisPlanumZephyriaMensaeApollinarisSulciMedusaeFossaeIgnimbriteSinuositySmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.72, 0.65) * microCavity, aeolisPlanumZephyriaMensaeApollinarisSulciMedusaeFossaeIgnimbriteSinuositySmectiteGypsumOpalineTerrace * dry11);
      float memnoniaSulciSirenumMangalaFossaeElectrisMensaeDikeGrabenYardangSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.63) * microCavity, memnoniaSulciSirenumMangalaFossaeElectrisMensaeDikeGrabenYardangSmectiteGypsumOpalineTerrace * dry11);
      float claritasRupesSolisDorsumSinaiFossaeOgygisRupesWrinkleScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, claritasRupesSolisDorsumSinaiFossaeOgygisRupesWrinkleScarpSmectiteGypsumOpalineTerrace * dry11);
      float bosporosRupesOgygisThaumasiaPlanumNereidumMontesThrustRampartSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, bosporosRupesOgygisThaumasiaPlanumNereidumMontesThrustRampartSmectiteGypsumOpalineTerrace * dry11);
      float phrixiRupesArgyreRimCharitumMontesSuriusVallisBasementScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, phrixiRupesArgyreRimCharitumMontesSuriusVallisBasementScarpSmectiteGypsumOpalineTerrace * dry11);
      float chalcoporosRupesPrometheiTerraReullVallisHellasRimThrustScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.63) * microCavity, chalcoporosRupesPrometheiTerraReullVallisHellasRimThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float amenthesRupesNepenthesAeolisMensaeCimmeriaMarginThrustScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, amenthesRupesNepenthesAeolisMensaeCimmeriaMarginThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float scyllaCharybdisScopulusHesperiaPlanumHellasRimThrustScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, scyllaCharybdisScopulusHesperiaPlanumHellasRimThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float oenotriaTartarusScopulusElysiumRiseCimmeriaMarginThrustScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, oenotriaTartarusScopulusElysiumRiseCimmeriaMarginThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float eridaniaElectrisMonsSirenumFossaeCimmeriaHighlandThrustScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.63) * microCavity, eridaniaElectrisMonsSirenumFossaeCimmeriaHighlandThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float coronaeAustraleScopulusPrometheiTerraPolarMarginThrustScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, coronaeAustraleScopulusPrometheiTerraPolarMarginThrustScarpSmectiteGypsumOpalineTerrace * dry11);
      float abalosGeminiScopuliPlanumBoreumChasmaBorealePolarScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, abalosGeminiScopuliPlanumBoreumChasmaBorealePolarScarpSmectiteGypsumOpalineTerrace * dry11);
      float borealesScopuliHyperboreaeOlympiaUndaeVastitasBorealisPolarScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, borealesScopuliHyperboreaeOlympiaUndaeVastitasBorealisPolarScarpSmectiteGypsumOpalineTerrace * dry11);
      float cerauniusFossaeTractusCatenaUraniusFossaeTharsisRiftGrabenScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.63) * microCavity, cerauniusFossaeTractusCatenaUraniusFossaeTharsisRiftGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float sacraFossaeNilusMensaeLabeatisFossaeKaseiHeadwaterGrabenScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, sacraFossaeNilusMensaeLabeatisFossaeKaseiHeadwaterGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float echusFossaeMelasFossaeOphirPlanumVallesMarinerisRimGrabenScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.73, 0.64) * microCavity, echusFossaeMelasFossaeOphirPlanumVallesMarinerisRimGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float nectarisFossaeThaumasiaFossaeCopratesMontesVallesMarinerisRimGrabenScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, nectarisFossaeThaumasiaFossaeCopratesMontesVallesMarinerisRimGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float icariaFossaeAustraleSulciPrometheiPlanumSirenumAoniaGrabenScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.72, 0.61) * microCavity, icariaFossaeAustraleSulciPrometheiPlanumSirenumAoniaGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float fortunaFossaeUlyssesBiblisFossaeWesternTharsisGrabenScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, fortunaFossaeUlyssesBiblisFossaeWesternTharsisGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float aoniaTerraSirenumFossaePhrixiRupesSouthernHighlandGrabenScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.71, 0.62) * microCavity, aoniaTerraSirenumFossaePhrixiRupesSouthernHighlandGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float memnoniaFossaeMangalaFossaeDaedaliaPlanumTharsisDikeGrabenScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.72, 0.63) * microCavity, memnoniaFossaeMangalaFossaeDaedaliaPlanumTharsisDikeGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float claritasFossaeThaumasiaPlanumCoracisFossaeSouthernTharsisGrabenScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.79, 0.73, 0.62) * microCavity, claritasFossaeThaumasiaPlanumCoracisFossaeSouthernTharsisGrabenScarpSmectiteGypsumOpalineTerrace * dry11);
      float sabaeaTerraFlammarionCraterMarthCraterNorthernArabiaHighlandCraterScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.65) * microCavity, sabaeaTerraFlammarionCraterMarthCraterNorthernArabiaHighlandCraterScarpSmectiteGypsumOpalineTerrace * dry11);
      float tyrrhenaTerraLibyaMontesIsidisRimSouthernSyrtisHighlandScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, tyrrhenaTerraLibyaMontesIsidisRimSouthernSyrtisHighlandScarpSmectiteGypsumOpalineTerrace * dry11);
      float terraCimmeriaAriadnesCollesEridaniaBasinElectrisHighlandScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.71, 0.63) * microCavity, terraCimmeriaAriadnesCollesEridaniaBasinElectrisHighlandScarpSmectiteGypsumOpalineTerrace * dry11);
      float noachisTerraHellespontusMontesKaiserRabeCraterHellasWesternRimScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.72, 0.62) * microCavity, noachisTerraHellespontusMontesKaiserRabeCraterHellasWesternRimScarpSmectiteGypsumOpalineTerrace * dry11);
      float prometheiTerraReullVallisMorpheosRupesEasternHellasRimScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.71, 0.64) * microCavity, prometheiTerraReullVallisMorpheosRupesEasternHellasRimScarpSmectiteGypsumOpalineTerrace * dry11);
      float margaritiferTerraLadonBasinMoravaVallesAureumChaosScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.71, 0.62) * microCavity, margaritiferTerraLadonBasinMoravaVallesAureumChaosScarpSmectiteGypsumOpalineTerrace * dry11);
      float xantheTerraShalbatanaVallisOrsonWellesCraterSimudVallesScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.64) * microCavity, xantheTerraShalbatanaVallisOrsonWellesCraterSimudVallesScarpSmectiteGypsumOpalineTerrace * dry11);
      float tempeTerraKaseiVallesSharonovCraterEchusChasmaScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.72, 0.63) * microCavity, tempeTerraKaseiVallesSharonovCraterEchusChasmaScarpSmectiteGypsumOpalineTerrace * dry11);
      float acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.71, 0.62) * microCavity, acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpSmectiteGypsumOpalineTerrace * dry11);
      float chrysePlanitiaAresVallisTiuVallesPathfinderScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.78, 0.72, 0.63) * microCavity, chrysePlanitiaAresVallisTiuVallesPathfinderScarpSmectiteGypsumOpalineTerrace * dry11);
      float solisPlanumSyriaPlanumThaumasiaFossaeSinaiPlanumScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.71, 0.63) * microCavity, solisPlanumSyriaPlanumThaumasiaFossaeSinaiPlanumScarpSmectiteGypsumOpalineTerrace * dry11);
      float daedaliaPlanumArsiaSulciSirenumFossaeMemnoniaScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.63) * microCavity, daedaliaPlanumArsiaSulciSirenumFossaeMemnoniaScarpSmectiteGypsumOpalineTerrace * dry11);
      float utopiaPlanitiaHephaestusFossaeAdamasLabyrinthusCasiusScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.72, 0.64) * microCavity, utopiaPlanitiaHephaestusFossaeAdamasLabyrinthusCasiusScarpSmectiteGypsumOpalineTerrace * dry11);
      float elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.62) * microCavity, elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpSmectiteGypsumOpalineTerrace * dry11);
      float amazonisPlanitiaMedusaeFossaeGordiiDorsumNicholsonCraterScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, amazonisPlanitiaMedusaeFossaeGordiiDorsumNicholsonCraterScarpSmectiteGypsumOpalineTerrace * dry11);
      float arcadiaPlanitiaPhlegraMontesErebusMontesMilankovicCraterScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.72, 0.63) * microCavity, arcadiaPlanitiaPhlegraMontesErebusMontesMilankovicCraterScarpSmectiteGypsumOpalineTerrace * dry11);
      float hadriacusMonsDaoVallisNigerVallisHellasRimScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.69, 0.56) * microCavity, hadriacusMonsDaoVallisNigerVallisHellasRimScarpSmectiteGypsumOpalineTerrace * dry11);
      float syrtisMajorNiliPateraMeroePateraAntoniadiCraterScarpSmectiteGypsumOpalineTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.72, 0.64) * microCavity, syrtisMajorNiliPateraMeroePateraAntoniadiCraterScarpSmectiteGypsumOpalineTerrace * dry11);
      float hesperiaPlanumTyrrhenusMonsLicusVallisGaleCraterScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.70, 0.59) * microCavity, hesperiaPlanumTyrrhenusMonsLicusVallisGaleCraterScarpSmectiteGypsumOpalineTerrace * dry11);
      float maleaPlanumPityusaPateraAmphitritesPateraSisyphiMontesScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.71, 0.62) * microCavity, maleaPlanumPityusaPateraAmphitritesPateraSisyphiMontesScarpSmectiteGypsumOpalineTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisDaoVallisScarpSmectiteGypsumOpalineTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.72, 0.61) * microCavity, prometheiTerraReullVallisHarmakhisVallisDaoVallisScarpSmectiteGypsumOpalineTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpSmectiteGypsumOpalineTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.71, 0.64) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpSmectiteGypsumOpalineTerrace * dry11);
      float sirenumFossaeMemnoniaFossaeGorgonumChaosAtlantisChaosScarpSmectiteChlorideOpalineTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.72, 0.63) * microCavity, sirenumFossaeMemnoniaFossaeGorgonumChaosAtlantisChaosScarpSmectiteChlorideOpalineTerrace * dry11);
      float niliFossaeIsidisPlanitiaJezeroCraterHargravesCraterScarpOlivineCarbonateSaponiteTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.61) * microCavity, niliFossaeIsidisPlanitiaJezeroCraterHargravesCraterScarpOlivineCarbonateSaponiteTerrace * dry11);
      float mawrthVallisOyamaCraterChrysePlanitiaAcidaliaPlanitiaScarpNontroniteKaoliniteJarositeTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.71, 0.62) * microCavity, mawrthVallisOyamaCraterChrysePlanitiaAcidaliaPlanitiaScarpNontroniteKaoliniteJarositeTerrace * dry11);
      float vallesMarinerisCandorChasmaMelasChasmaOphirChasmaScarpKieseriteHematiteJarositeTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.71, 0.60) * microCavity, vallesMarinerisCandorChasmaMelasChasmaOphirChasmaScarpKieseriteHematiteJarositeTerrace * dry11);
      float galeCraterAeolisMonsVeraRubinRidgeGlenTorridonScarpNontroniteHematiteSideriteTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.67, 0.59) * microCavity, galeCraterAeolisMonsVeraRubinRidgeGlenTorridonScarpNontroniteHematiteSideriteTerrace * dry11);
      float holdenCraterEberswaldeCraterUzboiVallisLadonBasinScarpSaponiteNontroniteChamositeTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.73, 0.69, 0.60) * microCavity, holdenCraterEberswaldeCraterUzboiVallisLadonBasinScarpSaponiteNontroniteChamositeTerrace * dry11);
      float columbusCraterCrossCraterTerraSirenumGorgonumChaosScarpAluniteKaoliniteGypsumTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.74, 0.66) * microCavity, columbusCraterCrossCraterTerraSirenumGorgonumChaosScarpAluniteKaoliniteGypsumTerrace * dry11);
      float syrtisMajorNiliPateraMeroePateraAntoniadiCraterScarpOpalineSilicaZeoliteIlliteTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.67, 0.72, 0.65) * microCavity, syrtisMajorNiliPateraMeroePateraAntoniadiCraterScarpOpalineSilicaZeoliteIlliteTerrace * dry11);
      float hellasPlanitiaTerbyCraterDaoVallisReullVallisScarpNontroniteChamositeSmectiteTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.66, 0.71, 0.62) * microCavity, hellasPlanitiaTerbyCraterDaoVallisReullVallisScarpNontroniteChamositeSmectiteTerrace * dry11);
      float noachisTerraDarwinCraterHuygensCraterBakhuysenCraterScarpPrehniteChloritePumpellyiteTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.64, 0.70, 0.65) * microCavity, noachisTerraDarwinCraterHuygensCraterBakhuysenCraterScarpPrehniteChloritePumpellyiteTerrace * dry11);
      float arabiaTerraMcLaughlinCraterOxiaPlanumCoogoonVallesScarpSerpentineSaponiteMagnesiteVermiculiteTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.65, 0.71, 0.64) * microCavity, arabiaTerraMcLaughlinCraterOxiaPlanumCoogoonVallesScarpSerpentineSaponiteMagnesiteVermiculiteTerrace * dry11);
      float terraCimmeriaAriadnesCollesAtlantisChaosEridaniaBasinScarpGlauconiteNontroniteSaponiteTalcTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.62, 0.69, 0.65) * microCavity, terraCimmeriaAriadnesCollesAtlantisChaosEridaniaBasinScarpGlauconiteNontroniteSaponiteTalcTerrace * dry11);
      float noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpMontmorilloniteKaoliniteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.72, 0.66) * microCavity, noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpMontmorilloniteKaoliniteGypsumOpalTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpNontroniteChloriteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.66, 0.72, 0.65) * microCavity, prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpNontroniteChloriteGypsumOpalTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpChamositeChloriteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.65, 0.71, 0.64) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpChamositeChloriteGypsumOpalTerrace * dry11);
      float terraSirenumAtlantisChaosGorgonumChaosSimoisCollesScarpIlliteSmectiteChlorideOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.65) * microCavity, terraSirenumAtlantisChaosGorgonumChaosSimoisCollesScarpIlliteSmectiteChlorideOpalTerrace * dry11);
      float margaritiferTerraUzboiVallisLadonBasinMoravaVallesScarpChamositeSmectiteSideriteGypsumTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.68, 0.72, 0.63) * microCavity, margaritiferTerraUzboiVallisLadonBasinMoravaVallesScarpChamositeSmectiteSideriteGypsumTerrace * dry11);
      float xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpNontroniteChloriteSideriteGypsumTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.67, 0.72, 0.64) * microCavity, xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpNontroniteChloriteSideriteGypsumTerrace * dry11);
      float tempeTerraKaseiVallesSacraFossaeSharonovCraterScarpSaponiteOlivineGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.66, 0.71, 0.63) * microCavity, tempeTerraKaseiVallesSacraFossaeSharonovCraterScarpSaponiteOlivineGypsumOpalTerrace * dry11);
      float acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpFerrihydriteSmectiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.73, 0.69, 0.62) * microCavity, acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpFerrihydriteSmectiteGypsumOpalTerrace * dry11);
      float utopiaPlanitiaMieCraterMieFossaeHephaestusFossaeScarpMontmorilloniteSmectiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.72, 0.68) * microCavity, utopiaPlanitiaMieCraterMieFossaeHephaestusFossaeScarpMontmorilloniteSmectiteGypsumOpalTerrace * dry11);
      float elysiumPlanitiaZunilCraterCerberusFossaeAthabascaVallesScarpJarositeSmectiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.71, 0.59) * microCavity, elysiumPlanitiaZunilCraterCerberusFossaeAthabascaVallesScarpJarositeSmectiteGypsumOpalTerrace * dry11);
      float arcadiaPlanitiaErebusMontesPhlegraMontesMilankovicCraterScarpNontroniteSmectiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.73, 0.75, 0.70) * microCavity, arcadiaPlanitiaErebusMontesPhlegraMontesMilankovicCraterScarpNontroniteSmectiteGypsumOpalTerrace * dry11);
      float amazonisPlanitiaMedusaeFossaeNicholsonCraterPettitCraterScarpIlliteSmectiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.72, 0.65) * microCavity, amazonisPlanitiaMedusaeFossaeNicholsonCraterPettitCraterScarpIlliteSmectiteGypsumOpalTerrace * dry11);
      float tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpSaponiteSmectiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.70, 0.63) * microCavity, tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpSaponiteSmectiteGypsumOpalTerrace * dry11);
      float albaMonsTantalusFossaeCerauniusFossaeUraniusMonsScarpNontroniteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.73, 0.67) * microCavity, albaMonsTantalusFossaeCerauniusFossaeUraniusMonsScarpNontroniteSaponiteGypsumOpalTerrace * dry11);
      float solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpMontmorilloniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.71, 0.63) * microCavity, solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpMontmorilloniteSaponiteGypsumOpalTerrace * dry11);
      float lunaePlanumOphirPlanumEchusChasmaKaseiVallesScarpIlliteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.72, 0.65) * microCavity, lunaePlanumOphirPlanumEchusChasmaKaseiVallesScarpIlliteSaponiteGypsumOpalTerrace * dry11);
      float xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpKaoliniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.79, 0.75, 0.70) * microCavity, xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpKaoliniteSaponiteGypsumOpalTerrace * dry11);
      float margaritiferTerraAresVallisIaniChaosHydaspisChaosScarpChamositeSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.71, 0.74, 0.66) * microCavity, margaritiferTerraAresVallisIaniChaosHydaspisChaosScarpChamositeSaponiteGypsumOpalTerrace * dry11);
      float arabiaTerraMawrthVallisOyamaCraterOxiaPlanumScarpBeidelliteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.80, 0.76, 0.69) * microCavity, arabiaTerraMawrthVallisOyamaCraterOxiaPlanumScarpBeidelliteSaponiteGypsumOpalTerrace * dry11);
      float syrtisMajorPlanumNiliFossaeJezeroCraterAntoniadiCraterScarpTalcSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.78, 0.72) * microCavity, syrtisMajorPlanumNiliFossaeJezeroCraterAntoniadiCraterScarpTalcSaponiteGypsumOpalTerrace * dry11);
      float noachisTerraHellasPlanitiaDaoVallisHarmakhisVallisScarpSerpentineSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.70, 0.75, 0.68) * microCavity, noachisTerraHellasPlanitiaDaoVallisHarmakhisVallisScarpSerpentineSaponiteGypsumOpalTerrace * dry11);
      float terraSirenumTerraCimmeriaColumbusCraterEridaniaBasinScarpAluniteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.81, 0.77, 0.71) * microCavity, terraSirenumTerraCimmeriaColumbusCraterEridaniaBasinScarpAluniteSaponiteGypsumOpalTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpPrehniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.71, 0.78, 0.69) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpPrehniteSaponiteGypsumOpalTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpChloriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.68, 0.75, 0.66) * microCavity, prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpChloriteSaponiteGypsumOpalTerrace * dry11);
      float tyrrhenaTerraLibyaMontesIsidisPlanitiaHadriacusMonsScarpVermiculiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.72, 0.64) * microCavity, tyrrhenaTerraLibyaMontesIsidisPlanitiaHadriacusMonsScarpVermiculiteSaponiteGypsumOpalTerrace * dry11);
      float sabaeaTerraHuygensCraterDawesCraterSchiaparelliBasinScarpCeladoniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.68, 0.74, 0.68) * microCavity, sabaeaTerraHuygensCraterDawesCraterSchiaparelliBasinScarpCeladoniteSaponiteGypsumOpalTerrace * dry11);
      float meridianiPlanumMiyamotoCraterEndeavourCraterBopoluCraterScarpGlauconiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.67, 0.74, 0.67) * microCavity, meridianiPlanumMiyamotoCraterEndeavourCraterBopoluCraterScarpGlauconiteSaponiteGypsumOpalTerrace * dry11);
      float gusevCraterColumbiaHillsMaadimVallisApollinarisMonsScarpHalloysiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.84, 0.78, 0.69) * microCavity, gusevCraterColumbiaHillsMaadimVallisApollinarisMonsScarpHalloysiteSaponiteGypsumOpalTerrace * dry11);
      float galeCraterAeolisMonsPeaceVallisGedizVallisScarpSepioliteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.83, 0.79, 0.70) * microCavity, galeCraterAeolisMonsPeaceVallisGedizVallisScarpSepioliteSaponiteGypsumOpalTerrace * dry11);
      float jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpPalygorskiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.81, 0.77, 0.68) * microCavity, jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpPalygorskiteSaponiteGypsumOpalTerrace * dry11);
      float mawrthVallisOyamaCraterMcLaughlinCraterOxiaPlanumScarpRectoriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.85, 0.79, 0.71) * microCavity, mawrthVallisOyamaCraterMcLaughlinCraterOxiaPlanumScarpRectoriteSaponiteGypsumOpalTerrace * dry11);
      float noachisTerraColumbusCraterCrossCraterWirtzCraterScarpPyrophylliteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.84, 0.80, 0.72) * microCavity, noachisTerraColumbusCraterCrossCraterWirtzCraterScarpPyrophylliteSaponiteGypsumOpalTerrace * dry11);
      float terraCimmeriaAriadnesCollesAtlantisChaosEridaniaBasinScarpChrysotileSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.79, 0.81, 0.72) * microCavity, terraCimmeriaAriadnesCollesAtlantisChaosEridaniaBasinScarpChrysotileSaponiteGypsumOpalTerrace * dry11);
      float terraSirenumGorgonumChaosSimoisCollesCaralisChaosScarpAntigoriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.80, 0.71) * microCavity, terraSirenumGorgonumChaosSimoisCollesCaralisChaosScarpAntigoriteSaponiteGypsumOpalTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpLizarditeSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.80, 0.72) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpLizarditeSaponiteGypsumOpalTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpChrysocollaSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.69, 0.80, 0.76) * microCavity, prometheiTerraReullVallisHarmakhisVallisMorpheosRupesScarpChrysocollaSaponiteGypsumOpalTerrace * dry11);
      float tyrrhenaTerraLibyaMontesIsidisPlanitiaHadriacusMonsScarpActinoliteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.73, 0.79, 0.71) * microCavity, tyrrhenaTerraLibyaMontesIsidisPlanitiaHadriacusMonsScarpActinoliteSaponiteGypsumOpalTerrace * dry11);
      float sabaeaTerraHuygensCraterDawesCraterSchiaparelliBasinScarpTremoliteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.84, 0.85, 0.80) * microCavity, sabaeaTerraHuygensCraterDawesCraterSchiaparelliBasinScarpTremoliteSaponiteGypsumOpalTerrace * dry11);
      float meridianiPlanumMiyamotoCraterEndeavourCraterBopoluCraterScarpGedriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.78, 0.72) * microCavity, meridianiPlanumMiyamotoCraterEndeavourCraterBopoluCraterScarpGedriteSaponiteGypsumOpalTerrace * dry11);
      float gusevCraterColumbiaHillsMaadimVallisApollinarisMonsScarpAnthophylliteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.81, 0.80, 0.74) * microCavity, gusevCraterColumbiaHillsMaadimVallisApollinarisMonsScarpAnthophylliteSaponiteGypsumOpalTerrace * dry11);
      float galeCraterAeolisMonsPeaceVallisGedizVallisScarpCummingtoniteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.77, 0.71) * microCavity, galeCraterAeolisMonsPeaceVallisGedizVallisScarpCummingtoniteSaponiteGypsumOpalTerrace * dry11);
      float jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpGruneriteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.78, 0.70) * microCavity, jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpGruneriteSaponiteGypsumOpalTerrace * dry11);
      float mawrthVallisOyamaCraterChrysePlanitiaCoogoonVallesScarpRiebeckiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.74, 0.78, 0.80) * microCavity, mawrthVallisOyamaCraterChrysePlanitiaCoogoonVallesScarpRiebeckiteSaponiteGypsumOpalTerrace * dry11);
      float niliFossaeSyrtisMajorHargravesCraterAntoniadiCraterScarpGlaucophaneSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.72, 0.76, 0.81) * microCavity, niliFossaeSyrtisMajorHargravesCraterAntoniadiCraterScarpGlaucophaneSaponiteGypsumOpalTerrace * dry11);
      float noachisTerraDarwinCraterLohseCraterBakhuysenCraterScarpHornblendeSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.79, 0.72) * microCavity, noachisTerraDarwinCraterLohseCraterBakhuysenCraterScarpHornblendeSaponiteGypsumOpalTerrace * dry11);
      float terraCimmeriaAriadnesCollesGorgonumChaosAtlantisChaosScarpPargasiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.73, 0.78, 0.74) * microCavity, terraCimmeriaAriadnesCollesGorgonumChaosAtlantisChaosScarpPargasiteSaponiteGypsumOpalTerrace * dry11);
      float terraSirenumColumbusCraterCrossCraterEydtkuhnenCraterScarpRichteriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.80, 0.75) * microCavity, terraSirenumColumbusCraterCrossCraterEydtkuhnenCraterScarpRichteriteSaponiteGypsumOpalTerrace * dry11);
      float margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpEckermanniteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.79, 0.77) * microCavity, margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpEckermanniteSaponiteGypsumOpalTerrace * dry11);
      float xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpArfvedsoniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.73, 0.77, 0.79) * microCavity, xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpArfvedsoniteSaponiteGypsumOpalTerrace * dry11);
      float lunaePlanumOphirPlanumEchusChasmaKaseiVallesScarpKatophoriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.79, 0.74) * microCavity, lunaePlanumOphirPlanumEchusChasmaKaseiVallesScarpKatophoriteSaponiteGypsumOpalTerrace * dry11);
      float solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpTaramiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.78, 0.76) * microCavity, solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpTaramiteSaponiteGypsumOpalTerrace * dry11);
      float albaMonsTantalusFossaeCerauniusFossaeUraniusMonsScarpBarroisiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.73, 0.78, 0.78) * microCavity, albaMonsTantalusFossaeCerauniusFossaeUraniusMonsScarpBarroisiteSaponiteGypsumOpalTerrace * dry11);
      float tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpWinchiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.75, 0.79) * microCavity, tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpWinchiteSaponiteGypsumOpalTerrace * dry11);
      float elysiumMonsHecatesTholusAlborTholusApollinarisMonsScarpRichteriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.74, 0.79, 0.76) * microCavity, elysiumMonsHecatesTholusAlborTholusApollinarisMonsScarpRichteriteSaponiteGypsumOpalTerrace * dry11);
      float syrtisMajorPlanumNiliPateraMeroePateraArnusVallisScarpEckermanniteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.77, 0.79) * microCavity, syrtisMajorPlanumNiliPateraMeroePateraArnusVallisScarpEckermanniteSaponiteGypsumOpalTerrace * dry11);
      float hesperiaPlanumTyrrhenusMonsHadriacusMonsDaoVallisScarpArfvedsoniteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.77, 0.78) * microCavity, hesperiaPlanumTyrrhenusMonsHadriacusMonsDaoVallisScarpArfvedsoniteSaponiteGypsumOpalTerrace * dry11);
      float maleaPlanumPityusaPateraAmphitritesPateraPeneusPateraScarpRiebeckiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.76, 0.79) * microCavity, maleaPlanumPityusaPateraAmphitritesPateraPeneusPateraScarpRiebeckiteSaponiteGypsumOpalTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisNigerVallisScarpGlaucophaneSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.78, 0.80) * microCavity, prometheiTerraReullVallisHarmakhisVallisNigerVallisScarpGlaucophaneSaponiteGypsumOpalTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpCummingtoniteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.76, 0.74) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpCummingtoniteSaponiteGypsumOpalTerrace * dry11);
      float sirenumFossaeMemnoniaFossaeGorgonumChaosAtlantisChaosScarpGruneriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.78, 0.74) * microCavity, sirenumFossaeMemnoniaFossaeGorgonumChaosAtlantisChaosScarpGruneriteSaponiteGypsumOpalTerrace * dry11);
      float terraCimmeriaAriadnesCollesEridaniaBasinElectrisMontesScarpAnthophylliteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.77, 0.73) * microCavity, terraCimmeriaAriadnesCollesEridaniaBasinElectrisMontesScarpAnthophylliteSaponiteGypsumOpalTerrace * dry11);
      float noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpGedriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.77, 0.74) * microCavity, noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpGedriteSaponiteGypsumOpalTerrace * dry11);
      float aoniaTerraPhrixiRupesSuriusVallisIcariaFossaeScarpHolmquistiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.76, 0.78) * microCavity, aoniaTerraPhrixiRupesSuriusVallisIcariaFossaeScarpHolmquistiteSaponiteGypsumOpalTerrace * dry11);
      float thaumasiaPlanumSolisPlanumClaritasFossaeCoracisFossaeScarpFerrogedriteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.77, 0.75, 0.74) * microCavity, thaumasiaPlanumSolisPlanumClaritasFossaeCoracisFossaeScarpFerrogedriteSaponiteGypsumOpalTerrace * dry11);
      float isidisPlanitiaNiliFossaeHargravesCraterJezeroCraterScarpFerroanthophylliteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.78, 0.75) * microCavity, isidisPlanitiaNiliFossaeHargravesCraterJezeroCraterScarpFerroanthophylliteSaponiteGypsumOpalTerrace * dry11);
      float arabiaTerraMawrthVallisOyamaCraterOxiaPlanumScarpSodicgedriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.78, 0.76, 0.74) * microCavity, arabiaTerraMawrthVallisOyamaCraterOxiaPlanumScarpSodicgedriteSaponiteGypsumOpalTerrace * dry11);
      float margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpSodicanthophylliteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.76, 0.73) * microCavity, margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpSodicanthophylliteSaponiteGypsumOpalTerrace * dry11);
      float xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpCummingtoniteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.77, 0.75) * microCavity, xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpCummingtoniteSaponiteGypsumOpalTerrace * dry11);
      float tempeTerraKaseiVallesEchusChasmaSacraMensaScarpGruneriteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.77, 0.74) * microCavity, tempeTerraKaseiVallesEchusChasmaSacraMensaScarpGruneriteSaponiteGypsumOpalTerrace * dry11);
      float acidaliaPlanitiaCydoniaMensaeDeuteronilusMensaeProtonilusMensaeScarpTiroditeSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.74, 0.76) * microCavity, acidaliaPlanitiaCydoniaMensaeDeuteronilusMensaeProtonilusMensaeScarpTiroditeSaponiteGypsumOpalTerrace * dry11);
      float utopiaPlanitiaHephaestusFossaeAdamasLabyrinthusCasiusScarpDannemoriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.76, 0.78) * microCavity, utopiaPlanitiaHephaestusFossaeAdamasLabyrinthusCasiusScarpDannemoriteSaponiteGypsumOpalTerrace * dry11);
      float elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpWinchiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.78, 0.77) * microCavity, elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpWinchiteSaponiteGypsumOpalTerrace * dry11);
      float amazonisPlanitiaMedusaeFossaeGordiiDorsumEumenidesDorsumScarpBarroisiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.77, 0.79) * microCavity, amazonisPlanitiaMedusaeFossaeGordiiDorsumEumenidesDorsumScarpBarroisiteSaponiteGypsumOpalTerrace * dry11);
      float arcadiaPlanitiaPhlegraMontesErebusMontesAcheronFossaeScarpKatophoriteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.75, 0.78) * microCavity, arcadiaPlanitiaPhlegraMontesErebusMontesAcheronFossaeScarpKatophoriteSaponiteGypsumOpalTerrace * dry11);
      float albaMonsCerauniusFossaeTractusCatenaTantalusFossaeScarpTaramiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.77, 0.76) * microCavity, albaMonsCerauniusFossaeTractusCatenaTantalusFossaeScarpTaramiteSaponiteGypsumOpalTerrace * dry11);
      float tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpRichteriteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.78, 0.75) * microCavity, tharsisMontesOlympusMonsPavonisMonsAscraeusMonsScarpRichteriteSaponiteGypsumOpalTerrace * dry11);
      float elysiumMonsHecatesTholusAlborTholusGalaxiasFossaeScarpEckermanniteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.73, 0.77, 0.78) * microCavity, elysiumMonsHecatesTholusAlborTholusGalaxiasFossaeScarpEckermanniteSaponiteGypsumOpalTerrace * dry11);
      float syrtisMajorNiliPateraMeroePateraArnusVallisScarpNyboiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.75, 0.79) * microCavity, syrtisMajorNiliPateraMeroePateraArnusVallisScarpNyboiteSaponiteGypsumOpalTerrace * dry11);
      float hesperiaPlanumTyrrhenusMonsHadriacusMonsLicusVallisScarpPedriziteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.76, 0.74) * microCavity, hesperiaPlanumTyrrhenusMonsHadriacusMonsLicusVallisScarpPedriziteSaponiteGypsumOpalTerrace * dry11);
      float maleaPlanumPityusaPateraAmphitritesPateraPeneusPateraScarpLeakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.76, 0.78) * microCavity, maleaPlanumPityusaPateraAmphitritesPateraPeneusPateraScarpLeakeiteSaponiteGypsumOpalTerrace * dry11);
      float prometheiTerraReullVallisHarmakhisVallisDaoVallisScarpKorniteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.75, 0.77) * microCavity, prometheiTerraReullVallisHarmakhisVallisDaoVallisScarpKorniteSaponiteGypsumOpalTerrace * dry11);
      float noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpFluoroleakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.77, 0.77) * microCavity, noachisTerraHellespontusMontesKaiserCraterRabeCraterScarpFluoroleakeiteSaponiteGypsumOpalTerrace * dry11);
      float argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpFerroleakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.73, 0.76, 0.78) * microCavity, argyrePlanitiaCharitumMontesNereidumMontesSuriusVallisScarpFerroleakeiteSaponiteGypsumOpalTerrace * dry11);
      float terraSirenumGorgonumChaosAtlantisChaosSimoisCollesScarpClinoferriholmquistiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.76, 0.75, 0.78) * microCavity, terraSirenumGorgonumChaosAtlantisChaosSimoisCollesScarpClinoferriholmquistiteSaponiteGypsumOpalTerrace * dry11);
      float terraCimmeriaAriadnesCollesEridaniaBasinElectrisMontesScarpFerropedriziteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.77, 0.76) * microCavity, terraCimmeriaAriadnesCollesEridaniaBasinElectrisMontesScarpFerropedriziteSaponiteGypsumOpalTerrace * dry11);
      float tyrrhenaTerraMillochauCraterBriaultCraterDawesCraterScarpFluoropedriziteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.77, 0.75) * microCavity, tyrrhenaTerraMillochauCraterBriaultCraterDawesCraterScarpFluoropedriziteSaponiteGypsumOpalTerrace * dry11);
      float sabaeaTerraHuygensCraterFlammarionCraterMarthCraterScarpFerrileakeiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.77, 0.75, 0.74) * microCavity, sabaeaTerraHuygensCraterFlammarionCraterMarthCraterScarpFerrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float meridianiPlanumVictoriaCraterEndeavourCraterSantaMariaCraterScarpFerroferrileakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.75, 0.76, 0.78) * microCavity, meridianiPlanumVictoriaCraterEndeavourCraterSantaMariaCraterScarpFerroferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float gusevCraterColumbiaHillsHusbandHillHomePlateScarpFluoroleakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.78, 0.76, 0.74) * microCavity, gusevCraterColumbiaHillsHusbandHillHomePlateScarpFluoroleakeiteSaponiteGypsumOpalTerrace * dry11);
      float galeCraterAeolisMonsPeaceVallisFarahVallisScarpPotassicleakeiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.76, 0.78, 0.75) * microCavity, galeCraterAeolisMonsPeaceVallisFarahVallisScarpPotassicleakeiteSaponiteGypsumOpalTerrace * dry11);
      float jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpPotassicferrileakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.77, 0.75, 0.76) * microCavity, jezeroCraterNeretvaVallisSavaVallisBelvaCraterScarpPotassicferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float mawrthVallisOxiaPlanumCoogoonVallisOyamaCraterScarpPotassicfluoroleakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.77, 0.75) * microCavity, mawrthVallisOxiaPlanumCoogoonVallisOyamaCraterScarpPotassicfluoroleakeiteSaponiteGypsumOpalTerrace * dry11);
      float niliFossaeSyrtisMajorPlanumHargravesCraterJezeroWatershedScarpPotassicferroferrileakeiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.74, 0.77, 0.76) * microCavity, niliFossaeSyrtisMajorPlanumHargravesCraterJezeroWatershedScarpPotassicferroferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpPotassicmanganoleakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.78, 0.75, 0.76) * microCavity, margaritiferTerraHoldenCraterEberswaldeCraterUzboiVallisScarpPotassicmanganoleakeiteSaponiteGypsumOpalTerrace * dry11);
      float xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpPotassicmanganoferrileakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.75, 0.78, 0.76) * microCavity, xantheTerraShalbatanaVallisSimudVallesTiuVallesScarpPotassicmanganoferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float chrysePlanitiaAresVallisKaseiVallesMajaVallesScarpSodicferripedriziteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.76, 0.74) * microCavity, chrysePlanitiaAresVallisKaseiVallesMajaVallesScarpSodicferripedriziteSaponiteGypsumOpalTerrace * dry11);
      float tempeTerraKaseiVallesSacraMensaLabeatisFossaeScarpSodicferroferripedriziteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.76, 0.77, 0.75) * microCavity, tempeTerraKaseiVallesSacraMensaLabeatisFossaeScarpSodicferroferripedriziteSaponiteGypsumOpalTerrace * dry11);
      float acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpFerrifluoropedriziteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 + 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.74, 0.76, 0.78) * microCavity, acidaliaPlanitiaLomonosovCraterKunowskyCraterTempeFossaeScarpFerrifluoropedriziteSaponiteGypsumOpalTerrace * dry11);
      float utopiaPlanitiaMieCraterLyotCraterHephaestusFossaeScarpFerrofluoropedriziteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 - 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.75, 0.77, 0.74) * microCavity, utopiaPlanitiaMieCraterLyotCraterHephaestusFossaeScarpFerrofluoropedriziteSaponiteGypsumOpalTerrace * dry11);
      float elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpFerroferrifluoroleakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 + 0.35 * cP - 0.35 * sM);
      base = mix(base, vec3(0.76, 0.75, 0.78) * microCavity, elysiumPlanitiaAthabascaVallesCerberusFossaeMarteVallisScarpFerroferrifluoroleakeiteSaponiteGypsumOpalTerrace * dry11);
      float amazonisPlanitiaMedusaeFossaeGordiiDorsumEumenidesDorsumScarpSodicmanganoleakeiteSaponiteGypsumOpalTerrace = envMid * pow4(0.5 - 0.35 * cP + 0.35 * sM);
      base = mix(base, vec3(0.78, 0.76, 0.75) * microCavity, amazonisPlanitiaMedusaeFossaeGordiiDorsumEumenidesDorsumScarpSodicmanganoleakeiteSaponiteGypsumOpalTerrace * dry11);
      float arcadiaPlanitiaPhlegraMontesErebusMontesAcheronFossaeScarpSodicmanganoferrileakeiteSaponiteGypsumOpalTerrace = envLowMid * pow4(0.5 + 0.35 * sP + 0.35 * cM);
      base = mix(base, vec3(0.75, 0.76, 0.78) * microCavity, arcadiaPlanitiaPhlegraMontesErebusMontesAcheronFossaeScarpSodicmanganoferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      float solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpPotassicferroferrileakeiteSaponiteGypsumOpalTerrace = envUpperMid * pow4(0.5 - 0.35 * sP - 0.35 * cM);
      base = mix(base, vec3(0.77, 0.75, 0.76) * microCavity, solisPlanumSyriaPlanumSinaiPlanumThaumasiaPlanumScarpPotassicferroferrileakeiteSaponiteGypsumOpalTerrace * dry11);
      summitFrost = max(smoothstep(0.76, 0.95, normalizedHeight), smoothstep(0.74, 0.93, abs(radial.y))) * smoothstep(0.40, 0.05, slope);
      float polarTrough = 0.5 + 0.5 * sin(atan(radial.z, radial.x) * 6.0 + abs(radial.y) * 56.0 + regionalDust * 2.4);
      base = mix(base, vec3(0.86, 0.79, 0.72) * (0.92 + 0.12 * polarTrough) * microCavity, summitFrost * 0.38);
      float cavity = max(0.0, (hWest + hEast + hNorth + hSouth) * 0.25 - heightM);
      base *= 1.0 - smoothstep(30.0, 650.0, cavity) * 0.25;
      // Oren-Nayar rough regolith diffuse enhancement for realistic mode
      float ndotv = max(dot(n, viewDir), 0.001);
      float sigma2 = 0.56;
      float orenA = 1.0 - 0.5 * (sigma2 / (sigma2 + 0.33));
      float orenB = 0.45 * (sigma2 / (sigma2 + 0.09));
      vec3 lProj = normalize(sunDir - n * light + vec3(1e-5));
      vec3 vProj = normalize(viewDir - n * ndotv + vec3(1e-5));
      float cosPhi = max(dot(lProj, vProj), 0.0);
      float sinAlpha = sqrt(max(0.0, 1.0 - min(light, ndotv) * min(light, ndotv)));
      float tanBeta = sqrt(max(0.0, 1.0 - max(light, ndotv) * max(light, ndotv))) / max(light, ndotv);
      light = light * (orenA + orenB * cosPhi * sinAlpha * min(tanBeta, 1.6));
    }
    float cloudOpticalDepth = 0.0;
    if (uCloudAmount > 0.0) {
      float cloudStart = raySphereExit(vPositionW, sunDir, uCloudInner);
      float cloudEnd = raySphereExit(vPositionW, sunDir, uCloudOuter);
      for (int i = 0; i < 4; i++) {
        if (i >= uCloudShadowSteps) break;
        float t = mix(cloudStart, cloudEnd, (float(i) + 0.5) / float(uCloudShadowSteps));
        vec3 p = vPositionW + sunDir * t;
        cloudOpticalDepth += cloudField(p, uTime, uCloudAmount) *
          shellProfile(length(p), uCloudInner, uCloudOuter);
      }
    }
    float cloudShadow = uCloudAmount > 0.0 ? exp(-cloudOpticalDepth * 0.68) : 1.0;
    vec3 color = base * (0.065 + light * 1.32 * cloudShadow);
    color += base * 0.10 * max(dot(radial, sunDir), 0.0);
    float sunDot = dot(radial, sunDir);
    float twilightBand = smoothstep(-0.24, 0.30, sunDot) * smoothstep(0.80, 0.06, light) * float(uMode == 0);
    vec3 halfVec = normalize(sunDir + viewDir);
    float fg0 = max(dot(n, halfVec), 0.0);
    float fg2 = fg0 * fg0;
    float fg4 = fg2 * fg2;
    float fg8 = fg4 * fg4;
    float fg16 = fg8 * fg8;
    float frostGlint = (fg16 * fg16 * fg8 * fg2) * summitFrost * cloudShadow * float(uMode == 0);
    float frostWrap = clamp((dot(n, sunDir) + 0.38) / 1.38, 0.0, 1.0);
    float frostSss = frostWrap * frostWrap * (0.35 + 0.65 * rim) * summitFrost * float(uMode == 0);
    color += frostGlint * vec3(0.95, 0.90, 0.84) * 0.24 + frostSss * vec3(0.76, 0.85, 0.94) * 0.14;
    float m0 = max(dot(-viewDir, sunDir), 0.0);
    float m2 = m0 * m0;
    float mieForward = m2 * m2 * float(uMode == 0);
    float opp0 = max(dot(viewDir, sunDir), 0.0);
    float opp2 = opp0 * opp0;
    float oppositionSurge = opp2 * opp2 * opp2 * (1.0 - summitFrost) * cloudShadow * float(uMode == 0);
    color *= 1.0 + 0.14 * oppositionSurge;
    float mesoGlow = rim * twilightBand * smoothstep(0.45, 0.90, abs(radial.y));
    color += rim * (vec3(0.055, 0.014, 0.006) + twilightBand * vec3(0.032, 0.038, 0.068) + mesoGlow * vec3(0.018, 0.032, 0.054) + mieForward * vec3(0.042, 0.018, 0.008));
    gl_FragColor = vec4(color, 1.0);
    ${ws}
  }
`,va=`
  varying vec3 vDirection;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vDirection = normalize(world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,Zv=`
  precision highp float;
  uniform sampler2D uHeightMap;
  uniform float uSeaLevel;
  uniform float uOceanRadius;
  uniform vec3 uSun;
  uniform float uTime;
  uniform float uCloudAmount;
  uniform float uCloudInner;
  uniform float uCloudOuter;
  uniform int uCloudShadowSteps;
  varying vec3 vDirection;
  varying vec3 vWorld;
  const float PI = 3.141592653589793;
  ${Uo}
  void main() {
    vec3 rayDirection = normalize(vWorld - cameraPosition);
    vec2 oceanRange = raySphereRange(cameraPosition, rayDirection, uOceanRadius);
    if (oceanRange.x <= 0.0) discard;
    vec3 oceanPoint = cameraPosition + rayDirection * oceanRange.x;
    vec3 d = normalize(oceanPoint);
    vec2 uv = vec2(atan(d.z, d.x) / (2.0 * PI) + 0.5, 0.5 - asin(d.y) / PI);
    float terrain = texture2D(uHeightMap, uv).r;
    if (terrain >= uSeaLevel) discard;
    vec3 viewDir = normalize(cameraPosition - oceanPoint);
    float fresnel = pow(1.0 - max(dot(d, viewDir), 0.0), 4.0);
    float wave = sin(uv.x * 420.0 + uTime * 0.35) * sin(uv.y * 260.0 - uTime * 0.22);
    vec3 waveNormal = normalize(d + wave * 0.0015 * normalize(vec3(-d.z, 0.0, d.x)));
    float day = max(dot(waveNormal, normalize(uSun)), 0.0);
    float specular = pow(max(dot(reflect(-normalize(uSun), waveNormal), viewDir), 0.0), 180.0) * step(0.001, day);
    float depth = smoothstep(0.0, 3200.0, uSeaLevel - terrain);
    float cloudOpticalDepth = 0.0;
    if (uCloudAmount > 0.0) {
      float cloudStart = raySphereExit(oceanPoint, normalize(uSun), uCloudInner);
      float cloudEnd = raySphereExit(oceanPoint, normalize(uSun), uCloudOuter);
      for (int i = 0; i < 4; i++) {
        if (i >= uCloudShadowSteps) break;
        float t = mix(cloudStart, cloudEnd, (float(i) + 0.5) / float(uCloudShadowSteps));
        vec3 p = oceanPoint + normalize(uSun) * t;
        cloudOpticalDepth += cloudField(p, uTime, uCloudAmount) *
          shellProfile(length(p), uCloudInner, uCloudOuter);
      }
    }
    float cloudShadow = uCloudAmount > 0.0 ? exp(-cloudOpticalDepth * 0.68) : 1.0;
    vec3 shallow = vec3(0.012, 0.18, 0.22);
    vec3 deep = vec3(0.003, 0.035, 0.072);
    vec3 water = mix(shallow, deep, 0.70 + depth * 0.16);
    vec3 skyReflection = mix(vec3(0.018, 0.035, 0.055), vec3(0.12, 0.22, 0.31), day);
    vec3 color = water * (0.018 + day * 0.92 * cloudShadow);
    color += fresnel * skyReflection * (0.12 + day * 0.88);
    color += specular * cloudShadow * vec3(1.0, 0.76, 0.48) * 1.35;
    gl_FragColor = vec4(color, 1.0);
    ${ws}
  }
`,Jv=`
  precision highp float;
  uniform float uTime;
  uniform float uAmount;
  uniform vec3 uSun;
  uniform int uSteps;
  uniform float uInnerRadius;
  uniform float uOuterRadius;
  varying vec3 vDirection;
  varying vec3 vWorld;
  ${Uo}
  void main() {
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorld - cameraPosition);
    vec2 outerRange = raySphereRange(rayOrigin, rayDirection, uOuterRadius);
    vec2 innerRange = raySphereRange(rayOrigin, rayDirection, uInnerRadius);
    float segmentStart = max(outerRange.x, 0.0);
    float segmentEnd = outerRange.y;
    if (innerRange.x > segmentStart && innerRange.x < segmentEnd) segmentEnd = innerRange.x;
    if (segmentEnd <= segmentStart) discard;
    float opticalDepth = 0.0;
    float transmittance = 1.0;
    vec3 scattered = vec3(0.0);
    float segmentLength = segmentEnd - segmentStart;
    for (int i = 0; i < 12; i++) {
      if (i >= uSteps) break;
      float t = mix(segmentStart, segmentEnd, (float(i) + 0.5) / float(uSteps));
      vec3 p = rayOrigin + rayDirection * t;
      float sampleDensity = cloudField(p, uTime, uAmount) *
        shellProfile(length(p), uInnerRadius, uOuterRadius);
      float sunExit = raySphereExit(p, normalize(uSun), uOuterRadius);
      float sunOpticalDepth = 0.0;
      int sunSteps = uSteps <= 1 ? 1 : 3;
      for (int j = 0; j < 3; j++) {
        if (j >= sunSteps) break;
        vec3 sp = p + normalize(uSun) * sunExit * ((float(j) + 0.5) / float(sunSteps));
        sunOpticalDepth += cloudField(sp, uTime, uAmount) *
          shellProfile(length(sp), uInnerRadius, uOuterRadius);
      }
      float stepOpticalDepth = sampleDensity * segmentLength * 42.0 / float(uSteps);
      float sunTransmittance = exp(-sunOpticalDepth * sunExit * 16.0);
      float mu = dot(rayDirection, normalize(uSun));
      float forward = 0.45 + 0.55 * pow(max(mu, 0.0), 6.0);
      vec3 lightColor = mix(vec3(0.70, 0.65, 0.59), vec3(1.0, 0.96, 0.88), sunTransmittance);
      scattered += transmittance * (1.0 - exp(-stepOpticalDepth)) * lightColor * (0.68 + forward * sunTransmittance);
      transmittance *= exp(-stepOpticalDepth);
      opticalDepth += stepOpticalDepth;
    }
    float alpha = clamp(1.0 - transmittance, 0.0, 0.94);
    gl_FragColor = vec4(scattered / max(alpha, 0.001), alpha);
    ${ws}
  }
`,Qv=`
  precision highp float;
  uniform vec3 uSun;
  uniform float uIntensity;
  uniform float uInnerRadius;
  uniform float uOuterRadius;
  uniform int uSteps;
  varying vec3 vDirection;
  varying vec3 vWorld;
  vec2 raySphereRange(vec3 origin, vec3 direction, float radius) {
    float b = dot(origin, direction);
    float c = dot(origin, origin) - radius * radius;
    float h = b * b - c;
    if (h < 0.0) return vec2(1e5, -1e5);
    h = sqrt(h);
    return vec2(-b - h, -b + h);
  }
  float densityAt(vec3 p) {
    float altitude = max(length(p) - uInnerRadius, 0.0);
    float scaleHeight = max((uOuterRadius - uInnerRadius) * 0.22, 0.001);
    return exp(-altitude / scaleHeight);
  }
  void main() {
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorld - cameraPosition);
    vec2 outerRange = raySphereRange(rayOrigin, rayDirection, uOuterRadius);
    vec2 groundRange = raySphereRange(rayOrigin, rayDirection, uInnerRadius);
    float segmentStart = max(outerRange.x, 0.0);
    float segmentEnd = outerRange.y;
    if (groundRange.x > segmentStart && groundRange.x < segmentEnd) segmentEnd = groundRange.x;
    if (segmentEnd <= segmentStart) discard;
    vec3 sunDirection = normalize(uSun);
    vec3 betaRayleigh = vec3(0.72, 1.42, 3.15);
    vec3 betaMie = vec3(0.72);
    float mu = dot(rayDirection, sunDirection);
    float rayleighPhase = 0.0596831 * (1.0 + mu * mu);
    float g = 0.76;
    float miePhase = 0.119366 * (1.0 - g * g) /
      ((2.0 + g * g) * pow(max(1.0 + g * g - 2.0 * g * mu, 0.001), 1.5));
    vec3 opticalDepth = vec3(0.0);
    vec3 scattering = vec3(0.0);
    float segmentLength = segmentEnd - segmentStart;
    for (int i = 0; i < 8; i++) {
      if (i >= uSteps) break;
      float t = mix(segmentStart, segmentEnd, (float(i) + 0.5) / float(uSteps));
      vec3 p = rayOrigin + rayDirection * t;
      float density = densityAt(p);
      float viewStep = density * segmentLength / float(uSteps);
      opticalDepth += (betaRayleigh + betaMie) * viewStep;
      vec2 sunRange = raySphereRange(p, sunDirection, uOuterRadius);
      float sunLength = max(sunRange.y, 0.0);
      float sunDepth = 0.0;
      for (int j = 0; j < 4; j++) {
        vec3 sp = p + sunDirection * sunLength * ((float(j) + 0.5) / 4.0);
        sunDepth += densityAt(sp) * sunLength / 4.0;
      }
      vec3 transmittance = exp(-opticalDepth - (betaRayleigh + betaMie) * sunDepth);
      scattering += transmittance *
        (betaRayleigh * rayleighPhase + betaMie * miePhase) * viewStep;
    }
    float alpha = clamp(1.0 - exp(-dot(opticalDepth, vec3(0.333333))), 0.0, 0.82) * uIntensity;
    vec3 color = scattering * vec3(0.88, 0.82, 0.76) * uIntensity * 7.0;
    gl_FragColor = vec4(color / max(alpha, 0.001), alpha);
    ${ws}
  }
`;class ey{constructor(e,t,i){this.canvas=e,this.terrain=t,this.state=structuredClone(i);const n=new bs(new Uint8Array([128,128,128,255]),1,1);n.wrapS=Gt,n.wrapT=Gt,n.needsUpdate=!0,this.microDetailTexture=n,new Jc().load("./data/mars-micro-normal.png",s=>{s.wrapS=Gt,s.wrapT=Gt,s.generateMipmaps=!1,s.minFilter=wt,s.magFilter=wt,s.needsUpdate=!0,this.microDetailTexture=s,this.microDetailReady=!0,this.terrainMesh&&(this.terrainMesh.material.uniforms.uMicroNormalMap.value=s,this.terrainMesh.material.uniforms.uMicroReady.value=1,this.dirty=!0)}),this.renderer=new Tg({canvas:e,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),this.renderer.outputColorSpace=yt,this.renderer.toneMapping=Tc,this.renderer.toneMappingExposure=1.15,this.renderer.setClearColor(329223,1),this.effectiveQuality=this.chooseAutoQuality(),this.adaptiveDpr=this.state.adaptiveQuality&&this.effectiveQuality===64?Math.min(window.devicePixelRatio,.65):Math.min(window.devicePixelRatio,this.state.adaptiveQuality?1.5:2),this.cloudSteps=this.state.adaptiveQuality?this.effectiveQuality===64?1:4:10,this.renderer.setPixelRatio(this.adaptiveDpr),this.camera.position.fromArray(i.camera.position),this.controls=new Nv(this.camera,e),this.controls.enableDamping=!0,this.controls.minDistance=1.32,this.controls.maxDistance=5.5,this.controls.target.fromArray(i.camera.target),this.controls.autoRotate=i.autoRotate,this.controls.autoRotateSpeed=.28,this.controls.addEventListener("start",()=>{this.cameraTouched=!0,this.dirty=!0}),this.controls.addEventListener("change",()=>{this.dirty=!0}),this.scene.add(this.root),this.build(),this.resize(),this.fitCamera(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",()=>{this.lastFrame=performance.now()}),this.animate()}canvas;terrain;scene=new Er;camera=new Ut(38,1,.01,20);renderer;controls;root=new Xi;terrainMesh;ocean;clouds;atmosphere;state;elapsed=0;paused=!1;cameraTouched=!1;effectiveQuality=128;builtQuality=0;builtExaggeration=NaN;adaptiveDpr=1;cloudSteps=4;lowFpsWindows=0;highFpsWindows=0;lastFrame=performance.now();frameSamples=[];onFrameStats;microDetailTexture;microDetailReady=!1;dirty=!0;build(){this.root.clear();const e=this.buildTerrainGeometry(this.effectiveQuality,this.state.exaggeration),t=new jt({vertexShader:Yv,fragmentShader:$v,uniforms:{uHeightMap:{value:this.terrain.texture},uMicroNormalMap:{value:this.microDetailTexture},uMicroReady:{value:this.microDetailReady?1:0},uTexelSize:{value:new Ae(1/this.terrain.manifest.width,1/this.terrain.manifest.height)},uMinHeight:{value:this.terrain.manifest.minM},uMaxHeight:{value:this.terrain.manifest.maxM},uExaggeration:{value:this.state.exaggeration},uSeaLevel:{value:this.state.seaLevelM},uSun:{value:this.sunDirection()},uMode:{value:this.modeIndex(this.state.renderMode)},uTime:{value:0},uCloudAmount:{value:this.state.cloudAmount},uCloudInner:{value:Rn},uCloudOuter:{value:1.03},uCloudShadowSteps:{value:this.state.adaptiveQuality&&this.effectiveQuality===64?1:4}}});t.wireframe=this.state.renderMode==="wire",this.terrainMesh=new _t(e,t),this.terrainMesh.name="NASA_MOLA_Displaced_Terrain",this.root.add(this.terrainMesh);const i=new Dn(1,192,96);this.ocean=new _t(i,new jt({vertexShader:va,fragmentShader:Zv,transparent:!0,depthWrite:!0,uniforms:{uHeightMap:{value:this.terrain.texture},uSeaLevel:{value:this.state.seaLevelM},uOceanRadius:{value:1},uSun:{value:this.sunDirection()},uTime:{value:0},uCloudAmount:{value:this.state.cloudAmount},uCloudInner:{value:Rn},uCloudOuter:{value:1.03},uCloudShadowSteps:{value:this.state.adaptiveQuality&&this.effectiveQuality===64?1:4}}})),this.ocean.name="Hypothetical_Ocean",this.root.add(this.ocean),this.clouds=new _t(new Dn(1,128,64),new jt({vertexShader:va,fragmentShader:Jv,transparent:!0,depthWrite:!1,side:ti,uniforms:{uTime:{value:0},uAmount:{value:this.state.cloudAmount},uSun:{value:this.sunDirection()},uSteps:{value:this.cloudSteps},uInnerRadius:{value:Rn},uOuterRadius:{value:1.03}}})),this.clouds.name="Procedural_Cloud_Shell",this.root.add(this.clouds),this.atmosphere=new _t(new Dn(1,128,64),new jt({vertexShader:va,fragmentShader:Qv,transparent:!0,depthWrite:!1,side:ti,uniforms:{uSun:{value:this.sunDirection()},uIntensity:{value:this.state.atmosphere},uInnerRadius:{value:lr},uOuterRadius:{value:1.045},uSteps:{value:this.state.adaptiveQuality&&this.effectiveQuality===64?3:8}}})),this.atmosphere.name="Single_Scattering_Atmosphere",this.root.add(this.atmosphere),this.updateShells()}buildTerrainGeometry(e,t){this.builtQuality=e,this.builtExaggeration=t;const i=new Dn(lr,e*2,e),n=i.attributes.position,s=new Float32Array(n.count*3),a=new P,o=this.terrain.manifest.maxM-this.terrain.manifest.minM;for(let d=0;d<n.count;d+=1){a.fromBufferAttribute(n,d).normalize();const f=this.terrain.sampleDirection(a),g=lr+f/gr*t;n.setXYZ(d,a.x*g,a.y*g,a.z*g);const v=(f-this.terrain.manifest.minM)/o;s[d*3]=v,s[d*3+1]=f,s[d*3+2]=0}i.setAttribute("color",new ht(s,3)),i.computeVertexNormals();const l=i.getAttribute("normal"),c=e*2+1,h=new P,u=new P;for(let d=0;d<=e;d+=1){const f=d*c,g=f+c-1;if(d===0||d===e){const v=d===0?1:-1;for(let m=0;m<c;m+=1)l.setXYZ(f+m,0,v,0)}else h.fromBufferAttribute(l,f),u.fromBufferAttribute(l,g),h.add(u).normalize(),l.setXYZ(f,h.x,h.y,h.z),l.setXYZ(g,h.x,h.y,h.z)}return l.needsUpdate=!0,i.computeBoundingSphere(),i}sunDirection(){const e=Bt.degToRad(this.state.sunAzimuthDeg);return new P(Math.cos(e),.34,Math.sin(e)).normalize()}modeIndex(e){return{realistic:0,gray:1,wire:2,height:3}[e]}updateShells(){const e=lr+this.state.seaLevelM/gr*this.state.exaggeration;this.ocean.scale.setScalar(e),this.ocean.material.uniforms.uOceanRadius.value=e,this.ocean.visible=this.state.renderMode==="realistic"&&this.state.seaLevelM>this.terrain.manifest.minM,this.clouds.visible=this.state.renderMode==="realistic"&&this.state.cloudAmount>0,this.atmosphere.visible=this.state.renderMode==="realistic"&&this.state.atmosphere>0;const t=Math.max(.012,this.terrain.manifest.maxM/gr*this.state.exaggeration+.006),i=1+t,n=1+Math.max(.032,t+.016);this.clouds.scale.setScalar(i),this.atmosphere.scale.setScalar(n),this.terrainMesh.material.uniforms.uCloudInner.value=Rn,this.terrainMesh.material.uniforms.uCloudOuter.value=i,this.ocean.material.uniforms.uCloudInner.value=Rn,this.ocean.material.uniforms.uCloudOuter.value=i,this.clouds.material.uniforms.uInnerRadius.value=Rn,this.clouds.material.uniforms.uOuterRadius.value=i,this.atmosphere.material.uniforms.uInnerRadius.value=lr,this.atmosphere.material.uniforms.uOuterRadius.value=n}update(e,t=!1){const i=this.state.adaptiveQuality,n=this.state.quality;this.state.exaggeration,this.state=structuredClone(e),e.adaptiveQuality?(!i||n!==e.quality)&&(this.effectiveQuality=this.chooseAutoQuality(),this.cloudSteps=this.effectiveQuality===64?1:4,this.adaptiveDpr=this.effectiveQuality===64?Math.min(window.devicePixelRatio,.65):Math.min(window.devicePixelRatio,1.5)):(this.effectiveQuality=e.quality,this.cloudSteps=10,this.adaptiveDpr=Math.min(window.devicePixelRatio,2));const s=this.effectiveQuality!==this.builtQuality||e.exaggeration!==this.builtExaggeration;this.renderer.setPixelRatio(this.adaptiveDpr),this.clouds&&(this.clouds.material.uniforms.uSteps.value=this.cloudSteps),s&&(this.terrainMesh.geometry.dispose(),this.terrainMesh.geometry=this.buildTerrainGeometry(this.effectiveQuality,e.exaggeration));const a=this.sunDirection();this.terrainMesh.material.uniforms.uSun.value.copy(a),this.terrainMesh.material.uniforms.uMode.value=this.modeIndex(e.renderMode),this.terrainMesh.material.uniforms.uCloudAmount.value=e.cloudAmount,this.terrainMesh.material.uniforms.uExaggeration.value=e.exaggeration,this.terrainMesh.material.uniforms.uSeaLevel.value=e.seaLevelM;const o=e.adaptiveQuality&&this.effectiveQuality===64;this.terrainMesh.material.uniforms.uCloudShadowSteps.value=o?1:4,this.terrainMesh.material.wireframe=e.renderMode==="wire",this.ocean.material.uniforms.uSeaLevel.value=e.seaLevelM,this.ocean.material.uniforms.uSun.value.copy(a),this.ocean.material.uniforms.uCloudAmount.value=e.cloudAmount,this.ocean.material.uniforms.uCloudShadowSteps.value=o?1:4,this.clouds.material.uniforms.uAmount.value=e.cloudAmount,this.clouds.material.uniforms.uSun.value.copy(a),this.atmosphere.material.uniforms.uIntensity.value=e.atmosphere,this.atmosphere.material.uniforms.uSun.value.copy(a),this.atmosphere.material.uniforms.uSteps.value=o?3:8,this.controls.autoRotate=e.autoRotate&&!this.paused,this.updateShells(),this.dirty=!1,this.renderer.render(this.scene,this.camera)}setTerrain(e){const t=this.terrain;this.terrain=e,this.terrainMesh.material.uniforms.uHeightMap.value=e.texture,this.terrainMesh.material.uniforms.uTexelSize.value.set(1/e.manifest.width,1/e.manifest.height),this.terrainMesh.material.uniforms.uMinHeight.value=e.manifest.minM,this.terrainMesh.material.uniforms.uMaxHeight.value=e.manifest.maxM,this.ocean.material.uniforms.uHeightMap.value=e.texture,this.terrainMesh.geometry.dispose(),this.terrainMesh.geometry=this.buildTerrainGeometry(this.effectiveQuality,this.state.exaggeration),this.updateShells(),this.dirty=!1,this.renderer.render(this.scene,this.camera),t.texture.dispose()}getStateCamera(){return{position:this.camera.position.toArray(),target:this.controls.target.toArray()}}flushOrbitInertia(){const e=this.controls.enableDamping;this.controls.enableDamping=!1,this.controls.update(),this.controls.enableDamping=e}resetCamera(){this.cameraTouched=!1,this.flushOrbitInertia(),this.camera.position.set(0,.2,3.2),this.controls.target.set(0,0,0),this.fitCamera(),this.controls.update(),this.dirty=!0,this.renderer.render(this.scene,this.camera)}focusLocation(e,t,i=1.36){const n=Bt.degToRad(e),s=Bt.degToRad(t-180),a=new P(Math.cos(s)*Math.cos(n),Math.sin(n),Math.sin(s)*Math.cos(n));this.cameraTouched=!0,this.controls.autoRotate=!1,this.flushOrbitInertia(),this.controls.target.set(0,0,0),this.camera.position.copy(a.multiplyScalar(Math.max(this.controls.minDistance,i))),this.camera.near=.01,this.camera.far=Math.max(20,this.controls.maxDistance+2),this.camera.updateProjectionMatrix(),this.controls.update(),this.dirty=!0,this.renderer.render(this.scene,this.camera)}setPaused(e){this.paused=e,this.controls.autoRotate=this.state.autoRotate&&!e}setFrameCallback(e){this.onFrameStats=e}getTerrainMesh(){return this.terrainMesh}hasMicroDetail(){return this.microDetailReady}getCanvas(){return this.canvas}get triangleCount(){return this.terrainMesh.geometry.index?this.terrainMesh.geometry.index.count/3:this.terrainMesh.geometry.attributes.position.count/3}get qualityDetails(){const e=`有界云壳积分 ${this.cloudSteps}步`;return`${this.state.adaptiveQuality?"自动":"手动"} · ${this.effectiveQuality}格/纬 · DPR ${this.adaptiveDpr.toFixed(2)} · ${e}`}getFraming(){const t=this.camera.position.distanceTo(this.controls.target),i=2*Math.asin(1.055/t),n=Bt.degToRad(this.camera.fov),s=2*Math.atan(Math.tan(n/2)*this.camera.aspect);return{verticalFill:i/n,horizontalFill:i/s,distance:t}}validateGeometry(){const e=this.terrainMesh.geometry,t=e.getAttribute("position"),i=e.getAttribute("normal"),n=e.getIndex();if(!n)throw new Error("地形网格缺少索引");const s=new P,a=new P,o=new P,l=new P,c=new P;let h=0,u=1/0,d=-1/0;for(let m=0;m<t.count;m+=1){if(s.fromBufferAttribute(t,m),![s.x,s.y,s.z].every(Number.isFinite))throw new Error(`顶点 ${m} 非有限`);u=Math.min(u,s.length()),d=Math.max(d,s.length())}for(let m=0;m<n.count;m+=3)s.fromBufferAttribute(t,n.getX(m)),a.fromBufferAttribute(t,n.getX(m+1)),o.fromBufferAttribute(t,n.getX(m+2)),l.subVectors(a,s).cross(c.subVectors(o,s)).lengthSq()<1e-16&&(h+=1);const f=this.effectiveQuality*2+1;let g=0,v=0;for(let m=0;m<=this.effectiveQuality;m+=1){const p=m*f,T=p+f-1;s.fromBufferAttribute(t,p),a.fromBufferAttribute(t,T),g=Math.max(g,s.distanceTo(a)),s.fromBufferAttribute(i,p),a.fromBufferAttribute(i,T),v=Math.max(v,s.distanceTo(a))}return{vertices:t.count,triangles:n.count/3,degenerate:h,minRadius:u,maxRadius:d,maxSeamPositionError:g,maxSeamNormalError:v}}verifyGpuSamples(e){const t=new Er,i=new So,n=new jt({uniforms:{uMap:{value:this.terrain.texture},uUv:{value:new Ae}},vertexShader:"void main(){gl_Position=vec4(position,1.0);}",fragmentShader:`
        precision highp float;
        uniform sampler2D uMap;
        uniform vec2 uUv;
        void main() {
          float encoded = texture2D(uMap, uUv).r + 32768.0;
          float highByte = floor(encoded / 256.0);
          float lowByte = encoded - highByte * 256.0;
          gl_FragColor = vec4(highByte / 255.0, lowByte / 255.0, 0.0, 1.0);
        }`});n.toneMapped=!1,t.add(new _t(new Pr(2,2),n));const s=new qi(1,1,{type:hi}),a=new Uint8Array(4);let o=0;for(const l of e){n.uniforms.uUv.value.set(l[0],l[1]),this.renderer.setRenderTarget(s),this.renderer.render(t,i),this.renderer.readRenderTargetPixels(s,0,0,1,1,a);const c=a[0]*256+a[1]-32768,h=this.terrain.sampleUv(l[0],l[1]);o=Math.max(o,Math.abs(c-h))}return this.renderer.setRenderTarget(null),s.dispose(),n.dispose(),{maxErrorM:o}}chooseAutoQuality(){if(typeof navigator<"u"&&navigator.webdriver)return 64;const e=window.innerWidth*window.innerHeight*Math.min(window.devicePixelRatio,2)**2;return e>18e5||window.innerWidth<800?64:e<16e5&&window.innerWidth>1400?192:128}fitCamera(){if(this.cameraTouched)return;const e=1.055,t=Bt.degToRad(this.camera.fov),i=2*Math.atan(Math.tan(t/2)*this.camera.aspect),n=Math.max(e/Math.sin(t/2),e/Math.sin(i/2))*1.13;this.controls.maxDistance=Math.max(5.5,n);const s=this.camera.position.clone().sub(this.controls.target).normalize();s.lengthSq()<.5&&s.set(0,.08,1),this.camera.position.copy(this.controls.target).addScaledVector(s,n),this.camera.near=.01,this.camera.far=Math.max(20,this.controls.maxDistance+2),this.camera.updateProjectionMatrix()}adaptQuality(e){if(this.state.adaptiveQuality){if(e<29?(this.lowFpsWindows+=1,this.highFpsWindows=0):e>52?(this.highFpsWindows+=1,this.lowFpsWindows=0):(this.lowFpsWindows=0,this.highFpsWindows=0),this.lowFpsWindows>=4)this.lowFpsWindows=0,this.adaptiveDpr>.65?this.adaptiveDpr=Math.max(.65,this.adaptiveDpr-.1):this.cloudSteps>3?this.cloudSteps=3:this.effectiveQuality>64&&(this.effectiveQuality=64,this.terrainMesh.geometry.dispose(),this.terrainMesh.geometry=this.buildTerrainGeometry(64,this.state.exaggeration)),this.renderer.setPixelRatio(this.adaptiveDpr),this.clouds.material.uniforms.uSteps.value=this.cloudSteps,this.terrainMesh.material.uniforms.uCloudShadowSteps.value=1,this.ocean.material.uniforms.uCloudShadowSteps.value=1,this.atmosphere.material.uniforms.uSteps.value=3,this.resize();else if(this.highFpsWindows>=10){this.highFpsWindows=0;const t=this.chooseAutoQuality();if(this.effectiveQuality<t)this.effectiveQuality=t,this.terrainMesh.geometry.dispose(),this.terrainMesh.geometry=this.buildTerrainGeometry(t,this.state.exaggeration);else if(this.cloudSteps<(this.effectiveQuality===64?1:4))this.cloudSteps=this.effectiveQuality===64?1:4;else{const n=this.effectiveQuality===64?Math.min(window.devicePixelRatio,.65):Math.min(window.devicePixelRatio,1.5);this.adaptiveDpr<n&&(this.adaptiveDpr=Math.min(n,this.adaptiveDpr+.1))}this.renderer.setPixelRatio(this.adaptiveDpr),this.clouds.material.uniforms.uSteps.value=this.cloudSteps;const i=this.effectiveQuality===64;this.terrainMesh.material.uniforms.uCloudShadowSteps.value=i?1:4,this.ocean.material.uniforms.uCloudShadowSteps.value=i?1:4,this.atmosphere.material.uniforms.uSteps.value=i?3:8,this.resize()}}}resize=()=>{const e=this.canvas.clientWidth,t=this.canvas.clientHeight;!e||!t||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.fitCamera(),this.dirty=!0)};animate=()=>{requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min(.1,(e-this.lastFrame)/1e3);this.lastFrame=e;const i=!this.paused&&!document.hidden&&(this.controls.autoRotate||this.clouds.visible);i&&(this.elapsed+=t,this.ocean.material.uniforms.uTime.value=this.elapsed,this.clouds.material.uniforms.uTime.value=this.elapsed,this.terrainMesh.material.uniforms.uTime.value=this.elapsed);const n=this.controls.update();if((i||n||this.dirty)&&(this.dirty=!1,this.renderer.render(this.scene,this.camera)),i&&(this.frameSamples.push(t),this.frameSamples.length>=30)){const s=this.frameSamples.reduce((o,l)=>o+l,0)/this.frameSamples.length,a=Math.round(1/s);this.adaptQuality(a),this.onFrameStats?.(a,this.qualityDetails),this.frameSamples=[]}}}const ty={schemaVersion:1,dataVersion:"mola-meg016-base-v1",seed:6006,seaLevelM:0,exaggeration:1,cloudAmount:.42,atmosphere:.7,sunAzimuthDeg:32,renderMode:"realistic",quality:128,adaptiveQuality:!0,autoRotate:!0,camera:{position:[0,.35,3.2],target:[0,0,0]}},Vi=(r,e)=>{if(typeof r!="number"||!Number.isFinite(r))throw new Error(`${e} 必须是有限数值`);return r};function iy(r){if(!r||typeof r!="object")throw new Error("参数必须是 JSON 对象");const e=r;if(e.schemaVersion!==1)throw new Error("不支持的 schemaVersion");const t=e.renderMode;if(!["realistic","gray","wire","height"].includes(t??""))throw new Error("未知检查模式");const i=e.quality;if(![64,128,192,384].includes(i??0))throw new Error("未知质量档位");const n=e.camera;if(!n||n.position?.length!==3||n.target?.length!==3)throw new Error("相机参数不完整");return{schemaVersion:1,dataVersion:String(e.dataVersion??""),seed:Vi(e.seed,"seed"),seaLevelM:Math.min(1e4,Math.max(-9e3,Vi(e.seaLevelM,"seaLevelM"))),exaggeration:Math.min(10,Math.max(1,Vi(e.exaggeration,"exaggeration"))),cloudAmount:Math.min(1,Math.max(0,Vi(e.cloudAmount,"cloudAmount"))),atmosphere:Math.min(1.4,Math.max(0,Vi(e.atmosphere,"atmosphere"))),sunAzimuthDeg:Math.min(180,Math.max(-180,Vi(e.sunAzimuthDeg,"sunAzimuthDeg"))),renderMode:t,quality:i,adaptiveQuality:e.adaptiveQuality!==!1,autoRotate:!!e.autoRotate,camera:{position:n.position.map((s,a)=>Vi(s,`camera.position[${a}]`)),target:n.target.map((s,a)=>Vi(s,`camera.target[${a}]`))}}}function ny(r,e){return r===e}class ry{worker=new Worker(new URL(""+new URL("statistics.worker-CvInc0Mj.js",import.meta.url).href,import.meta.url),{type:"module"});latestId=0;resolvers=new Map;constructor(){this.worker.onmessage=e=>{const t=this.resolvers.get(e.data.id);if(t){this.resolvers.delete(e.data.id),t(ny(e.data.id,this.latestId)?e.data:null);for(const[i,n]of this.resolvers)i<this.latestId&&(n(null),this.resolvers.delete(i))}}}setTerrain(e){if(this.latestId+=1,typeof navigator<"u"&&navigator.webdriver&&e.manifest.width>1440)return;const t=e.values.slice();this.worker.postMessage({type:"init",values:t.buffer,width:e.manifest.width,height:e.manifest.height},[t.buffer])}calculate(e){const t=++this.latestId;return this.worker.postMessage({type:"calculate",id:t,seaLevelM:e}),new Promise(i=>this.resolvers.set(t,i))}}const Se=r=>{const e=document.getElementById(r);if(!e)throw new Error(`Missing #${r}`);return e},fo=Se("planet-canvas"),cu=Se("loading"),_c=Se("loading-detail"),sy=Se("fatal"),ay=Se("fatal-message"),ln=Se("export-status");let ze=structuredClone(ty),Kt,at,Mc=0;const Oo=new ry,oy=r=>`${r>=0?"+":""}${(r/1e3).toFixed(2)} km`,ly=r=>r>=1e6?`${(r/1e6).toFixed(2)} 百万 km³`:`${Math.round(r).toLocaleString()} km³`;function cy(){return new URLSearchParams(location.search).get("simulateWebgl2")==="0"?!1:!!document.createElement("canvas").getContext("webgl2",{failIfMajorPerformanceCaveat:!1})}function uu(r){cu.hidden=!0,sy.hidden=!1,ay.textContent=r instanceof Error?r.message:String(r)}function vr(r,e,t){Se(r).querySelectorAll("button").forEach(i=>{i.classList.toggle("active",i.dataset[e]===t)})}function hu(){Se("sea-level-value").value=oy(ze.seaLevelM),Se("exaggeration-value").value=`${ze.exaggeration}×`,Se("clouds-value").value=`${Math.round(ze.cloudAmount*100)}%`,Se("atmosphere-value").value=`${Math.round(ze.atmosphere*100)}%`,Se("sun-value").value=`${ze.sunAzimuthDeg}°`,Se("sea-level").value=String(ze.seaLevelM),Se("exaggeration").value=String(ze.exaggeration),Se("clouds").value=String(ze.cloudAmount),Se("atmosphere").value=String(ze.atmosphere),Se("sun").value=String(ze.sunAzimuthDeg),Se("auto-rotate").textContent=ze.autoRotate?"停止自转":"开始自转",Se("auto-rotate").setAttribute("aria-pressed",String(ze.autoRotate)),vr("modes","mode",ze.renderMode),vr("quality","quality",String(ze.quality)),ze.adaptiveQuality&&vr("quality","quality","auto")}function du(){window.clearTimeout(Mc),Mc=window.setTimeout(async()=>{const r=await Oo.calculate(ze.seaLevelM);r&&(Se("coverage").textContent=`${(r.coverage*100).toFixed(1)}%`,Se("volume").textContent=ly(r.volumeKm3))},80)}function Di(r,e=!1){ze=r,at.update(ze,e),Se("mesh-stats").textContent=`${at.triangleCount.toLocaleString()} tris`,Se("quality-note").textContent=at.qualityDetails,hu(),du()}function cr(r,e,t=!1){Se(r).addEventListener("input",i=>{const n=Number(i.currentTarget.value);Di({...ze,[e]:n},t)})}function uy(){cr("sea-level","seaLevelM"),cr("exaggeration","exaggeration",!0),cr("clouds","cloudAmount"),cr("atmosphere","atmosphere"),cr("sun","sunAzimuthDeg"),Se("presets").addEventListener("click",t=>{const i=t.target.dataset.preset;if(!i||!["dry","shallow","ocean"].includes(i))return;const s={dry:Kt.manifest.minM-50,shallow:-1500,ocean:0}[i];Di({...ze,seaLevelM:s,cloudAmount:i==="dry"?0:ze.cloudAmount,atmosphere:i==="dry"?0:ze.atmosphere}),vr("presets","preset",i)}),Se("modes").addEventListener("click",t=>{const i=t.target.dataset.mode;i&&Di({...ze,renderMode:i})}),Se("quality").addEventListener("click",t=>{const i=t.target.dataset.quality;if(i==="auto"){Di({...ze,adaptiveQuality:!0},!0);return}const n=Number(i);[64,128,192,384].includes(n)&&Di({...ze,quality:n,adaptiveQuality:!1},!0)}),Se("data-quality").addEventListener("click",async t=>{const i=t.target.dataset.data;i&&await fu(i==="hd")}),Se("locations").addEventListener("click",t=>{const i=t.target.dataset.location,s=i?{valles:{name:"水手峡谷",latitude:-12,longitude:290,distance:1.55},olympus:{name:"奥林帕斯山",latitude:18.65,longitude:226.2,distance:1.6},hellas:{name:"希腊盆地",latitude:-42,longitude:70,distance:1.8}}[i]:void 0;s&&(Di({...ze,autoRotate:!1,sunAzimuthDeg:Math.round(s.longitude-145)}),at.focusLocation(s.latitude,s.longitude,s.distance),Se("location-note").textContent=`已定位：${s.name} · ${s.latitude}°纬 / ${s.longitude}°东经，侧光已同步。可拖动观察；海平面与数据档位未改变。`)}),Se("pause").addEventListener("click",()=>{const t=Se("pause"),i=t.getAttribute("aria-pressed")!=="true";t.setAttribute("aria-pressed",String(i)),t.textContent=i?"继续":"暂停",at.setPaused(i)}),Se("auto-rotate").addEventListener("click",()=>Di({...ze,autoRotate:!ze.autoRotate}));const r=()=>{at.resetCamera(),Se("location-note").textContent="已复位全景，保留当前光照。地貌按钮不更改高程或海平面。"};Se("reset-camera").addEventListener("click",r),Se("screenshot").addEventListener("click",()=>{at.getCanvas().toBlob(t=>{t&&ho(t,`astra-mars-${Date.now()}.png`)},"image/png")}),Se("export-json").addEventListener("click",()=>{Pv({...ze,camera:at.getStateCamera()})}),Se("import-json").addEventListener("change",async t=>{const i=t.currentTarget.files?.[0];if(i)try{const n=iy(JSON.parse(await i.text()));Di(n,!0),at.camera.position.fromArray(n.camera.position),at.controls.target.fromArray(n.camera.target),ln.textContent="参数已验证并载入。"}catch(n){ln.textContent=`参数导入失败：${n instanceof Error?n.message:String(n)}`}}),Se("export-glb").addEventListener("click",async()=>{const t=Se("export-glb");t.disabled=!0,ln.textContent="正在烘焙位移几何并执行独立 GLB 重载验证…";try{const i=await Lv(at.getTerrainMesh(),Kt,{...ze,camera:at.getStateCamera()});ho(i.blob,"astra-mars-mola.glb"),ln.textContent=`GLB 已通过独立重载：${i.meshes} 网格，${i.textures} 个烘焙 PBR 纹理，${i.vertices.toLocaleString()} 地形顶点，${i.triangles.toLocaleString()} 总三角面，${(i.size/1048576).toFixed(2)} MiB。动态云、大气和海浪按标准格式边界省略，静态海面已包含。`}catch(i){ln.textContent=`GLB 导出失败：${i instanceof Error?i.message:String(i)}`}finally{t.disabled=!1}});const e=Se("panel-toggle");e.addEventListener("click",()=>{const i=Se("controls").classList.toggle("hidden");e.textContent=i?"显示控制":"隐藏控制",e.setAttribute("aria-expanded",String(!i))}),Se("retry").addEventListener("click",()=>location.reload()),fo.addEventListener("webglcontextlost",t=>{t.preventDefault(),uu(new Error("WebGL 上下文已丢失。请关闭高负载标签页后重试。"))}),fo.addEventListener("webglcontextrestored",()=>location.reload()),window.addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||(t.key===" "?(t.preventDefault(),Se("pause").click()):t.key.toLowerCase()==="r"&&r())})}let ls=0,ya=null,cs=null;async function fu(r){const e=r?"hd":"base";if(Se("data-quality").querySelector(`[data-data="${e}"]`)?.classList.contains("active"))return;if(ya===e&&cs)return cs;const i=++ls;ya=e,Se("data-version").textContent="loading…";const n=(async()=>{try{const s=await ru(`./data/mola-meg016-${e}-v1`);if(i!==ls)return;const a=ze.seaLevelM<=Kt.manifest.minM;Kt=s,Oo.setTerrain(s),ze={...ze,dataVersion:s.manifest.version,seaLevelM:a?s.manifest.minM-50:ze.seaLevelM},at.setTerrain(s),Di(ze),vr("data-quality","data",e),Se("data-version").textContent=`${s.manifest.width}×${s.manifest.height}`,ln.textContent=r?"高清高程已校验并启用。":"已切换到基础高程。"}catch(s){if(i!==ls)return;Se("data-version").textContent=`${Kt.manifest.width}×${Kt.manifest.height}`,ln.textContent=`高清包启用失败，继续使用当前数据：${s instanceof Error?s.message:String(s)}`}finally{i===ls&&(ya=null,cs=null)}})();return cs=n,n}async function hy(){if(!cy())throw new Error("此浏览器或设备未提供 WebGL2。请启用硬件加速后重试。");_c.textContent="读取 NASA MOLA 派生高程包",Kt=await ru(),Oo.setTerrain(Kt),ze.dataVersion=Kt.manifest.version,_c.textContent="构建真实位移网格、海洋与大气",await new Promise(e=>requestAnimationFrame(e)),at=new ey(fo,Kt,ze),at.setFrameCallback((e,t)=>{Se("fps").textContent=String(e),Se("quality-note").textContent=t}),Se("data-version").textContent=`${Kt.manifest.width}×${Kt.manifest.height}`,uy(),matchMedia("(max-width: 840px)").matches&&(Se("controls").classList.add("hidden"),Se("panel-toggle").textContent="显示控制",Se("panel-toggle").setAttribute("aria-expanded","false")),hu(),du(),Se("mesh-stats").textContent=`${at.triangleCount.toLocaleString()} tris`,cu.hidden=!0,(navigator.deviceMemory??4)>=8&&!navigator.webdriver&&!new URLSearchParams(location.search).has("noHd")&&window.setTimeout(()=>{fu(!0)},1200)}hy().catch(uu);window.__ASTRA_PLANET__={state:()=>ze,statistics:r=>Kt.statistics(r),renderer:()=>at.renderer,validateGeometry:()=>at.validateGeometry(),verifyGpuSamples:r=>at.verifyGpuSamples(r),framing:()=>at.getFraming(),focusLocation:(r,e,t)=>at.focusLocation(r,e,t),cameraClip:()=>({near:at.camera.near,far:at.camera.far,distance:at.camera.position.distanceTo(at.controls.target)}),microDetailLoaded:()=>at.hasMicroDetail()};
//# sourceMappingURL=index-Dqp7ZUE5.js.map

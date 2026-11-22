const fs=require("fs"),path=require("path");
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",Z=Buffer.alloc(0);
// Per-opcode stack effect, one char each: charCode-48=pops*4+pushes, '#'=unknown opcode.
const E="01146:;?########999999959995999#999#############04400###########58##############4414";
function go(pr,ip){
const n=pr.length,d=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),b=new Uint8Array(65536);
let sp=0,cp=0,pc=0,u=0,k=0,s=0;
const end=(x)=>[b.subarray(0,u),x];

for(;;){
if(s>999999)return end(10);
if(pc<0||pc>=n)return end(9);
const op=pr[pc];
if(op>83||E[op]=="#")return end(5);
const im=op==1?1:op==2?4:op>47&&op<52?2:0;
if(pc+im>=n)return end(9);
s++;
const w=pc+1+im,e=E.charCodeAt(op)-48;
if(sp<(e>>2))return end(2);
if(sp-(e>>2)+(e&3)>256)return end(3);
pc=w;

if(op>15&&op<35&&op!=23&&op!=27){
const y=d[sp-1],a=d[sp-2];
if(y==0&&op>18&&op<23)return end(4);
d[sp-2]=op==16?a+y:op==17?a-y:op==18?Math.imul(a,y):op==19?(a/y)|0:op==20?a%y:op==21?((a>>>0)/(y>>>0))|0:op==22?(a>>>0)%(y>>>0):op==24?a&y:op==25?a|y:op==26?a^y:op==28?a<<y:op==29?a>>y:op==30?a>>>y:op==32?+(a==y):op==33?+(a<y):+((a>>>0)<(y>>>0));
sp--;continue;
}

switch(op){
case 0:return end(0);
case 1:d[sp++]=(pr[w-1]<<24)>>24;break;
case 2:d[sp++]=pr[w-4]|pr[w-3]<<8|pr[w-2]<<16|pr[w-1]<<24;break;
case 3:sp--;break;
case 4:d[sp]=d[sp-1];sp++;break;
case 5:{const t=d[sp-1];d[sp-1]=d[sp-2];d[sp-2]=t;break;}
case 6:d[sp]=d[sp-2];sp++;break;
case 7:{const t=d[sp-3];d[sp-3]=d[sp-2];d[sp-2]=d[sp-1];d[sp-1]=t;break;}
case 23:d[sp-1]=-d[sp-1];break;
case 27:d[sp-1]=~d[sp-1];break;
case 48:case 49:case 50:{
const r=((pr[w-2]|pr[w-1]<<8)<<16)>>16;
if(op==48||(op==49?!d[--sp]:d[--sp]))pc=w+r;
break;}
case 51:if(cp>63)return end(7);c[cp++]=w;pc=pr[w-2]|pr[w-1]<<8;break;
case 52:if(!cp)return end(8);pc=c[--cp];break;
case 64:{const a=d[sp-1];if(a<0||a>255)return end(6);d[sp-1]=m[a];break;}
case 65:{const a=d[sp-1];if(a<0||a>255)return end(6);m[a]=d[sp-2];sp-=2;break;}
case 80:{const t=String(d[sp-1]);if(u+t.length>65536)return end(11);sp--;for(let i=0;i<t.length;i++)b[u++]=t.charCodeAt(i);break;}
case 81:if(u>65535)return end(11);b[u++]=d[--sp]&255;break;
case 82:d[sp++]=k<ip.length?ip[k++]:-1;break;
case 83:return end(d[--sp]&255);
}
}
}

for(const id of fs.readdirSync(I).sort()){
const dir=path.join(I,id);
if(!fs.statSync(dir).isDirectory())continue;
let out=Z,code=9;
try{
const pr=fs.readFileSync(path.join(dir,"program.bin"));
let ip;
try{ip=fs.readFileSync(path.join(dir,"input.bin"));}catch{ip=Z;}
[out,code]=go(pr,ip);
}catch{}
const dest=path.join(O,id);
fs.mkdirSync(dest,{recursive:true});
fs.writeFileSync(path.join(dest,"stdout.bin"),out);
fs.writeFileSync(path.join(dest,"exit.txt"),String(code));
}

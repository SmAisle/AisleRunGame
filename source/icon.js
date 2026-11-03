/* Draws icon-1024/512/192/180.png and cover.png from art.js. Run: node source/icon.js */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');(async()=>{const root=path.join(__dirname,'..'),b=await chromium.launch(),p=await b.newPage();await p.setContent('<canvas id=c></canvas>');await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'art.js'),'utf8')});
const out=(n,d)=>fs.writeFileSync(path.join(root,n),Buffer.from(d.split(',')[1],'base64'));
for(const s of [1024,512,192,180])out(`icon-${s}.png`,await p.evaluate(s=>{const c=document.getElementById('c');c.width=c.height=s;const g=c.getContext('2d');g.fillStyle='#f4efe1';g.fillRect(0,0,s,s);const f=s/1024;cartMark(g,s*.5+12*f,s*.5+40*f,4.2*f);return c.toDataURL('image/png')},s));
out('cover.png',await p.evaluate(()=>{const c=document.getElementById('c');c.width=1200;c.height=630;coverArt(c.getContext('2d'),1200,630);return c.toDataURL('image/png')}));await b.close()})()

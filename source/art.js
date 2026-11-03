/* Cover picture and icon: the cart in black, gold and cream. Used by the game's cover and by icon.js. */
function cartMark(g,cx,cy,s){var INK='#1a1814',HI='#ffe27a';g.save();g.translate(cx,cy);g.scale(s,s);g.lineCap='round';g.lineJoin='round';
 g.beginPath();g.moveTo(-66,-52);g.lineTo(84,-52);g.lineTo(66,-4);g.lineTo(-54,-4);g.closePath();g.fillStyle=HI;g.fill();g.strokeStyle=INK;g.lineWidth=7;g.stroke();
 g.lineWidth=3.5;for(var i=1;i<5;i++){g.beginPath();g.moveTo(-66+i*30,-52);g.lineTo(-54+i*24,-4);g.stroke()}g.beginPath();g.moveTo(-60,-28);g.lineTo(75,-28);g.stroke();
 g.lineWidth=7;g.beginPath();g.moveTo(-96,-74);g.lineTo(-72,-74);g.lineTo(-50,14);g.lineTo(62,14);g.stroke();
 [-38,50].forEach(function(a){g.beginPath();g.arc(a,34,11,0,7);g.fillStyle='#fffdf6';g.fill();g.strokeStyle=INK;g.lineWidth=6;g.stroke()});g.restore()}
function coverArt(g,w,h){var INK='#1a1814',f=h*.5/100;g.fillStyle='#f4efe1';g.fillRect(0,0,w,h);g.strokeStyle=INK;g.lineWidth=Math.max(1.5,h/90);g.strokeRect(1,1,w-2,h-2);
 var y=h*.84;g.fillStyle='rgba(26,24,20,.12)';for(var i=8;i<h;i+=7)g.fillRect(0,i,w,.6);g.strokeStyle=INK;g.lineWidth=Math.max(1.5,h/110);g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();
 /* hanging aisle signs */
 [.62,.88].forEach(function(p,k){var x=w*p,sw=h*.3,sh=h*.2;g.fillStyle=INK;g.fillRect(x-sw*.32,0,1.5,h*.09);g.fillRect(x+sw*.32,0,1.5,h*.09);g.fillStyle='#fffdf6';g.fillRect(x-sw/2,h*.09,sw,sh);g.strokeStyle=INK;g.lineWidth=Math.max(1.5,h/110);g.strokeRect(x-sw/2,h*.09,sw,sh);g.fillStyle=INK;g.font='900 '+Math.round(sh*.62)+'px Playfair Display,Georgia,serif';g.textAlign='center';g.fillText(k+1,x,h*.09+sh*.74);g.textAlign='left'});
 cartMark(g,w*.31,y-(45*f*1.05),f*1.05)}

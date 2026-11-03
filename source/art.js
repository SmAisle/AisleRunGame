/* Cover picture and icon: the cart in black, gold and cream. Used by the game's cover and by icon.js. */
function cartMark(g,cx,cy,s){var GD='#c9a961',CR='#f4efe1';g.save();g.translate(cx,cy);g.scale(s,s);g.lineCap='round';g.lineJoin='round';
 g.strokeStyle=CR;g.lineWidth=7;g.beginPath();g.moveTo(-96,-74);g.lineTo(-72,-74);g.lineTo(-50,14);g.lineTo(62,14);g.stroke();
 g.beginPath();g.moveTo(-66,-52);g.lineTo(84,-52);g.lineTo(66,-4);g.lineTo(-54,-4);g.closePath();g.strokeStyle=GD;g.lineWidth=7;g.stroke();
 g.lineWidth=3;for(var i=1;i<5;i++){g.beginPath();g.moveTo(-66+i*30,-52);g.lineTo(-54+i*24,-4);g.stroke()}g.beginPath();g.moveTo(-60,-28);g.lineTo(75,-28);g.stroke();
 [-38,50].forEach(function(a){g.beginPath();g.arc(a,34,11,0,7);g.strokeStyle=CR;g.lineWidth=6;g.stroke()});g.restore()}
function coverArt(g,w,h){var GD='#c9a961',CR='#f4efe1',f=h*.5/100;g.fillStyle='#17150f';g.fillRect(0,0,w,h);var m=Math.round(Math.min(w,h)*.035)+.5;g.strokeStyle=GD;g.lineWidth=Math.max(1,h/150);g.strokeRect(m,m,w-2*m,h-2*m);
 var y=h*.84;g.strokeStyle=GD;g.lineWidth=Math.max(1,h/110);g.beginPath();g.moveTo(m*3,y);g.lineTo(w-m*3,y);g.stroke();
 /* the list: eight stops down the aisle, the first few taken */
 var n=8,x0=w*.56,dx=(w-m*5-x0)/(n-1);for(var i=0;i<n;i++){g.beginPath();g.arc(x0+i*dx,y-h*.085,h*.024,0,7);if(i<3){g.fillStyle=GD;g.fill()}else{g.strokeStyle=CR;g.lineWidth=Math.max(1,h/180);g.stroke()}}
 cartMark(g,w*.31,y-(45*f*1.05),f*1.05)}

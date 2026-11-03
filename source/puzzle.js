/* Daily store. The board, list, traps and surprise come only from the store number, weekday and store. Nothing from the device. */
var BW=[1,2,3,4,4,4,4,4,4,1],ROWS=8;
function kids(l,i){if(l===8)return [0];if(l>=3)return [i-1,i,i+1].filter(function(j){return j>=0&&j<4});var k=BW[l+1]>BW[l]?[i,i+1]:[i-1,i];return k.filter(function(j){return j>=0&&j<BW[l+1]})}
function rng(a){return function(){a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
function shuf(a,r){for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function firstRoute(){var s=[0];for(var k=1;k<=8;k++)s[k]=kids(k-1,s[k-1])[0];return s}
var FAM=[['Apple','Pear','Peach','Plum','Tomato','Orange','Lemon','Cherries','Strawberry','Kiwi'],['Banana','Corn','Pineapple','Melon','Coconut','Grapes','Blueberries'],['Carrot','Broccoli','Lettuce','Cucumber','Pepper','Pickles','Eggplant'],['Onion','Garlic','Potato','Mushroom','Egg'],['Milk','Cheese','Butter','Yogurt','Ice cream','Flour'],['Fish','Steak','Chicken','Bacon','Shrimp','Sausage'],['Bread','Croissant','Bagel','Pretzel','Pie','Cake','Cookie','Donut','Cupcake'],['Soda','Juice','Coffee','Tea','Olive oil'],['Jam','Honey','Ketchup','Mustard','Salt','Soup'],['Cereal','Pasta','Rice','Chips','Popcorn','Candy','Pizza']];
STORES.grocery={key:'grocery',label:'Grocery',title:'smAisle Market',texter:'Mom',short:{'Olive oil':'Oil'},fam:FAM,I:I};
var CUR;function setStore(k){CUR=STORES[k];CUR.all=CUR.all||Object.keys(CUR.I);if(!CUR.seed){CUR.seed=0;for(var i=0;i<k.length;i++)CUR.seed=Math.imul(CUR.seed,31)+k.charCodeAt(i)|0}}
function fam(n){return CUR.fam.filter(function(f){return f.indexOf(n)>=0})[0]||[]}
/* Difficulty runs through the week. dow: Monday 0 to Sunday 6.
   pLook = chance a wrong tile looks like the right item. Otherwise pList = chance it is a list item from another row.
   A wrong tile the cart can actually reach gets more of the list-item traps. */
function hardness(dow){var h=dow/6;return {pList:.06+.84*h,pLook:.3+.4*h}}
function make(n,dow){var r=rng(Math.imul(n,2654435761)^CUR.seed),H=hardness(dow),pool=shuf(CUR.all.slice(),r),list=pool.slice(0,8),rest=pool.slice(8),q=0,sol=[0],tiles={};
 for(var l=1;l<=8;l++){var k=kids(l-1,sol[l-1]);if(l>=4)k=k.filter(function(j){return j===1||j===2});sol[l]=k[Math.floor(r()*k.length)]}
 for(l=1;l<=8;l++){var like=shuf(fam(list[l-1]).filter(function(x){return x!==list[l-1]}),r),lk=0,near=kids(l-1,sol[l-1]);for(var i=0;i<BW[l];i++){if(i===sol[l]){tiles[l+','+i]=list[l-1];continue}var t,seen=true,g=0,pl=H.pList*(near.indexOf(i)>=0?1.5:.7);while(seen){g++;var u=r();if(g<9&&u<H.pLook&&lk<like.length)t=like[lk++];else if(g<9&&r()<pl)t=list[Math.floor(r()*8)];else t=rest[q++%rest.length];seen=t===list[l-1];for(var j=0;j<i;j++)if(tiles[l+','+j]===t)seen=true}tiles[l+','+i]=t}}
 /* The day's surprise: Mom's text or price checks, by seed, never both. */
 var mode=r()<.5?'mom':'pc',need=list.slice(),swap=null;
 if(mode==='mom'){var row=5+Math.floor(r()*3),fr=list[row-1],cand=fam(fr).filter(function(x){return list.indexOf(x)<0}),to=cand.length?cand[Math.floor(r()*cand.length)]:rest[0];need[row-1]=to;var ws=kids(row-1,sol[row-1]).filter(function(j){return j!==sol[row]}),q2;tiles[row+','+sol[row]]=to;for(q2=0;q2<BW[row];q2++)if(q2!==sol[row]&&tiles[row+','+q2]===to)tiles[row+','+q2]=rest[q++%rest.length];tiles[row+','+ws[Math.floor(r()*ws.length)]]=fr;swap={row:row,from:fr,to:to}}
 /* no item twice in one row; the right tile and Mom's trap stay put */
 for(l=1;l<=8;l++){var used={};used[tiles[l+','+sol[l]]]=1;var trapI=-1;if(swap&&swap.row===l){for(i=0;i<BW[l];i++)if(i!==sol[l]&&tiles[l+','+i]===swap.from&&kids(l-1,sol[l-1]).indexOf(i)>=0){trapI=i;break}if(trapI>=0)used[swap.from]=1}for(i=0;i<BW[l];i++){if(i===sol[l]||i===trapI)continue;var tt=tiles[l+','+i];while(used[tt]||tt===need[l-1])tt=rest[q++%rest.length];tiles[l+','+i]=tt;used[tt]=1}}
 return {n:n,list:list,need:need,swap:swap,mode:mode,sol:sol,t:tiles}}

const myModule=(()=>{"use strict";let e=["C","D","H","S"],t=["A","J","Q","K"],l=[],n=[],r=document.querySelector("#btnAsk"),s=document.querySelector("#btnStop"),d=document.querySelector("#btnNew"),i=document.querySelectorAll("small"),o=document.querySelectorAll(".divCards"),a=(e=2)=>{l=[],l=c(),n=[];for(let t=0;t<e;t++)n.push(0),i[t].innerText=0,o[t].innerHTML="";r.disabled=!1,s.disabled=!1},c=()=>{l=[];for(let n=2;n<=10;n++)for(let r of e)l.push(n+r);for(let s of e)for(let d of t)l.push(d+s);return _.shuffle(l)},u=()=>0===l.length?function(){throw"There are no cards in the deck"}():l.pop(),$=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},f=(e,t)=>(n[t]+=$(e),i[t].innerText=n[t],n[t]),b=(e,t)=>{let l=document.createElement("img");l.src=`assets/cards/${e}.png`,l.classList.add("cards"),o[t].append(l)},h=()=>{let[e,t]=n;setTimeout(()=>{t===e?alert("Nobody wins :("):e>21?alert("Computer wins"):t>21?alert("Player wins"):t>e&&t<=21?alert("Computer wins"):alert("Player wins")},50)},p=e=>{let t=0;do{let l=u();t=f(l,n.length-1),b(l,n.length-1)}while(t<e&&e<=21);h()};return r.addEventListener("click",function(){let e=u(),t=f(e,0);b(e,0),t>21?(r.disabled=!0,s.disabled=!0,p(t)):21===t&&(r.disabled=!0,s.disabled=!0,p(t))}),s.addEventListener("click",function(){r.disabled=!0,s.disabled=!0,p(n[0])}),d.addEventListener("click",function(){a()}),{newGame:a}})();
// scenes.js = the CONTENT for one explainer (this repo's public example: Patel 2024).
// Swap this file to explain a different paper; player.html (the engine) stays untouched.
//
// Page meta for this explainer (engine reads window.META; safe to omit).
window.META={
  docTitle:"Patel 2024 - narrated explainer",
  heading:"How eye flicks tell Parkinson's from PSP",
  byline:"Patel et al. 2024 · narrated by Kokoro",
  audioExt:"mp3"   // this repo ships committed mp3 audio for the live demo; local `node generate.mjs` emits wav (drop this line or set "wav")
};

// Scene CONTENT (swappable). Build fns receive the PE toolkit from the engine.
window.SCENES=[
  {eyebrow:'The hook',title:'Two patients',caption:'Two patients, same symptoms. One has <span class="pd">Parkinson\'s</span> — decades ahead. One has <span class="psp">PSP</span> — aggressive, and the usual drugs barely work.',
   build:function(PE){var f=document.createElement('div');f.className='fig';
     f.innerHTML='<div class="person"><div class="head2" style="border-color:var(--pd);color:var(--pd)"><div class="eyes"><i></i><i></i></div></div><div class="plabel" style="color:var(--pd)">Parkinson\'s</div><div class="fate">treatable · slow · decades</div></div>'+
     '<div class="vs">same<br>symptoms</div>'+
     '<div class="person"><div class="head2" style="border-color:var(--psp);color:var(--psp)"><div class="eyes"><i></i><i></i></div></div><div class="plabel" style="color:var(--psp)">PSP</div><div class="fate">aggressive · drug-resistant</div></div>';
     PE.stage.appendChild(f);}},
  {eyebrow:'The problem',title:'They look identical',caption:'Early on, even expert neurologists <b>can\'t tell them apart</b>. The real answer only shows up years later — too late to matter.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;function draw(t){x.clearRect(0,0,w,h);PE.grid(x,w,h);
     var midY=h*0.5,amp=h*0.16,span=w*0.62,x0=w*0.19;
     for(var k=0;k<2;k++){var pts=[];for(var i=0;i<=60;i++){var tt=i/60;pts.push([x0+tt*span,midY-(PE.saccadeY(tt,7+k*0.4)-0.5)*2*amp+Math.sin(tt*9+k)*1.5]);}PE.line(x,pts,k?'rgba(242,165,78,.85)':'rgba(79,191,214,.85)',2.4,10);}
     var a=0.4+0.6*Math.abs(Math.sin(t*2));x.save();x.globalAlpha=a;x.fillStyle='#eaf0f6';x.font='700 '+Math.round(h*0.16)+'px '+PE.sans;x.textAlign='center';x.textBaseline='middle';x.fillText('?',w*0.5,midY-amp*1.8);x.restore();}
     if(PE.reduce)draw(0);else PE.loop(draw);}},
  {eyebrow:'The eyes',title:'A saccade',caption:'The eyes betray it: PSP hits the eye-movement system hardest. A <b>saccade</b> is the fast flick between points — we record its exact motion.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;var eyeY=h*0.30,lx=w*0.30,rx=w*0.70,gx=lx,target=rx,moving=false,lastSwitch=0,sacc=0;
     var trace=[],gY=h*0.66,gH=h*0.22,gx0=w*0.14,gW=w*0.72;
     function draw(t){x.clearRect(0,0,w,h);[lx,rx].forEach(function(px){x.save();x.fillStyle='rgba(255,255,255,.18)';x.beginPath();x.arc(px,eyeY,7,0,7);x.fill();x.restore();});
       if(t-lastSwitch>1.1){lastSwitch=t;moving=true;sacc=0;target=(target===rx?lx:rx);}
       if(moving){sacc+=0.09;var e=PE.smoother(Math.min(sacc,1));var from=(target===rx?lx:rx);gx=from+(target-from)*e;if(sacc>=1)moving=false;}
       x.save();x.shadowColor='#f2a54e';x.shadowBlur=18;x.fillStyle='#ffd6a0';x.beginPath();x.arc(gx,eyeY,10,0,7);x.fill();x.restore();
       x.save();x.fillStyle='#8b98a8';x.font='11px '+PE.mono;x.textAlign='center';x.fillText('gaze',gx,eyeY-20);x.restore();
       trace.push((gx-lx)/(rx-lx));if(trace.length>140)trace.shift();
       x.save();x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=1;x.strokeRect(gx0,gY,gW,gH);x.restore();
       var pts=[];for(var i=0;i<trace.length;i++)pts.push([gx0+(i/139)*gW,gY+gH-trace[i]*gH]);if(pts.length>1)PE.line(x,pts,'#f2a54e',2.2,10);
       x.save();x.fillStyle='#5a6675';x.font='10px '+PE.mono;x.textAlign='left';x.fillText('eye position over time  →  the "waveform"',gx0,gY-8);x.restore();}
     if(PE.reduce){for(var i=0;i<140;i++)trace.push(i<70?0:1);draw(0.01);}else PE.loop(draw);}},
  {eyebrow:'The overlap',title:'Numbers overlap',caption:'Measure just <b>how fast</b> the flick went? On average PSP is slower — but the ranges <b>overlap</b>. One patient\'s number can\'t call it.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;
     function bell(cx,spread,peak,base,color,px0,pw){var pts=[];for(var i=0;i<=80;i++){pts.push([px0+(i/80)*pw,base-Math.exp(-Math.pow((i/80-cx)/spread,2))*peak]);}PE.line(x,pts,color,2.4,10);
       x.save();x.globalAlpha=.14;x.fillStyle=color;x.beginPath();x.moveTo(pts[0][0],base);pts.forEach(function(p){x.lineTo(p[0],p[1]);});x.lineTo(pts[pts.length-1][0],base);x.fill();x.restore();}
     function draw(t){x.clearRect(0,0,w,h);PE.grid(x,w,h);var base=h*0.74,px0=w*0.12,pw=w*0.76,peak=h*0.42;
       bell(0.38,0.14,peak,base,'#4fbfd6',px0,pw);bell(0.60,0.15,peak*0.94,base,'#f2a54e',px0,pw);
       var qx=px0+0.49*pw,a=0.5+0.5*Math.sin(t*3);
       x.save();x.setLineDash([5,5]);x.strokeStyle='rgba(255,255,255,'+(0.3+0.3*a)+')';x.beginPath();x.moveTo(qx,h*0.16);x.lineTo(qx,base);x.stroke();x.restore();
       x.save();x.fillStyle='#eaf0f6';x.shadowColor='#fff';x.shadowBlur=12*a;x.beginPath();x.arc(qx,base-peak*0.55,7,0,7);x.fill();x.restore();
       x.save();x.fillStyle='#8b98a8';x.font='11px '+PE.mono;x.textAlign='center';x.fillText('this patient = ?',qx,base-peak*0.55-16);
       x.fillStyle='#4fbfd6';x.textAlign='left';x.fillText('Parkinson\'s',px0,base+18);x.fillStyle='#f2a54e';x.textAlign='right';x.fillText('PSP',px0+pw,base+18);
       x.fillStyle='#5a6675';x.textAlign='center';x.fillText('saccade speed  →',w*0.5,base+18);x.restore();}
     if(PE.reduce)draw(0);else PE.loop(draw);}},
  {eyebrow:'The insight',title:'Shape, not a number',caption:'Patel\'s move: a saccade isn\'t a number, it\'s a <b>shape</b>. Squeezing it to "peak speed" is like naming a song by its loudest note.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;var reveal=0;
     function draw(){x.clearRect(0,0,w,h);PE.grid(x,w,h);var midY=h*0.52,amp=h*0.24,span=w*0.66,x0=w*0.17;reveal=Math.min(reveal+(PE.reduce?1:0.012),1);
       var pts=[],n=Math.floor(70*reveal);for(var i=0;i<=n;i++){var tt=i/70;pts.push([x0+tt*span,midY-(PE.saccadeY(tt,7)-0.5)*2*amp]);}if(pts.length>1)PE.line(x,pts,'#f2a54e',3,14);
       var pv=[x0+0.5*span,midY-amp*0.02];x.save();x.fillStyle='#eaf0f6';x.beginPath();x.arc(pv[0],pv[1],6,0,7);x.fill();
       x.strokeStyle='rgba(255,255,255,.3)';x.setLineDash([4,4]);x.beginPath();x.moveTo(pv[0],pv[1]);x.lineTo(pv[0],h*0.86);x.stroke();x.restore();
       x.save();x.font='11px '+PE.mono;x.textAlign='center';x.fillStyle='#8b98a8';x.fillText('old way: one number',pv[0],h*0.9);
       x.fillStyle='#f2a54e';x.textAlign='left';x.fillText('Patel: the whole shape',x0,midY-amp-14);x.restore();}
     PE.loop(draw);}},
  {eyebrow:'Three experts',title:'The forgers',caption:'The trick: three "forgers" — one studied only <span class="pd">PD</span> curves, one only <span class="psp">PSP</span>, one only <span class="hc">healthy</span>. A new curve comes in; whoever <b>redraws it best</b> wins.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;var pr=0;
     var experts=[{c:'#4fbfd6',n:'PD forger',steep:6.2,ok:false},{c:'#f2a54e',n:'PSP forger',steep:3.4,ok:true},{c:'#b98cd0',n:'Healthy forger',steep:9,ok:false}];
     function draw(){x.clearRect(0,0,w,h);pr=Math.min(pr+(PE.reduce?1:0.01),1);var colW=w/3,pad=colW*0.12,top=h*0.16,gh=h*0.4;
       for(var e=0;e<3;e++){var cx0=e*colW+pad,cw=colW-pad*2;
         x.save();x.strokeStyle='rgba(255,255,255,.10)';x.lineWidth=1;x.strokeRect(cx0,top,cw,gh);x.restore();
         var truth=[];for(var i=0;i<=50;i++){var tt=i/50;truth.push([cx0+tt*cw,top+gh-PE.saccadeY(tt,3.4)*gh]);}PE.line(x,truth,'rgba(255,255,255,.5)',2,0);
         var att=[],n=Math.floor(50*pr);for(var j=0;j<=n;j++){var t2=j/50;att.push([cx0+t2*cw,top+gh-PE.saccadeY(t2,experts[e].steep)*gh]);}if(att.length>1)PE.line(x,att,experts[e].c,2.6,10);
         if(pr>0.98){x.save();x.globalAlpha=.16;x.fillStyle=experts[e].ok?experts[e].c:'#ff5d5d';x.beginPath();x.moveTo(truth[0][0],truth[0][1]);
           for(var k=0;k<truth.length;k++)x.lineTo(truth[k][0],truth[k][1]);for(var m=att.length-1;m>=0;m--)x.lineTo(att[m][0],att[m][1]);x.closePath();x.fill();x.restore();}
         x.save();x.textAlign='center';x.font='11px '+PE.mono;x.fillStyle=experts[e].c;x.fillText(experts[e].n,cx0+cw/2,top-8);
         if(pr>0.98){x.font='700 12px '+PE.sans;x.fillStyle=experts[e].ok?experts[e].c:'#5a6675';x.fillText(experts[e].ok?'✓ best match':'high error',cx0+cw/2,top+gh+20);}x.restore();}
       x.save();x.textAlign='center';x.fillStyle='#8b98a8';x.font='12px '+PE.sans;x.fillText('same mystery curve given to all three — lowest redraw error = the diagnosis',w/2,h*0.93);x.restore();}
     PE.loop(draw);}},
  {eyebrow:'Many saccades',title:'Vote across all',caption:'Each saccade gets scored <b>once</b> — the 3 forgers redraw it, lowest error wins that one. Then pool all ~48 and take the <b>majority</b>.',
   build:function(PE){var wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:8% 8% 12%';
     var g=document.createElement('div');g.style.cssText='display:grid;grid-template-columns:repeat(12,1fr);gap:7px;width:min(70%,520px)';
     var cols=['#f2a54e','#4fbfd6','#b98cd0'];
     for(var i=0;i<48;i++){var s=document.createElement('span');var r=(i*0.6180339887)%1;var ix=r<0.66?0:(r<0.85?1:2);
       s.style.cssText='width:100%;aspect-ratio:1;border-radius:50%;background:'+cols[ix]+';opacity:0;transform:scale(.4);transition:.4s ease '+(i*0.02)+'s;box-shadow:0 0 8px '+cols[ix];g.appendChild(s);}
     var label=document.createElement('div');label.style.cssText='font-family:var(--mono);font-size:13px;color:#8b98a8;text-align:center';label.innerHTML='48 saccades scored &nbsp;→&nbsp; verdict: <b style="color:#f2a54e">PSP</b>';
     var sub=document.createElement('div');sub.style.cssText='font-family:var(--mono);font-size:11px;color:#5a6675';sub.textContent='each dot = one saccade\'s guess';
     wrap.appendChild(g);wrap.appendChild(sub);wrap.appendChild(label);PE.stage.appendChild(wrap);
     requestAnimationFrame(function(){[].forEach.call(g.children,function(s){s.style.opacity=1;s.style.transform='scale(1)';});});}},
  {eyebrow:'Calibration-free',title:'Shape survives',caption:'Because only the <b>shape</b> matters — not its size on screen — you skip the fussy eye-tracker calibration. Patel dreams of doing this on a phone.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;
     function shape(cx,cy,sc,color){var pts=[];for(var i=0;i<=50;i++){var tt=i/50;pts.push([cx+(tt-0.5)*sc*w*0.4,cy-(PE.saccadeY(tt,4)-0.5)*sc*h*0.34]);}PE.line(x,pts,color,2.6,10);}
     function draw(t){x.clearRect(0,0,w,h);PE.grid(x,w,h);shape(w*0.3,h*0.5,0.7+0.3*Math.sin(t*1.3),'#f2a54e');shape(w*0.7,h*0.5,1.3-0.3*Math.sin(t*1.3),'#f2a54e');
       x.save();x.textAlign='center';x.fillStyle='#8b98a8';x.font='12px '+PE.mono;x.fillText('different size · same shape · same diagnosis',w/2,h*0.86);x.restore();}
     if(PE.reduce)draw(0.5);else PE.loop(draw);}},
  {eyebrow:'The result',title:'Shape wins',caption:'Telling new Parkinson\'s from PSP: the <b>shape method scored 0.94</b>. The old numbers method — 0.75. (1.0 = perfect, 0.5 = coin flip.)',
   build:function(PE){var wrap=document.createElement('div');wrap.className='barrow';
     wrap.innerHTML='<div style="font-family:var(--mono);font-size:11px;color:#5a6675;letter-spacing:.1em;text-transform:uppercase;margin-bottom:2px">separating new Parkinson\'s vs PSP · AUROC</div>'+
     '<div class="bar"><span class="bl">Shape (Patel)</span><span class="track"><span class="val" style="background:linear-gradient(90deg,#f2a54e,#ffd59a)"></span></span><span class="sc" style="color:#f2a54e">.94</span></div>'+
     '<div class="bar"><span class="bl">Old numbers</span><span class="track"><span class="val" style="background:rgba(255,255,255,.28)"></span></span><span class="sc" style="color:#8b98a8">.75</span></div>'+
     '<div class="bar"><span class="bl" style="color:#5a6675">coin flip</span><span class="track"><span class="val" style="background:rgba(255,255,255,.1)"></span></span><span class="sc" style="color:#5a6675">.50</span></div>';
     PE.stage.appendChild(wrap);var vals=[0.94,0.75,0.50];requestAnimationFrame(function(){var b=wrap.querySelectorAll('.val');for(var i=0;i<b.length;i++)b[i].style.width=(vals[i]*100)+'%';});}},
  {eyebrow:'The frontier',title:'Diagnosis → prognosis',caption:'Patel answers "<b>which disease, today</b>." It never asks "what happens <b>tomorrow</b>." Turning diagnosis into <span class="psp">prognosis</span> is the open frontier.',
   build:function(PE){var d=PE.mkCanvas(),x=d.x,w=d.w,h=d.h;var pr=0;
     function draw(){x.clearRect(0,0,w,h);pr=Math.min(pr+(PE.reduce?1:0.012),1);var y=h*0.42,x0=w*0.12,x1=w*0.88;
       x.save();x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=2;x.beginPath();x.moveTo(x0,y);x.lineTo(x1,y);x.stroke();x.restore();
       function node(px,color,lab,sub){x.save();x.fillStyle=color;x.shadowColor=color;x.shadowBlur=12;x.beginPath();x.arc(px,y,9,0,7);x.fill();
         x.shadowBlur=0;x.textAlign='center';x.fillStyle=color;x.font='700 12px '+PE.sans;x.fillText(lab,px,y-20);x.fillStyle='#8b98a8';x.font='10px '+PE.mono;x.fillText(sub,px,y+26);x.restore();}
       node(x0+(x1-x0)*0.1,'#4fbfd6','Visit 1','Patel stops here');
       x.save();x.strokeStyle='rgba(79,191,214,.5)';x.setLineDash([4,4]);x.strokeRect(x0,y-h*0.13,(x1-x0)*0.24,h*0.26);x.fillStyle='rgba(79,191,214,.8)';x.font='10px '+PE.mono;x.textAlign='left';x.fillText('DIAGNOSIS (solved)',x0+4,y-h*0.13-6);x.restore();
       if(pr>0.3){var fx=x0+(x1-x0)*(0.34+0.5*Math.min((pr-0.3)/0.7,1));x.save();x.globalAlpha=Math.min((pr-0.3)/0.3,1);
         node(fx,'#f2a54e','?','future: decline · falls · survival');x.setLineDash([6,6]);x.strokeStyle='rgba(242,165,78,.6)';x.beginPath();x.moveTo(x0+(x1-x0)*0.24,y);x.lineTo(fx,y);x.stroke();
         x.fillStyle='rgba(242,165,78,.9)';x.font='700 11px '+PE.mono;x.textAlign='left';x.fillText('PROGNOSIS (open frontier)',x0+(x1-x0)*0.30,y+h*0.17);x.restore();}
       if(pr>0.98){x.save();x.textAlign='center';x.fillStyle='#eaf0f6';x.font='600 '+Math.round(h*0.055)+'px '+PE.sans;x.fillText('from "what is it?" to "what happens next?"',w/2,h*0.66);x.restore();}}
     PE.loop(draw);}}
];

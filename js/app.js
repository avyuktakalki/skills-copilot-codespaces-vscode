// mini/interactive-yes-no/js/app.js
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const controls = document.querySelector('.controls');

// Keep track if no button is disabled/vanished
let noActive = true;

// Utility: random integer in range
function r(min,max){return Math.floor(Math.random()*(max-min+1))+min}

// Move the no button to a new safe position inside the card
function moveNoAway(cursorX,cursorY){
  if(!noActive) return;
  const rect = controls.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;
  // pick several candidate positions and choose one far from cursor
  const candidates = [];
  for(let i=0;i<10;i++){
    const x = r(padding, Math.max(20, Math.floor(rect.width - btnRect.width - padding)));
    const y = r(padding, Math.max(0, Math.floor(rect.height - btnRect.height - padding)));
    candidates.push({x,y});
  }
  // compute distance and pick farthest from cursor
  let best = candidates[0];
  let bestD = -1;
  candidates.forEach(c=>{
    const globalX = rect.left + c.x + btnRect.width/2;
    const globalY = rect.top + c.y + btnRect.height/2;
    const dx = globalX - cursorX;
    const dy = globalY - cursorY;
    const d = Math.hypot(dx,dy);
    if(d>bestD){bestD=d;best=c}
  });
  // apply position (relative to controls)
  noBtn.style.left = `${best.x + btnRect.width/2}px`;
  noBtn.style.top = `${best.y}px`;
  // small random scale shrink so it feels playful
  noBtn.style.transform = `translate(-50%,0) scale(${(r(80,100)/100)})`;
}

// When the mouse moves, if it gets near the no button, move it
window.addEventListener('mousemove', (e)=>{
  if(!noActive) return;
  const nb = noBtn.getBoundingClientRect();
  const nx = nb.left + nb.width/2;
  const ny = nb.top + nb.height/2;
  const dist = Math.hypot(nx - e.clientX, ny - e.clientY);
  // threshold depends on button size
  const threshold = Math.max(110, nb.width*1.6);
  if(dist < threshold){
    moveNoAway(e.clientX, e.clientY);
  }
});

// On hover, shrink the no button slightly (finger tease)
noBtn.addEventListener('mouseenter', ()=>{
  if(!noActive) return;
  noBtn.style.transform = 'translate(-50%,0) scale(0.88)';
});
noBtn.addEventListener('mouseleave', ()=>{
  if(!noActive) return;
  noBtn.style.transform = 'translate(-50%,0) scale(1)';
});

// Click the no button: it vanishes and yes grows
noBtn.addEventListener('click', ()=>{
  if(!noActive) return;
  noActive = false;
  // animate vanish
  noBtn.style.transition = 'transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms';
  noBtn.style.transform = 'translate(-50%,0) scale(0.02)';
  noBtn.style.opacity = '0';
  // enlarge yes
  yesBtn.style.transition = 'transform 520ms cubic-bezier(.2,.8,.2,1), box-shadow 520ms';
  yesBtn.style.transform = 'scale(1.6)';
  yesBtn.style.boxShadow = '0 18px 40px rgba(0,0,0,0.28)';
  // after animation, remove no button
  setTimeout(()=>{
    noBtn.style.display = 'none';
  },520);
});

// Click yes button: if only yes is present (or even if both), show final message
yesBtn.addEventListener('click', ()=>{
  // grow slightly for feedback
  yesBtn.style.transform = 'scale(1.1)';
  setTimeout(()=>{
    yesBtn.style.transform = 'scale(1)';
  },180);
  // Show message
  message.hidden = false;
  message.classList.add('show');
});

// Initial positioning: place no button offset to the right
function init(){
  // make controls a placement area
  const rect = controls.getBoundingClientRect();
  // set initial left so absolute positioning centers correctly
  noBtn.style.left = `${rect.width/2 + 80}px`;
  noBtn.style.top = `0px`;
  noBtn.style.transform = 'translate(-50%,0) scale(1)';
}

window.addEventListener('load', init);
window.addEventListener('resize', ()=>{
  // reset position on resize so it stays inside
  if(noActive){
    noBtn.style.left = '';
    noBtn.style.top = '';
    init();
  }
});

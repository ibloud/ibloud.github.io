/* Halo-only motion: no requests, tracking or persistence. */
const button=document.getElementById('dd-motion');
if(button){button.hidden=false;button.addEventListener('click',()=>{const paused=document.body.classList.toggle('dd-paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Resume halo motion':'Pause halo motion';});}

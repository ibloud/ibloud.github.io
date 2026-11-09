// Optional local text-size control. Theme comes from the existing portfolio settings.
const body=document.querySelector('body.series-pitch');
if(body){document.querySelector('.pitch-reading').hidden=false;document.querySelector('#pitch-size').addEventListener('click',e=>{const large=e.currentTarget.getAttribute('aria-pressed')!=='true';body.dataset.large=String(large);e.currentTarget.setAttribute('aria-pressed',String(large));});}

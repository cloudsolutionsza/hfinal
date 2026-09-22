
(function(){
 var b=document.querySelector('.menu-btn'),n=document.querySelector('.nav');
 if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
 var ENDPOINT=(document.querySelector('meta[name="newsletter-endpoint"]')||{}).content||'';
 document.querySelectorAll('form.signup').forEach(function(f){
  var msg=f.parentElement.querySelector('.form-msg');
  f.addEventListener('submit',function(e){
   e.preventDefault();
   var email=f.email.value.trim();
   if(f.website&&f.website.value){return}
   if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){msg.className='form-msg err';msg.textContent='Enter a valid email address, for example name@example.com.';return}
   if(!ENDPOINT){msg.className='form-msg err';msg.textContent='Sign-up is not connected yet. Please try again soon.';return}
   var btn=f.querySelector('button');btn.disabled=true;msg.className='form-msg';msg.textContent='Subscribing...';
   fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email:email,source:location.pathname})})
    .then(function(r){if(!r.ok)throw 0;msg.className='form-msg ok';msg.textContent='You are in. Thank you for subscribing.';f.reset()})
    .catch(function(){msg.className='form-msg err';msg.textContent='Something went wrong. Check your connection and try again.'})
    .then(function(){btn.disabled=false});
  });
 });
})();

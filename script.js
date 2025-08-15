
function initReplies(key){
  const form=document.getElementById('replyForm');
  const list=document.getElementById('repliesList');
  const items=JSON.parse(localStorage.getItem(key)||'[]');
  function render(){
    list.innerHTML='';
    items.forEach(r=>{
      const div=document.createElement('div');
      div.style.border='1px solid #000';
      div.style.borderRadius='8px';
      div.style.padding='8px';
      div.style.marginBottom='8px';
      div.innerHTML=`<strong>${r.name||'Anonymous'}</strong> (${r.process||'No process'})<br>${r.text}`;
      list.appendChild(div);
    });
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.name.value.trim();
    const process=form.process.value.trim();
    const text=form.text.value.trim();
    if(!text) return;
    items.push({name,process,text});
    localStorage.setItem(key,JSON.stringify(items));
    form.reset();
    render();
  });
  render();
}

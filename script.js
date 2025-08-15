
function setupReplies({key, formSel, listSel}){
  const form=document.querySelector(formSel);
  const list=document.querySelector(listSel);
  const items=JSON.parse(localStorage.getItem(key)||'[]');
  function render(){
    list.innerHTML='';
    items.forEach(r=>{
      const li=document.createElement('li');
      li.textContent=`${r.name||'Anonymous'} (${r.process||'No process'}): ${r.text}`;
      list.appendChild(li);
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
  form.querySelector('[data-export]').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify(items)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');
    a.href=url;a.download=key+'.json';a.click();
  });
  form.querySelector('[data-clear]').addEventListener('click',()=>{
    if(confirm('Clear all?')){items.length=0;localStorage.setItem(key,'[]');render();}
  });
  render();
}

// LAJUNUSA: keep the last search after a page refresh.
// Only non-sensitive search fields are stored locally.
(function(){
  const KEY="lajunusa_search_v1";
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(_){return null}};
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({origin:document.getElementById("origin")?.value||"",destination:document.getElementById("destination")?.value||"",travelDate:document.getElementById("travelDate")?.value||"",savedAt:Date.now()}))}catch(_) {}};
  const restore=()=>{
    const s=read(); if(!s)return;
    if(s.savedAt && Date.now()-s.savedAt>7*24*60*60*1000){try{localStorage.removeItem(KEY)}catch(_){};return;}
    const date=document.getElementById("travelDate"); if(date&&s.travelDate)date.value=s.travelDate;
    let tries=0;
    const timer=setInterval(()=>{
      const o=document.getElementById("origin"),d=document.getElementById("destination");
      if(!o||!d)return;
      if(o.options.length>1&&d.options.length>1){
        if([...o.options].some(x=>x.value===s.origin))o.value=s.origin;
        if([...d.options].some(x=>x.value===s.destination))d.value=s.destination;
        clearInterval(timer);
        if(s.origin&&s.destination&&s.travelDate&&document.getElementById("searchBtn")){
          setTimeout(()=>document.getElementById("searchBtn").click(),120);
        }
      }
      if(++tries>80)clearInterval(timer);
    },100);
  };
  document.addEventListener("change",e=>{if(e.target?.matches("#origin,#destination,#travelDate"))save()});
  document.getElementById("searchBtn")?.addEventListener("click",()=>setTimeout(save,50));
  restore();
})();

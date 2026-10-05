(function(){
  var C = window.CONTENT, M = C.modules, KEY = "pl-progress-v1";
  var CAN_EMBED = /^https?:$/.test(location.protocol);
  var state = {done:{}, checks:{}};
  try { var s = JSON.parse(localStorage.getItem(KEY)); if (s) state = s; } catch(e){}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){} }

  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(s){ return esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>"); }
  function el(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

  document.getElementById("siteTitle").textContent = C.title;
  document.getElementById("siteSub").textContent = C.subtitle;

  var nav = document.getElementById("nav"), content = document.getElementById("content");
  var sidebar = document.getElementById("sidebar"), overlay = document.getElementById("overlay"), menuBtn = document.getElementById("menuBtn");

  function setMenu(open){ sidebar.classList.toggle("open",open); overlay.classList.toggle("open",open); menuBtn.setAttribute("aria-expanded", open); }
  menuBtn.onclick = function(){ setMenu(!sidebar.classList.contains("open")); };
  overlay.onclick = function(){ setMenu(false); };

  function currentIndex(){
    var id = (location.hash||"").replace(/^#\/?/,""), i = M.findIndex(function(m){return m.id===id;});
    return i<0 ? 0 : i;
  }

  function renderNav(idx){
    nav.innerHTML = "";
    M.forEach(function(m,i){
      var a = el("a", state.done[m.id] ? "done" : "", "");
      a.href = "#/"+m.id;
      if (i===idx) a.setAttribute("aria-current","page");
      a.appendChild(el("span","num", state.done[m.id] ? "&#10003;" : String(i+1)));
      var lab = el("span","nav-body", '<span class="nav-title">'+esc(m.title)+'</span><span class="nav-meta">'+m.minutes+' menit'+(m.required?'':' &middot; opsional')+'</span>');
      a.appendChild(lab); nav.appendChild(a);
    });
    var n = M.filter(function(m){return state.done[m.id];}).length;
    document.getElementById("progressBar").style.width = Math.round(n/M.length*100)+"%";
    document.getElementById("progressText").textContent = n+" dari "+M.length+" modul selesai";
  }

  function block(b){
    var w = el("div");
    switch(b.t){
      case "p": w.appendChild(el("p","",fmt(b.v))); break;
      case "h": w.appendChild(el("h2","",fmt(b.v))); break;
      case "list": var ul=el("ul"); b.v.forEach(function(x){ul.appendChild(el("li","",fmt(x)));}); w.appendChild(ul); break;
      case "steps": var ol=el("ol","steps"); b.v.forEach(function(x){ol.appendChild(el("li","",fmt(x)));}); w.appendChild(ol); break;
      case "callout": w.appendChild(el("div","callout "+(b.k||""),fmt(b.v))); break;
      case "code": w.appendChild(el("pre","", esc(b.v))); break;
      case "chips":
        var formula=b.v.indexOf("=")>-1, c=el("div","chips"+(formula?" formula":""));
        b.v.forEach(function(x,i){ if(i && !formula) c.appendChild(el("span","arrow","&rarr;")); c.appendChild(el("span","chip",esc(x))); });
        w.appendChild(c); break;
      case "table":
        var tw=el("div","tw"), t=el("table"), th="<tr>"+b.head.map(function(h){return "<th>"+esc(h)+"</th>";}).join("")+"</tr>";
        t.innerHTML = th + b.rows.map(function(r){return "<tr>"+r.map(function(x){return "<td>"+fmt(x)+"</td>";}).join("")+"</tr>";}).join("");
        tw.appendChild(t); w.appendChild(tw); break;
      case "terms": b.v.forEach(function(x){ w.appendChild(el("div","term","<b>"+esc(x[0])+"</b><span>"+fmt(x[1])+"</span>")); }); break;
      case "video":
        var v=el("div","video"); v.appendChild(el("div","video-title",esc(b.title)));
        var url, src;
        if (b.id) { src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(b.id); url="https://www.youtube.com/watch?v="+encodeURIComponent(b.id); }
        else if (b.playlist) { src="https://www.youtube-nocookie.com/embed/videoseries?list="+encodeURIComponent(b.playlist); url="https://www.youtube.com/playlist?list="+encodeURIComponent(b.playlist); }
        if (src) {
          // YouTube menolak embed tanpa Referer (error 153), dan halaman file:// tidak mengirimnya.
          // Jadi player hanya dimuat saat halaman dibuka lewat http(s); selain itu thumbnail menaut ke YouTube.
          var f=el("div","frame"), play=el(CAN_EMBED?"button":"a","play");
          play.setAttribute("aria-label",(CAN_EMBED?"Putar video: ":"Buka di YouTube: ")+b.title);
          if (b.id) { var img=document.createElement("img"); img.src="https://i.ytimg.com/vi/"+encodeURIComponent(b.id)+"/hqdefault.jpg"; img.alt=""; img.loading="lazy"; play.appendChild(img); }
          play.appendChild(el("span","play-icon"));
          if (CAN_EMBED) {
            play.type="button";
            play.onclick=function(){
              var ifr=document.createElement("iframe");
              ifr.src=src+(src.indexOf("?")<0?"?":"&")+"autoplay=1"; ifr.title=b.title; ifr.allowFullscreen=true;
              ifr.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
              ifr.setAttribute("allow","accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen");
              f.replaceChild(ifr,play);
            };
          } else { play.href=url; play.target="_blank"; play.rel="noopener"; }
          f.appendChild(play); v.appendChild(f);
          v.appendChild(el("div","video-note",esc(b.note||"")+(CAN_EMBED?' Video tidak muncul? ':' Video dibuka di tab baru. ')+'<a href="'+url+'" target="_blank" rel="noopener">Buka di YouTube</a>'));
        } else { v.appendChild(el("div","novideo",esc(b.note||"Video menyusul."))); }
        w.appendChild(v); break;
      case "checklist":
        b.v.forEach(function(x,i){
          var k=b.key+":"+i, lab=el("label","check"+(state.checks[k]?" on":"")), inp=document.createElement("input");
          inp.type="checkbox"; inp.checked=!!state.checks[k];
          inp.onchange=function(){ state.checks[k]=inp.checked; lab.classList.toggle("on",inp.checked); save(); };
          lab.appendChild(inp); lab.appendChild(el("span","",fmt(x))); w.appendChild(lab);
        }); break;
    }
    return w;
  }

  function render(){
    var idx = currentIndex(), m = M[idx];
    renderNav(idx); setMenu(false);
    content.innerHTML = "";
    var head = el("div","mod-head");
    head.appendChild(el("div","mod-meta","Modul "+(idx+1)+" dari "+M.length+" &middot; "+m.minutes+" menit &middot; "+(m.required?"Wajib":"Opsional")));
    head.appendChild(el("h1","",esc(m.title)));
    content.appendChild(head);
    m.blocks.forEach(function(b){ content.appendChild(block(b)); });

    var done = el("button","btn");
    done.type="button";
    function paintDone(){
      done.classList.toggle("done", !!state.done[m.id]);
      done.innerHTML = state.done[m.id] ? "&#10003; Selesai (klik untuk batal)" : "Tandai selesai";
    }
    paintDone();
    // Perbarui tombol dan menu saja; render() penuh akan menggulir halaman kembali ke atas.
    done.onclick=function(){ state.done[m.id]=!state.done[m.id]; save(); paintDone(); renderNav(idx); };
    content.appendChild(el("div","mod-done")).appendChild(done);

    var pager = el("div","pager");
    var prev = el("a","btn ghost", "&larr; Sebelumnya"), next = el("a","btn", idx<M.length-1 ? "Berikutnya &rarr;" : "Selesai");
    if (idx>0) prev.href="#/"+M[idx-1].id; else prev.style.visibility="hidden";
    if (idx<M.length-1) next.href="#/"+M[idx+1].id; else next.href="#/penutup";
    pager.appendChild(prev); pager.appendChild(next); content.appendChild(pager);
    window.scrollTo(0,0);
    if (location.hash==="#/penutup") renderClosing();
  }

  function renderClosing(){
    var cl=C.closing; content.innerHTML="";
    content.appendChild(el("h1","",esc(cl.title)));
    content.appendChild(el("p","",fmt(cl.text)));
    var n=M.filter(function(m){return state.done[m.id];}).length;
    content.appendChild(el("div","callout "+(n===M.length?"ok":""), n===M.length ? "Semua modul sudah Anda selesaikan." : "Anda baru menyelesaikan <b>"+n+" dari "+M.length+"</b> modul. Anda masih bisa kembali kapan saja."));
    content.appendChild(el("h2","","Yang perlu dibawa"));
    var ul=el("ul"); cl.bring.forEach(function(x){ul.appendChild(el("li","",esc(x)));}); content.appendChild(ul);
    var back=el("a","btn ghost","&larr; Kembali ke modul"); back.href="#/"+M[0].id; content.appendChild(el("div","mod-done")).appendChild(back);
    nav.querySelectorAll("a").forEach(function(a){a.removeAttribute("aria-current");});
    window.scrollTo(0,0);
  }

  window.addEventListener("hashchange", render);
  render();
})();

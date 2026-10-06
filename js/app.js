(function(){
  var C = window.CONTENT, M = C.modules, S = C.cheatsheets || [], KEY = "pl-progress-v1";
  var CAN_EMBED = /^https?:$/.test(location.protocol);
  var state = {done:{}, checks:{}};
  try { var s = JSON.parse(localStorage.getItem(KEY)); if (s) state = s; } catch(e){}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){} }

  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function attr(s){ return esc(s).replace(/"/g,"&quot;"); }
  function fmt(s){ return esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>"); }
  function el(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

  document.getElementById("siteTitle").textContent = C.title;
  document.getElementById("siteSub").textContent = C.subtitle;

  var nav = document.getElementById("nav"), content = document.getElementById("content");
  var sidebar = document.getElementById("sidebar"), overlay = document.getElementById("overlay"), menuBtn = document.getElementById("menuBtn");

  function setMenu(open){ sidebar.classList.toggle("open",open); overlay.classList.toggle("open",open); menuBtn.setAttribute("aria-expanded", open); }
  menuBtn.onclick = function(){ setMenu(!sidebar.classList.contains("open")); };
  overlay.onclick = function(){ setMenu(false); };

  function indexOfId(list, id){ return list.findIndex(function(x){return x.id===id;}); }
  function route(){
    var id = (location.hash||"").replace(/^#\/?/,"");
    if (id==="penutup") return {page:"closing", id:id};
    var i = indexOfId(S, id);
    if (i>-1) return {page:"sheet", id:id, idx:i};
    i = indexOfId(M, id);
    if (i<0) i = 0;
    return {page:"module", id:M[i].id, idx:i};
  }

  function renderNav(activeId){
    nav.innerHTML = "";
    function link(item, num, meta){
      var a = el("a", state.done[item.id] ? "done" : "", "");
      a.href = "#/"+item.id;
      if (item.id===activeId) a.setAttribute("aria-current","page");
      if (num!=null) a.appendChild(el("span","num", num));
      a.appendChild(el("span","nav-body", '<span class="nav-title">'+esc(item.title)+'</span><span class="nav-meta">'+meta+'</span>'));
      nav.appendChild(a);
    }
    if (S.length) nav.appendChild(el("div","nav-group","Persiapan"));
    M.forEach(function(m,i){ link(m, state.done[m.id] ? "&#10003;" : String(i+1), m.minutes+' menit'+(m.required?'':' &middot; opsional')); });
    if (S.length) nav.appendChild(el("div","nav-group","Cheatsheet (dipakai di kelas)"));
    S.forEach(function(c){ link(c, null, esc(c.usedIn)); });
    // Progres hanya menghitung modul Persiapan; cheatsheet adalah halaman rujukan.
    var n = M.filter(function(m){return state.done[m.id];}).length;
    document.getElementById("progressBar").style.width = Math.round(n/M.length*100)+"%";
    document.getElementById("progressText").textContent = n+" dari "+M.length+" modul selesai";
  }

  function copyText(text, btn){
    function ok(){ btn.textContent="Tersalin"; setTimeout(function(){ btn.textContent="Salin"; },1500); }
    function fallback(){
      var ta=document.createElement("textarea");
      ta.value=text; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.opacity="0";
      document.body.appendChild(ta); ta.select();
      try { if (document.execCommand("copy")) ok(); } catch(e){}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  }

  function codeBox(text, withCopy){
    var pre = el("pre","", esc(text));
    if (!withCopy) return pre;
    var box = el("div","codebox"), btn = el("button","copy","Salin");
    btn.type="button"; btn.setAttribute("aria-live","polite");
    btn.onclick=function(){ copyText(text, btn); };
    box.appendChild(pre); box.appendChild(btn);
    return box;
  }

  // Ilustrasi kecil untuk cheatsheet Visual, dipilih lewat properti "visual" pada blok entry.
  // Hanya hiasan (aria-hidden); warnanya diatur di style.css lewat kelas a, b, c, sa, sl.
  var AXIS = '<path class="sl" d="M8 44.5H72"/>';
  var VISUALS = {
    bar: AXIS+'<rect class="a" x="12" y="10" width="8" height="34"/><rect class="a" x="24" y="17" width="8" height="27"/><rect class="a" x="36" y="24" width="8" height="20"/><rect class="a" x="48" y="30" width="8" height="14"/><rect class="a" x="60" y="35" width="8" height="9"/>',
    line: AXIS+'<polyline class="sa" points="10,38 22,30 34,33 46,20 58,24 70,12"/>',
    area: AXIS+'<path class="a" opacity=".25" d="M10 44V34L22 28 34 31 46 19 58 22 70 12V44Z"/><polyline class="sa" points="10,34 22,28 34,31 46,19 58,22 70,12"/>',
    pie: '<g fill="none" stroke-width="9" transform="rotate(-90 40 27)"><circle class="pc" cx="40" cy="27" r="16"/><circle class="pb" cx="40" cy="27" r="16" stroke-dasharray="80.4 100.6"/><circle class="pa" cx="40" cy="27" r="16" stroke-dasharray="50.3 100.6"/></g>',
    table: '<rect class="a" x="10" y="9" width="60" height="7"/>'+[21,28,35,42].map(function(y){ return '<rect class="c" x="10" y="'+y+'" width="18" height="3"/><rect class="c" x="33" y="'+y+'" width="14" height="3"/><rect class="c" x="54" y="'+y+'" width="16" height="3"/>'; }).join(""),
    matrix: '<rect class="a" x="28" y="9" width="42" height="7"/><rect class="a" x="10" y="20" width="14" height="25"/>'+[20,27,34,41].map(function(y){ return '<rect class="c" x="28" y="'+y+'" width="12" height="4"/><rect class="c" x="43" y="'+y+'" width="12" height="4"/><rect class="c" x="58" y="'+y+'" width="12" height="4"/>'; }).join(""),
    card: '<rect class="sl" x="12.5" y="9.5" width="55" height="35" rx="3"/><text class="a" x="40" y="31" text-anchor="middle" font-size="16" font-weight="700">128</text><rect class="c" x="28" y="36" width="24" height="3"/>',
    gauge: '<g fill="none" stroke-width="8"><path class="pc" d="M16 42A24 24 0 0 1 64 42"/><path class="pa" d="M16 42A24 24 0 0 1 50.9 20.6"/></g>',
    scatter: '<path class="sl" d="M10.5 8V44.5H72"/><g class="a"><circle cx="18" cy="38" r="2.5"/><circle cx="25" cy="33" r="2.5"/><circle cx="30" cy="27" r="2.5"/><circle cx="37" cy="30" r="2.5"/><circle cx="43" cy="22" r="2.5"/><circle cx="50" cy="24" r="2.5"/><circle cx="57" cy="16" r="2.5"/><circle cx="65" cy="13" r="2.5"/></g><circle class="b" cx="61" cy="37" r="2.5"/>',
    treemap: '<rect class="a" x="10" y="8" width="34" height="38"/><rect class="b" x="46" y="8" width="24" height="22"/><rect class="c" x="46" y="32" width="14" height="14"/><rect class="a" opacity=".45" x="62" y="32" width="8" height="14"/>',
    slicer: '<rect class="a" x="9" y="20" width="19" height="14" rx="3"/><rect class="sl" x="31.5" y="20.5" width="18" height="13" rx="3"/><rect class="sl" x="52.5" y="20.5" width="18" height="13" rx="3"/>'
  };

  function entry(b){
    var d = el("details","entry"), body = el("div","entry-body");
    if (b.open) d.open = true;
    var pic = VISUALS[b.visual] ? '<svg class="viz" viewBox="0 0 80 54" aria-hidden="true" focusable="false">'+VISUALS[b.visual]+'</svg>' : '';
    d.appendChild(el("summary","", pic+'<span class="entry-text"><span class="entry-name">'+esc(b.name)+(b.optional?' <span class="entry-opt">(opsional)</span>':'')+'</span><span class="entry-purpose">'+fmt(b.purpose)+'</span></span>'));
    function line(label, text){ if (text) body.appendChild(el("p","", (label?"<b>"+label+":</b> ":"")+fmt(text))); }
    function codes(label, v){
      if (!v) return;
      body.appendChild(el("p","entry-label","<b>"+label+":</b>"));
      [].concat(v).forEach(function(x){ body.appendChild(codeBox(x, true)); });
    }
    line("", b.detail);
    line("Caranya", b.how);
    codes("Cara menulis", b.syntax);
    (b.blocks||[]).forEach(function(x){ body.appendChild(block(x)); });
    codes("Contoh", b.example);
    line("Contoh", b.exampleText);
    line("Kapan dipakai", b.when);
    line("Tips", b.tips);
    line("Contoh pertanyaan", b.question);
    line("Padanan Excel", b.excel);
    line("Catatan", b.note);
    d.appendChild(body);
    return d;
  }

  function search(b){
    var wrap = el("div","search"), lab = el("label","", esc(b.label||"Cari")), inp = document.createElement("input");
    var empty = el("p","search-empty","Tidak ada yang cocok.");
    inp.type="search"; inp.autocomplete="off"; empty.hidden=true;
    inp.oninput=function(){
      var q = inp.value.trim().toLowerCase(), shown = 0;
      content.querySelectorAll("details.entry").forEach(function(d){
        var hit = !q || d.textContent.toLowerCase().indexOf(q)>-1;
        d.hidden = !hit; if (hit) shown++;
      });
      empty.hidden = shown>0;
    };
    lab.appendChild(inp); wrap.appendChild(lab); wrap.appendChild(empty);
    return wrap;
  }

  function block(b){
    var w = el("div");
    switch(b.t){
      case "p": w.appendChild(el("p","",fmt(b.v))); break;
      case "h": w.appendChild(el("h2","",fmt(b.v))); break;
      case "list": var ul=el("ul"); b.v.forEach(function(x){ul.appendChild(el("li","",fmt(x)));}); w.appendChild(ul); break;
      case "steps": var ol=el("ol","steps"); b.v.forEach(function(x){ol.appendChild(el("li","",fmt(x)));}); w.appendChild(ol); break;
      case "callout": w.appendChild(el("div","callout "+(b.k||""),fmt(b.v))); break;
      case "code": w.appendChild(codeBox(b.v, b.copy)); break;
      case "entry": w.appendChild(entry(b)); break;
      case "search": w.appendChild(search(b)); break;
      case "chips":
        var formula=b.v.indexOf("=")>-1, c=el("div","chips"+(formula?" formula":""));
        b.v.forEach(function(x,i){ if(i && !formula) c.appendChild(el("span","arrow","&rarr;")); c.appendChild(el("span","chip",esc(x))); });
        w.appendChild(c); break;
      case "table":
        // stack:true menyusun tiap baris menjadi kartu di layar sempit; label kolom diambil dari data-label.
        var tw=el("div","tw"+(b.stack?" stack":"")), t=el("table"), th="<tr>"+b.head.map(function(h){return "<th>"+esc(h)+"</th>";}).join("")+"</tr>";
        t.innerHTML = th + b.rows.map(function(r){return "<tr>"+r.map(function(x,i){return "<td"+(i&&b.head[i]?' data-label="'+attr(b.head[i])+'"':"")+">"+fmt(x)+"</td>";}).join("")+"</tr>";}).join("");
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

  function renderHead(meta, title){
    var head = el("div","mod-head");
    head.appendChild(el("div","mod-meta",meta));
    head.appendChild(el("h1","",esc(title)));
    content.appendChild(head);
  }

  function renderModule(idx){
    var m = M[idx];
    renderHead("Modul "+(idx+1)+" dari "+M.length+" &middot; "+m.minutes+" menit &middot; "+(m.required?"Wajib":"Opsional"), m.title);
    m.blocks.forEach(function(b){ content.appendChild(block(b)); });

    var done = el("button","btn");
    done.type="button";
    function paintDone(){
      done.classList.toggle("done", !!state.done[m.id]);
      done.innerHTML = state.done[m.id] ? "&#10003; Selesai (klik untuk batal)" : "Tandai selesai";
    }
    paintDone();
    // Perbarui tombol dan menu saja; render() penuh akan menggulir halaman kembali ke atas.
    done.onclick=function(){ state.done[m.id]=!state.done[m.id]; save(); paintDone(); renderNav(m.id); };
    content.appendChild(el("div","mod-done")).appendChild(done);

    var pager = el("div","pager");
    var prev = el("a","btn ghost", "&larr; Sebelumnya"), next = el("a","btn", idx<M.length-1 ? "Berikutnya &rarr;" : "Selesai");
    if (idx>0) prev.href="#/"+M[idx-1].id; else prev.style.visibility="hidden";
    if (idx<M.length-1) next.href="#/"+M[idx+1].id; else next.href="#/penutup";
    pager.appendChild(prev); pager.appendChild(next); content.appendChild(pager);
  }

  function renderSheet(idx){
    var c = S[idx], nextSheet = S[(idx+1)%S.length];
    renderHead("Cheatsheet &middot; Dipakai pada "+esc(c.usedIn), c.title);
    c.blocks.forEach(function(b){ content.appendChild(block(b)); });

    var pager = el("div","pager");
    var back = el("a","btn ghost","&larr; Kembali ke Persiapan"), next = el("a","btn","Cheatsheet berikutnya: "+esc(nextSheet.title)+" &rarr;");
    back.href="#/"+M[0].id; next.href="#/"+nextSheet.id;
    pager.appendChild(back); pager.appendChild(next); content.appendChild(pager);
  }

  function renderClosing(){
    var cl=C.closing;
    content.appendChild(el("h1","",esc(cl.title)));
    content.appendChild(el("p","",fmt(cl.text)));
    var n=M.filter(function(m){return state.done[m.id];}).length;
    content.appendChild(el("div","callout "+(n===M.length?"ok":""), n===M.length ? "Semua modul sudah Anda selesaikan." : "Anda baru menyelesaikan <b>"+n+" dari "+M.length+"</b> modul. Anda masih bisa kembali kapan saja."));
    content.appendChild(el("h2","","Yang perlu dibawa"));
    var ul=el("ul"); cl.bring.forEach(function(x){ul.appendChild(el("li","",esc(x)));}); content.appendChild(ul);
    if (cl.note) content.appendChild(el("p","",fmt(cl.note)));
    var back=el("a","btn ghost","&larr; Kembali ke modul"); back.href="#/"+M[0].id; content.appendChild(el("div","mod-done")).appendChild(back);
  }

  function render(){
    var r = route();
    renderNav(r.id); setMenu(false);
    content.innerHTML = "";
    if (r.page==="closing") renderClosing();
    else if (r.page==="sheet") renderSheet(r.idx);
    else renderModule(r.idx);
    window.scrollTo(0,0);
  }

  window.addEventListener("hashchange", function(){ render(); content.focus({preventScroll:true}); });

  // <details> yang tertutup tidak ikut tercetak, jadi buka semuanya selama mencetak.
  var reopened = [];
  window.addEventListener("beforeprint", function(){
    reopened = [].slice.call(content.querySelectorAll("details:not([open])"));
    reopened.forEach(function(d){ d.open = true; });
  });
  window.addEventListener("afterprint", function(){ reopened.forEach(function(d){ d.open = false; }); reopened = []; });

  render();
})();

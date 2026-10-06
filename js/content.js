/* ============================================================
   ISI HALAMAN: edit teks, video, dan urutan modul di file ini.
   Format teks: **tebal** dan `kode`. Tidak perlu mengubah app.js.
   Video: isi "id" (kode video YouTube) atau "playlist" (kode playlist).

   Blok untuk cheatsheet:
   - code   : tambahkan copy:true untuk menampilkan tombol Salin.
   - table  : tambahkan stack:true agar baris tersusun ke bawah di layar ponsel.
   - search : kotak pencarian yang menyaring blok entry di halaman itu.
   - entry  : satu butir yang bisa dibuka-tutup. Wajib: name, purpose. Opsional:
              open (terbuka sejak awal), optional (diberi tanda "opsional"),
              visual (ilustrasi kecil: bar, line, area, pie, table, matrix, card,
              gauge, scatter, treemap, slicer),
              detail, how, syntax, blocks (blok lain di dalam butir), example
              (kode; boleh array), exampleText, when, tips, question, excel, note.
   ============================================================ */
window.CONTENT = {
  title: "Persiapan Pelatihan Power BI",
  subtitle: "Material persiapan, sekitar 30 menit",
  closing: {
    title: "Selesai! Sampai jumpa di hari pelatihan",
    text: "Terima kasih sudah menyiapkan diri. Pre-test akan dibagikan terpisah oleh panitia.",
    bring: ["Laptop Windows yang sudah terpasang Power BI Desktop dan Excel", "Charger dan alat tulis", "Kesiapan untuk mencoba langsung"],
    note: "Cheatsheet untuk dipakai selama pelatihan ada di menu sebelah kiri."
  },
  modules: [
    {
      id: "mulai", title: "Mulai dari sini", minutes: 2, required: true,
      blocks: [
        {t:"p", v:"Selamat datang. Halaman ini membantu Anda menyiapkan laptop dan mengenal istilah dasar sebelum pelatihan **Power BI**. Tidak perlu hafal apa pun, cukup baca sekilas dan pastikan laptop siap."},
        {t:"h", v:"Apa yang akan Anda lakukan"},
        {t:"list", v:["Memastikan laptop dan aplikasi siap (modul 2)","Mengenal Power BI dan Power Query secara singkat (modul 3 dan 4)","Membaca kamus istilah dan pengenalan rumus DAX (modul 5 dan 6)"]},
        {t:"callout", k:"ok", v:"**Total sekitar 30 menit.** Boleh dibaca dari ponsel atau laptop, boleh dicicil. Kemajuan Anda tersimpan di perangkat ini."},
        {t:"h", v:"Cara memakai halaman"},
        {t:"list", v:["Pilih modul dari menu di sebelah kiri (di ponsel: tombol **Menu**)","Tekan **Tandai selesai** di akhir tiap modul","Jika waktu terbatas, **modul 2 dan 3 adalah yang paling penting**","Cheatsheet untuk dipakai selama pelatihan ada di menu sebelah kiri"]}
      ]
    },
    {
      id: "laptop", title: "Cek laptop dan instalasi", minutes: 10, required: true,
      blocks: [
        {t:"p", v:"Ini modul terpenting. Pastikan Power BI Desktop dan Excel di laptop Anda siap dipakai **sebelum** hari pelatihan."},
        {t:"h", v:"1. Cek spesifikasi laptop"},
        {t:"table", head:["Komponen","Minimum","Disarankan"], rows:[
          ["Sistem operasi","Windows 10 atau 11, 64-bit","Windows 11 terbaru"],
          ["RAM","4 GB","8 GB atau lebih"],
          ["Layar","1440 x 900","1920 x 1080"],
          ["Skala tampilan Windows","100%","100%"],
          ["Ruang disk kosong","2 GB","2 GB atau lebih"],
          ["Excel","Excel 2016 atau lebih baru","Microsoft 365"]
        ]},
        {t:"callout", k:"warn", v:"Diharapkan untuk menggunakan laptop Windows selama workshop berlangsung, karena adanya keterbatasan fitur yang dapat diakses pada Mac."},
        {t:"callout", v:"**Tips layar:** jika tombol atau jendela terlihat terpotong, buka **Settings → System → Display** lalu atur skala (Scale) ke **100%**."},
        {t:"h", v:"2. Cek apakah Power BI sudah terpasang"},
        {t:"steps", v:[
          "Klik menu **Start**, ketik **Power BI Desktop**.",
          "Jika aplikasinya muncul, buka. Jika layar sambutan tampil, boleh ditutup. Anda sudah siap, lanjut ke langkah 4.",
          "Jika tidak muncul, lanjut ke langkah 3."
        ]},
        {t:"h", v:"3. Jika belum terpasang: instal"},
        {t:"steps", v:[
          "Buka **Microsoft Store**, cari **Power BI Desktop**, lalu klik **Instal** (cara termudah, dan versi dari Store diperbarui otomatis).",
          "Alternatif: cari **Download Power BI Desktop** di Google, buka halaman resmi Microsoft, lalu unduh dan jalankan file instalasinya.",
          "Setelah selesai, buka aplikasinya untuk memastikan berjalan. Jika ada kendala instalasi atau akses, **minta bantuan tim IT** untuk diproses terlebih dahulu."
        ]},
        {t:"video", title:"Video panduan instal (cadangan)", id:"jMadzWqCTcY", note:"Tampilan menu bisa sedikit berbeda dari video."},
        {t:"callout", k:"warn", v:"**Instalasi dibatasi oleh IT kantor?** Silakan hubungi tim IT untuk dibantu menyiapkan aplikasi dan akses yang diperlukan."},
        {t:"h", v:"4. Cek Excel"},
        {t:"steps", v:["Buka **Excel**.","Klik tab **Data**.","Pastikan ada tombol **Get Data** (Dapatkan Data) di bagian kiri."]},
        {t:"h", v:"Checklist kesiapan"},
        {t:"checklist", key:"siap", v:[
          "Laptop memakai Windows 10 atau 11 (64-bit)",
          "Power BI Desktop bisa dibuka",
          "Excel memiliki tab Data dan tombol Get Data",
          "Skala tampilan Windows sudah 100%",
          "Laptop dan charger akan dibawa pada hari pelatihan"
        ]}
      ]
    },
    {
      id: "powerbi", title: "Apa itu Power BI", minutes: 6, required: true,
      blocks: [
        {t:"p", v:"**Power BI** adalah alat dari Microsoft untuk mengubah data menjadi laporan visual yang mudah dibaca, sehingga membantu pengambilan keputusan."},
        {t:"chips", v:["Data mentah","Informasi","Insight","Keputusan"]},
        {t:"p", v:"Data analytics adalah proses mengumpulkan, merapikan, mengolah, dan menafsirkan data untuk menjawab pertanyaan dan mendukung keputusan."},
        {t:"h", v:"Yang akan kita lakukan di kelas"},
        {t:"list", v:["Mengambil dan merapikan data","Menghubungkan beberapa tabel","Menghitung angka yang dibutuhkan","Menyajikan hasil dalam dashboard interaktif"]},
        {t:"h", v:"Alur berpikir seorang analis data"},
        {t:"steps", v:["Tentukan **tujuan** analisis","Tentukan **metrik** yang diukur","Tentukan dan cari tahu **lokasi data**","**Ambil data** dan periksa kondisinya (data profiling)","Pilih alat, lalu **buat laporan** di Power BI"]},
        {t:"video", title:"Video pengantar: membuat laporan sederhana di Power BI", id:"PVUNCuxpRtU", note:"Video singkat, cukup ditonton sekilas."},
        {t:"video", title:"Opsional: belajar Power BI level pemula", id:"qP_rIDB8uJI", note:"Lebih panjang. Untuk Anda yang ingin melihat lebih jauh."}
      ]
    },
    {
      id: "query", title: "Power Query di Excel", minutes: 6, required: true,
      blocks: [
        {t:"p", v:"**Power Query** adalah fitur di Excel untuk mengambil, merapikan, dan mengubah data dari berbagai sumber, **tanpa perlu coding**. Data aslinya tidak berubah. Jika ada data baru, cukup tekan **Refresh**."},
        {t:"h", v:"Di mana letaknya?"},
        {t:"steps", v:["Buka Excel, klik tab **Data**.","Di grup **Get & Transform Data**, klik **Get Data** atau **From Table/Range** (Dari Tabel/Rentang).","Jendela **Power Query Editor** akan terbuka. Di sinilah data dirapikan."]},
        {t:"h", v:"Empat tahap di Power Query"},
        {t:"table", head:["Tahap","Artinya"], rows:[
          ["Connect","Menghubungkan ke data yang dibutuhkan"],
          ["Transform","Membentuk data sesuai kebutuhan tanpa mengubah data asli"],
          ["Combine","Menggabungkan beberapa sumber data"],
          ["Load","Memuat hasilnya ke Excel dan memperbaruinya secara berkala"]
        ]},
        {t:"h", v:"Mengapa berguna?"},
        {t:"list", v:["Laporan yang dibuat berulang menjadi lebih cepat","Mengurangi kesalahan input dan pengolahan manual","Tidak perlu biaya perangkat lunak tambahan selain Excel"]},
        {t:"video", title:"Video: tutorial Power Query Excel", id:"72jk30kX_ZA", note:"Cukup ditonton sekilas."}
      ]
    },
    {
      id: "kamus", title: "Kamus istilah mini", minutes: 4, required: true,
      blocks: [
        {t:"p", v:"Sepuluh istilah yang akan sering Anda dengar di kelas. Cukup dikenali, tidak perlu dihafal."},
        {t:"terms", v:[
          ["Data mentah","Data apa adanya dari sumber, belum dirapikan."],
          ["Tabel, kolom, baris","Tabel adalah kumpulan data. Kolom berjalan ke bawah, baris berjalan ke samping."],
          ["Query","Catatan langkah pengambilan dan perapian data di Power Query."],
          ["Transform","Mengubah bentuk data, misalnya mengganti tipe data atau menghapus duplikat."],
          ["Refresh","Memperbarui hasil dengan data terbaru dari sumber."],
          ["Merge","Menggabungkan dua tabel lewat kolom kunci, mirip VLOOKUP."],
          ["Relationship","Hubungan antartabel, misalnya satu produk dijual berkali-kali."],
          ["Measure","Rumus perhitungan yang angkanya menyesuaikan filter."],
          ["Visual","Grafik atau tabel di dalam laporan."],
          ["Dashboard, slicer","Dashboard adalah halaman ringkasan visual. Slicer adalah tombol filter untuk memilih data yang ditampilkan."]
        ]}
      ]
    },
    {
      id: "dax", title: "Pengenalan DAX", minutes: 5, required: false,
      blocks: [
        {t:"p", v:"**DAX** adalah bahasa rumus di Power BI untuk menghitung angka baru dari data, seperti rumus Excel (misalnya SUM atau SUMIFS), tetapi angkanya ikut berubah saat Anda memilih filter."},
        {t:"callout", k:"ok", v:"**Tidak perlu dihafal.** Di kelas, rumus akan ditulis dan dijelaskan bersama langkah demi langkah."},
        {t:"h", v:"Dua contoh sederhana"},
        {t:"code", v:"Total Penjualan = SUM(Penjualan[Pendapatan])"},
        {t:"p", v:"Menjumlahkan semua nilai pada kolom Pendapatan."},
        {t:"code", v:"Jumlah Pelanggan = DISTINCTCOUNT(Penjualan[ID Pelanggan])"},
        {t:"p", v:"Menghitung berapa pelanggan yang berbeda, tanpa dihitung dua kali."},
        {t:"h", v:"Pola yang sama setiap kali"},
        {t:"chips", v:["Nama hasil","=","Fungsi","( Tabel[Kolom] )"]},
        {t:"video", title:"Video pengenalan DAX", id:"tgCgyO2z9po", note:"Video ini membantu memperjelas pola dasar rumus DAX. Cukup ditonton sekilas."}
      ]
    }
  ],

  /* Cheatsheet: halaman rujukan untuk dipakai di kelas. Tidak dihitung dalam progres.
     Nama tabel dan kolom pada contoh masih generik (Penjualan, Produk, Pendapatan, ...);
     sesuaikan dengan materi pembicara bila sudah tersedia. */
  cheatsheets: [
    {
      id: "cs-pq", title: "Power Query dan Model Data", usedIn: "Hari 1 (Sesi 1 dan 2)",
      blocks: [
        {t:"callout", v:"Gunakan halaman ini saat praktik Hari 1. Nama menu memakai bahasa Inggris seperti di aplikasi. Tampilan bisa sedikit berbeda antar versi Excel."},

        {t:"h", v:"Di mana membuka Power Query?"},
        {t:"table", head:["Aplikasi","Cara membuka"], rows:[
          ["Excel","Tab **Data** → **Get Data** (atau **From Table/Range** untuk data yang sudah ada di lembar kerja). Jendela **Power Query Editor** terbuka."],
          ["Power BI Desktop","Tab **Home** → **Transform data**."]
        ]},

        {t:"h", v:"Empat tahap"},
        {t:"table", stack:true, head:["Tahap","Artinya","Contoh"], rows:[
          ["Connect","Menghubungkan ke data","Memilih file Excel penjualan"],
          ["Transform","Merapikan dan membentuk data tanpa mengubah data asli","Mengganti tipe data, membuat kolom baru"],
          ["Combine","Menggabungkan beberapa tabel atau sumber","Merge tabel Penjualan dengan tabel Produk"],
          ["Load","Memuat hasil ke Excel atau Power BI","Close & Load"]
        ]},
        {t:"callout", k:"ok", v:"**Data asli tidak berubah.** Semua langkah hanya tercatat di Power Query. Jika ada data baru, cukup **Refresh**."},

        {t:"h", v:"Langkah yang sering dipakai"},
        {t:"entry", open:true, name:"Change Type",
          purpose:"Menentukan jenis isi kolom (angka, teks, tanggal) supaya dibaca dengan benar.",
          how:"Klik ikon tipe di kiri nama kolom, lalu pilih tipe. Atau tab **Transform** → **Data Type**.",
          when:"Segera setelah mengambil data. Contoh: kolom tanggal terbaca sebagai teks, ubah ke **Date**.",
          note:"Format Indonesia (angka `1.250,50` dan tanggal `31/12/2026`) sering terbaca salah. Klik kanan header kolom → **Change Type** → **Using Locale**, lalu pilih tipe dan **Locale: Indonesian**."},
        {t:"entry", name:"Duplicate",
          purpose:"Membuat salinan lengkap sebuah query beserta semua langkahnya. Salinan berdiri sendiri.",
          how:"Klik kanan nama query di panel **Queries** → **Duplicate**.",
          when:"Saat ingin variasi query yang tidak terpengaruh perubahan pada query asal."},
        {t:"entry", name:"Reference",
          purpose:"Membuat query baru yang mengambil **hasil akhir** query asal. Jika query asal berubah, hasilnya ikut berubah.",
          how:"Klik kanan nama query → **Reference**.",
          when:"Saat satu data bersih ingin diturunkan menjadi beberapa tabel, misalnya tabel Produk dan tabel Pelanggan dari satu tabel besar."},
        {t:"table", stack:true, head:["Duplicate vs Reference","Duplicate","Reference"], rows:[
          ["Hubungan dengan query asal","Berdiri sendiri","Mengikuti hasil query asal"],
          ["Jika query asal berubah","Tidak ikut berubah","Ikut berubah"],
          ["Cocok untuk","Variasi mandiri","Turunan dari satu data bersih"]
        ]},
        {t:"entry", name:"Load vs Load To",
          purpose:"Memilih ke mana hasil query dimuat.",
          how:"Di Excel: **Home** → **Close & Load** (langsung jadi tabel di lembar baru) atau **Close & Load To...** (pilih tujuan).",
          when:"Gunakan **Load To** → **Only Create Connection** untuk query perantara (misalnya yang hanya dipakai untuk Merge), agar lembar kerja tidak penuh.",
          note:"Di Power BI, klik kanan query lalu hilangkan centang **Enable load** untuk query perantara."},
        {t:"entry", name:"Merge Queries (menggabungkan tabel)",
          purpose:"Menggabungkan dua tabel lewat kolom kunci yang nilainya sama, mirip VLOOKUP.",
          blocks:[
            {t:"steps", v:[
              "**Home** → **Merge Queries**.",
              "Pilih tabel pertama dan tabel kedua.",
              "Klik kolom kunci di masing-masing tabel (nilai dan tipe datanya harus cocok).",
              "Pilih **Join Kind** (lihat tabel di bawah), lalu **OK**.",
              "Klik ikon panah ganda di header kolom baru untuk **expand**, pilih kolom yang ingin diambil."
            ]},
            {t:"table", head:["Join Kind","Hasilnya"], rows:[
              ["Left Outer (paling umum)","Semua baris tabel pertama, ditambah data yang cocok dari tabel kedua"],
              ["Inner","Hanya baris yang cocok di kedua tabel"],
              ["Full Outer","Semua baris dari kedua tabel"],
              ["Left Anti","Baris tabel pertama yang **tidak** punya pasangan di tabel kedua"]
            ]}
          ],
          excel:"VLOOKUP / XLOOKUP"},
        {t:"entry", name:"Conditional Column",
          purpose:"Membuat kolom baru yang isinya ditentukan oleh kondisi, tanpa menulis rumus.",
          how:"Tab **Add Column** → **Conditional Column**. Isi nama kolom, kondisi (If ... Then ...), tambahkan **Add Clause** bila perlu, dan nilai **Else**.",
          exampleText:"Jika `Pendapatan` lebih dari atau sama dengan 1.000.000 maka \"Tinggi\", selain itu \"Rendah\".",
          note:"Kondisi dibaca dari atas ke bawah. Yang pertama terpenuhi dipakai."},
        {t:"entry", name:"Custom Column",
          purpose:"Membuat kolom baru dengan rumus sendiri (bahasa M).",
          how:"Tab **Add Column** → **Custom Column**.",
          example:["[Jumlah] * [Harga]", "if [Pendapatan] >= 1000000 then \"Tinggi\" else \"Rendah\""],
          note:"Nama kolom ditulis di dalam kurung siku `[ ]`. Bahasa M **membedakan huruf besar dan kecil**: `if`, `then`, `else` harus huruf kecil."},
        {t:"entry", name:"Applied Steps (catatan langkah)",
          purpose:"Daftar semua langkah yang sudah dilakukan, di panel kanan Power Query Editor.",
          when:"Setiap langkah diulang otomatis saat **Refresh**. Klik sebuah langkah untuk melihat kondisi data saat itu. Hapus langkah yang salah dengan tanda **X** di sebelahnya."},

        {t:"h", v:"Konsep model data"},
        {t:"p", v:"Model data adalah kumpulan tabel yang dihubungkan satu sama lain, supaya bisa dianalisis bersama."},
        {t:"terms", v:[
          ["Primary key","Kolom yang nilainya **unik** di setiap baris. Contoh: `ID Produk` di tabel Produk."],
          ["Foreign key","Kolom di tabel lain yang berisi nilai yang merujuk ke primary key. Boleh berulang. Contoh: `ID Produk` di tabel Penjualan."],
          ["Relationship","Sambungan antara primary key dan foreign key."],
          ["One-to-many","Satu baris di tabel keterangan berpasangan dengan banyak baris di tabel transaksi. Contoh: satu produk, banyak transaksi."]
        ]},
        {t:"code", v:"Produk (satu)            Penjualan (banyak)\nID Produk  [PK]  1 ----- * ID Produk  [FK]\nNama Produk                Tanggal\nKategori                   Jumlah"},
        {t:"callout", v:"Di Power BI: buka **Model view**, lalu **seret kolom kunci** dari satu tabel ke kolom kunci di tabel lain. Filter mengalir dari tabel \"satu\" ke tabel \"banyak\"."},

        {t:"h", v:"Kesalahan umum dan cara mengatasinya"},
        {t:"table", stack:true, head:["Gejala","Penyebab umum","Cara mengatasi"], rows:[
          ["Tanggal atau angka terbaca teks","Format Indonesia terbaca sebagai format lain","Change Type → Using Locale → Indonesian"],
          ["Hasil Merge banyak berisi `null`","Nilai kunci tidak cocok: tipe data berbeda, spasi tersembunyi, atau ejaan beda","Samakan tipe data; **Transform** → **Format** → **Trim**; cek ejaan"],
          ["Jumlah baris bertambah setelah Merge","Kunci di tabel kedua mengandung duplikat","Pastikan kunci di tabel \"satu\" unik (hapus duplikat pada kolom kunci)"],
          ["Error \"column not found\"","Nama kolom di sumber berubah","Perbaiki langkah yang bermasalah di Applied Steps, atau kembalikan nama kolom di sumber"],
          ["Refresh gagal, file tidak ditemukan","Lokasi atau nama file sumber berubah","Perbarui lokasi di langkah **Source** atau di **Data Source Settings**"],
          ["Data tidak berubah padahal sumber sudah diperbarui","Belum di-Refresh","Tab **Data** → **Refresh All**"]
        ]}
      ]
    },
    {
      id: "cs-dax", title: "DAX", usedIn: "Hari 2 (Sesi 3)",
      blocks: [
        {t:"callout", k:"ok", v:"**Tidak perlu dihafal.** Di kelas, rumus ditulis bersama. Halaman ini untuk membantu saat Anda mencoba sendiri. Catatan: fungsi `CALCULATE` tidak dibahas pada pelatihan ini."},

        {t:"h", v:"Pola dasar"},
        {t:"code", copy:true, v:"Nama Hasil = FUNGSI(Tabel[Kolom])"},
        {t:"list", v:[
          "Nama hasil ditulis di kiri tanda `=`, rumus di kanan.",
          "Nama kolom ditulis `Tabel[Kolom]`. Jika nama tabel mengandung spasi, beri tanda petik tunggal: `'Data Penjualan'[Pendapatan]`.",
          "Measure lain dipanggil dengan kurung siku saja: `[Total Penjualan]`."
        ]},

        {t:"h", v:"Measure vs calculated column"},
        {t:"table", stack:true, head:["","Measure","Calculated column"], rows:[
          ["Dihitung","Saat dipakai di visual, menyesuaikan filter dan slicer","Per baris, saat data dimuat, lalu disimpan"],
          ["Hasil","Satu angka (total, rasio, persen)","Kolom baru di tabel"],
          ["Cocok untuk","Total, jumlah, rasio, persentase","Kategori atau label per baris (misalnya \"Tinggi/Rendah\")"],
          ["Cara membuat","Tab **Home** → **New measure**","Tab **Home** → **New column**"]
        ]},
        {t:"callout", v:"Pegangan mudah: butuh **angka ringkasan** → measure. Butuh **label per baris** → calculated column."},

        {t:"h", v:"Fungsi"},
        {t:"search", label:"Cari fungsi"},
        {t:"entry", open:true, name:"SUM",
          purpose:"Menjumlahkan semua nilai pada satu kolom angka.",
          syntax:"SUM(Tabel[Kolom])",
          example:"Total Penjualan = SUM(Penjualan[Pendapatan])",
          when:"Saat butuh total.",
          excel:"SUM (dan SUMIFS: hasilnya otomatis mengikuti filter dan slicer di visual)"},
        {t:"entry", name:"SUMX",
          purpose:"Menghitung rumus **baris demi baris**, lalu menjumlahkan hasilnya.",
          syntax:"SUMX(Tabel, ekspresi)",
          example:"Total Pendapatan = SUMX(Penjualan, Penjualan[Jumlah] * Penjualan[Harga])",
          when:"Saat angka yang dijumlahkan harus dihitung dulu per baris (misalnya jumlah dikali harga) dan belum ada kolomnya.",
          note:"Jika kolom hasilnya sudah ada, `SUM` cukup."},
        {t:"entry", name:"RELATED",
          purpose:"Mengambil nilai dari tabel lain lewat relationship (dari sisi \"satu\").",
          syntax:"RELATED(TabelLain[Kolom])",
          example:"Harga Produk = RELATED(Produk[Harga])",
          when:"Dipakai di tabel transaksi untuk mengambil keterangan dari tabel keterangan.",
          excel:"VLOOKUP",
          note:"Membutuhkan relationship antar tabel. Jika error, cek **Model view**."},
        {t:"entry", name:"DISTINCTCOUNT",
          purpose:"Menghitung jumlah nilai yang **berbeda** (tanpa dihitung dua kali).",
          syntax:"DISTINCTCOUNT(Tabel[Kolom])",
          example:"Jumlah Pelanggan = DISTINCTCOUNT(Penjualan[ID Pelanggan])",
          when:"Saat ingin tahu berapa pelanggan atau produk yang unik, bukan berapa baris."},
        {t:"entry", name:"IF",
          purpose:"Memberi hasil berbeda berdasarkan satu kondisi.",
          syntax:"IF(kondisi, hasil_jika_benar, hasil_jika_salah)",
          example:"Status = IF(Penjualan[Pendapatan] >= 1000000, \"Tinggi\", \"Rendah\")",
          when:"Dua kemungkinan hasil. Umumnya dipakai pada calculated column."},
        {t:"entry", name:"SWITCH",
          purpose:"Memberi hasil berbeda untuk **banyak** kondisi (pengganti IF bertumpuk).",
          syntax:"SWITCH(TRUE(), kondisi1, hasil1, kondisi2, hasil2, hasil_lainnya)",
          example:"Kategori =\nSWITCH(\n    TRUE(),\n    Penjualan[Pendapatan] >= 5000000, \"Besar\",\n    Penjualan[Pendapatan] >= 1000000, \"Sedang\",\n    \"Kecil\"\n)",
          when:"Tiga kategori atau lebih.",
          note:"Kondisi dicek dari atas. Tulis yang paling ketat lebih dulu."},
        {t:"entry", name:"DIVIDE",
          purpose:"Pembagian yang aman. Jika penyebut nol atau kosong, hasilnya kosong (atau nilai alternatif), bukan error.",
          syntax:"DIVIDE(pembilang, penyebut, [hasil_alternatif])",
          example:"Margin = DIVIDE([Total Profit], [Total Penjualan])",
          when:"Setiap menghitung rasio atau persentase. Atur format ke persen di tab **Measure tools**."},

        {t:"h", v:"Padanan Excel dan DAX"},
        {t:"table", head:["Di Excel","Di DAX"], rows:[
          ["SUM","SUM"],
          ["SUMIFS","SUM + filter dari slicer atau visual"],
          ["VLOOKUP","RELATED"],
          ["IF","IF"],
          ["IFS atau IF bertumpuk","SWITCH"],
          ["Menghitung nilai unik","DISTINCTCOUNT"],
          ["Menghindari #DIV/0!","DIVIDE"]
        ]},

        {t:"h", v:"Kesalahan umum"},
        /* Baris "tanda koma": pemisah argumen (koma vs titik koma) belum dikonfirmasi ke pembicara. */
        {t:"table", stack:true, head:["Gejala","Penyebab umum","Cara mengatasi"], rows:[
          ["Garis merah, nama kolom tidak dikenali","Salah ketik atau lupa nama tabel","Ketik `Tabel[` lalu pilih kolom dari saran otomatis"],
          ["Error pada tanda koma","Pemisah argumen mengikuti pengaturan regional laptop","Coba ganti koma `,` dengan titik koma `;`"],
          ["`SUM` tidak bisa dipakai","Kolom bertipe teks, bukan angka","Ubah tipe data kolom ke angka di Power Query"],
          ["`RELATED` error","Belum ada relationship","Buat relationship di **Model view**"],
          ["Angka tidak berubah saat memilih slicer","Tabel tidak terhubung ke tabel yang di-filter","Cek relationship dan arah filter"],
          ["Kurung tidak seimbang","Satu `(` atau `\"` terlewat","Hitung pasangan kurung dan tanda kutip"]
        ]}
      ]
    },
    {
      id: "cs-visual", title: "Visual", usedIn: "Hari 2 (Sesi 4)",
      blocks: [
        {t:"callout", v:"Mulai dari **pertanyaan** yang ingin dijawab, baru pilih visualnya. Satu visual sebaiknya menyampaikan satu pesan."},

        {t:"h", v:"Pertanyaan → visual"},
        {t:"table", head:["Pertanyaan","Visual yang tepat"], rows:[
          ["Mana yang paling tinggi atau rendah antar kategori?","**Bar / Column chart**"],
          ["Bagaimana tren dari waktu ke waktu?","**Line chart**"],
          ["Berapa satu angka utama saat ini?","**Card**"],
          ["Berapa rincian angka per baris?","**Table**"],
          ["Ringkasan dengan baris dan kolom?","**Matrix**"],
          ["Sudah sejauh mana capaian terhadap target?","**Gauge**"],
          ["Apakah dua angka saling berhubungan?","**Scatter chart**"],
          ["Bagaimana komposisi dari banyak kategori?","**Treemap**"],
          ["Bagaimana bagian dari keseluruhan (sedikit kategori)?","**Pie / Donut chart** (dengan catatan)"],
          ["Bagaimana volume berubah dari waktu ke waktu?","**Area chart**"],
          ["Ingin pengguna memilih data yang ditampilkan?","**Slicer**"]
        ]},

        {t:"h", v:"Jenis visual"},
        {t:"search", label:"Cari visual"},
        {t:"entry", open:true, name:"Bar / Column chart", visual:"bar",
          purpose:"Membandingkan nilai antar kategori.",
          detail:"Bar = batang mendatar (nama kategori panjang), Column = batang tegak.",
          tips:"urutkan dari terbesar ke terkecil; mulai sumbu dari nol.",
          question:"\"Merek mana yang profitnya paling tinggi?\""},
        {t:"entry", name:"Line chart", visual:"line",
          purpose:"Menunjukkan perubahan dari waktu ke waktu.",
          tips:"sumbu X harus berurutan (tanggal atau bulan); jangan terlalu banyak garis (maksimal sekitar 4-5).",
          question:"\"Bagaimana tren profit per bulan?\""},
        {t:"entry", name:"Area chart", visual:"area",
          purpose:"Seperti line chart dengan area terisi untuk menekankan volume.",
          tips:"gunakan hemat; area yang bertumpuk sulit dibaca."},
        {t:"entry", name:"Pie / Donut chart", visual:"pie",
          purpose:"Menunjukkan bagian dari keseluruhan.",
          detail:"Gunakan **hanya** jika kategori sedikit (sekitar 5 atau kurang). Bila kategori banyak atau selisih kecil, bar chart lebih mudah dibaca."},
        {t:"entry", name:"Table", visual:"table",
          purpose:"Menampilkan data rinci apa adanya.",
          tips:"tampilkan hanya kolom yang perlu; atur urutan."},
        {t:"entry", name:"Matrix", visual:"matrix",
          purpose:"Seperti tabel dengan baris dan kolom bertingkat (seperti PivotTable).",
          tips:"cocok untuk ringkasan dua dimensi, misalnya kategori x bulan."},
        {t:"entry", name:"Card", visual:"card",
          purpose:"Menampilkan satu angka penting.",
          tips:"beri judul jelas dan format angka (ribuan, persen)."},
        {t:"entry", name:"Gauge", visual:"gauge",
          purpose:"Menunjukkan capaian terhadap target pada satu angka.",
          tips:"hindari memasang banyak gauge; untuk banyak item gunakan bar chart."},
        {t:"entry", name:"Scatter chart", visual:"scatter",
          purpose:"Melihat hubungan dua angka dan menemukan pencilan.",
          tips:"butuh dua nilai angka per titik."},
        {t:"entry", name:"Treemap", visual:"treemap",
          purpose:"Menunjukkan komposisi banyak kategori lewat luas kotak.",
          tips:"bagus untuk melihat kontribusi relatif; kurang tepat untuk membandingkan angka yang selisihnya kecil."},
        {t:"entry", name:"Slicer", visual:"slicer",
          purpose:"Bukan grafik, melainkan tombol filter agar pengguna memilih data yang ditampilkan (tahun, wilayah, kategori).",
          tips:"letakkan di tempat yang mudah dilihat, dan sinkronkan bila perlu."},

        {t:"h", v:"Tips dashboard"},
        {t:"list", v:[
          "Mulai dari keputusan yang ingin didukung, bukan dari data yang tersedia.",
          "Tata letak **16:9**, ukuran **1280 x 720 px**: **Format page** → **Canvas settings**.",
          "Letakkan angka terpenting (card) di bagian atas, grafik di bawahnya, tabel rinci di paling bawah.",
          "Batasi sekitar 5-7 visual per halaman dan beri judul yang menjelaskan isi.",
          "Pakai sedikit warna dan konsisten. Hindari efek 3D.",
          "Selalu cek: apakah orang yang baru melihat bisa menangkap pesannya dalam 5 detik?"
        ]},
        {t:"callout", k:"warn", v:"**Satu pesan per visual.** Jika perlu banyak penjelasan untuk memahaminya, pilih visual yang lebih sederhana."}
      ]
    }
  ]
};

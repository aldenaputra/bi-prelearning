/* ============================================================
   ISI HALAMAN: edit teks, video, dan urutan modul di file ini.
   Format teks: **tebal** dan `kode`. Tidak perlu mengubah app.js.
   Video: isi "id" (kode video YouTube) atau "playlist" (kode playlist).
   ============================================================ */
window.CONTENT = {
  title: "Persiapan Pelatihan Power BI",
  subtitle: "Material persiapan, sekitar 30 menit",
  closing: {
    title: "Selesai! Sampai jumpa di hari pelatihan",
    text: "Terima kasih sudah menyiapkan diri. Pre-test akan dibagikan terpisah oleh panitia.",
    bring: ["Laptop Windows yang sudah terpasang Power BI Desktop dan Excel", "Charger dan alat tulis", "Kesiapan untuk mencoba langsung"]
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
        {t:"list", v:["Pilih modul dari menu di sebelah kiri (di ponsel: tombol **Menu**)","Tekan **Tandai selesai** di akhir tiap modul","Jika waktu terbatas, **modul 2 dan 3 adalah yang paling penting**"]}
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
        {t:"callout", k:"warn", v:"**Pengguna Mac:** Power BI Desktop hanya berjalan di Windows. Jika Anda memakai Mac, hubungi panitia agar disiapkan laptop pengganti."},
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
  ]
};

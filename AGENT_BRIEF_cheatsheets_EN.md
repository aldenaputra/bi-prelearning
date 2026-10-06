# Brief: Add 3 Cheatsheet tabs to the Power BI pre-learning site

> For: the AI coding agent in VS Code. Read this entire document before changing anything.
>
> **Language rules**
> - These instructions are in English.
> - **All text shown on the website must stay in Bahasa Indonesia.** The cheatsheet content in Section 5 is the final site copy. Copy it verbatim into `content.js` and do not translate it.
> - Power BI and Excel menu and feature names stay in English, because that is how they appear in the apps. The Indonesian copy already explains them.

---

## 1. Context and goal

This site is the **pre-learning page** for a 2-day Power BI workshop (OJK Institute x BINAR Academy). About 70% of participants have never used Power BI, most are in their 30s, and many will open the site on a phone. The site is live on Cloudflare (every push to the main branch deploys automatically) and the client likes it.

The client asked for **2-3 new tabs that work as cheatsheets**, to be used **during the training** (not before it). Three cheatsheets, matching the training flow:

| Page ID | Title | Used on | Content |
|---|---|---|---|
| `cs-pq` | Power Query dan Model Data | Day 1 (Sessions 1 and 2) | Power Query steps, Merge, keys, relationships |
| `cs-dax` | DAX | Day 2 (Session 3) | Basic DAX formulas |
| `cs-visual` | Visual | Day 2 (Session 4) | Choosing chart types, dashboard tips |

Core principle: **fast to scan, short, comfortable on a phone, usable while practicing on a laptop.**

---

## 2. First step: inspect the actual repo

Do not rely only on the description below. **Open and read the files first**, because they may have changed. Expected structure:

```
/
├── index.html
├── css/style.css
└── js/
    ├── content.js    # all content + video config (window.CONTENT)
    └── app.js        # rendering, hash routing, progress, mobile menu
```

What is expected to exist (verify, and adjust your plan if it differs):

- **No framework and no build step.** Plain HTML, CSS, and JS. Do not add libraries, CDNs, external fonts, or bundlers.
- **`js/content.js`** defines `window.CONTENT` with `title`, `subtitle`, `closing`, and `modules[]`. Each module is `{ id, title, minutes, required, blocks: [...] }`.
- **Block types already supported** by `app.js` (`t`): `p`, `h`, `list`, `steps`, `callout` (`k`: `ok` or `warn`, empty = accent), `code`, `chips`, `table` (`head`, `rows`), `terms`, `video`, `copy`, `checklist`. Text supports `**bold**` and `` `code` `` through the `fmt()` function, which escapes HTML first.
- **Routing** uses hashes: `#/<id>`. The closing page is `#/penutup`.
- **Progress** is stored in `localStorage` under the key `pl-progress-v1` (`{done:{}, checks:{}}`), wrapped in try/catch.
- **Mobile navigation:** the sidebar becomes a drawer opened by a "Menu" button in the top bar (breakpoint 860px).
- **Theme** lives in the CSS variables at the top of `style.css` (`--accent` is a placeholder for the BINAR brand color). **Do not change colors or the theme.** Use the existing variables.

---

## 3. Desired information architecture

### 3.1 Sidebar split into two groups

```
PERSIAPAN                         <- group heading (not a link)
  1 Mulai dari sini
  2 Cek laptop dan instalasi
  3 Apa itu Power BI
  4 Power Query di Excel
  5 Kamus istilah mini
  6 Pengenalan DAX
CHEATSHEET (dipakai di kelas)     <- group heading
  Power Query dan Model Data
  DAX
  Visual
```

Rules:

1. **The progress bar and "x dari 6 modul selesai" count only the 6 Persiapan modules.** Cheatsheets are reference pages: no "Tandai selesai" button, no checkboxes, no progress counter.
2. The **Sebelumnya/Berikutnya** pager on Persiapan modules is unchanged. After module 6 it still goes to `#/penutup`.
3. On cheatsheet pages, replace the pager with two buttons: **Kembali ke Persiapan** and **Cheatsheet berikutnya** (cycling through the three), or a simple pager between cheatsheets. Choose whichever is most consistent with the existing style.
4. The cheatsheet page header shows meta like the modules do ("Cheatsheet · Dipakai pada Hari 1"), not "Modul x dari 6 · y menit".
5. Module 1 (Mulai dari sini) and the closing page may each get **one extra line** mentioning the cheatsheets ("Cheatsheet untuk dipakai selama pelatihan ada di menu sebelah kiri"). Do not change any other text.
6. Direct links to cheatsheets must work (`#/cs-dax` opened directly, including in a new tab), because participants will bookmark them.

### 3.2 Data structure

Add a new array in `content.js`, using the same block schema:

```js
window.CONTENT.cheatsheets = [
  { id: "cs-pq",     title: "Power Query dan Model Data", usedIn: "Hari 1", blocks: [ ... ] },
  { id: "cs-dax",    title: "DAX",                         usedIn: "Hari 2", blocks: [ ... ] },
  { id: "cs-visual", title: "Visual",                      usedIn: "Hari 2", blocks: [ ... ] }
];
```

In `app.js`, extend route lookup to recognize ids from both `modules` and `cheatsheets`, without breaking module behavior. Reuse the same block renderer.

### 3.3 New block type (only if needed)

Cheatsheets are made of many "entries" (one DAX function, one step, one chart type). To make them scannable on a phone, add an `entry` block:

```js
{ t: "entry",
  name: "SUM",
  purpose: "Menjumlahkan semua nilai pada satu kolom angka.",
  syntax: "SUM(Tabel[Kolom])",            // optional
  example: "Total Penjualan = SUM(Penjualan[Pendapatan])",   // optional, gets a Copy button
  when: "Saat butuh total.",              // optional
  excel: "SUM / SUMIFS",                  // optional, shown as 'Padanan Excel'
  note: "Catatan atau peringatan."        // optional
}
```

Render behavior for `entry`:

- A `<details>` element (no extra JS): the summary shows **name (bold) + a one-line purpose**. The body (syntax, example, when, excel, note) shows when opened.
- The first entry in each group may be open by default. The rest stay closed so the list is short and easy to scroll on a phone.
- `example` and `syntax` appear in a code block (existing `pre` style) with a **Salin** (copy) button. Reuse the existing copy logic from the `copy` block (`navigator.clipboard` with fallback).
- The summary tap area must be at least **44px** tall.

Also add an optional `copy: true` property to the existing `code` block to show a Copy button.

Optional (only if simple and library-free): a **search/filter box** at the top of the DAX and Visual pages that filters entries by keyword. It must work well on a phone and must not use `localStorage`.

---

## 4. Visual and UX requirements (priority: mobile)

Design for **360px** screens first, then scale up. Follow the existing styles and components. Do not introduce a new visual language.

**Required:**

- Use the existing CSS variables. No new hard-coded hex colors unless there is no alternative, and explain why in a code comment.
- **No horizontal page scroll.** Tables are wrapped in `.tw` (horizontal scroll inside the wrapper), and code blocks may scroll horizontally inside `pre`.
- Body text at least 16px with comfortable line height. Text contrast must meet WCAG AA.
- Touch targets (buttons, entry summaries, menu links) at least 44 x 44px.
- Wide tables (such as "Pertanyaan → Visual") must stay readable on phones. If a table has more than 3 columns, consider stacked cards below 600px, using CSS only.
- On page change: scroll to top and move focus to `<main>` (already `tabindex="-1"`). Keep this behavior.
- Mobile drawer: after choosing a page, the drawer closes (existing behavior).
- Accessibility: logical heading order (`h1` per page, `h2` per section), `aria-current="page"` on the active item, everything keyboard-operable, native `<details>`/`summary`.
- No heavy animation. Respect `prefers-reduced-motion` if you add transitions.
- Light theme only (already `color-scheme: light`).

**Nice to have (lightweight):**

- A print stylesheet (`@media print`): hide the sidebar, top bar, and buttons; open all `<details>`; avoid splitting an entry across pages. Some participants may print the cheatsheets.
- Cache busting: add `?v=2` to the `<link>` and `<script>` tags in `index.html` so participants do not see stale versions after an update.

**Forbidden:**

- Adding dependencies, frameworks, CDNs, or external fonts.
- Changing theme colors, logos, or brand elements. Do not add logos or copyrighted assets.
- Changing the content of the 6 Persiapan modules, apart from the single line in 3.1 point 5.
- Storing or showing personal data.
- Embedding new videos (the cheatsheets have no video).

---

## 5. Cheatsheet content (final site copy, in Indonesian)

> Copy the text below into `content.js` using the existing blocks. Keep the wording as written (it is already adjusted for beginners). Example table and column names are **generic** (`Penjualan`, `Produk`, `Pelanggan`, `Pendapatan`, `Jumlah`, `Harga`, `ID Pelanggan`). See Section 6 for aligning them with the speaker's materials.
> Each page opens with one `callout` and ends with a link to another cheatsheet.
> Headings like "Entry", "purpose", and "syntax" below are structural labels for you, not site text.

---

### 5.1 Cheatsheet 1: Power Query dan Model Data (`cs-pq`)

**usedIn:** Hari 1 (Sesi 1 dan 2)

**Callout (accent):** Gunakan halaman ini saat praktik Hari 1. Nama menu memakai bahasa Inggris seperti di aplikasi. Tampilan bisa sedikit berbeda antar versi Excel.

#### A. Di mana membuka Power Query?

Table (head: `Aplikasi | Cara membuka`):

| Aplikasi | Cara membuka |
|---|---|
| Excel | Tab **Data** → **Get Data** (atau **From Table/Range** untuk data yang sudah ada di lembar kerja). Jendela **Power Query Editor** terbuka. |
| Power BI Desktop | Tab **Home** → **Transform data**. |

#### B. Empat tahap

Table (head: `Tahap | Artinya | Contoh`):

| Tahap | Artinya | Contoh |
|---|---|---|
| Connect | Menghubungkan ke data | Memilih file Excel penjualan |
| Transform | Merapikan dan membentuk data tanpa mengubah data asli | Mengganti tipe data, membuat kolom baru |
| Combine | Menggabungkan beberapa tabel atau sumber | Merge tabel Penjualan dengan tabel Produk |
| Load | Memuat hasil ke Excel atau Power BI | Close & Load |

Callout (ok): **Data asli tidak berubah.** Semua langkah hanya tercatat di Power Query. Jika ada data baru, cukup **Refresh**.

#### C. Entries (block `entry`, grouped under an `h`: "Langkah yang sering dipakai")

**1. Change Type**
- purpose: Menentukan jenis isi kolom (angka, teks, tanggal) supaya dibaca dengan benar.
- syntax (steps): Klik ikon tipe di kiri nama kolom, lalu pilih tipe. Atau tab **Transform** → **Data Type**.
- when: Segera setelah mengambil data. Contoh: kolom tanggal terbaca sebagai teks, ubah ke **Date**.
- note: Format Indonesia (angka `1.250,50` dan tanggal `31/12/2026`) sering terbaca salah. Klik kanan header kolom → **Change Type** → **Using Locale**, lalu pilih tipe dan **Locale: Indonesian**.

**2. Duplicate**
- purpose: Membuat salinan lengkap sebuah query beserta semua langkahnya. Salinan berdiri sendiri.
- syntax (steps): Klik kanan nama query di panel **Queries** → **Duplicate**.
- when: Saat ingin variasi query yang tidak terpengaruh perubahan pada query asal.

**3. Reference**
- purpose: Membuat query baru yang mengambil **hasil akhir** query asal. Jika query asal berubah, hasilnya ikut berubah.
- syntax (steps): Klik kanan nama query → **Reference**.
- when: Saat satu data bersih ingin diturunkan menjadi beberapa tabel, misalnya tabel Produk dan tabel Pelanggan dari satu tabel besar.

Comparison table after entries 2 and 3 (head: `Duplicate vs Reference | Duplicate | Reference`):

| | Duplicate | Reference |
|---|---|---|
| Hubungan dengan query asal | Berdiri sendiri | Mengikuti hasil query asal |
| Jika query asal berubah | Tidak ikut berubah | Ikut berubah |
| Cocok untuk | Variasi mandiri | Turunan dari satu data bersih |

**4. Load vs Load To**
- purpose: Memilih ke mana hasil query dimuat.
- syntax (steps): Di Excel: **Home** → **Close & Load** (langsung jadi tabel di lembar baru) atau **Close & Load To...** (pilih tujuan).
- when: Gunakan **Load To** → **Only Create Connection** untuk query perantara (misalnya yang hanya dipakai untuk Merge), agar lembar kerja tidak penuh.
- note: Di Power BI, klik kanan query lalu hilangkan centang **Enable load** untuk query perantara.

**5. Merge Queries (menggabungkan tabel)**
- purpose: Menggabungkan dua tabel lewat kolom kunci yang nilainya sama, mirip VLOOKUP.
- steps (render as a `steps` block):
  1. **Home** → **Merge Queries**.
  2. Pilih tabel pertama dan tabel kedua.
  3. Klik kolom kunci di masing-masing tabel (nilai dan tipe datanya harus cocok).
  4. Pilih **Join Kind** (lihat tabel di bawah), lalu **OK**.
  5. Klik ikon panah ganda di header kolom baru untuk **expand**, pilih kolom yang ingin diambil.
- excel: VLOOKUP / XLOOKUP

Join Kind table (head: `Join Kind | Hasilnya`):

| Join Kind | Hasilnya |
|---|---|
| Left Outer (paling umum) | Semua baris tabel pertama, ditambah data yang cocok dari tabel kedua |
| Inner | Hanya baris yang cocok di kedua tabel |
| Full Outer | Semua baris dari kedua tabel |
| Left Anti | Baris tabel pertama yang **tidak** punya pasangan di tabel kedua |

**6. Conditional Column**
- purpose: Membuat kolom baru yang isinya ditentukan oleh kondisi, tanpa menulis rumus.
- syntax (steps): Tab **Add Column** → **Conditional Column**. Isi nama kolom, kondisi (If ... Then ...), tambahkan **Add Clause** bila perlu, dan nilai **Else**.
- example: Jika `Pendapatan` lebih dari atau sama dengan 1.000.000 maka "Tinggi", selain itu "Rendah".
- note: Kondisi dibaca dari atas ke bawah. Yang pertama terpenuhi dipakai.

**7. Custom Column**
- purpose: Membuat kolom baru dengan rumus sendiri (bahasa M).
- syntax (steps): Tab **Add Column** → **Custom Column**.
- example (code, copy): `[Jumlah] * [Harga]` and `if [Pendapatan] >= 1000000 then "Tinggi" else "Rendah"`
- note: Nama kolom ditulis di dalam kurung siku `[ ]`. Bahasa M **membedakan huruf besar dan kecil**: `if`, `then`, `else` harus huruf kecil.

**8. Applied Steps (catatan langkah)**
- purpose: Daftar semua langkah yang sudah dilakukan, di panel kanan Power Query Editor.
- when: Setiap langkah diulang otomatis saat **Refresh**. Klik sebuah langkah untuk melihat kondisi data saat itu. Hapus langkah yang salah dengan tanda **X** di sebelahnya.

#### D. Konsep model data

Intro text: Model data adalah kumpulan tabel yang dihubungkan satu sama lain, supaya bisa dianalisis bersama.

Terms (block `terms`):

- **Primary key**: kolom yang nilainya **unik** di setiap baris. Contoh: `ID Produk` di tabel Produk.
- **Foreign key**: kolom di tabel lain yang berisi nilai yang merujuk ke primary key. Boleh berulang. Contoh: `ID Produk` di tabel Penjualan.
- **Relationship**: sambungan antara primary key dan foreign key.
- **One-to-many**: satu baris di tabel keterangan berpasangan dengan banyak baris di tabel transaksi. Contoh: satu produk, banyak transaksi.

Simple diagram (block `code` or `chips`):

```
Produk (satu)            Penjualan (banyak)
ID Produk  [PK]  1 ----- * ID Produk  [FK]
Nama Produk                Tanggal
Kategori                   Jumlah
```

Callout (accent): Di Power BI: buka **Model view**, lalu **seret kolom kunci** dari satu tabel ke kolom kunci di tabel lain. Filter mengalir dari tabel "satu" ke tabel "banyak".

#### E. Kesalahan umum dan cara mengatasinya

Table (head: `Gejala | Penyebab umum | Cara mengatasi`):

| Gejala | Penyebab umum | Cara mengatasi |
|---|---|---|
| Tanggal atau angka terbaca teks | Format Indonesia terbaca sebagai format lain | Change Type → Using Locale → Indonesian |
| Hasil Merge banyak berisi `null` | Nilai kunci tidak cocok: tipe data berbeda, spasi tersembunyi, atau ejaan beda | Samakan tipe data; **Transform** → **Format** → **Trim**; cek ejaan |
| Jumlah baris bertambah setelah Merge | Kunci di tabel kedua mengandung duplikat | Pastikan kunci di tabel "satu" unik (hapus duplikat pada kolom kunci) |
| Error "column not found" | Nama kolom di sumber berubah | Perbaiki langkah yang bermasalah di Applied Steps, atau kembalikan nama kolom di sumber |
| Refresh gagal, file tidak ditemukan | Lokasi atau nama file sumber berubah | Perbarui lokasi di langkah **Source** atau di **Data Source Settings** |
| Data tidak berubah padahal sumber sudah diperbarui | Belum di-Refresh | Tab **Data** → **Refresh All** |

**Page ending:** link to the DAX cheatsheet (`#/cs-dax`).

---

### 5.2 Cheatsheet 2: DAX (`cs-dax`)

**usedIn:** Hari 2 (Sesi 3)

**Callout (ok):** **Tidak perlu dihafal.** Di kelas, rumus ditulis bersama. Halaman ini untuk membantu saat Anda mencoba sendiri. Catatan: fungsi `CALCULATE` tidak dibahas pada pelatihan ini.

#### A. Pola dasar

Block `code` (copy): `Nama Hasil = FUNGSI(Tabel[Kolom])`

List:
- Nama hasil ditulis di kiri tanda `=`, rumus di kanan.
- Nama kolom ditulis `Tabel[Kolom]`. Jika nama tabel mengandung spasi, beri tanda petik tunggal: `'Data Penjualan'[Pendapatan]`.
- Measure lain dipanggil dengan kurung siku saja: `[Total Penjualan]`.

#### B. Measure vs calculated column

Table:

| | Measure | Calculated column |
|---|---|---|
| Dihitung | Saat dipakai di visual, menyesuaikan filter dan slicer | Per baris, saat data dimuat, lalu disimpan |
| Hasil | Satu angka (total, rasio, persen) | Kolom baru di tabel |
| Cocok untuk | Total, jumlah, rasio, persentase | Kategori atau label per baris (misalnya "Tinggi/Rendah") |
| Cara membuat | Tab **Home** → **New measure** | Tab **Home** → **New column** |

Callout (accent): Pegangan mudah: butuh **angka ringkasan** → measure. Butuh **label per baris** → calculated column.

#### C. Functions (block `entry`, in the order taught in class)

**1. SUM**
- purpose: Menjumlahkan semua nilai pada satu kolom angka.
- syntax: `SUM(Tabel[Kolom])`
- example: `Total Penjualan = SUM(Penjualan[Pendapatan])`
- when: Saat butuh total.
- excel: SUM (dan SUMIFS: hasilnya otomatis mengikuti filter dan slicer di visual)

**2. SUMX**
- purpose: Menghitung rumus **baris demi baris**, lalu menjumlahkan hasilnya.
- syntax: `SUMX(Tabel, ekspresi)`
- example: `Total Pendapatan = SUMX(Penjualan, Penjualan[Jumlah] * Penjualan[Harga])`
- when: Saat angka yang dijumlahkan harus dihitung dulu per baris (misalnya jumlah dikali harga) dan belum ada kolomnya.
- note: Jika kolom hasilnya sudah ada, `SUM` cukup.

**3. RELATED**
- purpose: Mengambil nilai dari tabel lain lewat relationship (dari sisi "satu").
- syntax: `RELATED(TabelLain[Kolom])`
- example: `Harga Produk = RELATED(Produk[Harga])`
- when: Dipakai di tabel transaksi untuk mengambil keterangan dari tabel keterangan.
- excel: VLOOKUP
- note: Membutuhkan relationship antar tabel. Jika error, cek **Model view**.

**4. DISTINCTCOUNT**
- purpose: Menghitung jumlah nilai yang **berbeda** (tanpa dihitung dua kali).
- syntax: `DISTINCTCOUNT(Tabel[Kolom])`
- example: `Jumlah Pelanggan = DISTINCTCOUNT(Penjualan[ID Pelanggan])`
- when: Saat ingin tahu berapa pelanggan atau produk yang unik, bukan berapa baris.

**5. IF**
- purpose: Memberi hasil berbeda berdasarkan satu kondisi.
- syntax: `IF(kondisi, hasil_jika_benar, hasil_jika_salah)`
- example: `Status = IF(Penjualan[Pendapatan] >= 1000000, "Tinggi", "Rendah")`
- when: Dua kemungkinan hasil. Umumnya dipakai pada calculated column.

**6. SWITCH**
- purpose: Memberi hasil berbeda untuk **banyak** kondisi (pengganti IF bertumpuk).
- syntax: `SWITCH(TRUE(), kondisi1, hasil1, kondisi2, hasil2, hasil_lainnya)`
- example (code, copy, multi-line):
  ```
  Kategori =
  SWITCH(
      TRUE(),
      Penjualan[Pendapatan] >= 5000000, "Besar",
      Penjualan[Pendapatan] >= 1000000, "Sedang",
      "Kecil"
  )
  ```
- when: Tiga kategori atau lebih.
- note: Kondisi dicek dari atas. Tulis yang paling ketat lebih dulu.

**7. DIVIDE**
- purpose: Pembagian yang aman. Jika penyebut nol atau kosong, hasilnya kosong (atau nilai alternatif), bukan error.
- syntax: `DIVIDE(pembilang, penyebut, [hasil_alternatif])`
- example: `Margin = DIVIDE([Total Profit], [Total Penjualan])`
- when: Setiap menghitung rasio atau persentase. Atur format ke persen di tab **Measure tools**.

#### D. Padanan Excel dan DAX

Table (head: `Di Excel | Di DAX`):

| Di Excel | Di DAX |
|---|---|
| SUM | SUM |
| SUMIFS | SUM + filter dari slicer atau visual |
| VLOOKUP | RELATED |
| IF | IF |
| IFS atau IF bertumpuk | SWITCH |
| Menghitung nilai unik | DISTINCTCOUNT |
| Menghindari #DIV/0! | DIVIDE |

#### E. Kesalahan umum

Table (head: `Gejala | Penyebab umum | Cara mengatasi`):

| Gejala | Penyebab umum | Cara mengatasi |
|---|---|---|
| Garis merah, nama kolom tidak dikenali | Salah ketik atau lupa nama tabel | Ketik `Tabel[` lalu pilih kolom dari saran otomatis |
| Error pada tanda koma | Pemisah argumen mengikuti pengaturan regional laptop | Coba ganti koma `,` dengan titik koma `;` (see the verification note in Section 6) |
| `SUM` tidak bisa dipakai | Kolom bertipe teks, bukan angka | Ubah tipe data kolom ke angka di Power Query |
| `RELATED` error | Belum ada relationship | Buat relationship di **Model view** |
| Angka tidak berubah saat memilih slicer | Tabel tidak terhubung ke tabel yang di-filter | Cek relationship dan arah filter |
| Kurung tidak seimbang | Satu `(` atau `"` terlewat | Hitung pasangan kurung dan tanda kutip |

**Page ending:** link to the Visual cheatsheet (`#/cs-visual`).

---

### 5.3 Cheatsheet 3: Visual (`cs-visual`)

**usedIn:** Hari 2 (Sesi 4)

**Callout (accent):** Mulai dari **pertanyaan** yang ingin dijawab, baru pilih visualnya. Satu visual sebaiknya menyampaikan satu pesan.

#### A. Pertanyaan → visual

Table (head: `Pertanyaan | Visual yang tepat`):

| Pertanyaan | Visual yang tepat |
|---|---|
| Mana yang paling tinggi atau rendah antar kategori? | **Bar / Column chart** |
| Bagaimana tren dari waktu ke waktu? | **Line chart** |
| Berapa satu angka utama saat ini? | **Card** |
| Berapa rincian angka per baris? | **Table** |
| Ringkasan dengan baris dan kolom? | **Matrix** |
| Sudah sejauh mana capaian terhadap target? | **Gauge** |
| Apakah dua angka saling berhubungan? | **Scatter chart** |
| Bagaimana komposisi dari banyak kategori? | **Treemap** |
| Bagaimana bagian dari keseluruhan (sedikit kategori)? | **Pie / Donut chart** (dengan catatan) |
| Bagaimana volume berubah dari waktu ke waktu? | **Area chart** |
| Ingin pengguna memilih data yang ditampilkan? | **Slicer** |

#### B. Entries (block `entry`)

For each visual, fill `purpose`, `when` (when to use), `note` (when not to use, or a tip), and an example question in `example`. Because `example` normally shows a code block with a Copy button, for these entries render `example` as a plain "Contoh pertanyaan" line instead (add a flag such as `exampleAsText: true`, or put it in `note`).

1. **Bar / Column chart.** Membandingkan nilai antar kategori. Bar = batang mendatar (nama kategori panjang), Column = batang tegak. Tips: urutkan dari terbesar ke terkecil; mulai sumbu dari nol. Contoh pertanyaan: "Merek mana yang profitnya paling tinggi?"
2. **Line chart.** Menunjukkan perubahan dari waktu ke waktu. Tips: sumbu X harus berurutan (tanggal atau bulan); jangan terlalu banyak garis (maksimal sekitar 4-5). Contoh pertanyaan: "Bagaimana tren profit per bulan?"
3. **Area chart.** Seperti line chart dengan area terisi untuk menekankan volume. Tips: gunakan hemat; area yang bertumpuk sulit dibaca.
4. **Pie / Donut chart.** Menunjukkan bagian dari keseluruhan. Gunakan **hanya** jika kategori sedikit (sekitar 5 atau kurang). Bila kategori banyak atau selisih kecil, bar chart lebih mudah dibaca.
5. **Table.** Menampilkan data rinci apa adanya. Tips: tampilkan hanya kolom yang perlu; atur urutan.
6. **Matrix.** Seperti tabel dengan baris dan kolom bertingkat (seperti PivotTable). Tips: cocok untuk ringkasan dua dimensi, misalnya kategori x bulan.
7. **Card.** Menampilkan satu angka penting. Tips: beri judul jelas dan format angka (ribuan, persen).
8. **Gauge.** Menunjukkan capaian terhadap target pada satu angka. Tips: hindari memasang banyak gauge; untuk banyak item gunakan bar chart.
9. **Scatter chart.** Melihat hubungan dua angka dan menemukan pencilan. Tips: butuh dua nilai angka per titik.
10. **Treemap.** Menunjukkan komposisi banyak kategori lewat luas kotak. Tips: bagus untuk melihat kontribusi relatif; kurang tepat untuk membandingkan angka yang selisihnya kecil.
11. **Slicer.** Bukan grafik, melainkan tombol filter agar pengguna memilih data yang ditampilkan (tahun, wilayah, kategori). Tips: letakkan di tempat yang mudah dilihat, dan sinkronkan bila perlu.

#### C. Tips dashboard

List:
- Mulai dari keputusan yang ingin didukung, bukan dari data yang tersedia.
- Tata letak **16:9**, ukuran **1280 x 720 px**: **Format page** → **Canvas settings**.
- Letakkan angka terpenting (card) di bagian atas, grafik di bawahnya, tabel rinci di paling bawah.
- Batasi sekitar 5-7 visual per halaman dan beri judul yang menjelaskan isi.
- Pakai sedikit warna dan konsisten. Hindari efek 3D.
- Selalu cek: apakah orang yang baru melihat bisa menangkap pesannya dalam 5 detik?

Callout (warn): **Satu pesan per visual.** Jika perlu banyak penjelasan untuk memahaminya, pilih visual yang lebih sederhana.

**Page ending:** link back to the Power Query dan Model Data cheatsheet (`#/cs-pq`) and a "Kembali ke Persiapan" link.

---

## 6. Things to verify (do not guess)

Flag what you cannot confirm, either in code comments or in your final summary:

1. **Table and column names from the speaker's materials.** The examples above are generic. The speaker has their own dataset (for example `data_mart`, `product_id`, `revenue`). Before finishing, **ask the repo owner for the table and column names used in the slides**, then update the examples so they match what appears on screen in class. Until then, keep the generic names.
2. **DAX argument separator (comma vs semicolon).** On laptops with Indonesian regional settings, formulas may require `;` instead of `,`. This has not been confirmed for participants' Power BI Desktop version. Check with the speaker and, if confirmed, add a clear callout on the DAX page.
3. **Menu names and click paths** (Excel vs Power BI Desktop, newer vs older versions). Write them as above and note in a callout that the interface can differ between versions.
4. **Content scope.** This content follows the agreed syllabus. If the speaker trims material (for example SUMX or RELATED), mark the related entries as "optional" (add an `optional: true` property and reuse the **Opsional** badge style already used in the sidebar) instead of deleting them.
5. **Terminology.** Use simple Indonesian, and keep English terms that appear in app menus. Do not introduce new terms beyond the ones above.

---

## 7. Acceptance criteria

The work is done when all of these hold.

**Functional**
- [ ] The three cheatsheet pages open from the sidebar and from direct URLs (`#/cs-pq`, `#/cs-dax`, `#/cs-visual`), including in a new tab.
- [ ] Progress ("x dari 6 modul selesai") is unaffected by cheatsheets. Modules 1-6 and the closing page work exactly as before.
- [ ] `entry` blocks open and close, the **Salin** button copies the code, and the copy fallback works.
- [ ] No errors in the browser console.
- [ ] Existing saved progress in `localStorage` (`pl-progress-v1`) still loads (no breaking schema change).

**Visual**
- [ ] Style is consistent with the existing pages (cards, tables, callouts, buttons).
- [ ] Tested at widths **360px, 390px, 768px, and 1280px**: no horizontal page scroll, tables scroll inside `.tw`, code scrolls inside `pre`.
- [ ] Touch targets at least 44px. Body text at least 16px.
- [ ] The new two-group sidebar reads clearly in the phone drawer.

**Content**
- [ ] All Indonesian copy matches Section 5, with no typos.
- [ ] No claims beyond Section 5. If you add anything, flag it.
- [ ] Every item in Section 6 is reported with its status.

**Suggested testing:** use Playwright if it is already available on the machine, otherwise test manually. Open each page at the four widths, take screenshots, check the console, and test the Copy buttons.

---

## 8. Deployment and safety

- The site is hosted on Cloudflare. **Pushing to the main branch deploys automatically.** Do not change build settings, `wrangler` config, or the directory structure unless truly necessary, and explain why if you do.
- Do not add `package.json`, `node_modules`, or build files to the repo.
- **Never add private files** (answer keys, test files, client data) to the repo. Everything in the deployed folder is publicly downloadable by anyone with the link.
- Use separate commits with clear messages, for example: `feat: add cheatsheet section (pq, dax, visual)`.
- After deploying, check with **Ctrl + Shift + R** (hard refresh), because browsers cache CSS and JS.

---

## 9. Out of scope

- Changing the content or order of the 6 Persiapan modules.
- Adding video, quizzes, forms, login, analytics, or a backend.
- Changing theme colors or logos, or adding brand elements.
- Content outside the syllabus (CALCULATE, time intelligence, Power BI Service, and so on). It may be added as "Opsional" only if the repo owner asks.

---

## 10. What to report when finished

When done, report briefly:

1. The files you changed or created.
2. Any schema or block changes (`entry`, `code.copy`) and how to use them in `content.js`.
3. Test evidence (screen widths tested, console results).
4. The list of Section 6 items still awaiting confirmation from the repo owner.

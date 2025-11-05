## Portofolio Pribadi

Repositori ini berisi proyek Website Portofolio Pribadi yang dibuat untuk menampilkan informasi tentang diri saya, keahlian, pengalaman, dan proyek-proyek yang pernah saya kerjakan.Website ini dibuat menggunakan HTML, CSS, serta dihosting di GitHub Pages agar dapat diakses secara online.

## Langkah Instalasi
### 1️ Clone repository ini ke komputer lokal
git clone https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web.git
### 2️ Masuk ke direktori proyek
cd Praktikum-Pemrograman-Web
### 3️ Jalankan file index.html di browser
Tidak diperlukan instalasi tambahan karena proyek ini berbasis statis (HTML, CSS,).

![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2012.56.45_79b5851c.jpg?raw=true)

Pertama, saya menggunakan git pull untuk mengambil (fetch) dan menggabungkan (merge) perubahan terbaru dari repository GitHub ke repository lokal saya.Pada hasil terminal terlihat pesan “Already up to date.”, yang berarti repository lokal saya sudah sinkron dengan repository di GitHub tidak ada perubahan baru dari server.Selanjutnya, saya menjalankan git add . untuk menambahkan semua file yang telah saya ubah (termasuk file README.md) ke dalam staging area.Tanda titik (.) pada perintah ini berfungsi untuk menandai semua file dalam folder proyek agar siap dikomit.Setelah itu, saya menggunakan git commit -m "intro" untuk menyimpan perubahan tersebut ke dalam riwayat Git.Pesan commit "intro" saya gunakan sebagai keterangan singkat bahwa perubahan yang saya buat berkaitan dengan bagian pengenalan proyek.Output menampilkan 1 file changed, 1 insertion(+), 1 deletion(-) yang menunjukkan bahwa ada satu file yang diperbarui.Terakhir, saya menjalankan git push untuk mengirim commit dari repository lokal ke repository GitHub.Pada terminal terlihat output:To https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web.git[main 0a0ab97] intro Pesan tersebut menandakan bahwa commit dengan pesan intro berhasil dikirim dan diterapkan pada branch utama (main) di GitHub.

![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.07.13_679b8865.jpg?raw=true)

saya menggunakan perintah git branch experimen untuk membuat branch baru dengan nama experimen. Branch ini berfungsi sebagai tempat percobaan agar perubahan yang saya lakukan tidak mempengaruhi branch utama (main).Kemudian, saya menjalankan perintah git checkout experimen untuk berpindah dari branch main ke branch experimen. Setelah perintah ini dijalankan, terminal menampilkan pesan “Switched to branch 'experimen’” yang berarti saya sekarang sedang berada di branch experimen.Setelah itu, saya menggunakan perintah git add . untuk menambahkan semua file yang telah saya ubah ke staging area. Titik (.) di akhir perintah berarti semua file di folder proyek akan ditambahkan. Staging area ini seperti tempat menampung sementara sebelum disimpan secara permanen ke dalam riwayat Git.Selanjutnya, saya menjalankan perintah git commit -m "experimen" untuk menyimpan perubahan yang sudah ada di staging area ke dalam riwayat Git. Tanda -m diikuti dengan teks "experimen" digunakan untuk memberikan pesan singkat yang menjelaskan isi commit tersebut.Dari hasil output terlihat bahwa:[experimen 99cf426] experimen1 file changed, 1 insertion(+), 1 deletion(-)Artinya saya berhasil melakukan commit pada branch experimen, dengan perubahan satu file yang mengalami satu penambahan baris dan satu penghapusan baris.

## Portofolio Pribadi

Repositori ini berisi proyek Website Portofolio Pribadi yang dibuat untuk menampilkan informasi tentang diri saya, keahlian, pengalaman, dan proyek-proyek yang pernah saya kerjakan.Website ini dibuat menggunakan HTML, CSS, serta dihosting di GitHub Pages agar dapat diakses secara online.

## Langkah Instalasi
#### 1️ Clone repository ini ke komputer lokal
git clone https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web.git
#### 2️ Masuk ke direktori proyek
cd Praktikum-Pemrograman-Web
#### 3️ Jalankan file index.html di browser
Tidak diperlukan instalasi tambahan karena proyek ini berbasis statis (HTML, CSS,).

### Commit 
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2012.56.45_79b5851c.jpg?raw=true)

Pertama, saya menggunakan git pull untuk mengambil (fetch) dan menggabungkan (merge) perubahan terbaru dari repository GitHub ke repository lokal saya.Pada hasil terminal terlihat pesan “Already up to date.”, yang berarti repository lokal saya sudah sinkron dengan repository di GitHub tidak ada perubahan baru dari server.Selanjutnya, saya menjalankan git add . untuk menambahkan semua file yang telah saya ubah (termasuk file README.md) ke dalam staging area.Tanda titik (.) pada perintah ini berfungsi untuk menandai semua file dalam folder proyek agar siap dikomit.Setelah itu, saya menggunakan git commit -m "intro" untuk menyimpan perubahan tersebut ke dalam riwayat Git.Pesan commit "intro" saya gunakan sebagai keterangan singkat bahwa perubahan yang saya buat berkaitan dengan bagian pengenalan proyek.Output menampilkan 1 file changed, 1 insertion(+), 1 deletion(-) yang menunjukkan bahwa ada satu file yang diperbarui.Terakhir, saya menjalankan git push untuk mengirim commit dari repository lokal ke repository GitHub.Pada terminal terlihat output:To https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web.git[main 0a0ab97] intro Pesan tersebut menandakan bahwa commit dengan pesan intro berhasil dikirim dan diterapkan pada branch utama (main) di GitHub.
### Merge
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.07.13_679b8865.jpg?raw=true)

saya menggunakan perintah git branch experimen untuk membuat branch baru dengan nama experimen. Branch ini berfungsi sebagai tempat percobaan agar perubahan yang saya lakukan tidak mempengaruhi branch utama (main).Kemudian, saya menjalankan perintah git checkout experimen untuk berpindah dari branch main ke branch experimen. Setelah perintah ini dijalankan, terminal menampilkan pesan “Switched to branch 'experimen’” yang berarti saya sekarang sedang berada di branch experimen.Setelah itu, saya menggunakan perintah git add . untuk menambahkan semua file yang telah saya ubah ke staging area. Titik (.) di akhir perintah berarti semua file di folder proyek akan ditambahkan. Staging area ini seperti tempat menampung sementara sebelum disimpan secara permanen ke dalam riwayat Git.Selanjutnya, saya menjalankan perintah git commit -m "experimen" untuk menyimpan perubahan yang sudah ada di staging area ke dalam riwayat Git. Tanda -m diikuti dengan teks "experimen" digunakan untuk memberikan pesan singkat yang menjelaskan isi commit tersebut.Dari hasil output terlihat bahwa:[experimen 99cf426] experimen1 file changed, 1 insertion(+), 1 deletion(-)Artinya saya berhasil melakukan commit pada branch experimen, dengan perubahan satu file yang mengalami satu penambahan baris dan satu penghapusan baris.

### Push
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.07.55_015c9fd6.jpg?raw=true)
perintah git push -u origin experimen untuk mengirim (push) perubahan dari branch lokal bernama experimen ke repository GitHub pada remote bernama origin. Opsi -u berfungsi untuk menghubungkan branch lokal dengan branch remote sehingga pada push berikutnya cukup menggunakan perintah git push saja. Setelah perintah dijalankan, Git menampilkan proses pengiriman data seperti enumerasi, kompresi, dan penulisan objek hingga selesai. Pesan yang muncul menunjukkan bahwa branch baru bernama experimen berhasil dibuat di GitHub dan sudah terhubung dengan branch lokal. Git juga memberikan tautan untuk membuat pull request agar perubahan di branch experimen dapat digabungkan ke branch utama. Terakhir, ketika saya menjalankan perintah git push kembali, muncul pesan “Everything up-to-date” yang menandakan semua perubahan sudah berhasil dikirim dan tidak ada pembaruan tambahan yang perlu diunggah.

### Merge Branch
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.14.45_83bd71e0.jpg?raw=true)

Selanjutnya menggunakan perintah git checkout main untuk berpindah dari branch experimen ke branch utama yaitu main. Setelah berpindah, perintah git pull dijalankan untuk memastikan branch main di lokal sudah sinkron dengan branch main di GitHub. Selanjutnya, saya menjalankan git merge experimen untuk menggabungkan seluruh perubahan yang telah dibuat di branch experimen ke dalam branch main. Proses merge berjalan secara fast-forward, artinya tidak ada konflik dan riwayat commit hanya maju mengikuti commit terbaru dari experimen. Setelah penggabungan selesai, perintah git push digunakan untuk mengirim hasil merge ke repository GitHub, sehingga branch main di GitHub kini telah diperbarui sesuai dengan perubahan dari experimen.

### Delete Branch 
![Delete brach lokal](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.17.19_c829424e.jpg?raw=true)

perintah git branch -d experimen untuk menghapus branch bernama experimen di repository lokal. Perintah ini digunakan setelah proses merge selesai dan perubahan dari branch experimen sudah digabungkan ke branch utama (main), sehingga branch tersebut tidak lagi diperlukan. Opsi -d berarti delete dan hanya akan menghapus branch jika sudah digabungkan (merged) dengan branch lain, sehingga aman digunakan karena tidak akan menghapus pekerjaan yang belum tersimpan di branch utama.

![Delete Branch Repositori](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2013.18.55_c6f16823.jpg?raw=true)

Perintah ini berfungsi untuk menghapus branch bernama experimen dari repository di GitHub, bukan dari lokal. Bagian origin menunjukkan nama remote repository (biasanya GitHub), sedangkan --delete experimen berarti menghapus branch experimen yang ada di sana. Perintah ini biasanya dijalankan setelah branch tersebut tidak lagi dibutuhkan, misalnya setelah semua perubahan di-merge ke branch utama (main). Setelah berhasil, Git akan menampilkan pesan konfirmasi bahwa branch experimen telah dihapus dari remote repository, sehingga tidak lagi muncul di daftar branch GitHub.

### Perintah git log --graph --oneline.
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2022.25.49_1ad47c70.jpg?raw=true)
![](https://github.com/dhinivadilaa/Praktikum-Pemrograman-Web/blob/main/Judul-2/WhatsApp%20Image%202025-11-05%20at%2022.26.29_6a084a17.jpg?raw=true)

hasil dari perintah git log --graph --oneline, yang berfungsi untuk menampilkan riwayat commit secara ringkas dan dalam bentuk grafik garis cabang (branch). Opsi --oneline membuat setiap commit ditampilkan dalam satu baris yang berisi hash singkat commit dan pesan commit, sedangkan --graph menambahkan tanda visual di sisi kiri (misalnya *) untuk menunjukkan struktur atau alur cabang.


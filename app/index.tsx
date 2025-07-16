import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';

// Array sumber foto utama
const SUMBER_FOTO = [
  'https://images.pexels.com/photos/17685535/pexels-photo-17685535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/322311/pexels-photo-322311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/17685539/pexels-photo-17685539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/19453661/pexels-photo-19453661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/19453660/pexels-photo-19453660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/16959472/pexels-photo-16959472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/26791472/pexels-photo-26791472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

// Array sumber foto alternatif (fallback)
const FALLBACK_FOTO = [
  'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1031332/pexels-photo-1031332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/209677/pexels-photo-209677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1020317/pexels-photo-1020317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

// Menggabungkan sumber foto utama dan fallback ke dalam satu array objek
const KUMPULAN = SUMBER_FOTO.map((tautan, i) => ({
  kode: i + 1, // ID unik untuk setiap gambar
  utama: tautan, // URL gambar utama
  // Menggunakan gambar fallback yang berbeda untuk setiap gambar utama.
  // Jika tidak ada fallback spesifik pada indeks tersebut, gunakan gambar utama sebagai fallback.
  fallback: FALLBACK_FOTO[i] || tautan,
}));

// Tipe data untuk objek gambar
type ObjekGambar = {
  kode: number;
  utama: string;
  fallback: string;
};

// Komponen KartuFoto untuk menampilkan setiap gambar
const KartuFoto = ({ data }: { data: ObjekGambar }) => {
  // State untuk menentukan apakah menggunakan gambar fallback atau utama
  const [pakaiFallback, setPakaiFallback] = useState(false);
  // State untuk faktor pembesaran gambar
  const [perbesar, setPerbesar] = useState(1);
  // State untuk menangani jika gambar gagal dimuat
  const [tidakTerload, setTidakTerload] = useState(false);

  // URL gambar yang aktif, beralih antara utama dan fallback
  const aktifUrl = pakaiFallback ? data.fallback : data.utama;

  // Fungsi yang dipanggil saat kartu gambar diklik
  const ketikaTekan = () => {
    // Jika gambar gagal dimuat, jangan lakukan apa-apa
    if (tidakTerload) return;

    // Toggle (mengganti) antara gambar utama dan fallback
    setPakaiFallback(prev => !prev);

    // Penskalaan gambar:
    // Jika skala saat ini 1, ubah menjadi 1.2.
    // Jika skala saat ini 1.2, kembalikan ke 1.
    // Jika skala saat ini sudah lebih besar dari 1.2 (misal karena diklik berkali-kali),
    // maka kembalikan ke 1.
    setPerbesar(prev => {
      if (prev === 1) {
        return 1.2; // Skala menjadi 1.2x saat pertama kali diklik
      } else {
        return 1; // Kembali ke skala normal saat diklik lagi
      }
    });
  };

  return (
    <TouchableOpacity onPress={ketikaTekan} style={gayaKartu.kotak}>
      {tidakTerload ? (
        // Tampilan jika gambar gagal dimuat
        <View style={gayaKartu.blokError}>
          <Text style={gayaKartu.teks}>Gagal Tampil</Text>
        </View>
      ) : (
        // Tampilan gambar utama
        <Image
          // Menggunakan 'key' prop untuk memaksa React me-render ulang komponen Image
          // setiap kali 'aktifUrl' berubah, memastikan gambar baru dimuat.
          key={aktifUrl}
          source={{ uri: aktifUrl }}
          // Fungsi yang dipanggil jika terjadi error saat memuat gambar
          onError={() => setTidakTerload(true)}
          // Menerapkan gaya gambar, termasuk transformasi skala
          style={[gayaKartu.img, { transform: [{ scale: perbesar }] }]}
        />
      )}
    </TouchableOpacity>
  );
};

// Komponen utama untuk menampilkan susunan foto
export default function SusunanFoto() {
  // Mendapatkan lebar layar perangkat
  const layarLebar = Dimensions.get('window').width;
  // Menghitung ukuran setiap foto agar seragam dan pas di layar (3 kolom)
  // Total margin horizontal yang perlu dipertimbangkan:
  // Ada 3 kolom. Setiap kolom memiliki marginHorizontal: 6.
  // Jadi, ada 2 margin di antara kolom (6px * 2) dan 2 margin di sisi paling kiri dan paling kanan (6px * 2).
  // Total margin = (6 * 2) + (6 * 2) = 12 + 12 = 24.
  // Atau lebih sederhana: 6px di kiri item pertama, 6px di kanan item pertama,
  // 6px di kiri item kedua, 6px di kanan item kedua,
  // 6px di kiri item ketiga, 6px di kanan item ketiga.
  // Total 6 * 2 * 3 = 36px.
  // Namun, marginHorizontal: 6 pada `peti` berarti 6px kiri dan 6px kanan.
  // Jadi untuk 3 item, ada 6 margin (3 kiri, 3 kanan), total 6 * 6 = 36.
  // Jika kita ingin 3 kolom pas, kita perlu memperhitungkan 2 margin antar kolom dan 2 margin luar.
  // (6px kiri item 1) + (6px kanan item 1 + 6px kiri item 2) + (6px kanan item 2 + 6px kiri item 3) + (6px kanan item 3)
  // = 6 + 12 + 12 + 6 = 36.
  // Jadi, (layarLebar - (margin total)) / 3.
  // Margin total untuk 3 kolom dengan marginHorizontal: 6 adalah 6 (kiri luar) + 6 (kanan item 1) + 6 (kiri item 2) + 6 (kanan item 2) + 6 (kiri item 3) + 6 (kanan luar) = 36.
  // Atau, jika marginHorizontal diterapkan ke setiap item, itu berarti 6px di kiri dan 6px di kanan setiap item.
  // Untuk 3 item, ada 3 * 2 * 6 = 36px total margin yang akan memakan ruang.
  // Mari kita hitung ulang untuk memastikan grid 3x3 yang rapi.
  // Jika setiap 'peti' memiliki marginHorizontal: 6, maka ada total 6px kiri dan 6px kanan.
  // Untuk 3 kolom, ada 3 peti. Jadi total margin horizontal yang akan memakan ruang adalah 3 * (6 + 6) = 3 * 12 = 36px.
  // Maka, ukuranFoto = (layarLebar - 36) / 3.
  const totalMarginHorizontal = 6 * 2 * 3; // 6px (kiri+kanan) * 2 sisi * 3 item
  const ukuranFoto = (layarLebar - totalMarginHorizontal) / 3;

  // Fungsi untuk memotong array menjadi baris-baris berisi 3 item
  const potongBaris = (array: ObjekGambar[], awal: number) => array.slice(awal, awal + 3);

  return (
    <SafeAreaView style={gayaKartu.root}>
      <ScrollView contentContainerStyle={gayaKartu.scroll}>
        {/* Mengulang untuk membuat baris-baris gambar (indeks 0, 3, 6) */}
        {[0, 3, 6].map(barisIndex => (
          <View key={barisIndex} style={gayaKartu.lajur}>
            {/* Mengulang untuk menampilkan setiap KartuFoto dalam baris */}
            {potongBaris(KUMPULAN, barisIndex).map(item => (
              <View
                key={item.kode}
                // Menerapkan ukuran yang seragam untuk setiap peti gambar
                style={[gayaKartu.peti, { width: ukuranFoto, height: ukuranFoto }]}
              >
                <KartuFoto data={item} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Objek StyleSheet untuk mendefinisikan gaya-gaya komponen
const gayaKartu = StyleSheet.create({
  root: {
    flex: 1, // Mengisi seluruh ruang yang tersedia
    backgroundColor: '#121212', // Warna latar belakang gelap
  },
  scroll: {
    paddingVertical: 18, // Padding vertikal untuk konten scroll
    alignItems: 'center', // Pusatkan item secara horizontal
  },
  lajur: {
    flexDirection: 'row', // Tata letak horizontal untuk item dalam baris
    // Menggunakan justifyContent: 'space-around' atau 'space-between'
    // bersama dengan marginHorizontal pada 'peti' untuk distribusi yang lebih baik.
    // Atau, jika margin pada peti sudah dihitung dalam ukuranFoto,
    // maka cukup pastikan tidak ada padding/margin tambahan di sini yang mengganggu.
    // Jika ukuranFoto sudah memperhitungkan margin, maka lajur tidak perlu margin tambahan.
    marginBottom: 14, // Margin bawah untuk setiap baris
  },
  peti: {
    marginHorizontal: 6, // Margin horizontal untuk jarak antar sel gambar
  },
  kotak: {
    flex: 1, // Mengisi seluruh ruang dalam peti
    aspectRatio: 1, // Memastikan kotak tetap berbentuk persegi
    backgroundColor: '#292929', // Warna latar belakang untuk kotak
    borderRadius: 12, // Sudut membulat
    overflow: 'hidden', // Memastikan konten tidak keluar dari batas sudut membulat
  },
  img: {
    width: '100%', // Lebar gambar 100% dari kotak
    height: '100%', // Tinggi gambar 100% dari kotak
    borderRadius: 12, // Sudut membulat untuk gambar
  },
  blokError: {
    flex: 1, // Mengisi seluruh ruang dalam kotak
    backgroundColor: '#ffbaba', // Warna latar belakang untuk blok error
    justifyContent: 'center', // Pusatkan teks secara vertikal
    alignItems: 'center', // Pusatkan teks secara horizontal
    borderRadius: 12, // Sudut membulat
  },
  teks: {
    color: '#a30000', // Warna teks merah gelap
    fontWeight: '600', // Ketebalan font
    fontSize: 13, // Ukuran font
  },
});

import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text, // Menambahkan Text untuk pesan error
} from 'react-native';

// Kumpulan URL untuk gambar utama yang akan ditampilkan
const PRIMARY_PHOTO_SOURCES = [
  'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  'https://images.pexels.com/photos/672916/pexels-photo-672916.jpeg',
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg',
  'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
];

// Kumpulan URL untuk gambar alternatif yang akan muncul saat diklik
const SECONDARY_PHOTO_SOURCES = [
  'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg',
  'https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg',
  'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg',
  'https://images.pexels.com/photos/25284/pexels-photo-25284.jpg',
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
  'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
  'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
  'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
  'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg',
];

// Menggabungkan daftar gambar utama dan alternatif menjadi satu set data
const PHOTO_DATA_SET = PRIMARY_PHOTO_SOURCES.map((primaryUrl, idx) => ({
  uniqueId: idx, // Pengenal unik untuk setiap entri
  primaryUrl,     // URL gambar utama
  alternateUrl: SECONDARY_PHOTO_SOURCES[idx] || primaryUrl, // URL gambar alternatif, fallback ke utama jika tidak ada
}));

// Definisi tipe untuk objek data gambar
type ImageData = {
  uniqueId: number;
  primaryUrl: string;
  alternateUrl: string;
};

// Komponen individual untuk menampilkan setiap sel gambar dalam galeri
const ImageCell = ({ imageData }: { imageData: ImageData }) => {
  // State untuk melacak apakah gambar alternatif sedang aktif
  const [isAlternateActive, setAlternateActive] = useState(false);
  // State untuk mengontrol faktor penskalaan gambar
  const [currentScale, setCurrentScale] = useState(1);
  // State untuk menangani kesalahan pemuatan gambar
  const [hasLoadError, setLoadError] = useState(false);

  // Menentukan URL gambar yang sedang aktif (utama atau alternatif)
  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;

  // Fungsi yang dipanggil saat sel gambar ditekan
  const handleCellPress = () => {
    // Jika ada kesalahan pemuatan, abaikan interaksi
    if (hasLoadError) return;

    // Mengalihkan antara gambar utama dan alternatif
    setAlternateActive(prev => !prev);

    // Menerapkan penskalaan gambar:
    // Setiap klik akan meningkatkan skala sebesar 1.2x.
    // Skala maksimum dibatasi hingga 2x.
    // Jika skala sudah mencapai atau melebihi 2x, skala akan direset ke 1 (normal).
    setCurrentScale(prevScale => {
      const nextCalculatedScale = prevScale * 1.2;
      // Memastikan skala tidak melebihi 2x. Jika melebihi, atau jika sudah 2x, reset ke 1.
      if (prevScale >= 2 || nextCalculatedScale > 2) {
        return 1; // Reset ke skala awal
      } else {
        return nextCalculatedScale; // Terapkan skala baru
      }
    });
  };

  return (
    <TouchableOpacity onPress={handleCellPress} style={appStyles.imageContainer}>
      {hasLoadError ? (
        // Tampilan jika gambar gagal dimuat
        <View style={appStyles.errorBlock}>
          <Text style={appStyles.errorText}>Gagal Muat</Text>
        </View>
      ) : (
        // Tampilan gambar utama
        <Image
          // Menggunakan 'key' prop untuk memaksa React me-render ulang komponen Image
          // setiap kali 'activeImageUrl' berubah, memastikan gambar baru dimuat.
          key={activeImageUrl}
          source={{ uri: activeImageUrl }}
          // Callback jika terjadi kesalahan saat memuat gambar
          onError={() => setLoadError(true)}
          // Menerapkan gaya gambar, termasuk transformasi skala
          style={[appStyles.responsiveImage, { transform: [{ scale: currentScale }] }]}
          resizeMode="cover" // Memastikan gambar mengisi area tanpa distorsi
        />
      )}
    </TouchableOpacity>
  );
};

// Komponen utama aplikasi galeri foto
export default function VisualGallery() {
  // Mendapatkan lebar layar perangkat untuk perhitungan ukuran sel
  const deviceWidth = Dimensions.get('window').width;

  // Menghitung ukuran setiap sel gambar agar membentuk grid 3x3 yang seragam.
  // Setiap sel memiliki margin 6px di setiap sisi (atas, bawah, kiri, kanan).
  // Untuk 3 kolom, total margin horizontal yang memakan ruang adalah:
  // (margin kiri item 1) + (margin kanan item 1) +
  // (margin kiri item 2) + (margin kanan item 2) +
  // (margin kiri item 3) + (margin kanan item 3)
  // Total = 6 + 6 + 6 + 6 + 6 + 6 = 36px.
  // Maka, lebar yang tersedia untuk 3 gambar adalah lebar perangkat dikurangi total margin.
  const totalHorizontalMargin = 6 * 2 * 3; // 6px (left+right) * 2 sides * 3 items
  const cellSize = (deviceWidth - totalHorizontalMargin) / 3;

  return (
    <SafeAreaView style={appStyles.mainWrapper}>
      <ScrollView contentContainerStyle={appStyles.scrollContent}>
        <View style={appStyles.imageGrid}>
          {/* Mengiterasi melalui set data gambar untuk membuat setiap sel */}
          {PHOTO_DATA_SET.map((itemData) => (
            <View
              key={itemData.uniqueId}
              // Menerapkan ukuran yang dihitung secara dinamis untuk setiap sel
              style={[appStyles.gridCell, { width: cellSize, height: cellSize }]}
            >
              <ImageCell imageData={itemData} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Objek StyleSheet untuk mendefinisikan gaya-gaya komponen aplikasi
const appStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1, // Memastikan komponen mengisi seluruh ruang layar
    backgroundColor: '#111', // Warna latar belakang gelap
  },
  scrollContent: {
    alignItems: 'center', // Memusatkan konten secara horizontal dalam ScrollView
    paddingVertical: 20, // Padding vertikal untuk area scroll
  },
  imageGrid: {
    flexDirection: 'row', // Mengatur item dalam baris
    flexWrap: 'wrap',     // Memungkinkan item untuk melipat ke baris berikutnya
    justifyContent: 'center', // Memusatkan baris jika ada sisa ruang
  },
  gridCell: {
    margin: 6, // Margin di sekitar setiap sel gambar
    backgroundColor: '#222', // Warna latar belakang sel
    borderRadius: 10, // Sudut membulat untuk sel
    overflow: 'hidden', // Memastikan konten gambar tidak keluar dari batas sudut membulat
  },
  imageContainer: {
    flex: 1, // Memastikan container gambar mengisi seluruh sel
  },
  responsiveImage: {
    width: '100%', // Lebar gambar 100% dari container-nya
    height: '100%', // Tinggi gambar 100% dari container-nya
    borderRadius: 10, // Sudut membulat untuk gambar itu sendiri
  },
  errorBlock: {
    flex: 1,
    backgroundColor: '#ffbaba', // Latar belakang merah muda untuk error
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: '#a30000', // Teks merah gelap untuk error
    fontWeight: '600',
    fontSize: 13,
  },
});

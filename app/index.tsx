import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

// Daftar URL gambar utama dan alternatif
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

// Menggabungkan gambar utama dan alternatif
const PHOTO_DATA_SET = PRIMARY_PHOTO_SOURCES.map((primaryUrl, idx) => ({
  uniqueId: idx,
  primaryUrl,
  alternateUrl: SECONDARY_PHOTO_SOURCES[idx] || primaryUrl,
}));

// Komponen ImageCell yang menangani logika penskalaan
const ImageCell = ({ imageData }) => {
  const [isAlternateActive, setAlternateActive] = useState(false); // Gambar utama atau alternatif
  const [currentScale, setCurrentScale] = useState(1); // Menyimpan skala gambar
  const [hasLoadError, setLoadError] = useState(false); // Status error pemuatan gambar

  // Menentukan gambar yang aktif (utama atau alternatif)
  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;

  // Fungsi untuk menangani klik pada gambar
  const handleCellPress = () => {
    if (hasLoadError) return; // Abaikan klik jika ada kesalahan pemuatan gambar

    // Mengganti gambar antara utama dan alternatif
    setAlternateActive((prev) => !prev);

    // Menambah skala gambar sebesar 1.2x pada setiap klik dan membatasi maksimal 2x
    setCurrentScale((prevScale) => {
      const nextScale = prevScale * 1.2; // Meningkatkan skala 1.2x
      return nextScale >= 2 ? 2 : nextScale; // Batasi skala hingga 2x
    });
  };

  return (
    <TouchableOpacity onPress={handleCellPress} style={styles.imageContainer}>
      {hasLoadError ? (
        // Menampilkan pesan error jika gambar gagal dimuat
        <View style={styles.errorBlock}>
          <Text style={styles.errorText}>Gagal Muat</Text>
        </View>
      ) : (
        <Image
          key={activeImageUrl}
          source={{ uri: activeImageUrl }}
          style={[styles.responsiveImage, { transform: [{ scale: currentScale }] }]} // Terapkan skala
          resizeMode="cover"
          onError={() => setLoadError(true)} // Menangani error jika gambar gagal dimuat
        />
      )}
    </TouchableOpacity>
  );
};

// Komponen utama untuk menampilkan grid
export default function VisualGallery() {
  const deviceWidth = Dimensions.get('window').width; // Mendapatkan lebar perangkat
  const cellSize = (deviceWidth - 18) / 3; // Menghitung ukuran setiap sel agar rata

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGrid}>
          {/* Iterasi melalui data gambar dan tampilkan setiap sel */}
          {PHOTO_DATA_SET.map((itemData) => (
            <View
              key={itemData.uniqueId}
              style={[styles.gridCell, { width: cellSize, height: cellSize }]} // Menentukan ukuran sel yang seragam
            >
              <ImageCell imageData={itemData} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Gaya aplikasi
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#111', // Latar belakang gelap untuk kontras gambar
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Menyusun gambar dalam grid 3 kolom
    justifyContent: 'center',
  },
  gridCell: {
    margin: 6, // Margin di sekitar setiap sel gambar
    backgroundColor: '#222', // Latar belakang sel gambar
    borderRadius: 10, // Membulatkan sudut sel gambar
    overflow: 'hidden', // Memastikan gambar tidak meluber keluar dari batas sel
  },
  imageContainer: {
    flex: 1, // Menyesuaikan ukuran gambar dengan ukuran sel
  },
  responsiveImage: {
    width: '100%', // Lebar gambar mengikuti lebar sel
    height: '100%', // Tinggi gambar mengikuti tinggi sel
    borderRadius: 10, // Sudut membulat pada gambar
  },
  errorBlock: {
    flex: 1,
    backgroundColor: '#ffbaba', // Latar belakang merah untuk error
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: '#a30000', // Teks merah untuk error
    fontWeight: '600',
    fontSize: 13,
  },
});

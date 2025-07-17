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

// Menggabungkan gambar utama dan alternatif menjadi satu set data
const PHOTO_DATA_SET = PRIMARY_PHOTO_SOURCES.map((primaryUrl, idx) => ({
  uniqueId: idx,
  primaryUrl,
  alternateUrl: SECONDARY_PHOTO_SOURCES[idx] || primaryUrl,
}));

// Komponen untuk menampilkan sel gambar
const ImageCell = ({ imageData }: { imageData: { uniqueId: number; primaryUrl: string; alternateUrl: string } }) => {
  const [isAlternateActive, setAlternateActive] = useState(false); // Menangani pergantian gambar utama ke alternatif
  const [currentScale, setCurrentScale] = useState(1); // Menangani penskalaan gambar

  // Menentukan URL gambar yang aktif (utama atau alternatif)
  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;

  // Fungsi untuk menangani klik pada gambar
  const handleCellPress = () => {
    // Mengalihkan gambar utama ke gambar alternatif
    setAlternateActive(prev => !prev);

    // Meningkatkan penskalaan 1.2x per klik dan membatasi hingga 2x
    setCurrentScale(prevScale => {
      const nextScale = prevScale * 1.2; // Meningkatkan penskalaan 1.2x per klik
      return nextScale >= 2 ? 1 : nextScale; // Batas skala maksimum 2x, reset ke 1x jika melebihi
    });
  };

  return (
    <TouchableOpacity onPress={handleCellPress} style={styles.imageContainer}>
      <Image
        key={activeImageUrl}
        source={{ uri: activeImageUrl }}
        style={[styles.responsiveImage, { transform: [{ scale: currentScale }] }]} // Menambahkan penskalaan pada gambar
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

// Komponen utama aplikasi galeri foto
export default function VisualGallery() {
  const deviceWidth = Dimensions.get('window').width;
  const cellSize = (deviceWidth - 18) / 3; // Ukuran sel gambar (3 kolom dengan margin 6px di setiap sisi)

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGrid}>
          {/* Mengiterasi data gambar untuk menampilkan grid */}
          {PHOTO_DATA_SET.map((itemData) => (
            <View
              key={itemData.uniqueId}
              style={[styles.gridCell, { width: cellSize, height: cellSize }]} // Memastikan sel gambar memiliki ukuran yang sama
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
    flexWrap: 'wrap',
    justifyContent: 'center', // Memastikan semua gambar ditempatkan dengan rapi
  },
  gridCell: {
    margin: 6, // Margin di sekitar setiap sel gambar
    backgroundColor: '#222', // Latar belakang sel
    borderRadius: 10, // Sudut gambar membulat
    overflow: 'hidden', // Memastikan gambar tidak meluap keluar
  },
  imageContainer: {
    flex: 1, // Mengisi seluruh ruang sel
  },
  responsiveImage: {
    width: '100%', // Lebar gambar menyesuaikan lebar sel
    height: '100%', // Tinggi gambar menyesuaikan tinggi sel
    borderRadius: 10, // Sudut gambar membulat
  },
});

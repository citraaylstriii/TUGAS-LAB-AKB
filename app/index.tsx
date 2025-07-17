import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
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
const ImageCell = ({ imageData }) => {
  const [isAlternateActive, setAlternateActive] = useState(false); // Untuk mengganti gambar utama dan alternatif
  const [currentScale, setCurrentScale] = useState(1); // Untuk mengatur penskalaan gambar

  // Menentukan URL gambar yang aktif (utama atau alternatif)
  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;

  // Fungsi untuk menangani klik pada gambar
  const handleCellPress = () => {
    // Mengalihkan antara gambar utama dan alternatif
    setAlternateActive(prev => !prev);

    // Meningkatkan penskalaan 1.2x per klik dan membatasi hingga 2x
    setCurrentScale(prevScale => {
      const nextScale = prevScale * 1.2; // Meningkatkan penskalaan 1.2x per klik
      return nextScale >= 2 ? 1 : nextScale; // Reset ke ukuran 1x setelah mencapai 2x
    });
  };

  return (
    <TouchableOpacity onPress={handleCellPress} style={styles.imageContainer}>
      <Image
        key={activeImageUrl}
        source={{ uri: activeImageUrl }}
        style={[styles.responsiveImage, { transform: [{ scale: currentScale }] }]} // Menerapkan penskalaan
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

// Komponen utama aplikasi galeri foto
export default function VisualGallery() {
  const deviceWidth = Dimensions.get('window').width;
  const cellSize = (deviceWidth - 18) / 3; // Ukuran sel gambar (menghitung lebar dengan margin 6px)

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGrid}>
          {/* Mengiterasi data gambar untuk menampilkan grid */}
          {PHOTO_DATA_SET.map((itemData) => (
            <View
              key={itemData.uniqueId}
              style={[styles.gridCell, { width: cellSize, height: cellSize }]} // Memastikan setiap sel gambar memiliki ukuran yang sama
            >
              <ImageCell imageData={itemData} />
            </View>
          ))}
        </View>
      </ScrollVie

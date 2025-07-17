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


const PHOTO_DATA_SET = PRIMARY_PHOTO_SOURCES.map((primaryUrl, idx) => ({
  uniqueId: idx, 
  primaryUrl,     
  alternateUrl: SECONDARY_PHOTO_SOURCES[idx] || primaryUrl, 
}));

type ImageData = {
  uniqueId: number;
  primaryUrl: string;
  alternateUrl: string;
};

const ImageCell = ({ imageData }: { imageData: ImageData }) => {

  const [isAlternateActive, setAlternateActive] = useState(false);

  const [currentScale, setCurrentScale] = useState(1);

  const [hasLoadError, setLoadError] = useState(false);

  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;


  const handleCellPress = () => {

    if (hasLoadError) return;


    setAlternateActive(prev => !prev);


    setCurrentScale(prevScale => {
      const nextCalculatedScale = prevScale * 1.2; // Mengubah penskalaan menjadi 1.2x per klik
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

        <Image
          // Menggunakan 'key' prop untuk memaksa React me-render ulang komponen Image
          // setiap kali 'activeImageUrl' berubah, memastikan gambar baru dimuat.
          key={activeImageUrl}
          source={{ uri: activeImageUrl }}
          // Callback jika terjadi kesalahan saat memuat gambar
          onError={() => setLoadError(true)}
          // Menerapkan gaya gambar, termasuk transformasi skala
          style={[appStyles.responsiveImage, { transform: [{ scale: currentScale }] }] }
          resizeMode="cover" // Memastikan gambar mengisi area tanpa distorsi
        />
      )}
    </TouchableOpacity>
  );
};


export default function VisualGallery() {
  // Mendapatkan lebar layar perangkat untuk perhitungan ukuran sel
  const deviceWidth = Dimensions.get('window').width;

  // Menghitung ukuran setiap sel gambar agar membentuk grid 3x3 yang seragam.
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


const appStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1, 
    backgroundColor: '#111', 
  },
  scrollContent: {
    alignItems: 'center', 
    paddingVertical: 20, 
  },
  imageGrid: {
    flexDirection: 'row', 
    flexWrap: 'wrap',     
    justifyContent: 'center', 
  },
  gridCell: {
    margin: 6, 
    backgroundColor: '#222', 
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  imageContainer: {
    flex: 1, 
  },
  responsiveImage: {
    width: '100%', 
    height: '100%', 
    borderRadius: 10, 
  },
  errorBlock: {
    flex: 1,
    backgroundColor: '#ffbaba', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: '#a30000', 
    fontWeight: '600',
    font

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';

const SUMBER_FOTO = [
  'https://images.pexels.com/photos/17685535/pexels-photo-17685535.jpeg',
  'https://images.pexels.com/photos/322311/pexels-photo-322311.jpeg',
  'https://images.pexels.com/photos/17685539/pexels-photo-17685539.jpeg',
  'https://images.pexels.com/photos/19453661/pexels-photo-19453661.jpeg',
  'https://images.pexels.com/photos/19453660/pexels-photo-19453660.jpeg',
  'https://images.pexels.com/photos/16959472/pexels-photo-16959472.jpeg',
  'https://images.pexels.com/photos/26791472/pexels-photo-26791472.jpeg',
  'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  'https://images.pexels.com/photos/34950/pexels-photo.jpg',
];

const KUMPULAN = SUMBER_FOTO.map((tautan, i) => ({
  kode: i + 1,
  utama: tautan,
  fallback: tautan,
}));

type ObjekGambar = {
  kode: number;
  utama: string;
  fallback: string;
};

const KartuFoto = ({ data }: { data: ObjekGambar }) => {
  const [pakaiFallback, setPakaiFallback] = useState(false);
  const [perbesar, setPerbesar] = useState(1);
  const [tidakTerload, setTidakTerload] = useState(false);

  const ketikaTekan = () => {
    if (tidakTerload) return;
    setPakaiFallback(prev => !prev);
    setPerbesar(prev => Math.min(prev * 1.15, 2));
  };

  const aktifUrl = pakaiFallback ? data.fallback : data.utama;

  return (
    <TouchableOpacity onPress={ketikaTekan} style={gayaKartu.kotak}>
      {tidakTerload ? (
        <View style={gayaKartu.blokError}>
          <Text style={gayaKartu.teks}>Gagal Tampil</Text>
        </View>
      ) : (
        <Image
          source={{ uri: aktifUrl }}
          onError={() => setTidakTerload(true)}
          style={[gayaKartu.img, { transform: [{ scale: perbesar }] }]}
        />
      )}
    </TouchableOpacity>
  );
};

export default function SusunanFoto() {
  const layarLebar = Dimensions.get('window').width;
  const ukuranFoto = layarLebar / 3 - 12;  // Ukuran gambar disesuaikan dengan lebar layar

  const potongBaris = (array: ObjekGambar[], awal: number) => array.slice(awal, awal + 3);

  return (
    <SafeAreaView style={gayaKartu.root}>
      <ScrollView contentContainerStyle={gayaKartu.scroll}>
        {[0, 3, 6].map(barisIndex => (
          <View key={barisIndex} style={gayaKartu.lajur}>
            {potongBaris(KUMPULAN, barisIndex).map(item => (
              <View key={item.kode} style={[gayaKartu.peti, { width: ukuranFoto, height: ukuranFoto }]}>
                <KartuFoto data={item} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const gayaKartu = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scroll: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  lajur: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  peti: {
    marginHorizontal: 6,
  },
  kotak: {
    flex: 1,
    aspectRatio: 1,  // Memastikan kotak tetap berbentuk persegi
    backgroundColor: '#292929',
    borderRadius: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  blokError: {
    flex: 1,
    backgroundColor: '#ffbaba',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  teks: {
    color: '#a30000',
    fontWeight: '600',
    fontSize: 13,
  },
});

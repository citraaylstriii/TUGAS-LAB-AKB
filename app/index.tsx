import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TampilanBangunRuang() {
  return (
    <View style={gayaRupa.latarTengah}>
      <View style={gayaRupa.segitigaMeruncing} />

      <View style={gayaRupa.kotakTeks}>
        <Text style={gayaRupa.tulisanUtama}>ANDI CITRA AYU LESTARI</Text>
      </View>

      <View style={gayaRupa.kapsulIdentitas}>
        <Text style={gayaRupa.tulisanUtama}>105841101722</Text>
      </View>
    </View>
  );
}

const gayaRupa = StyleSheet.create({
  latarTengah: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    backgroundColor: '#0000FF', // Warna pastel biru
  },
  segitigaMeruncing: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 65,
    borderRightWidth: 65,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff6f61', // Coral pink
  },
  kotakTeks: {
    width: 270,
    height: 64,
    backgroundColor: '#6a4c93', // Ungu tua
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  kapsulIdentitas: {
    width: 270,
    height: 64,
    backgroundColor: '#0ca678', // Warna hijau emerald
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tulisanUtama: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: '700',
  },
});

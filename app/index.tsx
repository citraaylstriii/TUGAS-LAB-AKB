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

// List of primary and secondary image URLs
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

// Combine primary and secondary image sources into one data set
const PHOTO_DATA_SET = PRIMARY_PHOTO_SOURCES.map((primaryUrl, idx) => ({
  uniqueId: idx,
  primaryUrl,
  alternateUrl: SECONDARY_PHOTO_SOURCES[idx] || primaryUrl,
}));

// ImageCell component to handle image display, scaling, and switching between primary/alternate images
const ImageCell = ({ imageData }) => {
  const [isAlternateActive, setAlternateActive] = useState(false); // Track if alternate image is active
  const [currentScale, setCurrentScale] = useState(1); // Track the current scale of the image
  const [hasLoadError, setLoadError] = useState(false); // Track if there is an error loading the image

  const activeImageUrl = isAlternateActive ? imageData.alternateUrl : imageData.primaryUrl;

  const handleCellPress = () => {
    if (hasLoadError) return;

    // Toggle between primary and alternate images on click
    setAlternateActive((prev) => !prev);

    // Scale the image by 1.2x and ensure it does not exceed 2x
    setCurrentScale((prevScale) => {
      const nextScale = prevScale * 1.2;
      return nextScale >= 2 ? 2 : nextScale; // Limit the scaling to 2x
    });
  };

  return (
    <TouchableOpacity onPress={handleCellPress} style={styles.imageContainer}>
      {hasLoadError ? (
        <View style={styles.errorBlock}>
          <Text style={styles.errorText}>Failed to Load</Text>
        </View>
      ) : (
        <Image
          key={activeImageUrl}
          source={{ uri: activeImageUrl }}
          style={[styles.responsiveImage, { transform: [{ scale: currentScale }] }]} // Apply scaling
          resizeMode="cover"
          onError={() => setLoadError(true)} // Handle image load errors
        />
      )}
    </TouchableOpacity>
  );
};

// Main component for the gallery grid layout
export default function VisualGallery() {
  const deviceWidth = Dimensions.get('window').width; // Get the device width for calculating cell size
  const cellSize = (deviceWidth - 24) / 3; // Calculate cell size (3 columns)

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGrid}>
          {PHOTO_DATA_SET.map((itemData) => (
            <View
              key={itemData.uniqueId}
              style={[styles.gridCell, { width: cellSize, height: cellSize }]} // Apply calculated cell size
            >
              <ImageCell imageData={itemData} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the application
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#111', // Dark background for contrast
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Arrange images in rows
    justifyContent: 'center',
  },
  gridCell: {
    margin: 6, // Margin around each image cell
    backgroundColor: '#222', // Background color of the image cell
    borderRadius: 10, // Rounded corners for the image cell
    overflow: 'hidden', // Ensure image doesn't overflow the rounded corners
  },
  imageContainer: {
    flex: 1, // Make the image container fill the cell
  },
  responsiveImage: {
    width: '100%', // Image width should fill the container
    height: '100%', // Image height should fill the container
    borderRadius: 10, // Rounded corners for the image itself
  },
  errorBlock: {
    flex: 1,
    backgroundColor: '#ffbaba', // Red background for error message
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: '#a30000', // Dark red color for the error text
    fontWeight: '600',
    fontSize: 13,
  },
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ViewToken,
} from "react-native";
import React, { useState, useRef } from "react";
import Pagination from "@/components/Pagination";

type Props = {
  imageList: string[];
};

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.88; // ✅ ширина как на iOS-скриншоте

const ImageSlider = ({ imageList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0]?.index !== undefined &&
      viewableItems[0]?.index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % imageList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.sliderWrapper}>
      <FlatList
        data={imageList}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.paginationWrapper}>
        <Pagination items={imageList} paginationIndex={paginationIndex} />
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  sliderWrapper: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  slide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: imageWidth,
    height: 260,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: "#e0e0e0",
  },
  paginationWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
});

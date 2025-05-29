import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ProductType } from "@/types/type";
import ImageSlider from "@/components/ImageSlider";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

const ProductDetails = () => {
  const { id, productType } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType>();
  const [selectedColor, setSelectedColor] = useState("#D4AF37");

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const URL =
      productType === "sale"
        ? `http://10.0.2.2:8000/saleProducts/${id}`
        : `http://10.0.2.2:8000/products/${id}`;
    const response = await axios.get(URL);

    setProduct(response.data);
  };

  const headerHeight = useHeaderHeight();

  const availableColors = [
    "#D4AF37",
    "#333",
    "#8bc34a",
    "#2196f3",
    "#f44336",
    "#9c27b0",
  ];

  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleAlign: "center", // <-- центрирует заголовок
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 16 }}
              onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 16 }}>
              <Ionicons name="cart-outline" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: Colors.black,
          },
        }}
      />

      <ScrollView style={{ marginTop: headerHeight, marginBottom: 90 }}>
        {product && (
          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <ImageSlider imageList={product.images} />
          </Animated.View>
        )}
        {product && (
          <View style={styles.container}>
            {/* Рейтинг и иконка */}
            <Animated.View
              style={styles.ratingWrapper}
              entering={FadeInDown.delay(500).duration(500)}>
              <View style={styles.ratingInner}>
                <Ionicons name="star" size={20} color={"#D4AF37"} />
                <Text style={styles.rating}>
                  4.7 <Text>(136)</Text>
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={22} color={Colors.black} />
              </TouchableOpacity>
            </Animated.View>

            {/* Название и цена */}
            <Animated.Text
              entering={FadeInDown.delay(700).duration(500)}
              style={styles.title}>
              {product.title}
            </Animated.Text>

            <Animated.View
              style={styles.priceWrapper}
              entering={FadeInDown.delay(500).duration(500)}>
              <Text style={styles.price}>${product.price}</Text>
              <View style={styles.priceDiscount}>
                <Text style={styles.priceDiscountText}>6% Off</Text>
              </View>
              <Text style={styles.oldPrice}>${product.price + 2}</Text>
            </Animated.View>

            {/* Описание */}
            <Animated.Text
              style={styles.description}
              entering={FadeInDown.delay(1100).duration(500)}>
              {product.description}
            </Animated.Text>

            {/* Варианты цвета и размера */}
            <Animated.View
              style={styles.productVariationWrapper}
              entering={FadeInDown.delay(1300).duration(500)}>
              {/* Цвет */}
              <View style={styles.productVariationType}>
                <Text style={styles.productVariationTitle}>Color</Text>
                <View style={styles.colorGrid}>
                  {availableColors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorCircleWrapper,
                        selectedColor === color && styles.colorCircleSelected,
                      ]}
                      onPress={() => setSelectedColor(color)}>
                      <View
                        style={[
                          styles.productVariationColorValue,
                          { backgroundColor: color },
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Размер */}
              <View style={styles.productVariationType}>
                <Text style={styles.productVariationTitle}>Size</Text>
                <View style={styles.sizeGrid}>
                  {sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.productVariationSizeValue,
                        selectedSize === size &&
                          styles.productVariationSizeValueActive,
                      ]}
                      onPress={() => setSelectedSize(size)}>
                      <Text style={styles.productVariationSizeValueText}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Animated.View>
          </View>
        )}
      </ScrollView>
      <Animated.View
        style={styles.buttonWrapper}
        entering={SlideInDown.delay(500).duration(500)}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.primary,
              borderWidth: 1,
            },
          ]}>
          <Ionicons name="cart-outline" size={20} color={Colors.primary} />
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy now</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  ratingInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color: Colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 32,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  priceDiscount: {
    backgroundColor: Colors.extraLigthGray,
    padding: 5,
    borderRadius: 5,
  },
  priceDiscountText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: "400",
    textDecorationLine: "line-through",
    color: Colors.gray,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  productVariationWrapper: {
    flexDirection: "row",
    marginTop: 30,
    flexWrap: "wrap",
  },
  productVariationType: {
    width: "50%",
    gap: 10,
    marginBottom: 20,
  },
  productVariationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    maxWidth: 180, // 5 кругов по 28 + 4 gap по 10
  },
  colorCircleWrapper: {
    padding: 2,
    borderRadius: 20,
  },
  colorCircleSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  productVariationColorValue: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.extraLigthGray,
  },
  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  productVariationSizeValue: {
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.extraLigthGray,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  productVariationSizeValueActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  productVariationSizeValueText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  buttonWrapper: {
    position: "absolute",
    height: 90,
    padding: 20,
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});

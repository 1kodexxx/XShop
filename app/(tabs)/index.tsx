import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CategoryType, ProductType } from "@/types/type";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCategories();
    getProducts();
    getSaleProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://10.0.2.2:8000/products");
    setProducts(response.data);
    setIsLoading(false);
  };

  const getCategories = async () => {
    const response = await axios.get("http://10.0.2.2:8000/categories");
    setCategories(response.data);
    setIsLoading(false);
  };

  const getSaleProducts = async () => {
    const response = await axios.get("http://10.0.2.2:8000/saleProducts");
    setSaleProducts(response.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <>
            <Categories categories={categories} />
            <FlashSale products={saleProducts} />
            <View style={styles.bannerWrapper}>
              <Image
                source={require("@/assets/images/sale-banner.jpg")}
                style={styles.banner}
              />
            </View>
            <Text style={styles.title}>All Products</Text>
          </>
        }
        renderItem={({ item, index }) => (
          <View style={styles.gridItem}>
            <ProductItem item={item} index={index} productType="regular" />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 10,
    color: Colors.black,
  },
  contentContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  gridItem: {
    flex: 1,
    margin: 10,
  },
});

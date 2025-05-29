import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "@/types/type";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";

type Props = {
  products: ProductType[];
  flatlist: boolean;
};

const ProductList = ({ products, flatlist = true }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>For You</Text>
        <TouchableOpacity>
          <Text style={styles.titleBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      {flatlist ? (
        <FlatList
          data={products}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 20 }} // ✅ добавить gap между колонками
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 20,
            paddingTop: 10,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ index, item }) => (
            <ProductItem item={item} index={index} />
          )}
        />
      ) : (
        <View style={styles.itemsWrapper}>
          {products.map((item, index) => (
            <View key={index} style={styles.productWrapper}>
              <ProductItem item={item} index={index} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: Colors.black,
  },
  titleBtn: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.6,
    color: Colors.black,
  },
  itemsWrapper: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  productWrapper: {
    width: "50%",
    paddingLeft: 5,
    marginBottom: 20,
  },
});

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { styles } from "./FlatListTest.style";

const API_URL = "https://randomuser.me/api";

type Item = {
  login: {
    uuid: string;
  };
  location: {
    country: string;
  };
};

export const FlatListTest = () => {
  const [countries, setCountries] = useState<Item[]>([]);
  const [offset, setOffset] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [count] = useState(100);

  const getCountries = async () => {
    try {
      const result = await fetch(
        `${API_URL}/?results=${limit}&page=${offset}&seed=abc`
      );
      const res = await result.json();
      setOffset((prev) => prev + 1);
      setCountries([...countries, ...res.results] as any);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMore = async () => {
    if (countries.length < count) {
      setLoading(true);
      await getCountries();
      setLoading(false);
    } else {
      console.log("No more data");
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getCountries();
      setLoading(false);
    }
    fetchData();
  }, []);

  const renderItem = (element: Item) => {
    return (
      <View style={styles.listItem}>
        <Text>{element?.location.country}</Text>
      </View>
    );
  };

  if (countries?.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={countries}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={fetchMore}
        onEndReachedThreshold={0}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

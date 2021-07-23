import * as React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";

const Item = ({ item, onPress, backgroundColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title]}>{item.name}</Text>
    <Text style={{ fontStyle: "italic" }}>
      {item.qualification}
      {"\n"}
    </Text>
    <Text>Age: {item.age}</Text>
  </TouchableOpacity>
);

export default function ClinicsScreen({ route, navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#AAE5FC" : "#ffffff";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedName(item.name);
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 25,
      }}
    >
      <Text style={styles.titletext}>Please select a tutor</Text>
      <FlatList
        style={styles.container}
        data={route.params.filter.sort((x, y) => x.age - y.age)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ justifyContent: "center" }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("TriageScreen", { selectedName });
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "#69A6D1" }}>
          Select Tutor
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  button: {
    flex: 0,
    margin: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  basetext: {
    fontFamily: "Roboto",
  },
  titletext: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 15,
  },
});

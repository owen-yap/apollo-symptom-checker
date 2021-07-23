import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import EditProfileScreen from "./editProfileScreen";

const db = SQLite.openDatabase("profile.db");

const SAMPLE_PROFILE = [
  { title: "Name", id: "0", value: "" },
  { title: "Age", id: "1", value: "" },
  { title: "Grade", id: "2", value: "" },
  { title: "School", id: "3", value: "" },
  { title: "Stream", id: "4", value: "" },
  { title: "Next National Exam", id: "5", value: "" },
  { title: "Subject", id: "6", value: "" },
];

function ProfileStackScreen({ route, navigation }) {
  const [profileInfo, setProfile] = useState(SAMPLE_PROFILE);

  function refreshProfile() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM profile",
        [],
        (txObj, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var tempProfile = SAMPLE_PROFILE;
            tempProfile[0].value = results.rows.item(0).name;
            tempProfile[1].value = results.rows.item(0).age;
            tempProfile[2].value = results.rows.item(0).grade;
            tempProfile[3].value = results.rows.item(0).school;
            tempProfile[4].value = results.rows.item(0).stream;
            tempProfile[5].value = results.rows.item(0).exam;
            tempProfile[6].value = results.rows.item(0).subject;
            setProfile(tempProfile);
          }
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  // Create the DB on first run
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS profile
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          age TEXT,
          grade TEXT,
          school TEXT,
          stream TEXT,
          exam TEXT,
          subject TEXT);
          `);
      },
      null,
      refreshProfile
    );
  }, []);

  // Responds to coming back from the add screen
  useEffect(() => {
    if (route.params?.newProfile) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            // `UPDATE profile
            // SET name=?, age=?, blood=?, chol=?, dob=?, height=?,
            //     hyper=?, sex=?, smoke=?, weight=?, fat=?, injury=?;`,
            `INSERT INTO profile (name, age, grade, school, stream, exam, subject) 
             VALUES (?,?,?,?,?,?,?)`,
            [
              route.params.newProfile.name,
              route.params.newProfile.age,
              route.params.newProfile.grade,
              route.params.newProfile.school,
              route.params.newProfile.stream,
              route.params.newProfile.exam,
              route.params.newProfile.subject,
            ]
          );
        },
        null,
        refreshProfile
      );
      console.log(route.params.newProfile);
    }
  }, [route.params?.newProfile]);

  // Edit button at top right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Entypo
            style={{ marginRight: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

  function renderProfile({ item }) {
    return (
      <View style={styles.listRecords}>
        <Text style={styles.profileTitle}>{item.title}</Text>
        <Text style={styles.profileText}>{item.value}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#69A6D1",
        marginTop: -20,
      }}
    >
      <Image
        style={styles.logo}
        source={require("../assets/adaptive-icon.png")}
      />
      <Text style={styles.name}>{profileInfo[0].value}</Text>
      <View style={styles.profileContainer}>
        <FlatList
          style={styles.list}
          data={profileInfo}
          renderItem={renderProfile}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function ProfileScreen() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerTitle: "",
          headerTitleStyle: {
            fontSize: 20,
            textAlign: "center",
          },
          headerStyle: {
            height: 100,
            backgroundColor: "#69A6D1",
            borderBottomColor: "#69A6D1",
            borderBottomWidth: 1,
          },
        }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  list: {
    width: "100%",
  },
  listItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingLeft: 20,
  },
  listRecords: {
    height: 100,
    justifyContent: "center",
    paddingLeft: 20,
    margin: 4,
    width: "46%",
  },
  profileText: {
    fontSize: 26,
    borderBottomWidth: 0,
    paddingTop: 10,
    textAlign: "left",
    lineHeight: 30,
  },
  profileTitle: {
    color: "grey",
    fontSize: 18,
  },
  button: {
    width: "80%",
    marginTop: 5,
    marginBottom: 5,
  },
  buttons: {
    flex: 0,
    width: "100%",
    height: 300,
    fontSize: 200,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#69A6D1",
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    marginTop: -20,
  },
});

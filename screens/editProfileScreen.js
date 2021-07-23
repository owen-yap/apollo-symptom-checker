import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
  var newProfile = {
    name: "",
    age: "",
    grade: "",
    school: "",
    stream: "",
    exam: "",
    subject: "",
  };

  return (
    <ScrollView style={styles.profilePrompts}>
      <Text style={styles.text}>Name (full name as shown in NRIC):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.name = text;
        }}
      />
      <Text style={styles.text}>Age:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.age = text;
        }}
      />
      <Text style={styles.text}>Grade (eg Secondary 1):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.grade = text;
        }}
      />
      <Text style={styles.text}>School:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          newProfile.school = text;
        }}
      />
      <Text style={styles.text}>Stream:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          newProfile.stream = text;
        }}
      />
      <Text style={styles.text}>Next National Exam:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.exam = text;
        }}
      />
      <Text style={styles.text}>Subject for Tutoring:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.subject = text;
        }}
      />
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Profile", { newProfile });
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "#eb637a" }}>
          Submit
        </Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "#eb637a" }}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text>{"\n\n"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profilePrompts: {
    paddingTop: 30,
    flex: 1,
    paddingLeft: 30,
  },
  textInput: {
    borderColor: "black",
    borderRadius: 10,
    padding: 7,
    backgroundColor: "white",
    marginTop: 3,
    width: "92%",
  },
  button: {
    width: "60%",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: "31%",
  },
  text: {
    paddingTop: 17,
    paddingBottom: 2,
    fontSize: 17,
  },
});

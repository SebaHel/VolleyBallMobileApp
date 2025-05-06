import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useContext, useState } from "react";
import { Context as ProfileContext } from "@/Context/profileContext";

const positions = [
  { label: "Setter", value: "setter" },
  { label: "Outside_hitter", value: "outside_hitter" },
  { label: "Opposite", value: "opposite" },
  { label: "Middle_blocker", value: "middle_blocker" },
  { label: "Libero", value: "libero" },
];

export default function Profile() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [items, setItems] = useState(positions);

  const { state, createProfile } = useContext(ProfileContext);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Setup Your Profile</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Name</Text>
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Type your name"
          style={styles.input}
          placeholderTextColor="#D8DEE970"
          maxLength={32}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Surname</Text>
        </View>
        <TextInput
          value={surname}
          onChangeText={setSurname}
          placeholder="Type your Surname"
          style={styles.input}
          placeholderTextColor="#D8DEE970"
          maxLength={32}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Choose Position:</Text>
        </View>
        <DropDownPicker
          open={open}
          value={position}
          items={items}
          setOpen={setOpen}
          setValue={setPosition}
          setItems={setItems}
          placeholder="choose..."
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholderStyle={{ color: "#D8DEE9" }}
          selectedItemLabelStyle={{ fontWeight: "bold" }}
        />
        <TouchableOpacity
          onPress={() => createProfile({ name, surname, position, router })}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21252C",
  },
  labelContainer: {
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  input: {
    left: 35,
    width: 342,
    height: 55,
    borderColor: "#3B4252",
    borderWidth: 1,
    borderRadius: 15,
    opacity: 80,
    marginBottom: 20,
    color: "#D8DEE990",
    fontSize: 20,
  },
  label: {
    marginBottom: 13,
    left: 20,
    alignSelf: "flex-start",
    color: "#FFF",
    fontSize: 28,
    marginTop: 30,
  },
  button: {
    marginTop: 55,
    left: 115,
    justifyContent: "center",
    alignItems: "center",
    width: 180,
    height: 70,
    borderWidth: 1,
    backgroundColor: "#3B4252",
    borderRadius: 15,
    elevation: 3,
  },
  dropdown: {
    width: 342,
    left: 35,
    backgroundColor: "#3B4252",
    borderColor: "#3B4252",
    borderRadius: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#D8DEE9",
  },
  formContainer: {
    width: "100%",
    height: "85%",
    backgroundColor: "#3B425270",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headerContainer: {
    height: "15%",
  },
  header: {
    marginBottom: 13,
    top: 30,
    left: -50,
    color: "#D8DEE9",
    fontSize: 32,
    fontWeight: "400",
  },
  buttonText: {
    color: "#F9A826",
    fontSize: 32,
  },
});

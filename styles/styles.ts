import { StyleSheet } from "react-native";
import Colors from "../constant/Colors";
import { ScreenContainer } from "react-native-screens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.buttonColor,
  },
  text: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  worldClockIcon: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: 35,
    padding: 2,
    position: "absolute",
    bottom: 5,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  worldClockIconFocused: {
    backgroundColor: "#89b9fe",
  },
});

export default styles;

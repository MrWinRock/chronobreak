import { StyleSheet } from "react-native";
import Colors from "../constant/Colors";
import TimeSelector from "../components/TimeSelector";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 50,
    paddingBottom: 150,
  },
  button: {
    backgroundColor: Colors.buttonColor,
  },
  text: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Poppins",
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

  // World Clock Screen
  timeContainer: {
    width: "100%",
    backgroundColor: Colors.cardColor,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 25,
    marginVertical: 5,
    borderRadius: 10,
  },
  cityName: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 5,
    color: Colors.textCardColor,
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: "500",
    color: Colors.textCardColor,
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: {
    color: Colors.textColor,
    fontSize: 36,
    fontWeight: 700,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  deletingContainer: {
    width: "40%",
    backgroundColor: "#db001f",
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  deleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  // Time Zone Converter
  picker: {
    height: 50,
    width: "100%",
    color: Colors.textColor,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
  },
  timezoneContainer: {
    marginTop: 20,
    backgroundColor: Colors.cardColor,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    maxHeight: 360,
  },
  convertedTimeContainer: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  convertedText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  convertedTime: {
    fontSize: 32,
    fontWeight: "500",
    color: "#000",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  timePicker: {
    flex: 1,
    height: 150,
  },
  timeSelectorContainer: {
    padding: 10,
    borderRadius: 10,
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    height: 180,
    width: 100,
  },
  scrollViewContent: {
    paddingVertical: 60,
  },
  scrollItem: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItemText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  itemText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#a3cae0",
  },
  colon: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "900",
    marginHorizontal: 10,
  },
  timezoneMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default styles;

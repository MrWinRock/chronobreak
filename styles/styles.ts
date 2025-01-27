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
    height: 1000,
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
    padding: 30,
    borderRadius: 10,
    marginTop: 100,
    marginBottom: 10,
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wheelWrapper: {
    backgroundColor: "#7ab2d3", // Background for the picker
    borderRadius: 10, // Rounded corners
    overflow: "hidden", // Ensure rounded corners are applied
  },
  scrollView: {
    height: 120,
    width: 100,
  },
  scrollItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItemText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Highlighted text color
  },
  itemText: {
    fontSize: 20,
    color: "#B0C4DE", // Dimmed text color for unselected items
  },
  colon: {
    fontSize: 40,
    color: "#000",
    marginHorizontal: 10,
  },
});

export default styles;

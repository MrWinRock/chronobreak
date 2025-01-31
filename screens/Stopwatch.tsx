import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startStop = () => {
    if (running) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
  };

  const reset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  const recordLap = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonRow}>
        {running ? (
          <TouchableOpacity
            style={[styles.button, styles.lapButton]}
            onPress={recordLap}
          >
            <Text style={styles.buttonLap}>Lap</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={reset}
          >
            <Text style={styles.buttonLap}>Reset</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            running ? styles.stopButton : styles.startButton,
          ]}
          onPress={startStop}
        >
          <Text style={styles.buttonStart}>{running ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={laps}
        renderItem={({ item, index }) => (
          <View style={styles.lapContainer}>
            <Text style={styles.lapText}>
              Lap {index + 1}: {formatTime(item)}
            </Text>
            <View style={styles.separator} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7ab2d3",
  },
  timer: {
    marginTop: 250,
    fontSize: 70,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#fff",
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 2, // เพิ่มกรอบให้ปุ่ม
    borderColor: "#fff", // สีกรอบปุ่ม
  },
  startButton: {
    backgroundColor: "#1E90FF",
  },
  stopButton: {
    backgroundColor: "#FF4500",
  },
  lapButton: {
    backgroundColor: "#A9D7E7CC", // สีปุ่ม Lap
  },
  resetButton: {
    backgroundColor: "#A9D7E7CC", // สีปุ่ม Reset
  },
  buttonStart: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  buttonLap: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3d6a76",
  },
  lapContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  lapText: {
    fontSize: 20,
    width: "100%",
    color: "#fff",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 5,
  },
});

export default Stopwatch;

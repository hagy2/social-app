import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const initial = name ? name[0].toUpperCase() : "?";
  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Avatar;

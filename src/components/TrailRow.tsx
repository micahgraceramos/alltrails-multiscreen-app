import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeColors } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";
import { DIFFICULTY_STYLE, Trail } from "../data/trails";

type TrailRowProps = {
  trail: Trail;
  completed: boolean;
  onPress: () => void;
};

const TrailRow = ({ trail, completed, onPress }: TrailRowProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { marker, color } = DIFFICULTY_STYLE[trail.difficulty];

  return (
    <Pressable style={styles.trailRow} onPress={onPress}>
      <Image
        source={trail.image}
        style={styles.trailPhoto}
        resizeMode="cover"
      />
      <View style={styles.trailInfo}>
        <Text style={styles.trailName} numberOfLines={2}>
          {trail.name}
        </Text>
        <Text style={styles.trailPark} numberOfLines={1}>
          {trail.park}
        </Text>
        <Text style={styles.trailMeta}>
          ★ {trail.rating} · <Text style={{ color }}>{marker}</Text>{" "}
          {trail.difficulty} · {trail.lengthKm} km
        </Text>
      </View>
      <Ionicons
        name={completed ? "checkmark-circle" : "checkmark-circle-outline"}
        size={28}
        color={completed ? "#3FA34D" : colors.text}
      />
    </Pressable>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    trailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 18,
    },
    trailPhoto: {
      width: 100,
      height: 100,
      borderRadius: 16,
    },
    trailInfo: {
      flex: 1,
    },
    trailName: {
      fontSize: 17,
      fontWeight: "600",
      color: c.text,
    },
    trailPark: {
      fontSize: 16,
      color: c.textMuted,
      marginTop: 2,
    },
    trailMeta: {
      fontSize: 16,
      color: c.textMuted,
      marginTop: 2,
    },
  });

export default TrailRow;

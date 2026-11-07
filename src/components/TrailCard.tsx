import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeColors } from "../constants/theme";
import { useSaved } from "../context/SavedContext";
import { useTheme } from "../context/ThemeContext";
import { DIFFICULTY_STYLE, Trail } from "../data/trails";

type TrailCardProps = {
  trail: Trail;
  onPress: () => void;
  compact?: boolean;
};

const TrailCard = ({ trail, onPress, compact = false }: TrailCardProps) => {
  const { isSaved, toggleSaved } = useSaved();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const saved = isSaved(trail.id);
  const { marker, color } = DIFFICULTY_STYLE[trail.difficulty];

  return (
    <Pressable
      style={compact ? styles.compactCard : styles.card}
      onPress={onPress}
    >
      <Image
        source={trail.image}
        style={[styles.photo, compact && styles.compactPhoto]}
        resizeMode="cover"
      />

      <View style={styles.infoRow}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {trail.name}
          </Text>
          <Text style={styles.park} numberOfLines={1}>
            {trail.park}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            ★ {trail.rating} · <Text style={{ color }}>{marker}</Text>{" "}
            {trail.difficulty} · {trail.lengthKm} km
            {compact ? "" : ` · Est. ${trail.time}`}
          </Text>
        </View>
        <Pressable onPress={() => toggleSaved(trail.id)} hitSlop={10}>
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={24}
            color={colors.text}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginBottom: 24,
    },
    compactCard: {
      width: 250,
    },
    photo: {
      width: "100%",
      height: 210,
      borderRadius: 16,
    },
    compactPhoto: {
      height: 150,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      marginTop: 10,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 17,
      fontWeight: "600",
      color: c.text,
    },
    park: {
      fontSize: 15,
      color: c.textMuted,
      marginTop: 2,
    },
    meta: {
      fontSize: 15,
      color: c.textMuted,
      marginTop: 2,
    },
  });

export default TrailCard;

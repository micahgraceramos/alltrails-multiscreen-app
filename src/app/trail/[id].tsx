import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "../../constants/theme";
import { useSaved } from "../../context/SavedContext";
import { useTheme } from "../../context/ThemeContext";
import { DIFFICULTY_STYLE, getTrail } from "../../data/trails";

const TrailDetail = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isSaved, toggleSaved } = useSaved();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const trail = getTrail(id);

  if (!trail) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top }]}>
        <Text style={styles.name}>Trail not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const saved = isSaved(trail.id);
  const { marker, color } = DIFFICULTY_STYLE[trail.difficulty];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable style={styles.circleButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.pill}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
          <Pressable onPress={() => toggleSaved(trail.id)} hitSlop={10}>
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={22}
              color={colors.text}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.body}>
          <Image source={trail.image} style={styles.hero} resizeMode="cover" />
          <Text style={styles.name}>{trail.name}</Text>
          <Text style={styles.park}>{trail.park}</Text>
          <Text style={styles.meta}>
            ★ {trail.rating} ({trail.reviews} reviews) ·{" "}
            <Text style={{ color }}>{marker}</Text> {trail.difficulty}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Length</Text>
              <Text style={styles.statValue}>{trail.lengthKm} km</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Elevation gain</Text>
              <Text style={styles.statValue}>{trail.elevationM} m</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Est. time</Text>
              <Text style={styles.statValue}>{trail.time}</Text>
            </View>
          </View>

          <View style={styles.chip}>
            <Ionicons
              name={
                trail.routeType === "Loop"
                  ? "sync-outline"
                  : "swap-horizontal-outline"
              }
              size={18}
              color={colors.text}
            />
            <Text style={styles.chipText}>{trail.routeType}</Text>
          </View>

          <Text style={styles.sectionTitle}>About this trail</Text>
          <Text style={styles.description}>{trail.description}</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <Pressable
          style={[styles.bigButton, styles.saveButton]}
          onPress={() => toggleSaved(trail.id)}
        >
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={22}
            color={colors.text}
          />
          <Text style={styles.bigButtonText}>{saved ? "Saved" : "Save"}</Text>
        </Pressable>
        <View style={[styles.bigButton, styles.startButton]}>
          <Ionicons name="navigate" size={22} color={colors.onAccent} />
          <Text style={[styles.bigButtonText, styles.onAccentText]}>Start</Text>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    content: { paddingBottom: 24 },
    notFound: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      backgroundColor: c.background,
    },
    link: {
      fontSize: 16,
      color: c.text,
      textDecorationLine: "underline",
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    hero: {
      width: "100%",
      height: 300,
      borderRadius: 20,
      marginBottom: 20,
    },
    circleButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
      justifyContent: "center",
    },
    pill: {
      flexDirection: "row",
      gap: 28,
      paddingHorizontal: 20,
      height: 46,
      borderRadius: 23,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
    },
    body: {
      paddingHorizontal: 20,
      paddingTop: 4,
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: c.text,
    },
    park: {
      fontSize: 17,
      color: c.textMuted,
      marginTop: 4,
    },
    meta: {
      fontSize: 16,
      color: c.textMuted,
      marginTop: 4,
    },
    statsRow: {
      flexDirection: "row",
      marginTop: 22,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: c.divider,
    },
    stat: {
      flex: 1,
    },
    statLabel: {
      fontSize: 14,
      color: c.textMuted,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "600",
      color: c.text,
      marginTop: 4,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 22,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginTop: 18,
    },
    chipText: {
      fontSize: 16,
      color: c.text,
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: c.text,
      marginTop: 24,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: c.text,
      marginTop: 8,
    },
    bottomBar: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 20,
      paddingTop: 12,
      backgroundColor: c.background,
      borderTopWidth: 1,
      borderTopColor: c.divider,
    },
    bigButton: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      height: 54,
      borderRadius: 27,
    },
    saveButton: { backgroundColor: c.buttonGrey },
    startButton: { backgroundColor: c.accent },
    bigButtonText: { fontSize: 20, fontWeight: "500", color: c.text },
    onAccentText: { color: c.onAccent },
  });

export default TrailDetail;

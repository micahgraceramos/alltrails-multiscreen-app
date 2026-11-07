import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrailRow from "../../components/TrailRow";
import { ThemeColors } from "../../constants/theme";
import { useSaved } from "../../context/SavedContext";
import { useTheme } from "../../context/ThemeContext";
import { TRAILS } from "../../data/trails";

const COMPLETED_IDS = ["parker-ridge"];

const Saved = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { savedIds } = useSaved();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const savedTrails = TRAILS.filter((trail) => savedIds.includes(trail.id));
  const completedCount = savedTrails.filter((trail) =>
    COMPLETED_IDS.includes(trail.id),
  ).length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <FlatList
        data={savedTrails}
        keyExtractor={(trail) => trail.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}></View>

            <Text style={styles.title}>Trails I want to Hike</Text>

            <View style={styles.chip}>
              <Ionicons name="people-outline" size={18} color={colors.text} />
              <Text style={styles.chipText}>Collaborators</Text>
            </View>

            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  <Text style={styles.progressBig}>
                    {completedCount}/{savedTrails.length}
                  </Text>{" "}
                  completed
                </Text>
                <Text style={styles.hide}>Hide</Text>
              </View>

              <View style={styles.track}>
                <View style={[styles.fill, { flex: completedCount }]} />
                <View style={{ flex: savedTrails.length - completedCount }} />
              </View>
            </View>

            <View style={styles.sortRow}>
              <View style={styles.sortLeft}>
                <Text style={styles.sortText}>Last updated</Text>
                <Ionicons name="chevron-down" size={16} color={colors.text} />
              </View>
              <Text style={styles.sortText}>
                {savedTrails.length}{" "}
                {savedTrails.length === 1 ? "item" : "items"}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TrailRow
            trail={item}
            completed={COMPLETED_IDS.includes(item.id)}
            onPress={() => router.push(`/trail/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={40} color={colors.icon} />
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart on any trail to add it here.
            </Text>
          </View>
        }
      />

      <View style={styles.bottomBar}>
        <View style={[styles.bigButton, styles.downloadButton]}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={24}
            color={colors.onAccent}
          />
          <Text style={[styles.bigButtonText, styles.onAccentText]}>
            Download
          </Text>
        </View>
        <View style={[styles.bigButton, styles.mapButton]}>
          <Ionicons name="map" size={22} color={colors.text} />
          <Text style={styles.bigButtonText}>Map</Text>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: 20, paddingBottom: 24 },
    bottomBar: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: c.background,
      borderTopWidth: 1,
      borderTopColor: c.divider,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
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
      gap: 36,
      paddingHorizontal: 22,
      height: 46,
      borderRadius: 23,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: c.text,
      marginTop: 20,
      marginBottom: 14,
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
    },
    chipText: {
      fontSize: 16,
      color: c.text,
      fontWeight: "500",
    },
    progressCard: {
      backgroundColor: c.card,
      borderRadius: 20,
      padding: 18,
      marginTop: 20,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    progressText: {
      fontSize: 18,
      color: c.text,
      fontWeight: "500",
    },
    progressBig: {
      fontSize: 34,
      fontWeight: "bold",
    },
    hide: {
      fontSize: 16,
      color: c.textMuted,
      textDecorationLine: "underline",
    },
    track: {
      height: 16,
      borderRadius: 8,
      backgroundColor: c.track,
      marginTop: 18,
      flexDirection: "row",
      overflow: "hidden",
    },
    fill: {
      height: 16,
      borderRadius: 8,
      backgroundColor: c.accent,
    },
    sortRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 28,
      marginBottom: 20,
    },
    sortLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    sortText: {
      fontSize: 17,
      color: c.text,
      fontWeight: "500",
    },
    empty: {
      alignItems: "center",
      marginTop: 30,
      gap: 6,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: c.text,
    },
    emptyText: {
      fontSize: 15,
      color: c.textMuted,
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
    downloadButton: { backgroundColor: c.accent },
    mapButton: { backgroundColor: c.buttonGrey },
    bigButtonText: { fontSize: 20, fontWeight: "500", color: c.text },
    onAccentText: { color: c.onAccent },
  });

export default Saved;

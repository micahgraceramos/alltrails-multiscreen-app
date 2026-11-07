import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrailCard from "../../components/TrailCard";
import { ThemeColors } from "../../constants/theme";
import { useTheme } from "../../context/ThemeContext";
import { Difficulty, TRAILS } from "../../data/trails";

const FILTERS: ("All" | Difficulty)[] = ["All", "Easy", "Moderate", "Hard"];

const Explore = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Difficulty>("All");

  const search = query.toLowerCase();
  const visible = TRAILS.filter((trail) => {
    const matchesSearch =
      trail.name.toLowerCase().includes(search) ||
      trail.park.toLowerCase().includes(search);
    const matchesFilter = filter === "All" || trail.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find trails"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={10}>
              <Ionicons name="close-circle" size={20} color={colors.icon} />
            </Pressable>
          )}
        </View>
        <View style={styles.circleButton}>
          <Ionicons name="options-outline" size={22} color={colors.text} />
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {FILTERS.map((option) => {
            const active = option === filter;
            return (
              <Pressable
                key={option}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFilter(option)}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(trail) => trail.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.count}>
            {visible.length} {visible.length === 1 ? "trail" : "trails"} near
            Calgary
          </Text>
        }
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            onPress={() => router.push(`/trail/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="trail-sign-outline" size={40} color={colors.icon} />
            <Text style={styles.emptyTitle}>No trails found</Text>
            <Text style={styles.emptyText}>
              Try a different search or difficulty.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 20,
      marginTop: 8,
    },
    searchBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      height: 50,
      borderRadius: 25,
      paddingHorizontal: 18,
      backgroundColor: c.card,
    },
    searchInput: {
      flex: 1,
      fontSize: 17,
      color: c.text,
    },
    circleButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
      justifyContent: "center",
    },
    chipRow: {
      gap: 8,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    chip: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    chipActive: {
      backgroundColor: c.text,
      borderColor: c.text,
    },
    chipText: {
      fontSize: 15,
      fontWeight: "500",
      color: c.text,
    },
    chipTextActive: {
      color: c.background,
    },
    list: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    count: {
      fontSize: 17,
      fontWeight: "500",
      color: c.text,
      marginBottom: 14,
    },
    empty: {
      alignItems: "center",
      marginTop: 60,
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
  });

export default Explore;

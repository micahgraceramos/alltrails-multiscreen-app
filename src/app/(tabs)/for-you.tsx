import { useRouter } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrailCard from "../../components/TrailCard";
import { ThemeColors } from "../../constants/theme";
import { useTheme } from "../../context/ThemeContext";
import { Trail, TRAILS } from "../../data/trails";

type Section = {
  title: string;
  subtitle: string;
  trails: Trail[];
};

const SECTIONS: Section[] = [
  {
    title: "Top rated in the Rockies",
    subtitle: "Loved by hikers this season",
    trails: TRAILS.filter((trail) => trail.rating >= 4.7),
  },
  {
    title: "Short on time?",
    subtitle: "Trails under 7 km",
    trails: TRAILS.filter((trail) => trail.lengthKm < 7),
  },
  {
    title: "Banff National Park",
    subtitle: "Popular near you",
    trails: TRAILS.filter((trail) => trail.park === "Banff National Park"),
  },
];

const ForYou = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>For you</Text>
        <Text style={styles.intro}>Picked from the trails you've saved</Text>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
              </View>
              <Text style={styles.seeAll}>See all</Text>
            </View>

            <FlatList
              data={section.trails}
              keyExtractor={(trail) => trail.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}
              renderItem={({ item }) => (
                <TrailCard
                  trail={item}
                  compact
                  onPress={() => router.push(`/trail/${item.id}`)}
                />
              )}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    content: { paddingBottom: 24 },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: c.text,
      marginTop: 20,
      paddingHorizontal: 20,
    },
    intro: {
      fontSize: 16,
      color: c.textMuted,
      marginTop: 4,
      paddingHorizontal: 20,
    },
    section: {
      marginTop: 28,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: c.text,
    },
    sectionSubtitle: {
      fontSize: 15,
      color: c.textMuted,
      marginTop: 2,
    },
    seeAll: {
      fontSize: 15,
      color: c.text,
      textDecorationLine: "underline",
    },
    carousel: {
      gap: 14,
      paddingHorizontal: 20,
    },
  });

export default ForYou;

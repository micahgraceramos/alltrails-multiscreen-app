import { Ionicons } from "@expo/vector-icons";
import { type ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "../../constants/theme";
import { useSaved } from "../../context/SavedContext";
import { ThemeMode, useTheme } from "../../context/ThemeContext";

const PROFILE = {
  name: "Micah Grace",
  initials: "MG",
  location: "Calgary, Alberta",
  memberSince: "Member since 2020",
  activities: 12,
  distanceKm: 84,
};

const APPEARANCE: { mode: ThemeMode; label: string }[] = [
  { mode: "system", label: "System" },
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
];

type MenuRowProps = {
  label: string;
  children: ReactNode;
};

const MenuRow = ({ label, children }: MenuRowProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Pressable style={styles.row}>
      {children}
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.icon} />
    </Pressable>
  );
};

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { savedIds } = useSaved();
  const { colors, mode, setMode } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.circleButton}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </View>
        </View>

        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{PROFILE.initials}</Text>
          </View>
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.subtle}>
            {PROFILE.location} · {PROFILE.memberSince}
          </Text>
          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>Edit profile</Text>
          </Pressable>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{PROFILE.activities}</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{PROFILE.distanceKm} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{savedIds.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your activity</Text>
        <MenuRow label="Activities">
          <Ionicons name="walk-outline" size={22} color={colors.text} />
        </MenuRow>
        <MenuRow label="Completed trails">
          <Ionicons
            name="checkmark-done-outline"
            size={22}
            color={colors.text}
          />
        </MenuRow>
        <MenuRow label="Photos">
          <Ionicons name="images-outline" size={22} color={colors.text} />
        </MenuRow>
        <MenuRow label="Reviews">
          <Ionicons name="star-outline" size={22} color={colors.text} />
        </MenuRow>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.segment}>
          {APPEARANCE.map((option) => {
            const active = option.mode === mode;
            return (
              <Pressable
                key={option.mode}
                style={[styles.segmentButton, active && styles.segmentActive]}
                onPress={() => setMode(option.mode)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    active && styles.segmentTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <MenuRow label="Settings">
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </MenuRow>
        <MenuRow label="Notifications">
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.text}
          />
        </MenuRow>
        <MenuRow label="Help & support">
          <Ionicons name="help-circle-outline" size={22} color={colors.text} />
        </MenuRow>

        <Pressable style={styles.logOut}>
          <Text style={styles.logOutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: 20, paddingBottom: 32 },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: c.text,
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
    header: {
      alignItems: "center",
      marginTop: 24,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: c.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      fontSize: 34,
      fontWeight: "bold",
      color: c.onAccent,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: c.text,
      marginTop: 12,
    },
    subtle: {
      fontSize: 15,
      color: c.textMuted,
      marginTop: 4,
    },
    editButton: {
      marginTop: 14,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 22,
      paddingHorizontal: 22,
      paddingVertical: 10,
    },
    editText: {
      fontSize: 16,
      fontWeight: "500",
      color: c.text,
    },
    statsCard: {
      flexDirection: "row",
      backgroundColor: c.card,
      borderRadius: 20,
      paddingVertical: 18,
      marginTop: 24,
    },
    stat: {
      flex: 1,
      alignItems: "center",
    },
    statNumber: {
      fontSize: 22,
      fontWeight: "bold",
      color: c.text,
    },
    statLabel: {
      fontSize: 14,
      color: c.textMuted,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      backgroundColor: c.track,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: c.text,
      marginTop: 28,
      marginBottom: 6,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    rowLabel: {
      flex: 1,
      fontSize: 17,
      color: c.text,
    },
    segment: {
      flexDirection: "row",
      gap: 8,
      marginTop: 6,
    },
    segmentButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: c.border,
    },
    segmentActive: {
      backgroundColor: c.text,
      borderColor: c.text,
    },
    segmentText: {
      fontSize: 15,
      fontWeight: "500",
      color: c.text,
    },
    segmentTextActive: {
      color: c.background,
    },
    logOut: {
      marginTop: 28,
      height: 54,
      borderRadius: 27,
      backgroundColor: c.buttonGrey,
      alignItems: "center",
      justifyContent: "center",
    },
    logOutText: {
      fontSize: 18,
      fontWeight: "500",
      color: c.danger,
    },
  });

export default Profile;

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
// import { Stack } from 'expo-router';
// import { colors, typography, spacing, borderRadius } from '@/constants/theme';
// import { Bell, Globe, Palette, Info } from 'lucide-react-native';

// export default function SettingsScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Stack.Screen
//         options={{
//           headerShown: true,
//           headerTitle: 'Réglages',
//           headerStyle: {
//             backgroundColor: colors.backgroundElevated,
//           },
//           headerTintColor: colors.text,
//           headerTitleStyle: {
//             ...typography.h3,
//             fontWeight: '700' as const,
//           },
//         }}
//       />

//       <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Préférences</Text>

//           <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
//             <View style={styles.settingLeft}>
//               <Bell color={colors.primary} size={20} />
//               <Text style={styles.settingLabel}>Notifications</Text>
//             </View>
//             <Text style={styles.settingValue}>Activées</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
//             <View style={styles.settingLeft}>
//               <Globe color={colors.primary} size={20} />
//               <Text style={styles.settingLabel}>Langue</Text>
//             </View>
//             <Text style={styles.settingValue}>Français</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
//             <View style={styles.settingLeft}>
//               <Palette color={colors.primary} size={20} />
//               <Text style={styles.settingLabel}>Thème</Text>
//             </View>
//             <Text style={styles.settingValue}>Sombre</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>À propos</Text>

//           <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
//             <View style={styles.settingLeft}>
//               <Info color={colors.primary} size={20} />
//               <Text style={styles.settingLabel}>Version</Text>
//             </View>
//             <Text style={styles.settingValue}>1.0.0</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.infoCard}>
//           <Text style={styles.infoTitle}>CinéManager</Text>
//           <Text style={styles.infoText}>
//             Gérez vos réservations de cinéma en toute simplicité. Découvrez les films à
//             l&apos;affiche, réservez vos places et suivez vos statistiques.
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   content: {
//     padding: spacing.md,
//   },
//   section: {
//     marginBottom: spacing.xl,
//   },
//   sectionTitle: {
//     ...typography.h4,
//     color: colors.text,
//     marginBottom: spacing.md,
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: colors.backgroundCard,
//     borderRadius: borderRadius.lg,
//     padding: spacing.md,
//     marginBottom: spacing.sm,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   settingLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//   },
//   settingLabel: {
//     ...typography.body,
//     color: colors.text,
//   },
//   settingValue: {
//     ...typography.bodySmall,
//     color: colors.textSecondary,
//   },
//   infoCard: {
//     backgroundColor: colors.backgroundCard,
//     borderRadius: borderRadius.lg,
//     padding: spacing.md,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   infoTitle: {
//     ...typography.h4,
//     color: colors.text,
//     marginBottom: spacing.sm,
//   },
//   infoText: {
//     ...typography.bodySmall,
//     color: colors.textSecondary,
//     lineHeight: 20,
//   },
// });

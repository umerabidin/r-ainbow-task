import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { AppText, Button } from '../components/common';
import { theme } from '../types/themes';
import { isBirthdayWeek } from '../utils/dateUtils';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { state: authState, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Alert!", "Are you sure you want to logout?", [{
      text: 'Yes', onPress: () => logout()
    }, {
      text: 'No'
    }])
  };

  const formatBirthDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {authState.user?.profilePic ?
          <Image
            source={{ uri: '' }}
            style={styles.avatar}
          />
          : <Image
            source={require('../assets/profile-placeholder.png')}
            style={styles.avatar}
          />
        }

        <AppText style={styles.name}>{authState.user?.name}</AppText>
        <AppText style={styles.email}>{authState.user?.email}</AppText>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Birth Date:</AppText>
          <AppText style={styles.detailValue}>
            {authState.user?.dateOfBirth ? formatBirthDate(authState.user.dateOfBirth) : 'Not provided'}
          </AppText>
        </View>

        {isBirthdayWeek(authState.user?.dateOfBirth!) && authState.user?.discount && (
          <View style={styles.birthdaySection}>
            <AppText style={styles.sectionTitle}>Your Birthday Treat</AppText>
            <View style={styles.discountContainer}>
              <AppText style={styles.discountLabel}>Discount Code:</AppText>
              <AppText style={styles.discountCode}>{authState.user?.discount.code}</AppText>
            </View>
            <AppText style={styles.discountNote}>
              Valid during your birthday week
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Button
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  email: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  profileDetails: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  detailValue: {
    fontSize: 16,
    color: theme.colors.text,
  },
  birthdaySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  discountLabel: {
    fontSize: 16,
    marginRight: 10,
    color: theme.colors.text,
  },
  discountCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  discountNote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.colors.gray,
  },
  actions: {
    padding: 20,
    marginTop: 'auto',
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
  },
  logoutButtonText: {
    color: 'white',
  },
});

export default ProfileScreen;
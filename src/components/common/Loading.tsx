import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

export function Loading({ size = 'large', color = '#6D28D9' }: LoadingProps) {
  return (
    <View testID="loading-indicator" style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

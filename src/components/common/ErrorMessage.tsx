import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUserMessage } from '../../errors';
import { useLocale } from '../../i18n';
import { copy } from '../../i18n/copy';

interface ErrorMessageProps {
  message?: string;
  error?: unknown;
  onRetry?: () => void;
}

export function ErrorMessage({ message, error, onRetry }: ErrorMessageProps) {
  useLocale();

  const display = message ?? (error ? getUserMessage(error) : 'Ocurrió un error.');

  return (
    <View testID="error-message" style={styles.container}>
      <Text style={styles.errorText}>{display}</Text>
      {onRetry && (
        <TouchableOpacity
          testID="error-retry-button"
          style={styles.retryButton}
          onPress={onRetry}
        >
          <Text style={styles.retryText}>{copy.common.retry()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#6D28D9',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6D28D9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

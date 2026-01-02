import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ErrorMessage, Loading, NewsList } from "../components";
import { copy } from "../i18n/copy";
import { useNewsQuery } from "../services/queries/useNewsQuery";
import { useLocaleStore } from "../store/useLocaleStore";
import { useNotificationStore } from "../store/useNotificationStore";

export default function NewsScreen() {
  useLocaleStore((state) => state.locale);

  const markNewsAsRead = useNotificationStore((state) => state.markNewsAsRead);

  useEffect(() => {
    markNewsAsRead();
  }, [markNewsAsRead]);

  const {
    data: articles,
    isLoading: loading,
    error,
    refetch,
  } = useNewsQuery();

  const handleRefresh = () => {
    refetch();
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading && !articles) {
    return <Loading />;
  }

  if (error && !articles) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  return (
    <View testID="news-screen" style={styles.container}>
      {articles && articles.length > 0 ? (
        <NewsList
          key="news-list"
          articles={articles}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      ) : (
        <View key="news-empty" testID="news-empty-state" style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{copy.news.emptyMessage()}</Text>
        </View>
      )}

      {error && articles && (
        <View key="news-error" testID="news-error-banner" style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "600",
  },

  errorBanner: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#FECACA",
  },

  errorBannerText: {
    color: "#DC2626",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});

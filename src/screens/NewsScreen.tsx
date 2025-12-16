import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ErrorMessage, Loading, NewsList } from "../components";
import { useLocale } from "../i18n";
import { copy } from "../i18n/copy";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchNews } from "../store/slices";

export default function NewsScreen() {
  useLocale();

  const dispatch = useAppDispatch();
  const {
    data: articles,
    loading,
    error,
  } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchNews());
  };

  const handleRetry = () => {
    dispatch(fetchNews());
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

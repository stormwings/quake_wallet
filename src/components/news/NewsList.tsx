import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { NewsArticle } from "../../types";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  articles: NewsArticle[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const NewsList: React.FC<NewsListProps> = ({
  articles,
  refreshing = false,
  onRefresh,
}) => {
  return (
    <FlatList
      testID="news-list"
      data={articles}
      keyExtractor={(item) => item.uuid}
      renderItem={({ item }) => <NewsCard article={item} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
});

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocale } from "../../i18n";
import { NewsArticle } from "../../types";

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  useLocale();

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      testID={`news-card-${article.uuid}`}
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {article.image_url && (
        <Image
          source={{ uri: article.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text testID="news-card-title" style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        <Text
          testID="news-card-description"
          style={styles.description}
          numberOfLines={3}
        >
          {article.snippet}
        </Text>

        <View style={styles.footer}>
          <View style={styles.sourceRow}>
            <Text style={styles.source}>{article.source}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.date}>{formatDate(article.published_at)}</Text>
          </View>

          <Ionicons name="open-outline" size={16} color={TOKENS.primary} />
        </View>

        {article.entities && article.entities.length > 0 && (
          <View style={styles.symbolsRow}>
            {article.entities.slice(0, 3).map((entity, index) => (
              <View key={`${article.uuid}-${entity.symbol}-${index}`} style={styles.symbolChip}>
                <Text style={styles.symbolText}>{entity.symbol}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const TOKENS = {
  text: "#111827",
  subtext: "#6B7280",
  border: "#E6EAF2",
  primary: "#6D28D9",
  chipBg: "#F3E8FF",
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: TOKENS.border,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#F3F4F6",
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: TOKENS.text,
    lineHeight: 20,
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    color: TOKENS.subtext,
    lineHeight: 18,
    marginBottom: 10,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  source: {
    fontSize: 11,
    color: TOKENS.subtext,
    fontWeight: "600",
  },

  dot: {
    fontSize: 11,
    color: TOKENS.subtext,
  },

  date: {
    fontSize: 11,
    color: TOKENS.subtext,
  },

  symbolsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap",
  },

  symbolChip: {
    backgroundColor: TOKENS.chipBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  symbolText: {
    fontSize: 10,
    fontWeight: "700",
    color: TOKENS.primary,
  },
});

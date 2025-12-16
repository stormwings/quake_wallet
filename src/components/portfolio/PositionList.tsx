import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { Position } from "../../types";
import { PositionCard } from "./PositionCard";

interface PositionListProps {
  positions: Position[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const PositionList: React.FC<PositionListProps> = ({
  positions,
  refreshing = false,
  onRefresh,
}) => {
  return (
    <FlatList
      testID="position-list"
      data={positions}
      keyExtractor={(item, index) => `${item.instrument_id}-${item.avg_cost_price}-${index}`}
      renderItem={({ item }) => <PositionCard position={item} />}
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
    paddingTop: 2,
    paddingBottom: 16,
  },
});

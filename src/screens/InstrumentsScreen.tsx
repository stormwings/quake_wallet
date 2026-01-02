import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ErrorMessage, InstrumentCard, Loading, OrderModal } from '../components';
import { useInstrumentsQuery } from '../services/queries/useInstrumentsQuery';
import { useOrderModalStore } from '../store/useOrderModalStore';

export default function InstrumentsScreen() {
  const {
    data: instruments,
    isLoading: loading,
    error,
    refetch,
  } = useInstrumentsQuery();

  const { isVisible, selectedInstrument, openModal, closeModal } =
    useOrderModalStore();

  const handleRefresh = () => {
    refetch();
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading && !instruments) {
    return <Loading />;
  }

  if (error && !instruments) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  return (
    <View testID="instruments-screen" style={styles.container}>
      <FlatList
        key="instruments-list"
        testID="instruments-list"
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InstrumentCard instrument={item} onPress={() => openModal(item)} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      <OrderModal
        key="instruments-order-modal"
        visible={isVisible}
        onClose={closeModal}
        instrument={selectedInstrument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
});

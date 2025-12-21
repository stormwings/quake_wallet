import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ErrorMessage, InstrumentCard, Loading, OrderModal } from '../components';
import { useInstrumentsQuery } from '../services/queries/useInstrumentsQuery';
import { Instrument } from '../types';

export default function InstrumentsScreen() {
  const {
    data: instruments,
    isLoading: loading,
    error,
    refetch,
  } = useInstrumentsQuery();

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRefresh = () => {
    refetch();
  };

  const handleRetry = () => {
    refetch();
  };

  const handleInstrumentPress = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedInstrument(null);
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
          <InstrumentCard
            instrument={item}
            onPress={() => handleInstrumentPress(item)}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <OrderModal
        key="instruments-order-modal"
        visible={modalVisible}
        onClose={handleCloseModal}
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

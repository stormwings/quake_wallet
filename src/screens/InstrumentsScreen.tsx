import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ErrorMessage, InstrumentCard, Loading, OrderModal } from '../components';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchInstruments } from '../store/slices';
import { Instrument } from '../types';

export default function InstrumentsScreen() {
  const dispatch = useAppDispatch();
  const { data: instruments, loading, error } = useAppSelector((state) => state.instruments);

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchInstruments());
  };

  const handleRetry = () => {
    dispatch(fetchInstruments());
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
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
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

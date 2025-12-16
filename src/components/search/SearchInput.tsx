import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useLocale } from "../../i18n";
import { copy } from "../../i18n/copy";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = copy.search.placeholder(),
}) => {
  useLocale();

  const handleClear = () => {
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.leftIconWrap}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
        </View>

        <TextInput
          testID="search-input"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
        />

        {value.length > 0 && (
          <TouchableOpacity
            testID="search-input-clear"
            onPress={handleClear}
            style={styles.clearButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 44,
  },

  leftIconWrap: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 10,
  },

  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2F7",
    marginLeft: 8,
  },
});

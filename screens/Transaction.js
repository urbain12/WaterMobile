import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  HeaderBar,
  CurrencyLabel,
  TextButton,
  TransactionHistory,
} from "../components";
import { dummyData, COLORS, SIZES, FONTS } from "../constants";

const Transaction = ({ route }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);

  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  });

  function renderTrade() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <CurrencyLabel currency={`${selectedCurrency?.currency} Service`} />

        <View>
          <TouchableOpacity activeOpacity={1}>
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Names"
            />
            
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="ID number"
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Phone Number"
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Province"
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="District"
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Sector"
            />
            <TextInput
              style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                height: 35,
                width: "100%",
                marginTop: 20,
                marginBottom: 10,
                textAlign: "center",
              }}
              name="Names"
              placeholder="Cell"
            />
          </TouchableOpacity>
        </View>

        <TextButton
          label="Request"
          onPress={() => console.log("Trade")}
          style={{ marginTop: 100 }}
        />
      </View>
    );
  }

  function renderTransactionHistory() {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar right={false} />

      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          {renderTrade()}
          {renderTransactionHistory()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Transaction;

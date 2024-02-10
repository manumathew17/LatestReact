/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from "react";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import { LivelyShoppableFeeds } from "lively-feeds-rn";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const CART = {
  "items": [],
  "items_subtotal_price": 579600
};

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [cartDetails, setCartDetails] = useState(CART);
  const [load, setLoading] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>

          <LivelyShoppableFeeds
            livelyBrandId="57bf2ef4b6"
            onCartUpdate={async (type, data) => {
              setLoading(true);
              const newItem = {
                "quantity": 1,
                "variant_id": 123456789,
                "product_title": "New Product",
                "line_price": 1000,
                "image": "https://example.com/new-product.jpg",
              };

              // Update the cart state based on the current state
              setCartDetails(prevCart => ({
                ...prevCart,
                items: [...prevCart.items, newItem],
              }));

              await new Promise(resolve => setTimeout(resolve, 3000));

              setLoading(false);
            }}
            cartDetails={cartDetails}
            onShopNow={() => {
              console.log("SHOP NOW CLICKED GO TO CHECKOUT PAGE")
            }}
            callBacks={(event, data) => {
              console.log(event);
              console.log(data);
            }}
            isLoading={load}
            type="home"
          />
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default App;

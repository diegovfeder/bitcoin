import React, {useEffect, useState} from 'react';
import {StatusBar, setStatusBarHidden} from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
// import { useNetInfo } from '@react-native-community/netinfo';
import DogeCoin from './src/DogeCoin';

import {
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [bitCoinUSDValue, setBitCoinUSDValue] = useState(0);
  const [bitCoinEURValue, setBitCoinEURValue] = useState(0);
  const [bitCoinGBPValue, setBitCoinGBPValue] = useState(0);
  const [bitCoinBRLValue, setBitCoinBRLValue] = useState(0);
  const [fetchMoreData, setFetchMoreData] = useState(false);

  // TODO: ?
  // const netinfo = useNetInfo();

  useEffect(() => {
    const getData = async () => {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(function (response) {
          setBitCoinUSDValue(response?.data?.bpi?.USD?.rate);
          setBitCoinEURValue(response?.data?.bpi?.EUR?.rate);
          setBitCoinGBPValue(response?.data?.bpi?.GBP?.rate);
        });

      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
        .then(function (response) {
          setBitCoinBRLValue(response?.data?.bpi.BRL.rate);
        });
    };

    getData();
    setStatusBarHidden(true, 'slide');
  }, [fetchMoreData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/*Color Views */}
        <View style={styles.topColorStyledContainer}></View>
        <View style={styles.bottomColorStyledContainer}></View>
        {/* Header */}
        <Text style={styles.textHeader}>BITCOIN RATES</Text>
        {/* Rendered values */}
        <View style={styles.containerValues}>
          <Text style={styles.textSmall}>{`BTC/USD: ${
            bitCoinUSDValue ? bitCoinUSDValue : 'error'
          }`}</Text>
          <Text style={styles.textSmall}>{`BTC/EUR: ${
            bitCoinEURValue ? bitCoinEURValue : 'error'
          }`}</Text>
          <Text style={styles.textSmall}>{`BTC/GBP: ${
            bitCoinGBPValue ? bitCoinGBPValue : 'error'
          }`}</Text>
          <Text style={styles.textSmall}>{`BTC/BRL: ${
            bitCoinBRLValue ? bitCoinBRLValue : 'error'
          }`}</Text>

          <DogeCoin />

          {/* <Button
						title='Open a web browser'
						onPress={() => {
							WebBrowser.openBrowserAsync('https://www.cinqtechnologies.com/');
						}}
					/> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => setFetchMoreData((state) => !state)}>
            <Text>{`Press HERE to fetch new data`}</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom Bar  */}
        <Text style={styles.textBottom}>
          https://github.com/bitcoin/bitcoin
        </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerValues: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 128,
  },
  textBottom: {
    position: 'absolute',
    margin: 8,
    bottom: 0,
    fontSize: 18,
    fontWeight: '300',
  },
  textHeader: {
    position: 'absolute',
    margin: 8,
    top: 16,
    fontSize: 28,
    fontWeight: '600',
  },
  textSmall: {
    margin: 8,
    top: 16,
    fontSize: 24,
    fontWeight: '200',
  },
  bottomColorStyledContainer: {
    position: 'absolute',
    bottom: -396,
    right: -128,
    width: 1000,
    height: 500,
    backgroundColor: '#F2A900',
    borderRadius: 512,
    transform: [{rotate: '100'}],
  },
  topColorStyledContainer: {
    position: 'absolute',
    top: 196,
    width: 1000,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 512,
    transform: [{rotate: '100'}],
  },
  onlyFlex: {
    flex: 1,
  },
});

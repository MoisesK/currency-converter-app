import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import {EconomiaCurrencyService} from "./src/Services/EconomiaCurrencyService";
import PickerCurrency from "./src/Components/PickerCurrency";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState([]);
  const [amountMoneyRaw, setAmountMoneyRaw] = useState('0');

  useEffect(() => {
    async function getCoinList() {
      const arrayKeys = [];
      const response = await EconomiaCurrencyService.get('all');
      Object.keys(response.data).map((key) => {
        arrayKeys.push({
          key: key,
          value: key,
          name: key
        })
      })

      setSelectedCoin(arrayKeys[0].key);
      setCoinList(arrayKeys);
      setLoading(false);
    }

    getCoinList();
  }, []);

  function convertStringInReal(valor) {
    let valorLimpo = valor.replace('R$', '').trim();

    valorLimpo = valorLimpo.replace(',', '.');

    const number = parseFloat(valorLimpo);

    if (isNaN(number)) {
      return valor;
    }

    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
      loading ?
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }} >
            <ActivityIndicator color={'white'} />
          </View> :
    <View style={styles.container}>
      <View style={styles.currencyPickerSection}>
        <Text style={styles.currencyPickerTitle}>Selecione sua moeda</Text>

        <PickerCurrency coinList={coinList} selectedCoin={selectedCoin} onChange={(coin) => setSelectedCoin(coin)}/>

      </View>

      <View style={styles.amountCurrencySection}>
        <Text style={styles.amountCurrencyTitle}>Digite um valor para converter em (R$)</Text>
        <TextInput
            keyboardType={'numeric'}
            style={styles.amountCurrencyInput}
            placeholder={'ex.: 1.50'}
            onChangeText={(v) => setAmountMoneyRaw(convertStringInReal(v))}
            value={amountMoneyRaw}
        />
      </View>

      <TouchableOpacity style={styles.buttonArea}>
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 80
  },
  currencyPickerSection: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 3
  },
  currencyPickerTitle: {
    fontSize: 15,
    fontWeight: "500"
  },
  amountCurrencySection: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20
  },
  amountCurrencyTitle: {
    fontSize: 15,
    fontWeight: "500"
  },
  amountCurrencyInput: {
    padding: 8,
    width: '100%',
    fontSize: 20
  },
  buttonArea: {
    backgroundColor: 'rgb(155,50,50)',
    width: '90%',
    height: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: "bold"
  }
});

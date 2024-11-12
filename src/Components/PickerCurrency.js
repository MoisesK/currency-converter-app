import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

export default function PickerCurrency(props) {
    let pickerItems = props.coinList.map( (item) => {
        return <Picker.Item value={item.value} key={item.key} label={item.name}/>
    });

    return (
        <Picker
            selectedValue={props.selectedCoin}
            style={styles.currencyPicker}
            onValueChange={(itemValue) => props.onChange(itemValue)}
        >
            {pickerItems}
        </Picker>
    );
}

const styles = StyleSheet.create({
    currencyPicker: {
        marginTop: -50,
        height: 140
    }
})
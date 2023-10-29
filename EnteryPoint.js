import React from 'react'; 
import App from './App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const EnteryPoint = () => (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content"
            hidden={false}
            backgroundColor="#00BCD4"
            translucent={true} />
        <App />
    </SafeAreaView >
);
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FF5236'
    }
})

export default EnteryPoint
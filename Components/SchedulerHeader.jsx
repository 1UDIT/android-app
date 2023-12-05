import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace with the appropriate icon library 
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const SchedulerHeader = ({ Season, day }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={1} contentContainerStyle={{ flexDirection: 'row' }}>
                <View style={styles.overline}><Text>1</Text></View>
                <View style={styles.header}><Text>{Season} Season</Text></View>
                <View style={styles.containerView}>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            style={[styles.dropdown, isFocus, { alignItems: 'center' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={day}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Filter By Date' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (null)}
                            renderRightIcon={() => (<Ionicons name='filter-outline' color={'black'} size={25} />)}
                        />
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 50
    },
    overline: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: '100',
        flex: 2,
        height: 50
    },
    header: {
        fontSize: 26,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        height: 50
    },
    spacer: {
        height: 10,
    },

    containerView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        height: 50
    },
    dropdowncontainer: {
        width: '100%',
    },
    dropdown: {
        height: 50,
        borderWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
        color: 'black',
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default SchedulerHeader;

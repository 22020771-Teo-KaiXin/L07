import React, { useState } from 'react';
import { datasource } from './Data.js';
import { TextInput, View, Text, Button, Alert, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
});

const Edit = ({ navigation, route }) => {
    const { moduleCode, grade, credit, index } = route.params;
    const [newModuleCode, setNewModuleCode] = useState(moduleCode);
    const [newGrade, setNewGrade] = useState(grade);

    return (
        <View style={{ padding: 10, marginTop: 50}}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module Code:</Text>
                <TextInput
                    value={newModuleCode}
                    style={{ borderWidth: 1, padding: 5 }}
                    onChangeText={(text) => setNewModuleCode(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Grade (A, B, C, D, F):</Text>
                <TextInput
                    value={newGrade}
                    style={{ borderWidth: 1, padding: 5 }}
                    maxLength={1} // Restrict to 1 character
                    onChangeText={(text) => setNewGrade(text.toUpperCase())}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Save"
                    onPress={() => {
                        const moduleCodeRegex = /^[A-Za-z0-9]{4}$/;
                        if (!moduleCodeRegex.test(newModuleCode)) {
                            Alert.alert('Invalid Module Code', 'Module code must be 4 characters long and alphanumeric.');
                            return;
                        }

                        if (!['A', 'B', 'C', 'D', 'F'].includes(newGrade.toUpperCase())) {
                            Alert.alert('Invalid Grade', 'Please enter a valid grade (A, B, C, D, F).');
                            return;
                        }

                        datasource[0].data[index] = {
                            moduleCode: newModuleCode,
                            grade: newGrade,
                        };

                        navigation.navigate('Home');
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Delete"
                    color="red"
                    onPress={() => {
                        Alert.alert('Confirm Delete', 'Are you sure?', [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    datasource[0].data.splice(index, 1);
                                    navigation.navigate('Home');
                                },
                            },
                            { text: 'No' },
                        ]);
                    }}
                />
            </View>
        </View>
    );
};


export default Edit;

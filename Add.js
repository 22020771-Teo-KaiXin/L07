import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
    const [moduleCode, setModuleCode] = useState('');
    const [grade, setGrade] = useState('');
    const [credit, setCredit] = useState('');

    const gradeToGPA = {
        A: 4,
        B: 3,
        C: 2,
        D: 1,
        F: 0,
    };

    // Handle form submission
    const handleSubmit = () => {
        // Validate module code (4 alphanumeric characters)
        const moduleCodeRegex = /^[A-Za-z0-9]{4}$/;
        if (!moduleCode || !moduleCodeRegex.test(moduleCode)) {
            Alert.alert('Invalid Module Code', 'Please enter a valid 4-letter or number module code.');
            return;
        }

        if (!grade || !['A', 'B', 'C', 'D', 'F'].includes(grade.toUpperCase())) {
            Alert.alert('Invalid Grade', 'Please enter a valid grade (A, B, C, D, or F).');
            return;
        }

        const gpa = gradeToGPA[grade.toUpperCase()];

        const item = {
            moduleCode,
            grade: grade.toUpperCase(),
            credit: parseInt(credit),
            gpa: gpa,
        };

        datasource[0].data.push(item);

        navigation.navigate('Home');
    };

    return (
        <View style={{ padding: 10, marginTop: 50}}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module Code:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    value={moduleCode}
                    onChangeText={(text) => setModuleCode(text)}
                    maxLength={4}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Grade (A, B, C, D, F):</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    value={grade}
                    onChangeText={(text) => setGrade(text)}
                    maxLength={1}
                />
            </View>

            <Button title="ADD MODULE" onPress={handleSubmit} />
        </View>
    );
};

export default Add;

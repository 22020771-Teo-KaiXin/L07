import React from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Button, Alert} from 'react-native';
import { datasource } from "./Data.js";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start'
    },

    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'center'
    },

    opacityStyle: {
        borderWidth: 1,
    },

    headerText: {
        fontSize: 22,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue'
    },

    sectionList: {
        marginBottom: 5,
    },

});

const gradeToPoint = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
};

const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalModules = datasource[0].data.length;

    datasource[0].data.forEach(({ grade }) => {
        totalGradePoints += gradeToPoint[grade];
    });

    const overallGPA = totalGradePoints / totalModules;

    let overallGrade = '';
    if (overallGPA >= 3.5) {
        overallGrade = 'A';

    } else if (overallGPA >= 3.0) {
        overallGrade = 'B';

    } else if (overallGPA >= 2.5) {
        overallGrade = 'C';

    } else if (overallGPA >= 2.0) {
        overallGrade = 'D';

    } else {
        overallGrade = 'F';
    }

    return { overallGPA: overallGPA.toFixed(2), overallGrade };
};

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        index: index,
                        moduleCode: item.moduleCode,
                        grade: item.grade,
                        credit: item.credit,
                    });
                }}
            >
                <Text style={styles.textStyle}>
                    Module: {item.moduleCode} - Grade: {item.grade}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
                style={styles.sectionList}
            />

            <View style={{ flex: 1,justifyContent: 'flex-start'}}>
                <View style={{ marginBottom: 30 }}>
                    <Button
                        title="ADD NEW MODULE"
                        onPress={() => {
                            navigation.navigate('Add');
                        }}
                    />
                </View>

                <Button
                    title="CALCULATE GPA"
                    onPress={() => {
                        const { overallGPA, overallGrade } = calculateGPA();
                        Alert.alert(`Overall GPA: ${overallGPA}\nOverall Grade: ${overallGrade}`);
                    }}
                />

            </View>
        </View>
    );
};

export default Home;

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useAddTodo } from '../hooks/useTodos';

const AddTodoScreen = () => {
    const navigation = useNavigation();
    const { mutate: addTodo } = useAddTodo();
    const [title, setTitle] = useState<string>('');

    const handleSave = () => {
        if (title.trim() === '') return;

        const newTodo = {
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };

        addTodo(newTodo);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter todo title"
                placeholderTextColor="#888"
            />

            <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
            </Pressable>

            <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
        </View>
    );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C',
        padding: 16,
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#3a3a3a',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    saveBtn: {
        backgroundColor: '#27ae60',
        padding: 14,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelBtn: {
        alignItems: 'center',
    },
    cancelText: {
        color: '#f1c40f',
        fontWeight: '600',
        fontSize: 16,
    },
});

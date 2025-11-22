import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Todo, useTodos, useUpdateTodo } from '../hooks/useTodos';

type RootStackParamList = {
    EditTodo: { todoId: string };
};

type EditTodoRouteProp = RouteProp<RootStackParamList, 'EditTodo'>;

const EditTodoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<EditTodoRouteProp>();
    const { todoId } = route.params;

    const { data: todos } = useTodos();
    const { mutate: updateTodo } = useUpdateTodo();

    const todo = todos?.find((t: Todo) => t.id === todoId);

    const [title, setTitle] = useState<string>(todo?.title || '');

    useEffect(() => {
        if (todo) setTitle(todo.title);
    }, [todo]);

    const handleSave = () => {
        updateTodo({ todoId, title });
        navigation.goBack();
    };

    if (!todo)
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Todo not found</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter todo title"
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

export default EditTodoScreen;

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
    },
});

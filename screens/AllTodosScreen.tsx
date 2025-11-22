import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useDeleteTodo, useTodos, useToggleTodo } from '../hooks/useTodos';
import TodoItem from '../components/TodoItem';

const AllTodosScreen = () => {
    const { data, isLoading, isError } = useTodos();
    const { mutate: deleteTodo } = useDeleteTodo();
    const { mutate: toggleTodo } = useToggleTodo();

    const sortedData = data
        ? [...data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        : [];


    if (isLoading)
        return (
            <View style={styles.centered}>
                <Text style={{ fontWeight: 'bold', color: '#421ec4ff', fontSize: 18 }}>Loading your todos...</Text>
            </View>
        );

    if (isError)
        return (
            <View style={styles.centered}>
                <Text style={{ fontWeight: 'bold', color: '#d32121ff', fontSize: 18 }}>Oops! Something went wrong. Please try again.</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            {sortedData.length === 0 ? (
                <Text style={{ fontWeight: 'bold', color: '#2326bbff', fontSize: 18, textAlign: 'center', marginTop: 28 }}>
                    You haven't created any todos yet.
                    {"\n"}
                    Tap the <Text style={{ color: 'green' }}> + </Text> button to add your first one.
                </Text>
            ) : (
                <FlatList
                    data={sortedData}
                    keyExtractor={(todo) => todo.id}
                    renderItem={({ item }) => (
                        <TodoItem
                            id={item.id}
                            title={item.title}
                            completed={item.completed}
                            createdAt={item.createdAt}
                            onDelete={() => deleteTodo(item.id)}
                            onToggleTodo={() =>
                                toggleTodo({ todoId: item.id, completed: !item.completed })
                            }
                        />
                    )}
                />
            )}
        </View>
    );
};

export default AllTodosScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

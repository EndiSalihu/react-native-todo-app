import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type TodoItemProps = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    onDelete: () => void;
    onToggleTodo: () => void;
};

type RootStackParamList = {
    AllTodos: undefined;
    EditTodo: { todoId: string };
};

type TodoItemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditTodo'>;


const TodoItem = ({ id, title, completed, createdAt, onDelete, onToggleTodo }: TodoItemProps) => {
    const navigation = useNavigation<TodoItemNavigationProp>();

    const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <View style={[styles.container, completed && styles.completed]}>
            <View style={styles.row}>

                <Pressable onPress={onToggleTodo} style={styles.checkbox}>
                    <Ionicons
                        name={completed ? "checkbox" : "checkbox-outline"}
                        size={30}
                        color={completed ? "#27ae60" : "#bbb"}
                    />
                </Pressable>

                <View style={styles.textWrapper}>
                    <Text style={[styles.title, completed && styles.titleCompleted]}>
                        {title}
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

                <View style={styles.actions}>
                    <Pressable onPress={() => navigation.navigate('EditTodo', { todoId: id })} style={styles.actionBtn}>
                        <Ionicons name="create-outline" size={27} color="#f1c40f" />
                    </Pressable>

                    <Pressable onPress={onDelete} style={styles.actionBtn}>
                        <Ionicons name="trash-outline" size={27} color="#ff6b6b" />
                    </Pressable>
                </View>

            </View>
        </View>
    );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#2C2C2C',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  completed: {
    backgroundColor: '#1E3D1E',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    marginRight: 12,
  },

  textWrapper: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
  },

  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },

  date: {
    color: '#b1a8a8ff',
    fontSize: 12,
    marginTop: 12,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionBtn: {
    padding: 8,
    marginLeft: 8,
  },
});


import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const AddTodoFormBtn = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
            <Ionicons name="add" size={28} color="green" />
        </TouchableOpacity>
    )
}

export default AddTodoFormBtn


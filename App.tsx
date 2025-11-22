import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AllTodosScreen from './screens/AllTodosScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import AddTodoFormBtn from './components/AddTodoFormBtn';
import EditTodoScreen from './screens/EditTodoScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AllTodos"
            screenOptions={{
              headerStyle: { backgroundColor: '#1F1F1F' },
              headerTintColor: '#fff',
              contentStyle: { backgroundColor: '#a8a7a7ff' },
            }}
          >
            <Stack.Screen
              name='AllTodos'
              component={AllTodosScreen}
              options={({ navigation }) => ({
                title: 'My Todos', headerRight: () => <AddTodoFormBtn navigation={navigation} />
              })}
            />

            <Stack.Screen
              name="AddTodo"
              component={AddTodoScreen}
              options={{
                title: 'Add Todo',
                presentation: 'modal',
              }}
            />

            <Stack.Screen
              name="EditTodo"
              component={EditTodoScreen}
              options={{
                title: 'Edit Todo',
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

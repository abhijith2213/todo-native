import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import animated, { LinearTransition } from "react-native-reanimated";
import Octicons from "@expo/vector-icons/Octicons";
import { ThemeContext } from "@/context/ThemeContext";
import { data } from "@/data/todos";

export default function Index() {
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  const [todos, setTodos] = useState(data);
  const [text, setText] = useState("");
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  const addTodo = () => {
    if (text.trim()) {
      const maxId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0;
      const newId = maxId + 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderItems = ({ item }) => {
    return (
      <View style={styles.todoContainer}>
        <Text style={[styles.todoText, item.completed && styles.completedText]} onPress={() => toggleTodo(item.id)}>
          {item.title}
        </Text>
        <Pressable onPress={() => deleteTodo(item.id)}>
          <MaterialCommunityIcons name="delete-circle" color={"red"} size={36} />
        </Pressable>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new Todo..."
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholderTextColor={"gray"}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
          style={{ marginLeft: 10 }}
        >
          {colorScheme === "dark" ? (
            <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
          ) : (
            <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
          )}
        </Pressable>
      </View>
      {/* Todos Area */}
      <View>
        <animated.FlatList
          renderItem={renderItems}
          data={todos}
          keyExtractor={(todo) => todo.id}
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="on-drag"
        />
      </View>
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: "100%",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: 20,
      paddingHorizontal: 10,
      borderRadius: 3,
      gap: 8,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: "gray",
      color: theme.text,
      borderWidth: 1,
      fontSize: 18,
      borderRadius: 5,
      paddingHorizontal: 8,
      marginRight: 8, // Space between input and button
    },
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    buttonText: {
      color: colorScheme === "dark" ? "black" : "white",
      textAlign: "center",
      fontSize: 18,
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
    todoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderWidth: 1,
      borderBottomColor: "gray",
      pointerEvents: "auto",
    },
    deleteButton: {
      height: 10,
      width: 10,
    },
  });
}

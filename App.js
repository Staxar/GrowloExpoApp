import { useContext, useEffect, useState } from "react";
import { Button, Pressable, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import LoginScreen from "./src/screen/auth/LoginScreen";
import SignupScreen from "./src/screen/auth/SignupScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import AddProductScreen from "./src/screen/AddProductScreen";
import { Colors } from "./src/constans/styles";
import MapScreen from "./src/screen/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function RootTabNavigators() {
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={authCtx.logout}>
              <Ionicons
                size={24}
                name="exit-outline"
                style={{ marginRight: 15, color: "#ffff" }}
              />
            </Pressable>
          ),
          tabBarIcon: () => (
            <Ionicons name="home-outline" color={"black"} size={18} />
          ),
          headerStyle: {
            backgroundColor: Colors.primary100,
            height: 85,
            borderRadius: 8,
          },
          headerTintColor: "#ffff",
          headerTitle: "Growlo",
        }}
      />
      <Tab.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={18} />,
        }}
      />
      <Tab.Screen
        name="All Products"
        component={AddProductScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={18} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={18} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootTabNavigators}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <View></View>;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

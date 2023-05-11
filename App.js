import { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
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
import AddProductScreen from "./src/screen/AddProductScreen";
import { Colors } from "./src/constans/styles";
import MapScreen from "./src/screen/MapScreen";
import CategoryScreen from "./src/screen/CategoryScreen";
import AllProductsScreen from "./src/screen/AllProductsScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import { ActivityIndicator } from "react-native";
import MessageScreen from "./src/screen/MessageScreen";
import ChatScreen from "./src/screen/ChatScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AboutMeScreen from "./src/screen/AboutMeScreen";
import PantryScreen from "./src/screen/PantryScreen";
import TestScreen from "./src/screen/TestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const TopTapNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="About me" component={AboutMeScreen} />
      <TopTab.Screen name="Pantry" component={PantryScreen} />
    </TopTab.Navigator>
  );
};

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
          headerTintColor: "#FFFFFF",
          headerTitle: "Growlo",
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: () => <Ionicons name="folder-open-outline" size={18} />,
          headerStyle: {
            backgroundColor: Colors.primary100,
            height: 85,
            borderRadius: 8,
          },
          headerTintColor: "#FFFFFF",
          headerTitle: "Categories",
        }}
      />
      <Tab.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={18} />,
          headerStyle: {
            backgroundColor: Colors.primary100,
            height: 85,
            borderRadius: 8,
          },
          headerTintColor: "#FFFFFF",
          headerTitle: "Add Product",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbubble-ellipses-outline" size={18} />
          ),
          headerStyle: {
            backgroundColor: Colors.primary100,
            height: 85,
            borderRadius: 8,
          },
          headerTintColor: "#FFFFFF",
          headerTitle: "Messages",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TopTapNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={18} />,
          headerStyle: {
            backgroundColor: Colors.primary100,
            height: 85,
            borderRadius: 8,
          },
          headerTintColor: "#FFFFFF",
          headerTitle: "Profile",
        }}
      />
      <Tab.Screen name="Test" component={TestScreen} />
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
      <Stack.Screen name="AllProducts" component={AllProductsScreen} />
      <Stack.Screen
        name="Details"
        component={ProductDetailsScreen}
        options={{
          headerRight: () => (
            <Pressable>
              <Ionicons
                size={24}
                name="heart-outline"
                style={{ marginRight: 15, color: "grey" }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "",
        }}
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
      const storedId = await AsyncStorage.getItem("uid");
      if ((storedToken, storedId)) {
        authCtx.authenticate(storedToken, storedId);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <ActivityIndicator size={"large"} />;
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

import { useContext, useEffect, useState } from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import LoginScreen from "./src/screen/auth/LoginScreen";
import SignupScreen from "./src/screen/auth/SignupScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import ProfileScreen from "./src/screen/ProfileScreen";

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

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <Button
              title="Logout"
              icon="exit"
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
  "CONTEXT: ", AsyncStorage.getItem("token");
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      "store: ", storedToken;
      if (storedToken) {
        authCtx.authenticate(storedToken);
        "storedToken: ", authCtx;
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

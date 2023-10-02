import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "./store/store";
import { authenticate, logout } from "./store/auth";
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import IconButton from "./components/UI/IconButton";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import Wallets from "./screens/Wallets";
import Expenses from "./screens/Expenses";
import WalletForm from "./components/ManageWallet/WalletForm";
import EditWallet from "./components/ManageWallet/EditWallet";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        headerTintColor: GlobalStyles.colors.white,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary400,
      }}
    >
      <Tabs.Screen
        component={Expenses}
        name="Expenses"
        options={({ navigation }) => ({
          tabBarLabel: "Recent",
          title: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          ),
        })}
      />
      <Tabs.Screen
        component={Wallets}
        name="Wallets"
        options={({ navigation }) => ({
          tabBarLabel: "Wallets",
          title: "Wallets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageWallet");
              }}
            />
          ),
        })}
      />
      <Tabs.Screen
        component={AllExpenses}
        name="AllExpenses"
        options={{
          tabBarLabel: "All Expenses",
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerTintColor: GlobalStyles.colors.white,
        contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Register",
        }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        headerTintColor: GlobalStyles.colors.white,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={() => dispatch(logout())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenses}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManageWallet"
        component={WalletForm}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="EditWallet"
        component={EditWallet}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

const Root = () => {
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.authState);
  const isAuthenticated = authStore.isAuthenticated;

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("auth-token");

      if (token) {
        dispatch(authenticate({ token }));
      }
    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { GlobalStyles } from "./constants/styles";
import { store } from "./store/store";
import { authenticate, logOut } from "./store/auth";
import { registerForPushNotificationsAsync } from "./util/notifications";
import { httpRegisterPushToken } from "./util/http";
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import IconButton from "./components/UI/IconButton";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import Wallets from "./screens/Wallets";
import Expenses from "./screens/Expenses";
import FilterExpenses from "./screens/FilterExpenses";
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
          borderTopColor: GlobalStyles.colors.primary800,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary100,
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
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="funnel"
                color={tintColor}
                size={22}
                onPress={() => navigation.navigate("FilterExpenses")}
              />
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate("ManageExpense")}
              />
            </View>
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
              onPress={() => navigation.navigate("ManageWallet")}
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
        options={{ title: "Register" }}
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
        contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={() => dispatch(logOut())}
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
        options={{ presentation: "modal", title: "Manage Expense" }}
      />
      <Stack.Screen
        name="FilterExpenses"
        component={FilterExpenses}
        options={{ title: "Filter Expenses" }}
      />
      <Stack.Screen
        name="ManageWallet"
        component={WalletForm}
        options={{ presentation: "modal", title: "Add Wallet" }}
      />
      <Stack.Screen
        name="EditWallet"
        component={EditWallet}
        options={{ presentation: "modal", title: "Edit Wallet" }}
      />
    </Stack.Navigator>
  );
};

const Root = () => {
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.authState);
  const isAuthenticated = authStore.isAuthenticated;
  const token = authStore.token;
  const notificationListener = useRef();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("auth-token");
      if (storedToken) {
        dispatch(authenticate({ token: storedToken }));
      }
    };
    fetchToken();
  }, [dispatch]);

  // Register this device for push notifications once authenticated.
  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }
    const register = async () => {
      try {
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken) {
          await httpRegisterPushToken(pushToken, token);
        }
      } catch (err) {
        console.warn("Push registration failed:", err?.message);
      }
    };
    register();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {});

    return () => {
      notificationListener.current?.remove();
    };
  }, [isAuthenticated, token]);

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

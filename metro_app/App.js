import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import colors from "./assets/colors";
import BookTicket from "./screens/BookTicket";
import BookWheelChair from "./screens/BookWheelChair";
import OrderSnacks from "./screens/OrderSnacks";
import ViewMap from "./screens/ViewMap";
import Contact from "./screens/Contact";
import About from "./screens/About";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	return (
		<AuthenticatedUserContext.Provider value={{ user, setUser }}>
			{children}
		</AuthenticatedUserContext.Provider>
	);
};

const SignedOutStack = () => {
	return (
		<>
			<StatusBar style="light" />
			<Stack.Navigator
				initialRouteName="LoginScreen"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="SignupScreen" component={SignupScreen} />
			</Stack.Navigator>
		</>
	);
};

const SignedInStack = () => {
	return (
		<>
			<StatusBar style="dark" />
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: colors.secondary,
					},
				}}
			>
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="BookTickets" component={BookTicket} />
				<Stack.Screen
					name="BookWheelChair"
					component={BookWheelChair}
				/>
				<Stack.Screen name="OrderSnacks" component={OrderSnacks} />
				<Stack.Screen name="ViewMap" component={ViewMap} />
				<Stack.Screen name="Contact" component={Contact} />
				<Stack.Screen name="About" component={About} />
			</Stack.Navigator>
		</>
	);
};

const RootNavigator = () => {
	const { user, setUser } = useContext(AuthenticatedUserContext);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(
			auth,
			async (authenticatedUser) => {
				authenticatedUser ? setUser(authenticatedUser) : setUser(null);
				setIsLoading(false);
			}
		);
		return unsubscribeAuth;
	}, [user]);

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			{user ? <SignedInStack /> : <SignedOutStack />}
		</NavigationContainer>
	);
};

export default function App() {
	return (
		<>
			<AuthenticatedUserProvider>
				<RootNavigator />
			</AuthenticatedUserProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Image, Alert } from "react-native";
import colors from "../assets/colors";
import CustomButton from "../components/CustomButton";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
	const onLogin = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => console.log("Logged In"))
			.catch((err) => Alert.alert("Login Error", err.message));
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const validate = (email, password) => {
		if (!validateEmail(email)) {
			Alert.alert("Input Error", "Please Enter a valid email");
			return;
		}
		if (password === null) {
			Alert.alert(
				"Weak Password",
				"Password must atleast of 6 characters"
			);
			return;
		}
		onLogin(email, password);
	};

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="E-mail"
				value={email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize="none"
				autoCorrect={false}
				inputMode="email"
				selectionColor={colors.primary}
			/>
			<TextInput
				secureTextEntry={true}
				placeholder="Password"
				style={styles.input}
				autoCapitalize="none"
				value={password}
				onChangeText={(text) => setPassword(text)}
				selectionColor={colors.primary}
			/>
			<CustomButton
				title="Submit"
				onPress={() => validate(email, password)}
				style={styles.button}
			/>
			<View style={styles.signupTextContainer}>
				<Text style={styles.signupText}>New user? </Text>
				<Text
					style={[
						styles.signupText,
						{
							color: "dodgerblue",
							fontStyle: "italic",
							textDecorationLine: "underline",
						},
					]}
					onPress={() => navigation.push("SignupScreen")}
				>
					Signup
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		padding: 50,
	},
	logo: {
		width: 200,
		height: 200,
	},
	input: {
		margin: 20,
		borderWidth: 1,
		padding: 10,
		color: colors.primary,
		borderRadius: 30,
		backgroundColor: colors.secondary,
		width: "100%",
	},
	button: {
		width: "100%",
		borderRadius: 20,
		margin: 20,
		backgroundColor: colors.secondary,
	},
	signupTextContainer: {
		alignSelf: "flex-end",
		flexDirection: "row",
		marginTop: 10,
	},
	signupText: {
		fontSize: 16,
		color: colors.secondary,
	},
});

export default LoginScreen;

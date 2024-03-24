import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Alert,
	ActivityIndicator,
} from "react-native";
import colors from "../assets/colors";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DOMAIN } from "../keys/keys";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config/firebase";

const SignupScreen = ({ navigation }) => {
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		try {
			const { status } =
				await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
				return;
			}

			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				allowsMultipleSelection: false,
			});

			if (!result.canceled) {
				setImage(result.assets[0].uri);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const [imageUrl, setImageUrl] = useState(null);
	const [uploading, setUploading] = useState(false);
	const storage = getStorage();

	const uploadImage = async (imageUri) => {
		const response = await fetch(imageUri);
		const blob = await response.blob();
		const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);

		try {
			await firebase.storage().ref().child(filename).put(blob);
			getDownloadURL(ref(storage, filename)).then((url) => {
				setImageUrl(url);
				onSignUp(email, password, url);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const onSignUp = (email, password, url) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				const body = {
					id: auth.currentUser.uid,
					email: email,
					avatar: url,
					name: name,
				};
				fetch(DOMAIN + "user/add-user", {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				});
			})
			.catch((err) => Alert.alert("Sign Up Error", err.message));
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const validate = (email, password, confirmPassword, image) => {
		if (!validateEmail(email)) {
			Alert.alert("Type Error", "Please enter a valid email");
			return;
		}
		if (password === null || password.length < 6) {
			Alert.alert(
				"Weak Password",
				"Password must contain atleast of 6 characters"
			);
			return;
		}
		if (confirmPassword !== password) {
			Alert.alert(
				"Match Error",
				"The password doesn't match! Please check again."
			);
			return;
		}
		if (image === null) {
			Alert.alert("No Image", "Please Upload A Image With Your Face");
			return;
		}
		uploadImage(image);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Name"
				selectionColor={colors.primary}
				autoCorrect={false}
				value={name}
				onChangeText={(text) => setName(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="E-mail"
				selectionColor={colors.primary}
				inputMode="email"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				secureTextEntry
				placeholder="Password"
				style={styles.input}
				selectionColor={colors.primary}
				value={password}
				autoCapitalize="none"
				onChangeText={(text) => setPassword(text)}
			/>
			<TextInput
				secureTextEntry={true}
				placeholder="Confirm Password"
				style={styles.input}
				selectionColor={colors.primary}
				value={confirmPassword}
				autoCapitalize="none"
				onChangeText={(text) => setConfirmPassword(text)}
			/>
			{image === null ? (
				<CustomButton title={"Add Photo"} onPress={pickImage} />
			) : (
				<CustomButton
					title={"Image Selected"}
					onPress={() => setImage(null)}
					disabled={true}
				/>
			)}
			<CustomButton
				title="Submit"
				onPress={() => {
					setUploading(true);
					validate(email, password, confirmPassword, image);
				}}
			/>
			<View style={styles.signupTextContainer}>
				<Text style={styles.signupText}>Already a user? </Text>
				<Text
					style={[
						styles.signupText,
						{
							color: "dodgerblue",
							fontStyle: "italic",
							textDecorationLine: "underline",
						},
					]}
					onPress={() => navigation.goBack()}
				>
					Login
				</Text>
			</View>
		</View>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 50,
	},
	logo: {
		width: 200,
		height: 200,
		marginBottom: 10,
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
		backgroundColor: colors.secondary,
		borderRadius: 20,
		margin: 20,
	},
	signupTextContainer: {
		alignSelf: "flex-end",
		flexDirection: "row",
	},
	signupText: {
		fontSize: 16,
		color: colors.secondary,
	},
});

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors";

function CustomButton({ title, onPress, disabled = false }) {
	return (
		<TouchableOpacity
			style={!disabled ? styles.buttonContainer : styles.disabled}
			onPress={onPress}
		>
			<View>
				<Text style={styles.text}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default CustomButton;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: colors.buttonBlue,
		alignItems: "center",
		width: 150,
		justifyContent: "center",
		padding: 10,
		borderRadius: 30,
		margin: 10,
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
	disabled: {
		backgroundColor: colors.primary,
		alignItems: "center",
		width: 150,
		justifyContent: "center",
		padding: 10,
		borderRadius: 30,
		margin: 10,
	},
});

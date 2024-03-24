import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../assets/colors";

const Contact = () => {
	return (
		<View style={styles.container}>
			<View></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
	},
});

export default Contact;

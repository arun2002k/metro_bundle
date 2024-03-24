import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

const CustomCard = ({ icon, title, onClick }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity style={styles.container} onPress={onClick}>
			<View
				style={{
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					margin: 10,
				}}
			>
				{icon}
			</View>
			<View
				style={{
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					margin: 10,
				}}
			>
				<Text style={{ fontSize: 18 }}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 50,
		backgroundColor: colors.secondary,
		padding: 10,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		margin: 10,
	},
});

export default CustomCard;

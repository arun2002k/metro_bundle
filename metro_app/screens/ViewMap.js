import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import colors from "../assets/colors";

const ViewMap = () => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<ScrollView horizontal={true}>
					<Image source={require("../assets/map.png")} />
				</ScrollView>
			</ScrollView>
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

export default ViewMap;

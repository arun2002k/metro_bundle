import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { getAuth } from "firebase/auth";
import colors from "../assets/colors";
import CustomCard from "../components/CustomCard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<CustomCard
				icon={<FontAwesome name="ticket" size={30} color="#000" />}
				title={"Book Tickets"}
				onClick={() => {
					navigation.navigate("BookTickets");
				}}
			/>
			<CustomCard
				icon={<FontAwesome name="wheelchair" size={30} color="#000" />}
				title={"Book Wheel Chair"}
			/>
			<CustomCard
				icon={<MaterialIcon name="fastfood" size={30} color="#000" />}
				title={"Order Snacks"}
			/>
			<CustomCard
				icon={<FontAwesome name="map" size={25} color="#000" />}
				title={"View Map"}
				onClick={() => {
					navigation.navigate("ViewMap");
				}}
			/>
			<CustomCard
				icon={
					<MaterialIcon
						name="contact-support"
						size={25}
						color="#000"
					/>
				}
				title={"Contact"}
				onClick={() => {
					navigation.navigate("Contact");
				}}
			/>
			<CustomCard
				icon={<FontAwesome name="info-circle" size={25} color="#000" />}
				title={"About"}
			/>
			<CustomButton
				title={"Log Out"}
				onPress={() => getAuth().signOut()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.primary,
		padding: 30,
	},
});

export default HomeScreen;

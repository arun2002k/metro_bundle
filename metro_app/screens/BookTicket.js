import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import colors from "../assets/colors";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../components/CustomButton";
import { auth } from "../config/firebase";
import { DOMAIN } from "../keys/keys";
import { useNavigation } from "@react-navigation/native";

const BookTicket = () => {
	const navigation = useNavigation();

	const userID = auth.currentUser.uid;

	const randomId = function (length = 6) {
		return Math.random()
			.toString(36)
			.substring(2, length + 2);
	};

	const [fromStation, setFromStation] = useState(null);
	const [toStation, setToStation] = useState(null);
	const [success, setSuccess] = useState(false);

	const data = [
		{ key: "1", value: "Airport" },
		{ key: "2", value: "Nanganallur" },
		{ key: "3", value: "Alandur" },
		{ key: "4", value: "Guindy" },
		{ key: "5", value: "Saidapet" },
		{ key: "6", value: "Teynampet" },
		{ key: "7", value: "Thousand lights" },
		{ key: "8", value: "Govt Estate" },
		{ key: "9", value: "High Court" },
		{ key: "10", value: "LIC" },
	];

	const bookTicket = () => {
		if (fromStation === null || toStation === null) {
			Alert.alert("Error", "Please Select Valid Station Names");
			return;
		}
		const ticketId = randomId(16);
		const body = {
			id: ticketId,
			userId: userID,
			fromStation: fromStation,
			toStation: toStation,
			date: new Date().toLocaleString(),
		};
		fetch(DOMAIN + "services/book-ticket", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(body),
		}).then(() => navigation.navigate("HomeScreen"));
	};

	return (
		<View style={styles.container}>
			<SelectList
				boxStyles={styles.input}
				dropdownStyles={{
					marginHorizontal: 20,
					backgroundColor: colors.secondary,
				}}
				notFoundText={
					<Text style={{ color: "tomato" }}>Not Found</Text>
				}
				placeholder="Select From Station..."
				search
				setSelected={(val) => {
					setFromStation(val);
				}}
				data={data}
			/>
			<SelectList
				boxStyles={styles.input}
				dropdownStyles={{
					marginHorizontal: 20,
					backgroundColor: colors.secondary,
				}}
				notFoundText={
					<Text style={{ color: "tomato" }}>Not Found</Text>
				}
				placeholder="Select To Station..."
				search
				setSelected={(val) => {
					setToStation(val);
				}}
				data={data}
			/>
			<CustomButton title={"Book Ticket"} onPress={bookTicket} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.primary,
		padding: 50,
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
});

export default BookTicket;

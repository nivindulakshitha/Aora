import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
	return (
		<View className="bg-white flex-1 items-center justify-center">
			<Text className="text-xl">Aora welcome!</Text>
			<StatusBar style="auto" />
			<Link href="/profile" style={{ color: "blue" }}>
				Go to Profile
			</Link>
		</View>
	);
}

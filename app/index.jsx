import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/buttons";
import { useGlobalContext } from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const { isLoading, isAuthenticated } = useGlobalContext();

	if (!isLoading && isAuthenticated) return <Redirect href="/home" />;

	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) return null;

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full h-full justify-center items-center p-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="w-full h-[300px]"
						resizeMode="contain"
					/>

					<View className="relative mt-2">
						<Text className="text-3xl text-white font-pbold text-center">
							Discover Endless {"\n"} Possibilities with
							<Text className="text-secondary-200"> Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[55px] h-[15px] absolute bottom-0 right-1 -z-10"
							resizeMode="contain"
						/>
					</View>

					<Text className="text-gray-100 text-sm font-pregular text-center mt-7">
						Where Creativity Meets Innovation: Embark on a Journey of
						Limitless Exploration with Aora
					</Text>

					<CustomButton title='Continue with Email' handlePress={() => router.push('/sign-in')} containerStyle='w-full mt-7' />
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}

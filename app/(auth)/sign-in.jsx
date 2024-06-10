import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Form from "../../components/form";
import CustomButton from "../../components/buttons";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Please fill in all fields");
		}

		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			router.push("/home");
		} catch (error) {
			Alert.alert("Error, please try again", error.message);
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="h-full bg-primary">
			<ScrollView>
				<View className="justify-center h-[100vh] w-full p-3">
					<Image
						source={images.logo}
						className="w-[115px] h-[35px]"
						resizeMode="contain"
					/>
					<Text className="text-2xl text-white font-psemibold mt-10 ">
						Log in to Aora
					</Text>
					<Form
						title="Email"
						value={form.email}
						handleTextChange={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<Form
						title="Password"
						value={form.password}
						handleTextChange={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>

					<CustomButton title="Sign In" handlePress={submit} isLoading={isSubmitting}  containerStyle="mt-7" />

					<View className="flex-row justify-center pt-5 gap-2">
						<Text className="text-gray-100 text-lg font-pregular ">Don't have an account?</Text>
						<Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;

import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Form from "../../components/form";
import CustomButton from "../../components/buttons";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
		if (!form.email || !form.password || !form.username) {
			Alert.alert("Please fill in all fields");
		}

		setIsSubmitting(true);

		try {
      const result = await createUser(form.email, form.password, form.username);
      console.log(result);
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
						Sign up to Aora
					</Text>
					<Form
						title="Username"
						value={form.username}
						handleTextChange={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
					/>
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

					<CustomButton
						title="Sign Up"
						handlePress={submit}
						isLoading={isSubmitting}
						containerStyle="mt-7"
					/>

					<View className="flex-row justify-center pt-5 gap-2">
						<Text className="text-gray-100 text-lg font-pregular ">
							Already have an account?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;

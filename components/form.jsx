import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { icons } from "../constants";

const Form = ({
	title,
	value,
	handleTextChange,
	otherStyles,
	keyboardType,
	placeholder,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`${otherStyles} space-y-2 w-full`}>
			<Text className="text-base text-gray-50">{title}</Text>
			<View className="flex-row px-4 border-2 border-black-200 w-full rounded-2xl bg-black-100 h-16 items-center focus:border-secondary">
				<TextInput
					className="flex-1 p-4 text-base font-psemibold text-white"
					onChangeText={handleTextChange}
					keyboardType={keyboardType}
					placeholder={placeholder}
					value={value}
					placeholderTextColor={"7b7b8b"}
					secureTextEntry={keyboardType === "password" && !showPassword}
				/>

				{title === "Password" && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
                )}
                
            </View>
		</View>
	);
};

export default Form;

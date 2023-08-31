import { createUser } from "../../util/auth";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const signupHandler = async ({
    email,
    password,
    confirmPassword,
    username,
  }) => {
    setLoading(true);
    try {
      const isSuccessfull = await createUser(
        email,
        password,
        confirmPassword,
        username
      );
      if (isSuccessfull) {
        navigation.replace("Login");
      }
    } catch (error) {
      Alert.alert("Sign up failed", "Error occured. Please try again");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

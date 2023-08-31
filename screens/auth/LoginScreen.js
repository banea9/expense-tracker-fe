import { useState } from "react";
import { login } from "../../util/auth";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/auth";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await login(email, password);
      dispatch(authenticate({ token }));
    } catch (error) {
      Alert.alert("Authentication failed", "Please check your credentials!");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

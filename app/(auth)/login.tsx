


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Alert,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Link, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing fields", "Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Login error", error.message);
//       return;
//     }

//     // ✅ SUCCESS → GO TO TABS
//     router.replace("/(tabs)");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Welcome Text */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.welcomeText}>Welcome</Text>
//         <Text style={styles.subtitleText}>smart home</Text>
//       </View>

//       {/* Input fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       {/* Login Button */}
//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={onLogin}
//         disabled={loading}
//       >
//         <Text style={styles.loginButtonText}>
//           {loading ? "Logging in..." : "LOG IN"}
//         </Text>
//       </TouchableOpacity>

//       {/* Link to Sign Up */}
//       <Link href="/(auth)/signup" style={styles.link}>
//         Don’t have an account? Sign up
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//     backgroundColor: "transparent",
//   },
//   welcomeText: {
//     fontSize: 36,
//     fontWeight: "700",
//     color: "#fff",
//     marginBottom: 10,
//   },
//   subtitleText: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#fff",
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: "#1D4ED8", // Dark Blue Color
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   link: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#007AFF",
//   },
//   gradientBackground: {
//     flex: 1,
//     backgroundColor: "transparent",
//     background: "linear-gradient(to top, #1E90FF, #00BFFF)", // Example gradient
//   },
// });



import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Login error", error.message);
      return;
    }

    // ✅ SUCCESS → GO TO TABS
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Samaya Spaces</Text>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "LOG IN"}
        </Text>
      </TouchableOpacity>

      {/* Link to Sign Up */}
      <Link href="/(auth)/signup" style={styles.link}>
        Don’t have an account? Sign up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e5f3fd",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1D4ED8", // Dark Blue Color
    marginBottom: 30, // Adds space between text and the input fields
    textAlign: "center", // Centers the text
  },
  input: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#1D4ED8", // Dark Blue Color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
  },
});

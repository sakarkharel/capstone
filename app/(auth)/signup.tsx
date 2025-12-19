




// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { Link, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// export default function Signup() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSignup = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing fields", "Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Signup error", error.message);
//       return;
//     }

//     // ✅ DO NOT create profile here
//     // DB will handle it automatically

//     router.replace("/(tabs)");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign up</Text>

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

//       <Button
//         title={loading ? "Creating..." : "Create account"}
//         onPress={onSignup}
//         disabled={loading}
//       />

//       <Link href="/(auth)/login" style={styles.link}>
//         Already have an account? Login
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     gap: 12,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//   },
//   link: {
//     marginTop: 16,
//     textAlign: "center",
//     color: "#007AFF",
//   },
// });

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

// export default function Signup() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSignup = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing fields", "Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Signup error", error.message);
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

//       {/* Sign Up Button */}
//       <TouchableOpacity
//         style={styles.signupButton}
//         onPress={onSignup}
//         disabled={loading}
//       >
//         <Text style={styles.signupButtonText}>
//           {loading ? "Creating..." : "CREATE ACCOUNT"}
//         </Text>
//       </TouchableOpacity>

//       {/* Link to Login */}
//       <Link href="/(auth)/login" style={styles.link}>
//         Already have an account? Login
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
//   signupButton: {
//     backgroundColor: "#1D4ED8", // Dark Blue Color
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   signupButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   link: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#007AFF",
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

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Signup error", error.message);
      return;
    }

    // ✅ SUCCESS → GO TO TABS
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Welcome to Samaya Spaces */}
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

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={onSignup}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? "Creating..." : "CREATE ACCOUNT"}
        </Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <Link href="/(auth)/login" style={styles.link}>
        Already have an account? Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  signupButton: {
    backgroundColor: "#1D4ED8", // Dark Blue Color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signupButtonText: {
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


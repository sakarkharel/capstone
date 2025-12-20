/*
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../../lib/supabase";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const onCreate = async () => {
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess.session?.user.id;
    if (!userId) return Alert.alert("Not logged in");

    const priceNum = parseInt(price, 10);
    if (!title || !priceNum) return Alert.alert("Missing", "Title and price are required");

    const { error } = await supabase.from("listings").insert({
      owner_id: userId,
      title,
      description: description || null,
      price_per_month: priceNum,
      location: location || null,
    });

    if (error) return Alert.alert("Error", error.message);

    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    Alert.alert("Done", "Listing posted!");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Post a room</Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Price per month (Rs.)" keyboardType="number-pad" value={price} onChangeText={setPrice} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{ borderWidth: 1, padding: 10, borderRadius: 8 }} />

      <Button title="Create listing" onPress={onCreate} />
    </View>
  );
}

*/

/*

import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../../lib/supabase";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    const { data: sess, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sess.session?.user) {
      Alert.alert("Not logged in", "Please login again.");
      return;
    }

    const userId = sess.session.user.id;

    const priceNum = parseInt(price, 10);
    if (!title || !priceNum || priceNum <= 0) {
      Alert.alert("Missing", "Title and valid price are required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("listings").insert({
      owner_id: userId,
      title,
      description: description || null,
      price_per_month: priceNum,
      location: location || null,
      is_active: true, // ✅ IMPORTANT: matches RLS + Home query
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");

    Alert.alert("Success", "Listing posted successfully!");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Post a room</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Price per month (Rs.)"
        keyboardType="number-pad"
        value={price}
        onChangeText={setPrice}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <Button
        title={loading ? "Posting..." : "Create listing"}
        onPress={onCreate}
        disabled={loading}
      />
    </View>
  );
}


*/



// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { supabase } from "../../lib/supabase";

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onCreate = async () => {
//     const { data: sess, error: sessionError } =
//       await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     const priceNum = parseInt(price, 10);
//     if (!title || !priceNum || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       is_active: true,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.heading}>Post a Room</Text>
//         <Text style={styles.subHeading}>
//           Fill in the details below to list your room
//         </Text>

//         <View style={styles.card}>
//           <View style={styles.field}>
//             <Text style={styles.label}>Title</Text>
//             <TextInput
//               placeholder="e.g. Single room near city center"
//               value={title}
//               onChangeText={setTitle}
//               style={styles.input}
//             />
//           </View>

//           <View style={styles.field}>
//             <Text style={styles.label}>Description</Text>
//             <TextInput
//               placeholder="Describe the room, facilities, rules..."
//               value={description}
//               onChangeText={setDescription}
//               style={[styles.input, styles.textArea]}
//               multiline
//             />
//           </View>

//           <View style={styles.field}>
//             <Text style={styles.label}>Price per month (Rs.)</Text>
//             <TextInput
//               placeholder="e.g. 8000"
//               keyboardType="number-pad"
//               value={price}
//               onChangeText={setPrice}
//               style={styles.input}
//             />
//           </View>

//           <View style={styles.field}>
//             <Text style={styles.label}>Location</Text>
//             <TextInput
//               placeholder="e.g. Baneshwor, Kathmandu"
//               value={location}
//               onChangeText={setLocation}
//               style={styles.input}
//             />
//           </View>

//           <View style={{ marginTop: 10 }}>
//             <Button
//               title={loading ? "Posting..." : "Create Listing"}
//               onPress={onCreate}
//               disabled={loading}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 4,
//   },
//   subHeading: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#e5e5e5",
//   },
//   field: {
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 15,
//     backgroundColor: "#fafafa",
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
// });


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { supabase } from "../../lib/supabase";

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onCreate = async () => {
//     const { data: sess, error: sessionError } =
//       await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     const priceNum = parseInt(price, 10);
//     if (!title || !priceNum || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       is_active: true,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Removed the box and heading to match the clean theme */}
        
//         {/* Title Input */}
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         {/* Description Input */}
//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         {/* Price Input */}
//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         {/* Location Input */}
//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         {/* Create Listing Button */}
//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={loading}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30, // Added gap at the top
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25, // Rounded edges similar to index.tsx
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5", // Lighter background for input fields
//     marginBottom: 15, // Consistent spacing
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//     backgroundColor: "#1D4ED8"
//   },
// });


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { Picker } from "@react-native-picker/picker";

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);

//   const onCreate = async () => {
//     const { data: sess, error: sessionError } =
//       await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     const priceNum = parseInt(price, 10);
//     if (!title || !priceNum || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       is_active: true,
//       type: listingType, // Add the type here
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Removed the box and heading to match the clean theme */}

//         {/* Title Input */}
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         {/* Description Input */}
//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         {/* Price Input */}
//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         {/* Location Input */}
//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         {/* Listing Type Picker */}
//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={(itemValue) => setListingType(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         {/* Create Listing Button */}
//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={loading}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30, // Added gap at the top
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25, // Rounded edges similar to index.tsx
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5", // Lighter background for input fields
//     marginBottom: 15, // Consistent spacing
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//     backgroundColor: "#1D4ED8"
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     marginBottom: 15,
//     backgroundColor: "#f5f5f5",
//   },
// });



// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null); // State for image URI

//   // Function to pick an image from the camera (directly using the camera)
//   const pickImageFromCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access the camera is required!");
//       return;
//     }

//     const pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: false, // Disable editing (cropping) of the image
//       quality: 1, // Full quality
//     });

//     console.log("Picker result:", pickerResult);

//     // Check if the user selected an image and update the state
//     if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
//       const imageUri = pickerResult.assets[0]?.uri; // Access the URI of the selected image
//       setImageUri(imageUri); // Store the URI of the selected image
//       console.log("Selected Image URI:", imageUri); // Debugging message
//     } else {
//       console.log("No image selected or picker canceled");
//     }
//   };

//   // Function to upload the image to Supabase
//   const uploadImage = async () => {
//     if (!imageUri) {
//       alert("No image selected!");
//       return;
//     }

//     const filename = imageUri.split("/").pop();
//     const fileExtension = filename?.split(".").pop();
//     const filePath = `room_images/${Date.now()}.${fileExtension}`;

//     const response = await fetch(imageUri);
//     const blob = await response.blob();

//     const { data, error } = await supabase.storage
//       .from("images") // Replace 'images' with the name of your bucket
//       .upload(filePath, blob, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (error) {
//       alert("Error uploading image: " + error.message);
//       return;
//     }

//     const imageUrl = supabase.storage
//       .from("images")
//       .getPublicUrl(filePath).publicURL;

//     return imageUrl;
//   };

//   // Function to create the listing
//   const onCreate = async () => {
//     const { data: sess, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     const priceNum = parseInt(price, 10);
//     if (!title || !priceNum || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null; // Upload image if URI exists

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       is_active: true,
//       type: listingType, // Add the type here
//       image_url: imageUrl, // Add the image URL to the database
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null); // Reset the image picker after successful upload

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Title Input */}
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         {/* Description Input */}
//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         {/* Price Input */}
//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         {/* Location Input */}
//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         {/* Listing Type Picker */}
//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={(itemValue) => setListingType(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         {/* Camera Picker Button */}
//         <Button title="Take a Picture" onPress={pickImageFromCamera} />
//         {/* Display the selected image URI as a preview */}
//         {imageUri && (
//           <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
//         )}

//         {/* Create Listing Button */}
//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={loading}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30, // Added gap at the top
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25, // Rounded edges similar to index.tsx
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5", // Lighter background for input fields
//     marginBottom: 15, // Consistent spacing
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//     backgroundColor: "#1D4ED8",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },
// });


// app/(tabs)/create.tsx

// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // ✅ NEW (for Expo-friendly upload)
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ CAMERA PICK
//   const pickImageFromCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (!permissionResult.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6, // reduce size a bit (helps upload)
//     });

//     console.log("Picker result:", pickerResult);

//     if (!pickerResult.canceled && pickerResult.assets?.length) {
//       const uri = pickerResult.assets[0].uri;
//       setImageUri(uri);
//       console.log("Selected Image URI:", uri);
//     } else {
//       console.log("No image selected or picker canceled");
//     }
//   };

//   // ✅ UPDATED UPLOAD (Base64 -> ArrayBuffer) [Expo/Android reliable]
//   const uploadImage = async () => {
//     if (!imageUri) {
//       Alert.alert("No image", "Please take a photo first.");
//       return null;
//     }

//     try {
//       const bucket = "images"; // 👈 must match your Supabase bucket name exactly
//       const filePath = `room_images/${Date.now()}.jpg`;

//       // Read local file -> base64
//       const base64 = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: "base64",
//       });

//       // base64 -> ArrayBuffer
//       const arrayBuffer = decode(base64);

//       const { data, error } = await supabase.storage
//         .from(bucket)
//         .upload(filePath, arrayBuffer, {
//           contentType: "image/jpeg",
//           upsert: false,
//         });

//       if (error) {
//         console.log("UPLOAD ERROR:", error);
//         Alert.alert("Upload failed", error.message);
//         return null;
//       }

//       console.log("UPLOAD SUCCESS:", data);

//       const { data: publicUrlData } = supabase.storage
//         .from(bucket)
//         .getPublicUrl(filePath);

//       const publicUrl = publicUrlData?.publicUrl ?? null;
//       console.log("PUBLIC URL:", publicUrl);

//       return publicUrl;
//     } catch (e: any) {
//       console.log("UPLOAD EXCEPTION:", e);
//       Alert.alert("Upload error", e?.message ?? "Unknown error");
//       return null;
//     }
//   };

//   // ✅ CREATE LISTING
//   const onCreate = async () => {
//     const { data: sess, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     const priceNum = parseInt(price, 10);
//     if (!title || !priceNum || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       is_active: true,
//       type: listingType,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={(itemValue) => setListingType(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={{ marginBottom: 6, fontWeight: "600" }}>Preview:</Text>
//             <Image
//               source={{ uri: imageUri }}
//               style={{ width: "100%", height: 220, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={loading}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5",
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },
// });

// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // ✅ Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number; // 0 - 100
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // 1) Suspicious keyword signals (Nepal-ish patterns)
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "immediately",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "contact",
//     "call now",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "account",
//     "online payment",
//     "deposit",
//     "100% sure",
//     "guarantee",
//     "limited",
//     "today only",
//     "hurry",
//     "cheap",
//     "discount",
//     "offer",
//     "passport",
//     "visa",
//     "agent",
//     // Nepali / romanized common
//     "advance paisa",
//     "paisa pathaunu",
//     "urgent xa",
//     "token dinu",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(
//       `Suspicious wording detected: ${keywordHits.slice(0, 4).join(", ")}${
//         keywordHits.length > 4 ? "..." : ""
//       }`
//     );
//   }

//   // 2) Phone number in description/location (scam signal + policy/quality)
//   const phoneRegex =
//     /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g; // loose: catches many phone-like strings
//   const phoneMatches = (description + " " + location).match(phoneRegex);
//   if (phoneMatches && phoneMatches.length > 0) {
//     score += 15;
//     reasons.push("Contains phone number/contact details (often used in scam posts).");
//   }

//   // 3) Too short / too vague description
//   const descLen = description.trim().length;
//   if (descLen > 0 && descLen < 25) {
//     score += 12;
//     reasons.push("Description is very short/vague.");
//   }

//   // 4) Spammy formatting
//   const excessiveCaps =
//     (title.match(/[A-Z]/g)?.length ?? 0) > Math.max(8, title.length * 0.6);
//   if (excessiveCaps) {
//     score += 10;
//     reasons.push("Title uses excessive uppercase (spam-like).");
//   }

//   const repeatedChars = /(.)\1{5,}/.test(text);
//   if (repeatedChars) {
//     score += 10;
//     reasons.push("Contains repeated characters (spam-like formatting).");
//   }

//   // 5) Price sanity checks (simple thresholds)
//   // You can tune these numbers for Nepal later — this is just “reasonable heuristics”
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;

//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price looks unusually low (too-good-to-be-true).");
//     }

//     if (priceNum > 250000) {
//       score += 10;
//       reasons.push("Price looks unusually high (check if correct).");
//     }
//   }

//   // 6) Missing location
//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) {
//     reasons.push("No obvious risk signals found.");
//   }

//   return { level, score, reasons };
// }

// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ Trust check UI state
//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });
//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     return result;
//   };

//   // ✅ CAMERA PICK
//   const pickImageFromCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (!permissionResult.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     console.log("Picker result:", pickerResult);

//     if (!pickerResult.canceled && pickerResult.assets?.length) {
//       const uri = pickerResult.assets[0].uri;
//       setImageUri(uri);
//       console.log("Selected Image URI:", uri);
//     } else {
//       console.log("No image selected or picker canceled");
//     }
//   };

//   // ✅ UPLOAD IMAGE
//   const uploadImage = async () => {
//     if (!imageUri) {
//       Alert.alert("No image", "Please take a photo first.");
//       return null;
//     }

//     try {
//       const bucket = "images";
//       const filePath = `room_images/${Date.now()}.jpg`;

//       const base64 = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: "base64",
//       });

//       const arrayBuffer = decode(base64);

//       const { data, error } = await supabase.storage
//         .from(bucket)
//         .upload(filePath, arrayBuffer, {
//           contentType: "image/jpeg",
//           upsert: false,
//         });

//       if (error) {
//         console.log("UPLOAD ERROR:", error);
//         Alert.alert("Upload failed", error.message);
//         return null;
//       }

//       console.log("UPLOAD SUCCESS:", data);

//       const { data: publicUrlData } = supabase.storage
//         .from(bucket)
//         .getPublicUrl(filePath);

//       const publicUrl = publicUrlData?.publicUrl ?? null;
//       console.log("PUBLIC URL:", publicUrl);

//       return publicUrl;
//     } catch (e: any) {
//       console.log("UPLOAD EXCEPTION:", e);
//       Alert.alert("Upload error", e?.message ?? "Unknown error");
//       return null;
//     }
//   };

//   // ✅ CREATE LISTING
//   const onCreate = async () => {
//     const { data: sess, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError || !sess.session?.user) {
//       Alert.alert("Not logged in", "Please login again.");
//       return;
//     }

//     const userId = sess.session.user.id;

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price are required");
//       return;
//     }

//     // ✅ Run trust check before posting (always)
//     const result = runTrustCheckNow();

//     // If HIGH risk: require confirmation
//     if (result.level === "high") {
//       Alert.alert(
//         "High risk listing detected",
//         `This listing looks suspicious.\n\nScore: ${result.score}/100\n\nTop reason: ${result.reasons[0]}\n\nDo you still want to post?`,
//         [
//           { text: "Cancel", style: "cancel" },
//           {
//             text: "Post anyway",
//             style: "destructive",
//             onPress: async () => {
//               await actuallyCreate(userId);
//             },
//           },
//         ]
//       );
//       return;
//     }

//     // Low/Medium: proceed normally (Medium is a warning but not blocked)
//     await actuallyCreate(userId);
//   };

//   const actuallyCreate = async (userId: string) => {
//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: userId,
//       title,
//       description: description || null,
//       price_per_month: parseInt(price, 10),
//       location: location || null,
//       is_active: true,
//       type: listingType,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   const trustLabel =
//     trustResult?.level === "high"
//       ? "High Risk"
//       : trustResult?.level === "medium"
//       ? "Caution"
//       : "Low Risk";

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={(itemValue) => setListingType(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={{ marginBottom: 6, fontWeight: "600" }}>Preview:</Text>
//             <Image
//               source={{ uri: imageUri }}
//               style={{ width: "100%", height: 220, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         {/* ✅ Trust Check Panel */}
//         <View style={styles.trustBox}>
//           <View style={styles.trustHeader}>
//             <Text style={styles.trustTitle}>Trust & Safety Check</Text>
//             {trustCheckedOnce && trustResult && (
//               <View style={[styles.badge, { borderColor: trustColor }]}>
//                 <Text style={[styles.badgeText, { color: trustColor }]}>
//                   {trustLabel} • {trustResult.score}/100
//                 </Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.trustHint}>
//             Checks common scam signals (keywords, weird pricing, contact info, spam patterns).
//           </Text>

//           <View style={{ marginTop: 10 }}>
//             <Button
//               title="Run Trust Check"
//               onPress={runTrustCheckNow}
//               disabled={loading}
//             />
//           </View>

//           {trustCheckedOnce && trustResult && (
//             <View style={{ marginTop: 12 }}>
//               <Text style={styles.trustSubTitle}>Reasons:</Text>
//               {trustResult.reasons.slice(0, 5).map((r, idx) => (
//                 <Text key={idx} style={styles.reasonText}>
//                   • {r}
//                 </Text>
//               ))}
//               {trustResult.level === "medium" && (
//                 <Text style={styles.warnText}>
//                   Tip: Medium risk listings are allowed, but consider improving details (clear rules,
//                   exact location area, avoid payment words).
//                 </Text>
//               )}
//               {trustResult.level === "high" && (
//                 <Text style={styles.warnText}>
//                   High risk listings require confirmation before posting.
//                 </Text>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={loading}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5",
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },

//   // ✅ Trust box styling (keeps your theme)
//   trustBox: {
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 16,
//     padding: 14,
//     backgroundColor: "#ffffff",
//   },
//   trustHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   trustTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#111827",
//   },
//   trustHint: {
//     marginTop: 6,
//     color: "#6b7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   badge: {
//     borderWidth: 1,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#fff",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "800",
//   },
//   trustSubTitle: {
//     fontWeight: "800",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   reasonText: {
//     color: "#374151",
//     marginBottom: 4,
//     lineHeight: 18,
//   },
//   warnText: {
//     marginTop: 8,
//     color: "#6b7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },
// });


// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number;
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// // ---------------- TRUST CHECK ENGINE ----------------
// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // Suspicious keywords
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "deposit",
//     "guarantee",
//     "cheap",
//     "offer",
//     "hurry",
//     "limited",
//     "passport",
//     "agent",
//     "urgent xa",
//     "advance paisa",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
//   }

//   // Phone number detection
//   const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
//   if ((description + location).match(phoneRegex)) {
//     score += 15;
//     reasons.push("Contains phone/contact details.");
//   }

//   // Very short description
//   if (description.trim().length > 0 && description.trim().length < 25) {
//     score += 12;
//     reasons.push("Description is too short or vague.");
//   }

//   // Price sanity
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;
//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price is unusually low.");
//     }
//   }

//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) reasons.push("No obvious risk detected.");

//   return { level, score, reasons };
// }

// // ---------------- MAIN COMPONENT ----------------
// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });
//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     return result;
//   };

//   // Camera
//   const pickImageFromCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // Upload image
//   const uploadImage = async () => {
//     if (!imageUri) return null;

//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: "base64",
//     });

//     const arrayBuffer = decode(base64);
//     const filePath = `room_images/${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(filePath, arrayBuffer, {
//         contentType: "image/jpeg",
//         upsert: false,
//       });

//     if (error) {
//       Alert.alert("Upload failed", error.message);
//       return null;
//     }

//     return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
//   };

//   // Create listing (HARD BLOCK)
//   const onCreate = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     if (!sess.session?.user) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price required.");
//       return;
//     }

//     const trust = runTrustCheckNow();

//     // ⛔ HARD BLOCK
//     if (trust.level === "high") {
//       Alert.alert(
//         "Listing Blocked",
//         `High risk detected.\n\nScore: ${trust.score}/100\n\nReason: ${trust.reasons[0]}\n\nPlease edit and try again.`
//       );
//       return;
//     }

//     setLoading(true);
//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: sess.session.user.id,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       type: listingType,
//       is_active: true,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
//         <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, styles.textArea]} multiline />
//         <TextInput placeholder="Price" keyboardType="number-pad" value={price} onChangeText={setPrice} style={styles.input} />
//         <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker selectedValue={listingType} onValueChange={setListingType} style={styles.input}>
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <Image source={{ uri: imageUri }} style={{ width: "100%", height: 220, borderRadius: 12, marginTop: 12 }} />
//         )}

//         <View style={styles.trustBox}>
//           <Text style={styles.trustTitle}>Trust & Safety</Text>
//           <Button title="Run Trust Check" onPress={runTrustCheckNow} />
//           {trustCheckedOnce && trustResult && (
//             <Text style={{ color: trustColor, marginTop: 8 }}>
//               {trustResult.level.toUpperCase()} • {trustResult.score}/100
//             </Text>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button title={loading ? "Posting..." : "Create Listing"} onPress={onCreate} disabled={loading} />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: { padding: 16, paddingBottom: 30, marginTop: 30 },
//   input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 25, padding: 12, backgroundColor: "#f5f5f5", marginBottom: 12 },
//   textArea: { height: 90 },
//   label: { fontWeight: "bold", marginBottom: 6 },
//   buttonContainer: { marginTop: 20 },
//   trustBox: { marginTop: 16, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 12 },
//   trustTitle: { fontWeight: "bold" },
// });

// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number;
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// // ---------------- TRUST CHECK ENGINE ----------------
// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // Suspicious keywords
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "deposit",
//     "guarantee",
//     "cheap",
//     "offer",
//     "hurry",
//     "limited",
//     "passport",
//     "agent",
//     "urgent xa",
//     "advance paisa",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
//   }

//   // Phone number detection
//   const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
//   if ((description + " " + location).match(phoneRegex)) {
//     score += 15;
//     reasons.push("Contains phone/contact details.");
//   }

//   // Very short description
//   if (description.trim().length > 0 && description.trim().length < 25) {
//     score += 12;
//     reasons.push("Description is too short or vague.");
//   }

//   // Price sanity
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;
//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price is unusually low.");
//     }
//   }

//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) reasons.push("No obvious risk detected.");

//   return { level, score, reasons };
// }

// // ---------------- MAIN COMPONENT ----------------
// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ Trust check is now REQUIRED (user must click)
//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);
//   const [trustSnapshot, setTrustSnapshot] = useState<string>(""); // snapshot of inputs when trust check ran

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   // Build a signature of current inputs (so if user edits after trust check, we force re-check)
//   const currentSnapshot = useMemo(() => {
//     return JSON.stringify({
//       title: title.trim(),
//       description: description.trim(),
//       price: price.trim(),
//       location: location.trim(),
//       listingType,
//       imageUri: imageUri ?? null,
//     });
//   }, [title, description, price, location, listingType, imageUri]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });

//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     setTrustSnapshot(currentSnapshot); // lock snapshot at the time of check
//     return result;
//   };

//   const trustIsFresh = trustCheckedOnce && trustSnapshot === currentSnapshot;

//   // Camera
//   const pickImageFromCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//       // Any change invalidates previous check (trustIsFresh becomes false because snapshot differs)
//     }
//   };

//   // Upload image
//   const uploadImage = async () => {
//     if (!imageUri) return null;

//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: "base64",
//     });

//     const arrayBuffer = decode(base64);
//     const filePath = `room_images/${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(filePath, arrayBuffer, {
//         contentType: "image/jpeg",
//         upsert: false,
//       });

//     if (error) {
//       Alert.alert("Upload failed", error.message);
//       return null;
//     }

//     return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
//   };

//   // Create listing (REQUIRES TRUST CHECK BUTTON)
//   const onCreate = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     if (!sess.session?.user) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price required.");
//       return;
//     }

//     // ✅ MUST click Run Trust Check first
//     if (!trustCheckedOnce || !trustResult) {
//       Alert.alert(
//         "Safety Check Required",
//         "Please tap “Run Trust Check” before posting."
//       );
//       return;
//     }

//     // ✅ If user edited fields after running trust check, force re-check
//     if (!trustIsFresh) {
//       Alert.alert(
//         "Safety Check Outdated",
//         "You changed some details after the Trust Check. Please run the Trust Check again."
//       );
//       return;
//     }

//     // ✅ BLOCK if High risk
//     if (trustResult.level === "high") {
//       Alert.alert(
//         "Listing Blocked",
//         `High risk detected.\n\nScore: ${trustResult.score}/100\n\nReason: ${trustResult.reasons[0]}\n\nPlease edit and run Trust Check again.`
//       );
//       return;
//     }

//     // ✅ Low/Medium only can post
//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: sess.session.user.id,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       type: listingType,
//       is_active: true,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     // Reset
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);
//     setTrustSnapshot("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   const trustLabel =
//     trustResult?.level === "high"
//       ? "High Risk"
//       : trustResult?.level === "medium"
//       ? "Caution"
//       : "Low Risk";

//   const postDisabled =
//     loading ||
//     !trustCheckedOnce ||
//     !trustResult ||
//     !trustIsFresh ||
//     trustResult.level === "high";

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={setListingType}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={{ marginBottom: 6, fontWeight: "600" }}>Preview:</Text>
//             <Image
//               source={{ uri: imageUri }}
//               style={{ width: "100%", height: 220, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         {/* ✅ TRUST CHECK PANEL (REQUIRED) */}
//         <View style={styles.trustBox}>
//           <View style={styles.trustHeader}>
//             <Text style={styles.trustTitle}>Trust & Safety Check (Required)</Text>
//             {trustCheckedOnce && trustResult && (
//               <View style={[styles.badge, { borderColor: trustColor }]}>
//                 <Text style={[styles.badgeText, { color: trustColor }]}>
//                   {trustLabel} • {trustResult.score}/100
//                 </Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.trustHint}>
//             You must run this check before posting. If you change any details
//             afterward, you must run it again.
//           </Text>

//           <View style={{ marginTop: 10 }}>
//             <Button
//               title="Run Trust Check"
//               onPress={runTrustCheckNow}
//               disabled={loading}
//             />
//           </View>

//           {trustCheckedOnce && trustResult && (
//             <View style={{ marginTop: 12 }}>
//               {!trustIsFresh && (
//                 <Text style={styles.outdatedText}>
//                   ⚠️ Trust Check is outdated. Run it again.
//                 </Text>
//               )}

//               <Text style={styles.trustSubTitle}>Reasons:</Text>
//               {trustResult.reasons.slice(0, 5).map((r, idx) => (
//                 <Text key={idx} style={styles.reasonText}>
//                   • {r}
//                 </Text>
//               ))}

//               {trustResult.level === "high" && (
//                 <Text style={styles.blockText}>
//                   ⛔ High risk listings are blocked. Please edit and re-run the check.
//                 </Text>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={postDisabled}
//           />

//           {/* Optional helper text (no extra logic) */}
//           {!trustCheckedOnce && (
//             <Text style={styles.helperText}>
//               Run Trust Check to enable posting.
//             </Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "high" && (
//             <Text style={styles.helperText}>
//               Posting disabled due to High Risk.
//             </Text>
//           )}
//           {trustCheckedOnce && !trustIsFresh && (
//             <Text style={styles.helperText}>
//               You changed details after checking. Run Trust Check again.
//             </Text>
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5",
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },

//   trustBox: {
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 16,
//     padding: 14,
//     backgroundColor: "#ffffff",
//   },
//   trustHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   trustTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#111827",
//   },
//   trustHint: {
//     marginTop: 6,
//     color: "#6b7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   badge: {
//     borderWidth: 1,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#fff",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "800",
//   },
//   trustSubTitle: {
//     fontWeight: "800",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   reasonText: {
//     color: "#374151",
//     marginBottom: 4,
//     lineHeight: 18,
//   },
//   outdatedText: {
//     marginBottom: 8,
//     color: "#D97706",
//     fontWeight: "700",
//   },
//   blockText: {
//     marginTop: 8,
//     color: "#DC2626",
//     fontWeight: "700",
//   },
//   helperText: {
//     marginTop: 8,
//     color: "#6b7280",
//     fontSize: 13,
//   },
// });


// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number;
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// // ---------------- TRUST CHECK ENGINE ----------------
// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // Suspicious keywords
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "deposit",
//     "guarantee",
//     "cheap",
//     "offer",
//     "hurry",
//     "limited",
//     "passport",
//     "agent",
//     "urgent xa",
//     "advance paisa",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
//   }

//   // Phone number detection
//   const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
//   if ((description + " " + location).match(phoneRegex)) {
//     score += 15;
//     reasons.push("Contains phone/contact details.");
//   }

//   // Very short description
//   if (description.trim().length > 0 && description.trim().length < 25) {
//     score += 12;
//     reasons.push("Description is too short or vague.");
//   }

//   // Price sanity
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;
//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price is unusually low.");
//     }
//   }

//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) reasons.push("No obvious risk detected.");

//   return { level, score, reasons };
// }

// // ---------------- MAIN COMPONENT ----------------
// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ Trust check is REQUIRED (user must click)
//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);
//   const [trustSnapshot, setTrustSnapshot] = useState<string>(""); // snapshot of inputs when check ran

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   // Snapshot of current inputs (if changes after check, check becomes outdated)
//   const currentSnapshot = useMemo(() => {
//     return JSON.stringify({
//       title: title.trim(),
//       description: description.trim(),
//       price: price.trim(),
//       location: location.trim(),
//       listingType,
//       imageUri: imageUri ?? null,
//     });
//   }, [title, description, price, location, listingType, imageUri]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });
//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     setTrustSnapshot(currentSnapshot);
//     return result;
//   };

//   const trustIsFresh = trustCheckedOnce && trustSnapshot === currentSnapshot;

//   // Camera
//   const pickImageFromCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // Upload image
//   const uploadImage = async () => {
//     if (!imageUri) return null;

//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: "base64",
//     });

//     const arrayBuffer = decode(base64);
//     const filePath = `room_images/${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(filePath, arrayBuffer, {
//         contentType: "image/jpeg",
//         upsert: false,
//       });

//     if (error) {
//       Alert.alert("Upload failed", error.message);
//       return null;
//     }

//     return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
//   };

//   // Create listing (requires Trust Check button)
//   const onCreate = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     if (!sess.session?.user) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price required.");
//       return;
//     }

//     // Must click Trust Check first
//     if (!trustCheckedOnce || !trustResult) {
//       Alert.alert(
//         "Safety Check Required",
//         "Please tap “Run Trust Check” before posting."
//       );
//       return;
//     }

//     // If edited after check, force re-check
//     if (!trustIsFresh) {
//       Alert.alert(
//         "Safety Check Outdated",
//         "You changed some details after the Trust Check. Please run the Trust Check again."
//       );
//       return;
//     }

//     // Block if High risk
//     if (trustResult.level === "high") {
//       Alert.alert(
//         "Listing Blocked",
//         `High risk detected.\n\nScore: ${trustResult.score}/100\n\nReason: ${trustResult.reasons[0]}\n\nPlease edit and run Trust Check again.`
//       );
//       return;
//     }

//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: sess.session.user.id,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       type: listingType,
//       is_active: true,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     // Reset
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);
//     setTrustSnapshot("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   const trustLabel =
//     trustResult?.level === "high"
//       ? "High Risk"
//       : trustResult?.level === "medium"
//       ? "Caution"
//       : "Low Risk";

//   // ✅ BLUE button only when posting is allowed
//   const canPost =
//     trustCheckedOnce &&
//     trustIsFresh &&
//     !!trustResult &&
//     trustResult.level !== "high" &&
//     !loading;

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={setListingType}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={{ marginBottom: 6, fontWeight: "600" }}>Preview:</Text>
//             <Image
//               source={{ uri: imageUri }}
//               style={{ width: "100%", height: 220, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         {/* TRUST CHECK PANEL */}
//         <View style={styles.trustBox}>
//           <View style={styles.trustHeader}>
//             <Text style={styles.trustTitle}>Trust & Safety Check (Required)</Text>
//             {trustCheckedOnce && trustResult && (
//               <View style={[styles.badge, { borderColor: trustColor }]}>
//                 <Text style={[styles.badgeText, { color: trustColor }]}>
//                   {trustLabel} • {trustResult.score}/100
//                 </Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.trustHint}>
//             You must run this check before posting. If you change any details afterward,
//             you must run it again.
//           </Text>

//           <View style={{ marginTop: 10 }}>
//             <Button title="Run Trust Check" onPress={runTrustCheckNow} disabled={loading} />
//           </View>

//           {trustCheckedOnce && trustResult && (
//             <View style={{ marginTop: 12 }}>
//               {!trustIsFresh && (
//                 <Text style={styles.outdatedText}>
//                   ⚠️ Trust Check is outdated. Run it again.
//                 </Text>
//               )}

//               <Text style={styles.trustSubTitle}>Reasons:</Text>
//               {trustResult.reasons.slice(0, 5).map((r, idx) => (
//                 <Text key={idx} style={styles.reasonText}>
//                   • {r}
//                 </Text>
//               ))}

//               {trustResult.level === "high" && (
//                 <Text style={styles.blockText}>
//                   ⛔ High risk listings are blocked. Please edit and re-run the check.
//                 </Text>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={!canPost}
//             color={canPost ? "#1D4ED8" : "#9CA3AF"} // 🔵 Blue only when allowed
//           />

//           {!trustCheckedOnce && (
//             <Text style={styles.helperText}>Run Trust Check to enable posting.</Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "high" && (
//             <Text style={styles.helperText}>Posting disabled due to High Risk.</Text>
//           )}
//           {trustCheckedOnce && !trustIsFresh && (
//             <Text style={styles.helperText}>
//               You changed details after checking. Run Trust Check again.
//             </Text>
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5",
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },

//   trustBox: {
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 16,
//     padding: 14,
//     backgroundColor: "#ffffff",
//   },
//   trustHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   trustTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#111827",
//   },
//   trustHint: {
//     marginTop: 6,
//     color: "#6b7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   badge: {
//     borderWidth: 1,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#fff",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "800",
//   },
//   trustSubTitle: {
//     fontWeight: "800",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   reasonText: {
//     color: "#374151",
//     marginBottom: 4,
//     lineHeight: 18,
//   },
//   outdatedText: {
//     marginBottom: 8,
//     color: "#D97706",
//     fontWeight: "700",
//   },
//   blockText: {
//     marginTop: 8,
//     color: "#DC2626",
//     fontWeight: "700",
//   },
//   helperText: {
//     marginTop: 8,
//     color: "#6b7280",
//     fontSize: 13,
//   },
// });


// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number;
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// // ---------------- TRUST CHECK ENGINE ----------------
// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // Suspicious keywords
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "deposit",
//     "guarantee",
//     "cheap",
//     "offer",
//     "hurry",
//     "limited",
//     "passport",
//     "agent",
//     "urgent xa",
//     "advance paisa",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
//   }

//   // Phone number detection
//   const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
//   if ((description + " " + location).match(phoneRegex)) {
//     score += 15;
//     reasons.push("Contains phone/contact details.");
//   }

//   // Very short description
//   if (description.trim().length > 0 && description.trim().length < 25) {
//     score += 12;
//     reasons.push("Description is too short or vague.");
//   }

//   // Price sanity
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;
//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price is unusually low.");
//     }
//   }

//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) reasons.push("No obvious risk detected.");

//   return { level, score, reasons };
// }

// // ---------------- MAIN COMPONENT ----------------
// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ Trust check is REQUIRED (user must click)
//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);
//   const [trustSnapshot, setTrustSnapshot] = useState<string>(""); // snapshot of inputs when check ran

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   // Snapshot of current inputs (if changes after check, check becomes outdated)
//   const currentSnapshot = useMemo(() => {
//     return JSON.stringify({
//       title: title.trim(),
//       description: description.trim(),
//       price: price.trim(),
//       location: location.trim(),
//       listingType,
//       imageUri: imageUri ?? null,
//     });
//   }, [title, description, price, location, listingType, imageUri]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });
//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     setTrustSnapshot(currentSnapshot);
//     return result;
//   };

//   const trustIsFresh = trustCheckedOnce && trustSnapshot === currentSnapshot;

//   // Camera
//   const pickImageFromCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // Upload image
//   const uploadImage = async () => {
//     if (!imageUri) return null;

//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: "base64",
//     });

//     const arrayBuffer = decode(base64);
//     const filePath = `room_images/${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(filePath, arrayBuffer, {
//         contentType: "image/jpeg",
//         upsert: false,
//       });

//     if (error) {
//       Alert.alert("Upload failed", error.message);
//       return null;
//     }

//     return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
//   };

//   // Create listing (requires Trust Check button)
//   const onCreate = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     if (!sess.session?.user) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price required.");
//       return;
//     }

//     // Must click Trust Check first
//     if (!trustCheckedOnce || !trustResult) {
//       Alert.alert(
//         "Safety Check Required",
//         "Please tap “Run Trust Check” before posting."
//       );
//       return;
//     }

//     // If edited after check, force re-check
//     if (!trustIsFresh) {
//       Alert.alert(
//         "Safety Check Outdated",
//         "You changed some details after the Trust Check. Please run the Trust Check again."
//       );
//       return;
//     }

//     // ✅ Block if Medium OR High risk
//     if (trustResult.level === "high" || trustResult.level === "medium") {
//       const label = trustResult.level === "high" ? "High risk" : "Medium risk";
//       Alert.alert(
//         "Listing Blocked",
//         `${label} detected.\n\nScore: ${trustResult.score}/100\n\nTop reasons:\n- ${trustResult.reasons
//           .slice(0, 3)
//           .join("\n- ")}\n\nPlease edit and run Trust Check again.`
//       );
//       return;
//     }

//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: sess.session.user.id,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       type: listingType,
//       is_active: true,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     // Reset
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);
//     setTrustSnapshot("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   const trustLabel =
//     trustResult?.level === "high"
//       ? "High Risk"
//       : trustResult?.level === "medium"
//       ? "Medium Risk"
//       : "Low Risk";

//   // ✅ BLUE button only when posting is allowed
//   // now allowed ONLY when risk is LOW
//   const canPost =
//     trustCheckedOnce &&
//     trustIsFresh &&
//     !!trustResult &&
//     trustResult.level === "low" &&
//     !loading;

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1,  }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="e.g. Single room near city center"
//           value={title}
//           onChangeText={setTitle}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Describe the room, facilities, rules..."
//           value={description}
//           onChangeText={setDescription}
//           style={[styles.input, styles.textArea]}
//           multiline
//         />

//         <TextInput
//           placeholder="e.g. 8000"
//           keyboardType="number-pad"
//           value={price}
//           onChangeText={setPrice}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="e.g. Baneshwor, Kathmandu"
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />

//         <Text style={styles.label}>Listing Type</Text>
//         <Picker
//           selectedValue={listingType}
//           onValueChange={setListingType}
//           style={styles.input}
//         >
//           <Picker.Item label="Room" value="room" />
//           <Picker.Item label="Flat" value="flat" />
//         </Picker>

//         <Button title="Take a Picture" onPress={pickImageFromCamera} />

//         {imageUri && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={{ marginBottom: 6, fontWeight: "600" }}>Preview:</Text>
//             <Image
//               source={{ uri: imageUri }}
//               style={{ width: "100%", height: 220, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </View>
//         )}

//         {/* TRUST CHECK PANEL */}
//         <View style={styles.trustBox}>
//           <View style={styles.trustHeader}>
//             <Text style={styles.trustTitle}>Trust & Safety Check (Required)</Text>
//             {trustCheckedOnce && trustResult && (
//               <View style={[styles.badge, { borderColor: trustColor }]}>
//                 <Text style={[styles.badgeText, { color: trustColor }]}>
//                   {trustLabel} • {trustResult.score}/100
//                 </Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.trustHint}>
//             You must run this check before posting. If you change any details afterward,
//             you must run it again.
//           </Text>

//           <View style={{ marginTop: 10 }}>
//             <Button title="Run Trust Check" onPress={runTrustCheckNow} disabled={loading} />
//           </View>

//           {trustCheckedOnce && trustResult && (
//             <View style={{ marginTop: 12 }}>
//               {!trustIsFresh && (
//                 <Text style={styles.outdatedText}>
//                   ⚠️ Trust Check is outdated. Run it again.
//                 </Text>
//               )}

//               <Text style={styles.trustSubTitle}>Reasons:</Text>
//               {trustResult.reasons.slice(0, 5).map((r, idx) => (
//                 <Text key={idx} style={styles.reasonText}>
//                   • {r}
//                 </Text>
//               ))}

//               {(trustResult.level === "high" || trustResult.level === "medium") && (
//                 <Text style={styles.blockText}>
//                   ⛔ {trustResult.level === "high" ? "High" : "Medium"} risk listings are blocked.
//                   Please edit and re-run the check.
//                 </Text>
//               )}

//               {trustResult.level === "low" && (
//                 <Text style={styles.okText}>✅ Looks good. You can post this listing.</Text>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             title={loading ? "Posting..." : "Create Listing"}
//             onPress={onCreate}
//             disabled={!canPost}
//             color={canPost ? "#1D4ED8" : "#9CA3AF"} // 🔵 Blue only when allowed
//           />

//           {!trustCheckedOnce && (
//             <Text style={styles.helperText}>Run Trust Check to enable posting.</Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "medium" && (
//             <Text style={styles.helperText}>
//               Posting disabled due to Medium Risk. Improve details and run again.
//             </Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "high" && (
//             <Text style={styles.helperText}>Posting disabled due to High Risk.</Text>
//           )}
//           {trustCheckedOnce && !trustIsFresh && (
//             <Text style={styles.helperText}>
//               You changed details after checking. Run Trust Check again.
//             </Text>
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 30,
//     marginTop: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f5f5f5",
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },

//   trustBox: {
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 16,
//     padding: 14,
//     backgroundColor: "#ffffff",
//   },
//   trustHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   trustTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#111827",
//   },
//   trustHint: {
//     marginTop: 6,
//     color: "#6b7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   badge: {
//     borderWidth: 1,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#fff",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "800",
//   },
//   trustSubTitle: {
//     fontWeight: "800",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   reasonText: {
//     color: "#374151",
//     marginBottom: 4,
//     lineHeight: 18,
//   },
//   outdatedText: {
//     marginBottom: 8,
//     color: "#D97706",
//     fontWeight: "700",
//   },
//   blockText: {
//     marginTop: 8,
//     color: "#DC2626",
//     fontWeight: "700",
//   },
//   okText: {
//     marginTop: 8,
//     color: "#16A34A",
//     fontWeight: "700",
//   },
//   helperText: {
//     marginTop: 8,
//     color: "#6b7280",
//     fontSize: 13,
//   },
// });


// import { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
//   Pressable,
//   SafeAreaView,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// // Expo-friendly upload
// import * as FileSystem from "expo-file-system/legacy";
// import { decode } from "base64-arraybuffer";

// type RiskLevel = "low" | "medium" | "high";

// type TrustCheckResult = {
//   level: RiskLevel;
//   score: number;
//   reasons: string[];
// };

// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// // ---------------- TRUST CHECK ENGINE ----------------
// function runTrustCheck(params: {
//   title: string;
//   description: string;
//   priceNum: number;
//   location: string;
//   listingType: string;
// }): TrustCheckResult {
//   const { title, description, priceNum, location, listingType } = params;

//   const text = `${title} ${description} ${location}`.toLowerCase();
//   const reasons: string[] = [];
//   let score = 0;

//   // Suspicious keywords
//   const suspiciousKeywords = [
//     "advance",
//     "token",
//     "urgent",
//     "whatsapp",
//     "viber",
//     "imo",
//     "dm",
//     "inbox",
//     "send money",
//     "esewa",
//     "khalti",
//     "bank",
//     "deposit",
//     "guarantee",
//     "cheap",
//     "offer",
//     "hurry",
//     "limited",
//     "passport",
//     "agent",
//     "urgent xa",
//     "advance paisa",
//   ];

//   const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
//   if (keywordHits.length > 0) {
//     score += Math.min(30, keywordHits.length * 8);
//     reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
//   }

//   // Phone number detection
//   const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
//   if ((description + " " + location).match(phoneRegex)) {
//     score += 15;
//     reasons.push("Contains phone/contact details.");
//   }

//   // Very short description
//   if (description.trim().length > 0 && description.trim().length < 25) {
//     score += 12;
//     reasons.push("Description is too short or vague.");
//   }

//   // Price sanity
//   if (!Number.isFinite(priceNum) || priceNum <= 0) {
//     score += 25;
//     reasons.push("Invalid price.");
//   } else {
//     const lowRoom = 2500;
//     const lowFlat = 6000;
//     const suspiciousLow =
//       listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

//     if (suspiciousLow) {
//       score += 25;
//       reasons.push("Price is unusually low.");
//     }
//   }

//   if (!location.trim()) {
//     score += 8;
//     reasons.push("Location is missing.");
//   }

//   score = clamp(score, 0, 100);

//   let level: RiskLevel = "low";
//   if (score >= 70) level = "high";
//   else if (score >= 35) level = "medium";

//   if (reasons.length === 0) reasons.push("No obvious risk detected.");

//   return { level, score, reasons };
// }

// // ---------------- MAIN COMPONENT ----------------
// export default function CreateListing() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [listingType, setListingType] = useState("room");
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   // ✅ Trust check is REQUIRED (user must click)
//   const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
//   const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);
//   const [trustSnapshot, setTrustSnapshot] = useState<string>(""); // snapshot of inputs when check ran

//   const priceNum = useMemo(() => parseInt(price, 10), [price]);

//   const currentSnapshot = useMemo(() => {
//     return JSON.stringify({
//       title: title.trim(),
//       description: description.trim(),
//       price: price.trim(),
//       location: location.trim(),
//       listingType,
//       imageUri: imageUri ?? null,
//     });
//   }, [title, description, price, location, listingType, imageUri]);

//   const runTrustCheckNow = () => {
//     const result = runTrustCheck({
//       title,
//       description,
//       priceNum,
//       location,
//       listingType,
//     });
//     setTrustResult(result);
//     setTrustCheckedOnce(true);
//     setTrustSnapshot(currentSnapshot);
//     return result;
//   };

//   const trustIsFresh = trustCheckedOnce && trustSnapshot === currentSnapshot;

//   // Camera
//   const pickImageFromCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission needed", "Please allow camera access.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false,
//       quality: 0.6,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // Upload image
//   const uploadImage = async () => {
//     if (!imageUri) return null;

//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: "base64",
//     });

//     const arrayBuffer = decode(base64);
//     const filePath = `room_images/${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(filePath, arrayBuffer, {
//         contentType: "image/jpeg",
//         upsert: false,
//       });

//     if (error) {
//       Alert.alert("Upload failed", error.message);
//       return null;
//     }

//     return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
//   };

//   // Create listing
//   const onCreate = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     if (!sess.session?.user) {
//       Alert.alert("Not logged in");
//       return;
//     }

//     if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
//       Alert.alert("Missing", "Title and valid price required.");
//       return;
//     }

//     if (!trustCheckedOnce || !trustResult) {
//       Alert.alert(
//         "Safety Check Required",
//         "Please tap “Run Trust Check” before posting."
//       );
//       return;
//     }

//     if (!trustIsFresh) {
//       Alert.alert(
//         "Safety Check Outdated",
//         "You changed some details after the Trust Check. Please run the Trust Check again."
//       );
//       return;
//     }

//     if (trustResult.level === "high" || trustResult.level === "medium") {
//       const label = trustResult.level === "high" ? "High risk" : "Medium risk";
//       Alert.alert(
//         "Listing Blocked",
//         `${label} detected.\n\nScore: ${trustResult.score}/100\n\nTop reasons:\n- ${trustResult.reasons
//           .slice(0, 3)
//           .join("\n- ")}\n\nPlease edit and run Trust Check again.`
//       );
//       return;
//     }

//     setLoading(true);

//     const imageUrl = imageUri ? await uploadImage() : null;

//     const { error } = await supabase.from("listings").insert({
//       owner_id: sess.session.user.id,
//       title,
//       description: description || null,
//       price_per_month: priceNum,
//       location: location || null,
//       type: listingType,
//       is_active: true,
//       image_url: imageUrl,
//     });

//     setLoading(false);

//     if (error) {
//       Alert.alert("Error", error.message);
//       return;
//     }

//     // Reset
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setLocation("");
//     setImageUri(null);
//     setTrustResult(null);
//     setTrustCheckedOnce(false);
//     setTrustSnapshot("");

//     Alert.alert("Success", "Listing posted successfully!");
//   };

//   const trustColor =
//     trustResult?.level === "high"
//       ? "#DC2626"
//       : trustResult?.level === "medium"
//       ? "#D97706"
//       : "#16A34A";

//   const trustLabel =
//     trustResult?.level === "high"
//       ? "High Risk"
//       : trustResult?.level === "medium"
//       ? "Medium Risk"
//       : "Low Risk";

//   const canPost =
//     trustCheckedOnce &&
//     trustIsFresh &&
//     !!trustResult &&
//     trustResult.level === "low" &&
//     !loading;

//   return (
//     <SafeAreaView style={styles.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <ScrollView
//           contentContainerStyle={styles.container}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.topGap} />

//           <Text style={styles.pageTitle}>Create Listing</Text>
//           <Text style={styles.pageSubTitle}>
//             Add clear details and run Trust Check before posting.
//           </Text>

//           {/* Inputs */}
//           <TextInput
//             placeholder="e.g. Single room near city center"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.input}
//             placeholderTextColor="#6B7280"
//           />

//           <TextInput
//             placeholder="Describe the room, facilities, rules..."
//             value={description}
//             onChangeText={setDescription}
//             style={[styles.input, styles.textArea]}
//             multiline
//             placeholderTextColor="#6B7280"
//           />

//           <TextInput
//             placeholder="e.g. 8000"
//             keyboardType="number-pad"
//             value={price}
//             onChangeText={setPrice}
//             style={styles.input}
//             placeholderTextColor="#6B7280"
//           />

//           <TextInput
//             placeholder="e.g. Baneshwor, Kathmandu"
//             value={location}
//             onChangeText={setLocation}
//             style={styles.input}
//             placeholderTextColor="#6B7280"
//           />

//           {/* Picker */}
//           <Text style={styles.label}>Listing Type</Text>
//           <View style={styles.pickerWrap}>
//             <Picker
//               selectedValue={listingType}
//               onValueChange={setListingType}
//               style={styles.picker}
//             >
//               <Picker.Item label="Room" value="room" />
//               <Picker.Item label="Flat" value="flat" />
//             </Picker>
//           </View>

//           {/* Take Picture */}
//           <Pressable
//             onPress={pickImageFromCamera}
//             disabled={loading}
//             style={({ pressed }) => [
//               styles.actionBtn,
//               pressed && !loading ? styles.pressed : null,
//               loading ? styles.disabled : null,
//             ]}
//           >
//             <Text style={styles.actionBtnText}>
//               {imageUri ? "Retake Picture" : "Take a Picture"}
//             </Text>
//           </Pressable>

//           {/* Preview */}
//           {imageUri && (
//             <View style={styles.previewCard}>
//               <Text style={styles.previewTitle}>Preview</Text>
//               <Image
//                 source={{ uri: imageUri }}
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//           )}

//           {/* TRUST CHECK PANEL */}
//           <View style={styles.trustBox}>
//             <View style={styles.trustHeader}>
//               <Text style={styles.trustTitle}>Trust & Safety Check</Text>

//               {trustCheckedOnce && trustResult && (
//                 <View style={[styles.badge, { borderColor: trustColor }]}>
//                   <Text style={[styles.badgeText, { color: trustColor }]}>
//                     {trustLabel} • {trustResult.score}/100
//                   </Text>
//                 </View>
//               )}
//             </View>

//             <Text style={styles.trustHint}>
//               Required before posting. If you change anything (including photo),
//               you must run it again.
//             </Text>

//             <Pressable
//               onPress={runTrustCheckNow}
//               disabled={loading}
//               style={({ pressed }) => [
//                 styles.secondaryBtn,
//                 pressed && !loading ? styles.pressed : null,
//                 loading ? styles.disabled : null,
//               ]}
//             >
//               <Text style={styles.secondaryBtnText}>Run Trust Check</Text>
//             </Pressable>

//             {trustCheckedOnce && trustResult && (
//               <View style={{ marginTop: 12 }}>
//                 {!trustIsFresh && (
//                   <Text style={styles.outdatedText}>
//                     ⚠️ Trust Check is outdated. Run it again.
//                   </Text>
//                 )}

//                 <Text style={styles.trustSubTitle}>Reasons</Text>
//                 {trustResult.reasons.slice(0, 5).map((r, idx) => (
//                   <Text key={idx} style={styles.reasonText}>
//                     • {r}
//                   </Text>
//                 ))}

//                 {(trustResult.level === "high" ||
//                   trustResult.level === "medium") && (
//                   <Text style={styles.blockText}>
//                     ⛔ {trustResult.level === "high" ? "High" : "Medium"} risk
//                     listings are blocked. Please edit and re-run the check.
//                   </Text>
//                 )}

//                 {trustResult.level === "low" && (
//                   <Text style={styles.okText}>
//                     ✅ Looks good. You can post this listing.
//                   </Text>
//                 )}
//               </View>
//             )}
//           </View>

//           {/* Create */}
//           <Pressable
//             onPress={onCreate}
//             disabled={!canPost}
//             style={({ pressed }) => [
//               styles.primaryBtn,
//               !canPost ? styles.primaryDisabled : null,
//               pressed && canPost ? styles.pressed : null,
//             ]}
//           >
//             <Text style={styles.primaryBtnText}>
//               {loading ? "Posting..." : "Create Listing"}
//             </Text>
//           </Pressable>

//           {/* Helper text */}
//           {!trustCheckedOnce && (
//             <Text style={styles.helperText}>
//               Run Trust Check to enable posting.
//             </Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "medium" && (
//             <Text style={styles.helperText}>
//               Posting disabled due to Medium Risk. Improve details and run again.
//             </Text>
//           )}
//           {trustCheckedOnce && trustResult?.level === "high" && (
//             <Text style={styles.helperText}>
//               Posting disabled due to High Risk.
//             </Text>
//           )}
//           {trustCheckedOnce && !trustIsFresh && (
//             <Text style={styles.helperText}>
//               You changed details after checking. Run Trust Check again.
//             </Text>
//           )}

//           <View style={{ height: 24 }} />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#e5f3fd",
//   },

//   container: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//     backgroundColor: "#e5f3fd",
//   },

//   topGap: {
//     height: Platform.OS === "android" ? 18 : 10,
//   },

//   pageTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: "#111827",
//     marginBottom: 4,
//   },

//   pageSubTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#6B7280",
//     marginBottom: 14,
//     lineHeight: 18,
//   },

//   input: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     marginBottom: 12,
//     color: "#111827",
//   },

//   textArea: {
//     height: 110,
//     paddingTop: 14,
//     paddingBottom: 14,
//     textAlignVertical: "top",
//   },

//   label: {
//     fontSize: 13,
//     fontWeight: "900",
//     color: "#111827",
//     marginBottom: 6,
//     marginTop: 2,
//   },

//   pickerWrap: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 14,
//     backgroundColor: "#fff",
//     overflow: "hidden",
//     marginBottom: 12,
//     height: 46,
//     justifyContent: "center",
//   },

//   picker: {
//     height: 46,
//   },

//   actionBtn: {
//     backgroundColor: "#111827",
//     borderRadius: 14,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 6,
//   },
//   actionBtnText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 14,
//   },

//   previewCard: {
//     marginTop: 12,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 14,
//     padding: 12,
//   },
//   previewTitle: {
//     fontWeight: "900",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   previewImage: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     backgroundColor: "#eee",
//   },

//   trustBox: {
//     marginTop: 14,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 16,
//     padding: 14,
//     backgroundColor: "#ffffff",
//   },
//   trustHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },
//   trustTitle: {
//     fontSize: 16,
//     fontWeight: "900",
//     color: "#111827",
//   },
//   trustHint: {
//     marginTop: 6,
//     color: "#6B7280",
//     fontSize: 13,
//     lineHeight: 18,
//   },

//   badge: {
//     borderWidth: 1,
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#fff",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "900",
//   },

//   secondaryBtn: {
//     marginTop: 10,
//     backgroundColor: "#EFF6FF",
//     borderWidth: 1,
//     borderColor: "#BFDBFE",
//     borderRadius: 14,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   secondaryBtnText: {
//     color: "#1D4ED8",
//     fontWeight: "900",
//     fontSize: 14,
//   },

//   trustSubTitle: {
//     fontWeight: "900",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   reasonText: {
//     color: "#374151",
//     marginBottom: 4,
//     lineHeight: 18,
//     fontWeight: "600",
//   },
//   outdatedText: {
//     marginBottom: 8,
//     color: "#D97706",
//     fontWeight: "900",
//   },
//   blockText: {
//     marginTop: 8,
//     color: "#DC2626",
//     fontWeight: "900",
//   },
//   okText: {
//     marginTop: 8,
//     color: "#16A34A",
//     fontWeight: "900",
//   },

//   primaryBtn: {
//     marginTop: 14,
//     backgroundColor: "#1D4ED8",
//     borderRadius: 14,
//     paddingVertical: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   primaryDisabled: {
//     backgroundColor: "#9CA3AF",
//   },
//   primaryBtnText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   helperText: {
//     marginTop: 10,
//     color: "#6B7280",
//     fontSize: 13,
//     fontWeight: "700",
//   },

//   pressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.99 }],
//   },

//   disabled: {
//     opacity: 0.6,
//   },
// });


// Mathiko majjale kam garcha tara tala ko ma lattitude and longitude cha 

import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { supabase } from "../../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

// Expo-friendly upload
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";

type RiskLevel = "low" | "medium" | "high";

type TrustCheckResult = {
  level: RiskLevel;
  score: number;
  reasons: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// ---------------- TRUST CHECK ENGINE ----------------
function runTrustCheck(params: {
  title: string;
  description: string;
  priceNum: number;
  location: string;
  listingType: string;
}): TrustCheckResult {
  const { title, description, priceNum, location, listingType } = params;

  const text = `${title} ${description} ${location}`.toLowerCase();
  const reasons: string[] = [];
  let score = 0;

  const suspiciousKeywords = [
    "advance",
    "token",
    "urgent",
    "whatsapp",
    "viber",
    "imo",
    "dm",
    "inbox",
    "send money",
    "esewa",
    "khalti",
    "bank",
    "deposit",
    "guarantee",
    "cheap",
    "offer",
    "hurry",
    "limited",
    "passport",
    "agent",
    "urgent xa",
    "advance paisa",
  ];

  const keywordHits = suspiciousKeywords.filter((k) => text.includes(k));
  if (keywordHits.length > 0) {
    score += Math.min(30, keywordHits.length * 8);
    reasons.push(`Suspicious words: ${keywordHits.slice(0, 4).join(", ")}`);
  }

  const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\d[\s-]?){8,12}/g;
  if ((description + " " + location).match(phoneRegex)) {
    score += 15;
    reasons.push("Contains phone/contact details.");
  }

  if (description.trim().length > 0 && description.trim().length < 25) {
    score += 12;
    reasons.push("Description is too short or vague.");
  }

  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    score += 25;
    reasons.push("Invalid price.");
  } else {
    const lowRoom = 2500;
    const lowFlat = 6000;
    const suspiciousLow =
      listingType === "flat" ? priceNum < lowFlat : priceNum < lowRoom;

    if (suspiciousLow) {
      score += 25;
      reasons.push("Price is unusually low.");
    }
  }

  if (!location.trim()) {
    score += 8;
    reasons.push("Location is missing.");
  }

  score = clamp(score, 0, 100);

  let level: RiskLevel = "low";
  if (score >= 70) level = "high";
  else if (score >= 35) level = "medium";

  if (reasons.length === 0) reasons.push("No obvious risk detected.");

  return { level, score, reasons };
}

// ---------------- MAIN COMPONENT ----------------
export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  // ✅ Latitude/Longitude inputs
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [listingType, setListingType] = useState("room");
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // ✅ Trust check is REQUIRED
  const [trustResult, setTrustResult] = useState<TrustCheckResult | null>(null);
  const [trustCheckedOnce, setTrustCheckedOnce] = useState(false);
  const [trustSnapshot, setTrustSnapshot] = useState<string>("");

  const priceNum = useMemo(() => parseInt(price, 10), [price]);
  const latNum = useMemo(() => Number(latitude), [latitude]);
  const lngNum = useMemo(() => Number(longitude), [longitude]);

  const currentSnapshot = useMemo(() => {
    return JSON.stringify({
      title: title.trim(),
      description: description.trim(),
      price: price.trim(),
      location: location.trim(),
      listingType,
      imageUri: imageUri ?? null,
      latitude: latitude.trim(),
      longitude: longitude.trim(),
    });
  }, [title, description, price, location, listingType, imageUri, latitude, longitude]);

  const runTrustCheckNow = () => {
    const result = runTrustCheck({
      title,
      description,
      priceNum,
      location,
      listingType,
    });
    setTrustResult(result);
    setTrustCheckedOnce(true);
    setTrustSnapshot(currentSnapshot);
    return result;
  };

  const trustIsFresh = trustCheckedOnce && trustSnapshot === currentSnapshot;

  const isLatLngProvided = latitude.trim() !== "" || longitude.trim() !== "";

  const clearLatLng = () => {
    setLatitude("");
    setLongitude("");
  };

  const validateLatLng = () => {
    if (!isLatLngProvided) return true;

    if (latitude.trim() === "" || longitude.trim() === "") {
      Alert.alert("Pinpoint missing", "Please enter both latitude and longitude.");
      return false;
    }

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
      Alert.alert("Invalid coordinates", "Latitude/Longitude must be valid numbers.");
      return false;
    }

    if (latNum < -90 || latNum > 90) {
      Alert.alert("Invalid latitude", "Latitude must be between -90 and 90.");
      return false;
    }

    if (lngNum < -180 || lngNum > 180) {
      Alert.alert("Invalid longitude", "Longitude must be between -180 and 180.");
      return false;
    }

    return true;
  };

  // Camera
  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.length) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Upload image
  const uploadImage = async () => {
    if (!imageUri) return null;

    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: "base64",
    });

    const arrayBuffer = decode(base64);
    const filePath = `room_images/${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      Alert.alert("Upload failed", error.message);
      return null;
    }

    return supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl;
  };

  // Create listing
  const onCreate = async () => {
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session?.user) {
      Alert.alert("Not logged in");
      return;
    }

    if (!title || !Number.isFinite(priceNum) || priceNum <= 0) {
      Alert.alert("Missing", "Title and valid price required.");
      return;
    }

    // ✅ validate coords
    if (!validateLatLng()) return;

    if (!trustCheckedOnce || !trustResult) {
      Alert.alert("Safety Check Required", "Please tap “Run Trust Check” before posting.");
      return;
    }

    if (!trustIsFresh) {
      Alert.alert(
        "Safety Check Outdated",
        "You changed some details after the Trust Check. Please run the Trust Check again."
      );
      return;
    }

    if (trustResult.level === "high" || trustResult.level === "medium") {
      const label = trustResult.level === "high" ? "High risk" : "Medium risk";
      Alert.alert(
        "Listing Blocked",
        `${label} detected.\n\nScore: ${trustResult.score}/100\n\nTop reasons:\n- ${trustResult.reasons
          .slice(0, 3)
          .join("\n- ")}\n\nPlease edit and run Trust Check again.`
      );
      return;
    }

    setLoading(true);

    const imageUrl = imageUri ? await uploadImage() : null;

    const payload: any = {
      owner_id: sess.session.user.id,
      title,
      description: description || null,
      price_per_month: priceNum,
      location: location || null,
      type: listingType,
      is_active: true,
      image_url: imageUrl,
    };

    // ✅ save coords only if both provided
    if (latitude.trim() && longitude.trim()) {
      payload.lat = Number(latitude);
      payload.lng = Number(longitude);
    }

    const { error } = await supabase.from("listings").insert(payload);

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    // Reset
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setImageUri(null);
    setLatitude("");
    setLongitude("");
    setTrustResult(null);
    setTrustCheckedOnce(false);
    setTrustSnapshot("");

    Alert.alert("Success", "Listing posted successfully!");
  };

  const trustColor =
    trustResult?.level === "high"
      ? "#DC2626"
      : trustResult?.level === "medium"
      ? "#D97706"
      : "#16A34A";

  const trustLabel =
    trustResult?.level === "high"
      ? "High Risk"
      : trustResult?.level === "medium"
      ? "Medium Risk"
      : "Low Risk";

  const canPost =
    trustCheckedOnce &&
    trustIsFresh &&
    !!trustResult &&
    trustResult.level === "low" &&
    !loading;

  // ✅ FIX: add safe top padding (Android status bar)
  const safeTop = Platform.OS === "android" ? (StatusBar.currentHeight ?? 18) : 0;

  return (
    <SafeAreaView style={[styles.safe, { paddingTop: safeTop }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* extra breathing room */}
          <View style={{ height: 10 }} />

          <Text style={styles.pageTitle}>Create Listing</Text>
          <Text style={styles.pageSubTitle}>
            Add clear details and run Trust Check before posting.
          </Text>

          {/* Inputs */}
          <TextInput
            placeholder="e.g. Single room near city center"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#6B7280"
          />

          <TextInput
            placeholder="Describe the room, facilities, rules..."
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
            placeholderTextColor="#6B7280"
          />

          <TextInput
            placeholder="e.g. 8000"
            keyboardType="number-pad"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            placeholderTextColor="#6B7280"
          />

          <TextInput
            placeholder="e.g. Baneshwor, Kathmandu"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#6B7280"
          />

          {/* ✅ NEW: Pinpoint Coordinates */}
          <Text style={styles.label}>Pinpoint Location (Optional)</Text>

          <View style={styles.latLngRow}>
            <TextInput
              placeholder="Latitude (e.g. 27.7172)"
              value={latitude}
              onChangeText={setLatitude}
              style={[styles.input, styles.latLngInput]}
              placeholderTextColor="#6B7280"
              keyboardType="decimal-pad"
            />
            <TextInput
              placeholder="Longitude (e.g. 85.3240)"
              value={longitude}
              onChangeText={setLongitude}
              style={[styles.input, styles.latLngInput]}
              placeholderTextColor="#6B7280"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.latLngBtnRow}>
            <Pressable
              onPress={clearLatLng}
              disabled={loading || (!latitude && !longitude)}
              style={({ pressed }) => [
                styles.smallBtn,
                styles.smallBtnDark,
                pressed && !loading ? styles.pressed : null,
                loading ? styles.disabled : null,
                !latitude && !longitude ? styles.disabled : null,
              ]}
            >
              <Text style={styles.smallBtnText}>Clear</Text>
            </Pressable>

            <Text style={styles.latLngHint}>
              Tip: Copy lat/lng from Google Maps and paste here.
            </Text>
          </View>

          {/* Picker */}
          <Text style={styles.label}>Listing Type</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={listingType}
              onValueChange={setListingType}
              style={styles.picker}
            >
              <Picker.Item label="Room" value="room" />
              <Picker.Item label="Flat" value="flat" />
            </Picker>
          </View>

          {/* Take Picture */}
          <Pressable
            onPress={pickImageFromCamera}
            disabled={loading}
            style={({ pressed }) => [
              styles.actionBtn,
              pressed && !loading ? styles.pressed : null,
              loading ? styles.disabled : null,
            ]}
          >
            <Text style={styles.actionBtnText}>
              {imageUri ? "Retake Picture" : "Take a Picture"}
            </Text>
          </Pressable>

          {/* Preview */}
          {imageUri && (
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>Preview</Text>
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
          )}

          {/* TRUST CHECK PANEL */}
          <View style={styles.trustBox}>
            <View style={styles.trustHeader}>
              <Text style={styles.trustTitle}>Trust & Safety Check</Text>

              {trustCheckedOnce && trustResult && (
                <View style={[styles.badge, { borderColor: trustColor }]}>
                  <Text style={[styles.badgeText, { color: trustColor }]}>
                    {trustLabel} • {trustResult.score}/100
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.trustHint}>
              Required before posting. If you change anything (including photo),
              you must run it again.
            </Text>

            <Pressable
              onPress={runTrustCheckNow}
              disabled={loading}
              style={({ pressed }) => [
                styles.secondaryBtn,
                pressed && !loading ? styles.pressed : null,
                loading ? styles.disabled : null,
              ]}
            >
              <Text style={styles.secondaryBtnText}>Run Trust Check</Text>
            </Pressable>

            {trustCheckedOnce && trustResult && (
              <View style={{ marginTop: 12 }}>
                {!trustIsFresh && (
                  <Text style={styles.outdatedText}>
                    ⚠️ Trust Check is outdated. Run it again.
                  </Text>
                )}

                <Text style={styles.trustSubTitle}>Reasons</Text>
                {trustResult.reasons.slice(0, 5).map((r, idx) => (
                  <Text key={idx} style={styles.reasonText}>
                    • {r}
                  </Text>
                ))}

                {(trustResult.level === "high" || trustResult.level === "medium") && (
                  <Text style={styles.blockText}>
                    ⛔ {trustResult.level === "high" ? "High" : "Medium"} risk listings are blocked.
                    Please edit and re-run the check.
                  </Text>
                )}

                {trustResult.level === "low" && (
                  <Text style={styles.okText}>
                    ✅ Looks good. You can post this listing.
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Create */}
          <Pressable
            onPress={onCreate}
            disabled={!canPost}
            style={({ pressed }) => [
              styles.primaryBtn,
              !canPost ? styles.primaryDisabled : null,
              pressed && canPost ? styles.pressed : null,
            ]}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Posting..." : "Create Listing"}
            </Text>
          </Pressable>

          {!trustCheckedOnce && (
            <Text style={styles.helperText}>Run Trust Check to enable posting.</Text>
          )}
          {trustCheckedOnce && trustResult?.level === "medium" && (
            <Text style={styles.helperText}>
              Posting disabled due to Medium Risk. Improve details and run again.
            </Text>
          )}
          {trustCheckedOnce && trustResult?.level === "high" && (
            <Text style={styles.helperText}>Posting disabled due to High Risk.</Text>
          )}
          {trustCheckedOnce && !trustIsFresh && (
            <Text style={styles.helperText}>
              You changed details after checking. Run Trust Check again.
            </Text>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e5f3fd",
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#e5f3fd",
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
  },

  pageSubTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 14,
    lineHeight: 18,
  },

  input: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    color: "#111827",
  },

  textArea: {
    height: 110,
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: "top",
  },

  label: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
    marginTop: 2,
  },

  latLngRow: {
    flexDirection: "row",
    gap: 10,
  },
  latLngInput: {
    flex: 1,
  },
  latLngBtnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: -4,
    marginBottom: 10,
  },
  latLngHint: {
    flex: 1,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "700",
  },
  smallBtn: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBtnDark: {
    backgroundColor: "#111827",
  },
  smallBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
  },

  pickerWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 12,
    height: 46,
    justifyContent: "center",
  },

  picker: {
    height: 46,
  },

  actionBtn: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },

  previewCard: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
  },
  previewTitle: {
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  trustBox: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#ffffff",
  },
  trustHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  trustTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
  trustHint: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
  },

  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "900",
  },

  secondaryBtn: {
    marginTop: 10,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontWeight: "900",
    fontSize: 14,
  },

  trustSubTitle: {
    fontWeight: "900",
    marginBottom: 6,
    color: "#111827",
  },
  reasonText: {
    color: "#374151",
    marginBottom: 4,
    lineHeight: 18,
    fontWeight: "600",
  },
  outdatedText: {
    marginBottom: 8,
    color: "#D97706",
    fontWeight: "900",
  },
  blockText: {
    marginTop: 8,
    color: "#DC2626",
    fontWeight: "900",
  },
  okText: {
    marginTop: 8,
    color: "#16A34A",
    fontWeight: "900",
  },

  primaryBtn: {
    marginTop: 14,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryDisabled: {
    backgroundColor: "#9CA3AF",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },

  helperText: {
    marginTop: 10,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  disabled: {
    opacity: 0.6,
  },
});

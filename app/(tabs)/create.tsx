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



import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
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
      is_active: true,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Post a Room</Text>
        <Text style={styles.subHeading}>
          Fill in the details below to list your room
        </Text>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="e.g. Single room near city center"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Describe the room, facilities, rules..."
              value={description}
              onChangeText={setDescription}
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Price per month (Rs.)</Text>
            <TextInput
              placeholder="e.g. 8000"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              placeholder="e.g. Baneshwor, Kathmandu"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              title={loading ? "Posting..." : "Create Listing"}
              onPress={onCreate}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
});

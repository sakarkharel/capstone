import { useEffect, useState } from "react";
import { View, Text, Button, Alert, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

type Listing = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price_per_month: number;
  location: string | null;
};

export default function ListingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Listing | null>(null);

  // super simple booking dates
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-15");

  const load = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id,owner_id,title,description,price_per_month,location")
      .eq("id", id)
      .single();

    if (!error) setItem(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const book = async () => {
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess.session?.user.id;
    if (!userId) return Alert.alert("Not logged in");

    if (!item) return;

    if (item.owner_id === userId) {
      return Alert.alert("Not allowed", "You cannot book your own listing.");
    }

    const { error } = await supabase.from("bookings").insert({
      listing_id: item.id,
      renter_id: userId,
      start_date: startDate,
      end_date: endDate,
      status: "pending",
    });

    if (error) return Alert.alert("Booking error", error.message);

    Alert.alert("Success", "Booking requested!");
    router.back();
  };

  if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
      <Text>Rs. {item.price_per_month} / month</Text>
      <Text>{item.location ?? "No location"}</Text>
      <Text>{item.description ?? "No description"}</Text>

      <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
      <TextInput
        placeholder="Start date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="End date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <Button title="Request Booking" onPress={book} />
    </View>
  );
}

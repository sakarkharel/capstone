import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { supabase } from "../../lib/supabase";

type BookingRow = {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  listing_id: string;
};

export default function Bookings() {
  const [items, setItems] = useState<BookingRow[]>([]);

  const load = async () => {
    const { data: sess } = await supabase.auth.getSession();
    const userId = sess.session?.user.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("bookings")
      .select("id,start_date,end_date,status,listing_id")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}>
            <Text style={{ fontWeight: "700" }}>Booking: {item.status}</Text>
            <Text>{item.start_date} → {item.end_date}</Text>
            <Text>Listing ID: {item.listing_id}</Text>
          </View>
        )}
      />
    </View>
  );
}

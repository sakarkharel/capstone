// import { useEffect, useState } from "react";
// import { View, Text, FlatList } from "react-native";
// import { supabase } from "../../lib/supabase";

// type BookingRow = {
//   id: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   listing_id: string;
// };

// export default function Bookings() {
//   const [items, setItems] = useState<BookingRow[]>([]);

//   const load = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return;

//     const { data, error } = await supabase
//       .from("bookings")
//       .select("id,start_date,end_date,status,listing_id")
//       .order("created_at", { ascending: false });

//     if (!error && data) setItems(data);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <View style={{ padding: 12 }}>
//       <FlatList
//         data={items}
//         keyExtractor={(x) => x.id}
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item }) => (
//           <View style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}>
//             <Text style={{ fontWeight: "700" }}>Booking: {item.status}</Text>
//             <Text>{item.start_date} → {item.end_date}</Text>
//             <Text>Listing ID: {item.listing_id}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   Alert,
//   RefreshControl,
//   StyleSheet,
// } from "react-native";
// import { supabase } from "../../lib/supabase";

// type BookingRow = {
//   id: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   listing_id: string;
//   created_at?: string;

//   // Joined listing (so we know who owns it)
//   listings?: {
//     id: string;
//     title?: string | null;
//     owner_id: string | null;
//   } | null;
// };

// export default function Bookings() {
//   const [items, setItems] = useState<BookingRow[]>([]);
//   const [loading, setLoading] = useState(false);

//   const load = async () => {
//     setLoading(true);

//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     // ✅ Load bookings + join listings to check ownership
//     const { data, error } = await supabase
//       .from("bookings")
//       .select(
//         `
//         id,
//         start_date,
//         end_date,
//         status,
//         listing_id,
//         created_at,
//         listings:listing_id (
//           id,
//           title,
//           owner_id
//         )
//       `
//       )
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log(error);
//       Alert.alert("Error", error.message);
//       setLoading(false);
//       return;
//     }

//     // ✅ Only show bookings for listings YOU own
//     const onlyMine = (data || []).filter(
//       (b) => b.listings?.owner_id === userId
//     );

//     setItems(onlyMine);
//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const updateStatus = async (bookingId: string, newStatus: "approved" | "rejected") => {
//     const { error } = await supabase
//       .from("bookings")
//       .update({ status: newStatus })
//       .eq("id", bookingId);

//     if (error) {
//       Alert.alert("Update failed", error.message);
//       return;
//     }

//     // Optimistic update (fast UI)
//     setItems((prev) =>
//       prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
//     );
//   };

//   const confirmAction = (bookingId: string, action: "approved" | "rejected") => {
//     Alert.alert(
//       action === "approved" ? "Approve booking?" : "Reject booking?",
//       "This will update the booking status.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: action === "approved" ? "Approve" : "Reject",
//           style: action === "approved" ? "default" : "destructive",
//           onPress: () => updateStatus(bookingId, action),
//         },
//       ]
//     );
//   };

//   return (
//     <View style={{ padding: 12, flex: 1 }}>
//       <FlatList
//         data={items}
//         keyExtractor={(x) => x.id}
//         refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         ListEmptyComponent={
//           <Text style={{ opacity: 0.7, textAlign: "center", marginTop: 30 }}>
//             No booking requests yet.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const isPending = item.status === "pending";

//           return (
//             <View style={styles.card}>
//               <Text style={styles.title}>
//                 {item.listings?.title ? item.listings.title : "Your Listing"}
//               </Text>

//               <Text style={styles.status}>
//                 Status: <Text style={{ fontWeight: "800" }}>{item.status}</Text>
//               </Text>

//               <Text style={styles.dates}>
//                 {item.start_date} → {item.end_date}
//               </Text>

//               <Text style={styles.small}>Listing ID: {item.listing_id}</Text>

//               {isPending && (
//                 <View style={styles.row}>
//                   <Pressable
//                     style={[styles.btn, styles.approve]}
//                     onPress={() => confirmAction(item.id, "approved")}
//                   >
//                     <Text style={styles.btnText}>Approve</Text>
//                   </Pressable>

//                   <Pressable
//                     style={[styles.btn, styles.reject]}
//                     onPress={() => confirmAction(item.id, "rejected")}
//                   >
//                     <Text style={styles.btnText}>Reject</Text>
//                   </Pressable>
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     padding: 12,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "800",
//     marginBottom: 6,
//   },
//   status: {
//     marginBottom: 6,
//   },
//   dates: {
//     marginBottom: 6,
//   },
//   small: {
//     opacity: 0.7,
//     fontSize: 12,
//   },
//   row: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 12,
//   },
//   btn: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   approve: {
//     backgroundColor: "#16a34a",
//   },
//   reject: {
//     backgroundColor: "#dc2626",
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "800",
//   },
// });


// import { useEffect, useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   Alert,
//   RefreshControl,
//   StyleSheet,
// } from "react-native";
// import { supabase } from "../../lib/supabase";

// type BookingRow = {
//   id: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   listing_id: string;
//   renter_id: string; // ✅ guest who booked
//   created_at?: string;

//   listings?: {
//     id: string;
//     title?: string | null;
//     owner_id: string | null; // ✅ host who posted
//     location?: string | null;
//     price_per_month?: number | null;
//   } | null;
// };

// type Tab = "requests" | "my_bookings";

// export default function Bookings() {
//   const [all, setAll] = useState<BookingRow[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [tab, setTab] = useState<Tab>("requests");
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUserId(data.session?.user.id ?? null);
//     });
//   }, []);

//   const load = async () => {
//     setLoading(true);

//     const { data: sess } = await supabase.auth.getSession();
//     const uid = sess.session?.user.id;
//     if (!uid) {
//       setLoading(false);
//       return;
//     }
//     setUserId(uid);

//     const { data, error } = await supabase
//       .from("bookings")
//       .select(
//         `
//         id,
//         start_date,
//         end_date,
//         status,
//         listing_id,
//         renter_id,
//         created_at,
//         listings:listing_id (
//           id,
//           title,
//           owner_id,
//           location,
//           price_per_month
//         )
//       `
//       )
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log(error);
//       Alert.alert("Error", error.message);
//       setLoading(false);
//       return;
//     }

//     setAll((data as any) || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const requestsToMe = useMemo(() => {
//     if (!userId) return [];
//     return all.filter((b) => b.listings?.owner_id === userId);
//   }, [all, userId]);

//   const myBookings = useMemo(() => {
//     if (!userId) return [];
//     return all.filter((b) => b.renter_id === userId);
//   }, [all, userId]);

//   const updateStatus = async (
//     bookingId: string,
//     newStatus: "approved" | "rejected"
//   ) => {
//     const { error } = await supabase
//       .from("bookings")
//       .update({ status: newStatus })
//       .eq("id", bookingId);

//     if (error) {
//       Alert.alert("Update failed", error.message);
//       return;
//     }

//     setAll((prev) =>
//       prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
//     );
//   };

//   const confirmAction = (bookingId: string, action: "approved" | "rejected") => {
//     Alert.alert(
//       action === "approved" ? "Approve booking?" : "Reject booking?",
//       "This will update the booking status.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: action === "approved" ? "Approve" : "Reject",
//           style: action === "approved" ? "default" : "destructive",
//           onPress: () => updateStatus(bookingId, action),
//         },
//       ]
//     );
//   };

//   const renderCard = (item: BookingRow, mode: Tab) => {
//     const isPending = item.status === "pending";
//     const title = item.listings?.title || "Listing";
//     const location = item.listings?.location;
//     const price = item.listings?.price_per_month;

//     return (
//       <View style={styles.card}>
//         <View style={styles.topRow}>
//           <Text style={styles.title} numberOfLines={1}>
//             {title}
//           </Text>
//           <Text style={styles.badge}>{item.status}</Text>
//         </View>

//         <Text style={styles.dates}>
//           {item.start_date} → {item.end_date}
//         </Text>

//         {(location || price) && (
//           <Text style={styles.meta}>
//             {location ? location : ""}
//             {location && price ? " • " : ""}
//             {price ? `Rs. ${price}/mo` : ""}
//           </Text>
//         )}

//         {mode === "requests" && isPending && (
//           <View style={styles.row}>
//             <Pressable
//               style={[styles.btn, styles.approve]}
//               onPress={() => confirmAction(item.id, "approved")}
//             >
//               <Text style={styles.btnText}>Approve</Text>
//             </Pressable>

//             <Pressable
//               style={[styles.btn, styles.reject]}
//               onPress={() => confirmAction(item.id, "rejected")}
//             >
//               <Text style={styles.btnText}>Reject</Text>
//             </Pressable>
//           </View>
//         )}

//         {mode === "my_bookings" && (
//           <Text style={styles.hint}>
//             {item.status === "approved"
//               ? "✅ Approved by host"
//               : item.status === "rejected"
//               ? "❌ Rejected by host"
//               : "⏳ Waiting for host approval"}
//           </Text>
//         )}
//       </View>
//     );
//   };

//   const activeData = tab === "requests" ? requestsToMe : myBookings;

//   return (
//     <View style={{ padding: 12, flex: 1 }}>
//       {/* Toggle */}
//       <View style={styles.toggleWrap}>
//         <Pressable
//           onPress={() => setTab("requests")}
//           style={[styles.toggleBtn, tab === "requests" && styles.toggleActive]}
//         >
//           <Text
//             style={[
//               styles.toggleText,
//               tab === "requests" && styles.toggleTextActive,
//             ]}
//           >
//             Requests to me ({requestsToMe.length})
//           </Text>
//         </Pressable>

//         <Pressable
//           onPress={() => setTab("my_bookings")}
//           style={[
//             styles.toggleBtn,
//             tab === "my_bookings" && styles.toggleActive,
//           ]}
//         >
//           <Text
//             style={[
//               styles.toggleText,
//               tab === "my_bookings" && styles.toggleTextActive,
//             ]}
//           >
//             My bookings ({myBookings.length})
//           </Text>
//         </Pressable>
//       </View>

//       <FlatList
//         data={activeData}
//         keyExtractor={(x) => x.id}
//         refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         ListEmptyComponent={
//           <Text style={{ opacity: 0.7, textAlign: "center", marginTop: 30 }}>
//             {tab === "requests"
//               ? "No requests for your listings yet."
//               : "You haven't booked anything yet."}
//           </Text>
//         }
//         renderItem={({ item }) => renderCard(item, tab)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   toggleWrap: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 12,
//   },
//   toggleBtn: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     paddingVertical: 10,
//     borderRadius: 12,
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   toggleActive: {
//     borderColor: "#111",
//   },
//   toggleText: {
//     fontWeight: "700",
//     opacity: 0.75,
//     fontSize: 13,
//   },
//   toggleTextActive: {
//     opacity: 1,
//   },

//   card: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     padding: 12,
//     backgroundColor: "#fff",
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "800",
//     flex: 1,
//   },
//   badge: {
//     fontWeight: "800",
//     textTransform: "capitalize",
//     opacity: 0.8,
//   },
//   dates: {
//     marginTop: 6,
//     fontWeight: "600",
//   },
//   meta: {
//     marginTop: 6,
//     opacity: 0.75,
//   },
//   hint: {
//     marginTop: 10,
//     opacity: 0.8,
//     fontWeight: "600",
//   },
//   row: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 12,
//   },
//   btn: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   approve: { backgroundColor: "#16a34a" },
//   reject: { backgroundColor: "#dc2626" },
//   btnText: { color: "#fff", fontWeight: "800" },
// });


import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";

type BookingRow = {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  listing_id: string;
  renter_id: string;
  created_at?: string;

  listings?: {
    id: string;
    title?: string | null;
    owner_id: string | null;
    location?: string | null;
    price_per_month?: number | null;
  } | null;
};

type Tab = "requests" | "my_bookings";

export default function Bookings() {
  const [all, setAll] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("requests");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
    });
  }, []);

  const load = async () => {
    setLoading(true);

    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    setUserId(uid);

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        id,
        start_date,
        end_date,
        status,
        listing_id,
        renter_id,
        created_at,
        listings:listing_id (
          id,
          title,
          owner_id,
          location,
          price_per_month
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    setAll((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const requestsToMe = useMemo(() => {
    if (!userId) return [];
    return all.filter((b) => b.listings?.owner_id === userId);
  }, [all, userId]);

  const myBookings = useMemo(() => {
    if (!userId) return [];
    return all.filter((b) => b.renter_id === userId);
  }, [all, userId]);

  const updateStatus = async (
    bookingId: string,
    newStatus: "approved" | "rejected"
  ) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", bookingId);

    if (error) {
      Alert.alert("Update failed", error.message);
      return;
    }

    setAll((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const confirmAction = (bookingId: string, action: "approved" | "rejected") => {
    Alert.alert(
      action === "approved" ? "Approve booking?" : "Reject booking?",
      "This will update the booking status.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: action === "approved" ? "Approve" : "Reject",
          style: action === "approved" ? "default" : "destructive",
          onPress: () => updateStatus(bookingId, action),
        },
      ]
    );
  };

  const renderCard = (item: BookingRow, mode: Tab) => {
    const isPending = item.status === "pending";
    const title = item.listings?.title || "Listing";
    const location = item.listings?.location;
    const price = item.listings?.price_per_month;

    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View
            style={[
              styles.statusPill,
              item.status === "approved" && styles.statusApproved,
              item.status === "rejected" && styles.statusRejected,
              item.status === "pending" && styles.statusPending,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.dates}>
          {item.start_date} → {item.end_date}
        </Text>

        {(location || price) && (
          <Text style={styles.meta}>
            {location ? location : ""}
            {location && price ? " • " : ""}
            {price ? `Rs. ${price}/mo` : ""}
          </Text>
        )}

        {mode === "requests" && isPending && (
          <View style={styles.actionRow}>
            <Pressable
              style={[styles.btn, styles.approve]}
              onPress={() => confirmAction(item.id, "approved")}
            >
              <Text style={styles.btnText}>Approve</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.reject]}
              onPress={() => confirmAction(item.id, "rejected")}
            >
              <Text style={styles.btnText}>Reject</Text>
            </Pressable>
          </View>
        )}

        {mode === "my_bookings" && (
          <Text style={styles.hint}>
            {item.status === "approved"
              ? "✅ Approved by host"
              : item.status === "rejected"
              ? "❌ Rejected by host"
              : "⏳ Waiting for host approval"}
          </Text>
        )}
      </View>
    );
  };

  const activeData = tab === "requests" ? requestsToMe : myBookings;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top spacing (like your index.tsx vibe) */}
        <View style={styles.topGap} />

        {/* Toggle */}
        <View style={styles.toggleWrap}>
          <Pressable
            onPress={() => setTab("requests")}
            style={[styles.toggleBtn, tab === "requests" && styles.toggleActive]}
          >
            <Text
              style={[
                styles.toggleText,
                tab === "requests" && styles.toggleTextActive,
              ]}
              numberOfLines={1}
            >
              Requests ({requestsToMe.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setTab("my_bookings")}
            style={[
              styles.toggleBtn,
              tab === "my_bookings" && styles.toggleActive,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                tab === "my_bookings" && styles.toggleTextActive,
              ]}
              numberOfLines={1}
            >
              My bookings ({myBookings.length})
            </Text>
          </Pressable>
        </View>

        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={activeData}
          keyExtractor={(x) => x.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={load} />
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {tab === "requests"
                ? "No requests for your listings yet."
                : "You haven't booked anything yet."}
            </Text>
          }
          renderItem={({ item }) => renderCard(item, tab)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e5f3fd",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#e5f3fd",
    justifyContent: "flex-start",

    // ✅ extra top spacing so it doesn't stick to the top
    paddingTop: Platform.OS === "android" ? 18 : 6,
  },

  topGap: {
    height: 8, // small extra breathing space
  },

  toggleWrap: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  toggleBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  toggleActive: {
    backgroundColor: "#1D4ED8",
    borderColor: "#1D4ED8",
  },
  toggleText: {
    fontWeight: "900",
    color: "#111827",
    opacity: 0.85,
    fontSize: 13,
  },
  toggleTextActive: {
    color: "#fff",
    opacity: 1,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    flex: 1,
    color: "#1D4ED8",
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  statusText: {
    fontWeight: "900",
    textTransform: "capitalize",
    color: "#111827",
    fontSize: 12,
  },
  statusApproved: {
    backgroundColor: "#ECFDF5",
    borderColor: "#86EFAC",
  },
  statusRejected: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  statusPending: {
    backgroundColor: "#EFF6FF",
    borderColor: "#93C5FD",
  },

  dates: {
    marginTop: 8,
    fontWeight: "800",
    color: "#111827",
  },
  meta: {
    marginTop: 6,
    opacity: 0.75,
    fontWeight: "700",
    color: "#111827",
  },
  hint: {
    marginTop: 10,
    opacity: 0.85,
    fontWeight: "800",
    color: "#111827",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  approve: { backgroundColor: "#16a34a" },
  reject: { backgroundColor: "#dc2626" },
  btnText: { color: "#fff", fontWeight: "900" },

  emptyText: {
    opacity: 0.7,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "700",
    color: "#111827",
  },
});

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />
//     </View>
//   );
// }


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   const message = () => {
//     // Placeholder for the "Message" button functionality.
//     // This can be used to navigate to a messaging screen or initiate messaging logic.
//     Alert.alert("Message", "Messaging functionality will be added here.");
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message" onPress={message} />
//     </View>
//   );
// }


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   const message = () => {
//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: supabase.auth.user()?.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   const message = () => {
//     const user = supabase.auth.getUser();
//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   const message = () => {
//     const user = supabase.auth.user();
//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // super simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         query: { // Use `query` for passing params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {  // Changed query to params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }


// app/listings/[id].tsx

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location")
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {  // Changed query to params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
//   type: string; // Added 'type' to the Listing type
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location,type") // Include 'type'
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {  // Changed query to params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       {/* Display Listing Type */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Type: {item.type}</Text>  {/* Added Type display */}

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }

// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
//   type: string; // Added 'type' to the Listing type
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location,type") // Include 'type'
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {  // Changed query to params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

//   return (
//     <View style={{ padding: 16, gap: 10 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
//       <Text>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       {/* Display Listing Type */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Type: {item.type}</Text>  {/* Added Type display */}

//       <Text style={{ marginTop: 10, fontWeight: "600" }}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }


//THIS WORKS BUT THE MESSAGE BUTTON IS THERE SO .....


// import { useEffect, useState } from "react";
// import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { supabase } from "../../lib/supabase";

// type Listing = {
//   id: string;
//   owner_id: string;
//   title: string;
//   description: string | null;
//   price_per_month: number;
//   location: string | null;
//   type: string; // Added 'type' to the Listing type
// };

// export default function ListingDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const [item, setItem] = useState<Listing | null>(null);

//   // Simple booking dates
//   const [startDate, setStartDate] = useState("2025-01-01");
//   const [endDate, setEndDate] = useState("2025-01-15");

//   // Load listing data
//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,owner_id,title,description,price_per_month,location,type") // Include 'type'
//       .eq("id", id)
//       .single();

//     if (!error) setItem(data);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Booking function
//   const book = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const userId = sess.session?.user.id;
//     if (!userId) return Alert.alert("Not logged in");

//     if (!item) return;

//     if (item.owner_id === userId) {
//       return Alert.alert("Not allowed", "You cannot book your own listing.");
//     }

//     const { error } = await supabase.from("bookings").insert({
//       listing_id: item.id,
//       renter_id: userId,
//       start_date: startDate,
//       end_date: endDate,
//       status: "pending",
//     });

//     if (error) return Alert.alert("Booking error", error.message);

//     Alert.alert("Success", "Booking requested!");
//     router.back();
//   };

//   // Message function
//   const message = async () => {
//     const { data: sess } = await supabase.auth.getSession();
//     const user = sess.session?.user; // Get the current logged-in user

//     if (!user) {
//       return Alert.alert("Not logged in", "Please log in to send messages.");
//     }

//     // Prevent messaging your own listing
//     if (user.id === item.owner_id) {
//       return Alert.alert("Error", "You cannot message your own listing.");
//     }

//     // Navigate to the MessageScreen with necessary params (listingId, ownerId, userId)
//     if (item) {
//       router.push({
//         pathname: "/listings/message", // Path to the MessageScreen
//         params: {  // Changed query to params
//           listingId: item.id,
//           ownerId: item.owner_id,
//           userId: user.id, // Current logged-in user ID
//         },
//       });
//     }
//   };

//   // If no item is found, show loading message
//   if (!item) return (
//     <View style={{ padding: 16 }}>
//       <Text>Loading...</Text>  {/* Ensure all text is wrapped in <Text> */}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.price}>Rs. {item.price_per_month} / month</Text>
//       <Text>{item.location ?? "No location"}</Text>
//       <Text>{item.description ?? "No description"}</Text>

//       {/* Display Listing Type */}
//       <Text style={styles.typeText}>Type: {item.type}</Text>  {/* Display type */}

//       <Text style={styles.bookText}>Book this listing</Text>
//       <TextInput
//         placeholder="Start date (YYYY-MM-DD)"
//         value={startDate}
//         onChangeText={setStartDate}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="End date (YYYY-MM-DD)"
//         value={endDate}
//         onChangeText={setEndDate}
//         style={styles.input}
//       />

//       <Button title="Request Booking" onPress={book} />

//       {/* Message Button */}
//       <Button title="Message Poster" onPress={message} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     gap: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   typeText: {
//     fontWeight: "600",
//     marginTop: 10,
//   },
//   bookText: {
//     marginTop: 10,
//     fontWeight: "600",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
// });


import { useEffect, useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

type Listing = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price_per_month: number;
  location: string | null;
  type: string;
};

export default function ListingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Listing | null>(null);

  // Simple booking dates
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-15");

  // Load listing data
  const load = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id,owner_id,title,description,price_per_month,location,type")
      .eq("id", id)
      .single();

    if (!error) setItem(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  // Booking function
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

  // ============================
  // Messaging (disabled for now)
  // ============================

  // const message = async () => {
  //   const { data: sess } = await supabase.auth.getSession();
  //   const user = sess.session?.user;
  //
  //   if (!user) {
  //     return Alert.alert("Not logged in", "Please log in to send messages.");
  //   }
  //
  //   // Prevent messaging your own listing
  //   if (user.id === item?.owner_id) {
  //     return Alert.alert("Error", "You cannot message your own listing.");
  //   }
  //
  //   if (item) {
  //     router.push({
  //       pathname: "/listings/message",
  //       params: {
  //         listingId: item.id,
  //         ownerId: item.owner_id,
  //         userId: user.id,
  //       },
  //     });
  //   }
  // };

  // If no item is found, show loading message
  if (!item)
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Rs. {item.price_per_month} / month</Text>
      <Text>{item.location ?? "No location"}</Text>
      <Text>{item.description ?? "No description"}</Text>

      <Text style={styles.typeText}>Type: {item.type}</Text>

      <Text style={styles.bookText}>Book this listing</Text>
      <TextInput
        placeholder="Start date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
        style={styles.input}
      />
      <TextInput
        placeholder="End date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
        style={styles.input}
      />

      <Button title="Request Booking" onPress={book} />

      {/* ============================
          Message button (disabled for now)
          ============================ */}

      {/* <Button title="Message Poster" onPress={message} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
  typeText: {
    fontWeight: "600",
    marginTop: 10,
  },
  bookText: {
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

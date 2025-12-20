


/*
import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, RefreshControl } from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

type Listing = {
  id: string;
  title: string;
  price_per_month: number;
  location: string | null;
  created_at: string;
  is_active?: boolean; // optional (only needed if you select it)
};

export default function Browse() {
  const [items, setItems] = useState<Listing[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const load = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id,title,price_per_month,location,created_at")
      .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Listings load error:", error);
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 12 }}>
      {items.length === 0 && (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          No listings found yet.
        </Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load();
              setRefreshing(false);
            }}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/listings/${item.id}`)}
            style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
            <Text>Rs. {item.price_per_month} / month</Text>
            <Text>{item.location ?? "No location"}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

*/


/*

import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

type Listing = {
  id: string;
  title: string;
  price_per_month: number;
  location: string | null;
  created_at: string;
  is_active?: boolean; // optional (only needed if you select it)
};

export default function Browse() {
  const [items, setItems] = useState<Listing[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const load = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id,title,price_per_month,location,created_at")
      .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Listings load error:", error);
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      {items.length === 0 && (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          No listings found yet.
        </Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load();
              setRefreshing(false);
            }}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/listings/${item.id}`)}
            style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
            <Text>Rs. {item.price_per_month} / month</Text>
            <Text>{item.location ?? "No location"}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 30, // Adds a gap between the top of the screen and the listings
  },
});


*/




// import { useEffect, useState } from "react";
// import { View, Text, FlatList, Pressable, RefreshControl, TextInput, Button, Modal, StyleSheet } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   is_active?: boolean; // optional (only needed if you select it)
// };

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterPrice, setFilterPrice] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at")
//       .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems(data ?? []);
//     setFilteredItems(data ?? []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Search function to filter listings based on the search query
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filteredData = items.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filteredData);
//   };

//   // Filter function for price and location
//   const handleFilter = () => {
//     let filteredData = items;

//     if (filterPrice) {
//       filteredData = filteredData.filter(item => item.price_per_month <= parseInt(filterPrice));
//     }

//     if (filterLocation) {
//       filteredData = filteredData.filter(item => item.location?.toLowerCase().includes(filterLocation.toLowerCase()));
//     }

//     setFilteredItems(filteredData);
//     setModalVisible(false); // Close the modal after applying filter
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for Properties"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {/* Filter Button */}
//       <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.filterText}>Filter</Text>
//       </Pressable>

//       {filteredItems.length === 0 && (
//         <Text style={{ textAlign: "center", marginBottom: 10 }}>
//           No listings found yet.
//         </Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
//           >
//             <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
//             <Text>Rs. {item.price_per_month} / month</Text>
//             <Text>{item.location ?? "No location"}</Text>
//           </Pressable>
//         )}
//       />

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filter Listings</Text>
            
//             {/* Price Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price"
//               value={filterPrice}
//               keyboardType="numeric"
//               onChangeText={setFilterPrice}
//             />
            
//             {/* Location Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location"
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Button title="Apply Filters" onPress={handleFilter} />
//             <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     padding: 12,
//     marginTop: 30,
//   },
//   searchBar: {
//     height: 50,  // Slightly taller for a better appearance
//     borderColor: 'transparent',  // Remove the border
//     backgroundColor: '#fff',  // Ensure it stands out against the background
//     borderRadius: 25,  // Increased the border radius for a more rounded look
//     paddingLeft: 15,
//     marginBottom: 15,
//     shadowColor: '#000',  // Shadow color
//     shadowOffset: { width: 0, height: 4 },  // Shadow offset to make it prominent
//     shadowOpacity: 0.2,  // Subtle shadow
//     shadowRadius: 5,  // Soft rounded shadow
//     elevation: 5,  // For Android devices

//   },
//   filterButton: {
//     backgroundColor: '#1D4ED8',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   filterText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   filterInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 12,
//     marginBottom: 10,
//   },
// });


// import { useEffect, useState } from "react";
// import { View, Text, FlatList, Pressable, RefreshControl, TextInput, Button, Modal, StyleSheet } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   is_active?: boolean; // optional (only needed if you select it)
// };

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterPrice, setFilterPrice] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at")
//       .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems(data ?? []);
//     setFilteredItems(data ?? []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Search function to filter listings based on the search query
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filteredData = items.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filteredData);
//   };

//   // Filter function for price and location
//   const handleFilter = () => {
//     let filteredData = items;

//     if (filterPrice) {
//       filteredData = filteredData.filter(item => item.price_per_month <= parseInt(filterPrice));
//     }

//     if (filterLocation) {
//       filteredData = filteredData.filter(item => item.location?.toLowerCase().includes(filterLocation.toLowerCase()));
//     }

//     setFilteredItems(filteredData);
//     setModalVisible(false); // Close the modal after applying filter
//   };

//   return (
//     <View style={styles.container}>
//       {/* Welcome to Samaya Spaces */}
//       <Text style={styles.welcomeText}>Welcome to Samaya Spaces</Text>

//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for Properties"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {/* Filter Button */}
//       <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.filterText}>Filter</Text>
//       </Pressable>

//       {filteredItems.length === 0 && (
//         <Text style={styles.noListingsText}>
//           No listings found yet.
//         </Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={styles.listingCard}
//           >
//             <Text style={styles.listingTitle}>{item.title}</Text>
//             <Text>Rs. {item.price_per_month} / month</Text>
//             <Text>{item.location ?? "No location"}</Text>
//           </Pressable>
//         )}
//       />

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filter Listings</Text>
            
//             {/* Price Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price"
//               value={filterPrice}
//               keyboardType="numeric"
//               onChangeText={setFilterPrice}
//             />
            
//             {/* Location Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location"
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Button title="Apply Filters" onPress={handleFilter} />
//             <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
//           </View>
//         </View>
//       </Modal>
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
//   welcomeText: {
//     fontSize: 36,
//     fontWeight: "700",
//     color: "#1D4ED8", // Dark Blue Color
//     marginBottom: 30, // Adds space between text and the input fields
//     textAlign: "center", // Centers the text
//   },
//   searchBar: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   filterButton: {
//     backgroundColor: "#1D4ED8", // Dark Blue Color
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   filterText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   noListingsText: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   listingCard: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//   },
//   listingTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D4ED8",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   filterInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 12,
//     marginBottom: 10,
//   },
// });


// import { useEffect, useState } from "react";
// import { View, Text, FlatList, Pressable, RefreshControl, TextInput, Button, Modal, StyleSheet } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   is_active?: boolean; // optional (only needed if you select it)
// };

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterPrice, setFilterPrice] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at")
//       .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems(data ?? []);
//     setFilteredItems(data ?? []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Search function to filter listings based on the search query
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filteredData = items.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filteredData);
//   };

//   // Filter function for price and location
//   const handleFilter = () => {
//     let filteredData = items;

//     if (filterPrice) {
//       filteredData = filteredData.filter(item => item.price_per_month <= parseInt(filterPrice));
//     }

//     if (filterLocation) {
//       filteredData = filteredData.filter(item => item.location?.toLowerCase().includes(filterLocation.toLowerCase()));
//     }

//     setFilteredItems(filteredData);
//     setModalVisible(false); // Close the modal after applying filter
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for Properties"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {/* Filter Button */}
//       <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.filterText}>Filter</Text>
//       </Pressable>

//       {filteredItems.length === 0 && (
//         <Text style={styles.noListingsText}>
//           No listings found yet.
//         </Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={styles.listingCard}
//           >
//             <Text style={styles.listingTitle}>{item.title}</Text>
//             <Text>Rs. {item.price_per_month} / month</Text>
//             <Text>{item.location ?? "No location"}</Text>
//           </Pressable>
//         )}
//       />

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filter Listings</Text>
            
//             {/* Price Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price"
//               value={filterPrice}
//               keyboardType="numeric"
//               onChangeText={setFilterPrice}
//             />
            
//             {/* Location Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location"
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Button title="Apply Filters" onPress={handleFilter} />
//             <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "flex-start", // Aligns children towards the top
//     marginTop: 30, // Adds space at the top to prevent overlap with the notification bar
//   },
//   searchBar: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   filterButton: {
//     backgroundColor: "#1D4ED8", // Dark Blue Color
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   filterText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   noListingsText: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   listingCard: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//   },
//   listingTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D4ED8",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   filterInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 12,
//     marginBottom: 10,
//   },
// });


// import { useEffect, useState } from "react";
// import { View, Text, FlatList, Pressable, RefreshControl, TextInput, Button, Modal, StyleSheet } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   is_active?: boolean; // optional (only needed if you select it)
// };

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterPrice, setFilterPrice] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at")
//       .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems(data ?? []);
//     setFilteredItems(data ?? []);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Search function to filter listings based on the search query
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filteredData = items.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filteredData);
//   };

//   // Filter function for price and location
//   const handleFilter = () => {
//     let filteredData = items;

//     if (filterPrice) {
//       filteredData = filteredData.filter(item => item.price_per_month <= parseInt(filterPrice));
//     }

//     if (filterLocation) {
//       filteredData = filteredData.filter(item => item.location?.toLowerCase().includes(filterLocation.toLowerCase()));
//     }

//     setFilteredItems(filteredData);
//     setModalVisible(false); // Close the modal after applying filter
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for Properties"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {/* Filter Button */}
//       <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.filterText}>Filter</Text>
//       </Pressable>

//       {filteredItems.length === 0 && (
//         <Text style={styles.noListingsText}>
//           No listings found yet.
//         </Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item, index }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={[styles.listingCard, index === 0 && styles.firstListing]}
//           >
//             <Text style={styles.listingTitle}>{item.title}</Text>
//             <Text>Rs. {item.price_per_month} / month</Text>
//             <Text>{item.location ?? "No location"}</Text>
//           </Pressable>
//         )}
//       />

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filter Listings</Text>
            
//             {/* Price Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price"
//               value={filterPrice}
//               keyboardType="numeric"
//               onChangeText={setFilterPrice}
//             />
            
//             {/* Location Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location"
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Button title="Apply Filters" onPress={handleFilter} />
//             <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "flex-start", // Aligns children towards the top
//     marginTop: 30, // Adds space at the top to prevent overlap with the notification bar
//   },
//   searchBar: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   filterButton: {
//     backgroundColor: "#1D4ED8", // Dark Blue Color
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   filterText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   noListingsText: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   listingCard: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//   },
//   listingTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D4ED8",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   filterInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 12,
//     marginBottom: 10,
//   },
//   firstListing: {
//     marginTop: 15, // Adds the same gap between the first listing and the filter button
//   },
// });

// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   RefreshControl,
//   TextInput,
//   Button,
//   Modal,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   image_url: string | null; // ✅ added
//   is_active?: boolean; // optional (only needed if you select it)
// };

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterPrice, setFilterPrice] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at,image_url") // ✅ added image_url
//       .eq("is_active", true) // ✅ IMPORTANT: matches your RLS policy
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems((data ?? []) as Listing[]);
//     setFilteredItems((data ?? []) as Listing[]);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Search function to filter listings based on the search query
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filteredData = items.filter((item) =>
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filteredData);
//   };

//   // Filter function for price and location
//   const handleFilter = () => {
//     let filteredData = items;

//     if (filterPrice) {
//       filteredData = filteredData.filter(
//         (item) => item.price_per_month <= parseInt(filterPrice)
//       );
//     }

//     if (filterLocation) {
//       filteredData = filteredData.filter((item) =>
//         item.location?.toLowerCase().includes(filterLocation.toLowerCase())
//       );
//     }

//     setFilteredItems(filteredData);
//     setModalVisible(false); // Close the modal after applying filter
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for Properties"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {/* Filter Button */}
//       <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.filterText}>Filter</Text>
//       </Pressable>

//       {filteredItems.length === 0 && (
//         <Text style={styles.noListingsText}>No listings found yet.</Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item, index }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={[styles.listingCard, index === 0 && styles.firstListing]}
//           >
//             {/* ✅ Image added (only shows if image_url exists) */}
//             {item.image_url && (
//               <Image
//                 source={{ uri: item.image_url }}
//                 style={styles.listingImage}
//                 resizeMode="cover"
//               />
//             )}

//             <Text style={styles.listingTitle}>{item.title}</Text>
//             <Text>Rs. {item.price_per_month} / month</Text>
//             <Text>{item.location ?? "No location"}</Text>
//           </Pressable>
//         )}
//       />

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filter Listings</Text>

//             {/* Price Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price"
//               value={filterPrice}
//               keyboardType="numeric"
//               onChangeText={setFilterPrice}
//             />

//             {/* Location Filter */}
//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location"
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Button title="Apply Filters" onPress={handleFilter} />
//             <Button
//               title="Close"
//               onPress={() => setModalVisible(false)}
//               color="red"
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "flex-start",
//     marginTop: 30,
//   },
//   searchBar: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   filterButton: {
//     backgroundColor: "#1D4ED8",
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   filterText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   noListingsText: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   listingCard: {
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderColor: "#ddd",
//   },
//   listingTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D4ED8",
//   },

//   // ✅ added
//   listingImage: {
//     width: "100%",
//     height: 160,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: "#eee",
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   filterInput: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 12,
//     marginBottom: 10,
//   },
//   firstListing: {
//     marginTop: 15,
//   },
// });


// import { useEffect, useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   RefreshControl,
//   TextInput,
//   Modal,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo-router";
// import { Picker } from "@react-native-picker/picker";

// type Listing = {
//   id: string;
//   title: string;
//   price_per_month: number;
//   location: string | null;
//   created_at: string;
//   image_url: string | null;
//   type: "room" | "flat" | string | null; // ✅ added
// };

// type SortOption =
//   | "newest"
//   | "oldest"
//   | "price_low"
//   | "price_high"
//   | "title_az";

// export default function Browse() {
//   const [items, setItems] = useState<Listing[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   // Search
//   const [searchQuery, setSearchQuery] = useState("");

//   // Modal
//   const [modalVisible, setModalVisible] = useState(false);

//   // Advanced Filters
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [filterLocation, setFilterLocation] = useState("");
//   const [filterType, setFilterType] = useState<"all" | "room" | "flat">("all");
//   const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);

//   // Sorting
//   const [sortBy, setSortBy] = useState<SortOption>("newest");

//   const router = useRouter();

//   const load = async () => {
//     const { data, error } = await supabase
//       .from("listings")
//       .select("id,title,price_per_month,location,created_at,image_url,type") // ✅ include type
//       .eq("is_active", true)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("Listings load error:", error);
//       return;
//     }

//     setItems((data ?? []) as Listing[]);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // ✅ Filter + Search + Sort (all in one place)
//   const filteredItems = useMemo(() => {
//     let data = [...items];

//     // Search (title + location)
//     const q = searchQuery.trim().toLowerCase();
//     if (q) {
//       data = data.filter((item) => {
//         const t = item.title?.toLowerCase() ?? "";
//         const l = item.location?.toLowerCase() ?? "";
//         return t.includes(q) || l.includes(q);
//       });
//     }

//     // Filters
//     const min = minPrice.trim() ? Number(minPrice) : null;
//     const max = maxPrice.trim() ? Number(maxPrice) : null;

//     if (min !== null && Number.isFinite(min)) {
//       data = data.filter((item) => item.price_per_month >= min);
//     }
//     if (max !== null && Number.isFinite(max)) {
//       data = data.filter((item) => item.price_per_month <= max);
//     }

//     const loc = filterLocation.trim().toLowerCase();
//     if (loc) {
//       data = data.filter((item) =>
//         (item.location ?? "").toLowerCase().includes(loc)
//       );
//     }

//     if (filterType !== "all") {
//       data = data.filter((item) => (item.type ?? "").toLowerCase() === filterType);
//     }

//     if (onlyWithPhoto) {
//       data = data.filter((item) => !!item.image_url);
//     }

//     // Sorting
//     data.sort((a, b) => {
//       if (sortBy === "newest") {
//         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//       }
//       if (sortBy === "oldest") {
//         return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//       }
//       if (sortBy === "price_low") {
//         return a.price_per_month - b.price_per_month;
//       }
//       if (sortBy === "price_high") {
//         return b.price_per_month - a.price_per_month;
//       }
//       // title_az
//       return (a.title ?? "").localeCompare(b.title ?? "");
//     });

//     return data;
//   }, [
//     items,
//     searchQuery,
//     minPrice,
//     maxPrice,
//     filterLocation,
//     filterType,
//     onlyWithPhoto,
//     sortBy,
//   ]);

//   const resetFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setFilterLocation("");
//     setFilterType("all");
//     setOnlyWithPhoto(false);
//     setSortBy("newest");
//   };

//   const activeFilterCount = useMemo(() => {
//     let c = 0;
//     if (minPrice.trim()) c++;
//     if (maxPrice.trim()) c++;
//     if (filterLocation.trim()) c++;
//     if (filterType !== "all") c++;
//     if (onlyWithPhoto) c++;
//     if (sortBy !== "newest") c++; // count sort change too
//     return c;
//   }, [minPrice, maxPrice, filterLocation, filterType, onlyWithPhoto, sortBy]);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search title or location..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* Filter + Sort Row */}
//       <View style={styles.row}>
//         <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
//           <Text style={styles.filterText}>
//             Filter{activeFilterCount ? ` (${activeFilterCount})` : ""}
//           </Text>
//         </Pressable>

//         <View style={styles.sortBox}>
//           <Text style={styles.sortLabel}>Sort</Text>
//           <Picker
//             selectedValue={sortBy}
//             onValueChange={(v) => setSortBy(v)}
//             style={styles.sortPicker}
//           >
//             <Picker.Item label="Newest" value="newest" />
//             <Picker.Item label="Oldest" value="oldest" />
//             <Picker.Item label="Price: Low → High" value="price_low" />
//             <Picker.Item label="Price: High → Low" value="price_high" />
//             <Picker.Item label="Title: A → Z" value="title_az" />
//           </Picker>
//         </View>
//       </View>

//       {filteredItems.length === 0 && (
//         <Text style={styles.noListingsText}>No listings found.</Text>
//       )}

//       <FlatList
//         data={filteredItems}
//         keyExtractor={(x) => x.id}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={async () => {
//               setRefreshing(true);
//               await load();
//               setRefreshing(false);
//             }}
//           />
//         }
//         ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//         renderItem={({ item, index }) => (
//           <Pressable
//             onPress={() => router.push(`/listings/${item.id}`)}
//             style={[styles.listingCard, index === 0 && styles.firstListing]}
//           >
//             {item.image_url && (
//               <Image
//                 source={{ uri: item.image_url }}
//                 style={styles.listingImage}
//                 resizeMode="cover"
//               />
//             )}

//             <Text style={styles.listingTitle}>{item.title}</Text>
//             <Text style={styles.metaText}>Rs. {item.price_per_month} / month</Text>
//             <Text style={styles.metaText}>{item.location ?? "No location"}</Text>

//             {!!item.type && (
//               <View style={styles.typePill}>
//                 <Text style={styles.typePillText}>{item.type.toUpperCase()}</Text>
//               </View>
//             )}
//           </Pressable>
//         )}
//       />

//       {/* Advanced Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Advanced Filters</Text>

//             <TextInput
//               style={styles.filterInput}
//               placeholder="Min Price (e.g. 4000)"
//               value={minPrice}
//               keyboardType="numeric"
//               onChangeText={setMinPrice}
//             />

//             <TextInput
//               style={styles.filterInput}
//               placeholder="Max Price (e.g. 12000)"
//               value={maxPrice}
//               keyboardType="numeric"
//               onChangeText={setMaxPrice}
//             />

//             <TextInput
//               style={styles.filterInput}
//               placeholder="Location contains..."
//               value={filterLocation}
//               onChangeText={setFilterLocation}
//             />

//             <Text style={styles.modalLabel}>Listing Type</Text>
//             <View style={styles.pickerWrap}>
//               <Picker
//                 selectedValue={filterType}
//                 onValueChange={(v) => setFilterType(v)}
//                 style={styles.modalPicker}
//               >
//                 <Picker.Item label="All" value="all" />
//                 <Picker.Item label="Room" value="room" />
//                 <Picker.Item label="Flat" value="flat" />
//               </Picker>
//             </View>

//             <Pressable
//               onPress={() => setOnlyWithPhoto((p) => !p)}
//               style={[
//                 styles.toggleRow,
//                 onlyWithPhoto ? styles.toggleOn : styles.toggleOff,
//               ]}
//             >
//               <Text style={styles.toggleText}>
//                 {onlyWithPhoto ? "✓ Only listings with photos" : "Only listings with photos"}
//               </Text>
//             </Pressable>

//             <View style={styles.modalBtnRow}>
//               <Pressable style={[styles.modalBtn, styles.resetBtn]} onPress={resetFilters}>
//                 <Text style={styles.modalBtnText}>Reset</Text>
//               </Pressable>

//               <Pressable
//                 style={[styles.modalBtn, styles.applyBtn]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.modalBtnText}>Apply</Text>
//               </Pressable>
//             </View>

//             <Pressable onPress={() => setModalVisible(false)} style={styles.closeLink}>
//               <Text style={styles.closeText}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // ---------------- STYLES ----------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#e5f3fd",
//     justifyContent: "flex-start",
//     marginTop: 30,
//   },
//   searchBar: {
//     height: 50,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     marginBottom: 12,
//     fontSize: 16,
//   },

//   row: {
//     flexDirection: "row",
//     gap: 10,
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   filterButton: {
//     flex: 1,
//     backgroundColor: "#1D4ED8",
//     borderRadius: 14,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   filterText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 14,
//   },

//   sortBox: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 14,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     height: 46,
//     justifyContent: "center",
//   },
//   sortLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginBottom: -8,
//   },
//   sortPicker: {
//     height: 46,
//     marginTop: -6,
//   },

//   noListingsText: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 16,
//     color: "#6B7280",
//     marginTop: 10,
//   },

//   listingCard: {
//     borderWidth: 1,
//     borderRadius: 14,
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderColor: "#E5E7EB",
//   },
//   listingTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1D4ED8",
//     marginBottom: 4,
//   },
//   metaText: {
//     color: "#111827",
//     marginBottom: 2,
//   },
//   listingImage: {
//     width: "100%",
//     height: 160,
//     borderRadius: 12,
//     marginBottom: 10,
//     backgroundColor: "#eee",
//   },
//   firstListing: {
//     marginTop: 6,
//   },

//   typePill: {
//     marginTop: 8,
//     alignSelf: "flex-start",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     backgroundColor: "#F9FAFB",
//   },
//   typePillText: {
//     fontWeight: "800",
//     color: "#111827",
//     fontSize: 12,
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 16,
//   },
//   modalContent: {
//     width: "100%",
//     maxWidth: 360,
//     padding: 18,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "900",
//     marginBottom: 12,
//     color: "#111827",
//   },
//   modalLabel: {
//     fontSize: 13,
//     fontWeight: "800",
//     marginBottom: 6,
//     color: "#111827",
//   },
//   filterInput: {
//     height: 44,
//     borderColor: "#E5E7EB",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 12,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   pickerWrap: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 10,
//     marginBottom: 10,
//     overflow: "hidden",
//   },
//   modalPicker: {
//     height: 44,
//   },

//   toggleRow: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     marginBottom: 12,
//   },
//   toggleOn: {
//     backgroundColor: "#EFF6FF",
//     borderColor: "#93C5FD",
//   },
//   toggleOff: {
//     backgroundColor: "#fff",
//   },
//   toggleText: {
//     fontWeight: "800",
//     color: "#111827",
//   },

//   modalBtnRow: {
//     flexDirection: "row",
//     gap: 10,
//   },
//   modalBtn: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   resetBtn: {
//     backgroundColor: "#111827",
//   },
//   applyBtn: {
//     backgroundColor: "#1D4ED8",
//   },
//   modalBtnText: {
//     color: "#fff",
//     fontWeight: "900",
//   },

//   closeLink: {
//     marginTop: 12,
//     alignItems: "center",
//   },
//   closeText: {
//     color: "#DC2626",
//     fontWeight: "800",
//   },
// });


import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
  TextInput,
  Modal,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

type Listing = {
  id: string;
  title: string;
  price_per_month: number;
  location: string | null;
  created_at: string;
  image_url: string | null;
  type: "room" | "flat" | string | null;
  lat?: number | null;
  lng?: number | null;
};

type SortOption =
  | "newest"
  | "oldest"
  | "price_low"
  | "price_high"
  | "title_az";

// ✅ Haversine distance in meters
function distanceMeters(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Browse() {
  const [items, setItems] = useState<Listing[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal
  const [modalVisible, setModalVisible] = useState(false);

  // Advanced Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState<"all" | "room" | "flat">("all");
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);

  // ✅ Landmark filter (manual input)
  const [landmarkLat, setLandmarkLat] = useState("");
  const [landmarkLng, setLandmarkLng] = useState("");
  const [radiusMeters, setRadiusMeters] = useState("300");

  // ✅ This controls whether landmark filtering is active
  // Default is OFF => show ALL listings
  const [landmarkEnabled, setLandmarkEnabled] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const router = useRouter();

  const load = async () => {
    const { data, error } = await supabase
      .from("listings")
      // ✅ include lat/lng
      .select("id,title,price_per_month,location,created_at,image_url,type,lat,lng")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Listings load error:", error);
      return;
    }

    setItems((data ?? []) as Listing[]);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Filter + Search + Sort (all in one place)
  const filteredItems = useMemo(() => {
    let data = [...items];

    // Search (title + location)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      data = data.filter((item) => {
        const t = item.title?.toLowerCase() ?? "";
        const l = item.location?.toLowerCase() ?? "";
        return t.includes(q) || l.includes(q);
      });
    }

    // Filters
    const min = minPrice.trim() ? Number(minPrice) : null;
    const max = maxPrice.trim() ? Number(maxPrice) : null;

    if (min !== null && Number.isFinite(min)) {
      data = data.filter((item) => item.price_per_month >= min);
    }
    if (max !== null && Number.isFinite(max)) {
      data = data.filter((item) => item.price_per_month <= max);
    }

    const loc = filterLocation.trim().toLowerCase();
    if (loc) {
      data = data.filter((item) =>
        (item.location ?? "").toLowerCase().includes(loc)
      );
    }

    if (filterType !== "all") {
      data = data.filter(
        (item) => (item.type ?? "").toLowerCase() === filterType
      );
    }

    if (onlyWithPhoto) {
      data = data.filter((item) => !!item.image_url);
    }

    // ✅ Landmark filtering ONLY when landmarkEnabled = true
    // Behavior: show ONLY listings within radius AND having lat/lng
    if (landmarkEnabled) {
      const lat = Number(landmarkLat);
      const lng = Number(landmarkLng);
      const rad = Number(radiusMeters);

      // if invalid numbers, do nothing (but ideally shouldn't happen because we validate on Apply)
      if (Number.isFinite(lat) && Number.isFinite(lng) && Number.isFinite(rad)) {
        data = data.filter((item) => {
          // ✅ show only listings that have coords (nearby listings)
          if (item.lat == null || item.lng == null) return false;

          const d = distanceMeters(lat, lng, item.lat, item.lng);
          return d <= rad;
        });
      }
    }

    // Sorting
    data.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === "price_low") {
        return a.price_per_month - b.price_per_month;
      }
      if (sortBy === "price_high") {
        return b.price_per_month - a.price_per_month;
      }
      return (a.title ?? "").localeCompare(b.title ?? "");
    });

    return data;
  }, [
    items,
    searchQuery,
    minPrice,
    maxPrice,
    filterLocation,
    filterType,
    onlyWithPhoto,
    sortBy,
    landmarkEnabled,
    landmarkLat,
    landmarkLng,
    radiusMeters,
  ]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilterLocation("");
    setFilterType("all");
    setOnlyWithPhoto(false);
    setSortBy("newest");

    // ✅ reset landmark filter too (back to show ALL)
    setLandmarkLat("");
    setLandmarkLng("");
    setRadiusMeters("300");
    setLandmarkEnabled(false);
  };

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (minPrice.trim()) c++;
    if (maxPrice.trim()) c++;
    if (filterLocation.trim()) c++;
    if (filterType !== "all") c++;
    if (onlyWithPhoto) c++;
    if (sortBy !== "newest") c++;
    if (landmarkEnabled) c++; // ✅ count landmark filter
    return c;
  }, [minPrice, maxPrice, filterLocation, filterType, onlyWithPhoto, sortBy, landmarkEnabled]);

  // ✅ Validate + enable landmark filter on Apply
  const applyModal = () => {
    // if user didn't fill landmark fields, keep landmark filter OFF
    const hasAny = landmarkLat.trim() || landmarkLng.trim();
    if (!hasAny) {
      setLandmarkEnabled(false);
      setModalVisible(false);
      return;
    }

    // require both
    if (!landmarkLat.trim() || !landmarkLng.trim()) {
      Alert.alert("Landmark missing", "Please enter both latitude and longitude.");
      return;
    }

    const lat = Number(landmarkLat);
    const lng = Number(landmarkLng);
    const rad = Number(radiusMeters);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      Alert.alert("Invalid landmark", "Latitude/Longitude must be valid numbers.");
      return;
    }
    if (lat < -90 || lat > 90) {
      Alert.alert("Invalid latitude", "Latitude must be between -90 and 90.");
      return;
    }
    if (lng < -180 || lng > 180) {
      Alert.alert("Invalid longitude", "Longitude must be between -180 and 180.");
      return;
    }
    if (!Number.isFinite(rad) || rad <= 0) {
      Alert.alert("Invalid radius", "Radius must be a positive number (meters).");
      return;
    }

    // ✅ enable landmark filtering
    setLandmarkEnabled(true);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search title or location..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter + Sort Row */}
      <View style={styles.row}>
        <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterText}>
            Filter{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </Text>
        </Pressable>

        <View style={styles.sortBox}>
          <Text style={styles.sortLabel}>Sort</Text>
          <Picker
            selectedValue={sortBy}
            onValueChange={(v) => setSortBy(v)}
            style={styles.sortPicker}
          >
            <Picker.Item label="Newest" value="newest" />
            <Picker.Item label="Oldest" value="oldest" />
            <Picker.Item label="Price: Low → High" value="price_low" />
            <Picker.Item label="Price: High → Low" value="price_high" />
            <Picker.Item label="Title: A → Z" value="title_az" />
          </Picker>
        </View>
      </View>

      {filteredItems.length === 0 && (
        <Text style={styles.noListingsText}>No listings found.</Text>
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={(x) => x.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load();
              setRefreshing(false);
            }}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/listings/${item.id}`)}
            style={[styles.listingCard, index === 0 && styles.firstListing]}
          >
            {item.image_url && (
              <Image
                source={{ uri: item.image_url }}
                style={styles.listingImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.listingTitle}>{item.title}</Text>
            <Text style={styles.metaText}>Rs. {item.price_per_month} / month</Text>
            <Text style={styles.metaText}>{item.location ?? "No location"}</Text>

            {!!item.type && (
              <View style={styles.typePill}>
                <Text style={styles.typePillText}>{item.type.toUpperCase()}</Text>
              </View>
            )}

            {/* optional: show a hint if a listing has coords */}
            {/* {item.lat != null && item.lng != null && (
              <Text style={[styles.metaText, { color: "#6B7280" }]}>📍 Pinned</Text>
            )} */}
          </Pressable>
        )}
      />

      {/* Advanced Filter Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Advanced Filters</Text>

            <TextInput
              style={styles.filterInput}
              placeholder="Min Price (e.g. 4000)"
              value={minPrice}
              keyboardType="numeric"
              onChangeText={setMinPrice}
            />

            <TextInput
              style={styles.filterInput}
              placeholder="Max Price (e.g. 12000)"
              value={maxPrice}
              keyboardType="numeric"
              onChangeText={setMaxPrice}
            />

            <TextInput
              style={styles.filterInput}
              placeholder="Location contains..."
              value={filterLocation}
              onChangeText={setFilterLocation}
            />

            <Text style={styles.modalLabel}>Listing Type</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={filterType}
                onValueChange={(v) => setFilterType(v)}
                style={styles.modalPicker}
              >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Room" value="room" />
                <Picker.Item label="Flat" value="flat" />
              </Picker>
            </View>

            <Pressable
              onPress={() => setOnlyWithPhoto((p) => !p)}
              style={[
                styles.toggleRow,
                onlyWithPhoto ? styles.toggleOn : styles.toggleOff,
              ]}
            >
              <Text style={styles.toggleText}>
                {onlyWithPhoto
                  ? "✓ Only listings with photos"
                  : "Only listings with photos"}
              </Text>
            </Pressable>

            {/* ✅ Landmark section */}
            <Text style={styles.modalTitle2}>Landmark Radius (Optional)</Text>

            <TextInput
              style={styles.filterInput}
              placeholder="Landmark Latitude (e.g. 27.7172)"
              value={landmarkLat}
              keyboardType="decimal-pad"
              onChangeText={setLandmarkLat}
            />
            <TextInput
              style={styles.filterInput}
              placeholder="Landmark Longitude (e.g. 85.3240)"
              value={landmarkLng}
              keyboardType="decimal-pad"
              onChangeText={setLandmarkLng}
            />
            <TextInput
              style={styles.filterInput}
              placeholder="Radius meters (e.g. 300)"
              value={radiusMeters}
              keyboardType="numeric"
              onChangeText={setRadiusMeters}
            />

            {landmarkEnabled && (
              <Text style={styles.landmarkOnText}>
                ✅ Landmark filter is ON (showing nearby pinned listings)
              </Text>
            )}

            <View style={styles.modalBtnRow}>
              <Pressable style={[styles.modalBtn, styles.resetBtn]} onPress={resetFilters}>
                <Text style={styles.modalBtnText}>Reset</Text>
              </Pressable>

              <Pressable style={[styles.modalBtn, styles.applyBtn]} onPress={applyModal}>
                <Text style={styles.modalBtnText}>Apply</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeLink}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e5f3fd",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  searchBar: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },

  sortBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 46,
    justifyContent: "center",
  },
  sortLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: -8,
  },
  sortPicker: {
    height: 46,
    marginTop: -6,
  },

  noListingsText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: "#6B7280",
    marginTop: 10,
  },

  listingCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1D4ED8",
    marginBottom: 4,
  },
  metaText: {
    color: "#111827",
    marginBottom: 2,
  },
  listingImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  firstListing: {
    marginTop: 6,
  },

  typePill: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  typePillText: {
    fontWeight: "800",
    color: "#111827",
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    maxWidth: 360,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
    color: "#111827",
  },
  modalTitle2: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
    marginBottom: 8,
    color: "#111827",
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
    color: "#111827",
  },
  filterInput: {
    height: 44,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  modalPicker: {
    height: 44,
  },

  toggleRow: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  toggleOn: {
    backgroundColor: "#EFF6FF",
    borderColor: "#93C5FD",
  },
  toggleOff: {
    backgroundColor: "#fff",
  },
  toggleText: {
    fontWeight: "800",
    color: "#111827",
  },

  landmarkOnText: {
    marginTop: -2,
    marginBottom: 10,
    color: "#16A34A",
    fontWeight: "900",
    fontSize: 12,
  },

  modalBtnRow: {
    flexDirection: "row",
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  resetBtn: {
    backgroundColor: "#111827",
  },
  applyBtn: {
    backgroundColor: "#1D4ED8",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "900",
  },

  closeLink: {
    marginTop: 12,
    alignItems: "center",
  },
  closeText: {
    color: "#DC2626",
    fontWeight: "800",
  },
});

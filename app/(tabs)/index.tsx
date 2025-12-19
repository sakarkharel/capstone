


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





import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, RefreshControl, TextInput, Button, Modal, StyleSheet } from "react-native";
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
  const [filteredItems, setFilteredItems] = useState<Listing[]>([]); // Store filtered items
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
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
    setFilteredItems(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  // Search function to filter listings based on the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  // Filter function for price and location
  const handleFilter = () => {
    let filteredData = items;

    if (filterPrice) {
      filteredData = filteredData.filter(item => item.price_per_month <= parseInt(filterPrice));
    }

    if (filterLocation) {
      filteredData = filteredData.filter(item => item.location?.toLowerCase().includes(filterLocation.toLowerCase()));
    }

    setFilteredItems(filteredData);
    setModalVisible(false); // Close the modal after applying filter
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search listings by title"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Filter Button */}
      <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>Filter</Text>
      </Pressable>

      {filteredItems.length === 0 && (
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          No listings found yet.
        </Text>
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

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Listings</Text>
            
            {/* Price Filter */}
            <TextInput
              style={styles.filterInput}
              placeholder="Max Price"
              value={filterPrice}
              keyboardType="numeric"
              onChangeText={setFilterPrice}
            />
            
            {/* Location Filter */}
            <TextInput
              style={styles.filterInput}
              placeholder="Location"
              value={filterLocation}
              onChangeText={setFilterLocation}
            />

            <Button title="Apply Filters" onPress={handleFilter} />
            <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 30,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 10,
  },
});


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { db, collection, getDocs } from "../firebaseConfig";

interface Category {
  name: string;
  image: string;
}

const LOCATIONS = [
  "Tarnaka, Hyderabad, 500019",
  "Madhapur, Hyderabad, 500081",
  "Banjara Hills, Hyderabad, 500034",
];

export default function HomeScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoriesList = categorySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            image: data.image,
          };
        });
        setCategories(categoriesList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Ionicons name="location-sharp" size={24} color="green" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.deliveryText}>Delivery to</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownTrigger}>
                <Text style={styles.locationText} numberOfLines={1}>{selectedLocation}</Text>
                <Ionicons name="chevron-down" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => router.push("/Cart")}> */}
          <Ionicons name="cart-outline" size={24} color="black" style={styles.cartIcon} />
          {/* <TouchableOpacity/> */}
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>Clyft’s Intro Banners</Text>
        </View>

        <Text style={styles.sectionTitle}>Shop by category</Text>

        <View style={styles.categoryContainer}>
          {loading ? (
            <Text>Loading categories...</Text>
          ) : categories.length === 0 ? (
            <Text>No categories available</Text>
          ) : (
            categories.slice(0, 3).map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => {}}>
                <View style={styles.categoryItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity onPress={() => router.push("/Categories")}>
          <Text style={styles.link}>See all categories ▸</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Bestsellers</Text>
        <TouchableOpacity>
          <Text style={styles.link}>See all products ▸</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.dropdown}>
            {LOCATIONS.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setSelectedLocation(loc);
                  setModalVisible(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/Homepage")}> <Text style={styles.navItem}>🏠 Home</Text> </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/StoreSelectionScreen")}> <Text style={styles.navItem}>🔄 Switch Stores</Text> </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Categories")}> <Text style={[styles.navItem, { color: "#00B900" }]}>🟢 Categories</Text> </TouchableOpacity>
        <TouchableOpacity> <Text style={styles.navItem}>👤 Account</Text> </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deliveryText: { fontSize: 12, color: "#333" },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 250,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 4,
  },
  cartIcon: { marginLeft: "auto" },
  searchContainer: {
    backgroundColor: "#f5f5f5",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1 },
  banner: {
    backgroundColor: "#eee",
    height: 100,
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  bannerText: { color: "#999" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 16,
  },
  categoryText: { fontSize: 12, textAlign: "center" },
  link: { marginLeft: 16, color: "#007bff", fontWeight: "500", marginTop: 10 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  navItem: { alignItems: "center" },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdown: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    borderRadius: 6,
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});
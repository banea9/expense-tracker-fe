import Constants from "expo-constants";
import { GlobalStyles } from "../constants/styles";

// API base URL is configurable via app.json -> expo.extra.apiUrl so the same
// build can point at localhost, a LAN IP, or a deployed backend.
export const API_URL =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";

export const radioButtonsOptions = [
  {
    id: "add",
    label: "Add User",
    value: "add",
    color: GlobalStyles.colors.accent500,
    labelStyle: {
      color: GlobalStyles.colors.white,
    },
  },
  {
    id: "remove",
    label: "Remove User",
    value: "remove",
    color: GlobalStyles.colors.accent500,
    labelStyle: {
      color: GlobalStyles.colors.white,
    },
  },
];

export const emailRegex =
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

export const categories = [
  {
    label: "Apartment",
    value: "apartment",
    subcategories: [
      { label: "Rent", value: "rent" },
      { label: "Mortgage", value: "mortgage" },
      { label: "Bills", value: "bills" },
      { label: "Maintenance", value: "maintenance" },
      { label: "Other", value: "other-apartment" },
    ],
  },
  {
    label: "Car",
    value: "car",
    subcategories: [
      { label: "Fuel", value: "fuel" },
      { label: "Parking", value: "parking" },
      { label: "Repair", value: "repair" },
      { label: "Other", value: "other-car" },
    ],
  },
  {
    label: "Health",
    value: "health",
    subcategories: [
      { label: "Drugstore", value: "drugstore" },
      { label: "Pharmacy", value: "pharmacy" },
      { label: "Appointments", value: "appointments" },
      { label: "Sports", value: "sports" },
      { label: "Other", value: "other-health" },
    ],
  },
  {
    label: "Groceries",
    value: "groceries",
    subcategories: [
      { label: "Supermarket", value: "supermarket" },
      { label: "Farmers Market", value: "farmers-market" },
      { label: "Butcher's Shop", value: "butchers-shop" },
      { label: "Dairy", value: "dairy" },
      { label: "Bakery", value: "bakery" },
      { label: "Other", value: "other-groceries" },
    ],
  },
  {
    label: "Restaurant",
    value: "restaurant",
    subcategories: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Coffee Shop", value: "coffee-shop" },
      { label: "Bar", value: "bar" },
      { label: "Delivery", value: "delivery" },
      { label: "Other", value: "other-restaurant" },
    ],
  },
  {
    label: "Wardrobe",
    value: "wardrobe",
    subcategories: [
      { label: "Shoes", value: "shoes" },
      { label: "Clothes", value: "clothes" },
      { label: "Other", value: "other-wardrobe" },
    ],
  },
  {
    label: "Travel",
    value: "travel",
    subcategories: [
      { label: "Travel", value: "travel" },
      { label: "Other", value: "other-travel" },
    ],
  },
  {
    label: "Self Improvement",
    value: "self-improvement",
    subcategories: [
      { label: "Courses", value: "courses" },
      { label: "Certificates", value: "certificates" },
      { label: "Books", value: "books" },
      { label: "Other", value: "other-self-improvement" },
    ],
  },
  {
    label: "Other",
    value: "other",
    subcategories: [
      { label: "Paperwork", value: "paperwork" },
      { label: "Gifts", value: "gifts" },
      { label: "Other", value: "other" },
    ],
  },
];

import { GlobalStyles } from "../constants/styles";

export const API_URL = "http://172.22.240.1:3000";

export const radioButtonsOptions = [
  {
    id: 1,
    label: "Add User",
    value: "add",
    color: GlobalStyles.colors.primary400,
    labelStyle: {
      color: GlobalStyles.colors.white,
    },
  },
  {
    id: 2,
    label: "Remove User",
    value: "remove",
    color: GlobalStyles.colors.primary400,
    labelStyle: {
      color: GlobalStyles.colors.white,
    },
  },
];

export const emailRegex =
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
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
      { label: "Paige", value: "paige" },
      { label: "Repair", value: "repair" },
      { label: "Other", value: "other-car" },
    ],
  },
  {
    label: "Health",
    value: "health",
    subcategories: [
      { label: "Drugstore", value: "drugstore" },
      { label: "Farmacy", value: "farmacy" },
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
      { label: "Farmers Market", value: "farmers market" },
      { label: "Butcher's shop", value: "butcher's shop" },
      { label: "Milk House", value: "milk house" },
      { label: "Bakery", value: "bakery" },
      { label: "Other", value: "other-groceries" },
    ],
  },
  {
    label: "Restorant",
    value: "restorant",
    subcategories: [
      { label: "Restorant", value: "restorant" },
      { label: "Coffee Shop", value: "coffee-shop" },
      { label: "Bar", value: "bar" },
      { label: "Delivery", value: "delivery" },
      { label: "Other", value: "other-groceries" },
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
      { label: "Other", value: "other-wardrobe" },
    ],
  },
  {
    label: "Self Improvement",
    value: "self improvement",
    subcategories: [
      { label: "Courses", value: "courses" },
      { label: "Certificates", value: "Certificates" },
      { label: "Books", value: "books" },
      { label: "Other", value: "other-self-improvement" },
    ],
  },
  {
    label: "Other",
    value: "other",
    subcategories: [
      { label: "Paperworks", value: "paperworks" },
      { label: "Gifts", value: "gifts" },
      { label: "Other", value: "other" },
    ],
  },
];

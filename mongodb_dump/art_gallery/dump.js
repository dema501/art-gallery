// Helper function to generate random dates within a range
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Helper function to generate random phone numbers
function randomPhone() {
  return Math.floor(9800000000 + Math.random() * 1000000000).toString();
}

// Generate 30 users
const users = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  userID: `USER${(i + 1).toString().padStart(3, "0")}`,
  loginDomain: "system",
  password: `$2a$10$hashed_password_${i}`,
  gender: i % 2 === 0 ? "male" : "female",
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  isBlocked: null,
}));

// Generate 30 admins
const admins = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  name: `Admin ${i + 1}`,
  email: `admin${i + 1}@example.com`,
  password: `$2a$10$hashed_password_${i}`,
  role: i === 0 ? "superadmin" : "admin",
  shopName: `Shop ${i + 1}`,
  phone: randomPhone(),
  isVerified: randomDate(new Date(2022, 0, 1), new Date()),
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
}));

// Generate 30 categories
const categories = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  systemName: `category${i + 1}`,
  displayName: `Category ${i + 1}`,
  slug: `category-${i + 1}`,
  isDisabled: null,
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
}));

// Generate 30 products
const products = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  name: `Artwork ${i + 1}`,
  quantity: Math.floor(Math.random() * 50) + 1,
  category: [categories[Math.floor(Math.random() * categories.length)]._id],
  averageRating: NumberDecimal((Math.random() * 5).toFixed(1)),
  totalRatingUsers: Math.floor(Math.random() * 100),
  soldBy: admins[Math.floor(Math.random() * admins.length)]._id,
  warranty: "1 year",
  return: "30 days",
  description: `Beautiful artwork description ${i + 1}`,
  price: NumberDecimal((Math.random() * 1000 + 100).toFixed(2)),
  discountRate: Math.floor(Math.random() * 30),
  slug: `artwork-${i + 1}`,
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
}));

// Generate 30 orders
const orders = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  user: users[Math.floor(Math.random() * users.length)]._id,
  orderID: `ORD${(i + 1).toString().padStart(3, "0")}`,
  product: products[Math.floor(Math.random() * products.length)]._id,
  quantity: Math.floor(Math.random() * 3) + 1,
  soldBy: admins[Math.floor(Math.random() * admins.length)]._id,
  status: {
    currentStatus: ["active", "completed", "cancelled"][
      Math.floor(Math.random() * 3)
    ],
    activeDate: randomDate(new Date(2022, 0, 1), new Date()),
  },
  isPaid: Math.random() > 0.3,
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
}));

// Generate 30 addresses
const addresses = Array.from({ length: 30 }, (_, i) => ({
  _id: ObjectId(),
  user: users[Math.floor(Math.random() * users.length)]._id,
  label: ["home", "office", "other"][Math.floor(Math.random() * 3)],
  region: `Region ${i + 1}`,
  city: `City ${i + 1}`,
  area: `Area ${i + 1}`,
  address: `Street ${i + 1}`,
  phoneno: randomPhone(),
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
}));

// Export collections
db.users.insertMany(users);
db.admins.insertMany(admins);
db.categories.insertMany(categories);
db.products.insertMany(products);
db.orders.insertMany(orders);
db.addresses.insertMany(addresses);

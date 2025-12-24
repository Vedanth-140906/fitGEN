// Indian Nutrient Database (INDB) - Comprehensive Indian Food Data
// Based on Indian Food Composition Tables and INDB research

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  servingSize: number; // in grams
  servingUnit: string;
  calories: number; // per serving
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
  sodium: number; // mg
}

export const foodCategories = [
  "Cereals & Grains",
  "Pulses & Legumes",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat & Poultry",
  "Seafood",
  "Snacks & Sweets",
  "Beverages",
  "Prepared Dishes",
  "Breads",
  "Rice Dishes",
];

export const indianFoodDatabase: FoodItem[] = [
  // Cereals & Grains
  { id: "1", name: "Chapati (Whole Wheat)", category: "Breads", servingSize: 40, servingUnit: "1 piece", calories: 104, protein: 3.5, carbs: 20, fat: 1.2, fiber: 2.5, sugar: 0.5, sodium: 150 },
  { id: "2", name: "Paratha (Plain)", category: "Breads", servingSize: 60, servingUnit: "1 piece", calories: 180, protein: 4, carbs: 25, fat: 7, fiber: 2, sugar: 0.5, sodium: 200 },
  { id: "3", name: "Naan", category: "Breads", servingSize: 90, servingUnit: "1 piece", calories: 262, protein: 8.5, carbs: 45, fat: 5, fiber: 2, sugar: 2, sodium: 380 },
  { id: "4", name: "Puri", category: "Breads", servingSize: 25, servingUnit: "1 piece", calories: 100, protein: 2, carbs: 12, fat: 5, fiber: 0.5, sugar: 0.3, sodium: 80 },
  { id: "5", name: "Bhatura", category: "Breads", servingSize: 60, servingUnit: "1 piece", calories: 200, protein: 4, carbs: 28, fat: 8, fiber: 1, sugar: 1, sodium: 150 },
  
  // Rice Dishes
  { id: "6", name: "Steamed Rice (White)", category: "Rice Dishes", servingSize: 150, servingUnit: "1 cup", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, sugar: 0.1, sodium: 2 },
  { id: "7", name: "Brown Rice", category: "Rice Dishes", servingSize: 150, servingUnit: "1 cup", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, sugar: 0.7, sodium: 10 },
  { id: "8", name: "Jeera Rice", category: "Rice Dishes", servingSize: 180, servingUnit: "1 cup", calories: 230, protein: 4.5, carbs: 42, fat: 5, fiber: 1, sugar: 0.5, sodium: 280 },
  { id: "9", name: "Vegetable Pulao", category: "Rice Dishes", servingSize: 200, servingUnit: "1 cup", calories: 260, protein: 5, carbs: 45, fat: 6, fiber: 2.5, sugar: 2, sodium: 350 },
  { id: "10", name: "Chicken Biryani", category: "Rice Dishes", servingSize: 250, servingUnit: "1 cup", calories: 350, protein: 18, carbs: 45, fat: 12, fiber: 2, sugar: 1.5, sodium: 550 },
  { id: "11", name: "Mutton Biryani", category: "Rice Dishes", servingSize: 250, servingUnit: "1 cup", calories: 400, protein: 22, carbs: 42, fat: 16, fiber: 2, sugar: 1.5, sodium: 580 },
  { id: "12", name: "Lemon Rice", category: "Rice Dishes", servingSize: 180, servingUnit: "1 cup", calories: 220, protein: 4, carbs: 40, fat: 5, fiber: 1.5, sugar: 1, sodium: 300 },
  { id: "13", name: "Curd Rice", category: "Rice Dishes", servingSize: 200, servingUnit: "1 cup", calories: 230, protein: 6, carbs: 38, fat: 6, fiber: 0.5, sugar: 3, sodium: 200 },
  
  // Pulses & Legumes
  { id: "14", name: "Dal Tadka (Toor)", category: "Pulses & Legumes", servingSize: 150, servingUnit: "1 cup", calories: 150, protein: 10, carbs: 22, fat: 3, fiber: 5, sugar: 2, sodium: 400 },
  { id: "15", name: "Chana Dal", category: "Pulses & Legumes", servingSize: 150, servingUnit: "1 cup", calories: 170, protein: 11, carbs: 25, fat: 3.5, fiber: 6, sugar: 2.5, sodium: 380 },
  { id: "16", name: "Moong Dal", category: "Pulses & Legumes", servingSize: 150, servingUnit: "1 cup", calories: 140, protein: 12, carbs: 20, fat: 1.5, fiber: 4, sugar: 2, sodium: 350 },
  { id: "17", name: "Rajma (Kidney Beans)", category: "Pulses & Legumes", servingSize: 180, servingUnit: "1 cup", calories: 210, protein: 14, carbs: 35, fat: 2, fiber: 11, sugar: 3, sodium: 450 },
  { id: "18", name: "Chole (Chickpeas)", category: "Pulses & Legumes", servingSize: 180, servingUnit: "1 cup", calories: 240, protein: 12, carbs: 38, fat: 5, fiber: 10, sugar: 4, sodium: 480 },
  { id: "19", name: "Sambar", category: "Pulses & Legumes", servingSize: 200, servingUnit: "1 cup", calories: 130, protein: 8, carbs: 20, fat: 3, fiber: 4, sugar: 3, sodium: 520 },
  { id: "20", name: "Dal Makhani", category: "Pulses & Legumes", servingSize: 180, servingUnit: "1 cup", calories: 280, protein: 11, carbs: 30, fat: 12, fiber: 6, sugar: 3, sodium: 500 },
  
  // Vegetables
  { id: "21", name: "Aloo Gobi", category: "Vegetables", servingSize: 150, servingUnit: "1 cup", calories: 140, protein: 3, carbs: 20, fat: 6, fiber: 3, sugar: 3, sodium: 350 },
  { id: "22", name: "Palak Paneer", category: "Vegetables", servingSize: 180, servingUnit: "1 cup", calories: 260, protein: 12, carbs: 12, fat: 18, fiber: 4, sugar: 3, sodium: 450 },
  { id: "23", name: "Bhindi Masala", category: "Vegetables", servingSize: 150, servingUnit: "1 cup", calories: 120, protein: 3, carbs: 15, fat: 6, fiber: 4, sugar: 2, sodium: 300 },
  { id: "24", name: "Baingan Bharta", category: "Vegetables", servingSize: 180, servingUnit: "1 cup", calories: 150, protein: 4, carbs: 18, fat: 7, fiber: 5, sugar: 4, sodium: 400 },
  { id: "25", name: "Matar Paneer", category: "Vegetables", servingSize: 180, servingUnit: "1 cup", calories: 280, protein: 14, carbs: 15, fat: 18, fiber: 3, sugar: 4, sodium: 420 },
  { id: "26", name: "Aloo Paratha", category: "Breads", servingSize: 100, servingUnit: "1 piece", calories: 260, protein: 5, carbs: 35, fat: 11, fiber: 2, sugar: 1, sodium: 320 },
  { id: "27", name: "Mixed Vegetable Curry", category: "Vegetables", servingSize: 180, servingUnit: "1 cup", calories: 160, protein: 4, carbs: 22, fat: 6, fiber: 5, sugar: 5, sodium: 380 },
  { id: "28", name: "Lauki (Bottle Gourd)", category: "Vegetables", servingSize: 150, servingUnit: "1 cup", calories: 80, protein: 2, carbs: 12, fat: 3, fiber: 2, sugar: 3, sodium: 250 },
  
  // Dairy
  { id: "29", name: "Paneer (Cottage Cheese)", category: "Dairy", servingSize: 100, servingUnit: "100g", calories: 265, protein: 18, carbs: 3, fat: 21, fiber: 0, sugar: 2, sodium: 20 },
  { id: "30", name: "Dahi (Curd/Yogurt)", category: "Dairy", servingSize: 150, servingUnit: "1 cup", calories: 100, protein: 5, carbs: 8, fat: 5, fiber: 0, sugar: 6, sodium: 60 },
  { id: "31", name: "Lassi (Sweet)", category: "Beverages", servingSize: 250, servingUnit: "1 glass", calories: 180, protein: 6, carbs: 30, fat: 4, fiber: 0, sugar: 25, sodium: 80 },
  { id: "32", name: "Lassi (Salted)", category: "Beverages", servingSize: 250, servingUnit: "1 glass", calories: 110, protein: 6, carbs: 10, fat: 4, fiber: 0, sugar: 6, sodium: 400 },
  { id: "33", name: "Chaas (Buttermilk)", category: "Beverages", servingSize: 250, servingUnit: "1 glass", calories: 60, protein: 4, carbs: 8, fat: 1, fiber: 0, sugar: 6, sodium: 350 },
  { id: "34", name: "Kheer (Rice Pudding)", category: "Snacks & Sweets", servingSize: 150, servingUnit: "1 bowl", calories: 250, protein: 6, carbs: 40, fat: 8, fiber: 0.5, sugar: 28, sodium: 100 },
  
  // Meat & Poultry
  { id: "35", name: "Butter Chicken", category: "Meat & Poultry", servingSize: 200, servingUnit: "1 cup", calories: 340, protein: 25, carbs: 12, fat: 22, fiber: 2, sugar: 5, sodium: 650 },
  { id: "36", name: "Chicken Tikka Masala", category: "Meat & Poultry", servingSize: 200, servingUnit: "1 cup", calories: 300, protein: 28, carbs: 10, fat: 16, fiber: 2, sugar: 4, sodium: 600 },
  { id: "37", name: "Tandoori Chicken", category: "Meat & Poultry", servingSize: 150, servingUnit: "1 piece", calories: 220, protein: 30, carbs: 4, fat: 10, fiber: 0.5, sugar: 1, sodium: 480 },
  { id: "38", name: "Mutton Curry", category: "Meat & Poultry", servingSize: 200, servingUnit: "1 cup", calories: 320, protein: 26, carbs: 8, fat: 22, fiber: 1, sugar: 2, sodium: 550 },
  { id: "39", name: "Keema (Minced Meat)", category: "Meat & Poultry", servingSize: 180, servingUnit: "1 cup", calories: 280, protein: 22, carbs: 10, fat: 18, fiber: 2, sugar: 3, sodium: 500 },
  { id: "40", name: "Chicken Curry", category: "Meat & Poultry", servingSize: 200, servingUnit: "1 cup", calories: 280, protein: 26, carbs: 10, fat: 15, fiber: 2, sugar: 3, sodium: 520 },
  { id: "41", name: "Egg Curry", category: "Meat & Poultry", servingSize: 200, servingUnit: "2 eggs", calories: 250, protein: 14, carbs: 10, fat: 18, fiber: 2, sugar: 3, sodium: 450 },
  
  // Seafood
  { id: "42", name: "Fish Curry", category: "Seafood", servingSize: 180, servingUnit: "1 cup", calories: 220, protein: 24, carbs: 8, fat: 11, fiber: 1, sugar: 2, sodium: 480 },
  { id: "43", name: "Prawn Masala", category: "Seafood", servingSize: 180, servingUnit: "1 cup", calories: 200, protein: 22, carbs: 8, fat: 9, fiber: 1.5, sugar: 2, sodium: 520 },
  { id: "44", name: "Fish Fry", category: "Seafood", servingSize: 120, servingUnit: "1 piece", calories: 250, protein: 20, carbs: 12, fat: 14, fiber: 0.5, sugar: 1, sodium: 400 },
  
  // Snacks & Sweets
  { id: "45", name: "Samosa", category: "Snacks & Sweets", servingSize: 60, servingUnit: "1 piece", calories: 180, protein: 3, carbs: 22, fat: 9, fiber: 1.5, sugar: 1, sodium: 280 },
  { id: "46", name: "Pakora (Mixed)", category: "Snacks & Sweets", servingSize: 50, servingUnit: "4 pieces", calories: 150, protein: 3, carbs: 15, fat: 9, fiber: 1, sugar: 1, sodium: 250 },
  { id: "47", name: "Vada Pav", category: "Snacks & Sweets", servingSize: 150, servingUnit: "1 piece", calories: 290, protein: 6, carbs: 40, fat: 12, fiber: 3, sugar: 3, sodium: 450 },
  { id: "48", name: "Pav Bhaji", category: "Snacks & Sweets", servingSize: 300, servingUnit: "1 plate", calories: 400, protein: 10, carbs: 55, fat: 16, fiber: 6, sugar: 8, sodium: 680 },
  { id: "49", name: "Dosa (Plain)", category: "Snacks & Sweets", servingSize: 80, servingUnit: "1 piece", calories: 130, protein: 3, carbs: 25, fat: 2, fiber: 1, sugar: 0.5, sodium: 180 },
  { id: "50", name: "Masala Dosa", category: "Snacks & Sweets", servingSize: 180, servingUnit: "1 piece", calories: 250, protein: 5, carbs: 40, fat: 8, fiber: 3, sugar: 2, sodium: 350 },
  { id: "51", name: "Idli", category: "Snacks & Sweets", servingSize: 40, servingUnit: "1 piece", calories: 40, protein: 1.5, carbs: 8, fat: 0.2, fiber: 0.5, sugar: 0.3, sodium: 100 },
  { id: "52", name: "Medu Vada", category: "Snacks & Sweets", servingSize: 50, servingUnit: "1 piece", calories: 140, protein: 5, carbs: 15, fat: 7, fiber: 2, sugar: 0.5, sodium: 200 },
  { id: "53", name: "Upma", category: "Snacks & Sweets", servingSize: 200, servingUnit: "1 cup", calories: 220, protein: 5, carbs: 35, fat: 7, fiber: 3, sugar: 1, sodium: 400 },
  { id: "54", name: "Poha", category: "Snacks & Sweets", servingSize: 200, servingUnit: "1 cup", calories: 200, protein: 4, carbs: 38, fat: 5, fiber: 2, sugar: 2, sodium: 350 },
  { id: "55", name: "Gulab Jamun", category: "Snacks & Sweets", servingSize: 45, servingUnit: "1 piece", calories: 150, protein: 2, carbs: 25, fat: 5, fiber: 0.2, sugar: 20, sodium: 30 },
  { id: "56", name: "Rasgulla", category: "Snacks & Sweets", servingSize: 50, servingUnit: "1 piece", calories: 120, protein: 3, carbs: 22, fat: 2, fiber: 0, sugar: 18, sodium: 20 },
  { id: "57", name: "Jalebi", category: "Snacks & Sweets", servingSize: 40, servingUnit: "2 pieces", calories: 180, protein: 1, carbs: 35, fat: 5, fiber: 0, sugar: 28, sodium: 15 },
  { id: "58", name: "Ladoo (Besan)", category: "Snacks & Sweets", servingSize: 40, servingUnit: "1 piece", calories: 180, protein: 3, carbs: 20, fat: 10, fiber: 1, sugar: 12, sodium: 20 },
  { id: "59", name: "Barfi", category: "Snacks & Sweets", servingSize: 40, servingUnit: "1 piece", calories: 160, protein: 3, carbs: 22, fat: 7, fiber: 0.5, sugar: 15, sodium: 25 },
  
  // Beverages
  { id: "60", name: "Masala Chai", category: "Beverages", servingSize: 150, servingUnit: "1 cup", calories: 60, protein: 2, carbs: 10, fat: 2, fiber: 0, sugar: 8, sodium: 30 },
  { id: "61", name: "Filter Coffee", category: "Beverages", servingSize: 150, servingUnit: "1 cup", calories: 70, protein: 2, carbs: 10, fat: 2.5, fiber: 0, sugar: 8, sodium: 25 },
  { id: "62", name: "Mango Lassi", category: "Beverages", servingSize: 250, servingUnit: "1 glass", calories: 220, protein: 6, carbs: 40, fat: 4, fiber: 1, sugar: 32, sodium: 80 },
  { id: "63", name: "Nimbu Pani (Lemonade)", category: "Beverages", servingSize: 250, servingUnit: "1 glass", calories: 80, protein: 0.5, carbs: 20, fat: 0, fiber: 0, sugar: 18, sodium: 400 },
  { id: "64", name: "Coconut Water", category: "Beverages", servingSize: 240, servingUnit: "1 glass", calories: 45, protein: 2, carbs: 9, fat: 0.5, fiber: 2.5, sugar: 6, sodium: 250 },
  
  // Fruits
  { id: "65", name: "Mango", category: "Fruits", servingSize: 150, servingUnit: "1 cup", calories: 100, protein: 1.5, carbs: 25, fat: 0.5, fiber: 2.5, sugar: 22, sodium: 2 },
  { id: "66", name: "Banana", category: "Fruits", servingSize: 120, servingUnit: "1 medium", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3, sugar: 14, sodium: 1 },
  { id: "67", name: "Papaya", category: "Fruits", servingSize: 150, servingUnit: "1 cup", calories: 60, protein: 1, carbs: 15, fat: 0.2, fiber: 2.5, sugar: 11, sodium: 10 },
  { id: "68", name: "Guava", category: "Fruits", servingSize: 150, servingUnit: "1 medium", calories: 70, protein: 2.5, carbs: 15, fat: 1, fiber: 9, sugar: 9, sodium: 3 },
  { id: "69", name: "Apple", category: "Fruits", servingSize: 180, servingUnit: "1 medium", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4, sugar: 19, sodium: 2 },
  { id: "70", name: "Pomegranate", category: "Fruits", servingSize: 150, servingUnit: "1 cup", calories: 120, protein: 2.5, carbs: 28, fat: 1.5, fiber: 6, sugar: 20, sodium: 5 },
];

export const getRandomMotivationalQuote = () => {
  const quotes = [
    { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { quote: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
    { quote: "Success is what comes after you stop making excuses.", author: "Luis Galarza" },
    { quote: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
    { quote: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
    { quote: "The difference between try and triumph is a little umph.", author: "Marvin Phillips" },
    { quote: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" },
    { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { quote: "The only way to finish is to start.", author: "Unknown" },
    { quote: "Sweat is fat crying.", author: "Unknown" },
    { quote: "Push harder than yesterday if you want a different tomorrow.", author: "Unknown" },
    { quote: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
    { quote: "You don't have to be extreme, just consistent.", author: "Unknown" },
    { quote: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

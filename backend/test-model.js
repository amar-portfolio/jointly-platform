require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const testDatabase = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Create a Dummy User with Appliances Inventory
    const testUser = new User({
      name: 'Rahul Sharma',
      phone: '9876543210',
      societyName: 'Green Meadows Society',
      wing: 'Wing-B 402',
      pincode: '411057',
      role: 'customer',
      ownedAppliances: [
        { deviceName: 'AC', brand: 'Voltas', lastServicedDate: new Date() },
        { deviceName: 'Water Purifier', brand: 'Eureka Forbes', lastServicedDate: new Date() }
      ]
    });

    // 3. Save to MongoDB
    const savedUser = await testUser.save();
    console.log('✅ Test User Saved Successfully:', savedUser);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    process.exit(1);
  }
};

testDatabase();
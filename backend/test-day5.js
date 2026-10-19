const API_URL = 'http://localhost:5000/api';

async function runDay5Test() {
  try {
    console.log('1️⃣ Logging in to get auth token...');
    const loginRes = await fetch(`${API_URL}/auth/login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '9876543210', otp: '1234' }) // 👈 Fixed OTP to 1234
    });
    const loginData = await loginRes.json();
    
    if (!loginData.success && !loginData.token) {
      // Handle login response structure
    }
    
    const token = loginData.token;
    if (!token) {
      console.error('Login Failed:', loginData);
      return;
    }
    console.log('✅ Login Successful! Token received.\n');

    console.log('2️⃣ Creating a Service with Dynamic Admin Slabs & Advance Amount...');
    const serviceRes = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'AC Deep Servicing & Gas Check',
        category: 'Appliance Maintenance',
        description: 'Complete jet wash, filter clean and gas pressure check.',
        basePrice: 1999,
        advanceAmount: 299,
        discountSlabs: [
          { minUsers: 1, discountPercent: 10 },
          { minUsers: 3, discountPercent: 25 },
          { minUsers: 6, discountPercent: 40 }
        ]
      })
    });
    const serviceData = await serviceRes.json();
    if (!serviceData.success) {
      console.error('Service Creation Failed:', serviceData);
      return;
    }
    const serviceId = serviceData.data._id;
    console.log('✅ Service Response:', serviceData);
    console.log('\n');

    console.log('3️⃣ Joining/Creating Society Group-Buy...');
    const groupRes = await fetch(`${API_URL}/groups/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        serviceId: serviceId,
        societyName: 'Green Meadows Society',
        pincode: '411057'
      })
    });
    const groupData = await groupRes.json();
    if (!groupData.success) {
      console.error('Group-Buy Failed:', groupData);
      return;
    }
    const societyGroupId = groupData.data._id;
    console.log('✅ Group-Buy Response:', groupData);
    console.log('\n');

    console.log('4️⃣ Creating Booking & Processing Advance Payment with Dynamic Pricing...');
    const bookingRes = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        societyGroupId: societyGroupId
      })
    });
    const bookingData = await bookingRes.json();
    console.log('✅ Booking & Payment Response:', bookingData);

  } catch (error) {
    console.error('Test Error:', error.message);
  }
}

runDay5Test();
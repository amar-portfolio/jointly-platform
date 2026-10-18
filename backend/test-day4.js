const testDay4APIs = async () => {
  try {
    console.log('1️⃣ Logging in to get auth token...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9876543210',
        otp: '1234',
        name: 'Rahul Sharma',
        societyName: 'Green Meadows Society',
        wing: 'Wing-B 402',
        pincode: '411057'
      })
    });
    const loginData = await loginRes.json();
    
    if (!loginData.token) {
      console.log('❌ Login Failed:', loginData);
      return;
    }
    const token = loginData.token;
    console.log('✅ Login Successful! Token received.');

    const serviceRes = await fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'AC Deep Servicing & Gas Check',
        description: 'Complete jet wash, filter clean and gas pressure check.',
        category: 'Appliance Maintenance',
        basePrice: 1999,
        advanceAmount: 299,
        discountSlabs: [
          { minUsers: 1, discountPercent: 20 },
          { minUsers: 3, discountPercent: 30 },
          { minUsers: 6, discountPercent: 45 }
        ],
        estimatedDuration: '45 mins'
      })
    });
    const serviceData = await serviceRes.json();
    console.log('✅ Service Response:', serviceData);

    if (serviceData.success && serviceData.data) {
      const serviceId = serviceData.data._id;

      console.log('\n3️⃣ Joining/Creating Society Group-Buy...');
      const groupRes = await fetch('http://localhost:5000/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: serviceId,
          societyName: 'Green Meadows Society',
          pincode: '411057' // 👈 Ithe pincode add kela ahe
        })
      });
      const groupData = await groupRes.json();
      console.log('✅ Group-Buy Response:', groupData);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testDay4APIs();
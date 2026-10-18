const testLoginAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: '9876543210',
        otp: '1234',
        name: 'Rahul Sharma',
        societyName: 'Green Meadows Society',
        wing: 'Wing-B 402',
        pincode: '411057'
      })
    });

    const data = await response.json();
    console.log('✅ API Response:', data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testLoginAPI();
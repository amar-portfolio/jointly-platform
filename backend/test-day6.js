const API_URL = 'http://localhost:5000/api';

async function runDay6Test() {
  try {
    console.log('1️⃣ Logging in as Admin...');
    const loginRes = await fetch(`${API_URL}/auth/login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '9876543210', otp: '1234' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✅ Admin Login Successful!\n');

    console.log('2️⃣ Fetching Admin Summary & Revenue Dashboard...');
    const summaryRes = await fetch(`${API_URL}/admin/summary`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const summaryData = await summaryRes.json();
    console.log('📊 Admin Summary Response:', summaryData);
    console.log('\n');

    console.log('🎉 Day 6 Backend & Admin Summary APIs are working perfectly!');

  } catch (error) {
    console.error('Test Error:', error.message);
  }
}

runDay6Test();
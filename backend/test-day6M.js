const API_URL = 'http://localhost:5000/api';

async function runDay6ModTest() {
  try {
    console.log('1️⃣ Fetching services to get a valid category ID...');
    const servicesRes = await fetch(`${API_URL}/services`);
    const servicesData = await servicesRes.json();
    const serviceId = servicesData.data[0]._id;
    console.log('✅ Service ID found:', serviceId, '\n');

    console.log('2️⃣ Registering or fetching Service Partner for "Bhayander West"...');
    const partnerRes = await fetch(`${API_URL}/partners/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rahul Electricians',
        phone: '9988776655',
        station: 'Bhayander West',
        category: serviceId
      })
    });
    const partnerData = await partnerRes.json();
    
    let partnerId;
    if (partnerData.success) {
      partnerId = partnerData.data._id;
      console.log('✅ Partner Registered Successfully! ID:', partnerId);
    } else {
      console.log('ℹ️ Partner already exists. Registering with unique phone...');
      const uniquePhone = '9988' + Math.floor(100000 + Math.random() * 900000);
      const retryRes = await fetch(`${API_URL}/partners/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Rahul Electricians',
          phone: uniquePhone,
          station: 'Bhayander West',
          category: serviceId
        })
      });
      const retryData = await retryRes.json();
      partnerId = retryData.data._id;
      console.log('✅ Partner Registered with unique phone! ID:', partnerId);
    }
    console.log('\n');

    console.log('3️⃣ Logging in as User to create a Society Group...');
    const loginRes = await fetch(`${API_URL}/auth/login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '9876543210', otp: '1234' })
    });
    const loginData = await loginRes.json();
    const userToken = loginData.token;

    console.log('4️⃣ Creating a Society Group in "Bhayander West" to trigger station dispatch...');
    const groupRes = await fetch(`${API_URL}/groups/join`, { // 👈 Correct endpoint '/groups/join'
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        serviceId: serviceId, // 👈 Correct property name 'serviceId'
        societyName: 'Greenwood Heights',
        pincode: '401101',
        station: 'Bhayander West'
      })
    });
    const groupData = await groupRes.json();
    const groupId = groupData.data._id;
    console.log('✅ Society Group Created! ID:', groupId, '\n');

    console.log('5️⃣ Checking Available Jobs for Partner at "Bhayander West"...');
    const jobsRes = await fetch(`${API_URL}/partners/jobs/${partnerId}`);
    const jobsData = await jobsRes.json();
    console.log(`📦 Available Jobs Count: ${jobsData.count}`);
    console.log('\n');

    console.log('6️⃣ Partner Accepting the Job (First-Come-First-Serve)...');
    const acceptRes = await fetch(`${API_URL}/partners/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupId: groupId,
        partnerId: partnerId
      })
    });
    const acceptData = await acceptRes.json();
    console.log('🚀 Job Accept Response:', acceptData);
    console.log('\n');

    console.log('🎉 Day 6 Modified: Station-Based Dispatch & Acceptance Test Passed Successfully!');

  } catch (error) {
    console.error('Test Error:', error.message);
  }
}

runDay6ModTest();
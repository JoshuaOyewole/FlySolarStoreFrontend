/**
 * Test Script for Authentication API
 * Run this in browser console to test the authentication endpoints
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Test Registration
async function testRegister() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: `test${Date.now()}@example.com`,
        password: 'Test123456'
      })
    });
    const data = await response.json();
    console.log('✅ Register Test:', data);
    return data.token;
  } catch (error) {
    console.error('❌ Register Test Failed:', error);
  }
}

// Test Login
async function testLogin(email = 'test@example.com', password = 'Test123456') {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log('✅ Login Test:', data);
    return data.token;
  } catch (error) {
    console.error('❌ Login Test Failed:', error);
  }
}

// Test Get Profile
async function testGetProfile(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log('✅ Get Profile Test:', data);
    return data;
  } catch (error) {
    console.error('❌ Get Profile Test Failed:', error);
  }
}

// Test Logout
async function testLogout(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log('✅ Logout Test:', data);
    return data;
  } catch (error) {
    console.error('❌ Logout Test Failed:', error);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Authentication Tests...\n');
  
  // Test 1: Register
  console.log('Test 1: Registration');
  const token = await testRegister();
  console.log('\n');
  
  if (!token) {
    console.log('⚠️ Skipping remaining tests due to registration failure');
    return;
  }
  
  // Test 2: Get Profile
  console.log('Test 2: Get Profile');
  await testGetProfile(token);
  console.log('\n');
  
  // Test 3: Logout
  console.log('Test 3: Logout');
  await testLogout(token);
  console.log('\n');
  
  console.log('✅ All tests completed!');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testRegister, testLogin, testGetProfile, testLogout, runAllTests };
}

console.log('Authentication Test Functions Loaded!');
console.log('Run: runAllTests() to test all endpoints');
console.log('Or run individual tests: testRegister(), testLogin(), testGetProfile(token), testLogout(token)');

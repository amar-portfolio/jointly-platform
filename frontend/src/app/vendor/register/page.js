'use client';
import { useState } from 'react';
import Link from 'next/link';

const TERMS_CONTENT = `1. Quality of Service: Partners must maintain high service standards as per Jointly guidelines.
2. Cancellation Policy: Last-minute cancellations within 24 hours will attract penalties and temporary job restrictions.
3. Commission Deduction: Admin reserves the right to deduct dynamic commission shares from cash collections or wallet balances.
4. ID Suspension: Accumulating unverified claims or fraudulent activities will lead to permanent ID suspension.`;

export default function VendorRegisterMultiStep() {
  const [currentStep, setCurrentStep] = useState(1); // 1, 'otp-step1', 2, 3, 'pending'
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    otpInput: '',
    skills: ['Split AC'],
    stations: ['Thane'],
    panNo: '',
    
    // Structured Permanent Address (Line 1, Line 2, Locality, Station, City, State, Pincode)
    permLine1: '',
    permLine2: '',
    permLocality: '',
    permStation: '',
    permCity: '',
    permState: '',
    permPincode: '',

    isDifferentAddress: false,
    
    // Structured Communication Address
    commLine1: '',
    commLine2: '',
    commLocality: '',
    commStation: '',
    commCity: '',
    commState: '',
    commPincode: '',

    bankName: '',
    accountNo: '',
    ifsc: '',
    agreedToTerms: false
  });

  const [showTcModal, setShowTcModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const availableSkills = ['Split AC', 'Window AC', 'Gas Refill', 'PCB Repair', 'Deep Cleaning', 'Plumbing'];
  const availableStations = ['Thane', 'Mulund', 'Bhandup', 'Dadar', 'Andheri', 'Borivali'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Smart Pincode Auto-fill Simulation for Permanent Address
  const handlePermPincodeChange = (e) => {
    const pincode = e.target.value;
    let autoCity = formData.permCity;
    let autoState = formData.permState;

    if (pincode === '400607' || pincode === '400601') {
      autoCity = 'Thane';
      autoState = 'Maharashtra';
    } else if (pincode === '400001' || pincode === '400050') {
      autoCity = 'Mumbai';
      autoState = 'Maharashtra';
    } else if (pincode === '411001' || pincode === '411038') {
      autoCity = 'Pune';
      autoState = 'Maharashtra';
    }

    setFormData(prev => ({
      ...prev,
      permPincode: pincode,
      permCity: autoCity,
      permState: autoState
    }));
  };

  // Smart Pincode Auto-fill Simulation for Communication Address
  const handleCommPincodeChange = (e) => {
    const pincode = e.target.value;
    let autoCity = formData.commCity;
    let autoState = formData.commState;

    if (pincode === '400607' || pincode === '400601') {
      autoCity = 'Thane';
      autoState = 'Maharashtra';
    } else if (pincode === '400001' || pincode === '400050') {
      autoCity = 'Mumbai';
      autoState = 'Maharashtra';
    } else if (pincode === '411001' || pincode === '411038') {
      autoCity = 'Pune';
      autoState = 'Maharashtra';
    }

    setFormData(prev => ({
      ...prev,
      commPincode: pincode,
      commCity: autoCity,
      commState: autoState
    }));
  };

  const toggleSelection = (listName, item) => {
    setFormData(prev => {
      const list = prev[listName];
      if (list.includes(item)) {
        return { ...prev, [listName]: list.filter(i => i !== item) };
      } else {
        return { ...prev, [listName]: [...list, item] };
      }
    });
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile) {
      setNotification('Krupaya Full Name aani Mobile Number bharun dya.');
      return;
    }
    setNotification('🔐 Demo OTP sent to mobile: 1234');
    setCurrentStep('otp-step1');
  };

  const handleVerifyStep1Otp = () => {
    if (formData.otpInput !== '1234') {
      setNotification('❌ Incorrect OTP. Please enter 1234');
      return;
    }
    setNotification('✅ Mobile verified successfully!');
    setCurrentStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (formData.skills.length === 0 || formData.stations.length === 0) {
      setNotification('Krupaya kami-t-kami ek skill aani station select kara.');
      return;
    }
    setCurrentStep(3);
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    if (!formData.panNo || !formData.permPincode || !formData.accountNo || !formData.ifsc) {
      setNotification('Krupaya saglya KYC, structured address aani Bank details bharun dya.');
      return;
    }
    if (!formData.agreedToTerms) {
      setNotification('Krupaya Terms & Conditions accept kara.');
      return;
    }
    setCurrentStep('pending');
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      
      {/* HEADER & STEP PROGRESS BAR */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">Partner Onboarding</h1>
        <p className="text-gray-500 font-medium mt-1">Join Jointly & start receiving location-based society leads.</p>
        
        {currentStep !== 'pending' && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-black font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</span>
              <span>Basic & OTP</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-black font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</span>
              <span>Skills & Stations</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-black font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>3</span>
              <span>KYC & Bank</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        
        {/* ======================================= */}
        {/* STEP 1: BASIC DETAILS */}
        {/* ======================================= */}
        {currentStep === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span> Step 1: Personal Details & Mobile Verification
            </h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name (As per ID proof) *</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleInputChange} 
                placeholder="Ramesh Kumar" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleInputChange} 
                placeholder="9876543210" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition" 
                required 
              />
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition">
                Send OTP & Verify ➔
              </button>
            </div>
          </form>
        )}

        {/* ======================================= */}
        {/* STEP 1.1: OTP SCREEN */}
        {/* ======================================= */}
        {currentStep === 'otp-step1' && (
          <div className="text-center py-6 animate-fade-in-up">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Enter Mobile OTP</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">
              Aapan {formData.mobile} var OTP pathavla ahe. (Demo OTP: <span className="font-bold text-black">1234</span>)
            </p>
            <div className="max-w-xs mx-auto mb-6">
              <input 
                type="text" 
                name="otpInput" 
                maxLength="4"
                value={formData.otpInput}
                onChange={handleInputChange}
                placeholder="Enter 4-digit OTP" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl font-bold tracking-widest focus:border-black outline-none" 
              />
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setCurrentStep(1)} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold">
                ← Back
              </button>
              <button 
                onClick={handleVerifyStep1Otp} 
                className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-md"
              >
                Verify OTP & Proceed ➔
              </button>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* STEP 2: MULTI-SKILLS & STATIONS */}
        {/* ======================================= */}
        {currentStep === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🛠️</span> Step 2: Select Skills & Service Stations
            </h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Your Special Skills (Multiple allowed)</label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map(skill => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSelection('skills', skill)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition border ${isSelected ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-black'}`}
                    >
                      {isSelected ? '✓ ' : '+ '} {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Service Stations / Locations (Multiple allowed)</label>
              <div className="flex flex-wrap gap-2">
                {availableStations.map(station => {
                  const isSelected = formData.stations.includes(station);
                  return (
                    <button
                      key={station}
                      type="button"
                      onClick={() => toggleSelection('stations', station)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition border ${isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-600'}`}
                    >
                      {isSelected ? '✓ ' : '+ '} {station}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button type="button" onClick={() => setCurrentStep(1)} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold">
                ← Back
              </button>
              <button type="submit" className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition">
                Next: KYC & Structured Address ➔
              </button>
            </div>
          </form>
        )}

        {/* ======================================= */}
        {/* STEP 3: KYC, STRUCTURED ADDRESS & BANK */}
        {/* ======================================= */}
        {currentStep === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🪪</span> Step 3: KYC Proofs, Structured Address & Bank Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">PAN Card Number *</label>
                <input 
                  type="text" 
                  name="panNo" 
                  value={formData.panNo} 
                  onChange={handleInputChange} 
                  placeholder="ABCDE1234F" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg uppercase focus:border-black outline-none transition" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Upload PAN Card Proof *</label>
                <input type="file" accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700" required />
              </div>
            </div>

            {/* Aadhaar Front & Back Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Aadhaar Card - Front Side *</label>
                <input type="file" accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Aadhaar Card - Back Side *</label>
                <input type="file" accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700" required />
              </div>
            </div>

            {/* Structured Permanent Address (Line 1, Line 2, Locality, Station, City, State, Pincode) */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <label className="block text-sm font-bold text-gray-700">Permanent Address (As per Aadhaar - Detailed Structured) *</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="permLine1" 
                  value={formData.permLine1} 
                  onChange={handleInputChange} 
                  placeholder="Address Line 1 (Flat / House / Building)" 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" 
                  required 
                />
                <input 
                  type="text" 
                  name="permLine2" 
                  value={formData.permLine2} 
                  onChange={handleInputChange} 
                  placeholder="Address Line 2 (Society / Area)" 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" 
                />
                <input 
                  type="text" 
                  name="permLocality" 
                  value={formData.permLocality} 
                  onChange={handleInputChange} 
                  placeholder="Nearby / Locality / Landmark" 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" 
                  required 
                />
                <input 
                  type="text" 
                  name="permStation" 
                  value={formData.permStation} 
                  onChange={handleInputChange} 
                  placeholder="Nearest Station (e.g. Thane)" 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" 
                  required 
                />
                <input 
                  type="text" 
                  name="permPincode" 
                  value={formData.permPincode} 
                  onChange={handlePermPincodeChange} 
                  placeholder="Pincode (e.g. 400607 - Enter to Auto-fill)" 
                  maxLength="6"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-indigo-700 bg-indigo-50/30" 
                  required 
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    name="permCity" 
                    value={formData.permCity} 
                    onChange={handleInputChange} 
                    placeholder="City" 
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                    required 
                  />
                  <input 
                    type="text" 
                    name="permState" 
                    value={formData.permState} 
                    onChange={handleInputChange} 
                    placeholder="State" 
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Communication Address Different Checkbox */}
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="diffAddr" 
                  name="isDifferentAddress" 
                  checked={formData.isDifferentAddress}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-black" 
                />
                <label htmlFor="diffAddr" className="text-sm font-bold text-gray-700">My Communication address is different from Permanent address</label>
              </div>

              {formData.isDifferentAddress && (
                <div className="animate-fade-in-up bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 mt-3">
                  <label className="block text-sm font-bold text-gray-700">Communication Address (Structured)</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      name="commLine1" 
                      value={formData.commLine1} 
                      onChange={handleInputChange} 
                      placeholder="Address Line 1" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white" 
                    />
                    <input 
                      type="text" 
                      name="commLine2" 
                      value={formData.commLine2} 
                      onChange={handleInputChange} 
                      placeholder="Address Line 2" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white" 
                    />
                    <input 
                      type="text" 
                      name="commLocality" 
                      value={formData.commLocality} 
                      onChange={handleInputChange} 
                      placeholder="Nearby / Locality" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white" 
                    />
                    <input 
                      type="text" 
                      name="commStation" 
                      value={formData.commStation} 
                      onChange={handleInputChange} 
                      placeholder="Nearest Station" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white" 
                    />
                    <input 
                      type="text" 
                      name="commPincode" 
                      value={formData.commPincode} 
                      onChange={handleCommPincodeChange} 
                      placeholder="Pincode (Auto-fill)" 
                      maxLength="6"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white font-bold" 
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        name="commCity" 
                        value={formData.commCity} 
                        onChange={handleInputChange} 
                        placeholder="City" 
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                      />
                      <input 
                        type="text" 
                        name="commState" 
                        value={formData.commState} 
                        onChange={handleInputChange} 
                        placeholder="State" 
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Upload Supporting Address Proof (Light Bill / Rent Agreement) *</label>
                    <input type="file" accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-yellow-50 file:text-yellow-800" />
                  </div>
                </div>
              )}
            </div>

            {/* Bank Details & Passbook / Cheque Upload */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">Bank Payout Details & Proof</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Bank Name *</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="HDFC Bank" className="w-full px-3 py-2.5 border rounded-lg text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Account Number *</label>
                  <input type="password" name="accountNo" value={formData.accountNo} onChange={handleInputChange} placeholder="1234567890" className="w-full px-3 py-2.5 border rounded-lg text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">IFSC Code *</label>
                  <input type="text" name="ifsc" value={formData.ifsc} onChange={handleInputChange} placeholder="HDFC0001234" className="w-full px-3 py-2.5 border rounded-lg text-sm uppercase" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload Cancelled Cheque / Bank Passbook Copy *</label>
                <input type="file" accept="image/*,.pdf" className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700" required />
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="tc" 
                  name="agreedToTerms" 
                  checked={formData.agreedToTerms} 
                  onChange={handleInputChange} 
                  className="w-4 h-4 accent-black" 
                  required 
                />
                <label htmlFor="tc" className="text-sm font-medium text-gray-700">
                  I agree to the <button type="button" onClick={() => setShowTcModal(true)} className="text-indigo-600 font-bold underline">Terms & Conditions</button>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={() => setCurrentStep(2)} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold">
                ← Back
              </button>
              <button type="submit" className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
                Submit for Admin Approval 🚀
              </button>
            </div>
          </form>
        )}

        {/* ======================================= */}
        {/* PENDING APPROVAL SCREEN */}
        {/* ======================================= */}
        {currentStep === 'pending' && (
          <div className="text-center py-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold animate-pulse">
              ⏳
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Registration Submitted Successfully!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              Tuzi purna profile, structured address (Line 1, Line 2, Locality, Station, Pincode, City, State) aani KYC documents **Admin Dashboard** kade approval sathi gelyat.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 font-bold mb-8 max-w-sm mx-auto">
              🔒 Status: Pending Admin Verification
            </div>

            <Link 
              href="/vendor/login" 
              className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition text-sm shadow-md"
            >
              Go to Partner Login
            </Link>
          </div>
        )}

      </div>

      {/* TERMS & CONDITIONS MODAL */}
      {showTcModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-xl font-black text-gray-900 mb-3">Partner Terms & Conditions</h3>
            <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 space-y-2 mb-6 max-h-60 overflow-y-auto border border-gray-200 font-medium whitespace-pre-line text-left">
              {TERMS_CONTENT}
            </div>
            <button 
              onClick={() => {
                setFormData(prev => ({ ...prev, agreedToTerms: true }));
                setShowTcModal(false);
              }} 
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              I Understand & Accept
            </button>
          </div>
        </div>
      )}

      {/* NOTIFICATION POPUP */}
      {notification && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-fade-in-up">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Alert</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">{notification}</p>
            <button onClick={() => setNotification(null)} className="w-full bg-black text-white py-3 rounded-bold">OK</button>
          </div>
        </div>
      )}

    </div>
  );
}
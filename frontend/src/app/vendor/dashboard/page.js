'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('bookings'); 
  
  // Edit & OTP States for Profile
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  // Custom Notification Popup State
  const [notificationMessage, setNotificationMessage] = useState(null);

  // Multi-select Mock States
  const [selectedStations, setSelectedStations] = useState(["Thane", "Mulund", "Bhandup"]);
  const [selectedSkills, setSelectedSkills] = useState(["Split AC", "Gas Refill"]);

  const adminStations = ["Dadar", "Andheri", "Borivali", "Kurla", "Ghatkopar"];
  const adminSkills = ["Window AC", "PCB Repair", "Deep Cleaning", "Installation"];

  // ==========================================
  // BOOKINGS & LEADS STATE (Dynamic Admin Commission Rate fetched per service)
  // ==========================================
  const [leads, setLeads] = useState([
    {
      id: 1,
      type: "Group Buy",
      serviceName: "Foam-jet AC Service (3 Flats Pool)",
      commissionRate: 15, // Dynamic commission set by Admin during service creation
      society: "Lodha Amara, Kolshet Road, Thane",
      station: "Thane",
      payout: 1197,
      advanceAmount: 200,
      time: "Today, 04:00 PM",
      broadcastStatus: "Broadcasted to 4 nearby partners (FCFS)",
      customer: {
        name: "Vikram Malhotra",
        phoneMasked: "+91 98765 XXXXX (Visible 1 hr before service)",
        phoneReal: "+91 98765 43210",
        address: "Flat 1204, Tower B, Lodha Amara, Thane",
        notes: "Please bring an extra long pipe extension."
      }
    }
  ]);

  const [acceptedBookings, setAcceptedBookings] = useState([
    {
      id: 101,
      type: "Individual",
      serviceName: "AC Gas Refill (R32)",
      commissionRate: 18, // Dynamic commission set by Admin for this specific service
      society: "Hiranandani Estate, Thane",
      payout: 1999,
      advanceAmount: 300,
      time: "Today, 06:30 PM",
      status: "Accepted / Assigned",
      cancellationStrikes: 0,
      customer: {
        name: "Sneha Deshmukh",
        phone: "+91 91234 56789",
        address: "Villa 42, Hiranandani Estate, Thane",
      },
      jobStarted: false,
      startOtpInput: "",
      jobCompleted: false,
      completeOtpInput: "",
      
      // Add-on Parts & Consolidated OTP
      addOns: [],
      partsOtpInput: "",
      partsVerified: true, 
      
      // Photos & Final COD Billing
      beforePhoto: null,
      afterPhoto: null,
      billPushed: false,
      paymentStatus: "Pending COD Collection" 
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [cancellationModalBookingId, setCancellationModalBookingId] = useState(null);
  const [newPartName, setNewPartName] = useState("");
  const [newPartPrice, setNewPartPrice] = useState("");

  const handleAccept = (leadId) => {
    const acceptedItem = leads.find(l => l.id === leadId);
    setLeads(leads.filter(l => l.id !== leadId));
    setAcceptedBookings([ { 
      ...acceptedItem, 
      status: 'Accepted / Assigned', 
      cancellationStrikes: 0,
      jobStarted: false, 
      startOtpInput: "",
      jobCompleted: false, 
      completeOtpInput: "",
      addOns: [],
      partsOtpInput: "",
      partsVerified: true,
      beforePhoto: null,
      afterPhoto: null,
      billPushed: false,
      paymentStatus: "Pending COD Collection"
    }, ...acceptedBookings ]);
    setNotificationMessage("🎉 Lead Accepted successfully!");
  };

  const handleCancelClick = (bookingId) => {
    setCancellationModalBookingId(bookingId);
  };

  const confirmCancellation = () => {
    setAcceptedBookings(acceptedBookings.map(b => {
      if(b.id === cancellationModalBookingId) {
        return { ...b, status: 'Cancelled & Diverted' };
      }
      return b;
    }));
    setCancellationModalBookingId(null);
    setNotificationMessage("❌ Booking cancelled & auto-diverted to a free partner successfully.");
  };

  const handleStartJobOtp = (bookingId) => {
    const item = acceptedBookings.find(b => b.id === bookingId);
    if (!item.beforePhoto) {
      setNotificationMessage("⚠️ Please upload the 'Before Work' photo before starting the job!");
      return;
    }
    setNotificationMessage("🔐 Job Start OTP sent to customer! (Demo OTP: 1234)");
  };
  
  const verifyStartOtp = (bookingId, otp) => {
    const item = acceptedBookings.find(b => b.id === bookingId);
    if (!item.beforePhoto) {
      setNotificationMessage("⚠️ Please upload the 'Before Work' photo first!");
      return;
    }
    if(otp === "1234") {
      setAcceptedBookings(acceptedBookings.map(b => b.id === bookingId ? { ...b, jobStarted: true } : b));
      setNotificationMessage("🚀 Job Started Successfully!");
    } else {
      setNotificationMessage("❌ Incorrect OTP. Please try '1234'");
    }
  };

  const handleCompleteJobOtp = (bookingId) => {
    const item = acceptedBookings.find(b => b.id === bookingId);
    if (!item.afterPhoto) {
      setNotificationMessage("⚠️ Please upload the 'After Work' photo before completing the job!");
      return;
    }
    if (!item.partsVerified && item.addOns.length > 0) {
      setNotificationMessage("⚠️ Please verify Spare Parts bill OTP with customer first!");
      return;
    }
    setNotificationMessage("🔐 Job Completion OTP sent to customer! (Demo OTP: 5678)");
  };
  
  const verifyCompleteOtp = (bookingId, otp) => {
    const item = acceptedBookings.find(b => b.id === bookingId);
    if (!item.afterPhoto) {
      setNotificationMessage("⚠️ Please upload 'After Work' photo first!");
      return;
    }
    if(otp === "5678") {
      setAcceptedBookings(acceptedBookings.map(b => b.id === bookingId ? { ...b, jobCompleted: true, status: 'Completed' } : b));
      setNotificationMessage("✅ Job Completed Successfully! Please push final COD invoice bill to customer.");
    } else {
      setNotificationMessage("❌ Incorrect OTP. Please try '5678'");
    }
  };

  const pushCodBill = (bookingId) => {
    setAcceptedBookings(acceptedBookings.map(b => {
      if(b.id === bookingId) {
        return { 
          ...b, 
          billPushed: true, 
          paymentStatus: "Pending COD Collection at Site" 
        };
      }
      return b;
    }));
    setNotificationMessage("📤 Final PDF Bill pushed to Customer via WhatsApp & Email (Mode: COD Balance).");
  };

  const simulateCashCollection = (bookingId) => {
    setAcceptedBookings(acceptedBookings.map(b => {
      if(b.id === bookingId) {
        return { ...b, paymentStatus: 'COD Collected & Wallet Settled' };
      }
      return b;
    }));
    setNotificationMessage("💵 Cash collected from customer successfully! Admin dynamic commission debited and net payout added to your Wallet Receivables.");
  };

  const addMaterialPart = (bookingId) => {
    if(!newPartName || !newPartPrice) return;
    setAcceptedBookings(acceptedBookings.map(b => {
      if(b.id === bookingId) {
        const updatedAddons = [...b.addOns, { name: newPartName, price: Number(newPartPrice) }];
        return { 
          ...b, 
          addOns: updatedAddons,
          partsVerified: false 
        };
      }
      return b;
    }));
    setNewPartName("");
    setNewPartPrice("");
  };

  const removeMaterialPart = (bookingId, indexToRemove) => {
    setAcceptedBookings(acceptedBookings.map(b => {
      if(b.id === bookingId) {
        const updatedAddons = b.addOns.filter((_, idx) => idx !== indexToRemove);
        return { ...b, addOns: updatedAddons, partsVerified: updatedAddons.length === 0 ? true : b.partsVerified };
      }
      return b;
    }));
  };

  const sendConsolidatedPartsOtp = () => {
    setNotificationMessage("🔐 Consolidated Spare Parts Bill OTP sent to customer! (Demo OTP: 9999)");
  };

  const verifyPartsOtp = (bookingId, otp) => {
    if(otp === "9999") {
      setAcceptedBookings(acceptedBookings.map(b => b.id === bookingId ? { ...b, partsVerified: true } : b));
      setNotificationMessage("✅ Spare parts bill successfully approved by customer!");
    } else {
      setNotificationMessage("❌ Incorrect Parts OTP. Try '9999'");
    }
  };

  const handleSaveClick = () => setShowOtpModal(true);
  const handleOtpVerify = () => {
    setShowOtpModal(false);
    setIsEditing(false);
    setNotificationMessage("✅ Verified successfully! Changes sent to Admin for approval.");
  };

  const removeStation = (s) => isEditing && setSelectedStations(selectedStations.filter(item => item !== s));
  const removeSkill = (s) => isEditing && setSelectedSkills(selectedSkills.filter(item => item !== s));

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 min-h-[70vh] relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, Ramesh (AC Expert)</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> Online
          </span>
          <Link href="/vendor/login" className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-100 transition">
            Logout
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab('bookings')} className={`pb-4 px-6 font-bold text-lg transition-colors whitespace-nowrap ${activeTab === 'bookings' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
          Bookings & Leads
        </button>
        <button onClick={() => setActiveTab('wallet')} className={`pb-4 px-6 font-bold text-lg transition-colors whitespace-nowrap ${activeTab === 'wallet' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
          Wallet Ledger (Receivables)
        </button>
        <button onClick={() => setActiveTab('profile')} className={`pb-4 px-6 font-bold text-lg transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}>
          My Profile & Settings
        </button>
      </div>

      {/* ======================================= */}
      {/* TAB 1: BOOKINGS & LEADS */}
      {/* ======================================= */}
      {activeTab === 'bookings' && (
        <div className="animate-fade-in-up space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-bold mb-2">Today's Earnings</h3>
              <p className="text-3xl font-black text-green-600">₹2,450</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-bold mb-2">Accepted Bookings</h3>
              <p className="text-3xl font-black text-gray-900">{acceptedBookings.length}</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-bold mb-2">Pending Broadcast Leads</h3>
              <p className="text-3xl font-black text-indigo-600">{leads.length}</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 font-bold mb-2">Cancellation Strikes</h3>
              <p className="text-3xl font-black text-red-600">0 / 3</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>📡</span> Live Broadcast Leads (FCFS Pool)
              </h2>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                First Come First Serve
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 font-medium">
                No pending broadcast leads right now. Stay online!
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map(lead => (
                  <div key={lead.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider bg-indigo-100 text-indigo-800">
                          {lead.type}
                        </span>
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Admin Commission: {lead.commissionRate}%</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{lead.serviceName}</h3>
                      <p className="text-sm text-gray-600 font-medium mt-1">📍 {lead.society}</p>
                      <p className="text-sm font-black text-black mt-2">Total Payout: ₹{lead.payout} | <span className="text-indigo-600">Advance Online: ₹{lead.advanceAmount}</span></p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                      <button onClick={() => setSelectedLead(lead)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg font-bold transition text-sm">
                        🔍 More Details
                      </button>
                      <button onClick={() => setLeads(leads.filter(l => l.id !== lead.id))} className="border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-bold hover:border-gray-400 transition text-sm">
                        Decline
                      </button>
                      <button onClick={() => handleAccept(lead.id)} className="bg-black text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md text-sm">
                        Accept Lead
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>✅</span> Active & Accepted Bookings
            </h2>
            <div className="space-y-6">
              {acceptedBookings.map(item => {
                const totalAddOns = item.addOns.reduce((acc, curr) => acc + curr.price, 0);
                const grandTotal = item.payout + totalAddOns;
                const remainingCodBalance = grandTotal - item.advanceAmount;
                const calculatedCommission = Math.round((grandTotal * item.commissionRate) / 100);
                const netPartnerEarnings = grandTotal - calculatedCommission;

                return (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {item.status}
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            Admin Commission: {item.commissionRate}%
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{item.serviceName}</h3>
                        <p className="text-xs text-gray-500">📍 {item.society}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-green-600">Total: ₹{grandTotal}</p>
                        <p className="text-xs text-purple-700 font-bold">Platform Fee ({item.commissionRate}%): ₹{calculatedCommission}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
                      <div>
                        <span className="font-bold text-gray-900">Customer: {item.customer.name}</span>
                        <p className="text-xs text-indigo-600 font-semibold mt-0.5">📞 Contact: {item.customer.phone}</p>
                      </div>
                      {item.status !== 'Completed' && item.status !== 'Cancelled & Diverted' && (
                        <button onClick={() => handleCancelClick(item.id)} className="text-red-600 hover:underline text-xs font-bold">
                          Cancel Booking (Auto-divert policy)
                        </button>
                      )}
                    </div>

                    {/* BEFORE WORK PHOTO */}
                    <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
                      <p className="text-xs font-bold text-gray-700 mb-2">📸 Step 1: Upload Before Work Photo (Mandatory to start job)</p>
                      <div className="flex items-center gap-3">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if(file) {
                              setAcceptedBookings(acceptedBookings.map(b => b.id === item.id ? { ...b, beforePhoto: file.name } : b));
                            }
                          }}
                          className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700" 
                        />
                        {item.beforePhoto && <span className="text-xs text-green-600 font-bold">✔️ {item.beforePhoto}</span>}
                      </div>
                    </div>

                    {item.status !== 'Completed' && item.status !== 'Cancelled & Diverted' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-2">
                        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                          <p className="text-xs font-bold text-gray-700 mb-2">2. Start Job Verification</p>
                          {!item.jobStarted ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleStartJobOtp(item.id)} className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded">
                                Send Start OTP
                              </button>
                              <input 
                                type="text" 
                                placeholder="Enter 4-digit" 
                                maxLength="4"
                                value={item.startOtpInput || ""}
                                onChange={(e) => setAcceptedBookings(acceptedBookings.map(b => b.id === item.id ? { ...b, startOtpInput: e.target.value } : b))}
                                className="w-28 px-3 py-1 border border-gray-300 rounded text-xs bg-white" 
                              />
                              <button onClick={() => verifyStartOtp(item.id, item.startOtpInput)} className="bg-green-600 text-white text-xs font-bold px-3 py-2 rounded">
                                Verify
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-green-600">✔️ Job Started</span>
                          )}
                        </div>

                        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                          <p className="text-xs font-bold text-gray-700 mb-2">4. Completion Verification</p>
                          {item.jobStarted && !item.jobCompleted ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleCompleteJobOtp(item.id)} className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded">
                                Send End OTP
                              </button>
                              <input 
                                type="text" 
                                placeholder="Enter 4-digit" 
                                maxLength="4"
                                value={item.completeOtpInput || ""}
                                onChange={(e) => setAcceptedBookings(acceptedBookings.map(b => b.id === item.id ? { ...b, completeOtpInput: e.target.value } : b))}
                                className="w-28 px-3 py-1 border border-gray-300 rounded text-xs bg-white" 
                              />
                              <button onClick={() => verifyCompleteOtp(item.id, item.completeOtpInput)} className="bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded">
                                Complete
                              </button>
                            </div>
                          ) : item.jobCompleted ? (
                            <span className="text-xs font-bold text-green-600">✔️ Closed</span>
                          ) : (
                            <span className="text-xs text-gray-400">Complete Start OTP first</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SPARE PARTS LEDGER */}
                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <p className="text-xs font-bold text-gray-700 mb-2">📦 3. Spare Parts / Material Add-on Ledger</p>
                      
                      {item.addOns.length > 0 && (
                        <div className="space-y-3 mb-3">
                          <div className="flex flex-wrap gap-2">
                            {item.addOns.map((part, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded border border-blue-200 font-semibold flex items-center gap-2">
                                {part.name}: ₹{part.price}
                                {item.status !== 'Completed' && item.status !== 'Cancelled & Diverted' && (
                                  <button onClick={() => removeMaterialPart(item.id, idx)} className="text-red-500 hover:font-bold">✕</button>
                                )}
                              </span>
                            ))}
                          </div>

                          {!item.partsVerified ? (
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-700 font-bold text-xs">Trigger single OTP to customer:</span>
                                <button onClick={sendConsolidatedPartsOtp} className="bg-amber-600 text-white text-[11px] font-bold px-3 py-1.5 rounded">
                                  Send OTP
                                </button>
                              </div>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Enter OTP (9999)" 
                                  maxLength="4"
                                  value={item.partsOtpInput || ""}
                                  onChange={(e) => setAcceptedBookings(acceptedBookings.map(b => b.id === item.id ? { ...b, partsOtpInput: e.target.value } : b))}
                                  className="w-32 px-3 py-1 border border-gray-300 rounded text-xs bg-white"
                                />
                                <button onClick={() => verifyPartsOtp(item.id, item.partsOtpInput)} className="bg-black text-white text-xs font-bold px-3 py-1 rounded">
                                  Verify
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-green-600 font-bold">✔️ Spare parts bill verified with customer.</p>
                          )}
                        </div>
                      )}

                      {item.status !== 'Completed' && item.status !== 'Cancelled & Diverted' && (
                        <div className="flex gap-2 max-w-md">
                          <input 
                            type="text" 
                            placeholder="Part Name (e.g. Copper Pipe)" 
                            value={newPartName}
                            onChange={(e) => setNewPartName(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs" 
                          />
                          <input 
                            type="number" 
                            placeholder="Price (₹)" 
                            value={newPartPrice}
                            onChange={(e) => setNewPartPrice(e.target.value)}
                            className="w-24 px-3 py-1.5 border border-gray-300 rounded text-xs" 
                          />
                          <button onClick={() => addMaterialPart(item.id)} className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded">
                            Add Part
                          </button>
                        </div>
                      )}
                    </div>

                    {/* AFTER WORK PHOTO */}
                    <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 mt-4">
                      <p className="text-xs font-bold text-gray-700 mb-2">📸 Step 5: Upload After Work Photo (Mandatory before completion)</p>
                      <div className="flex items-center gap-3">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if(file) {
                              setAcceptedBookings(acceptedBookings.map(b => b.id === item.id ? { ...b, afterPhoto: file.name } : b));
                            }
                          }}
                          className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700" 
                        />
                        {item.afterPhoto && <span className="text-xs text-green-600 font-bold">✔️ {item.afterPhoto}</span>}
                      </div>
                    </div>

                    {/* FINAL TAX INVOICE & COD BALANCE COLLECTION */}
                    {item.jobCompleted && (
                      <div className="border-t-2 border-dashed border-gray-300 pt-6 mt-6 bg-amber-50/50 p-6 rounded-xl">
                        <h4 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                          <span>📄</span> Final Tax Invoice & COD Balance Collection
                        </h4>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Bill Amount:</span>
                            <span className="font-bold">₹{grandTotal}</span>
                          </div>
                          <div className="flex justify-between text-indigo-600 font-semibold">
                            <span>- Advance Paid Online:</span>
                            <span>₹{item.advanceAmount}</span>
                          </div>
                          {item.addOns.map((part, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-gray-500">
                              <span>+ {part.name}:</span>
                              <span>₹{part.price}</span>
                            </div>
                          ))}
                          <div className="flex justify-between border-t border-gray-200 pt-2 font-black text-base text-gray-900">
                            <span>Balance COD to Collect at Site:</span>
                            <span className="text-amber-700">₹{remainingCodBalance}</span>
                          </div>
                        </div>

                        {!item.billPushed ? (
                          <div>
                            <button 
                              onClick={() => pushCodBill(item.id)}
                              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold text-xs shadow-md transition w-full sm:w-auto"
                            >
                              📤 Push Final COD Bill PDF to Customer (WhatsApp & Email)
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold text-yellow-900">
                                  📄 Bill Pushed! Status: <span className="uppercase text-amber-700 font-black">{item.paymentStatus}</span>
                                </p>
                                <p className="text-[11px] text-yellow-700 mt-0.5">Collect balance ₹{remainingCodBalance} cash from customer at site.</p>
                              </div>

                              {item.paymentStatus === 'Pending COD Collection at Site' && (
                                <button 
                                  onClick={() => simulateCashCollection(item.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition whitespace-nowrap"
                                >
                                  💵 Confirm Cash Collected (Update Wallet)
                                </button>
                              )}
                            </div>

                            {item.paymentStatus.includes('Settled') && (
                              <div className="bg-green-100 border border-green-300 p-3 rounded-lg flex items-center justify-between">
                                <span className="text-xs text-green-800 font-bold">
                                  ✔️ COD Collected & Wallet Receivables / Payables Updated Successfully!
                                </span>
                                <span className="text-xs bg-white text-green-700 px-3 py-1 rounded font-black">
                                  Settled
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* TAB 2: WALLET LEDGER (RECEIVABLES & PAYABLES) */}
      {/* ======================================= */}
      {activeTab === 'wallet' && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-fade-in-up max-w-4xl">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Partner Wallet Ledger</h2>
              <p className="text-gray-500 mt-1">Track your cash collections, admin commission payables, and net receivables.</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg text-center">
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">Net Wallet Balance</p>
              <p className="text-lg text-indigo-900 font-black">₹3,450</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
              <h3 className="text-emerald-800 font-bold text-sm mb-1">Total Receivables (Cash Earned)</h3>
              <p className="text-3xl font-black text-emerald-700">₹4,200</p>
              <p className="text-xs text-emerald-600 mt-2">Cash collected from COD jobs pending settlement.</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <h3 className="text-red-800 font-bold text-sm mb-1">Total Payables (Admin Commission)</h3>
              <p className="text-3xl font-black text-red-700">₹750</p>
              <p className="text-xs text-red-600 mt-2">Admin commission share deductible from cash collections.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Ledger Transactions</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
            <div className="bg-gray-50 p-4 font-bold text-gray-700 flex justify-between border-b border-gray-200">
              <span>Transaction Details</span>
              <span>Amount</span>
            </div>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">COD Collection (#JT-101)</p>
                <p className="text-xs text-gray-500">AC Gas Refill - Cash collected at site</p>
              </div>
              <span className="font-bold text-green-600">+ ₹1,999</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">Admin Commission Deduction (Dynamic Rate)</p>
                <p className="text-xs text-gray-500">Commission fetched from service catalog</p>
              </div>
              <span className="font-bold text-red-600">- ₹360</span>
            </div>
          </div>
        </div>
      )}

      {/* MORE DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg">✕</button>
            <h3 className="text-2xl font-black text-gray-900 mb-4">{selectedLead.serviceName}</h3>
            <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6 border border-gray-200 text-sm font-medium">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Customer Name:</span>
                <span className="font-bold text-gray-900">{selectedLead.customer.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Contact Number:</span>
                <span className="font-bold text-indigo-600">{selectedLead.customer.phoneMasked}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Service Address:</span>
                <span className="font-bold text-gray-900 text-right max-w-[240px]">{selectedLead.customer.address}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Admin Commission Rate:</span>
                <span className="font-bold text-purple-700">{selectedLead.commissionRate}%</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Advance Paid Online:</span>
                <span className="font-bold text-indigo-600">₹{selectedLead.advanceAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Special Notes:</span>
                <span className="font-semibold text-gray-700 italic">{selectedLead.customer.notes}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setSelectedLead(null)} className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold">Close</button>
              <button onClick={() => { const id = selectedLead.id; setSelectedLead(null); handleAccept(id); }} className="flex-1 bg-black text-white py-3 rounded-lg font-bold">Accept Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CANCELLATION WARNING MODAL */}
      {cancellationModalBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative text-center animate-fade-in-up">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ⚠️
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Last-Minute Cancellation</h3>
            <p className="text-sm text-gray-600 mb-6 text-left bg-gray-50 p-4 rounded-xl border border-gray-200">
              If you cancel within 24 hours of the service time:
              <br/><br/>
              1. Your next 2 days of bookings may be restricted.
              <br/>
              2. Admin has the right to auto-assign your accepted order to another free partner immediately.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setCancellationModalBookingId(null)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:border-black transition"
              >
                Keep Booking
              </button>
              <button 
                onClick={confirmCancellation}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL CUSTOM NOTIFICATION POPUP */}
      {notificationMessage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-fade-in-up">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Notification</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">{notificationMessage}</p>
            <button 
              onClick={() => setNotificationMessage(null)}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* TAB 3: PROFILE & SETTINGS */}
      {/* ======================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-fade-in-up max-w-4xl relative">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Profile & Settings</h2>
              <p className="text-gray-500 mt-1">Manage your service areas, payouts, and skills.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-center flex flex-col items-center justify-center">
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wide">KYC Status</p>
                <p className="text-sm text-green-800 font-black">✔️ Verified</p>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="bg-black text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md flex items-center gap-2">
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <form className="space-y-8">
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👤</span> Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" defaultValue="Ramesh Kumar" disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing ? 'border-gray-300 focus:border-black' : 'border-transparent bg-gray-50 text-gray-700 font-semibold'}`} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                  <input type="tel" defaultValue="9876543210" disabled className="w-full px-4 py-3 border border-transparent rounded-lg bg-gray-50 text-gray-500 font-semibold cursor-not-allowed outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📍</span> Work Areas & Services
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Serviceable Stations</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedStations.map(station => (
                      <span key={station} className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-sm px-3 py-1.5 rounded-full flex items-center gap-2 font-semibold">
                        {station} 
                        {isEditing && <button type="button" onClick={() => removeStation(station)} className="hover:text-red-500 hover:bg-indigo-100 rounded-full w-4 h-4 flex items-center justify-center transition">✕</button>}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <select className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-lg outline-none transition bg-white text-gray-600">
                      <option value="">+ Add another station...</option>
                      {adminStations.map((station, i) => <option key={i} value={station}>{station}</option>)}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Special Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSkills.map(skill => (
                      <span key={skill} className="bg-gray-100 text-gray-800 border border-gray-300 text-sm px-3 py-1.5 rounded-full flex items-center gap-2 font-semibold">
                        {skill} 
                        {isEditing && <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center transition">✕</button>}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <select className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-lg outline-none transition bg-white text-gray-600">
                      <option value="">+ Add another skill...</option>
                      {adminSkills.map((skill, i) => <option key={i} value={skill}>{skill}</option>)}
                    </select>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>🪪</span> KYC & Identity Details
                </h3>
                <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">Read Only (Verified)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Aadhaar Number</label>
                  <input type="text" value="XXXX-XXXX-XXXX" disabled className="w-full px-4 py-3 border border-transparent rounded-lg bg-gray-50 text-gray-500 font-semibold cursor-not-allowed outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">PAN Card Number</label>
                  <input type="text" value="ABCDE1234F" disabled className="w-full px-4 py-3 border border-transparent rounded-lg bg-gray-50 text-gray-500 font-semibold cursor-not-allowed outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Permanent Address (As per Aadhaar)</label>
                  <textarea disabled className="w-full px-4 py-3 border border-transparent rounded-lg bg-gray-50 text-gray-500 font-semibold cursor-not-allowed outline-none resize-none h-24" value="101, Sai Darshan Society, Station Road, Pune - 411001"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Communication Address</label>
                  <textarea disabled className="w-full px-4 py-3 border border-transparent rounded-lg bg-gray-50 text-gray-500 font-semibold cursor-not-allowed outline-none resize-none h-24" value="Room 405, B Wing, Lodha Amara, Kolshet Road, Thane - 400607"></textarea>
                  
                  <div className="mt-3 flex items-start gap-2 bg-green-50 p-3 rounded-lg border border-green-100">
                    <span className="text-green-600 text-lg">📄</span>
                    <div>
                      <p className="text-xs font-bold text-green-800">Supporting Document Verified</p>
                      <p className="text-[11px] text-green-600 mt-0.5">Rent Agreement & Landlord Electricity Bill uploaded on 12-Oct-2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏦</span> Bank Details (For Payouts)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name as per Bank Passbook</label>
                  <input type="text" defaultValue="Ramesh S. Kumar" disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing ? 'border-gray-300 focus:border-black' : 'border-transparent bg-gray-50 text-gray-700 font-semibold'}`} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">IFSC Code</label>
                  <input type="text" defaultValue="HDFC0001234" disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg outline-none transition uppercase ${isEditing ? 'border-gray-300 focus:border-black' : 'border-transparent bg-gray-50 text-gray-700 font-semibold'}`} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Account Number</label>
                  <input type={isEditing ? "text" : "password"} defaultValue="1234567890" disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg outline-none transition ${isEditing ? 'border-gray-300 focus:border-black' : 'border-transparent bg-gray-50 text-gray-700 font-semibold'}`} />
                </div>
                {isEditing && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-bold text-red-600 mb-2">Confirm Account Number *</label>
                    <input type="text" placeholder="Re-enter account number" className="w-full px-4 py-3 border border-red-300 focus:border-red-500 rounded-lg outline-none transition bg-red-50" />
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg animate-fade-in-up mt-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Upload Cancelled Cheque / Passbook Copy</label>
                  <p className="text-xs text-gray-600 mb-3">Required to verify changes in payout details.</p>
                  <input type="file" accept="image/*,.pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 transition" />
                </div>
              )}
            </div>

            {isEditing && (
              <div className="pt-8 border-t border-gray-200 flex justify-end gap-4 animate-fade-in-up">
                <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button type="button" onClick={handleSaveClick} className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-md">
                  Verify & Submit
                </button>
              </div>
            )}
          </form>

          {showOtpModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Enter OTP</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">
                  We've sent an OTP to confirm these changes.
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  {[1, 2, 3, 4].map((digit) => (
                    <input key={digit} type="text" maxLength="1" className="w-14 h-14 border border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-black focus:ring-1 focus:ring-black outline-none transition" />
                  ))}
                </div>
                <button onClick={handleOtpVerify} className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition mb-3">
                  Verify & Send for Approval
                </button>
                <button onClick={() => setShowOtpModal(false)} className="text-gray-500 font-semibold text-sm hover:text-black">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
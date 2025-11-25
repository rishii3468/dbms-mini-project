import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
const ContractFarmingPlatform = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');


  const handleApplyClick = () => {
    navigate('/coming-soon');
  };

  const companies = [
    {
      id: 1,
      name: "ITC Limited",
      location: "Pan India",
      contracts: [
        {
          id: 1,
          crop: "Potato",
          duration: "6 months",
          price: "₹25,000/acre",
          minArea: "5 acres",
          description: "Premium potato variety for chips manufacturing. Seeds and technical support provided.",
          benefits: "Seeds provided, Technical support, Guaranteed buyback"
        },
        {
          id: 2,
          crop: "Wheat",
          duration: "4 months",
          price: "₹28,000/acre",
          minArea: "10 acres",
          description: "High-quality wheat for flour production. Premium seeds and fertilizer support included.",
          benefits: "Premium seeds, Fertilizer subsidy, Storage facility"
        }
      ],
      phone: "033-22889371",
      email: "contracts@itc.in"
    },
    {
      id: 2,
      name: "Reliance Fresh",
      location: "Maharashtra, Gujarat, Haryana",
      contracts: [
        {
          id: 3,
          crop: "Tomato",
          duration: "5 months",
          price: "₹35,000/acre",
          minArea: "3 acres",
          description: "Fresh tomatoes for retail stores. Daily pickup from farm with modern farming support.",
          benefits: "Hybrid seeds, Drip irrigation setup, Daily pickup"
        },
        {
          id: 4,
          crop: "Bell Pepper",
          duration: "6 months",
          price: "₹45,000/acre",
          minArea: "2 acres",
          description: "High-value bell peppers for premium retail. Greenhouse cultivation support available.",
          benefits: "Protected cultivation, Premium pricing, Training programs"
        }
      ],
      phone: "1800 102 7382",
      email: "farming@reliancefresh.com"
    },
    {
      id: 3,
      name: "Godrej Agrovet",
      location: "Karnataka, Tamil Nadu, Andhra Pradesh",
      contracts: [
        {
          id: 5,
          crop: "Oil Palm",
          duration: "25 years",
          price: "₹75,000/acre + ₹8/kg fruit",
          minArea: "5 acres",
          description: "Long-term oil palm cultivation with plantation setup and fruit procurement guarantee.",
          benefits: "Plantation setup, Long-term contract, Processing facility"
        },
        {
          id: 6,
          crop: "Turmeric",
          duration: "10 months",
          price: "₹40,000/acre",
          minArea: "2 acres",
          description: "Premium turmeric for spice processing and export with organic certification support.",
          benefits: "Quality seeds, Organic certification, Export opportunities"
        }
      ],
      phone: "+91-22-2518 8010",
      email: "contracts@godrejagrovet.com"
    },
    {
      id: 4,
      name: "Mahindra Agribusiness",
      location: "Punjab, Haryana, Uttar Pradesh",
      contracts: [
        {
          id: 7,
          crop: "Basmati Rice",
          duration: "4 months",
          price: "₹35,000/acre",
          minArea: "8 acres",
          description: "Premium Basmati rice for export markets. Complete farming support with machinery.",
          benefits: "Premium seeds, Machinery support, Export quality"
        },
        {
          id: 8,
          crop: "Sugarcane",
          duration: "12 months",
          price: "₹65,000/acre",
          minArea: "15 acres",
          description: "Sugarcane cultivation with direct mill connection and transport support.",
          benefits: "Mill linkage, Transport included, Advance payments"
        }
      ],
      phone: "18002096006",
      email: "agribusiness@mahindra.com"
    },
    {
      id: 5,
      name: "Spencer's Retail",
      location: "West Bengal, Odisha, Assam",
      contracts: [
        {
          id: 9,
          crop: "Cauliflower",
          duration: "4 months",
          price: "₹30,000/acre",
          minArea: "3 acres",
          description: "Fresh cauliflower for retail with cold storage and regular pickup support.",
          benefits: "Cold storage, Regular pickup, Quality premium"
        },
        {
          id: 10,
          crop: "Green Peas",
          duration: "3 months",
          price: "₹38,000/acre",
          minArea: "2 acres",
          description: "Green peas for fresh and frozen products with processing unit support.",
          benefits: "Processing unit, Value addition, Technical training"
        }
      ],
      phone: "1800 103 0134",
      email: "procurement@spencersretail.com"
    }
  ];

  const allContracts = companies.flatMap(company => 
    company.contracts.map(contract => ({
      ...contract,
      companyName: company.name,
      companyLocation: company.location,
      companyPhone: company.phone,
      companyEmail: company.email
    }))
  );

  const filteredContracts = allContracts.filter(contract => 
    searchTerm === '' || 
    contract.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🌱</span>
                <h1 className="text-2xl font-bold text-green-700">AgriMitra</h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contracts</h2>
          <p className="text-gray-600 max-w-3xl">
            Contract farming is an agreement between farmers and companies where the company provides seeds, 
            technical support, and guaranteed purchase of crops at predetermined prices. This helps farmers 
            reduce risks and get better income for their produce.
          </p>
        </div>

        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by crop or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        </div>

        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Available Contracts</h3>
        </div>

        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{contract.crop}</h4>
                <p className="text-sm text-green-600 font-medium">{contract.companyName}</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {contract.companyLocation}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-semibold">{contract.price}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span>{contract.duration}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Minimum area: </span>
                  <span className="font-medium">{contract.minArea}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {contract.description}
              </p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-800 mb-2">What you get:</p>
                <p className="text-sm text-gray-600">{contract.benefits}</p>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{contract.companyPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{contract.companyEmail}</span>
                </div>
              </div>

              <button 
                onClick={handleApplyClick}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Apply for Contract
              </button>
            </div>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No contracts found matching your search.</p>
          </div>
        )}
      </main>

      



      
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold">AgriMitra</span>
            </div>
            <p className="text-gray-400">&copy; 2025 AgriMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContractFarmingPlatform;

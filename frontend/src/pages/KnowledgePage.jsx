import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";

const knowledgeData = [
  {
    id: 1,
    title: "Farmer Mental Health Support",
    description:
      "24/7 helpline and counseling services for farmers facing stress, depression, or suicidal thoughts. Professional mental health support.",
    category: "Mental Health",
    link: "https://dackkms.gov.in/account/login.aspx"
  },
  {
    id: 2,
    title: "Rice Cultivation in Kharif Season",
    description:
      "Best practices for growing rice from June to November. Investment: ₹25,000-30,000 per acre. Suitable for clay and loamy soils.",
    category: "Kharif Crops",
    link: "https://www.apnikheti.com/en/pn/agriculture/crops/cereals/rice"
  },
  {
    id: 3,
    title: "Wheat Farming in Rabi Season",
    description:
      "Complete guide to wheat cultivation from November to April. Investment: ₹20,000-25,000 per acre. Good for sandy loam soil.",
    category: "Rabi Crops",
    link: "https://apeda.gov.in/Wheat"
  },
  {
    id: 4,
    title: "Tomato Growing Year-Round",
    description:
      "Seasonal tomato cultivation techniques for maximum yield. Investment: ₹40,000-50,000 per acre. Needs well-drained fertile soil.",
    category: "Vegetables",
    link: "https://www.apnikheti.com/en/pn/agriculture/horticulture/vegetable-crops/tomato"
  },
  {
    id: 5,
    title: "Maize Cultivation Guide",
    description:
      "Growing corn for both Kharif and Rabi seasons. Investment: ₹15,000-20,000 per acre. Works with sandy loam to clay loam soils.",
    category: "Cereals",
    link: "https://www.farmatma.in/maize-cultivation/"
  },
  {
    id: 6,
    title: "Cotton Farming in Black Soil",
    description:
      "Cotton cultivation from May to July in peninsular India. Investment: ₹35,000-45,000 per acre. Best for black cotton soil.",
    category: "Cash Crops",
    link: "https://www.nfsm.gov.in/BriefNote/BN_Cotton.pdf"
  },
  {
    id: 7,
    title: "Potato Cultivation in Winter",
    description:
      "Growing potatoes from October to February in North India. Investment: ₹50,000-60,000 per acre. Needs loose, well-drained soil.",
    category: "Vegetables",
    link: "https://agriculture.vikaspedia.in/viewcontent/agriculture/crop-production/package-of-practices/vegetables-1/potato?lgn=en"
  },
  {
    id: 8,
    title: "Chickpea Farming",
    description:
      "Chickpea cultivation in Rabi season. Investment: ₹12,000-18,000 per acre. Grows well in clay loam and sandy loam soils.",
    category: "Pulses",
    link: "https://www.nextias.com/blog/pulses-in-india/"
  },
  {
    id: 9,
    title: "PM-Kisan Yojana Benefits",
    description:
      "Direct income support scheme providing ₹6,000 annually to farmers. Learn about eligibility and registration process.",
    category: "Government Schemes",
    link: "https://pmkisan.gov.in/"
  },
  {
    id: 10,
    title: "Agricultural Loan Schemes",
    description:
      "Easy access to credit through Kisan Credit Cards and crop loans. Learn about interest subsidies and repayment options.",
    category: "Government Schemes",
    link: "https://www.nabard.org/content1.aspx?id=23&catid=23&mid=530"
  },
  {
    id: 11,
    title: "Fertilizer Management Guide",
    description:
      "Complete guide to fertilizer selection and application methods. Learn about NPK ratios and organic fertilizers.",
    category: "Fertilizers",
    link: "https://fertiliserindia.com/"
  },
  {
    id: 12,
    title: "Organic Fertilizer Application",
    description:
      "Sustainable fertilizer practices using compost and bio-fertilizers. Reduce chemical dependency while maintaining soil health.",
    category: "Fertilizers",
    link: "https://fertiliserindia.com/"
  }
];

const categories = ["All", "Mental Health", "Kharif Crops", "Rabi Crops", "Vegetables", "Cereals", "Cash Crops", "Pulses", "Government Schemes", "Fertilizers"];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = knowledgeData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                         item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to={'/'}>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🌱</span>
                <h1 className="text-2xl font-bold text-green-700">AgriMitra</h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">The Knowledge Hub</h2>
          
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search farming topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600">
            {filteredData.length} resources found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {item.title}
                </h2>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <button 
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Read More
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-sm mx-auto">
                <p className="text-gray-500 mb-4">No resources found</p>
                <button 
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
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
}

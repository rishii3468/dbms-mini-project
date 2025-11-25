import { Link } from "react-router";

export default function AboutPage() {
  const teamMembers = [
    { name: "Rishi I"  },
    { name: "SV Vaishnav" },

  ];

  const impactStats = [
    { number: "50,000+", label: "Farmers Connected" },
    { number: "2,500+", label: "Verified Buyers" },
    { number: "₹10 Cr+", label: "Transactions Facilitated" },
    { number: "15+", label: "States Covered" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-2 sm:py-0">
            <div className="flex items-center mb-2 sm:mb-0">
              <Link to={'/'}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">🌱</span>
                  </div>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">
                    AgriMitra
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">

            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
            About AgriMitra
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between farmers and buyers through technology, 
            creating sustainable agricultural ecosystems for everyone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <section className="mb-16 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  At AgriMitra, we envision a world where every farmer has direct access to 
                  fair markets, cutting-edge agricultural knowledge, and sustainable income opportunities.
                </p>
                <p>
                  We believe that by connecting farmers directly with buyers, we can ensure 
                  better prices for producers, fresher products for consumers, and a more 
                  transparent, efficient agricultural ecosystem that benefits everyone involved.
                </p>
                <p>
                  Through our platform, we're not just facilitating transactions – we're 
                  building communities, sharing knowledge, and creating pathways for 
                  sustainable agricultural growth across India and beyond.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-green-100 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-5xl sm:text-6xl mb-4">🌱</div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">
                  Empowering Agriculture
                </h3>
                <p className="text-green-700 text-sm sm:text-base">
                  Connecting farmers directly to markets, ensuring fair prices and fresh produce for all.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="mb-16 lg:mb-20 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why We Started
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: "💔", title: "The Problem", desc: "Farmers struggling with middlemen taking unfair cuts, leaving hardworking cultivators with minimal profits despite growing quality crops." },
              { icon: "💡", title: "The Solution", desc: "Technology bridges the gap – creating a platform where farmers showcase produce and connect with verified buyers instantly." },
              { icon: "🚀", title: "The Impact", desc: "A thriving ecosystem where farmers earn more, buyers get fresher produce, and communities grow stronger together." }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-gray-100 w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our passionate team of innovators, technologists, and agriculture enthusiasts 
            working together to revolutionize farming communities.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl text-white font-bold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium text-sm sm:text-base mb-4">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Leaf, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import api from "../lib/axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifiedFarmerForm = () => {
  const location = useLocation();
  const equipmentId = location.state?.equipmentId;
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 0,
      title: "Equipment Name",
      question: "Enter the name/model of your equipment",
      type: "text",
      placeholder: "e.g., John Deere 5075E Tractor, Mahindra 575 DI",
      condition: "Please provide the complete equipment name or model",
      required: true
    },
    {
      id: 1,
      title: "Serial Number / Unique ID",
      question: "Enter the product's serial number (if available)",
      type: "text",
      placeholder: "e.g., ABC123456789",
      condition: "Alphanumeric format required",
      required: true
    },
    {
      id: 2,
      title: "Safety Standards",
      question: "Does your product comply with BIS/ISI/ISO or relevant certification standards?",
      type: "radio",
      options: ["Yes", "No"],
      required: true
    },
    {
      id: 3,
      title: "Usage Type & Condition",
      question: "Enter your equipment age and select current working condition",
      type: "combined",
      conditionOptions: ["Excellent", "Good", "Fair", "Poor"],
      condition: "Age must be less than 10 years with Good/Excellent condition",
      required: true
    },
    {
      id: 4,
      title: "Environmental Compliance",
      question: "Does your product follow eco-friendly practices?",
      type: "radio",
      options: ["Yes", "No"],
      required: true
    },
    {
      id: 5,
      title: "Warranty & Service Availability",
      question: "Is your equipment under warranty or supported by authorized service?",
      type: "warranty",
      options: ["Yes - Under warranty", "Yes - Service available", "No"],
      condition: "Warranty/Service support affects certification level",
      required: true
    }
  ];

  const handleSubmit = async () => {
    
    if (!canSubmit) return;


    const safety = answers[2]?.main === "Yes";
    const age = Number(answers[1]?.age || 0);
    const condition = answers[1]?.condition;
    const envCompliance = answers[2]?.main === "Yes";
    const warrantyService = answers[3]?.main !== "No";
    const token = localStorage.getItem("accessToken");
    const verification = {
      age,
      name: answers[0]?.main,
      serialNumber: answers[1]?.main,
    }
    if (safety && age < 10 && condition !== "Poor" && envCompliance && warrantyService) {
      try {
        
        await api.put(`/equipments/${equipmentId}`, { verified: true }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await api.post(`/verify`, verification, equipmentId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Equipment verified successfully!");
        navigate("/equipment"); 
      } catch (error) {
        toast.error("Failed to update verification status.");
        console.error(error);
      }
    } else {
      toast.error("Equipment does not meet verification criteria.");
    }
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const handleAnswerChange = (questionId, value, field = 'main') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const getValidationStatus = (questionId) => {
    const answer = answers[questionId];
    if (!answer) return 'pending';

    switch (questionId) {
      case 0:
        return answer.main && answer.main.trim().length >= 3 ? 'valid' : 'invalid';
      case 1:
        return answer.main && /^[A-Za-z0-9]+$/.test(answer.main) ? 'valid' : 'invalid';
      case 2:
        return answer.main === 'Yes' || answer.main === 'No' ? 'valid' : 'invalid';
      case 3:
        const isConditionGood = ['Excellent', 'Good'].includes(answer.condition);
        const isAgeValid = answer.age && !isNaN(answer.age) && answer.age <= 10;
        return isConditionGood && isAgeValid ? 'valid' : 'invalid';
      case 4:
        return answer.main === 'Yes' || answer.main === 'No' ? 'valid' : 'invalid';
      case 5:
        return answer.main !== 'No' ? 'valid' : 'limited';
      default:
        return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'invalid':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'limited':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const renderQuestionContent = (question) => {
    const answer = answers[question.id] || {};

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={question.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={answer.main || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        );

      case 'radio':
        return (
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer.main === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'combined':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Age</label>
              <input
                type="number"
                min="0"
                max="99"
                placeholder="Enter age in years"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={answer.age || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value, 'age')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Condition</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={answer.condition || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value, 'condition')}
              >
                <option value="">Select condition...</option>
                {question.conditionOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'warranty':
        return (
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer.main === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}

            {answer.main && answer.main !== 'No' && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter warranty duration or service details"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={answer.duration || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value, 'duration')}
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canSubmit = questions.every(q => {
    const status = getValidationStatus(q.id);
    return status === 'valid' || status === 'limited';
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Equipment</h1>
            <p className="text-gray-600">Complete the certification process to gain buyer trust</p>
          </div>
        </div>

        
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isOpen = openQuestion === question.id;
            const status = getValidationStatus(question.id);

            return (
              <div key={question.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-green-600 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{question.title}</h3>
                        <p className="text-gray-600 text-sm">{question.question}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(status)}
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4">
                      {question.condition && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Condition:</strong> {question.condition}
                          </p>
                        </div>
                      )}

                      {renderQuestionContent(question)}

                      {status === 'invalid' && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-800">
                            This answer does not meet the certification requirements.
                          </p>
                        </div>
                      )}

                      {status === 'limited' && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            This will result in "Verified – Limited" status.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${canSubmit
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {canSubmit ? 'Submit for Verification' : 'Complete All Questions to Continue'}
          </button>


        </div>
      </div>
    </div>
  );
};

export default VerifiedFarmerForm;
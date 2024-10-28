import { Button } from "flowbite-react";
import reg1 from '../assets/images/reg-1.png';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import casteData from "../data/casteData.js";

export default function Register_1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    dob: '',
    caste: '',
    language: 'Tamil',
    email: '',
    password: '',
  });
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const data = location.state || {};

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const langSet = new Set(); 

        countries.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(lang => langSet.add(lang));
          }
        });
        setLanguages([...langSet].sort());

      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        name: data.name,
        gender: data.gender,
        phone: data.phone
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });

    // clear error if user types
    setErrors({
      ...errors,
      [e.target.id]: ''
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!formData.dob || formData.dob === '') {
      newError.dob = '* Mention your Date of Birth'
    } 
    if (!formData.caste || formData.caste === '') {
      newError.caste = '* Select appropriate caste'
    }
    if (!formData.email || formData.email === '') {
      newError.email = '* email is required'
    }
    if (!formData.password || formData.password === '') {
      newError.password = '* password is required'
    }
    if (formData.name.toLowerCase() === formData.password.toLocaleLowerCase()) {
      newError.samePass = 'Password should not be same as Name'
    }

    if (Object.keys(newError).length > 0) {
      setErrors(newError);
    } else {
      navigate('/register/details-track-2', {state: formData})
    }
  } 

  return (
    <div className="flex justify-center items-center md:min-h-screen md:bg-gray-100 mt-5 md:mt-0 p-3 sm:p-10">
      <div className="bg-white md:shadow-lg md:rounded-lg flex md:gap-10 max-w-6xl">
        {/* Left Side */}
        <div className="bg-[#E1D6F3] p-6 hidden flex-col justify-center items-center w-1/3 md:flex">
          <div className="text-center">
            <img src={reg1} alt="" className="w-1/2 mx-auto filter invert" />
            <p className="text-3xl font-thin mt-7">
              Your search for a worthy companion for your (daughter) begins here
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:p-8 w-full md:w-1/2 md:flex-1 md:pr-10">
          <div className="text-right text-gray-600 mb-4 text-sm sm:text-base">
            <span>Great! You have completed </span>
            <span className="text-xl font-bold">20%</span>
          </div>
          <p className="hidden md:inline text-sm sm:text-2xl text-gray-700">Tell us about your (daughter)'s basic details</p>
          <p className="md:hidden text-lg sm:text-2xl text-gray-700">Please provide us with your basic details</p>

          <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm sm:text-base">Date Of Birth</label>
              <input onChange={handleChange} type="date" id="dob" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500 uppercase" />
              {errors && <p className="text-xs text-red-600 mt-2">{errors.dob}</p>}
            </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base">Caste</label>
                <select onChange={handleChange} id="caste" className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500">
                  <option value="" className='text-gray-600'>Select</option>
                  {casteData.map((caste, index) => (
                    <option key={index} value={caste.value} className="text-gray-500">{caste.label}</option>
                  ))}
                  <option value='nocaste' className="text-gray-500">Don't wise to specify</option>
                </select>
                {errors && <p className="text-xs text-red-600 mt-2">{errors.caste}</p>}
              </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Mother Tongue</label>
              <select onChange={handleChange} id="language" value={formData.language} className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500">
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Email ID</label>
              <input onChange={handleChange} type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" placeholder="Enter email" />
              {errors && <p className="text-xs text-red-600 mt-2">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Password</label>
              <input onChange={handleChange} type="password" id="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" placeholder="Enter password" />
              {errors && <p className="text-xs text-red-600 mt-2">{errors.password}</p>}
              {errors && <p className="text-xs text-red-600 mt-2">{errors.samePass}</p>}
            </div>

            <Button type="submit" gradientMonochrome="pink" className="w-full mt-6" size="lg">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

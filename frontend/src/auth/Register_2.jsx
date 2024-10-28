import { Button } from "flowbite-react";
import reg2 from '../assets/images/reg2.png';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import height from "../data/heightData";
import netWorth from "../data/netWorth"

export default function Register_2() {

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    maritalStatus: '',
    noOfChildren: '',
    childrenWithMe: '',
    height: '',
    familyStatus: '',
    familyNetworth: '',
    familyType: 'joint',
    familyValues: '',
    disability: 'none'
  });
  const [error, setError] = useState({})

  const data = location.state || {};

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        ...data
      })
    }
  },[data]);

  const handleMaritalStatus = (status) => {
    setFormData({
      ...formData,
      maritalStatus: status,
      noOfChildren: status === 'Never Married' ? '' : formData.noOfChildren,
      childrenWithMe: status === 'Never Married' ? '' : formData.childrenWithMe,
    });

    setError({
      ...error,
      mStatus: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!formData.maritalStatus) {
      newError.mStatus = '* Must choose marital status'
    }
    if (!formData.height) {
      newError.height = '* Select height'
    }
    if (!formData.familyStatus) {
      newError.fStatus = '* Choose family status'
    }
    if (!formData.familyValues) {
      newError.fValues = '* Choose family values'
    }
    if (formData.maritalStatus && formData.maritalStatus != 'Never Married' && !formData.noOfChildren) {
      newError.noChild = '* Please select details of children from previous marriage'
    }
    if (formData.maritalStatus && formData.maritalStatus != 'Never Married' && formData.noOfChildren && formData.noOfChildren != 'none' && !formData.childrenWithMe) {
      newError.childWithMe = '* Please select children status'
    }
    if (formData.familyStatus === 'Rich/Affluent' && !formData.familyNetworth) {
      newError.fNetWorth = '* Please select family networth'
    }

    if (Object.keys(newError).length > 0) {
      setError(newError)
    } else {
      navigate('/register/details-track-3', {state: formData});
    }
  }
  
  return (
    <div className="flex justify-center items-center md:min-h-screen md:bg-gray-100 mt-5 md:mt-0 p-3 sm:p-10">
      <div className="bg-white md:shadow-lg md:rounded-lg flex md:gap-10 max-w-6xl">
        {/* Left Side */}
        <div className="bg-[#E1D6F3] p-6 hidden flex-col justify-center items-center w-1/3 md:flex">
          <div className="text-center">
            <img src={reg2} alt="" className="w-1/2 mx-auto filter invert"/>
            <p className="text-3xl font-thin mt-7">
              Not only a good career, or handsome. Most importantly - deserving of your (sister)!
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:p-8 w-full md:w-1/2 md:flex-1 md:pr-10">
          <div className="text-right text-gray-600 mb-4 text-sm sm:text-base">
            <span>Great! You have completed </span>
            <span className="text-xl font-bold">40%</span>
          </div>
          <p className="hidden md:inline text-sm sm:text-2xl text-gray-700">Tell us about your (daughter)'s personal details</p>
          <p className="md:hidden text-lg sm:text-2xl text-gray-700">Personal details get you the right matches</p>

          <form className="space-y-5 mt-7" onSubmit={handleSubmit}>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Marital Status</label>
              <div className="flex gap-4 flex-wrap">
                {['Never Married', 'Widowed', 'Divorced', 'Awaiting Divorce'].map((status) => (
                  <button onClick={() => handleMaritalStatus(status)} type="button" className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base ${formData.maritalStatus === status ? 'bg-[#ffdbf7] border-pink-500' : ''}`} key={status} >
                    {status}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-600 mt-2">{error.mStatus}</p>}
            </div>
            
            {formData.maritalStatus && formData.maritalStatus != 'Never Married' && (
              <div>
                <p className="text-green-700">Choose to believe in second chances</p>
                <label className="block mb-1 text-sm sm:text-base">No. of Children</label>
                <div className="flex gap-4 flex-wrap">
                  {['none', 1, 2, 3, 'above 4'].map((status) => (
                    <button className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base capitalize ${formData.noOfChildren === status ? 'bg-[#ffdbf7] border-pink-500' : ''}`} key={status} type="button"
                      onClick={() => {
                        setFormData({ 
                          ...formData, 
                          noOfChildren: status,
                          childrenWithMe: status === 'none' ? '' : formData.childrenWithMe  
                        });
                        setError({...error, noChild: ''})
                      }} 
                    > 
                      {status}
                    </button>
                  ))}               
                </div>
                {error && <p className="text-xs text-red-600 mt-2">{error.noChild}</p>}
              </div>
            )}

            {formData.noOfChildren && formData.noOfChildren != 'none' && (
              <div className="flex gap-4 flex-wrap">
                  <button className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base ${formData.childrenWithMe === 'true' ? 'bg-[#ffdbf7] border-pink-500' : ''}`} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        childrenWithMe: 'true'
                      });
                      setError({ ...error, childWithMe: '' });
                    }}
                  >
                    Children living with me
                  </button>
                  <button className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base ${formData.childrenWithMe === 'false' ? 'bg-[#ffdbf7] border-pink-500' : ''}`} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        childrenWithMe: 'false'
                      });
                      setError({ ...error, childWithMe: '' });
                    }}
                  >
                    Children not living with me
                  </button>
                  {error && <p className="text-xs text-red-600">{error.childWithMe}</p>}
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm sm:text-base">Height</label>
              <select className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" 
                onChange={(e) => {
                  setFormData({ ...formData, height: e.target.value }),
                  setError({ ...error, height: '' })
                }}
              >
                <option value=''>Feet / Inches</option>
                {height && height.map((h, index) => (
                  <option value={h} key={index}>{h}</option>
                ))}
              </select>
              {error && <p className="text-xs text-red-600 mt-2">{error.height}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Family Status</label>
              <div className="flex gap-4 flex-wrap">
                {['Middle class', 'Upper middle class', 'High class', 'Rich/Affluent'].map((status) => (
                  <button key={status} className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base ${formData.familyStatus === status ? 'bg-[#ffdbf7] border-pink-500' : ''}`} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        familyStatus: status,
                        familyNetworth: status !== 'Rich/Affluent' ? '' : formData.familyNetworth
                      });
                      setError({ ...error, fStatus: '' })
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-600 mt-2">{error.fStatus}</p>}
            </div>

            {formData.familyStatus && formData.familyStatus === 'Rich/Affluent' && (
              <div>
                <label className="block mb-1 text-sm sm:text-base">Family Networth</label>
                <select className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500"
                  onChange={(e) => {
                    setFormData({ ...formData, familyNetworth: e.target.value})
                    setError({ ...error, fNetWorth: '' })
                  }}>
                  <option value=''>Select</option>
                  {netWorth && netWorth.map((net, index) => (
                    <option value={net.value} key={index}>{net.label} - {net.value}</option>
                  ))}
                </select>
                {error && <p className="text-xs text-red-600 mt-2">{error.fNetWorth}</p>}
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm sm:text-base">Family Type</label>
              <div className="flex gap-4 flex-wrap">
                {['joint', 'nuclear'].map((type) => (
                  <button key={type} className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base capitalize ${formData.familyType === type ? 'bg-[#ffdbf7] border-pink-500' : ''}`} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        familyType: type
                      });
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Family Values</label>
              <div className="flex flex-wrap gap-4">
                {['orthodox', 'traditional', 'moderate', 'liberal'].map((values) => (
                  <button className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base capitalize ${formData.familyValues === values ? 'bg-[#ffdbf7] border-pink-500' : ''}`} key={values} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        familyValues: values
                      });
                      setError({ ...error, fValues: '' })
                    }}
                  >
                    {values}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-600 mt-2">{error.fValues}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Any Disability</label>
              <div className="flex flex-wrap gap-4">
                {['none', 'physically challenged'].map((disability) => (
                  <button className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base capitalize ${formData.disability === disability ? 'bg-[#ffdbf7] border-pink-500' : ''}`} key={disability} type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        disability: disability
                      })
                    }}>{disability}</button>
                ))}
              </div>
            </div>

            <Button type="submit" gradientMonochrome="pink" className="w-full mt-6" size="lg" >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
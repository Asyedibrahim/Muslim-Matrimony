import { Button } from "flowbite-react";
import reg3 from '../assets/images/reg3.png';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import customStyles from '../assets/scripts/customStyle.js';
import currencies from "../data/currency.js";

export default function Register_3() {

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    degree: '',
    employedIn: '',
    occupation: '',
    currentLocation: '',
    annualIncome: '',
    state: '',
    city: ''
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState({});

  const data = location.state || {};

  // Load Previous data
  useEffect(() => {
    setCountries(Country.getAllCountries());
    setFormData({
      ...formData,
      ...data
    });
  }, [data]);

  const handleCountryChange = (selectedOption) => {
    const countryCode = selectedOption?.value;
    const selectedCountry = countries.find((country) => country.isoCode === countryCode);

    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode)); // Load states for selected country
      setFormData({ ...formData, currentLocation: selectedCountry.name, state: '', city: '' });
      setCities([]); // Reset cities when country changes
    }
  };

  const handleStateChange = (selectedOption) => {
    const stateCode = selectedOption?.value;
    const selectedState = states.find((state) => state.isoCode === stateCode);

    if (selectedState) {
      setCities(City.getCitiesOfState(selectedState.countryCode, stateCode)); // Load cities for selected state
      setFormData({ ...formData, state: selectedState.name, city: '' });
    }
  };

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption?.value });
  };

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const stateOptions = states.map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  const [currency, setCurrency] = useState(currencies[62].code);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
      setCurrency(selectedCurrency);
      setFormData(prevFormData => ({
        ...prevFormData,
        annualIncome: `${prevFormData.annualIncome.split(' ')[0]} ${selectedCurrency}`
      }));
  }

  const handleIncomeChange = (e) => {
    const income = e.target.value;
    const combineIncome = income + " " + currency; 
    setFormData({...formData, annualIncome: combineIncome});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!formData.degree) {
      newError.degree = '* Please choose Education'
    }
    if (!formData.employedIn) {
      newError.empIn = '* Must pick one sector'
    }
    if (formData.employedIn && formData.employedIn != 'Not working' && !formData.annualIncome) {
      newError.income = '* Income is empty'
    }
    if (formData.employedIn != 'Not working' && !formData.occupation) {
      newError.occ = '* Enter occupation'
    }
    if (!formData.currentLocation) {
      newError.location = '* Chooose Location'
    }

    if (Object.keys(newError).length > 0 ) {
      setError(newError)
    } else {
      navigate('/register/details-track-4', { state: formData })
    }

  }

  console.log(formData);
  
  return (
    <div className="flex justify-center items-center md:min-h-screen md:bg-gray-100 mt-5 md:mt-0 p-3 sm:p-10">
      <div className="bg-white md:shadow-lg md:rounded-lg flex md:gap-10 max-w-6xl">
        {/* Left Side */}
        <div className="bg-[#E1D6F3] p-6 hidden flex-col justify-center items-center w-1/3 md:flex">
          <div className="text-center">
            <img src={reg3} alt="" className="w-1/2 mx-auto filter invert" />
            <p className="text-3xl font-thin mt-7">
              Find someone who is generous for a lifetime
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:p-8 w-full md:w-1/2 md:flex-1 md:pr-10">
          <div className="text-right text-gray-600 mb-4 text-sm sm:text-base">
            <span>Great! You have completed </span>
            <span className="text-xl font-bold">80%</span>
          </div>
          <p className="hidden md:inline text-sm sm:text-2xl text-gray-700">Professional details help us to find the best companion</p>
          <p className="md:hidden text-lg sm:text-2xl text-gray-700">Professional details help you get relevant matches</p>

          <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
            {/* Highest Education */}
            <div>
              <label className="block mb-1 text-sm sm:text-base">Highest Education</label>
              <select 
                className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" 
                value={formData.degree} 
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              >
                <option>Select</option>
                <option>Bachelor's</option>
                <option>Master's</option>
                <option>PhD</option>
              </select>
              {error && <p className="text-xs text-red-600 mt-2">{error.degree}</p>}
            </div>

            {/* Employed In */}
            <div>
              <label className="block mb-1 text-sm sm:text-base">Employed in</label>
              <div className="flex gap-4 flex-wrap">
                {['Government/PSU', 'Private Business', 'Defence', 'Self Employed', 'Not working'].map((sector) => (
                  <button 
                    className={`border px-3 py-2 text-gray-600 hover:bg-[#ffdbf7] hover:border-pink-500 text-xs sm:text-base ${formData.employedIn === sector ? 'bg-pink-200 border-pink-500' : ''}`} 
                    key={sector} type="button"
                    onClick={() => {
                      setFormData({ 
                        ...formData, 
                        employedIn: sector,
                        annualIncome: sector === 'Not working' ? '' : formData.annualIncome,
                        occupation: sector === 'Not working' ? '' : formData.occupation
                      })
                    }}
                  >
                    {sector}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-600 mt-2">{error.empIn}</p>}
            </div>

            {/* Occupation */}
            <div>
              <label className="block mb-1 text-sm sm:text-base">Occupation</label>
              <input className="w-full border border-gray-300 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500 disabled:cursor-not-allowed" onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              placeholder="Enter Occupation" type="text" value={formData.employedIn === 'Not working' ? 'Not working' : formData.occupation} disabled={formData.employedIn === 'Not working'}/>
              {error && <p className="text-xs text-red-600 mt-2">{error.occ}</p>}          
            </div>

            {/* Annual Income */}
            {formData.employedIn && formData.employedIn != 'Not working' && (
              <div>
                <label className="block mb-1 text-sm sm:text-base">Annual Income</label>
                <div className="flex items-center gap-4">
                  <select 
                    className="border w-28 border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" 
                    onChange={handleCurrencyChange}
                    value={currency}
                  >
                    {currencies.map((curreny) => (
                      <option key={curreny.code} value={curreny.code}>{curreny.code}</option>
                    ))}
                  </select>

                  <input 
                    className="w-full border border-gray-300 text-gray-600 rounded px-3 py-2 focus:border-pink-500 focus:ring-pink-500" 
                    type="text"
                    onChange={handleIncomeChange}
                    placeholder="Enter Income"
                  />
                </div>
                {error && <p className="text-xs text-red-600 mt-2">{error.income}</p>}
            </div>
            )}

            {/* Work Location with Autocomplete */}
            <div>
              {formData.employedIn === 'Not working' ? (
                <label className="block mb-1 text-sm sm:text-base">{`${formData.gender === 'male' ? 'Groom' : 'Bride'}'s current Location`}</label>
              ) : (
                <label className="block mb-1 text-sm sm:text-base">Work Location</label>
              )}
              <Select 
                options={countryOptions} 
                onChange={handleCountryChange} 
                placeholder="Select Country"
                styles={customStyles}
              />
              {error && <p className="text-xs text-red-600 mt-2">{error.location}</p>}
            </div>

            {/* State Dropdown with Autocomplete */}
            {states.length > 0 && (
              <div>
                <label className="block mb-1 text-sm sm:text-base">State</label>
                <Select 
                  options={stateOptions} 
                  onChange={handleStateChange} 
                  placeholder="Select State"
                  styles={customStyles}
                />
              </div>
            )}

            {/* City Dropdown with Autocomplete */}
            {cities.length > 0 && (
              <div>
                <label className="block mb-1 text-sm sm:text-base">City</label>
                <Select 
                  options={cityOptions} 
                  onChange={handleCityChange} 
                  placeholder="Select City"
                  styles={customStyles}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="text-right">
              <Button 
                type="submit" 
                gradientMonochrome="pink"
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


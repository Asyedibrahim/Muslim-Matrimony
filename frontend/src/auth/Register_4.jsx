import { Button, Textarea } from "flowbite-react";
import reg4 from '../assets/images/reg4.png';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Register_4() {

  const navigate = useNavigate();
  const location = useLocation();
  const [mainData, setMainData] = useState({
    about: ''
  })

  const data = location.state || {};
  useEffect(() => {
    setMainData((prevState) => ({
      ...prevState,
      ...data
    }));
  }, [data]);  

  useEffect(() => {
    if (!mainData.about) {
      let aboutText = '';

      if (data.employedIn === 'Not working') {
        aboutText = `I have completed my ${data.degree} degree. I come from a ${data.familyStatus} family with ${data.familyValues} family values. We belong to ${data.familyType} family currently living in ${data.city || data.currentLocation}.`;
      } else {
        aboutText = `I am currently working in the ${data.employedIn} as a ${data.occupation}, after having completed my ${data.degree} degree. I come from a ${data.familyStatus} family with ${data.familyValues} family values. We belong to ${data.familyType} family currently living in ${data.city}.`;
      }

      // Update the state with generated about text
      setMainData(prevState => ({
        ...prevState,
        about: aboutText
      }));
    }
  }, [mainData]);

  
  let noSpaces  = mainData.about.replace(/\s+/g, '');
  let totalChars = noSpaces.length
  
  console.log(mainData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mainData.about) {
      alert('Enter alert');
      return;
    } else {
      navigate('/sample', {state: mainData}, {replace: true})
    }
  }
  
  return (
    <div className="flex justify-center items-center md:min-h-screen md:bg-gray-100 mt-5 md:mt-0 p-3 sm:p-10">
      <div className="bg-white md:shadow-lg md:rounded-lg flex md:gap-10 max-w-6xl">
        {/* Left Side */}
        <div className="bg-[#E1D6F3] p-6 hidden flex-col justify-center items-center w-1/3 md:flex">
          <div className="text-center">
            <img src={reg4} alt="" className="w-1/2 mx-auto filter invert"/>
            <p className="text-3xl font-thin mt-7">
                Be the one to find someone your (sister) admires
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:p-8 w-full md:w-1/2 md:flex-1 md:pr-10">
          <div className="text-right text-gray-600 mb-4 text-sm sm:text-base">
            <span>Great! You have completed </span>
            <span className="text-xl font-bold">90%</span>
          </div>
          <p className="hidden md:inline text-sm sm:text-2xl text-gray-700">Let the world know about your (daughter)'s awesomeness</p>
          <p className="md:hidden text-lg sm:text-2xl text-gray-700">Let's write something interesting about your (daughter)</p>

          <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm sm:text-base">About your (sister)</label>
              <div className="flex flex-col md:flex-row gap-3">
                <Textarea type="text" onChange={(e) => setMainData({ ...mainData, about: e.target.value})} value={mainData.about} rows='9' className="w-full border border-gray-300 rounded px-3 py-2" />
                <p className="hidden lg:flex">Write a few words to get to know (Kaviya) better</p>
              </div>
              <p className="mt-3 text-sm sm:text-base">{totalChars} characters entered (Min. 50 Chars)</p>
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
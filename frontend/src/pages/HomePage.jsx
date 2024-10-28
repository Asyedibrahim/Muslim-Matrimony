import bg1 from '../assets/images/bg1.jpg';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { FaAward, FaPeopleArrows, FaTrophy, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function HomePage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.id]: e.target.value
        });
        setError('');
    };

    const handlePhoneChange = (input) => {
        setFormData({
            ...formData,
            phone: `+${input}`
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name) {
            setError('Please enter your name');
            return;
        }
        if (!formData.gender) {
            setError('Please select your gender');
            return; 
        }
        if (!formData.phone) {
            setError('Please enter your number');
            return; 
        }

        navigate('/register/details-track-1', { state: formData });
    };
    
  return (
    <div className='min-h-screen relative bg-fixed bg-bottom bg-cover' style={{ backgroundImage: `url(${bg1})` }}>
        <header className="bg-white no-select sticky top-0 z-50">
            <div className="container mx-auto px-4 py-1 flex justify-between items-center">

                <div className="text-md sm:text-xl font-bold py-3">
                {/* <Link to="/"><img src={bg1} alt="logo" className='h-[3.5rem] w-[9.5rem] sm:h-[6rem] sm:w-[15rem] drop-shadow-lg '/></Link> */}
                Muslim Matrimony
                </div>

                <nav className="space-x-7">
                    <div className='flex items-center'>
                        <span className="mr-2 text-xs sm:text-sm whitespace-nowrap">Already a Member?</span>
                        <Link to='/login'>
                            <Button gradientMonochrome='pink' outline size='xs' className='sm:hidden'>LOGIN</Button>
                            <Button gradientMonochrome='pink' outline size='sm' className='hidden sm:inline'>LOGIN</Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
        <section className="flex p-3 max-w-6xl mx-auto flex-col lg:flex-row lg:items-center gap-5 lg:gap-20 mb-10">
            {/* Left Side */}
            <div className="flex-1 flex flex-col gap-3 mt-10 md:mt-0">
            <h1 className="text-xl sm:text-3xl font-extrabold whitespace-nowrap">
                The biggest and most trusted <br />
                matrimony service for Muslims!
            </h1>
            <h2 className='text-lg '>
                Now find matches based on your hobbies & interests
            </h2>
            </div>

            {/* Right Side */}
            <div className="bg-[#E1D6F3] rounded-2xl w-full lg:w-96 lg:mt-10 flex-1">
                <h1 className='text-lg sm:text-xl pt-2 text-center'>Create a Matrimony Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4 bg-white p-10 rounded-2xl">
                    <h1 className='text-center text-lg font-semibold'>Find Your Perfect Match</h1>
                    <input onChange={handleChange} type='text' placeholder='Enter Name' id='name' className='rounded-md focus:border-pink-500 focus:ring-pink-500 p-2'/>
                    <select name="gender" onChange={handleChange} id="gender" className='rounded-md focus:border-pink-500 focus:ring-pink-500'>
                        <option value="" className='text-gray-600'>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <PhoneInput
                        country={'in'}
                        value={formData.phone || ''}
                        onChange={handlePhoneChange} 
                        inputProps={{
                            required: true
                        }}
                    />
                    {error && <p className='text-red-600'>{error}</p>}
                    <Button gradientMonochrome='pink' type='submit' className='uppercase ' size='lg'>
                        Register
                    </Button>
                </form>
            </div>
        </section>
        <section className="py-10 bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Muslim Matrimony</h2>
            <div className="flex flex-wrap justify-around max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center max-w-xs p-4">
                    <FaAward className="text-3xl text-pink-500 mb-2" />
                    <p className="font-semibold">10+ years of service in helping Muslims cherish the meaning of Happy Marriage</p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs p-4">
                    <FaPeopleArrows className="text-3xl text-pink-500 mb-2" />
                    <p className="font-semibold">2 Lakh+ people have found their life partner using our services</p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs p-4">
                    <FaTrophy className="text-3xl text-pink-500 mb-2" />
                    <p className="font-semibold">2020's winner of 'India's Growth Champions Award' by The Economic Times</p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs p-4">
                    <FaCheckCircle className="text-3xl text-pink-500 mb-2" />
                    <p className="font-semibold">1 Lakh+ genuine profiles with 100% verified phone numbers</p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs p-4">
                    <FaMapMarkerAlt className="text-3xl text-pink-500 mb-2" />
                    <p className="font-semibold">130+ branches across India to serve you better</p>
                </div>
            </div>
        </section>
    </div>
  );
}
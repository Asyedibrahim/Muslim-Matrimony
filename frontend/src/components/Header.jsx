import {  Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function Header() {

  return (
    <header className="bg-white shadow-md no-select sticky top-0 z-50">
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
  );
}
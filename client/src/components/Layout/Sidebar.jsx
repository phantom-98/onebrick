import { Link } from "react-router-dom";

import { HiOutlineUsers } from "react-icons/hi2";
import { BsBricks } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
	return (
		<div className='hidden lg:flex lg:flex-col lg:w-1/6 bg-[#32363f] text-white items-center'>
			<Link
				to='/'
				className='font-bold font-raleway text-3xl pt-24 py-6'
			>
				ALPHA HOSPISE
			</Link>
			<hr className='w-full border-gray-500' />
			<div className='w-full flex flex-col gap-4 py-8 px-16 text-white'>
				<Link
					to='/admin'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<LuLayoutDashboard />
					<p className='text-lg font-montserrat'>Dashboard</p>
				</Link>
				<Link
					to='/admin/bricks'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<BsBricks />
					<p className='text-lg font-montserrat'>Bricks</p>
				</Link>
				<Link
					to='/admin/donors'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<HiOutlineUsers />
					<p className='text-lg font-montserrat'>Donors</p>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
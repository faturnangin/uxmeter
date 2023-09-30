import Link from 'next/link';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export default async function DashNav() {
    const session = await getServerSession(authOptions)
    return (
        <div className="container mx-auto py-10">
        <div className='px-4 py-2 flex justify-between items-center bg-slate-100 rounded-full'>
        <div className='bg-white py-2 px-4 rounded-3xl text-md lg:text-lg font-bold text-gray-700 shadow-md'><Link href="/dashboard">Dashboard</Link></div>
          <div className='flex justify-center items-center space-x-4'>
            <div className='hidden bg-white h-10 rounded-3xl shadow-md lg:flex items-center justify-center px-4 space-x-4'>
            <h2 className='text-md lg:text-lg font-semibold'>Hi, {session && session?.user?.name} </h2>
            <img className='w-6 h-6' src="/user.svg" alt="" />
            </div>
            <h2 className='text-md lg:text-lg bg-red-600 text-white py-2 px-4 rounded-3xl shadow-md font-semibold'><Link href="/api/auth/signout">Logout</Link></h2>
          </div>
        </div>
      </div>
    )
}

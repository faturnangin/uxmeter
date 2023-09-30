import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className='py-3 px-4 lg:px-24'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
          <img className='order-3 sm:order-1 lg:hidden' src="/hamburger.svg" alt="" />
          <Link href="/"><img className='order-2 sm:order-2' src="/logo.svg" alt="logo" /></Link>
          <div className='order-2 hidden lg:block'>
            <ul className='flex items-center justify-between text-sm font-bold gap-16'>
              <Link href="/"><li>Home</li></Link>
              <Link href="/#about"><li>Tentang</li></Link>
              <Link href="/statistik"><li>Statistik</li></Link>
            </ul>
          </div>
          <div className='order-1 sm:order-3 hidden lg:flex justify-center items-center'>
            <Link href="/dashboard">
            <img src="/stats.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
      {/* bottomNav */}
      <div className='md:hidden z-[999] fixed py-[10px] bottom-0 right-0 left-0 bg-white'>
        <ul className='grid grid-cols-3 divide-x'>
          <li>
            <Link href="/">
            <div className='flex justify-center items-center flex-col'>
              <img src="/home.svg" alt="home" />
              <span className='text-xs text-grey font-medium'>Home</span>
            </div>
            </Link>
          </li>
          <li>
            <Link href="/#about">
            <div className='flex justify-center items-center flex-col'>
              <img src="/info.svg" alt="info" />
              <span className='text-xs text-grey/50 font-medium'>Tentang</span>
            </div>
            </Link>
          </li>
          <li>
            <Link href="/statistik">
            <div className='flex justify-center items-center flex-col'>
              <img src="/join.svg" alt="join" />
              <span className='text-xs text-grey/50 font-medium'>Statistik</span>
            </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className='py-4 px-4 lg:px-24 lg:py-16'>
        <div className="container mx-auto lg:flex lg:flex-row-reverse lg:items-center">
            <div className='py-4 lg:w-1/2'>
                <img className='mx-auto' src="/hero.png" alt="" />
            </div>
            <div className='py-4 flex flex-col gap-y-4 lg:gap-y-5 lg:w-1/2'>
                <h1 className='text-[28px] lg:text-5xl lg:text-start lg:leading-[56px] font-bold text-center'>Ukur tingkat <span className='bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text'>pengalaman pengguna (UX)</span> sistem.</h1>
                <p className='text-base lg:text-lg lg:text-start font-light text-textcolor text-center'>Selamat datang di aplikasi pengukur tingkat UX dengan metode User Experience Questionnaire (UEQ), proyek ini merupakan bagian dari penelitian oleh Fatur Nangin.</p>
                <div className='flex justify-center lg:justify-start gap-x-4'>
                    <Link href="/#topic"><button className='px-6 py-2 bg-primary rounded-full text-base lg:text-lg font-medium text-white'>Isi Kuisioner</button></Link>
                    <Link href="/#about"><button className='px-6 py-2 bg-secondary rounded-full text-base lg:text-lg font-medium text-textcolor'>Tentang Penelitian</button></Link>
                </div>
            </div>
        </div>
    </section>
  )
}

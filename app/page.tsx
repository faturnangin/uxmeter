import Hero from "@/components/Hero"
import Link from "next/link"

export default function Home() {
  return (
    <>
    <Hero/>
    {/* About Section */}
    <section id="about" className="py-4 px-4 lg:px-24 lg:py-8 flex flex-col lg:bg-secondary">
      <div className="flex flex-col gap-4 lg:gap-5">
        <h2 className="mx-auto w-[124px] lg:w-[136px] px-4 py-1 text-base lg:text-lg font-medium text-white bg-accent lg:bg-primary rounded-full">Apa itu UEQ</h2>
        <p className="text-base lg:text-lg font-normal text-justify">UEQ (User Experience Questionnaire) merupakan alat atau kuesioner yang mudah dan efisien untuk mengukur User Experience (UX). UEQ ini memudahkan kita untuk mengukur UX pada sebuah desain aplikasi. UEQ berisi 6 skala penilaian</p>
        <div>
          <ul className="flex flex-wrap justify-between xl:justify-center xl:space-x-8 gap-y-4 lg:gap-y-5">
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Daya Tarik</li>
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Kejelasan</li>
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Efisiensi</li>
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Ketepatan</li>
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Stimulasi</li>
            <li className="px-4 py-1 text-base font-normal text-gray-700 rounded-3xl bg-white border border-secondary">Kebaruan</li>
          </ul>
        </div>
      </div>
    </section>
    {/* About Section Ends */}

    {/* HowToJoin Section */}
    <section id="join" className="py-4 px-4 lg:px-24 lg:py-8 gap-4 lg:gap-y-5 flex flex-col bg-secondary lg:bg-white">
      <h2 className="mx-auto px-4 py-1 text-base lg:text-lg font-medium text-textcolor bg-white rounded-full">Cara Berpartisipasi</h2>
      <p className="text-sm lg:text-base font-light text-center">Jadilah responden dengan tiga langkah mudah!</p>
      <div>
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-5">
          <li className="px-4 py-1 shadow-md bg-white rounded-3xl text-sm lg:text-base font-medium flex flex-row gap-x-[10px] items-center justify-center">
            <span className="rounded-3xl bg-primary w-8 h-8 text-white flex justify-center items-center">1</span>Pilih Objek Penelitian
          </li>
          <li className="px-4 py-1 shadow-md bg-white rounded-3xl text-sm lg:text-base font-medium flex flex-row gap-x-[10px] items-center justify-center">
            <span className="rounded-3xl bg-primary w-8 h-8 text-white flex justify-center items-center">2</span>Baca Ketentuan Pengisian Kuisioner
          </li>
          <li className="px-4 py-1 shadow-md bg-white rounded-3xl text-sm lg:text-base font-medium flex flex-row gap-x-[10px] items-center justify-center">
            <span className="rounded-3xl bg-primary w-8 h-8 text-white flex justify-center items-center">3</span>Mulai Isi Kuisioner
          </li>
        </ul>
      </div>
    </section>
    {/* HowToJoin Section Ends */}

    {/* Overview Section */}
    <section className="py-4 px-4 lg:px-24 lg:py-8 flex flex-col">
      <div className="flex flex-wrap items-center justify-center lg:justify-evenly gap-4 lg:gap-5">
        <div className="flex items-center aspect-video lg:aspect-square overflow-hidden rounded-3xl">
          <img className="object-cover lg:w-full lg:h-full" src="/analytic.png" alt="" />
        </div>
        <div className="flex flex-col max-w-sm lg:w-1/2 gap-4 lg:gap-5">
          <div className="px-4 py-2 rounded-xl bg-primary text-white">
            <h3 className="text-sm lg:text-lg font-semibold">Struktur Kuisioner</h3>
            <p className="text-sm lg:text-base font-light">Terdapat 26 komponen pertanyaan dan 7 pilihan jawaban</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-primary text-white">
            <h3 className="text-sm lg:text-lg font-semibold">Ketentuan Privasi</h3>
            <p className="text-sm lg:text-base font-light">Jawaban anda bersifat rahasia dan tidak akan dipublikasikan secara publik</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-primary text-white">
            <h3 className="text-sm lg:text-lg font-semibold">Hasil Analisis</h3>
            <p className="text-sm lg:text-base font-light">Responden berhak untuk melihat hasil analisis pengukuran UX, hubungi kontak bantuan untuk selengkapnya.</p>
          </div>
        </div>
      </div>
    </section>
    {/* Overview Section Ends */}

    {/* Topic Section */}
    <section id="topic" className="py-4 px-4 lg:px-24 lg:py-8 flex flex-col gap-4 lg:gap-y-5 lg:bg-primary/10">
      <h2 className="mx-auto px-4 py-1 text-base lg:text-lg font-medium text-white bg-primary rounded-full">Topik Penelitian</h2>
      <div className="px-4 py-4 bg-white rounded-3xl border border-secondary shadow-md max-w-md mx-auto lg:w-1/2">
        <div className="flex flex-col gap-y-[10px] relative">
          <div className="absolute right-2 top-2 flex justify-center items-center h-8 w-8 bg-white hover:bg-slate-100 rounded-lg">
              <Link href="https://sia.ump.ac.id">
                <img className="h-6 w-6" src="/link.svg" alt="" />
              </Link>
          </div>
          <img className="rounded-lg object-cover" src="/sia.png" alt="" />
          <Link href="/ueqsia">
          <div className="flex justify-between items-center group">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold lg:text-lg">Sia UMP</h3>
              <p className="text-sm lg:text-base font-light">Sistem Informasi Akademik UMP</p>
            </div>
            <div className="flex space-x-[-9.5px]">
              <div className="h-[38px] w-[38px] rounded-full bg-accent border border-white flex justify-center items-center text-sm font-bold text-white">
                <img src="/community.svg" alt="people-joined" />
              </div>
              <div className="h-[38px] w-[38px] rounded-full bg-primary border border-white flex justify-center items-center text-sm font-bold text-white">99+</div>
            </div>
            <img className="hidden group-hover:block" src="/arrow.svg" alt="arrow" />
          </div>
          </Link>
        </div>
      </div>
    </section>
    {/* Topic Section Ends */}

    {/* CTA Section */}
    <section className="py-4 px-4 lg:px-24 lg:py-8 flex flex-col gap-4 lg:gap-y-5">
      <h2 className="text-base lg:text-xl font-semibold text-center">Tertarik Untuk Menjadi Responden?</h2>
      <div className="flex justify-center items-center gap-x-[10px]">
        <Link href="/#join"><button className='px-6 py-2 bg-primary rounded-full text-sm lg:text-base font-medium text-white'>Isi Kuisioner</button></Link>
        <Link href="mailto:workwithnangin@gmail.com"><button className='px-6 py-2 bg-white border border-secondary rounded-full text-sm lg:text-base font-medium text-textcolor'>Kontak Bantuan</button></Link>
      </div>
    </section>
    {/* CTA Section Ends */}

    {/* Footer */}
    <section className="hidden py-[10px] px-24 lg:flex lg:flex-col lg:gap-y-5 bg-primary">
    <h2 className="text-center text-base font-semibold text-white">Website pengukur UX dengan metode UEQ, Fatur Nangin 2023</h2>
    </section>
    {/* Footer Ends */}
    </>
  )
}

"use client"
import {ChangeEvent, FormEvent, useState} from 'react'
import { ueqparams } from '@/constants'
import Link from "next/link"
import Modal from '@/components/Modal'
import { Card, Subtitle, Metric, Text, Divider, Button } from "@tremor/react";
import CallOut from '@/components/CallOut'
export default function SiaUMP() {
  const [showSuccessCallout, setShowSuccessCallout] = useState(false); // For success messages
  const [showErrorCallout, setShowErrorCallout] = useState(false); // For error messages
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
        faculty: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: '',
        answer7: '',
        answer8: '',
        answer9: '',
        answer10: '',
        answer11: '',
        answer12: '',
        answer13: '',
        answer14: '',
        answer15: '',
        answer16: '',
        answer17: '',
        answer18: '',
        answer19: '',
        answer20: '',
        answer21: '',
        answer22: '',
        answer23: '',
        answer24: '',
        answer25: '',
        answer26: '',
    })

    const clearFormData = () => {
      setFormData({
        nama: '',
        nim: '',
        faculty: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: '',
        answer7: '',
        answer8: '',
        answer9: '',
        answer10: '',
        answer11: '',
        answer12: '',
        answer13: '',
        answer14: '',
        answer15: '',
        answer16: '',
        answer17: '',
        answer18: '',
        answer19: '',
        answer20: '',
        answer21: '',
        answer22: '',
        answer23: '',
        answer24: '',
        answer25: '',
        answer26: '',
      });
    };
    

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mengirim data ke server atau menyimpannya dalam tabel MySQL di sini
        const jsonData = {
          answer1: parseInt(formData.answer1),
          answer2: parseInt(formData.answer2),
          answer3: parseInt(formData.answer3),
          answer4: parseInt(formData.answer4),
          answer5: parseInt(formData.answer5),
          answer6: parseInt(formData.answer6),
          answer7: parseInt(formData.answer7),
          answer8: parseInt(formData.answer8),
          answer9: parseInt(formData.answer9),
          answer10: parseInt(formData.answer10),
          answer11: parseInt(formData.answer11),
          answer12: parseInt(formData.answer12),
          answer13: parseInt(formData.answer13),
          answer14: parseInt(formData.answer14),
          answer15: parseInt(formData.answer15),
          answer16: parseInt(formData.answer16),
          answer17: parseInt(formData.answer17),
          answer18: parseInt(formData.answer18),
          answer19: parseInt(formData.answer19),
          answer20: parseInt(formData.answer20),
          answer21: parseInt(formData.answer21),
          answer22: parseInt(formData.answer22),
          answer23: parseInt(formData.answer23),
          answer24: parseInt(formData.answer24),
          answer25: parseInt(formData.answer25),
          answer26: parseInt(formData.answer26),
        };
        const requestBody = {
          name: formData.nama,
          nim: parseInt(formData.nim),
          faculty: formData.faculty, // Ganti dengan fakultas yang sesuai
          answers: jsonData,
        };
        // Lakukan pengiriman data ke server atau penyimpanan ke MySQL di sini
        console.log(requestBody);
        try {
            const response = await fetch('/api/ueqsia', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
      
            if (response.ok) {
              // Data berhasil dikirimkan
              // Anda dapat menampilkan pesan sukses atau melakukan tindakan lain di sini
              setIsLoading(false);
              // clearFormData();
              setShowSuccessCallout(true);
            } else {
              // Handle error jika diperlukan
              setIsLoading(false);
              // clearFormData();
              setShowErrorCallout(true);
            }
          } catch (error) {
            console.error('Error:', error);
          }

    };
    return (
    <>
        <section className='py-4 px-4 lg:px-24 lg:py-16'>
          <div className="container mx-auto lg:flex lg:flex-row lg:items-center">
              <div className='py-4 lg:w-1/2'>
                  <img className='lg:max-w-lg' src="/sia-mockup.png" alt="" />
              </div>
              <div className='py-4 flex flex-col gap-y-4 lg:gap-y-5 lg:w-1/2'>
                  <h1 className='text-2xl lg:text-4xl lg:text-start lg:leading-10 font-bold text-center text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text'>Evaluasi UX Website Sistem Informasi Akademik (SIA) Mahasiswa UMP</h1>
                  <p className='text-base lg:text-lg lg:text-start font-medium text-textcolor text-justify'>
                  SIA UMP merupakan tempat pelayanan akademik bagi mahasiswa Universitas Muhammadiyah Purwokerto (UMP).
                  </p>
                  <ul className='space-y-2 text-base font-normal'>
                      <li className='flex space-x-2'>
                          <img src="/checkmark.svg" alt="check"/>
                          <span className='text-textcolor/80'>Responden adalah mahasiswa aktif UMP</span>
                      </li>
                      <li className='flex space-x-2'>
                          <img src="/checkmark.svg" alt="check"/>
                          <span className='text-textcolor/80'>Dilakukan pada tahun ajaran 2023/2024</span>
                      </li>
                      <li className='flex space-x-2'>
                          <img src="/checkmark.svg" alt="check"/>
                          <span className='text-textcolor/80'>Menghasilkan rekomendasi perbaikan</span>
                      </li>
                  </ul>
                  <button className='px-6 py-2 bg-primary hover:bg-secondary hover:text-textcolor rounded-full text-base lg:text-lg font-medium text-white'><Link href="/ueqsia#kuisioner">Mulai isi Kuisioner</Link></button>
                  <button onClick={openModal} className='px-6 py-2 bg-accent hover:bg-secondary hover:text-textcolor rounded-full text-base lg:text-lg font-medium text-white'>Petunjuk Pengisian</button>
              </div>
          </div>
        </section>

        <section id='kuisioner' className="mx-auto py-4 px-4 lg:px-24 lg:py-8">
              <h1 className="text-base lg:text-lg font-semibold mb-4">Kuisioner UEQ</h1>
              <form onSubmit={handleSubmit}>
                  {/* Kolom Informasi */}
                  <div className='grid grid-cols-12 gap-x-6 gap-y-6 justify-between'>
                  <div className='w-full col-span-12 lg:col-span-5 lg:h-fit border border-secondary bg-white shadow-md rounded-lg p-4 lg:p-6 overflow-hidden relative'>
                      <div className="absolute top-0 left-0 w-full px-4 py-2 lg:px-6 bg-primary text-white text-base lg:text-lg font-semibold">Informasi Pribadi</div>
                      <div className="mt-8 flex flex-col gap-y-2">
                          <label htmlFor="name" className="block text-gray-600 font-normal">Nama Lengkap</label>
                            <input type="text"
                            id="name"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            required
                            className="block w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                            />
                          <label htmlFor="nim" className="block text-gray-600 font-normal">Nomor Induk Mahasiswa</label>
                            <input
                            type="number"
                            id="nim"
                            name='nim'
                            value={formData.nim}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                            required
                            />
                          <label htmlFor="faculty" className="block text-gray-600 font-normal">Fakultas</label>
                              <select
                              id="faculty"
                              name='faculty'
                              value={formData.faculty}
                              onChange={(e)=>setFormData({...formData, faculty : e.target.value})}
                              className="rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                              required
                              >
                              <option value="">Pilih Opsi</option>
                              <option>Fakuktas Keguruan dan Ilmu Pendidikan</option>
                              <option>Fakultas Ekonomi</option>
                              <option>Fakultas Teknik</option>
                              <option>Fakultas Agama Islam</option>
                              <option>Fakultas Hukum</option>
                              <option>Fakultas Pertanian dan Perikanan</option>
                              <option>Fakultas Psikologi</option>
                              <option>Fakultas Farmasi</option>
                              <option>Fakultas Sastra</option>
                              <option>Fakultas Ilmu Kesehatan</option>
                              <option>Fakultas Kedokteran</option>
                              </select>
                      </div>
                  </div>
                  {/* batas kolom */}
                  <div className="w-full col-span-12 lg:col-span-7 border border-secondary bg-white shadow-md rounded-lg p-4 lg:p-6 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full px-4 py-2 lg:px-6 bg-accent text-white text-base lg:text-lg font-semibold">Isi Kuisioner</div>
                      {/* UEQ Starts */}
                      {ueqparams.map((ueqparam,index)=>
                        <div key={index} className="mt-8 flex flex-col gap-y-2">
                        <h1>{ueqparam.id}. Apakah Sistem Informasi Akademik Mahasiswa UMP...</h1>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">{ueqparam.param1}</span>
                            <span className="text-sm text-right text-gray-400">{ueqparam.param2}</span>
                        </div>
                        <div>
                            <div className="flex justify-between">
                            {[1,2,3,4,5,6,7].map((value:number,index)=>
                                <div key={index}>
                                <label className="inline-flex items-center">
                                <input
                                type="radio"
                                name={`answer${ueqparam.id}`}
                                value={value}
                                checked={parseInt(formData[`answer${ueqparam.id}` as keyof typeof formData]) === value}
                                onChange={handleInputChange}
                                className="form-radio text-blue-500"
                                required
                                />
                                <span className="ml-2">{value}</span>
                                </label>
                                </div>
                            )}
                            </div>
                        </div>
                        </div>
                      )}  
                      {/* UEQ Ends */}
                  </div>
                  </div>
                  {/* row save */}
                  <div className="flex justify-end mt-4">
                      <Button className="bg-primary text-white px-4 py-2 hover:bg-accent" type='submit' size="md" loading={isLoading ? true : false}>{isLoading?'Loading' : 'Submit'}</Button>
                  </div>
              </form>
        </section>
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6 w-full max-h-[80vh] overflow-y-scroll">
          <Metric>Petunjuk Pengisian UEQ</Metric>
          <Divider />
          <Text className='text-justify'>Terima kasih telah bersedia berpartisipasi dalam penelitian kami tentang pengalaman pengguna. Kuisioner ini dirancang untuk mengumpulkan pandangan Anda tentang produk atau layanan yang telah Anda gunakan. Mohon luangkan waktu Anda untuk menjawab pertanyaan dengan jujur. Jawaban Anda sangat berharga bagi kami.</Text>
          <Subtitle className='mt-2'>Petunjuk Umum</Subtitle>
          <div className="mt-2">
        
              <Text>1. Baca setiap pertanyaan dengan cermat sebelum menjawab.</Text>
              <Text>2. Pilih salah satu jawaban yang paling sesuai dengan pengalaman Anda.</Text>
      
          </div>
          <Subtitle className='mt-2'>Skala Penilaian</Subtitle>
          <Text className="mt-2 text-justify">
          Anda akan melihat 26 indikator pernyataan, dan Anda diminta untuk menilai sejauh mana Anda setuju atau tidak setuju dengan masing-masing pernyataan. Harap perhatikan skala yang terletak di bagian kanan dan kiri peryataan, posisi skala tidak konsisten sehingga nilai negatif tidak selalu terletak di bagian kiri dan juga sebaliknya.
          </Text>
          <Subtitle className='mt-2'>Contoh Pengisian</Subtitle>
            <Card className='mt-2'>
            <div className="flex flex-col gap-y-2">
                        <h1 className='text-sm text-slate-500'>1. Apakah Sistem Informasi Akademik Mahasiswa UMP</h1>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Menyusahkan</span>
                            <span className="text-sm text-right text-gray-400">Menyenangkan</span>
                        </div>
                        <div>
                            <div className="flex justify-between">
                            {[1,2,3,4,5,6,7].map((value:number,index)=>
                                <div key={index}>
                                <label className="inline-flex items-center">
                                <input
                                type="radio"
                                name={`example`}
                                value={value}
                                className="form-radio text-blue-500"
                                checked
                                disabled
                                />
                                <span className="ml-2 text-sm">{value}</span>
                                </label>
                                </div>
                            )}
                            </div>
                        </div>
            </div>
            </Card>
            <h1 className='mt-2 text-sm text-slate-500'>Pada pertanyaan nomor 1 diatas menunjukan pengguna sangat setuju bahwa aplikasi yang diuji menyenangkan</h1>
        </div>
        </Modal>

        {showSuccessCallout&&
        <CallOut title='Berhasil' message='Data telah dikirim, terima kasih atas partisi anda' isSuccess={true}/>        
        }
        {showErrorCallout&&
        <CallOut title='Gagal' message='Data gagal dikirim, hubungi kontak bantuan' isSuccess={false}/>        
        }
    </>
    )
}

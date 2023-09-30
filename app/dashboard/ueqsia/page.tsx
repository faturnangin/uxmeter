"use client"
import useSWR from 'swr';
import {Button,Card,Flex,Text,Metric,TabList,Tab,TabGroup,TabPanels,TabPanel, Table, TableHead,TableRow, TableHeaderCell, TableBody, TableCell, BadgeDelta, DeltaType,} from "@tremor/react";
import { useState,Fragment } from "react";
import { UserIcon, UserGroupIcon, ArrowsPointingOutIcon, DocumentChartBarIcon, ScaleIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from "@headlessui/react";
import Loader from '@/components/Loader';
import Result from '../components/Result';
import Benchmark from '../components/Benchmark';

const fetcher = (url:string) => fetch(url).then(res => res.json())

interface Answers {
  [key: string]: number;
}


export default function DashboardSiaUmp() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = (): any => setIsOpen(true);
    const closeModal = (): any => setIsOpen(false);
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL+'/api/ueqsia', fetcher)
    const attractiveness = ["answer1", "answer12", "answer14", "answer16", "answer24", "answer25"];
    const perspicuity = ["answer2","answer4","answer13","answer21"];
    const efficiency = ["answer9","answer20","answer22","answer23"];
    const dependability = ["answer8","answer11","answer17","answer19"];
    const stimulation = ["answer5","answer6","answer7","answer18"];
    const novelty = ["answer3","answer10","answer15","answer26"]

    const convertAnswers = (answers: Answers): Answers => {
      const convertedAnswers: Answers = {};
      for (const key in answers) {
        if (answers.hasOwnProperty(key)) {
          switch (key) {
            case "answer1":
            case "answer2":
            case "answer6":
            case "answer7":
            case "answer8":
            case "answer11":
            case "answer13":
            case "answer14":
            case "answer15":
            case "answer16":
            case "answer20":
            case "answer22":
            case "answer26":
            convertedAnswers[key] = answers[key] - 4;
              break;
            case "answer3":
            case "answer4":
            case "answer5":
            case "answer9":
            case "answer10":
            case "answer12":
            case "answer17":
            case "answer18":
            case "answer19":
            case "answer21":
            case "answer23":
            case "answer24":
            case "answer25":
              convertedAnswers[key] = 4 - answers[key];
              break;
            default:
              convertedAnswers[key] = answers[key];
          }
        }
      }
      return convertedAnswers;
    };

    const calculateGroupAverage = (answers: Answers, groupProperties: string[]): number => {
      // Menghitung rata-rata menggunakan objek answers yang telah diperbarui
      const total: number = groupProperties.reduce((total, prop) => total + answers[prop], 0);
      const average: number = total / groupProperties.length;
      return average;
    };

    if (error) return <div>failed to fetch data</div>
    if (isLoading) return <Loader/>
    
    return (
    <>
    <Card decoration="top" decorationColor="indigo">
      <Metric>Sistem Informasi Akademik UMP</Metric>
      <div className='mt-8'>
        <Text>Total Responden</Text>
        <Metric>{data.length}</Metric>
      </div>
      <TabGroup>
        <TabList className="mt-8">
          <Tab icon={UserGroupIcon}>Daftar Responden</Tab>
          <Tab icon={UserIcon}>Skala Mean Per Orang</Tab>
          <Tab icon={DocumentChartBarIcon}>Hasil</Tab>
          <Tab icon={ScaleIcon}>Benchmark</Tab>
        </TabList>
        <TabPanels>

          <TabPanel>
            <div className="mt-10">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Nama</TableHeaderCell>
                      <TableHeaderCell className="text-right">Nim</TableHeaderCell>
                      <TableHeaderCell className="text-right">Tanggal</TableHeaderCell>
                      <TableHeaderCell className="text-right">Fakultas</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((data:any) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="text-right">
                          <Text>{data.nim}</Text>
                        </TableCell>
                        <TableCell className="text-right">
                          <Text>{data.createdAt}</Text>
                        </TableCell>
                        <TableCell className="text-right">
                          <Text>{data.faculty}</Text>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-12 pb-8 absolute rounded-b-lg">
                <Button icon={ArrowsPointingOutIcon} className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300" onClick={openModal}>
                  Show more
                </Button>
                </div>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
                  </Transition.Child>
                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel
                          className="flex flex-col items-center w-fit transform overflow-hidden ring-tremor bg-white p-6 text-left align-middle shadow-tremor transition-all rounded-3xl"
                        >
                          <div className="relative mt-3">
                            <Table className="h-[450px]">
                              <TableHead>
                                <TableRow>
                                  <TableHeaderCell className="bg-white">Nama</TableHeaderCell>
                                  <TableHeaderCell className="bg-white">Nim</TableHeaderCell>
                                  <TableHeaderCell className="bg-white">Fakultas</TableHeaderCell>
                                  <TableHeaderCell className="bg-white">Waktu</TableHeaderCell>
                                  <TableHeaderCell className="bg-white">Jawaban</TableHeaderCell>
                                  <TableHeaderCell className="bg-white">Jawaban Terkonversi</TableHeaderCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {data.map((data:any) => (
                                  <TableRow key={data.id}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.nim}</TableCell>
                                    <TableCell>{data.faculty}</TableCell>
                                    <TableCell>{`${data.createdAt.substring(0, 10)} | ${data.createdAt.substring(11, 16)}`}</TableCell>
                                    <TableCell>{Object.values(data.answers).join(',')}</TableCell>
                                    <TableCell>{Object.values(convertAnswers(data.answers)).join(',')}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                              {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white z-0 h-20 w-full" /> */}
                            </Table>
                          </div>
                          <Button
                            className="mt-5 w-1/4 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                            onClick={closeModal}
                          >
                            Go back
                          </Button>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="mt-10">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Nama</TableHeaderCell>
                  <TableHeaderCell className="text-right">Attractiveness</TableHeaderCell>
                  <TableHeaderCell className="text-right">Perspicuity</TableHeaderCell>
                  <TableHeaderCell className="text-right">Efficiency</TableHeaderCell>
                  <TableHeaderCell className="text-right">Dependability</TableHeaderCell>
                  <TableHeaderCell className="text-right">Stimulation</TableHeaderCell>
                  <TableHeaderCell className="text-right">Novelty</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((data:any) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), attractiveness)}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), perspicuity)}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), efficiency)}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), dependability)}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), stimulation)}</TableCell>
                    <TableCell className="text-right">{calculateGroupAverage(convertAnswers(data.answers), novelty)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className='mt-10'>
              <Result data={data}/>
            </div>
          </TabPanel>

          <TabPanel>
            <div className='mt-10'>
              <Benchmark data={data}/>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card> 
    </>
    
  )
}


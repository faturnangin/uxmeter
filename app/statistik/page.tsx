"use client"
import useSWR from 'swr';
import React from 'react'
import { UsersIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import {Button,Card,Flex,Text,Metric,TabList,Tab,TabGroup,TabPanels,TabPanel, Table, TableHead,TableRow, TableHeaderCell, TableBody, TableCell, BadgeDelta, DeltaType, Icon, Title, Grid} from "@tremor/react";
import { useState } from "react";
import { DocumentChartBarIcon, ScaleIcon } from '@heroicons/react/20/solid';
import Loader from '@/components/Loader';
const categories = [
    {
      title: "Sistem Informasi Akademik UMP",
      text: `SIA UMP merupakan tempat pelayanan akademik bagi mahasiswa Universitas Muhammadiyah Purwokerto (UMP).`,
      icon: UsersIcon,
    },
  ];
import Benchmark from '../dashboard/components/Benchmark';
import Result from '../dashboard/components/Result';

export default function Statistik() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {setIsVisible(!isVisible);};
    const fetcher = (url:string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL+'/api/ueqsia', fetcher)
    if (error) return <div>failed to fetch data</div>
    if (isLoading) return <Loader/>
    return (
      <>
      <section className='px-4 lg:px-24'>
        <div className='py-4 lg:py-16'>
        <h1 className='text-2xl font-bold text-gray-800 md:text-3xl'>Hasil Evaluasi Sistem dengan UEQ</h1>
        </div>
        <div className='flex justify-start'>

        {categories.map((item) => (
        <Card className='w-1/2' key={item.title}>
          <Icon variant="light" icon={item.icon} size="lg" color="blue" />
          <Title className="mt-6">{item.title}</Title>
          <Text className="mt-2">{item.text}</Text>
          <Flex className="mt-6 pt-4 border-t">
            <Button onClick={toggleVisibility} size="xs" variant="light" icon={ArrowLongRightIcon} iconPosition="right">
              {isVisible?'Tutup' : 'Tampilkan'}
            </Button>
          </Flex>
        </Card>
        ))}
        </div>
      </section>
    
    {isVisible && (
      <section className='mt-5 px-4 lg:px-24'>
      <Card>
      <div className='mt-8'>
        <Text>Total Responden</Text>
        <Metric>{data.length}</Metric>
      </div>
      <TabGroup>
        <TabList className="mt-8">
          <Tab icon={DocumentChartBarIcon}>Hasil</Tab>
          <Tab icon={ScaleIcon}>Benchmark</Tab>
        </TabList>
        <TabPanels>
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
      </section>
    )}
    </>
    )
}

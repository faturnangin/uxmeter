"use client"
import React from 'react'
import { Card, Text, Button, Icon, Flex, Title, Grid } from "@tremor/react";
import { UsersIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import type { Metadata } from 'next'

const categories = [
    {
      title: "Sistem Informasi Akademik UMP",
      text: `SIA UMP merupakan tempat pelayanan akademik bagi mahasiswa Universitas Muhammadiyah Purwokerto (UMP).`,
      icon: UsersIcon,
    },
  ];

export default function Dashboard() {
    return (
      <>
        <div className='flex justify-start'>
        <Grid numItemsSm={2} className="gap-6">
        {categories.map((item) => (
        <Card key={item.title}>
          <Icon variant="light" icon={item.icon} size="lg" color="blue" />
          <Title className="mt-6">{item.title}</Title>
          <Text className="mt-2">{item.text}</Text>
          <Flex className="mt-6 pt-4 border-t">
            <Link href='/dashboard/ueqsia'>
            <Button size="xs" variant="light" icon={ArrowLongRightIcon} iconPosition="right">
              View more
            </Button>
            </Link>
          </Flex>
        </Card>
      ))}
        </Grid>
        </div>
    </>
    )
}

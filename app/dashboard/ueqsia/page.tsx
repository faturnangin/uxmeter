"use client";
import useSWR from "swr";
import {
  Button,
  Card,
  Flex,
  Text,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  DeltaType,
} from "@tremor/react";
import { useState, Fragment } from "react";
import {
  UserIcon,
  UserGroupIcon,
  ArrowsPointingOutIcon,
  DocumentChartBarIcon,
  ScaleIcon,
  SignalIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "@/components/Loader";
import Result from "../components/Result";
import Benchmark from "../components/Benchmark";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Answers {
  [key: string]: number;
}

const fakedata = [
  {
    name: "Viola Amherd",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    status: "active",
  },
  {
    name: "Simonetta Sommaruga",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    status: "active",
  },
  {
    name: "Alain Berset",
    Role: "Federal Councillor",
    departement: "The Federal Department of Home Affairs (FDHA)",
    status: "active",
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    departement: "The Federal Department of Foreign Affairs (FDFA)",
    status: "active",
  },
  {
    name: "Ueli Maurer",
    Role: "Federal Councillor",
    departement: "The Federal Department of Finance (FDF)",
    status: "active",
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of Economic Affairs, Education and Research (EAER)",
    status: "active",
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    departement: "The Federal Department of Justice and Police (FDJP)",
    status: "active",
  },
];

export default function DashboardSiaUmp() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (): any => setIsOpen(true);
  const closeModal = (): any => setIsOpen(false);
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/ueqsia",
    fetcher
  );
  const attractiveness = [
    "answer1",
    "answer12",
    "answer14",
    "answer16",
    "answer24",
    "answer25",
  ];
  const perspicuity = ["answer2", "answer4", "answer13", "answer21"];
  const efficiency = ["answer9", "answer20", "answer22", "answer23"];
  const dependability = ["answer8", "answer11", "answer17", "answer19"];
  const stimulation = ["answer5", "answer6", "answer7", "answer18"];
  const novelty = ["answer3", "answer10", "answer15", "answer26"];

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

  const calculateGroupAverage = (
    answers: Answers,
    groupProperties: string[]
  ): number => {
    // Menghitung rata-rata menggunakan objek answers yang telah diperbarui
    const total: number = groupProperties.reduce(
      (total, prop) => total + answers[prop],
      0
    );
    const average: number = total / groupProperties.length;
    return average;
  };

  if (error) return <div>failed to fetch data</div>;
  if (isLoading) return <Loader />;

  return (
    <>
      <Card className="mb-10">
        <Metric>Sistem Informasi Akademik UMP</Metric>
        <div className="mt-8">
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
              <div className="my-10">
                <Table className="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>No.</TableHeaderCell>
                      <TableHeaderCell>Nama</TableHeaderCell>
                      <TableHeaderCell>Nim</TableHeaderCell>
                      <TableHeaderCell>Fakultas</TableHeaderCell>
                      {/* <TableHeaderCell>Waktu</TableHeaderCell> */}
                      <TableHeaderCell>Jawaban</TableHeaderCell>
                      <TableHeaderCell>Jawaban Terkonversi</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((data: any, index: number) => (
                      <TableRow key={data.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.nim}</TableCell>
                        <TableCell>{data.faculty}</TableCell>
                        {/* <TableCell>{`${data.createdAt.substring(0, 10)} | ${data.createdAt.substring(11, 16)}`}</TableCell> */}
                        <TableCell>
                          {Object.values(data.answers).join(",")}
                        </TableCell>
                        <TableCell>
                          {Object.values(convertAnswers(data.answers)).join(
                            ","
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-10">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Nama</TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Attractiveness
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Perspicuity
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Efficiency
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Dependability
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Stimulation
                      </TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        Novelty
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.map((data: any) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            attractiveness
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            perspicuity
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            efficiency
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            dependability
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            stimulation
                          ).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculateGroupAverage(
                            convertAnswers(data.answers),
                            novelty
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-10">
                <Result data={data} />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-10">
                <Benchmark data={data} />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
}

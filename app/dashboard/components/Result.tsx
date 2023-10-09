"use client"
import React from 'react'
import { ueqparams } from '@/constants';
import { Card, Title, Text, Grid, Col, Table, TableRow, TableCell, TableHead, TableHeaderCell, TableBody, Flex, Bold, List, ListItem, BadgeDelta, Legend, BarChart} from "@tremor/react";

interface Answers {
    [key: string]: number;
  }
  
interface UEQ {
    id: number;
    name: string;
    nim?: number;
    faculty?: string;
    createdAt: string;
    answers: Answers;
}


export default function Result({data}:{data:UEQ[]}) {
    const attractiveness = ["answer1", "answer12", "answer14", "answer16", "answer24", "answer25"];
    const perspicuity = ["answer2","answer4","answer13","answer21"];
    const efficiency = ["answer9","answer20","answer22","answer23"];
    const dependability = ["answer8","answer11","answer17","answer19"];
    const stimulation = ["answer5","answer6","answer7","answer18"];
    const novelty = ["answer3","answer10","answer15","answer26"];

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

    //init array buat answer baru
    const answerSums: { [key: string]: number } = {};
    for (let i = 1; i <= 26; i++) {
        answerSums[`answer${i}`] = 0;
    }
    //penjumlahan nilai tiap answer
    for (const UEQ of data) {
        for (let i = 1; i <= 26; i++) {
            const answerKey = `answer${i}`;
            answerSums[answerKey] += convertAnswers(UEQ.answers)[answerKey];
        }
    }
    const answerSumsArray = Object.keys(answerSums).map(key => ({ key, value: answerSums[key] }));

    // Fungsi untuk menghitung variance dengan nilai yang sudah dikonversi
    function calculateVarianceWithConversion(data:UEQ[], questionNumber:number) {
    const convertedData = data.map(item => ({
      ...item,
      answers: convertAnswers(item.answers)
    }));
    const values = convertedData.map(item => item.answers[`answer${questionNumber}`]);
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / (values.length - 1);
    return variance;
    }

    // Std Dev
    function calculateStandardDeviation(variance:number) {
        return Math.sqrt(variance);
    }

    // UEQ Scales Mean
    const calculateGroupAverage = (data:UEQ[], groupProperties:string[]):number => {
    const convertedData = data.map(item => ({...item, answers: convertAnswers(item.answers)}));
    const total = convertedData.reduce((acc, item) => {
    const groupTotal = groupProperties.reduce((groupAcc, prop) => groupAcc + item.answers[prop], 0);
    return acc + groupTotal;
    }, 0);
    const average = total / (data.length * groupProperties.length);
    return average
    };
    
    // UEQ Scales Variance
    function calculateVariance(data:UEQ[], questionNumbers:string[]) {
        const convertedData = data.map(item => ({...item, answers: convertAnswers(item.answers)}));
        const values = convertedData.map(item => {
            const selectedAnswers = questionNumbers.map(questionNumber => item.answers[questionNumber]);
            return selectedAnswers.reduce((sum, value) => sum + value, 0) / selectedAnswers.length;
        });
    
        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
        const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
        const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / (values.length - 1);
    
        return variance;
    }

    function defineStatus(value:number){
        if(value >= 0.8){
            return "increase";
        }
        if(value >= -0.8){
            return "unchanged"
        }
        if(value < -0.8){
            return "decrease"
        }
    }
    
    const ueqScaleChart = [
        {
          name: "A",
          "Attractiveness": calculateGroupAverage(data, attractiveness)
        },
        {
          name: "P",
          "Perspicuity": calculateGroupAverage(data, perspicuity),
        },
        {
          name: "E",
          "Efficiency": calculateGroupAverage(data, efficiency),
        },
        {
            name: "D",
            "Dependability": calculateGroupAverage(data, dependability),
        },
        {
            name: "S",
            "Stimulation": calculateGroupAverage(data, stimulation),
        },
        {
            name: "N",
            "Novelty": calculateGroupAverage(data, novelty),
          },
    ];

    function bulatkanKeAtas(angka:number, desimal:number) {
        var pembulatan = Math.pow(10, desimal);
        return Math.ceil(angka * pembulatan) / pembulatan;
    }
    
    const ueqMeanScalePerItem = ueqparams.map((item,index)=>answerSumsArray[index].value/data.length)
    const ueqitemChart = ueqMeanScalePerItem.map((value,index) => ({
        name: index+1,
        "Mean": value
    }));
    
    const dataFormatter = (number: number) => {
        return number.toFixed(2);
    };
    return (
        <Grid numItemsLg={12} className="gap-6 mt-6">
            {/* Main section */}
            <Col numColSpanLg={7}>
            <Card className="h-full">
            <Title>Hasil Pengukuran UEQ</Title>
                <Table className='mt-5'>
                    <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-left">Item</TableHeaderCell>
                        <TableHeaderCell className="text-left">Mean</TableHeaderCell>
                        <TableHeaderCell className="text-left">Variance</TableHeaderCell>
                        <TableHeaderCell className="text-left">Std. Dev</TableHeaderCell>
                        <TableHeaderCell className="text-left">No.</TableHeaderCell>
                        <TableHeaderCell className="text-left">Left</TableHeaderCell>
                        <TableHeaderCell className="text-left">Right</TableHeaderCell>
                        <TableHeaderCell className="text-left">Scale</TableHeaderCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {ueqparams.map((ueq, index) => (
                        
                        <TableRow key={ueq.id}>
                        
                        <TableCell className='text-left'>{ueq.id}</TableCell>
                        <TableCell className="text-left">
                            <Flex className='space-x-2'>
                            <BadgeDelta deltaType={defineStatus(answerSumsArray[index].value/data.length)} />
                            <Text>{bulatkanKeAtas((answerSumsArray[index].value/data.length),1)}</Text>
                            </Flex>
                        </TableCell>
                        <TableCell className="text-left">{calculateVarianceWithConversion(data, ueq.id).toFixed(1)}</TableCell>
                        <TableCell className="text-left">{calculateStandardDeviation(calculateVarianceWithConversion(data, ueq.id)).toFixed(1)}</TableCell>
                        <TableCell className="text-left">{data.length}</TableCell>
                        <TableCell className="text-left">{ueq.param1}</TableCell>
                        <TableCell className="text-left">{ueq.param2}</TableCell>
                        <TableCell className="text-left">{ueq.scale}</TableCell>
                    
                        </TableRow>
                    
                    ))}
                    </TableBody>
                </Table>
            </Card>
            </Col>

            {/* KPI sidebar */}
            <Col numColSpanLg={5}>
            <div className="space-y-6">
                {/* Mean Started */}
                <Card>
                <Title>Skala UEQ (Mean&Variance)</Title>
                <Flex className="mt-8">
                    <Text>
                    <Bold>Scale</Bold>
                    </Text>
                    <Text>
                    <Bold>Mean / Variance</Bold>
                    </Text>
                </Flex>
                
                <List className="mt-1">
            
                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Attractiveness</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, attractiveness))} />
                                <Text>{calculateGroupAverage(data, attractiveness).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,attractiveness).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>

                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Perspicuity</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, perspicuity))} />
                                <Text>{calculateGroupAverage(data, perspicuity).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,perspicuity).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>

                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Efficiency</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, efficiency))} />
                                <Text>{calculateGroupAverage(data, efficiency).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,efficiency).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>

                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Dependability</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, dependability))} />
                                <Text>{calculateGroupAverage(data, dependability).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,dependability).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>
                    
                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Stimulation</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, stimulation))} />
                                <Text>{calculateGroupAverage(data, stimulation).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,stimulation).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>
                
                    <ListItem>
                        <Flex justifyContent="start" className="truncate space-x-2.5">
                        <Text className="truncate">Novelty</Text>
                        </Flex>
                        <Flex className='space-x-6'>
                            <Flex justifyContent='end' className='truncate space-x-1'>
                                <BadgeDelta deltaType={defineStatus(calculateGroupAverage(data, novelty))} />
                                <Text>{calculateGroupAverage(data, novelty).toFixed(2)}</Text>
                            </Flex>
                            <Text>{calculateVariance(data,novelty).toFixed(2)}</Text>
                        </Flex>
                    </ListItem>

                </List>
                </Card>
                {/* Mean Ended */}
                <Card>
                <Title>Diagram Skala UEQ</Title>
                <BarChart
                    className="mt-6"
                    data={ueqScaleChart}
                    index="name"
                    categories={["Attractiveness", "Perspicuity", "Efficiency", "Dependability", "Stimulation", "Novelty"]}
                    colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
                    valueFormatter={dataFormatter}
                    yAxisWidth={48}
                    showAnimation={true}
                    minValue={-3}
                    maxValue={3}
                    autoMinValue={true}
                />
                </Card>
                <Card>
                <Title>Diagram Mean Tiap Item</Title>
                <BarChart
                    className="mt-6 lg:h-[720px]"
                    data={ueqitemChart}
                    index={"name"}
                    categories={["Mean"]}
                    colors={["blue"]}
                    valueFormatter={dataFormatter}
                    yAxisWidth={48}
                    showAnimation={true}
                    layout='vertical'
                    />
                </Card>
            </div>
            </Col>
        </Grid>
    )
}

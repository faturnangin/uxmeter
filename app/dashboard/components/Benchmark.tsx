import React from "react";
import {
  Card,
  Legend,
  AreaChart,
  Title,
  Subtitle,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Text,
  Badge,
} from "@tremor/react";
import { it } from "node:test";

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

interface ueqChart {
  name: string;
  value: number;
}

interface ueqBenchmark {
  Scale:
    | "Attractiveness"
    | "Perspicuity"
    | "Efficiency"
    | "Dependability"
    | "Stimulation"
    | "Novelty";
  "25%": number;
  "50%": number;
  "75%": number;
  "90%": number;
}

export default function Benchmark({ data }: { data: UEQ[] }) {
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
    data: UEQ[],
    groupProperties: string[]
  ): number => {
    const convertedData = data.map((item) => ({
      ...item,
      answers: convertAnswers(item.answers),
    }));
    const total = convertedData.reduce((acc, item) => {
      const groupTotal = groupProperties.reduce(
        (groupAcc, prop) => groupAcc + item.answers[prop],
        0
      );
      return acc + groupTotal;
    }, 0);
    const average = total / (data.length * groupProperties.length);
    return average;
  };

  const ueqChart: ueqChart[] = [
    {
      name: "Attractiveness",
      value: calculateGroupAverage(data, attractiveness),
    },
    {
      name: "Perspicuity",
      value: calculateGroupAverage(data, perspicuity),
    },
    {
      name: "Efficiency",
      value: calculateGroupAverage(data, efficiency),
    },
    {
      name: "Dependability",
      value: calculateGroupAverage(data, dependability),
    },
    {
      name: "Stimulation",
      value: calculateGroupAverage(data, stimulation),
    },
    {
      name: "Novelty",
      value: calculateGroupAverage(data, novelty),
    },
  ];

  const benchmarkBorders = [
    {
      Scale: "Attractiveness",
      "25%": 0.69,
      "50%": 1.18,
      "75%": 1.58,
      "90%": 1.84,
    },
    {
      Scale: "Perspicuity",
      "25%": 0.72,
      "50%": 1.2,
      "75%": 1.73,
      "90%": 2.0,
    },
    {
      Scale: "Efficiency",
      "25%": 0.6,
      "50%": 1.05,
      "75%": 1.5,
      "90%": 1.88,
    },
    {
      Scale: "Dependability",
      "25%": 0.78,
      "50%": 1.14,
      "75%": 1.48,
      "90%": 1.7,
    },
    {
      Scale: "Stimulation",
      "25%": 0.5,
      "50%": 1,
      "75%": 1.35,
      "90%": 1.7,
    },
    {
      Scale: "Novelty",
      "25%": 0.16,
      "50%": 0.7,
      "75%": 1.12,
      "90%": 1.6,
    },
  ];

  const barChartdata = [
    {
      Scale: "Attractiveness",
      Excellent: 0.66,
      Good: 0.26,
      AboveAverage: 0.4,
      BelowAverage: 0.49,
      Bad: 0.69,
      LowerBorder: -1,
    },
    {
      Scale: "Perspicuity",
      Excellent: 0.5,
      Good: 0.27,
      AboveAverage: 0.53,
      BelowAverage: 0.48,
      Bad: 0.72,
      LowerBorder: -1,
    },
    {
      Scale: "Efficiency",
      Excellent: 0.62,
      Good: 0.38,
      AboveAverage: 0.45,
      BelowAverage: 0.45,
      Bad: 0.6,
      LowerBorder: -1,
    },
    {
      Scale: "Dependability",
      Excellent: 0.8,
      Good: 0.22,
      AboveAverage: 0.34,
      BelowAverage: 0.36,
      Bad: 0.78,
      LowerBorder: -1,
    },
    {
      Scale: "Stimulation",
      Excellent: 0.8,
      Good: 0.35,
      AboveAverage: 0.35,
      BelowAverage: 0.5,
      Bad: 0.5,
      LowerBorder: -1,
    },
    {
      Scale: "Novelty",
      Excellent: 0.9,
      Good: 0.48,
      AboveAverage: 0.42,
      BelowAverage: 0.54,
      Bad: 0.16,
      LowerBorder: -1,
    },
  ];

  function compareBenchmark(
    name: string,
    value: number
  ): { name: string; ColorIndicator: string; Interpretation: string } {
    const benchmarkData = {
      "Sangat Baik": {
        name: "Sangat Baik",
        ColorIndicator: "emerald",
        Interpretation: "Pada kisaran 10% hasil terbaik",
      },
      Baik: {
        name: "Baik",
        ColorIndicator: "green",
        Interpretation: "10% hasilnya lebih baik, 75% hasilnya lebih buruk",
      },
      "Diatas rata-rata": {
        name: "Diatas rata-rata",
        ColorIndicator: "lime",
        Interpretation: "25% hasilnya lebih baik, 50% hasilnya lebih buruk",
      },
      "Dibawah rata-rata": {
        name: "Dibawah rata-rata",
        ColorIndicator: "yellow",
        Interpretation: "50% hasilnya lebih baik, 25% hasilnya lebih buruk",
      },
      Buruk: {
        name: "Buruk",
        ColorIndicator: "red",
        Interpretation: "Di kisaran 25% hasil terburuknya",
      },
      Unknown: {
        name: "Unknown",
        ColorIndicator: "yellow",
        Interpretation: "Error Membaca Data",
      },
    };
    if (name === "Attractiveness") {
      if (value > benchmarkBorders[0]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[0]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[0]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[0]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }

    if (name === "Perspicuity") {
      if (value > benchmarkBorders[1]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[1]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[1]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[1]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }

    if (name === "Efficiency") {
      if (value > benchmarkBorders[2]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[2]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[2]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[2]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }

    if (name === "Dependability") {
      if (value > benchmarkBorders[3]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[3]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[3]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[3]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }

    if (name === "Stimulation") {
      if (value > benchmarkBorders[4]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[4]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[4]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[4]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }

    if (name === "Novelty") {
      if (value > benchmarkBorders[5]["90%"]) {
        return benchmarkData["Sangat Baik"];
      } else if (value > benchmarkBorders[5]["75%"]) {
        return benchmarkData["Baik"];
      } else if (value > benchmarkBorders[5]["50%"]) {
        return benchmarkData["Diatas rata-rata"];
      } else if (value > benchmarkBorders[5]["25%"]) {
        return benchmarkData["Dibawah rata-rata"];
      } else {
        return benchmarkData["Buruk"];
      }
    }
    return benchmarkData["Unknown"];
  }

  const dataFormatter = (number: number) => {
    return number.toFixed(2);
  };

  return (
    <>
      <Card>
        <Title>Benchmark</Title>
        <Subtitle className="text-justify">
          Rata-rata skala yang diukur ditetapkan dalam kaitannya dengan
          nilai-nilai yang ada dari kumpulan data benchmark. Kumpulan data ini
          berisi data dari 21.175 orang dari 468 penelitian mengenai berbagai
          produk (perangkat lunak bisnis, halaman web, toko web, jejaring
          sosial). Perbandingan hasil produk yang dievaluasi dengan data dalam
          benchmark memungkinkan kesimpulan tentang kualitas relatif produk yang
          dievaluasi dibandingkan dengan produk lain.
        </Subtitle>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Mean</TableHeaderCell>
              <TableHeaderCell>Benchmark</TableHeaderCell>
              <TableHeaderCell>Interpretasi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ueqChart.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Text>{item.value.toFixed(2)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    color={
                      compareBenchmark(item.name, item.value).ColorIndicator as
                        | "emerald"
                        | "green"
                        | "lime"
                        | "yellow"
                        | "red"
                    }
                  >
                    {compareBenchmark(item.name, item.value).name}
                  </Badge>
                </TableCell>
                <TableCell>
                  {compareBenchmark(item.name, item.value).Interpretation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="mt-5">
        <Title>Diagram Benchmark</Title>
        <Text className="mt-3">Batasan Pengukuran Benchmark</Text>
        <Legend
          categories={[
            "Buruk",
            "Di bawah rata-rata",
            "Di atas rata-rata",
            "Baik",
            "Sangat Baik",
          ]}
          colors={["red", "yellow", "lime", "green", "emerald"]}
        />
        <Legend categories={["Nilai Rata-rata"]} colors={["blue"]} />
        <div className="relative h-80 mt-5">
          <AreaChart
            className="absolute"
            data={barChartdata}
            index="Scale"
            categories={[
              "Bad",
              "BelowAverage",
              "AboveAverage",
              "Good",
              "Excellent",
            ]}
            colors={["red", "yellow", "lime", "green", "emerald"]}
            valueFormatter={dataFormatter}
            stack={true}
            minValue={-1}
            maxValue={2.5}
            showLegend={false}
          />
          <AreaChart
            className="absolute"
            data={ueqChart}
            index="name"
            categories={["value"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            minValue={-1}
            maxValue={2.5}
            showLegend={false}
          />
        </div>
      </Card>
    </>
  );
}

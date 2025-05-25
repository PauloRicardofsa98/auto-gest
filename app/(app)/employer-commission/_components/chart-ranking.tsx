"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

const chartConfig = {
  quantity: {
    label: "Quantidade",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartRankingProps {
  commissions: {
    value: number;
    quantityServices: number;
    name: string;
    id: number;
    address: string;
    email: string;
    uuid: string;
    phone: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const ChartRanking = ({ commissions }: ChartRankingProps) => {
  const data = commissions.map((commission) => {
    const name = commission.name.trimStart().split(" ");
    return {
      name: `${name[0]} ${name[1] || ""}`,
      quantity: commission.quantityServices,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantidade de serviços</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartRanking;

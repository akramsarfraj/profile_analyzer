import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import axios from "axios"
import { memo, useEffect, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const chartConfig = {
    commits: {
        label: "commits",
        color: "#2563eb",
    },

} satisfies ChartConfig


type ChatData = {
    date: string,
    commits: number
}

function CommitChat({ user }: { user: string }) {
    console.log("username :::: ", user);

    let [chartData, setChatData] = useState<ChatData[]>([])


    useEffect(() => {
       


        axios.get(`https://api.github.com/users/${user}/events/public`)
            .then((res) => {

                let data: ChatData[] = []
                res.data.forEach((e: any) => {

                    if (e.type === 'PushEvent') {

                        let date = new Date(e.created_at).toISOString().split("T")[0]
                        let f = data.some((s) => s.date === date)


                        if (f) {
                            for (let v of data) {
                                if (v.date === date) {
                                    v.commits = v.commits + 1;
                                }
                            }
                        } else {
                            data.push({ 'date': date, 'commits': 1 })
                        }

                    }
                })

                setChatData(data)

            })
            .catch((err) => {
                console.log(err);

            })




    }, [user])

    



    return (
        <div className="flex justify-center mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Commits daily chart</CardTitle>
                    <CardDescription>
                        Showing last 90 days commits
                    </CardDescription>
                </CardHeader>

                <ChartContainer config={chartConfig} className="h-80 w-250">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}

                            axisLine={false}
                            tickMargin={5}
                            minTickGap={10}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="commits" fill="var(--color-commits)" radius={4} />

                    </BarChart>
                </ChartContainer>

            </Card>
        </div>
    )
}

export default memo(CommitChat)
import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const Notecard = ({Title,Description}:{Title:string,Description:string}) => {
  return (
    <Card className="flex flex-col justify-center">
          <CardHeader>
            <CardTitle>{Title}</CardTitle>
            <CardDescription>{Description}</CardDescription>
          </CardHeader>
        </Card>
  )
}

export default Notecard
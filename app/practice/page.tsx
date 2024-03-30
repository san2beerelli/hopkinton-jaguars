"use client";

import { makeGet } from "@/service/api";
import { useEffect, useState } from "react";
import { parse, format } from "date-fns";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { getFilteredResponse } from "@/util/dateUtil";

const currentYear = new Date().getFullYear();

const getFormattedDate = (inputDateStr: string) => {
  const date = parse(
    `${inputDateStr} ${currentYear}`,
    "MM/dd yyyy",
    new Date()
  );

  const formattedDate = format(date, "MMMM dd, yyyy");
  return formattedDate;
};

export default function PracticePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const response = await makeGet("practice");
      const filteredResponse = getFilteredResponse(response);
      //@ts-ignore
      setScheduleList(filteredResponse);
      setLoading(false);
    };
    getSchedule();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        scheduleList.map(
          (item: any) =>
            item.Date &&
            item.Day && (
              <Card
                isBlurred
                radius="sm"
                style={{ width: 370, height: 100 }}
                key={item.Date + item.Day}
                className="border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm"
              >
                <CardBody>
                  <div className="flex flex-row align-middle gap-8 justify-between overflow-hidden">
                    <div
                      className="border-orange-200 border-solid border-1 rounded-lg flex flex-col justify-center items-center"
                      style={{ width: 100, height: 70 }}
                    >
                      <div className="font-extrabold text-xl">{item.Time}</div>
                      <div className="font-extrabold">{item.Field}</div>
                    </div>
                    <div className="flex flex-col justify-center gap-2 flex-1">
                      <div className="font-semibold text-xl text-center">
                        {item.Day}
                      </div>
                      <div className="font-thin text-center">
                        {getFormattedDate(item.Date)}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
        )
      )}
    </div>
  );
}

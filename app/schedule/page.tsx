"use client";

import { makeGet } from "@/service/api";
import { useEffect, useState } from "react";
import { parse, isFuture } from "date-fns";

import ScheduleItem from "@/components/schedule/scheduleItem";
import { Spinner } from "@nextui-org/react";
import { getFilteredResponse } from "@/util/dateUtil";

export default function SchedulePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const response = await makeGet("schedule");
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
            item.Time && (
              <ScheduleItem key={item.Game + item.Tournament} item={item} />
            )
        )
      )}
    </div>
  );
}

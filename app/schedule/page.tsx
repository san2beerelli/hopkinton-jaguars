"use client";

import { fetchSchedule } from "@/service/api";
import { useEffect, useState } from "react";

import ScheduleItem from "@/components/schedule/scheduleItem";
import { Spinner } from "@nextui-org/react";

export default function SchedulePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const response = await fetchSchedule();
      setScheduleList(response);
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
          (item) =>
            item.Date &&
            item.Time && (
              <ScheduleItem key={item.Game + item.Tournament} item={item} />
            )
        )
      )}
    </div>
  );
}

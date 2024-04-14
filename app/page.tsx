//@ts-nocheck

"use client";
import { makeGet } from "@/service/api";
import { getFilteredResponse } from "@/util/dateUtil";
import { getFormattedDate } from "@/util/otherUtil";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [nextGame, setNextGame] = useState({});
  const [nextPractice, setNextPractice] = useState({});
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const payload = { screen: "home" };
      const response = await makeGet(payload);
      const filteredGameResponse = getFilteredResponse(response.game);
      const filteredPracticeResponse = getFilteredResponse(response.practice);
      setNextGame(filteredGameResponse[0]);
      setNextPractice(filteredPracticeResponse[0]);
      setLoading(false);
    };
    getSchedule();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        <>
          <div className="text-lg font-bold text-left">Next Big Game</div>
          <Card
            style={{ minHeight: 120 }}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 w-full"
            radius="sm"
          >
            <CardBody>
              {nextGame?.Game ? (
                <>
                  <div
                    style={{ color: "#02273d" }}
                    className="text-xl font-bold italic"
                  >
                    Hopkinton Jaguars
                  </div>
                  <Image
                    priority
                    src="./images/VS_1.svg"
                    height={50}
                    width={50}
                    alt="VS"
                    className="self-center"
                  />
                  <div
                    style={{ color: "#02273d" }}
                    className="text-xl font-bold italic text-right"
                  >
                    {nextGame.Game}
                  </div>
                </>
              ) : (
                <div
                  style={{ color: "#02273d" }}
                  className="text-2xl font-bold italic text-center pt-7"
                >
                  No Games Planned yet
                </div>
              )}
            </CardBody>
          </Card>
          <div className="text-lg font-bold text-left">
            Next Practice Session
          </div>
          <Card
            style={{ minHeight: 120 }}
            className="bg-gradient-to-r from-amber-200 to-yellow-500"
            radius="sm"
          >
            <CardBody style={{ color: "#02273d" }} className="p-0">
              {nextPractice?.Time ? (
                <div className="flex flex-row align-middle gap-8 justify-between overflow-hidden m-6">
                  <div
                    className="border-gray-700 border-solid border-1 rounded-lg flex flex-col justify-center items-center"
                    style={{ width: 100, height: 70 }}
                  >
                    <div className="font-extrabold text-xl">
                      {nextPractice.Time}
                    </div>
                    <div className="font-extrabold">{nextPractice.Field}</div>
                  </div>
                  <div className="flex flex-col justify-center gap-2 flex-1">
                    <div className="font-semibold text-xl text-center">
                      {nextPractice.Day}
                    </div>
                    <div className="font-medium text-center">
                      {getFormattedDate(nextPractice.Date)}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{ color: "#02273d" }}
                  className="text-2xl font-bold italic text-center pt-7"
                >
                  No Practices Planned yet
                </div>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </section>
  );
}

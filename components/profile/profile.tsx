//@ts-nocheck
"use client";

import react, { useEffect, useState } from "react";
import { Chip, Spinner, Tab, Tabs } from "@nextui-org/react";
import { makeGet } from "@/service/api";
import { getFilteredResponse } from "@/util/dateUtil";
import { useApplicaiton } from "@/context/ApplicationProvider";
import ResponseListView from "./responseList";

const filterResponses = (item) => {
  return item.filter((info) => info.response === "yes");
};

export default function ProfileView() {
  const [loading, setLoading] = useState(false);
  const { userProfile } = useApplicaiton();
  const [response, setResponse] = useState({});
  const profile = userProfile;
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const payload = { screen: "playerInfo" };
      const name = userProfile?.userProfile?.name;
      if (name) {
        payload.name = name;
      }
      const response = await makeGet(payload);
      const filteredPracticeResponse = getFilteredResponse(
        response.practiceSchedule
      );
      const filteredGameResponse = getFilteredResponse(response.gameSchedule);
      const gameResponses = filterResponses(filteredGameResponse);
      const practiceResponses = filterResponses(filteredPracticeResponse);
      const obj = {
        gameResponseCount: gameResponses.length,
        gameResponses,
        practiceResponses,
        practiceResponseCount: practiceResponses.length,
      };
      setResponse(obj);
      setLoading(false);
    };
    if (userProfile?.userProfile?.name) {
      getSchedule();
    }
  }, [userProfile]);
  return (
    <>
      {loading ? (
        <Spinner color="warning" />
      ) : (
        <div className="flex w-full flex-col" style={{ width: 380 }}>
          <Tabs
            aria-label="Options"
            color="warning"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#ecb84a]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#ecb84a]",
            }}
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <span>Games</span>
                  {response?.gameResponseCount !== 0 && (
                    <Chip size="sm" variant="faded" color="warning">
                      {response?.gameResponseCount}
                    </Chip>
                  )}
                </div>
              }
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  {response?.gameResponseCount === 0
                    ? "Please Take Poll"
                    : "Games You're Enrolled In"}
                </div>
                <ResponseListView list={response?.gameResponses} type="game" />
              </div>
            </Tab>
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <span>Practices</span>
                  {response?.practiceResponseCount !== 0 && (
                    <Chip size="sm" variant="faded" color="warning">
                      {response?.practiceResponseCount}
                    </Chip>
                  )}
                </div>
              }
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  {response?.practiceResponseCount === 0
                    ? "Please Take Poll"
                    : "Practices You're Enrolled In"}
                </div>
                <ResponseListView
                  list={response?.practiceResponses}
                  type="practice"
                />
              </div>
            </Tab>
            <Tab
              key="videos"
              title={
                <div className="flex items-center space-x-2">
                  <span>Profile</span>
                </div>
              }
            >
              <div>{profile?.userProfile?.name}</div>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}

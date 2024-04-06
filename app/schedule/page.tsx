//@ts-nocheck
"use client";

import { makeGet } from "@/service/api";
import { useEffect, useState } from "react";

import ScheduleItem from "@/components/schedule/scheduleItem";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { getFilteredResponse } from "@/util/dateUtil";
import { useApplicaiton } from "@/context/ApplicationProvider";

const getGameKey = (schedule) => {
  return `${schedule?.Tournament}_${schedule?.Date}_${schedule?.Time}_${schedule?.Game}`;
};

export default function SchedulePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const [playerSchedule, setPlayerSchedule] = useState({});
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [availability, setAvailabilty] = useState("");
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);
  const { userProfile } = useApplicaiton();
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const payload = { screen: "schedule" };
      const name = userProfile?.userProfile?.name;
      if (name) {
        payload.name = name;
      }
      const response = await makeGet(payload);
      const filteredResponse = getFilteredResponse(response.schedule);
      setPlayerSchedule(response.playerSchedule);
      //@ts-ignore
      setScheduleList(filteredResponse);
      setLoading(false);
    };
    getSchedule();
  }, [userProfile]);

  const onItemClickHandler = (item: any) => {
    if (userProfile?.userProfile?.session) {
      setSchedule(item);
      const game = getGameKey(item);
      const response = playerSchedule[game] || "";
      setAvailabilty(response);
      onOpen();
    }
  };

  const onSaveClickHandler = () => {
    const game = getGameKey(schedule);
    makeGet({
      screen: "availability",
      name: userProfile?.userProfile?.name,
      game,
      available: availability,
    });
    const copy = { ...playerSchedule, [game]: availability };
    setPlayerSchedule(copy);
    onClose();
    setAvailabilty("");
  };
  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        scheduleList.map(
          (item: any) =>
            item.Date &&
            item.Time && (
              <ScheduleItem
                key={item.Game + item.Tournament}
                item={item}
                onClick={onItemClickHandler}
                availability={playerSchedule[getGameKey(item)]}
              />
            )
        )
      )}
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {schedule?.Tournament}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
                <div className="text-2xl font-semibold">
                  Game vs {schedule?.Game}
                </div>
                <div className="text-lg font-thin">
                  {schedule?.Date} at {schedule?.Time} in {schedule?.Address}
                </div>
                <RadioGroup
                  orientation="vertical"
                  value={availability}
                  onValueChange={(value) => setAvailabilty(value)}
                  className="py-8"
                >
                  <Radio value="yes" color="warning">
                    Available
                  </Radio>
                  <Radio className="mt-1" value="no" color="warning">
                    Not Available
                  </Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button fullWidth color="warning" onPress={onSaveClickHandler}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

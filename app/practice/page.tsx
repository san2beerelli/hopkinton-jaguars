//@ts-nocheck
"use client";

import { makeGet } from "@/service/api";
import { useEffect, useState } from "react";
import { parse, format } from "date-fns";
import {
  Button,
  Card,
  CardBody,
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

const getPracticeKey = (item) => {
  return `${item?.Day}_${item?.Date}_${item?.Time}_${item?.Field}`;
};

export default function PracticePage() {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailabilty] = useState("");
  const [schedule, setSchedule] = useState({});
  const [playerSchedule, setPlayerSchedule] = useState({});
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { userProfile } = useApplicaiton();
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const payload = { screen: "practice" };
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
      const game = getPracticeKey(item);
      const response = playerSchedule[game] || "";
      setAvailabilty(response);
      onOpen();
    }
  };

  const onSaveClickHandler = () => {
    const game = getPracticeKey(schedule);
    makeGet({
      screen: "availability",
      name: userProfile?.userProfile?.name,
      game,
      type: "practice",
      available: availability,
    });
    const copy = { ...playerSchedule, [game]: availability };
    setPlayerSchedule(copy);
    onClose();
    setAvailabilty("");
  };
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
                <CardBody onClick={() => onItemClickHandler(item)}>
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
                Practice on {schedule?.Day}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
                <div className="text-lg font-thin">
                  {schedule?.Date} at {schedule?.Time} in {schedule?.Field}
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

// @ts-nocheck
"use client";
import { title } from "@/components/primitives";
import { makeGet } from "@/service/api";
import { getFilteredResponse } from "@/util/dateUtil";
import {
  Card,
  CardBody,
  Divider,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const getGameKey = (schedule) => {
  return `${schedule?.Tournament}_${schedule?.Date}_${schedule?.Time}_${schedule?.Game}`;
};

const getPracticeKey = (item) => {
  return `${item?.Day}_${item?.Date}_${item?.Time}_${item?.Field}`;
};

export default function ResponsePage() {
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [games, setGames] = useState([]);
  const [practices, setPractices] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    const getGround = async () => {
      setLoading(true);
      const payload = { screen: "home" };
      const response = await makeGet(payload);
      const filteredGameResponse = getFilteredResponse(response.game);
      const filteredPracticeResponse = getFilteredResponse(response.practice);
      setPractices(filteredPracticeResponse);
      setGames(filteredGameResponse);
      setLoading(false);
    };
    getGround();
  }, []);

  const getPlayersResponse = async (item, type) => {
    setLoadingModal(true);
    const gameKey = type === "game" ? getGameKey(item) : getPracticeKey(item);
    console.log(gameKey);
    const result = await makeGet({
      screen: "response",
      type,
      game: gameKey,
    });
    console.log(result);
    setResponses(result[gameKey]);
    setLoadingModal(false);
  };
  const onItemClickHandler = (item: any, type) => {
    setSelectedItem(item);
    getPlayersResponse(item, type);
    onOpen();
  };
  const filteredYesResult = responses.filter((obj) => {
    const value = Object.values(obj)[0];
    return value === "yes";
  });
  const filteredYes = filteredYesResult.map((item) => Object.keys(item)[0]);
  const filteredNoResult = responses.filter((obj) => {
    const value = Object.values(obj)[0];
    return value === "no";
  });
  const filteredNo = filteredNoResult.map((item) => Object.keys(item)[0]);
  const filteredNoResponseResult = responses.filter((obj) => {
    const value = Object.values(obj)[0];
    return value === "";
  });
  const filteredNoResponse = filteredNoResponseResult.map(
    (item) => Object.keys(item)[0]
  );
  return (
    <section className="flex flex-col items-center justify-center gap-4 flex-1">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" fullWidth>
            <Tab key="games" title="Games">
              <Card>
                <CardBody>
                  <Listbox
                    style={{ width: 380 }}
                    aria-label="Games"
                    className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible"
                    itemClasses={{
                      base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                    }}
                  >
                    {games.map((game, index) => (
                      <ListboxItem
                        key={game.Tournament + index}
                        onClick={() => onItemClickHandler(game, "game")}
                      >
                        {game.Tournament} : {game.Game}
                      </ListboxItem>
                    ))}
                  </Listbox>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="practices" title="Practices">
              <Card>
                <CardBody>
                  <Listbox
                    style={{ width: 380 }}
                    aria-label="Practices"
                    className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible"
                    itemClasses={{
                      base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                    }}
                  >
                    {practices.map((practice, index) => (
                      <ListboxItem
                        key={practice.Date + index}
                        onClick={() => onItemClickHandler(practice, "practice")}
                      >
                        {practice.Field} : {practice.Date} - {practice.Day} -{" "}
                        {practice.Time}
                      </ListboxItem>
                    ))}
                  </Listbox>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
          <Modal
            isOpen={isOpen}
            placement="center"
            onOpenChange={onOpenChange}
            backdrop="blur"
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">
                    {selectedItem.Tournament || selectedItem.Date} -{" "}
                    {selectedItem.Game || selectedItem.Day}
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-1">
                    {loadingModal ? (
                      <Spinner color="warning" />
                    ) : (
                      <>
                        <div className="text-lg font-semibold">Available</div>
                        <div className="flex flex-col">
                          {filteredYes.map((name) => (
                            <div className="text-lg font-thin" key={name}>
                              {name}
                            </div>
                          ))}
                        </div>
                        <Divider />
                        <div className="text-lg font-semibold">
                          Not Available
                        </div>

                        <div className="flex flex-col">
                          {filteredNo.map((name) => (
                            <div className="text-lg font-thin" key={name}>
                              {name}
                            </div>
                          ))}
                        </div>
                        <Divider />
                        <div className="text-lg font-semibold">No Response</div>
                        <div className="flex flex-col">
                          {filteredNoResponse.map((name) => (
                            <div className="text-lg font-thin" key={name}>
                              {name}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </section>
  );
}

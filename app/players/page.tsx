"use client";

import { makeGet } from "@/service/api";
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";

const roles = {
  Batter: {
    name: "Batter",
    icon: "./images/batsman.svg",
  },
  Bowler: {
    name: "Bowler",
    icon: "./images/bowler.svg",
  },
  Allrounder: {
    name: "All-Rounder",
    icon: "./images/all-rounder.svg",
  },
  WKBatter: {
    name: "WK Keeper-Batter",
    icon: "./images/wicket-keeper.svg",
  },
};

export default function PlayersPage() {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPlayers = async () => {
      setLoading(true);
      const response = await makeGet("players");
      setPlayersList(response);
      setLoading(false);
    };
    getPlayers();
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-8 flex-1 justify-center">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        playersList.map(
          (item: any) =>
            item.Name && (
              <Card key={item.Name} radius="none" shadow="sm">
                <CardBody className="flex flex-row items-start ">
                  {item.Name === "Santhosh Beerelli" ? (
                    <Image
                      height={20}
                      width={20}
                      src={"./images/captain.svg"}
                      alt="bowler"
                    />
                  ) : (
                    <Spacer style={{ width: 20 }} />
                  )}
                  <Image
                    alt={item.Name}
                    height={200}
                    src={item.Photo}
                    width={200}
                  />
                  <Image
                    height={26}
                    width={26}
                    //@ts-ignore
                    src={roles[item.Role].icon}
                    alt="bowler"
                  />
                </CardBody>
                <CardFooter className="p-0">
                  <div className="flex flex-col gap-2 items-center flex-1 border-solid border-t-1 border-t-orange-200 py-2">
                    <h4 className="font-extrabold text-center">{item.Name}</h4>
                    <h1 className="font-light text-center">
                      {
                        //@ts-ignore
                        roles[item.Role].name
                      }
                    </h1>
                  </div>
                </CardFooter>
              </Card>
            )
        )
      )}
    </div>
  );
}

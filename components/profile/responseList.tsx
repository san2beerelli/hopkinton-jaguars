//@ts-nocheck
"use client";

import { Divider } from "@nextui-org/react";
import react from "react";

const PracticeListItem = ({ item }) => {
  return (
    <div>
      <div className="flex flex-row gap-1 h-10 align-middle items-center">
        <Divider orientation="vertical" />
        <div className="font-bold text-medium w-16">{item?.Field}</div>
        <Divider orientation="vertical" />
        <div className="font-bold text-medium flex-1">{item?.Day}</div>
        <Divider orientation="vertical" />
        <div className="flex flex-col justify-center w-16">
          <div className="font-extralight text-xs">{item?.Date}</div>
          <div className="font-extralight text-xs">{item?.Time}</div>
        </div>
        <Divider orientation="vertical" />
      </div>
      <Divider />
    </div>
  );
};
{
  /* <div>
      {item?.Date}-{item?.Day}-{item?.Time}-{item?.Field}
    </div> */
}
const GameListItem = ({ item }) => {
  return (
    <div>
      <div className="flex flex-row gap-1 h-10 align-middle items-center">
        <Divider orientation="vertical" />
        <div className="font-bold text-medium w-16">{item?.Tournament}</div>
        <Divider orientation="vertical" />
        <div className="font-bold text-medium flex-1">{item?.Game}</div>
        <Divider orientation="vertical" />
        <div className="flex flex-col justify-center w-16">
          <div className="font-extralight text-xs">{item?.Date}</div>
          <div className="font-extralight text-xs">{item?.Time}</div>
        </div>
        <Divider orientation="vertical" />
      </div>
      <Divider />
    </div>
  );
};

export default function ResponseListView({ type, list }) {
  return (
    <div className="flex flex-col">
      <Divider />
      {list.map((item, index) => {
        return type === "game" ? (
          <GameListItem item={item} key={`${item.Date}_${index}`} />
        ) : (
          <PracticeListItem item={item} key={`${item.Date}_${index}`} />
        );
      })}
    </div>
  );
}

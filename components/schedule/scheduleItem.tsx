import react from "react";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

export default function ScheduleItem({ item }) {
  return (
    <div className="flex flex-col">
      <h4
        className="text-xl font-bold text-left mb-1"
        style={{ color: "#ffe500" }}
      >
        {item.Tournament}
      </h4>
      <div className="flex">
        <Card
          style={{
            backgroundColor: "#ffe500",
            color: "#1d1d1d",
            minWidth: 135,
          }}
          className="justify-center items-center"
          radius="none"
        >
          <h3 className="text-xl font-bold italic">Hopkinton Jaguars</h3>
        </Card>
        <Card
          style={{
            backgroundColor: "#ffffff",
            color: "#1d1d1d",
            minWidth: 75,
            padding: 0,
          }}
          radius="none"
        >
          <Image
            priority
            src="./images/VS.svg"
            height={100}
            width={100}
            alt="VS"
          />
        </Card>
        <Card
          style={{
            backgroundColor: "#ffe500",
            color: "#1d1d1d",
            minWidth: 135,
          }}
          className="justify-center items-center"
          radius="none"
        >
          <h3 className="text-xl font-bold italic">{item.Game}</h3>
        </Card>
      </div>
      <Card radius="none">
        <CardBody className="flex flex-row justify-between font-bold">
          <div>
            {item.Date} {item.Time}
          </div>
          <div>{item.Address}</div>
        </CardBody>
      </Card>
    </div>
  );
}

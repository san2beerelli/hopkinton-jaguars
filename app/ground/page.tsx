// @ts-nocheck
"use client";
import { title } from "@/components/primitives";
import { makeGet } from "@/service/api";
import { Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
export default function GroundPage() {
  const [loading, setLoading] = useState(false);
  const [grounds, setGrounds] = useState([]);
  useEffect(() => {
    const getGround = async () => {
      setLoading(true);
      const payload = { screen: "ground" };
      const response = await makeGet(payload);
      setGrounds(response.address);
      setLoading(false);
    };
    getGround();
  }, []);
  return (
    <section className="flex flex-col items-center justify-center gap-4 flex-1">
      {loading ? (
        <Spinner color="warning" />
      ) : (
        <>
          {grounds.map(
            (ground, index) =>
              ground.Ground && (
                <Card
                  key={ground.Ground + index}
                  style={{
                    minHeight: 90,
                    width: 370,
                    //backgroundColor: "#1d1d1d",
                  }}
                  radius="sm"
                >
                  <CardBody className="w-full">
                    <div className="flex flex-col justify-center items-center">
                      <div className="p-2">{ground.Ground}</div>
                      <Divider style={{ color: "#ECB84A" }} />
                      <div className="p-4">{ground.Address}</div>
                    </div>
                  </CardBody>
                </Card>
              )
          )}
        </>
      )}
    </section>
  );
}

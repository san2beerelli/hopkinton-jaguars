"use client";

import { makeGet } from "@/service/api";
import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SigninPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        setLoading(true);
        const session = searchParams.get("session") || "";
        const response = await makeGet("validUser", "", session);
        setLoading(false);
        if (response.name !== "No User Found") {
          const obj = response;
          obj.session = session;
          window.localStorage.setItem("profile", JSON.stringify(obj));
          push("/profile");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [searchParams, push]);

  return (
    <Suspense>
      <>{loading ? <Spinner color="warning" /> : null}</>;
    </Suspense>
  );
}

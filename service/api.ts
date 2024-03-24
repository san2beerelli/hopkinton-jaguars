import { data } from "autoprefixer";

export const dynamic = "force-dynamic";
async function fetchSchedule() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbxQZL8RV3AR8lxC4HNZrGYnVBMd-nyLfzGzYCsvs9Ih5DrCj0ZrKfMD_qgPTE_UziZv7A/exec",
    {
      method: "GET",
      redirect: "follow",
    }
  );
  const text = await res.text();
  const { data } = JSON.parse(text);

  // const json = await res.json();
  /* if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  } */

  return data;
}

export { fetchSchedule };

export const dynamic = "force-dynamic";
async function makeGet(
  screen: string,
  email: string = "",
  sessionId: string = ""
) {
  let BaseUrl =
    "https://script.google.com/macros/s/AKfycbyc7xic_dGL_OeVsY8mYO7UTHWoQ9dGrvO6eYZj4WxRX9bTt2PuDZkzxYaGpTOj3yj0Mg/exec?";
  if (screen) {
    BaseUrl = `${BaseUrl}screen=${screen}`;
  }
  if (email) {
    BaseUrl = `${BaseUrl}&email=${email}`;
  }
  if (sessionId) {
    BaseUrl = `${BaseUrl}&sessionId=${sessionId}`;
  }

  const res = await fetch(BaseUrl, {
    method: "GET",
    redirect: "follow",
  });
  const text = await res.text();
  const { data } = JSON.parse(text);

  // const json = await res.json();
  /* if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  } */

  return data;
}

export { makeGet };

export const dynamic = "force-dynamic";

type RequestObj = {
  screen: string;
  email?: string;
  sessionId?: string;
  name?: string;
  game?: string;
  available?: string;
};
async function makeGet(request: RequestObj) {
  let BaseUrl =
    "https://script.google.com/macros/s/AKfycbyc7xic_dGL_OeVsY8mYO7UTHWoQ9dGrvO6eYZj4WxRX9bTt2PuDZkzxYaGpTOj3yj0Mg/exec?";
  if (request.screen) {
    BaseUrl = `${BaseUrl}screen=${request.screen}`;
  }
  if (request.email) {
    BaseUrl = `${BaseUrl}&email=${request.email}`;
  }
  if (request.sessionId) {
    BaseUrl = `${BaseUrl}&sessionId=${request.sessionId}`;
  }
  if (request.name) {
    BaseUrl = `${BaseUrl}&name=${request.name}`;
  }
  if (request.game) {
    BaseUrl = `${BaseUrl}&game=${request.game}`;
  }
  if (request.available) {
    BaseUrl = `${BaseUrl}&available=${request.available}`;
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

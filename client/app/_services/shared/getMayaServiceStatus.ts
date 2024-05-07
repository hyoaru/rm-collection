"use server";

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

export default async function getMayaServiceStatus() {
  const API_END_POINT = "p3/util/ping";
  const API_BASE_URL = process.env.NEXT_PUBLIC_MAYA_BASE_URL;
  const SECRET_API_KEY = process.env.MAYA_SECRET_API_KEY;
  const encodedAuthorization = btoa(`${SECRET_API_KEY}:${SECRET_API_KEY}`);

  const { data, error } = await fetch(`${API_BASE_URL}/${API_END_POINT}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${encodedAuthorization}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const response: any = { data: null, error: null };
      if (res["status"] === "UP") {
        response.data = res;
      } else {
        response.error = {
          message: "Maya service is currently down.",
        };
      }
      return response;
    })
    .catch((error) => ({ data: null, error: error }));

  return { data, error: processErrorToCrossSideSafe(error) };
}

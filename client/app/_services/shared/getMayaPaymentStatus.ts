"use server";

type GetMayaPaymentStatusResponse = {
  error: {
    code: string;
    message: string;
  } | null;
  data: {
    id: string;
    status: string;
  } | null;
};

type GetMayaPaymentStatusParams = {
  checkoutId: string;
};

export default async function getMayaPaymentStatus({ checkoutId }: GetMayaPaymentStatusParams) {
  const API_END_POINT = `payments/v1/payments/${checkoutId}/status`;
  const API_BASE_URL = process.env.NEXT_PUBLIC_MAYA_BASE_URL;
  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_MAYA_PUBLIC_API_KEY;
  const encodedAuthorization = btoa(`${PUBLIC_API_KEY}:${PUBLIC_API_KEY}`);

  const response: GetMayaPaymentStatusResponse = {
    data: null,
    error: null,
  };

  await fetch(`${API_BASE_URL}/${API_END_POINT}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${encodedAuthorization}`,
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res?.code || !res?.status) {
        response.error = res
      } else {
        response.data = res
      }
    })

  return response;
}

const tmpToken = "";

const templateFetch = async <T>(
  apiUrl: string,
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE",
  body?: object,
  onFetchNonOk?: (fetchRes: Response) => void,
  onErrorCatch?: (error: unknown) => void,
) => {
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      apiUrl,

      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body:
          method === "PUT" || method === "POST" || method === "PATCH"
            ? JSON.stringify(body)
            : undefined,
      },
    );
    if (!res.ok) {
      if (onFetchNonOk) onFetchNonOk(res);
      // onFetchNonOk에서 throw을 안 할수도 있어서
      else throw new Error(`HTTP 에러! status:${res.status}`);
    }

    const result: T = await res.json();
    return result;
  } catch (e) {
    if (onErrorCatch) onErrorCatch(e);
    console.error(`fetch error: ${e}`);
  }
};

export { templateFetch };

async function callAPI({ endpoint, httpMethod = "POST", opts }) {
  console.log("callAPI");
  const { method, body, headers, contentType } = {
    method: httpMethod,
    body: null,
    headers: {},
    contentType: "application/json",
    ...opts,
  };

  const res = await fetch(endpoint, {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: {
      "Content-Type": contentType,
      ...headers,
    },
  });
  console.log(res);

  if (res.status === 200) {
    const response = await res.json();
    return response;
  } else {
    throw new Error(res.statusText);
  }
}

module.exports = callAPI;

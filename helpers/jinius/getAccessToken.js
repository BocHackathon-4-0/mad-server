const JINIUS_CONSTANTS = require("./constants");

async function getAccessToken() {
  console.log(">> Jinius API - get access token");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhWk95S3Q0dHRjZTFwb3NpUVB4VVlVTlZfUkptel9EWjVMQkp0eEp6UDRBIn0.eyJleHAiOjE2OTY0MzMxNzQsImlhdCI6MTY5NjQzMjg3NCwianRpIjoiZjgyN2ExNzEtZjlmMC00NGMwLTgxNTMtYThkNmEyODMyZmYwIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW50ZWdyYXRpb24ucGxhdGZvcm0uY3kvYXV0aC9yZWFsbXMvcGxhdGZvcm0taW50ZWdyYXRpb24iLCJzdWIiOiI3ZDM5ODU1MC0yYzNjLTQ1ZDMtYmE2OS1mODNjM2E0NGU2ZmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI1ZjQxODc4YS02ZTdiLTQ5YzktYWM5MC1iMmE1OTI3ZWI4M2MiLCJhY3IiOiIxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6IjVmNDE4NzhhLTZlN2ItNDljOS1hYzkwLWIyYTU5MjdlYjgzYyIsImNsaWVudEhvc3QiOiI0Ni4xOTkuMjEzLjUxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVmNDE4NzhhLTZlN2ItNDljOS1hYzkwLWIyYTU5MjdlYjgzYyIsImNsaWVudEFkZHJlc3MiOiI0Ni4xOTkuMjEzLjUxIiwibGVnYWxFbnRpdHkiOiI1ZjQxODc4YS02ZTdiLTQ5YzktYWM5MC1iMmE1OTI3ZWI4M2MifQ.EnWwrn1wqbXhdo5LyG8E0iKIWrsQrUpSH2f5fyZkn-mh_nNt0AxInkWPF9GjZS_dVB7Dqc9NJUD7Qm7MVY-yO73_CrduLIKzZVS_e_yHzW8p_ia0tGZtwplbX85sakD4hOWuyzIqi_dshQmqEyUBRlPFPTisz_Mmfp4S4z4PW0ZjtvmyK5LyfB6SYuuL6btIR9X7G-a7AFuAqIRRG80gIsi0-5-sGsA6HgPQbNrcw4v8-4dGxv_F3OIoLic-dQcQ1iaEtaW5N556V-xlycg_8u-ly-G5AVngI43Ru2swu9TPGzsnzNgMfSyXSnYNg7Sgt7kzFOrKmidlmxeQaOur0Q"
  );
  myHeaders.append(
    "Cookie",
    "incap_ses_8219_2975890=QjJ4TvOV1Uu0g6PoTMIPcsmSHWUAAAAA49yhjvnZdowRVXLAwAUHAw==; visid_incap_2975890=z/PFbnzVTQCZ0X+Zcq4nsV6ZFWUAAAAAQUIPAAAAAAArJkZ7+AcHoJCQalh60y64"
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", process.env.JINIUS_CLIENT_ID);
  urlencoded.append("client_secret", process.env.JINIUS_CLIENT_SECRET);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const { access_token } = await fetch(
    `${JINIUS_CONSTANTS.api}${JINIUS_CONSTANTS.endPoints.getClientToken}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return access_token;
}

module.exports = getAccessToken;

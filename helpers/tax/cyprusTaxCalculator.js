async function cyprusTaxCalculator({ monthly = true, amount }) {
  console.log(">> Calculating tax");

  if (!monthly) {
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("authority", "pwapi.ex2b.com");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-GB,en;q=0.6");
  myHeaders.append("cache-control", "no-cache");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("origin", "https://exness-careers.com");
  myHeaders.append("pragma", "no-cache");
  myHeaders.append(
    "sec-ch-ua",
    '"Brave";v="117", "Not;A=Brand";v="8", "Chromium";v="117"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "cross-site");
  myHeaders.append("sec-gpc", "1");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "Cookie",
    "incap_ses_8077_2507822=5b5WOYpGEjtxGEgsGUYXcKMCH2UAAAAAt4iDv57mrltaXNstFvxhLA==; nlbi_2507822=1TGqCI4KTnv0L5tfJH6qrwAAAACeTmJUU/i5rBOxF+nTqRHZ; visid_incap_2507822=QG8rc0LpQZCDFR3OTJMMPqMCH2UAAAAAQUIPAAAAAACAcW2IjVeZHy6ms7vbFbyf"
  );

  const graphql = JSON.stringify({
    query:
      "query CalculateSalaryCy($grossMonth: NonNegativeFloat) {\n  calculateSalaryCy(gross_month: $grossMonth) {\n    gross_month\n    social_insurance_month\n    gesy_month\n    tax_exemption_month\n    tax_exemption_percent\n    calculation_main {\n      tax_month\n      total_tax_month\n      net_month\n      __typename\n    }\n    calculation_add {\n      tax_month\n      total_tax_month\n      net_month\n      __typename\n    }\n    __typename\n  }\n}",
    variables: { grossMonth: amount },
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  const res = await fetch("https://pwapi.ex2b.com/", requestOptions)
    .then((response) => response.json())
    // .catch((error) => console.log("error", error));
    .catch(() => console.log(null));

  const { calculateSalaryCy } = res.data;
  const totalTax =
    calculateSalaryCy.social_insurance_month +
    calculateSalaryCy.gesy_month +
    calculateSalaryCy.calculation_add.tax_month;
  const result = {
    gross: calculateSalaryCy.gross_month.toFixed(2),
    socialInsurance: calculateSalaryCy.social_insurance_month.toFixed(2),
    gesy: calculateSalaryCy.gesy_month.toFixed(2),
    tax: calculateSalaryCy.calculation_add.tax_month.toFixed(2),
    totalTax: totalTax.toFixed(2),
    net: (calculateSalaryCy.gross_month - totalTax).toFixed(2),
  };
  return result;
}

module.exports = cyprusTaxCalculator;

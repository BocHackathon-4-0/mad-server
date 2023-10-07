const JINIUS_CONSTANTS = require("./constants");

const companiesLookup = {
  "invoice@company.com": {
    recipientVatNumber: "10000001A",
    recipientTaxIdNumber: "90000001A",
    recipientCompanyRegistrationNumber: "AA000001",
    recipientBusinessUnitId: "",
  },
};

async function createInvoice({ token, email, companyEmail, initials, amount }) {
  console.log(">> Jinius API - create invoice");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append(
    "Cookie",
    "incap_ses_8219_2975890=QjJ4TvOV1Uu0g6PoTMIPcsmSHWUAAAAA49yhjvnZdowRVXLAwAUHAw==; visid_incap_2975890=z/PFbnzVTQCZ0X+Zcq4nsV6ZFWUAAAAAQUIPAAAAAAArJkZ7+AcHoJCQalh60y64"
  );

  const invoiceNumber = `MAD-${initials}-${Math.floor(Math.random() * 20000)}`;

  const rawTwo = JSON.stringify({
    net: amount,
    vatAmount: 0,
    totalAmount: amount,
    discount: 0,
    initial: amount,
    lineItems: [
      {
        code: "LI001",
        description: `Freelance work for ${email}`,
        quantity: 1,
        unit: "Pieces",
        price: amount,
        discountPercentage: 0,
        taxPercentage: "None",
        discount: 0,
        lineTotal: amount,
        taxAmount: 0,
      },
    ],
    documentNumber: invoiceNumber,
    dueDate: "2023-11-19T22:00:00Z",
    issueDate: new Date().toISOString(),
    kind: "<string>",
    id: "<string>",
    status: "",
    modificationDate: new Date().toISOString(),
    fileId: "",
    description: `Freelance work for ${email}`,
    issuerVatNumber: "38941288C",
    issuerTaxIdNumber: "38941288C",
    issuerCompanyRegistrationNumber: "AB389412",
    issuerBusinessUnitId: "",
    issuerBusinessUnitIdentifiers: [],
    // recipientVatNumber: "10000001A",
    // recipientTaxIdNumber: "90000001A",
    // recipientCompanyRegistrationNumber: "AA000001",
    recipientBusinessUnitId: "",
    ...companiesLookup[companyEmail],
    // recipientBusinessUnitIdentifiers: [
    //   {
    //     identifierType: "SystemUnitId",
    //     id: "0102",
    //   },
    // ],
    orderReference: "",
    documents: [],
    payments: [],
    supportingFilesIds: [],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: rawTwo,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${JINIUS_CONSTANTS.api}${JINIUS_CONSTANTS.endPoints.createInvoice}`,
      requestOptions
    ).then((response) => response.json());
    // console.log(res);
    // console.log(res.status);

    console.log(">> Jinius API - success invoice created", invoiceNumber);

    if (res.status) {
      return invoiceNumber;
    } else {
      console.log(res);
      throw new Error("invalid email");
    }
    // if (res.status === 200) {
    //   return res;
    // } else {
    //   // console.log("error", res);
    // }
  } catch (e) {
    console.log("catch error");
    throw new Error(e);
  }
}

module.exports = createInvoice;

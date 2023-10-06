const JINIUS_CONSTANTS = require("./constants");

const companiesLookup = {
  "company@invoice.com": {
    recipientVatNumber: "10000001A",
    recipientTaxIdNumber: "90000001A",
    recipientCompanyRegistrationNumber: "AA000001",
    recipientBusinessUnitId: "",
  },
};

async function createInvoice({ token, email }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append(
    "Cookie",
    "incap_ses_8219_2975890=QjJ4TvOV1Uu0g6PoTMIPcsmSHWUAAAAA49yhjvnZdowRVXLAwAUHAw==; visid_incap_2975890=z/PFbnzVTQCZ0X+Zcq4nsV6ZFWUAAAAAQUIPAAAAAAArJkZ7+AcHoJCQalh60y64"
  );

  const invoiceNumber = `MAD-02${Math.floor(Math.random() * 1000)}`;

  const raw = JSON.stringify({
    discount: 0,
    documentNumber: "HR-001",
    dueDate: "2023-11-19T22:00:00Z",
    initial: 2,
    issueDate: "2023-10-04T14:32:20.678Z",
    net: 2.38,
    totalAmount: 2.38,
    vatAmount: 0.38,
    kind: "<string>",
    id: "<string>",
    status: "",
    modificationDate: "2023-10-04T14:32:20.678Z",
    fileId: "",
    description: "some description",
    issuerVatNumber: "10425388C",
    issuerTaxIdNumber: "10425388C",
    issuerCompanyRegistrationNumber: "HE425388",
    issuerBusinessUnitId: "",
    issuerBusinessUnitIdentifiers: [],
    recipientVatNumber: "10000001A",
    recipientTaxIdNumber: "90000001A",
    recipientCompanyRegistrationNumber: "AA000001",
    recipientBusinessUnitId: "",
    recipientBusinessUnitIdentifiers: [],
    orderReference: "<string>",
    lineItems: [
      {
        code: "some12",
        lineTotal: 2.38,
        price: 2,
        quantity: 1,
        taxAmount: 0.38,
        taxPercentage: "Exempted",
        unit: "Pieces",
        description: "This is an invoice from MAD Enterprises LTD",
        discountPercentage: 0,
        discount: 0,
      },
    ],
    documents: [],
    payments: [],
    supportingFilesIds: [],
  });

  const rawTwo = JSON.stringify({
    net: 165,
    vatAmount: 20.85,
    totalAmount: 185.85,
    discount: 35,
    initial: 200,
    documentNumber: invoiceNumber,
    dueDate: "2023-11-19T22:00:00Z",
    issueDate: "2023-10-04T14:32:20.678Z",
    kind: "<string>",
    id: "<string>",
    status: "",
    modificationDate: "2023-10-04T14:32:20.678Z",
    fileId: "",
    description: "some description",
    issuerVatNumber: "10425388C",
    issuerTaxIdNumber: "10425388C",
    issuerCompanyRegistrationNumber: "HE425388",
    issuerBusinessUnitId: "",
    issuerBusinessUnitIdentifiers: [],
    recipientVatNumber: "10000001A",
    recipientTaxIdNumber: "90000001A",
    recipientCompanyRegistrationNumber: "AA000001",
    recipientBusinessUnitId: "",
    ...companiesLookup[email],
    // recipientBusinessUnitIdentifiers: [
    //   {
    //     identifierType: "SystemUnitId",
    //     id: "0102",
    //   },
    // ],
    orderReference: "",
    lineItems: [
      {
        code: "LI001",
        description: "Line Item 1",
        quantity: 10,
        unit: "Pieces",
        price: 10,
        discountPercentage: 25,
        taxPercentage: "FivePercent",
        discount: 25,
        lineTotal: 78.75,
        taxAmount: 3.75,
      },
      {
        code: "LI002",
        description: "Line Item 2",
        quantity: 10,
        unit: "Pieces",
        price: 10,
        discountPercentage: 10,
        taxPercentage: "NineteenPercent",
        discount: 10,
        lineTotal: 107.1,
        taxAmount: 17.1,
      },
    ],
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

    return invoiceNumber;
    // if (res.status === 200) {
    //   return res;
    // } else {
    //   // console.log("error", res);
    // }
  } catch (e) {
    console.log("catch error");
  }
}

module.exports = createInvoice;

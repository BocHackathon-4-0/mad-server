const getAccessToken = require("../helpers/jinius/getAccessToken");
const createInvoice = require("../helpers/jinius/createInvoice");
const cyprusTaxCalculator = require("../helpers/tax/cyprusTaxCalculator");
const moneySavingTips = require("../helpers/ai/moneySavingTips");
const stocksToInvest = require("../helpers/ai/stocksToInvest");
const sendEmail = require("../helpers/email/sendEmail");
const addDoc = require("../helpers/firestore/addDoc");
const trade = require("../helpers/trading/trade");
const { updateUserSavings } = require("../helpers/firestore/update");

async function addFreelancerInvoice(req, res) {
  console.log(">>> MAD-API >>>");
  console.log("");

  const {
    userId,
    name,
    companyEmail,
    email,
    invoiceDetails,
    freelancerType,
    invest,
  } = req.body;
  // console.log(req.body);

  // return;
  // res.status(200).json({ body: "success" });

  try {
    //* Jinius
    const accessToken = await getAccessToken();
    // need to pass params values: amount, descriptions, names, company ids
    const initials = name
      .match(/(\b\S)?/g)
      .join("")
      .toUpperCase();

    const invoiceNumber = await createInvoice({
      token: accessToken,
      companyEmail,
      initials,
    });

    //* MAD service fee
    const invoiceTotal = invoiceDetails.total;
    const serviceFee = 1;
    const sum = invoiceTotal - serviceFee - invest;

    //* Tax calculation
    const { gross, socialInsurance, gesy, tax, totalTax, net } =
      await cyprusTaxCalculator({
        monthly: true,
        amount: sum,
      });

    //* Firebase
    console.log(">> Add invoice record for freelancer");
    await addDoc({
      dbCollection: "Invoices",
      data: {
        userId,
        email,
        date: new Date(),
        invoiceTotal,
        serviceFee,
        invest,
        sum,
        taxCalculator: {
          gross,
          socialInsurance,
          gesy,
          tax,
          net,
        },
      },
    });

    //* chatGPT money saving tips
    const tip = await moneySavingTips({ freelancerType });
    const stocks = await stocksToInvest({ freelancerType });

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    await updateUserSavings({
      userId,
      amount: invest,
      stock: shuffle(stocks)[0],
    });

    // testing >
    // await trade({ amount: 0 });
    // testing <

    //* Email
    const date = new Date();
    const currentDay = String(date.getDate()).padStart(2, "0");
    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    const currentYear = date.getFullYear();
    const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    await sendEmail({
      send: true,
      to: [{ email, name }],
      templateId: 1,
      params: {
        name,
        invoiceNumber,
        invoiceTotal,
        date: currentDate,
        serviceFee,
        tip,
        gross,
        socialInsurance,
        gesy,
        tax,
        invest,
        totalTax,
        net,
        stocks: stocks.join(" | "),
      },
    });

    console.log(">> Success!");

    res.status(200).json({ body: "success" });
  } catch (e) {
    // console.log(e);
    console.log("error", e);
    res.status(500).json({ body: "error" });
  }
}

module.exports = addFreelancerInvoice;

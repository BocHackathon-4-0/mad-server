const getAccessToken = require("../helpers/jinius/getAccessToken");
const createInvoice = require("../helpers/jinius/createInvoice");
const cyprusTaxCalculator = require("../helpers/tax/cyprusTaxCalculator");
const moneySavingTips = require("../helpers/ai/moneySavingTips");
const sendEmail = require("../helpers/email/sendEmail");
const addDoc = require("../helpers/firestore/addDoc");
const { updateUserInvestments } = require("../helpers/firestore/update");

async function addFreelancerInvoice(req, res) {
  console.log(">>> createJiniusInvoice");

  const { userId, name, email, invoiceDetails, freelancerType, invest } =
    req.body;
  console.log(name, email);
  console.log(invoiceDetails);
  console.log(freelancerType);

  try {
    //* Jinius
    const accessToken = await getAccessToken();
    // need to pass params values: amount, descriptions, names, company ids
    const invoiceNumber = await createInvoice({ token: accessToken });

    //* MAD service fee
    const invoiceTotal = invoiceDetails.total;
    const serviceFee = (invoiceTotal * 0.012).toFixed(2);
    // const 50 euro
    const sum = invoiceTotal - serviceFee - invest;

    //* Tax calculation
    const { gross, socialInsurance, gesy, tax, totalTax, net } =
      await cyprusTaxCalculator({
        monthly: true,
        amount: sum,
      });

    //* Firebase
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

    await updateUserInvestments({ userId, amount: invest });

    // end of the month we can sum them up using cron job to provide accurate tax breakdown

    //* chatGPT money saving tips
    const tip = await moneySavingTips({ freelancerType });

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
      },
    });

    res.status(200).json({ body: "success" });
  } catch (e) {
    // console.log(e);
    res.status(500).json({ body: "error" });
  }
}

module.exports = addFreelancerInvoice;

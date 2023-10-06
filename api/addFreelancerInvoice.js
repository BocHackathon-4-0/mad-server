const getAccessToken = require("../helpers/jinius/getAccessToken");
const createInvoice = require("../helpers/jinius/createInvoice");
const cyprusTaxCalculator = require("../helpers/tax/cyprusTaxCalculator");
const moneySavingTips = require("../helpers/ai/moneySavingTips");
const sendEmail = require("../helpers/email/sendEmail");

async function addFreelancerInvoice(req, res) {
  console.log(">>> createJiniusInvoice");

  const { name, email, invoiceDetails, freelancerType, invest } = req.body;
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
    const serviceFee = invoiceTotal * 0.012;
    // const 50 euro
    const sum = invoiceTotal - serviceFee - invest;

    //* Tax calculation
    const { gross, socialInsurance, gesy, tax, totalTax, net } =
      await cyprusTaxCalculator({
        monthly: true,
        amount: sum,
      });

    //* Firebase
    // add to DB invoice details
    // end of the month we can sum them up using cron job to provide accurate tax breakdown
    //* We get user and increment his investment balance

    //* chatGPT money saving tips
    // const tip = await moneySavingTips({ freelancerType });
    // const tip =
    // "As a software developer, saving money can be achieved by minimizing unnecessary software subscriptions, utilizing open-source tools, and optimizing cloud service usage for cost-effective solutions.";

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
        tip: "demo",
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

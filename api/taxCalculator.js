const cyprusTaxCalculator = require("../helpers/tax/cyprusTaxCalculator");

async function getTaxBreakdown(req, res) {
  const { amount } = req.query;

  try {
    //* Tax calculation
    const result = await cyprusTaxCalculator({
      monthly: true,
      amount,
    });

    res.status(200).json({ body: result });
  } catch (e) {
    // console.log(e);
    console.log("error", e);
    res.status(500).json({ body: "error" });
  }
}

module.exports = getTaxBreakdown;

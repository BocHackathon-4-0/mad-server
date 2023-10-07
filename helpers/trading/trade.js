async function trade({ ticker = "TSLA_US_EQ", amount }) {
  const apiKey = process.env.TRADING_212_API;

  try {
    const resp = await fetch(
      "https://demo.trading212.com/api/v0/equity/orders/market",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          quantity: 0.1,
          ticker,
        }),
      }
    );
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
}
module.exports = trade;

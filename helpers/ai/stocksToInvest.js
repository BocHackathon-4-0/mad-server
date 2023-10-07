async function moneySavingTips({ freelancerType }) {
  console.log(
    ">> Getting stock suggestions based on freelancer industry/interests..."
  );
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `what are some good stocks to invest if i am a ${freelancerType}. give me the stock names. Give me back an array of stock symbols`,
          },
        ],
      }),
    });

    const data = await response.json();
    const assistantReply = data.choices[0].message.content;
    // console.log(assistantReply);
    const stocks = assistantReply
      .match(/\b[A-Z]+\b/g)
      .filter((x) => x !== "AI" && x.length > 1);
    console.log(stocks);
    return stocks;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = moneySavingTips;

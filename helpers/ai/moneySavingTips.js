async function moneySavingTips({ freelancerType }) {
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
            content: `Tell me how to save money in 1 sentence as a ${freelancerType}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const assistantReply = data.choices[0].message.content;
    // console.log(assistantReply);
    return assistantReply;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = moneySavingTips;

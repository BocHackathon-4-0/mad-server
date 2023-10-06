const SibApiV3Sdk = require("sib-api-v3-sdk");

const API_KEY = process.env.SENDINBLUE_API_KEY;

async function sendEmail({
  send = true,
  to = [{ email: null, name: null }],
  templateId,
  scheduledDate = null,
  params,
}) {
  console.log(">> sendEmail");
  if (!send) {
    console.log("sending disabled");
    return;
  }
  if (!to || !params || !templateId) {
    console.log(">>>>> Error - missing required params");
    return;
  }

  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = to;
  sendSmtpEmail.templateId = templateId;
  sendSmtpEmail.params = params;

  if (scheduledDate) {
    sendSmtpEmail.scheduledAt = scheduledDate;
    console.log("> email scheduled for", scheduledDate);
  }

  try {
    console.log("> Email details", JSON.stringify({ to, templateId, params }));
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      (data) => {
        console.log(`> SIB API returned data: ${JSON.stringify(data)}`);
      },
      (error) => {
        console.log(
          ">>>> Error: could not send transactional email, template:",
          templateId
        );
        console.error(error);
        return error;
      }
    );
  } catch (e) {
    console.log("Error: could not send transactional email", templateId);
    console.log(">>>>> Error", e);
  }
}

module.exports = sendEmail;

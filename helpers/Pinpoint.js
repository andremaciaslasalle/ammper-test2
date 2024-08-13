import { PinpointClient,GetApplicationDateRangeKpiCommand,SendMessagesCommand } from '@aws-sdk/client-pinpoint';
import { credentials } from './credentials.js';
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/pinpoint/command/GetApplicationDateRangeKpiCommand/
//https://docs.aws.amazon.com/pinpoint/latest/developerguide/analytics-standard-metrics.html#application-metrics-txn-email
//"txn-emails-delivered,txn-emails-opened,txn-emails-sent"

const pinpointClient = new PinpointClient({
    region: 'us-east-1',
    credentials
  });

export const getPinpointKpi = async (kpiName) => {
    const input = { // GetApplicationDateRangeKpiRequest
        ApplicationId: "29fd926b73184d7babbac73d3f85a490", // required
        EndTime: new Date(),
        KpiName: kpiName,
        StartTime: new Date("2024-08-01"),
      };
      const command = new GetApplicationDateRangeKpiCommand(input);
      const response = await pinpointClient.send(command);
      if(response.ApplicationDateRangeKpiResponse.KpiResult.Rows.length == 0) return 0;
      const kpi = response.ApplicationDateRangeKpiResponse.KpiResult.Rows[0].Values[0];
      console.log(kpi);
      return kpi?.Value;
}

export const sendEmail = async (to,from,subject,finalBody)=>{
  const params = {
    ApplicationId: "29fd926b73184d7babbac73d3f85a490",
    MessageRequest: {
      Addresses: {
        [to]: {
          ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: from,
          SimpleEmail: {
            Subject: {
              Charset: "UTF-8",
              Data: subject,
            },
            HtmlPart: {
              Charset: "UTF-8",
              Data: `<html><body>${finalBody}</body><footer><a href="https://ammper.com/">Ammper :)</a></footer></html>`,
            },
          },
        },
      },
    },
  };
  const command = new SendMessagesCommand(params);
  const response = await pinpointClient.send(command);
  return response;
}
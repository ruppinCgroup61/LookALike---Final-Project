// TwilioService.cs
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System.Linq; // For FirstOrDefault()
using System.Security.Cryptography; // For SHA256
using System.Text; // For Encoding



public class TwilioService
{
    private readonly TwilioOptions _options;

    public TwilioService(IOptions<TwilioOptions> options)
    {
        _options = options.Value;
        TwilioClient.Init(_options.AccountSid, _options.AuthToken);
    }

    public void SendSms(string toPhoneNumber, string message)
    {
        var messageOptions = new CreateMessageOptions(new PhoneNumber(toPhoneNumber))
        {
            From = new PhoneNumber(_options.PhoneNumber),
            Body = message
        };

        MessageResource.Create(messageOptions);
    }
}

public class TwilioOptions
{
    public string AccountSid { get; set; }
    public string AuthToken { get; set; }
    public string PhoneNumber { get; set; }
}

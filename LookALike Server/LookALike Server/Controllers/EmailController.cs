using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EmailController : ControllerBase
{
    private readonly EmailSettings _emailSettings;

    public EmailController(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    [HttpPost("SendVerificationCode")]
    public async Task<IActionResult> SendVerificationCode([FromBody] VerificationCodeRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
        {
            return BadRequest("Email and code are required.");
        }

        try
        {
            await SendEmailAsync(request.Email, "Password Reset Verification Code", $"Your verification code is: {request.Code}");
            return Ok(new { message = "Verification code sent successfully." });
        }
        catch (SmtpException smtpEx)
        {
            // Log the SMTP exception
            return StatusCode(500, "SMTP error occurred: " + smtpEx.Message);
        }
        catch (Exception ex)
        {
            // Log the general exception
            return StatusCode(500, "An error occurred while sending the email: " + ex.Message);
        }
    }

    private async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        using (var client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))
        {
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword);
            client.EnableSsl = _emailSettings.EnableSsl;

            var message = new MailMessage
            {
                From = new MailAddress(_emailSettings.FromEmail, _emailSettings.FromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(toEmail);

            await client.SendMailAsync(message);
        }
    }
}

public class VerificationCodeRequest
{
    public string Email { get; set; }
    public string Code { get; set; }
}

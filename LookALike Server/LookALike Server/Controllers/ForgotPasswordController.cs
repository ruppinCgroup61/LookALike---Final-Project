using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq; // For FirstOrDefault()
using System.Threading.Tasks;
using LookALike_Server.Class;

[ApiController]
[Route("api/[controller]")]
public class ForgotPasswordController : ControllerBase
{
    private readonly TwilioService _twilioService;
    private static readonly Dictionary<string, string> _verificationCodes = new();

    public ForgotPasswordController(TwilioService twilioService)
    {
        _twilioService = twilioService;
    }

    [HttpPost("sendVerificationCode")]
    public IActionResult SendVerificationCode([FromBody] ForgotPasswordRequest request)
    {
        var verificationCode = GenerateVerificationCode();
        _twilioService.SendSms(request.PhoneNumber, $"LookALike Forgot Password - Your verification code is {verificationCode}");

        // Save the phone number and code to an in-memory store
        _verificationCodes[request.PhoneNumber] = verificationCode;

        return Ok(new { Success = true });
    }

    [HttpPost("verifyCode")]
    public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeRequest request)
    {
        if (_verificationCodes.TryGetValue(request.PhoneNumber, out var savedCode) &&
            savedCode == request.Code)
        {
            // Update the password based on the email provided
            var user = new User();
            var existingUser = user.Read().FirstOrDefault(u => u.Email == request.Email);

            if (existingUser != null)
            {
                existingUser.Password = request.NewPassword; // Directly set the new password
                var result = existingUser.UpdateUser();

                if (result <0)
                {
                    // Remove the code after successful verification
                    _verificationCodes.Remove(request.PhoneNumber);
                    return Ok(new { Success = true });
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, Message = "Failed to update password." });
            }

            return BadRequest(new { Success = false, Message = "User not found." });
        }

        return BadRequest(new { Success = false, Message = "Invalid code or phone number." });
    }

    private string GenerateVerificationCode() => new Random().Next(10000, 99999).ToString("D5");
}

public class ForgotPasswordRequest
{
    public string PhoneNumber { get; set; }
}

public class VerifyCodeRequest
{
    public string PhoneNumber { get; set; }
    public string Code { get; set; }
    public string Email { get; set; }
    public string NewPassword { get; set; }
}

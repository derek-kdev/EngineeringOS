// src/mail/templates/password-reset.template.ts
interface PasswordResetTemplateProps {
  appName: string;
  resetUrl: string;
  expiryMinutes: number;
}

export const passwordResetTemplate = ({
  appName,
  resetUrl,
  expiryMinutes,
}: PasswordResetTemplateProps): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7; color: #1a1a2e;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 40px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 40px 30px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px;">${appName}</h1>
        <p style="font-size: 16px; color: #4a4a6a; margin: 16px 0 24px;">We received a request to reset your password. Click the button below to set a new password.</p>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
          <tr>
            <td style="background-color: #2563eb; border-radius: 6px; text-align: center;">
              <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; background-color: #2563eb; border-radius: 6px;">Reset Password</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #6b6b8a; margin: 16px 0 8px;">This link will expire in ${expiryMinutes} minutes.</p>
        <p style="font-size: 14px; color: #6b6b8a; margin: 8px 0 0;">If you didn't request a password reset, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e2e2ea; margin: 32px 0 16px;">
        <p style="font-size: 12px; color: #8a8aa0; text-align: center; margin: 0;">&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

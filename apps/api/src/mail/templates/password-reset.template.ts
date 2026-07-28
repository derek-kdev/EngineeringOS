interface PasswordResetTemplateProps {
  appName: string;
  resetUrl: string;
  expiryMinutes: number;
  baseUrl: string;
  logoDataUri: string;
}

export const passwordResetTemplate = ({
  appName,
  resetUrl,
  expiryMinutes,
  baseUrl,
  logoDataUri,
}: PasswordResetTemplateProps): string => {
  const currentYear = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0F1F; color: #E5E7EB;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #0B132B; margin: 40px auto; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,210,255,0.08);">
    <!-- Logo -->
    <tr>
      <td style="padding: 40px 30px 20px; text-align: center;">
        <a href="${baseUrl}" style="display: inline-block;">
          <img src="${logoDataUri}" alt="${appName} Logo" width="160" style="display: block; max-width: 160px; height: auto; border-radius: 8px;">
        </a>
      </td>
    </tr>

    <!-- Heading & Body -->
    <tr>
      <td style="padding: 0 30px 20px; text-align: center;">
        <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 0 0 12px;">Reset your password</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #D1D5DB; margin: 12px 0 24px; max-width: 480px; margin-left: auto; margin-right: auto;">
          We received a request to reset your password for your ${appName} account. Click the button below to set a new password. This link will expire in ${expiryMinutes} minutes.
        </p>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 40px; font-size: 16px; font-weight: 600; color: #0B132B; text-decoration: none; background-color: #00D2FF; border-radius: 30px; box-shadow: 0 4px 12px rgba(0,210,255,0.35);">Reset Password</a>
      </td>
    </tr>

    <!-- Help / Support -->
    <tr>
      <td style="padding: 20px 30px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 14px; color: #9CA3AF; margin: 0;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
        <p style="font-size: 14px; color: #9CA3AF; margin: 8px 0 0;">
          Questions? Visit our <a href="${baseUrl}/faq" style="color: #00D2FF; text-decoration: none;">FAQs</a> or email us at <a href="mailto:help@engineeringos.com" style="color: #00D2FF; text-decoration: none;">help@engineeringos.com</a>.
        </p>
      </td>
    </tr>

    <!-- Social Icons (text links for now – replace with images when icons are ready) -->
    <tr>
      <td style="padding: 0 30px 20px; text-align: center;">
        <table align="center" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 0 8px;">
              <a href="https://x.com/engineeringos_gh" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,255,255,0.08); border-radius: 50%; text-align: center; line-height: 36px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: bold;">𝕏</a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://linkedin.com/in/engineeringos.gh" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,255,255,0.08); border-radius: 50%; text-align: center; line-height: 36px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: bold;">in</a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://facebook.com/engineeringos" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,255,255,0.08); border-radius: 50%; text-align: center; line-height: 36px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: bold;">f</a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://instagram.com/engineering_os_gh" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,255,255,0.08); border-radius: 50%; text-align: center; line-height: 36px; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: bold;">◉</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer Links -->
    <tr>
      <td style="padding: 0 30px 20px; text-align: center;">
        <p style="font-size: 12px; color: #6B7280; margin: 0;">
          <a href="${baseUrl}/dashboard" style="color: #6B7280; text-decoration: none;">Dashboard</a> &nbsp;|&nbsp;
          <a href="${baseUrl}/how-it-works" style="color: #6B7280; text-decoration: none;">How it works</a> &nbsp;|&nbsp;
          <a href="${baseUrl}/faq" style="color: #6B7280; text-decoration: none;">FAQs</a> &nbsp;|&nbsp;
          <a href="${baseUrl}/terms" style="color: #6B7280; text-decoration: none;">Terms</a> &nbsp;|&nbsp;
          <a href="${baseUrl}/privacy" style="color: #6B7280; text-decoration: none;">Privacy</a>
        </p>
      </td>
    </tr>

    <!-- Legal & Address -->
    <tr>
      <td style="padding: 20px 30px 30px; text-align: center;">
        <p style="font-size: 11px; color: #4B5563; line-height: 1.6; margin: 0;">
          You have received this email as a registered user of ${appName}.<br>
          ${appName}, Inc. &bull; 123 Innovation Drive, Silicon Valley, CA 94043 United States.<br>
          Delaware Corporation State File #1234567<br>
          &copy; ${currentYear} ${appName} Inc. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

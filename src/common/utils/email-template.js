export const emailConfirmTemplate = (fullName,userName, verifyLink, title) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Xác nhận thân phận cho ${fullName}</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f2f2f2; padding: 20px;">
  <div style="background: #fff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #2c3e50;">Xin chào nếu bạn là ${fullName || "bạn"}, mã số là ${userName || "null"},</h2>
    <p>Đây là email tự động của <strong>H3land</strong>.</p>
    <p> Bấm vào nút bên dưới để ${title}:</p>
    <p style="text-align: center;">
      <a href="${verifyLink}" style="display:inline-block; padding:12px 24px; background:#4CAF50; color:white; text-decoration:none; border-radius:6px;">Xác nhận email</a>
    </p>
    <p>Nếu không yêu cầu hành động này, hãy bỏ qua email.</p>
    <p style="margin-top: 40px; color: #888;">&copy; ${new Date().getFullYear()} HIEU3NIA</p>
  </div>
</body>
</html>
`;

export const emailChangePasswordSuccess = (fullName,userName) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đổi mật khẩu thành công</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f2f2f2; padding: 20px;">
  <div style="background: #fff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #2c3e50;">Xin chào ${fullName || "bạn"}, (Mã số: ${userName || "không rõ"}),</h2>
    <p>Bạn vừa đổi mật khẩu thành công cho tài khoản tại <strong>H3land</strong>.</p>
    <p>Nếu bạn không thực hiện hành động này, vui lòng liên hệ ngay với bộ phận hỗ trợ của chúng tôi để đảm bảo an toàn cho tài khoản.</p>
    <p style="margin-top: 20px;">Cảm ơn bạn đã sử dụng dịch vụ của <strong>H3land</strong>.</p>
    <p style="margin-top: 40px; color: #888;">&copy; ${new Date().getFullYear()} HIEU3NIA</p>
  </div>
</body>
</html>
`;

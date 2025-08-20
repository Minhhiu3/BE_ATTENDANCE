resfulAPI với express.Js

req: thông tin client gửi lên server.
res: thông tin server gửi về client.
next: chuyển tiếp hoặc xử lý lỗi trong middleware.

# params: dữ liệu động trên URL
# body: dữ liệu gửi qua body
# query: dữ liệu trên URL sau dấu ?
# headers: thông tin header
# cookies: dữ liệu cookie
→ Tất cả đều nằm trong req để lấy thông tin từ request của client.

# status: đặt mã trạng thái cho request vd: status(200,400,...).
# json: gửi dữ liệu dạng json cho client vd: json(data).
# send: gửi dữ liệu về cho client có thể là bất cứ loại gì như chuỗi, mảng, json,... vd: send([{'data'}]).
# set: đặt header cho phản hồi, header là các cặp key,value chứa thông tin xác thực như loại dữ liệu: json, array,... hay các dữ liệu như token....
# redirect: chuyển hướng url tới url khác (giống navigate trong react-router-dom) vd: redirect(301, '/abc').
# end: kết thúc mà ko cần trả dữ liệu, dùng khi delete record, không cần trả dữ liệu status(201).end();
# sendStatus: gửi mã trạng thái http kèm thông điệp mặc định vd red.status(404) -> notfound.
→ Tất cả đều nằm trong req để lấy thông tin từ response của client.


record: record là 1 bản gi của 1 bảng (subject,major,...) trong sql và nosql, trong mongodb record là 1 documents hoàn chỉnh

GET: lấy res từ api
POST: gửi req lên api
PUT: sửa toàn bộ record
PATCH: sửa 1 trường của record
DELETE: xóa

[] → Mảng (array) hoặc truy cập phần tử mảng/thuộc tính object.

{} → Object hoặc khối lệnh.

'',"",`` → string

data test:
user:
{
  "fullname": "chu duc tu1",
  "email": "cdt1@gmail.com",
  "password": "Abcd1234!@"
}

major:
{
  "name": "Toán học",
  "description": "Bộ môn toán học."
}

subject:
{
  "name": "Toán học 1",
  "englishName": "math 1",
  "description": "Toán học cơ bản"
}

class:
  {
    "subjectId": "68949d7159b05e8826ade3be",
    "majorId": "68949888f5d72ddb9d20998b",
    "name": "MATH1",
    "teacherId": "68949768f5d72ddb9d20997b",
    "studentIds": ["6894978cf5d72ddb9d209983","68949796f5d72ddb9d209987"],
    "startDate": "2025-08-08",
    "totalSessions": 100,
    "shift": "1",
    "room": "Online",
    "description": "mo ta cho lop",
    "maxStudents": 100,
    "daysOfWeek": [1,3,5]
}


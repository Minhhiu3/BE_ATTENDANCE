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
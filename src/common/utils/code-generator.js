import User from "../../modules/user/user.model.js";
import Subject from "../../modules/subject/subject.model.js";
import { createError } from "./create-error.js";

// * Hàm này tự sinh username theo định dạng: Tên cuối + Ký tự đầu của họ/tên đệm + Số thứ tự (3 chữ số)

// Le Minh Hieu compare Hieu -> Hieu + L + M + so thu tu = HieuLM001

export const generateUsername = async (fullName) => {
    const parts = fullName 
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")// loai bo ki tu khong phai chu cai va khoang trang
    .split(/\s+/);

    //lay ten chinh (phan cuoi) va cac ki tu cua ho/ten dem
    const lastName = parts[parts.length -1]; //ten nguoi vn thuong o cuoi cung full name
    const initials = parts
    .slice(0, -1)// cac phan ho/ten dem
    .map((parts) => parts[0])//lay ki tu dau tien
    .join("");// gep cac phan lai 
    const prefix = `${lastName}${initials}`.slice(0, 20); //g han do dai toi da 20 ki tu
    const regex = new RegExp(`^${prefix}\\d{0,3}$`);

    //tim cac user name bat dau bang prefix
	const existingUsers = await User.find({ username: regex }).select("username").lean().exec();

	//* Nếu không có username nào khớp, trả về prefix
	if (!existingUsers || existingUsers.length === 0) {
		return `${prefix}001`;
	}

	//* Lấy danh sách số thứ tự từ các username hiện có
	const sequenceNumbers = existingUsers
		.map((user) => {
			const match = user.username.match(/\d+$/);
			return match ? parseInt(match[0], 10) : 0;
		})
		.filter((num) => num >= 0);

	// Tìm số thứ tự lớn nhất và tăng lên 1
	const maxSequence = sequenceNumbers.length > 0 ? Math.max(...sequenceNumbers) : 0;
	const nextSequence = maxSequence + 1;

	// Kiểm tra giới hạn số thứ tự
	if (nextSequence > 999) {
		throw createError(400, "Đã đạt giới hạn số thứ tự cho username này");
	}

	// Định dạng số thứ tự (3 chữ số, nếu cần)
	const formattedSequence = nextSequence.toString().padStart(3, "0");
	return `${prefix}${formattedSequence}`;
};

//tu sinh id theo dinh dang CFYYXXX
//CF: prefix, YY: 2 chu so cuoi cua nam hien tai, XXX: 3 chu so thu tu tu 001 to 999
export const generateStudentId = async () => {
    const currYear = new Date().getFullYear().toString().slice(-2);
    const prefix = `CF${currYear}`;
    const regex = new RegExp(`^${prefix}\\d{0,3}$`);

    const existingId = await User.find({studentId: regex}).select("StudentId").lean().exec();
    if (!existingId || existingId.length === 0) {
        return `${prefix}001`;
    }

    //lay d sach so thu tu {XXX} tu cac student id
    const sequenceNumbers = existingId.map((doc) => parseInt(doc.studentId.slice(-3), 10)).filter((num) => !isNaN(num));

    //tim so thu tu lon nhat va +1
    const maxSequence = Math.max(...sequenceNumbers);
    const nextSequence = maxSequence ++;

    // neu stt vuot qua 999
    if (nextSequence > 999) {
        throw createError(400, "Đã đạt giới hạn mã sinh viên cho năm hiện tại");
    }

    //format stt thành chuỗi 3 chữ số
    const formattedSequence = nextSequence.toString().padStart(3, '0');

    return `${prefix}${formattedSequence}`;
};

export const generateSubjectCode = async () => {
  try {
    const currYear = new Date().getFullYear().toString().slice(-2);
    const prefix = `SUB${currYear}`;
    const regex = new RegExp(`^${prefix}\\d{3}$`);

    // Tìm các subject có code khớp với định dạng
    const existingCodes = await Subject.find({ code: regex })
      .select("code")
      .lean()
      .exec();

    if (!existingCodes || existingCodes.length === 0) {
      return `${prefix}001`;
    }

    // Lấy danh sách số thứ tự (XXX) từ các code
    const sequenceNumbers = existingCodes
      .map((doc) => parseInt(doc.code.slice(-3), 10))
      .filter((num) => !isNaN(num));

    // Tìm số thứ tự lớn nhất và tăng lên 1
    const maxSequence = Math.max(...sequenceNumbers);
    const nextSequence = maxSequence + 1;

    // Kiểm tra giới hạn số thứ tự
    if (nextSequence > 999) {
      throw createError(400, "Đã đạt giới hạn mã môn học cho năm hiện tại");
    }

    // Định dạng số thứ tự thành chuỗi 3 chữ số
    const formattedSequence = nextSequence.toString().padStart(3, "0");

    return `${prefix}${formattedSequence}`;
  } catch (error) {
    throw createError(500, `Lỗi khi tạo mã môn học: ${error.message}`);
  }
};


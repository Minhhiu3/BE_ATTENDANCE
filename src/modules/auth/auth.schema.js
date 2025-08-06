import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().min(1,"Email không được bỏ trống").email("Email không đúng định dạng"),
    fullname: z.string().min(8, "Họ và tên tối thiểu phải có 8 kí tự!"),
    phoneNumber: z.string().min(10).optional(),
    password: z
    .string()
    .min(10, "Mật khẩu phải có ít nhất 8 kí tự!")
    .regex(	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,"Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số")
});

export const loginSchema = z.object({
    email: z.string().min(1,"Email không được bỏ trống").email("Email không đúng định dạng"),
    password: z
    .string()
    .min(10, "Mật khẩu phải có ít nhất 8 kí tự!")
    .regex(	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,"Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số")
})

export const resertPasswordSchema = z.object({
    resertToken: z.string().min(1,"Resert token phải dài hơn 1 kí tự."),
    newPassword: z
    .string()
    .min(10, "Mật khẩu phải có ít nhất 8 kí tự!")
    .regex(	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,"Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số")
})

import { z } from 'zod';

// CNIC format regex (Pakistan): 5 digits - 7 digits - 1 digit
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  cnic: z.string().regex(cnicRegex, { message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X." }),
  password: z.string().min(1, { message: "Password is required." }), // Assuming password is used for login
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  cnic: z.string().regex(cnicRegex, { message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to field causing the error
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const ApplicationFormSchema = z.object({
  fullName: z.string().min(3, "Full name is required."),
  fatherName: z.string().min(3, "Father's name is required."),
  dateOfBirth: z.date({ required_error: "Date of birth is required."}),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required."}),
  selectedPrograms: z.array(z.string()).min(1, "Select at least one program."),
  // Add more fields as needed for a complete application form
});

export type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;

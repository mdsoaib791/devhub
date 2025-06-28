export interface ContactUsModel {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  message: string;
  recaptchaToken: string;
}

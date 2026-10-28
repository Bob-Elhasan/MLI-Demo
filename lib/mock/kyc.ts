// Mocked OCR result for the Egyptian national ID. Fields are what a real eKYC vendor returns.
export type IdFields = {
  fullNameAr: string;
  fullNameEn: string;
  nationalId: string;
  dateOfBirth: string; // ISO
  gender: "male" | "female";
  address: string;
  expiry: string; // ISO
};

export const mockOcr: IdFields = {
  fullNameAr: "يوسف أحمد محمود الشريف",
  fullNameEn: "Youssef Ahmed Mahmoud Elsherif",
  nationalId: "29506120102345",
  dateOfBirth: "1995-06-12",
  gender: "male",
  address: "12 El Nasr St, New Cairo, Cairo",
  expiry: "2031-03-08",
};

export function ageFrom(isoDob: string, today = new Date()) {
  const dob = new Date(isoDob);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

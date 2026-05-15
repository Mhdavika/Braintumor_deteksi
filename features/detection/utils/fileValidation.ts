const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function validateMRIFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: "Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "Ukuran file terlalu besar. Maksimal ukuran file adalah 20MB.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}
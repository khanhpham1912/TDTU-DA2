export class ErrorCode {
  vi?: string;
  en?: string;
}

export const ERROR_CODE = {
  // CRUD messages
  CreateSuccess: {
    vi: 'Khởi tạo thành công',
    en: 'Create successfully',
  },
  GetSuccess: {
    vi: 'Lấy thông tin thành công',
    en: 'Retrieve information successfully',
  },
  ListSuccess: {
    vi: 'Lấy danh sách thành công',
    en: 'Retrieve list successfully',
  },
  UpdateSuccess: {
    vi: 'Cập nhập thành công',
    en: 'Update successfully',
  },
  DeleteSuccess: {
    vi: 'Xoá thành công',
    en: 'Deletion successfully',
  },

  // Error messages
  NotFoundError: {
    vi: 'Không tim thấy thông tin',
    en: 'Not found',
  },
  ExistError: {
    vi: 'Dữ liệu đã tồn tại',
    en: 'Already exists',
  },
  PermissionDeniedError: {
    vi: 'Bạn không có quyền thực hiện hành động này',
    en: 'Permission denied',
  },
  InternalError: {
    vi: 'Lỗi hệ thống',
    en: 'Internal error',
  },
  ValidationError: {
    vi: 'Dữ liệu không hợp lệ',
    en: 'Validation error',
  },
  UnauthorizedError: {
    vi: 'Vui lòng đăng nhập để sử dụng tính năng này',
    en: 'Please log in to access this feature',
  },
  ConflictError: {
    vi: 'Yêu cầu đã được thực hiện trước đó',
    en: 'The request has been previously fulfilled',
  },
  // Another messages
  SendMailSuccess: {
    vi: 'Enmail đã được gửi',
    en: 'Email send successfully',
  },
};

export const AUTH_ERROR_CODE = {
  InvalidToken: {
    vi: 'Token không hợp lệ',
    en: 'Invalid token',
  },
  NotJoinCompany: {
    vi: 'Bạn cần phải tạo/tham gia công ty để sử dụng tính năng này',
    en: 'You must create/join company to use this feature',
  },
  UserNotActive: {
    vi: 'Bạn cần kích hoạt tài khoản để sử dụng tính năng này, vui lòng kiểm tra lại email',
    en: 'You must active account to use this feature, please check your email',
  },
  UserNotFound: {
    vi: 'Tài khoản không tồn tại trong hệ thống, vui lòng kiểm tra lại thông tin',
    en: 'Account not found, please check your information',
  },
  WrongPassword: {
    vi: 'Sai mật khẩu, vui lòng kiểm tra lại thông tin',
    en: 'Wrong password, please check your information',
  },
  LoginSuccess: {
    vi: 'Đăng nhập thành công!',
    en: 'Login success!',
  },
  LogoutSuccess: {
    vi: 'Đăng xuất thành công!',
    en: 'Logout success!',
  },
};

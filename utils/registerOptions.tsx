import checkBlobId from '@apis/user/sign/checkBlobId';

// 영문 대소문자+숫자
const BLOBID_REGEX = /^[a-zA-Z0-9]*$/;

// 영문 대소문자+한글(자음/모음)+숫자
const NICKNAME_REGEX = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]+$/;

export interface ValidatorType {
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => Promise<string | undefined>;
}

const checkIdExists = async (blobId: string) => {
  const { data: isDuplicated, status } = await checkBlobId(blobId);

  if (status === 200 && isDuplicated) return '중복된 아이디 입니다.';
};

export const blobIdValidator: ValidatorType = {
  required: '아이디를 입력해 주세요.',
  pattern: {
    value: BLOBID_REGEX,
    message: '영문 대소문자와 숫자만 입력할 수 있습니다.',
  },
  minLength: { value: 2, message: '아이디는 2자 이상이어야 합니다.' },
  validate: async (id: string) => await checkIdExists(id),
};

export const nicknameValidator: ValidatorType = {
  required: '닉네임을 입력해 주세요.',
  pattern: {
    value: NICKNAME_REGEX,
    message: '특수문자는 입력할 수 없습니다.',
  },
};

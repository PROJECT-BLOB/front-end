// import checkBlobId from '@apis/user/sign/checkBlobId';

// 영문 대소문자+숫자
const BLOBID_REGEX = /^[a-zA-Z0-9]*$/;

// 영문 대소문자+한글+숫자
const NICKNAME_REGEX = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;

export interface ValidatorType {
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => Promise<string>;
}

// TODO: api 만들어지면 연결
// const checkIdExists = async (blobId: string) => {
//   const { status } = await checkBlobId(blobId);

//   if (status === 200) return '사용 가능한 아이디입니다.';

//   return '중복된 아이디입니다.';
// };

export const blobIdValidator: ValidatorType = {
  required: '아이디를 입력해 주세요.',
  pattern: {
    value: BLOBID_REGEX,
    message: '영문 대소문자와 숫자만 입력할 수 있습니다.',
  },
  // TODO: 아이디 중복 체크
  // validate: async (id: string) => await checkIdExists(id),
};

export const nicknameValidator: ValidatorType = {
  required: '닉네임을 입력해 주세요.',
  pattern: {
    value: NICKNAME_REGEX,
    message: '특수문자는 입력할 수 없습니다.',
  },
};

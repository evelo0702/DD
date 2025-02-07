export const verifyField = async (
  type: string,
  value: string,
  updateVerifiedState: (key: string, state: boolean, msg: string) => void,
  updateFormState: (key: string, value: string) => void,
  errorMsg: string,
  successMsg: string,
  serverAction?: (value: string) => Promise<boolean>
) => {
  const updateState = (msg: string, newType?: string) => {
    updateVerifiedState(type, false, msg);
    updateFormState(newType === undefined ? type : newType, "");
  };
  if (type === "email") {
    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validateEmail(value)) return updateState("이메일 양식을 지켜주세요");
  }
  if (type === "username") {
    if (value.length < 3)
      return updateState("닉네임을 3글자 이상 작성해주세요");
    if (value.length > 10)
      return updateState("닉네임을 10글자 이하로 작성해주세요");
  }

  if (serverAction) {
    let result = await serverAction(value);
    if (result === true) return updateState(errorMsg);
    else updateVerifiedState(type, true, successMsg);
  } else updateVerifiedState(type, true, successMsg);
};

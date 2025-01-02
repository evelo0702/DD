import { WithId } from "mongodb";

// WithId<T>에서 _id 필드를 string으로 변환하는 유틸리티 타입
export type WithStringId<T> = Omit<WithId<T>, "_id"> & {
  _id: string;
};

// FindResult는 MongoDB에서 쿼리 결과로 반환되는 데이터 또는 null을 나타냄
type FindResult<T> = WithId<T> | null;

// _id를 string으로 변환하는 함수
const withStringId = <T>(result: FindResult<T>): WithStringId<T> | null => {
  if (result === null) {
    return null;
  }

  // _id와 나머지 필드를 분리한 후, _id를 string으로 변환
  const { _id, ...rest }: WithId<T> = result;
  return {
    _id: _id.toString(), // ObjectId를 string으로 변환
    ...rest, // 나머지 필드들은 그대로 반환
  };
};

export default withStringId;

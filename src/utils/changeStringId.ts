import { ObjectId } from "mongodb";
export function transformData(data: any[]): any[] {
  return data.map((item) => {
    // 모든 ObjectId를 string으로 변환
    for (const key in item) {
      if (item[key] instanceof ObjectId) {
        item[key] = item[key].toString();
      }
    }
    return item;
  });
}

export function transformObjectId(item: any): any {
  const transformedItem = { ...item };

  // 객체의 모든 필드에서 ObjectId를 찾아 문자열로 변환
  for (const key in transformedItem) {
    if (transformedItem[key] instanceof ObjectId) {
      transformedItem[key] = transformedItem[key].toString();
    }
  }

  return transformedItem;
}

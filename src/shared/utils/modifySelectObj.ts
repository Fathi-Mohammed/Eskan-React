type ModifySelectObjProps = (data: any, value: string, key: string) => any;

export const modifySelectObj: ModifySelectObjProps = (data, value, key) => {
  if (data.length === 0) return [];
  const newArray = data?.map((item) => ({
    ...item,
    value: item[value],
    label: item[key],
  }));
  return newArray;
};

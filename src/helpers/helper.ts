export const findObjectInArray = (
  arr: Array<Record<string, unknown>>,
  obj: Record<string, unknown>,
  uniqueProp: string = "label",
) => {
  // Find an object in an array by its unique property
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][uniqueProp] === obj[uniqueProp]) {
      return {
        object: arr[i],
        index: i,
      };
    }
  }
  return {
    object: null,
    index: null,
  };
};
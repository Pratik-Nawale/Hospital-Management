const remove = (text) => {
  let myArray = text.slice(0, 2).split("");
  console.log(myArray);

  if (myArray[0] == 0) {
    myArray.shift();
    console.log(myArray);
    return myArray[0];
  }
  return myArray[0] + myArray[1];
};

const range = (start, end) => {
  const result = [];
  for (let i = 0; i < start; i++) {
    result.push(i);
  }
  for (let i = end + 1; i < 24; i++) {
    result.push(i);
  }
  return result;
};

module.exports = { remove, range };

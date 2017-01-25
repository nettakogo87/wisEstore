export function Pluralize() {
  return (count: number, word: string) => {
    let countStr = count.toString();
    let result: string = `${count} ${word}`;
    if (/([1-9]*[5-9,0]$)|(1[0-9])/.test(countStr)) {
      result = `${count} ${word}ов`;
    } else if (/[0-9]*1$/.test(countStr)) {
      result = `${count} ${word}`;
    } else if (/[0-9]*[2,3,4]$/.test(countStr)) {
      result = `${count} ${word}а`;
    }
    return result;
  };
}

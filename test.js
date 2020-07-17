// case 1

const p1 = [1, 2, 3];
const c1 = [];
// target = [[1, 2, 3]]

// case 2
const p2 = [];
const c2 = [['a', 'b', 'c'], ['d', 'e', 'f']];
// target = [['a', 'b', 'c'], ['d', 'e', 'f']]

// case 3
const p3 = [1, 2, 3]
const c3 = [['a', 'b', 'c'], ['d', 'e', 'f']];
// target = [[1, 2, 3, 'a', 'b', 'c'], [1, 2, 3, 'd', 'e', 'f']]

function merge(parent, children) {
  const result = [];
  if (children.length === 0) return [parent];
  children.forEach((child) => {
    result.push(parent.concat(child));
  });
  return result;
}
const result = merge(p3, c3);
console.log(result);

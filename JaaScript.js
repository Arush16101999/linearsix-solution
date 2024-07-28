/** Extend JS Date object with a method daysTo() which returns number of complete days between
any pair of JS date objects: d1.daysTo(d2) should return quantity of complete days from d1 to
d2. */

Date.prototype.daysTo = function (date) {
  const oneDay = 24 * 60 * 60 * 1000;
  console.log(oneDay);
  const timeDifference = date.getTime() - this.getTime();
  console.log(timeDifference);
  const returnType = Math.floor(timeDifference / oneDay);
  console.log(returnType);

  return returnType;
};

const date1 = new Date("2024-07-27");
const date2 = new Date("2024-07-29");
console.log(date1.daysTo(date2));

/** 1.2 Develop a program which produces ordered array of sales. */

const orderByTotal = (sales) => {
  const order = sales.map((sale) => ({
    ...sale,
    Total: sale.amount * sale.quantity,
  }));
  const ordered = order.sort((a, b) => b.Total - a.Total);
  return ordered;
};

const sales = [
  { amount: 10000, quantity: 10 },
  { amount: 5000, quantity: 20 },
  { amount: 15000, quantity: 5 },
];

const orderedSales = orderByTotal(sales);
console.log(orderedSales);

/** 1.3. Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: 
projected object. Projected object structure shall be intersection of source object and 
prototype object structures. Values of properties in projected object shall be the same as 
values of respective properties in source object.  */

function projectObject(src, proto) {
  const output = {};
  Object.keys(proto).forEach((key) => {
    if (src.hasOwnProperty(key)) {
      if (proto[key] && typeof proto[key] === "object") {
        output[key] = projectObject(src[key], proto[key]);
      } else {
        output[key] = src[key];
      }
    }
  });
  return output;
}

const src = {
  prop11: {
    prop21: 21,
    prop22: {
      prop31: 31,
      prop32: 32,
    },
  },
  prop12: 12,
};

const proto = {
  prop11: {
    prop22: null,
  },
};

const res = projectObject(src, proto);
console.log(res);

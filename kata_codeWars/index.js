

let n = nbYear(1000, 2, 50, 1200);
console.log(n);




function nbYear(p0, percent, aug, p) {
    let i = 0;
      for( ; p0 < p; i++)
        {
          p0 += p0 * percent / 100 + aug;
        }
    return i;
  }
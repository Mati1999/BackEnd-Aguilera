"use strict";

var lista = [1, 2, 3, 4];
lista.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return x * 3;
});

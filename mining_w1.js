'use strict';

var LineByLineReader = require('line-by-line');
var idmap={};
let currentiId=0;

//**
// coursera data-patterns week1 assignment
//
// https://www.coursera.org/learn/data-patterns/programming/88k0r/frequent-itemset-mining-using-apriori
// Frequent Itemset Mining Using Apriori
//
const mining = module.exports = {
  maxlevel: 0,
  process: (filename, support) => {
    const result = {};
    var lr = new LineByLineReader(filename);
    var x=0;
    lr.on('error', function (err) {
      // 'err' contains error object
    });
    lr.on('line', function (line) {
      let ll = line.split(';').sort();


      iter('',ll,0, result);

      if (ll.length > mining.maxlevel) {
        mining.maxlevel = ll.length;
      }


    });

    lr.on('end', function () {
      console.log('patterns 1:');

      Object.keys(idmap).map(k => {
        if (result[idmap[k]] > 771 && k.indexOf(';')<0) {
          console.log(result[idmap[k]] + ':' + k);
        }
      });

      console.log('patterns 2:');
      Object.keys(idmap).map(k => {
        if (result[idmap[k]] > 771) {
          console.log(result[idmap[k]] + ':' + k);
        }
      });
    });
  }

};

function iter(str, arr,index, result) {
  for (var i = index; i < arr.length; i++) {
    var s = (str===''?'':(str+';')) + arr[i];
    var id;
    if (!!idmap[s]) {
      id=idmap[s];
    }else{
      idmap[s]=++currentiId;
      id=idmap[s];
    }
    if (!result[id]) {
      result[id] = 1;
    } else {
      result[id]++;
    }
    iter(s,arr,i+1,result);
  }

}


mining.process('categories.txt', 0);
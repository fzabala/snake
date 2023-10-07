const fs = require('fs');
const csvFilePath='sudoku.csv'
const csv=require('csvtojson')
const doit = async () => {
	const jsonArray=await csv({output:"line"}).fromFile(csvFilePath);
	fs.writeFileSync('sudoku.json', JSON.stringify(jsonArray));
}

doit();
console.log(1)
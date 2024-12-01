const fs = require("fs");

const runWithInput = (path, code) => {
	fs.readFile("../inputs/" + path, "utf8", (err, data) => {
		const result = code(data);
		console.log(`result: ${result}`)
	});
}

module.exports = { runWithInput }

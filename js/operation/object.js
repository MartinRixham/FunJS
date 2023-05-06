function getData() {

	// throw Error("Failed to get data.");
	return 1;
}

function Operand() {

	try {

		let data = getData();

		this.add = function(value) {

			return {
				success: true,
				value: data + value
			};
		};
	}
	catch (error) {

		this.add = function() {

			return {
				success: false,
				message: error.message
			};
		};
	}
}

function Operation(oparand) {

	let sum = oparand.add(1);

	if (sum.success) {

		console.log(sum.value);
	}
	else {

		console.error(sum.message);
	}
}

new Operation(new Operand());

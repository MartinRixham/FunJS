function getData() {

	// throw Error("Failed to get data.");
	return 1;
}

function Value(number) {

	this.plus = function(value) {

		return value.sumOf(number);
	};

	this.divide = function(value) {

		return value.quotientOf(number);
	}

	this.sumOf = function(other) {

		return new Value(other + number); 
	}

	this.quotientOf = function(other) {

		return new Value(other / number);
	}

	this.print = function() {

		console.log(number);
	}
}

function ValueError(error) {

	this.plus = function() {

		return this;
	};

	this.divide = function() {

		return this;
	}

	this.sumOf = function() {

		return this; 
	}

	this.quotienOf = function() {

		return this;
	}

	this.print = function() {

		console.error(error);
	}
}

function Data() {

	try {

		let data = getData();

		return new Value(data);
	}
	catch (error) {

		return new ValueError(error.message);
	}
}

function Addition(left, right) {

	return left.plus(right);
}

function Division(left, right) {

	return left.divide(right);
}

new Division(new Addition(new Data(), new Value(2)), new Value(2)).print();

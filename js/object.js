function getData() {

	// throw Error("Failed to get data.");
	return 1;
}

class Value {

	#number

	constructor(number) {

		this.#number = number;
	}

	add(value) {

		if (value instanceof Value) {

			return new Value(this.#number + value.#number);
		}
		else {

			return this;
		}
	}

	divide(value) {

		if (value instanceof Value) {

			return new Value(this.#number / value.#number);
		}
		else {

			return this;
		}
	}

	print() {

		console.log(this.#number);
	}
}

class ValueError {

	#message

	constructor(message) {

		this.#message = message;
	}

	add() {

		return this;
	}

	divide() {

		return this;
	}

	print() {

		console.error(this.#message);
	}
}

function Data() {

	try {

		return new Value(getData());
	}
	catch (error) {

		return new ValueError(error.message);
	}
}

function Addition(left, right) {

	return left.add(right);
}

function Division(left, right) {

	return left.divide(right);
}

new Division(new Addition(new Data(), new Value(2)), new Value(2)).print();

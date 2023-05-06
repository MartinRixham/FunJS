const Result = {
	Success: (value) => { const fun = () => value; fun.success = true; return fun },
	Failure: (message) => { const fun = () => message; fun.success = false; return fun },
	flatMap: (result, run) => {
		if (result.success) {
			return run(result())
		}
		else {
			return result
		}
	}
}

const IO = (run) => run

IO.flatMap = (io, run) => run(io())

const printResult = (result) =>
	IO(() => {
		if (result.success) {
			console.log(result())
		}
		else {
			console.error(result())
		}
	})

const getData = () => Result.Success(1) // Result.Failure("Failed to get data.")
const add = (right) => (left) => Result.Success(left + right)
const divideBy = (right) => (left) => Result.Success(left / right)

const runProgram = () => Result.flatMap(Result.flatMap(getData(), add(2)), divideBy(2))

IO.flatMap(IO(runProgram), printResult)()

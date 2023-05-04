const Result = {
	Success: (value) => { return { success: true, value } },
	Failure: (message) => { return { success: false, message } },
	flatMap: (result, run) => {
		if (result.success) {
			return run(result.value)
		}
		else {
			return result
		}
	}
}

const IO = (run) => run

IO.flatMap = (io, run) => run(io())

IO.printResult = (result) =>
	IO(() => {
		if (result.success) {
			console.log(result.value)
		}
		else {
			console.error(result.message)
		}
	})

const getData = () => Result.Success(1) // Result.Failure("Failed to get data.")
const add = (right) => (left) => Result.Success(left + right)
const divideBy = (right) => (left) => Result.Success(left / right)

const runProgram = () => Result.flatMap(Result.flatMap(getData(), add(2)), divideBy(2))

IO.flatMap(IO(runProgram), IO.printResult)()

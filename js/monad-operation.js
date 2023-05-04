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

const getData = () => Result.Success(1) //Result.Failure("Failed to get data.")
const operate = (value) => Result.Success(value + 1)

const runProgram = () => Result.flatMap(getData(), operate)

const printResult = (result) =>
	IO(() => {
		if (result.success) {
			console.log(result.value)
		}
		else {
			console.error(result.message)
		}
	})

IO.flatMap(IO(runProgram), printResult)()

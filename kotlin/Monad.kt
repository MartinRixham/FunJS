sealed interface Result<T> {
	class Success<T>(private val value: T): Result<T> {
		operator fun invoke(): T = value
	}

	class Failure<T>(private val error: String): Result<T> {
		operator fun invoke(): String = error
	}

	companion object {
		fun <T>flatMap(result: Result<T>, run: (value: T) -> Result<T>) =
			when (result) {
				is Success -> run(result())
				is Failure -> Failure(result())
			}
	}
}

fun getData() = Result.Success(1.0) //Result.Failure<Double>("oh no")
fun add(right: Double) = { left: Double -> Result.Success(left + right) }
fun divideBy(right: Double) = { left: Double -> Result.Success(left / right) }

fun runProgram() = Result.flatMap(Result.flatMap(getData(), add(2.0)), divideBy(2.0))

fun <T>printResult(result: Result<T>) =
	when (result) {
		is Result.Success -> println(result())
		is Result.Failure -> System.err.println(result())
	}

fun main() {
	printResult(runProgram())
}

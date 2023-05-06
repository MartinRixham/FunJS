sealed interface Result<T> {
	class Success<T>(private val value: T): Result<T> {
		operator fun invoke() = value
	}

	class Failure<T>(private val error: String): Result<T> {
		operator fun invoke() = error
	}

	companion object {
		fun <S, T>flatMap(result: Result<S>, run: (S) -> Result<T>) =
			when (result) {
				is Success -> run(result())
				is Failure -> Failure(result())
			}
	}
}

class IO<T>(val run: () -> T) {
	operator fun invoke() = run()

	companion object {
		fun <S, T>flatMap(io: IO<S>, run: (S) -> IO<T>) =
			run(io())
	}
}

fun <T>printResult(result: Result<T>) =
	IO({
		when (result) {
			is Result.Success -> println(result())
			is Result.Failure -> System.err.println(result())
		}
	})

fun getData() = Result.Success(1.0) // Result.Failure<Double>("Failed to get data.")
fun add(right: Double) = { left: Double -> Result.Success(left + right) }
fun divideBy(right: Double) = { left: Double -> Result.Success(left / right) }

fun runProgram() = Result.flatMap(Result.flatMap(getData(), add(2.0)), divideBy(2.0))
fun main() = IO.flatMap(IO(::runProgram), ::printResult)()

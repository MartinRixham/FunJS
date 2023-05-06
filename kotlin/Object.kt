interface Value
{
	fun add(value: Value): Value;

	fun divide(value: Value): Value;

	fun print();
}

class ErrorValue(val message: String?): Value
{
	override fun add(value: Value): Value
	{
		return this;
	}

	override fun divide(value: Value): Value
	{
		return this;
	}

	override fun print()
	{
		System.err.println(message);
	}
}

class DoubleValue(val number: Double): Value
{
	override fun add(value: Value): Value
	{
		if (value is DoubleValue)
		{
			return DoubleValue(number + value.number);
		}
		else
		{
			return value;
		}
	}

	override fun divide(value: Value): Value
	{
		if (value is DoubleValue)
		{
			return DoubleValue(number / value.number);
		}
		else
		{
			return value;
		}
	}

	override fun print()
	{
		println(number);
	}
}

fun getData(): Double
{
	// throw Exception("Failed to get data.");
	return 1.0;
}

class Data(): Value by (try { DoubleValue(getData()); } catch(e: Exception) { ErrorValue(e.message); })

class Addition(left: Value, right: Value): Value by (left.add(right))

class Division(left: Value, right: Value): Value by (left.divide(right))

fun main()
{
	Division(Addition(Data(), DoubleValue(2.0)), DoubleValue(2.0)).print();
}

using System.Text.Json.Serialization;
using System.Text.Json;

namespace backend_secuill.Repositories
{
    public class GenericConverter<T> : JsonConverter<T>
    {
        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (typeof(T) == typeof(string))
            {
                if (reader.TokenType == JsonTokenType.String)
                {
                    return (T)(object)reader.GetString();
                }
                else
                {
                    throw new JsonException($"String expected, received {reader.TokenType}.");

                }
            }
            else if (typeof(T) == typeof(int))
            {
                try
                {
                    if (reader.TryGetInt32(out int intValue))
                    {
                        return (T)(object)intValue;
                    }
                }
                catch (Exception)
                {

                    throw new JsonException($"Integer expected, received {reader.TokenType}.");

                }
            }
            else if (typeof(T) == typeof(double))
            {
                try
                {
                    if (reader.TryGetDouble(out double doubleValue))
                    {
                        return (T)(object)doubleValue;
                    }
                }
                catch (Exception)
                {

                    throw new JsonException($"Double expected, received {reader.TokenType}.");

                }
            }
            // Add additional type conversions as needed
            else
            {
                throw new NotSupportedException($"Conversion to type {typeToConvert.Name} is not supported.");
            }
            throw new NotSupportedException($"Conversion to type {typeToConvert.Name} is not supported.");

        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
    public class GenericConverterFactory : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
        {
            // Return true if the typeToConvert is the target type for which you want to apply the converter
            return typeToConvert == typeof(string) || typeToConvert == typeof(int) || typeToConvert == typeof(double);
        }

        public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
        {
            // Create an instance of the generic converter with the appropriate type argument
            Type converterType = typeof(GenericConverter<>).MakeGenericType(typeToConvert);
            return (JsonConverter)Activator.CreateInstance(converterType);
        }
    }
}

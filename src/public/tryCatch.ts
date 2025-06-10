// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * A utility function that wraps a promise execution in a try-catch block and returns a standardized result object.
 * 
 * @template T - The type of data that the promise resolves to
 * @template E - The type of error that might be thrown (defaults to Error)
 * @param {Promise<T>} promise - The promise to be executed
 * @returns {Promise<Result<T, E>>} A promise that resolves to a Result object containing either:
 *   - On success: { data: T, error: null }
 *   - On failure: { data: null, error: E }
 * 
 * @example
 * // Success case
 * const result = await tryCatch(fetchUserData(userId));
 * if (result.data) {
 *   // Handle successful data
 *   console.log(result.data);
 * } else {
 *   // Handle error
 *   console.error(result.error);
 * }
 */
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

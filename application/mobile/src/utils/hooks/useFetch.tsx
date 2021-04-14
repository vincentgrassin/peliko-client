import * as React from "react";

const useFetch = (url: string) => {
  const [data, setData] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  React.useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      setError(undefined);
      try {
        // const result = await fetch(url);
        // result.ok && setData(result.value);
        // result.ok === false && setError(result.errorValue);
      } catch (error) {
        setError(error.Message);
      } finally {
        setLoading(false);
      }
    };
    doFetch();
  }, [url]);
  return { data, loading, error };
};
export default useFetch;

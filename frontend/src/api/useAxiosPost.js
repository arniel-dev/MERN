import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxiosPost = () => {
  const axiosPrivate = useAxiosPrivate();

  const [config, setConfig] = useState({});
  const [response, setResponse] = useState(null);
  const [request, setRequest] = useState(null);
  const [url, setURL] = useState(null);

  const [controller, setController] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resErrMsg, setResErrMsg] = useState("");
  const [status, setStatus] = useState(null);
  async function loadData() {
    try {
      if (url === null) return;
      if (request === null) return;

      setLoading(true);
      const requestController = new AbortController();
      setController(requestController);
      const reqSignal = { signal: requestController.signal };
      const configuration = { ...reqSignal, ...config };
      const response = await axiosPrivate.post(url, request, configuration);
      setResponse(response.data);
      setStatus(response.status);
    } catch (error) {
      console.error("Error:", error);
      setResErrMsg(error);
    } finally {
      setLoading(false);
    }
  }

  async function cleanUp() {
    setResponse(null);
    setConfig({});
    setRequest(null);
    setURL(null);
    setStatus(null);

    setController(null);
    setLoading(false);
    setResErrMsg("");
  }

  useEffect(() => {
    loadData();
    return () => controller && controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, request]);

  return {
    response,
    loading,
    resErrMsg,
    setRequest,
    setConfig,
    setURL,
    cleanUp,
    status,
  };
};

export default useAxiosPost;

import { mockEmails } from "@/pages/dashboardComponents/email/data/mockData";
import { emailEndPoint } from "../constants/apiEndpoint";
import { useState, useEffect } from "react"; // Ensure correct import

const useFetchUserEmails = (userId) => {
  const [emails, setEmails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // Prevent fetching if userId is not provided

    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;

    const fetchEmails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${emailEndPoint.getEmails}?userId=${userId}`,
          {
            method: "GET",
            signal,
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch emails: ${response.statusText}`);
        }

        const data = await response.json();
        setEmails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();

    return () => controller.abort(); // Cleanup function to cancel fetch on unmount
  }, [userId]);

  return { emails, loading, error };
};

export default useFetchUserEmails;

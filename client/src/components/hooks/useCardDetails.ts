import { useEffect, useState } from 'react';
import userService from 'services/users';
import { HttpResponse } from '../../../../shared/types';

function useCardDetails() {
  const [cardDetails, setCardDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response: HttpResponse = await userService.getUserCardDetails() as HttpResponse;
        console.log(response)
        if (response.status !== "OK") {
          throw new Error(response.message);
        }

        setCardDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, []); // Empty dependency array means this effect runs once when the component mounts.

  return { cardDetails, loading, error };
}

export default useCardDetails;

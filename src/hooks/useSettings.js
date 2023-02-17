import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getSettings } from '../API/general';

export default function useSettings() {
  const [settings, setSettings] = useState(null);

  const { isLoading, isError } = useQuery('getAllSettings', getSettings, {
    enabled: true,
    onSuccess(response) {
      console.log('RESPONSE', response);
      setSettings(response);
    },
  });

  return { isLoading, isError, settings };
}

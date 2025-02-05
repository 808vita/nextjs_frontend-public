import { useCallback, useState } from "react";

interface UseSettingsProps<T> {
  initialData: T;
  apiCall: (data: any) => Promise<any>;
}

export const useSettings = <T>(props: UseSettingsProps<T>) => {
  const { initialData, apiCall } = props;

  const [data, setData] = useState<T>(initialData);

  const handleUpdateSettings = useCallback(
    async (value: any) => {
      try {
        const result = await apiCall(value);
        setData(result.settings);
        return result;
      } catch (e) {
        console.log(e);
      }
    },
    [apiCall]
  );
  return {
    data,
    handleUpdateSettings,
  };
};

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface UseFormStateReturn<TData> {
  data: TData;
  setData: Dispatch<SetStateAction<TData>>;
  hasChanges: boolean;
  setHasChanges: Dispatch<SetStateAction<boolean>>;
  updateField<TField extends keyof TData>(field: TField, value: TData[TField]): void;
  refreshForm(newData: TData): void;
}

export const useFormState = <TData extends object>(initValue: TData): UseFormStateReturn<TData> => {
  const [data, setData] = useState<TData>(initValue);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = useCallback(
    <TField extends keyof TData>(field: TField, value: TData[TField]) => {
      setData((current) => {
        const valueChanged = value !== current[field];

        if (valueChanged) {
          setHasChanges(true);
        }
        return {
          ...current,
          [field]: value,
        };
      });
    },
    [],
  );

  const refreshForm = useCallback((newData: TData) => {
    setData(newData);
    setHasChanges(false);
  }, []);

  return { data, setData, hasChanges, setHasChanges, updateField, refreshForm };
};

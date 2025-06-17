import { WritableSignal } from '@angular/core';

export interface UseObservableConfig<T> {
  onSuccess: (value: T) => void;
  onError?: (err: unknown) => void;
  errorMessage?: string;
  onComplete?: () => void;
  signals: {
    isLoading: WritableSignal<boolean>;
    hasError: WritableSignal<boolean>;
    error: WritableSignal<string>;
  };
}

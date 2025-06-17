import { Observable, Observer } from 'rxjs';
import type { UseObservableConfig } from '../interfaces/use-observable-config.interface';

export function useObservable<T>(obs$: Observable<T>, config: UseObservableConfig<T>) {
  const { isLoading, hasError, error } = config.signals;

  isLoading.set(true);
  hasError.set(false);
  error.set('');

  const observer = createObserver(config);
  obs$.subscribe(observer);
}

function createObserver<T>(config: UseObservableConfig<T>): Observer<T> {
  const { onSuccess, onError, onComplete, errorMessage, signals } = config;
  const { isLoading, hasError, error } = signals;

  return {
    next: (res) => {
      onSuccess(res);
      isLoading.set(false);
    },
    error: (err) => {
      hasError.set(true);
      isLoading.set(false);

      const devMessage = err?.message || 'Unexpected error';
      console.error(devMessage);

      const userMessage =
        errorMessage?.concat('. Por favor, intenta más tarde.') ||
        'Ocurrió un error inesperado.';
      error.set(userMessage);

      if (onError) onError(err);
    },
    complete: () => {
      if (onComplete) onComplete();
    },
  };
}
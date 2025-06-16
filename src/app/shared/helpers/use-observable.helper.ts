import { signal, type Signal } from '@angular/core';
import { Observable } from 'rxjs';

export function useObservable<T>(
  obs$: Observable<T>,
  config: {
    onSuccess: (value: T) => void;
    onError?: (err: unknown) => void;
    errorMessage?: string;
    onComplete?: () => void;
  }
): {
  isLoading: Signal<boolean>;
  hasError: Signal<boolean>;
  error: Signal<string>;
} {
  const isLoading = signal(true);
  const hasError = signal(false);
  const error = signal('');

  obs$.subscribe({
    next: (res) => {
      config.onSuccess(res);
      isLoading.set(false);
    },
    error: (err) => {
      hasError.set(true);
      isLoading.set(false);

      const devMessage = err?.message || 'Unexpected error';
      console.error(`[${config.errorMessage}]`, devMessage);

      const userMessage =
        config.errorMessage?.concat('. Por favor, intenta más tarde.') ||
        'Ocurrió un error inesperado.';
      error.set(userMessage);

      if (config.onError) config.onError(err);
    },
    complete: () => {
      if (config.onComplete) config.onComplete();
    },
  });

  return {
    isLoading: isLoading.asReadonly(),
    hasError: hasError.asReadonly(),
    error: error.asReadonly(),
  };
}

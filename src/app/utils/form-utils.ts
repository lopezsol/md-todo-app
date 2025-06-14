import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static titlePattern = '^(?!\\s)(.*\\S)$';
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        //TODO: validar si una palabra con 2 letras trae error en el BE
        // case 'minlength':
        //   return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Máximo de ${errors['maxlength'].requiredLength} caracteres.`;
        case 'whitespace':
          return 'El título está vacío o solo tiene espacios.';
        case 'minTrimmedLength':
          return `Mínimo de ${errors['minTrimmedLength'].requiredLength} caracteres.`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.titlePattern) {
            return 'No se permiten espacios al principio ni al final.';
          }

          return 'Error de patrón contra expresión regular.';

        default:
          return `Error de validación no controlado ${key}.`;
      }
    }
    return null;
  }

  static isInvalidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static noWhitespaceValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  static minTrimmedLength(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const trimmed = control.value?.trim();
      if (trimmed?.length < 3) {
        return {
          minTrimmedLength: {
            requiredLength: min,
          },
        };
      }
      return null;
    };
  }
}

import { FormGroup, AbstractControl } from '@angular/forms';

export class FormUtil {
    formGroup: FormGroup;

    constructor(formGroup: FormGroup) {
        this.formGroup = formGroup;
    }

    // Método para obtener un control de formulario por su nombre
    getControl(controlName: string): AbstractControl {
        return this.formGroup.get(controlName);
    }

    // Método para verificar si un control es válido y ha sido tocado o enviado
    isControlValidAndTouched(controlName: string): boolean {
        const control = this.getControl(controlName);
        return control.valid && (control.touched || control.dirty);
    }

    // Método para marcar todos los controles del formulario como tocados
    markAllControlsAsTouched(): void {
        Object.keys(this.formGroup.controls).forEach((controlName) => {
            this.formGroup.get(controlName).markAsTouched();
        });
    }

    // Método para limitar la longitud de un Input campo de texto
    limitInputLength(
        event: Event,
        maxLength: number,
        controlName: string
    ): void {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length > maxLength) {
            inputElement.value = value.slice(0, maxLength);
            this.formGroup.get(controlName).setValue(inputElement.value, {emitEvent:false});
        }
    }

    preventNumbers(event:KeyboardEvent){
        if(/[0-9]/.test(event.key)){
            event.preventDefault();
        }
    }

}

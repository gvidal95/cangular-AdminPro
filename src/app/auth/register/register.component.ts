import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Luis', [ Validators.required, Validators.minLength(3) ]],
    email: ['lperez@correo.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [ true , Validators.required],

  },  {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService : UsuarioService,
              private router: Router) {}

  crearUsuario(){
    this.formSubmitted = true;
    
    //Valores del form
    // console.log(this.registerForm.value); 

    //Errores del formulario
    // console.log(this.registerForm); 

    if(this.registerForm.invalid){
      console.log('form no valido');
      return;
    }
    
    //Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, err => {
        //Si existe un error
        console.warn(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      });
   
  }

  campoNoValido( campo: string ): boolean{
    if( this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  constrasenasNoValidas(): boolean{
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( pass1 !== pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(): boolean{
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true});
      }

    }
  }


}

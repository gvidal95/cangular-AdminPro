import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
declare function customSideBar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public imgUrl = '';
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    customSideBar();
  }

}

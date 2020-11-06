import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];
  public imgUrl = '';
  public usuario: Usuario;

  constructor( public sidebarService: SidebarService, usuarioService: UsuarioService) {
    this.menuItems = this.sidebarService.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}

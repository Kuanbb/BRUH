import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CompromissosService } from '../../services/compromissos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  agenda : any[]=[];
  constructor(private alertController: AlertController, private comp: CompromissosService, private actionSheetCtrl : ActionSheetController) { }

  ngOnInit() {
  }

  async adicionar(){
    const alert = await this.alertController.create({
      //Perguntas
      header: 'Adicione outro contato',
      //caixas de texto
      inputs:[
      { 
        name: 'nome',
        type: 'text',
        placeholder: 'Nome do novo contato'
      },
      {
        name: 'numero',
        type: 'text',
        placeholder: 'Número do contato'
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'E-mail do contato'
      }
    ],
      //botões
      buttons:[
      //botão cancelar
      { text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      handler: () => {
      console.log('Confirm Cancel')
      }
      },
      //botão salvar
      { text: 'Salvar',
        handler: (form) => {
          console.log(form);
          localStorage.setItem('Formulario', form);
          this.comp.salvar(form.nome, form.numero, form.email);
          this.listarAgenda();
        }
      }]
      });
      await alert.present();
  }
  
  ionViewDidEnter(){
    this.listarAgenda();
  }
  listarAgenda(){
    this.agenda = this.comp.listar();
  }

  apagar(item:any){
    this.comp.apagar(item);
    this.agenda = this.agenda.filter(form=>{return form != item});
    this.listarAgenda();
  }

  async mudar(contato: any) {
    const alert = await this.alertController.create({
      header: 'Editar contato',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          value: contato.nome,
          placeholder: 'Nome do contato'
        },
        {
          name: 'numero',
          type: 'text',
          value: contato.numero,
          placeholder: 'Número do contato'
        },
        {
          name: 'email',
          type: 'email',
          value: contato.email,
          placeholder: 'E-mail do contato'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edição cancelada.');
          }
        },
        {
          text: 'Salvar',
          handler: (dadosAtualizados) => {
            const contatoAtualizado = { ...contato, ...dadosAtualizados }; // Mescla os dados
            this.comp.atualizar(contatoAtualizado);
            this.listarAgenda(); // Atualiza a lista exibida
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
}

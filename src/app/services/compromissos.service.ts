import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompromissosService {

  key = 'contatos';

  constructor() {}

  salvar(nome: string, numero: string, email: string) {
    const novoContato = { id: Date.now(),nome, numero, email };
    const contatos = JSON.parse(localStorage.getItem(this.key) || '[]');
    contatos.push(novoContato);
    localStorage.setItem(this.key, JSON.stringify(contatos));

    console.log('Contato salvo:', novoContato);
  }

  listar() {
    let value = localStorage.getItem(this.key)
    if (value==null || value==undefined){
      console.log('Vazio');
      return[];
    }else{
      let colecao : any[] = JSON.parse(value);
      console.log(colecao);
      return colecao;
    }
  }

  apagar(agenda: any) {
    const value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    }
    const colecao: any[] = JSON.parse(value);
    const resultado = colecao.filter(item => item.id !== agenda.id);
    localStorage.setItem(this.key, JSON.stringify(resultado));
    console.log(`Contato com ID ${agenda.id} removido.`);
  }
  
  atualizar(contatoAtualizado: any) {
    const contatos = JSON.parse(localStorage.getItem(this.key) || '[]');
    const indice = contatos.findIndex((item: any) => item.id === contatoAtualizado.id);
  
    if (indice !== -1) {
      contatos[indice] = { ...contatos[indice], ...contatoAtualizado }; // Atualiza apenas os campos alterados
      localStorage.setItem(this.key, JSON.stringify(contatos));
      console.log(`Contato com ID ${contatoAtualizado.id} atualizado.`, contatos[indice]);
    } else {
      console.error(`Contato com ID ${contatoAtualizado.id} não encontrado.`);
    }
  }
  
}

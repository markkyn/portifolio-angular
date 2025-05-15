import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('terminalPrompt') terminalPrompt!: ElementRef;
  
  commandHistory: string[] = [];
  currentCommand = '';

  ngAfterViewInit() {
    // Foca no input quando o componente é inicializado
    const input = this.terminalPrompt.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  onCommandSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.currentCommand.trim()) {
      this.commandHistory.push(`> ${this.currentCommand}`);
      // Aqui você pode adicionar a lógica para processar o comando
      this.currentCommand = '';
      
      // Scroll para o último comando após um pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        const promptElement = this.terminalPrompt.nativeElement;
        promptElement.scrollTop = promptElement.scrollHeight;
      }, 0);
    }
  }
}

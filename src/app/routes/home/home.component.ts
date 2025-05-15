import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../../components/terminal/terminal.component';
import { TerminalWindowComponent } from '../../components/terminal-window/terminal-window.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TerminalComponent, TerminalWindowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Página Inicial';
  windowPosition = { x: 100, y: 100 };
} 
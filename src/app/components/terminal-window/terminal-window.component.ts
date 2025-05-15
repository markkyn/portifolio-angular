import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-window',
  templateUrl: './terminal-window.component.html',
  styleUrls: ['./terminal-window.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TerminalWindowComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() position = { x: 100, y: 100 };
  @ViewChild('windowElement') windowElement!: ElementRef;

  private isDragging = false;
  private currentX = 0;
  private currentY = 0;
  private initialX = 0;
  private initialY = 0;

  private baseZIndex: string = '10'; // Conforme CSS
  private activeZIndex: string = '11'; // Para sobrepor outras janelas

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.currentX = this.position.x;
    this.currentY = this.position.y;
    this.updatePosition(this.currentX, this.currentY);
    this.renderer.setStyle(this.windowElement.nativeElement, 'z-index', this.baseZIndex);
  }

  onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.window-header')) {
      this.isDragging = true;
      this.renderer.setStyle(this.windowElement.nativeElement, 'z-index', this.activeZIndex); 
      
      const rect = this.windowElement.nativeElement.getBoundingClientRect();
      this.initialX = event.clientX - rect.left;
      this.initialY = event.clientY - rect.top;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      event.preventDefault();
      
      const terminal = this.windowElement.nativeElement.closest('.terminal-container');
      if (terminal) {
        const windowsContainer = terminal.querySelector('.windows-container');
        const terminalRect = terminal.getBoundingClientRect();
        const containerRect = windowsContainer.getBoundingClientRect();
        const windowRect = this.windowElement.nativeElement.getBoundingClientRect();
        
        let newX = event.clientX - containerRect.left - this.initialX;
        let newY = event.clientY - containerRect.top - this.initialY;
        
        newX = Math.max(0, Math.min(newX, containerRect.width - windowRect.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - windowRect.height));
        
        this.currentX = newX;
        this.currentY = newY;
        this.updatePosition(newX, newY);
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.setStyle(this.windowElement.nativeElement, 'z-index', this.baseZIndex); 
    }
  }

  private updatePosition(x: number, y: number) {
    if (this.windowElement) {
      this.windowElement.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  onClose() {
    this.windowElement.nativeElement.remove();
  }
} 
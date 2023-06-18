import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files = [
    'assets/files/Free_Test_Data_1MB_MP3.mp3',
    'assets/files/Free_Test_Data_100KB_MP3.mp3',
    'assets/files/Free_Test_Data_500KB_MP3.mp3',
  ];
  
}

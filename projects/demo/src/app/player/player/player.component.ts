import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files = [
    'assets/files/Mehdi Ahmadvand - Zang Bezani (320).mp3',
    'assets/files/Voice_565590.mp3',
    'https://pendargan.ir/appapi/FileStorage_CDN/FileStorage%5C14%5CFrom_5648%5CVoter_565590%5Ccdb915108de14025863cfd7dff3f7f47%23Voice_565590.mp3',
    'assets/files/Free_Test_Data_1MB_MP3.mp3',
    'assets/files/Free_Test_Data_100KB_MP3.mp3',
    'assets/files/Free_Test_Data_500KB_MP3.mp3',
  ];
  
}

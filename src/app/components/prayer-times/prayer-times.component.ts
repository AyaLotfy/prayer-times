// // prayer-times.component.ts
// import { CommonModule } from '@angular/common';
// import { isPlatformBrowser } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { PrayerTimeService } from '../../services/prayer-time.service';
// // import { PrayerTimeService } from '../prayer-time.service';

// @Component({
//   selector: 'app-prayer-times',
//   standalone: true,
//   templateUrl: './prayer-times.component.html',
//   imports: [CommonModule, HttpClientModule], // If standalone, add necessary imports like HttpClientModule here
//   providers:[PrayerTimeService]
// })
// export class PrayerTimesComponent implements OnInit {
//   prayerTimes: { [key: string]: string } | null = null;

//   isBrowser: boolean;

//   constructor(
//     private prayerTimeService: PrayerTimeService,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     // Check if code is running in the browser
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit(): void {
//     if (this.isBrowser) {
//       this.getUserLocation();
//     }
//   }



//   getUserLocation(): void {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;

//           this.prayerTimeService.getPrayerTimesByCoords(latitude, longitude).subscribe(
//             (response) => {
//               this.prayerTimes = response.data.timings;
//             },
//             (error) => {
//               console.error('Error fetching prayer times:', error);
//             }
//           );
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }
// }


// prayer-times.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

interface PrayerTime {
  name: string;
  time: string;
}

@Component({
  selector: 'app-prayer-times',
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule here

})
export class PrayerTimesComponent implements OnInit {
  currentTime: Date = new Date();
  currentDate: Date = new Date();

  nextPrayerCountdown: number = 80; // Dummy value, replace with logic to calculate time to next prayer
  prayerTimes: PrayerTime[] = [
    { name: 'Fajr', time: '5:00 AM' },
    { name: 'Dhuhr', time: '12:30 PM' },
    { name: 'Asr', time: '4:00 PM' },
    { name: 'Maghrib', time: '6:30 PM' },
    { name: 'Isha', time: '8:00 PM' },
  ];

  imageUrl: string;

  constructor() {
    // Set the path to the image in the assets folder
    this.imageUrl = 'assets/Kaaba.jpg'; // Path relative to the assets folder
  }
  ngOnInit(): void {
    // Update current time every second
    // interval(1000).subscribe(() => {
    //   this.currentTime = new Date();
    // });

    // Call the API to get prayer times and update next prayer countdown
    this.fetchPrayerTimes();
  }

  fetchPrayerTimes() {
    // Mock API call to fetch prayer times
    // In real implementation, use a service to fetch data from a prayer time API
  }

  openQuran() {
    console.log('Open Quran');

    // Logic to open Quran section
  }

  openSettings() {
    console.log('Open Settings');
    // Logic to open Settings section
  }
}

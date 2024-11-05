

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { json } from 'stream/consumers';
import { PrayerTimeService } from '../../services/prayer-time.service';


@Component({
  selector: 'app-prayer-times',
  standalone: true,
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css'],

  imports: [CommonModule, HttpClientModule], // If standalone, add necessary imports like HttpClientModule here
  providers:[PrayerTimeService]
})
export class PrayerTimesComponent implements OnInit {
  prayerTimesRes: { [key: string]: string } | null = null;

  prayerTimes :any;

  isBrowser: boolean;


  constructor(
    private prayerTimeService: PrayerTimeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    
    if (this.isBrowser) {
   
      this.getUserLocation();
    }
  }



  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.prayerTimeService.getPrayerTimesByCoords(latitude, longitude).subscribe(
            (response) => {
              this.prayerTimesRes = response.data.timings;

              console.log("this.prayerTimes"+JSON.stringify(this.prayerTimesRes))

              this.prayerTimes=[
              { name: 'Fajr', time: this.prayerTimesRes['Fajr'] },
              { name: 'Sunrise', time: this.prayerTimesRes['Sunrise'] },
              { name: 'Dhuhr', time:this.prayerTimesRes['Dhuhr'] },
              { name: 'Asr', time: this.prayerTimesRes['Asr'] },
              { name: 'Maghrib', time: this.prayerTimesRes['Maghrib'] },
              { name: 'Isha', time: this.prayerTimesRes['Isha'] },
              ]

              this.updateTime();
              this.updateDate();
            },
            (error) => {
              console.error('Error fetching prayer times:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }



  currentTime: Date = new Date();
  nextPrayerCountdown: number = 0;
  currentDate: Date = new Date();
  imageUrl: string = 'assets/Kaaba.jpg';

 


  updateTime() {
    // setInterval(() => {
      this.currentTime = new Date();
      this.calculateNextPrayerCountdown();
    // }, 1000); // Update every second
  }

  updateDate() {
    // setInterval(() => {
      this.currentDate = new Date();
    // }, 60000); // Update every minute
  }

  calculateNextPrayerCountdown() {
    const now = new Date();
    let nextPrayer: any = null;


    for (let prayer of this.prayerTimes) {
      // const [time, meridiem] = prayer.time.split(' ');
      if(prayer.name == 'Sunrise'){
        continue
      }
      let [hours, minutes] = prayer.time.split(':').map(Number);

      // if (meridiem.toUpperCase() === 'PM' && hours !== 12) {
      //   hours += 12;
      // } else if (meridiem.toUpperCase() === 'AM' && hours === 12) {
      //   hours = 0;
      // }

      const prayerTime = new Date(now);
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime > now) {
        nextPrayer = prayerTime;
        break;
      }
    }

    if (nextPrayer) {
      const diffMs = nextPrayer.getTime() - now.getTime();
      this.nextPrayerCountdown = Math.ceil(diffMs / 60000); // Convert to minutes
    } else {
      // If no more prayers today, reset countdown
      this.nextPrayerCountdown = 0;
    }
  }

  openQuran() {
    // Logic to open Quran section
    console.log('Quran button clicked');
  }

  openSettings() {
    // Logic to open Settings
    console.log('Settings button clicked');
  }
}

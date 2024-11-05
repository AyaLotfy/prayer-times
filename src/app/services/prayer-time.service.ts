// prayer-time.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PrayerTimesResponse {
  data: {
    timings: {
      Fajr: string;
      Sunrise:string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class PrayerTimeService {
  private apiUrl = 'https://api.aladhan.com/v1/timings';

  constructor(private http: HttpClient) {}

  getPrayerTimes(city: string, country: string): Observable<PrayerTimesResponse> {
    const params = {
      city,
      country,
      method: '2'  // Selects the calculation method (you can change this if needed)
    };

    return this.http.get<PrayerTimesResponse>(this.apiUrl, { params });
  }
  getPrayerTimesByCoords(latitude: number, longitude: number): Observable<PrayerTimesResponse> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      method: '2', // Select a calculation method if needed
    };

    return this.http.get<PrayerTimesResponse>(this.apiUrl, { params });
  }
}

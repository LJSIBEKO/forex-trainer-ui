import { Component } from '@angular/core';

interface CalendarDay {
  date: number | null;
  selected: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

openAddCourseModal() {
throw new Error('Method not implemented.');
}
  currentPage: string='';

  onPageChange(page: string) {
    this.currentPage = page;
    console.log(`Navigating to ${page}`);
  }

  showCalendar: boolean = false;
  calendar: CalendarDay[][] = []; // 2D array for weeks

  constructor() {
    this.createCalendar();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  createCalendar() {
    const monthDays = 30; 
    const startDay = new Date(2024, 10, 1).getDay();
    const weeks: CalendarDay[][] = [];
    let week: CalendarDay[] = [];

    for (let i = 0; i < startDay; i++) {
      week.push({ date: null, selected: false });
    }

    for (let day = 1; day <= monthDays; day++) {
      week.push({ date: day, selected: false });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    while (week.length < 7) {
      week.push({ date: null, selected: false });
    }
    if (week.length > 0) {
      weeks.push(week);
    }

    this.calendar = weeks;
  }

  selectDate(day: CalendarDay) {
    if (day.date) {
      this.calendar.forEach(week => {
        week.forEach((d: CalendarDay) => d.selected = false);
      });
      day.selected = true;

      const selectedDate = `November ${day.date}, 2024`;
      console.log(`Selected date: ${selectedDate}`);
    }
  }
}

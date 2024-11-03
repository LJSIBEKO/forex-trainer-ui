import {Component, OnInit} from '@angular/core';
declare var bootstrap: any;

interface Event {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit{

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years = [2022, 2023, 2024, 2025];
  selectedMonth: string = this.months[new Date().getMonth()];
  selectedYear: number = new Date().getFullYear();

  events: Event[] = [
    { name: 'Meeting', description: 'Project meeting', startDate: new Date('2024-11-02T08:50'), endDate: new Date('2024-11-02T11:00') },
    { name: 'Lunch', description: 'Lunch with client', startDate: new Date('2024-11-03T12:30'), endDate: new Date('2024-11-03T13:30') },
    { name: 'Workshop', description: 'Skills workshop', startDate: new Date('2024-11-05T10:00'), endDate: new Date('2024-11-05T13:00') },
    { name: 'Break down', description: 'Skills workshop', startDate: new Date('2024-11-05T13:30'), endDate: new Date('2024-11-05T14:30') },
    { name: 'Last stand up', description: 'Skills workshop', startDate: new Date('2024-11-05T15:00'), endDate: new Date('2024-11-05T16:00') }
  ];

  calendarDays: { date: Date, events: Event[] }[] = [];
  selectedDay?: Date;
  selectedDayEvents: Event[] = [];
  nextUpcomingEvent?: Event;
  timeRemaining: string = '';
  sidebarVisible = false;

  ngOnInit() {
    this.generateCalendar();
    this.getNextUpcomingEvent();
    this.updateTimeRemaining();

    // Update remaining time every minute
    setInterval(() => {
      this.updateTimeRemaining();
    }, 60000); // Update every minute
  }

  generateCalendar() {
    const daysInMonth = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth) + 1, 0).getDate();
    this.calendarDays = Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), i + 1),
      events: this.getEventsForDate(new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), i + 1))
    }));
  }

  getEventsForDate(date: Date): Event[] {
    return this.events.filter(event =>
      event.startDate.getFullYear() === date.getFullYear() &&
      event.startDate.getMonth() === date.getMonth() &&
      event.startDate.getDate() === date.getDate()
    ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime()); // Sort by start time
  }

  filterEvents() {
    this.generateCalendar();
    this.getNextUpcomingEvent();
  }

  toggleDaySelection(date: Date) {
    if (this.selectedDay?.getTime() === date.getTime()) {
      // If clicking the same date again, hide the sidebar
      this.sidebarVisible = false;
      this.selectedDay = undefined;
      this.selectedDayEvents = [];
    } else {
      // Show the sidebar and update the selected day
      this.sidebarVisible = true;
      this.selectedDay = date;
      this.selectedDayEvents = this.getEventsForDate(date);
    }
  }

  getNextUpcomingEvent() {
    const now = new Date();
    const upcomingEvents = this.events.filter(event => event.startDate > now);
    this.nextUpcomingEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : undefined;
    this.calculateTimeRemaining();
  }

  calculateTimeRemaining() {
    if (this.nextUpcomingEvent) {
      const now = new Date();
      const timeDiff = this.nextUpcomingEvent.startDate.getTime() - now.getTime();

      // Calculate minutes, hours, and days
      const minutesLeft = Math.floor(timeDiff / (1000 * 60));
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (minutesLeft < 0) {
        this.timeRemaining = 'Event is happening now!';
      } else if (minutesLeft < 60) {
        this.timeRemaining = `${minutesLeft} min`;
      } else if (hoursLeft < 24) {
        this.timeRemaining = `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
      } else {
        this.timeRemaining = `${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
      }
    } else {
      this.timeRemaining = 'No upcoming events';
    }
  }

  updateTimeRemaining() {
    this.calculateTimeRemaining();
  }

  getEventPosition(startDate: Date): number {
    const minutes = startDate.getHours() * 60 + startDate.getMinutes();
    return (minutes / 1440) * 100; // 1440 minutes in a day
  }

  getEventHeight(event: Event): number {
    const startMinutes = event.startDate.getHours() * 60 + event.startDate.getMinutes();
    const endMinutes = event.endDate.getHours() * 60 + event.endDate.getMinutes();
    return ((endMinutes - startMinutes) / 1440) * 100; // Height in percentage
  }

}

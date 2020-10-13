import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

export class CalendarDay {
  public date: Date;
  public title: string;
  public isPasteDate: boolean;
  public isToday: boolean;

  public getDateString(): string {
    return this.date.toISOString().split('T')[0];
  }
  constructor(d: Date) {
    this.date = d;
    this.isPasteDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
  }
}

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    const calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendar: CalendarDay[] = [];
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public today = new Date();
  public date: number;
  public day: number;
  public month: number;
  public dayOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public numDayOfWeek: number;
  public displayMonth: string;
  public displayYear: number;
  public isWindow = false;
  private monthIndex = 0;

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    // reset our calendar
    this.calendar = [];

    // set the date
    const day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    this.month = day.getMonth();
    // set the dispaly for UI
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();

    const startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (let i = 0; i < 35; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  public setDay(): void {
    this.today = new Date();
}

  // tslint:disable-next-line:typedef
  private getStartDateForCalendar(selectedDate: Date){

    const lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startingDateOfCalendar.getDay() !== 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() !== 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth(): any {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth(): any {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth(): any {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  click(event: MouseEvent): void {
    const a = (event.target) as HTMLTableElement;
    this.date = Number(a.textContent);
    this.day = new Date(this.displayYear, this.month, this.date).getDay();
    this.numDayOfWeek = [0, 1, 2, 3, 4, 5, 6][this.day];
    this.isWindow = !this.isWindow;
  }
}


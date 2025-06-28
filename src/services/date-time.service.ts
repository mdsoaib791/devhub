import { injectable } from 'inversify';
import moment from 'moment-timezone';
import IDateTimeService from './interfaces/idate-time.service';

import DropdownBasicDto from '@/dtos/dropdown-basic.dto';
import { findIana } from 'windows-iana';

@injectable()
export default class DateTimeService implements IDateTimeService {
  constructor() { }
  convertToLocalDate(dateTimeOffset: Date, displayTime?: boolean, timezone?: string): string {
    if (!timezone) {
      if (typeof window !== 'undefined') {
        const savedTimeZone = localStorage.getItem('utz') || '';
        if (savedTimeZone) {
          timezone = savedTimeZone;
        } else {
          timezone = 'Asia/Kolkata';
        }
      }
    }

    try {
      if (timezone && !moment.tz.zone(timezone)) {
        const ianaAliasses = findIana(timezone);
        if (ianaAliasses && ianaAliasses.length > 0) {
          timezone = ianaAliasses[0] || '';
        }
      }
    } catch (e) {
      console.error('time zome conversion error', e);
    }

    if (!timezone || !moment.tz.zone(timezone)) {
      timezone = 'Asia/Kolkata';
    }

    // // Parse the DateTimeOffset string and extract the relevant components
    // const dateTime = new Date(dateTimeOffset as unknown as string);
    // const year = dateTime.getFullYear();
    // const month = dateTime.getMonth() + 1; // Months are zero-based, so add 1
    // const day = dateTime.getDate();
    // const hours = dateTime.getHours();
    // const minutes = dateTime.getMinutes();
    // const seconds = dateTime.getSeconds();

    // // Create a new Date object using the DateTimeOffset components
    // const date = new Date(year, month - 1, day, hours, minutes, seconds);
    // const formattedDateString = displayTime
    //   ? moment(date).locale('en').format('DD MMM, YYYY h:mm a')
    //   : moment(date).locale('en').format('DD MMM, YYYY');
    // return formattedDateString;

    const date = moment.utc(dateTimeOffset).tz(timezone);

    if (!displayTime) {
      const localDateString = date.format('DD MMM YYYY');
      return localDateString;
    } else {
      const localDateString = date.format('DD MMM YYYY hh:mm a');
      return localDateString;
    }
  }

  convertTimeToAmPm(time: string | null): string {
    if (!time) return '';

    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString([], options);
    return formattedTime;
  }

  getMonths(): DropdownBasicDto[] {
    const months: DropdownBasicDto[] = [
      {
        value: 1,
        label: 'January',
      },
      {
        value: 2,
        label: 'February',
      },
      {
        value: 3,
        label: 'March',
      },
      {
        value: 4,
        label: 'April',
      },
      {
        value: 5,
        label: 'May',
      },
      {
        value: 6,
        label: 'June',
      },
      {
        value: 7,
        label: 'July',
      },
      {
        value: 8,
        label: 'August',
      },
      {
        value: 9,
        label: 'September',
      },
      {
        value: 10,
        label: 'October',
      },
      {
        value: 11,
        label: 'November',
      },
      {
        value: 12,
        label: 'December',
      },
    ];
    return months;
  }

  calculateDateDiff(fromDate: Date, toDate: Date): { year: number; month: number; days: number } {
    const diff = moment(toDate).diff(moment(fromDate), 'milliseconds');
    const duration = moment.duration(diff);
    return {
      year: duration.years(),
      month: duration.months(),
      days: duration.days(),
    };
  }

  calculateDateDiffInDays(fromDate: Date, toDate: Date): number {
    const diff = moment(toDate).startOf('day').diff(moment(fromDate).startOf('day'), 'days');
    return diff;
  }
}

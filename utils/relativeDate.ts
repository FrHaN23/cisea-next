export default function relativeDate(past: Date){
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
        
        let unit: string;

        switch (true) {
          case diffInSeconds < 60:
            unit = 'seconds';
            return `${diffInSeconds} ${unit} ago`;
          case diffInSeconds < 3600: // less than an hour
            unit = 'minutes';
            return `${Math.floor(diffInSeconds / 60)} ${unit} ago`;
          case diffInSeconds < 86400: // less than a day
            unit = 'hours';
            return `${Math.floor(diffInSeconds / 3600)} ${unit} ago`;
          case diffInSeconds < 604800: // less than a week
            unit = 'days';
            return `${Math.floor(diffInSeconds / 86400)} ${unit} ago`;
          case diffInSeconds < 2592000: // less than a month
            unit = 'weeks';
            return `${Math.floor(diffInSeconds / 604800)} ${unit} ago`;
          case diffInSeconds < 31536000: // less than a year
            unit = 'months';
            return `${Math.floor(diffInSeconds / 2592000)} ${unit} ago`;
          default:
            unit = 'years';
            return `${Math.floor(diffInSeconds / 31536000)} ${unit} ago`;
        }
}
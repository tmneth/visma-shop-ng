import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncateString',
})
export class TruncateString implements PipeTransform {
  transform(originalString: string, expectedLength = 30) {
    if (originalString.length >= expectedLength)
      return originalString.slice(0, expectedLength) + '...';
    return originalString;
  }
}

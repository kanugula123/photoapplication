import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderByDate',
  pure: false
})

export class OrderByDatePipe implements PipeTransform {
  transform(array: any[], property: string, order: 'asc' | 'desc'): any[] {
    if (!Array.isArray(array) || !property) {
      return array;
    }

    array.sort((_a: any, _b: any) => {
      const dateA = new Date(_a[property]);
      const dateB = new Date(_b[property]);

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    return array;
    }
}

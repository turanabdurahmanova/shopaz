import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BtnLoaderService {
  private isLoading: Subject<boolean> = new Subject();
  loadingValue(): Subject<boolean> {
    return this.isLoading;
  }
  changeValueOfLoading(value: boolean): void {
    this.isLoading.next(value);
  }
}

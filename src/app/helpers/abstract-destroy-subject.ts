import {OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * Предоставляет Observable при уничтожении компонента
 */
export abstract class AbstractDestroySubject implements OnDestroy {
  public get onDestroy$(): Observable<void> {
    return this.onDestroy.asObservable();
  }
  private onDestroy: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}

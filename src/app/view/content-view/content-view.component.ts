import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SceneService} from '../../core/services/scene.service';
import {Scene} from '../../core/simulation/scene';
import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {

  private _isContentLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showLoadingSkeleton = true;

  content = '';

  constructor(private sceneService: SceneService,
              private router: Router) { }

  ngOnInit(): void {
    this.sceneService.scene.pipe(debounceTime(100)).subscribe(val => {
      this.showLoadingSkeleton = true;
      this.content = val.content();
      this.showLoadingSkeleton = false;
    });
  }

  getRoute(event: MouseEvent): void {
    // @ts-ignore
    const routerLink = event.target.getAttribute('href');
    this.router.navigate([routerLink]);
    event.preventDefault();
    event.stopPropagation();
  }

  get scene(): Scene | undefined {
    return this.sceneService.scene.getValue();
  }

  get isContentLoading(): boolean {
    return this._isContentLoading.getValue();
  }

  @Input()
  set isContentLoading(val: boolean) {
    this._isContentLoading.next(val);
  }
}

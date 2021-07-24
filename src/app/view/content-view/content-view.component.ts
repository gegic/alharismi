import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SceneService} from '../../core/services/scene.service';
import {Scene} from '../../core/simulation/scene';
import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {

  content: SafeHtml | string = '';
  successContent: SafeHtml | string = '';
  private _isContentLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showLoadingSkeleton = true;

  constructor(private sceneService: SceneService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sceneService.set.pipe(debounceTime(100)).subscribe(val => {
      this.showLoadingSkeleton = true;
      this.getContent();
      this.showLoadingSkeleton = false;
    });
    this.sceneService.played.pipe(debounceTime(100)).subscribe(val => {
      if (val === 'played') {
        this.showLoadingSkeleton = true;
        this.getSuccessContent();
        this.showLoadingSkeleton = false;
      }
    });
  }

  getRoute(event: MouseEvent): void {
    // @ts-ignore
    const routerLink = event.target.getAttribute('href');
    if (!routerLink) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const url = this.router.serializeUrl(
      this.router.createUrlTree([routerLink])
    );

    window.open(url, '_blank');

  }

  getContent(): void {
    if (!this.scene) {
       this.content = '';
       return;
    }
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.scene.content());
  }

  getSuccessContent(): void {
    if (!this.scene) {
      this.successContent = '';
      return;
    }
    this.successContent = this.sanitizer.bypassSecurityTrustHtml(this.scene.successContent());
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

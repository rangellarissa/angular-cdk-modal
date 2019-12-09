import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';

import {Subscription} from 'rxjs';

import {GenericModalService} from '../../../modal/services/generic-modal.service';
import {ModalType} from '../../../modal/models';

@Component({
  selector: 'app-secondary-first-modal',
  template: `
    <ng-template #modalTemplate>
        <p>secondary-first-modal works!</p>
    </ng-template>
  `,
})
export class SecondaryFirstModalComponent implements OnInit, OnDestroy {

  @ViewChild('modalTemplate', {static: true}) modalTemplate: TemplateRef<any>;

  private typeSubscription: Subscription;

  constructor(private viewContainerRef: ViewContainerRef,
              private genericModalService: GenericModalService) {
  }

  ngOnInit() {
    this.typeSubscription = this.genericModalService.type
      .subscribe((type: ModalType) => {
        if (type === ModalType.SECONDARY_1) {
          this.genericModalService.setModalPortal(new TemplatePortal<any>(this.modalTemplate, this.viewContainerRef));
        }
      });
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
  }
}

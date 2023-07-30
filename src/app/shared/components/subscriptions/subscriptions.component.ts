import { Component } from '@angular/core'
import { SUBSCRIPTIONS } from '../../data'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent {
  subscriptions = SUBSCRIPTIONS

  subscriptionForm = new FormGroup<{ subscription: FormControl<string> }>({
    subscription: new FormControl<string>('Exclusive subscription', {
      nonNullable: true,
    }),
  })

  onLabelClick(subscription: string) {
    this.subscriptionForm.setValue({ subscription })
  }
}

import { LightningElement, wire, track } from 'lwc';
import showCartItems from '@salesforce/apex/ShoeFetcher.showCartItems';


export default class AllOrderLineItems extends LightningElement {

    @track orderLineItems;
    @track error;
    

    @wire(showCartItems)
    wiredOrderLineItems({ error, data }) {
        if (data) {
            this.orderLineItems = data;
            this.error = undefined;
            console.log(this.orderLineItems);
        } else if (error) {
            this.error = error;
            this.orderLineItems = undefined;
        }
    }

}
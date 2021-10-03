import { LightningElement, api, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import showCartItems from '@salesforce/apex/ShoeFetcher.showCartItems';
import addShoeToCart from "@salesforce/apex/ShoeFetcher.addShoeToCart";

export default class ShoeDisplay extends LightningElement {
    @api listOfShoes;
    @api addToCart;
    @wire(CurrentPageReference) pageRef;
    @api records;

    passEvent ='';

    connectedCallback(){
        registerListener('passEvent', this.passTheEvent, this);
       // showCartItems().then(result => {
       //   this.records = result;
         // console.log('i run on page load');    
       //  });
      //  fireEvent(this.pageRef ,'dataToShoppingCart', this.records);

      }
    
      disconnectedCallback() {
        unregisterAllListeners(this);
      }
    
     
    passTheEvent(data) {
        this.passEvent = data;

    }

    addSelectedShoe(event) {
        const selectedShoeId = event.target.name;
        //console.log(selectedShoeId);
        this.addToCart = selectedShoeId;
        addShoeToCart ({theName:selectedShoeId}).then(result => {
          this.records = result;
          console.log(this.records);
            eval("$A.get('e.force:refreshView').fire();");
        
        });
       // fireEvent(this.pageRef ,'dataToShoppingCart', this.records);

        }


}

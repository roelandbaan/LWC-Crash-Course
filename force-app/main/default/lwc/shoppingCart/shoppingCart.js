// wireGetRecordDynamicContact.js
import { LightningElement, track, wire, api } from 'lwc';
import showCartItems from '@salesforce/apex/ShoeFetcher.showCartItems';
import CreateSOrder from "@salesforce/apex/ShoeFetcher.CreateSOrder";
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { getRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

export default class ShoppingCart extends LightningElement {
   
  @api recordId;
  @track account;



    @track shoes;
    @track error;
    @track progress = 5000;
    //variable that holds the list with queried OrderLineItem__c records
    soqlList = '';
    @track wireData = [];

    connectedCallback(){

        showCartItems().then(result => {
            this.soqlList = result;
           // console.log('i run on page load');    
           });


         //  registerListener('dataToShoppingCart', this.passTheEvent, this);

        //   this._interval = setInterval(() => {  
        //    this.progress = this.progress + 5000;  
        //   showCartItems().then(result => {
        //        this.soqlList = result;  
       //         console.log('result', result);
      //        });
      //     if ( this.progress === 60000 ) {  
      //          clearInterval(this._interval);  
      //      }  
      //  }, this.progress);  



     //   setInterval( () => {
     //   showCartItems().then(result => {
     //       this.soqlList = result;    
     //      });
     //   },7000)

   }


   @wire(getRecord, { recordId: '$recordId', fields: [ 'Shoe_order_line_item__c.Name', 'Shoe_order_line_item__c.Price__c', 'Shoe_order_line_item__c.Image__c' ] })
   getaccountRecord({ data, error }) {
       console.log('ShoeOrderLineItem => ', data, error);
       if (data) {
           this.account = data;
        //   this.processRelatedObjects();
       } else if (error) {
           console.error('ERROR => ', JSON.stringify(error)); // handle error properly
       }
   }


  // disconnectedCallback() {
  //  unregisterAllListeners(this);
 // }



 // passTheEvent(data) {
  //  this.soqlList = data;
//}

       // tried to use a wire function to refresh the page but didnt work
  // @wire(showCartItems)OrderLineItems(result) {
  //     const {data, error} = result;
  //     this.wireData = result;
  //     if(data) {
  //         console.log('OrderLineItems', data)
  //         this.soqlList = data;
  //         return refreshApex(this.wireData);
 //      }else if(error) {
  //         console.log(error);
  //     }
  //    
//   }


   displayOrder() {
    showCartItems().then(result => {
        this.soqlList = result;
        console.log('result', result);
       });
       console.log('soqlList',this.soqlList);
   }


    createOrder() {
        CreateSOrder();
        eval("$A.get('e.force:refreshView').fire();");
    }

    



}
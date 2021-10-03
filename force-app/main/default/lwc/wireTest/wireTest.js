import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import Image_FIELD from '@salesforce/schema/Shoe_order_line_item__c.Image__c';
import Price_FIELD from '@salesforce/schema/Shoe_order_line_item__c.Price__c';
import Name_FIELD from '@salesforce/schema/Shoe_order_line_item__c.Name';

const fields = [Image_FIELD, Price_FIELD, Name_FIELD];

export default class wireTest extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    shoeOrderLineItem;

    get image() {
        return getFieldValue(this.shoeOrderLineItem.data, Image_FIELD);
    }

    get price() {
        return getFieldValue(this.shoeOrderLineItem.data, Price_FIELD);
    }

    get name() {
        return getFieldValue(this.shoeOrderLineItem.data, Name_FIELD);
    }
}
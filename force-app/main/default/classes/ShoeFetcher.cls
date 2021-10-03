public with sharing class ShoeFetcher {

    @AuraEnabled
    public static List<Shoe_order_line_item__c> addShoeToCart(String theName) {
        system.debug('doe ik wat');
        List<Shoe_order_line_item__c> insertList = new List<Shoe_order_line_item__c>();  
        for(Shoe_inventory__c a:[SELECT Id, Name, Image__c, Price__c, Size__c, Type__c FROM Shoe_inventory__c 
        WHERE Id = :theName LIMIT 1]) {
        Shoe_order_line_item__c oLineItem = new Shoe_order_line_item__c(
               Name = a.Name,
              Shoe_inventory__c = a.Id,
              Image__c = a.Image__c,
              Size__c = a.Size__c);
              insertList.add(oLineItem);        
        }
        insert insertList;
        return insertList;
    }


    @AuraEnabled(Cacheable=true)
    public static List<Shoe_order_line_item__c> getOrderLineItems() {
        List<Shoe_order_line_item__c> returnList = [SELECT Id, Image__c, Name, Price__c, Shoe_Order__c
        FROM Shoe_order_line_item__c WHERE Shoe_Order__c = NULL];
        //system.debug(returnList);
        return returnList;
    }



    @AuraEnabled
    public static void CreateSOrder() {
        Shoe_Order__c order = new Shoe_Order__c(
        Order__c = 'Order'
        );
        insert order;
        system.debug(order.Order__c);

        if(!String.isEmpty(order.Order__c)) {
            list<Shoe_order_line_item__c> updateList = new List<Shoe_order_line_item__c>();
         for(Shoe_order_line_item__c o : [SELECT Id, Price__c, Name, Shoe_Order__c, Image__c FROM Shoe_order_line_item__c 
         WHERE Shoe_Order__c = NULL]) {
            o.Shoe_Order__c = order.Id;
            updateList.add(o);
         }  
         update updateList;
        }
    }


    // fetch orderLineItems to display on shoppingCart
    @AuraEnabled(Cacheable=true)
    public static List<Shoe_order_line_item__c> showCartItems() {
        List<Shoe_order_line_item__c> cartList = [SELECT Id, Price__c, Name, Image__c FROM Shoe_order_line_item__c 
        WHERE Shoe_Order__c = NULL];
        system.debug(cartList);
        return cartList;
    }


    @AuraEnabled(cacheable=true)
    public static Shoe_inventory__c getShoes(String addedShoeName) {
       Shoe_inventory__c addedShoe = [SELECT Id, Name, Image__c, Price__c, Size__c, Type__c FROM Shoe_inventory__c 
        WHERE Name = :addedShoeName LIMIT 1];
    return addedShoe;
}


    // set auraEnabled so the LWC can acces the method
    @AuraEnabled(cacheable=true)
    public static List<Shoe_inventory__c> fetchShoes(Integer maxPrice, String[] selectedTypes, String shoeSize){
    // Make a list of SObjects of shoe records of the selected type and withein the price range    
        List<Shoe_inventory__c> selectedShoes = [SELECT Id, Name, Image__c, Price__c, Size__c, Type__c FROM Shoe_inventory__c 
        WHERE Price__c <= :maxPrice AND Type__c IN :selectedTypes
         AND Size__c = :shoeSize
        ];
        system.debug(selectedShoes);
        return selectedShoes;
    }

}

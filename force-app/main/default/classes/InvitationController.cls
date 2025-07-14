public without sharing class InvitationController {
    @AuraEnabled(cacheable=true)
    public static Invitation__c getInvitationDetailsById(String Id){
        try {
           return[SELECT Id,Twitter_Url__c,Theme__c,Instagram_Url__c,Greeting_Message__c,Facebook_Url__c,
        Event_Participants__c,Event_Introduction__c,Event_Date_and_Time__c from Invitation__c where Id=:Id];   
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Get program details by Invitation Id
   @AuraEnabled(cacheable=true)
   public static List<Program_Detail__c> getProgramDetailsByInvitationId(String Id){
    try {
       return[SELECT Id,Name,Program_Date__c,Program_Start_Time__c,Program_End_Time__c from 
           Program_Detail__c where Invitation__c = :Id];
        } 
    catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
     }
   }
   //Get Invitation address By Id
     @AuraEnabled(cacheable=true)
    public static Invitation__c getInvitationAddress(String Id){
        try{
            return [SELECT Id, Event_Address__c, Event_Map_URL__c, Contact_Number__c from Invitation__c where Id= : Id];
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Get RSVP details By Id
     @AuraEnabled(cacheable=true)
    public static Invitation__c getRSVPDetails(String Id){
        try{
            return [SELECT Id, Rsvp_Accept_Message__c, Rsvp_After_Date_Message__c, Rsvp_Decline_Message__c, Responded_By__c from Invitation__c where Id= : Id];
        } 
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    } 
    //Get Response Picklist Values
    @AuraEnabled(cacheable=true)
    public static List<String> getResponsePicklistValues(){
        //retrieve the picklist values
       List<String> picklistValues = new List<String>();
       for(Schema.PicklistEntry picklistEntry: Invitation_Response__c.Response__c.getDescribe().getPicklistValues()){
        picklistValues.add(picklistEntry.getValue());
       }
       return picklistValues;
    }
    // Submit Invitation Response
    @AuraEnabled
    public static Boolean submitResponse(Id InvitationId, String Name, String Email, String Phone, String Response, String additionalGuests, String additionalComment){
        try{
            if(InvitationId != null){
               Invitation_Response__c responseRecord = new Invitation_Response__c(
                    Invitation__c = InvitationId,
                    Name__c = Name,
                    Email__c = Email, 
                    Phone__c = Phone,
                    Response__c = Response,
                    Number_of_additional_Guests__c = Decimal.valueOf(additionalGuests),
                    Additional_comments__c = additionalComment
                );
                insert responseRecord;
                return true;
            }
            return false;
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}

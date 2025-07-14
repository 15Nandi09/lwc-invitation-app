import { LightningElement, wire} from 'lwc';
import getInvitationAddress from '@salesforce/apex/InvitationController.getInvitationAddress'
export default class InvitationAddress extends LightningElement {
    recordId ='a00d200000qiBWUAA2'
    addressDetails={}
    connectedCallback(){
        let invitationid = new URL(location.href).searchParams.get('invitationid')
        if(invitationid){
            this.recordId = invitationid
        }
    }
    @wire(getInvitationAddress, {Id:'$recordId'})
    addressHandler({data, error}){
        if(data){
            console.log("addressHandler data", JSON.stringify(data))
            this.addressDetails = data
        }
        if(error){
            console.error("addressHandler error", error)
        }
    }
}
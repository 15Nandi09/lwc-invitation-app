import { LightningElement, wire } from 'lwc';
import getProgramDetailsByInvitationId from '@salesforce/apex/InvitationController.getProgramDetailsByInvitationId'
export default class InvitationProgramDetails extends LightningElement {
    recordId='a00d200000qiBWUAA2'
    programList=[]

    connectedCallback(){
        let invitationid = new URL(location.href).searchParams.get('invitationid')
        if(invitationid){
            this.recordId = invitationid
        }
    }
    
    @wire(getProgramDetailsByInvitationId, {Id:'$recordId'})
    programDetailsHandler({data, error}){
        if(data){
            console.log("programList", data)
            this.programList = data
        }
        if(error){
            console.error("Error in programDetailsHandler", error)
        }
    }
}
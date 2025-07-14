import { LightningElement, wire } from 'lwc';
import marriageInvitationAssets from '@salesforce/resourceUrl/marriageInvitationAssets'
import getInvitationDetailsById from '@salesforce/apex/InvitationController.getInvitationDetailsById'
import CONFETTI from '@salesforce/resourceUrl/confetti'
import {loadScript} from 'lightning/platformResourceLoader'
export default class InvitationBanner extends LightningElement {
    theme = 'theme1'
    recordId ='a00d200000qiBWUAA2'
    invitationDetails={}
    isconfettiLoaded = false
    facebookUrl=''
    twitterUrl=''
    instagramUrl=''
    
    connectedCallback(){
        let invitationid = new URL(location.href).searchParams.get('invitationid')
        if(invitationid){
            this.recordId = invitationid
        }
    }
     //countdown properties
    intervalId 
    days = 0
    hours = 0
    minutes = 0
    seconds = 0


    // Paths to the static resources
    instagramImage = marriageInvitationAssets+'/instagram.svg'
    facebookImage = marriageInvitationAssets+'/facebook.svg'
    twitterImage = marriageInvitationAssets+'/twitter.svg'

     // Dynamically setting background image style for the banner
    get bannerImage(){
        let themeName = marriageInvitationAssets + `/${this.theme}.jpeg`
        return `background-image:url(${themeName})`
    }

        // Wire service to fetch invitation details by ID
    @wire(getInvitationDetailsById, {Id:'$recordId'})
    invitationDetailsHandler({data, error}){
        if(data){
            console.log("invitationDetailsHandler", JSON.stringify(data))
            this.theme = data.Theme__c
            this.invitationDetails = data
            this.facebookUrl=data.Facebook_Url__c
            this.twitterUrl=data.Twitter_Url__c
            this.instagramUrl=data.Instagram_Url__c
            this.countdownTimer(data.Event_Date_and_Time__c)
        }
        if(error){
            console.error(error)
        }
    }
    // function to start the countdown timer
    countdownTimer(targetDate){
        this.intervalId = setInterval(()=>{
            //get the current date
            const currentDate = new Date().getTime()
            const targetTime= new Date(targetDate).getTime()
            
            //calculate the difference
            const timeDifference = targetTime-currentDate
            this.days = Math.floor(timeDifference/(1000*60*60*24))
            this.hours = Math.floor(timeDifference % (1000*60*60*24) / (1000*60*60))
            this.minutes = Math.floor(timeDifference % (1000*60*60) / (1000*60))
            this.seconds = Math.floor(timeDifference % (1000*60) / 1000)

            if(timeDifference<0){
                clearInterval(this.intervalId)
                this.days = 0
                this.hours = 0
                this.minutes = 0
                this.seconds = 0
            }
        },1000)
    }

    renderedCallback(){
        //load the confetti.js script

        if(!this.isconfettiLoaded){
            loadScript(this, CONFETTI).then(()=>{
                this.isconfettiLoaded = true
                console.log("Confetti loaded")
                const jsConfetti = new JSConfetti()
                jsConfetti.addConfetti()
            }).catch (error=>{
                console.error("Error loading script",error)
            })
        }
    }
}
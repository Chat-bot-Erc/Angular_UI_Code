import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from "@angular/material/snack-bar";
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

import { UserIdleService } from 'angular-user-idle';

/**
 * Declares the WebChat property on the window object.
 */
declare global {
    interface Window {
        WebChat: any;
    }
}

window.WebChat = window.WebChat || {};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isButtonVisible = true;
    public isModelVisible = false;
    public isMinButtonVisible= false;

    @ViewChild('webchat') botWindowElement: ElementRef;

    constructor(private bnIdle: BnNgIdleService, public snackBar: MatSnackBar, private userIdle: UserIdleService) {

    }


     onMinFun() {
        this.isMinButtonVisible=true;
        var x = document.getElementById("containerDiv");
        if (x.style.display === "none") {
          x.style.display = "block";
          this.isMinButtonVisible=false;


        } else {
          x.style.display = "none";
          this.isMinButtonVisible=true;

        }
      }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }





        stop() {
            this.userIdle.stopTimer();
        }

        stopWatching() {
            this.userIdle.stopWatching();
        }

        startWatching() {
            this.userIdle.startWatching();
        }

        restart() {
            this.userIdle.resetTimer();
        }

        public async ngOnInit() {

             //code for dynamically changing the proverb
             window.setInterval(function() { reloadIFrame()}, 180000); // 180 seconds * 1000 milliSeconds

            function reloadIFrame() {
                var loc = "https://webapigetproverb.azurewebsites.net/api/getproverb";
                document.getElementById('myIframe').setAttribute('src', loc);
            }

            //code for session time out
            this.bnIdle.startWatching(180).subscribe((res) => {

                if (res) {  this.openSnackBar('Your session will expire in next 2 minutes', '');
                    }


            })



            {
                //Start watching for user inactivity.
               this.userIdle.startWatching();

                // Start watching when user idle is starting.

                this.userIdle.onTimerStart().subscribe(count => console.log(count));


                // Start watch when time is up.
                this.userIdle.onTimeout().subscribe((res) => {

                    if (res) {
                        this.openSnackBar('Your session is expired', '');
                        this.bnIdle.stopTimer();
                        location.reload();
                    }


                });

            }



           // this.isButtonVisible = false;

            this.isModelVisible = true;


            const styleOptions = {
                bubbleBackground: '#E6E6FA',
                    bubbleFromUserBackground: '#F5F5F5',
                    bubbleTextColor: '#1C1C1BFF',
                    bubbleFromUserTextColor: '#1C1C1BFF',
                    suggestedActionBackground: 'DDA0DD',
                    suggestedActionBorderColor: '#F5F5F5', // defaults to accent
                    backgroundColor: "Accent",

                 };

                const styleSet = window.WebChat.createStyleSet({
        primaryFont: "'Comic Sans MS', 'Arial', sans-serif",
        bubbleBackground: '#E6E6FA',
        bubbleFromUserBackground: '#F5F5F5',
        bubbleTextColor: '#1C1C1BFF',
        bubbleBorderRadius:15,
        bubbleFromUserBorderRadius:15,
        bubbleFromUserTextColor: '#1C1C1BFF',
        suggestedActionBackground: 'DDA0DD',
        suggestedActionBorderColor: '#F5F5F5', // defaults to accent
        suggestedActionBorderRadius:20,
        backgroundColor: "Accent",

     });

     styleSet.root = Object.assign(
        {},
        styleSet.root,
        {
          // background: 'red',
          // cursor: 'crosshair',

          /* width */
          ' ::-webkit-scrollbar': {
            width: '5px',
            borderRadius: '10%'

          },

          /* Track */
          ' ::-webkit-scrollbar-track': {
            background: '#white'
          },

          /* Handle */
          ' ::-webkit-scrollbar-thumb': {
            background: '#BBA4D1'
          },

          /* Handle on hover */
          ' ::-webkit-scrollbar-thumb:hover': {
            background: '#8e24aa'
          }

        }
      );

      // After generated, you can modify the CSS rules
     styleSet.textContent = {
        ...styleSet.textContent,
        fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
        fontWeight: 'bold',

    }

      //  for SSmithBot
      const secret = 'NVf6_zOXS9M.sJPgUxbRV_uFPQyUAcFZ0pECOaKnPlvrd9--xGSOAko';



      const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {

        headers: {

          Authorization: `Bearer ${secret}`,

        },

        method: 'POST'

      });

      const { token } = await res.json();



      const store = window.WebChat.createStore(

        {},

        ({ dispatch }) => next => action => {

          if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {

            dispatch({

              type: 'WEB_CHAT/SEND_EVENT',

              payload: {

                name: 'webchat/join',

              }

            });

          }

          return next(action);

        }

      );



      window.WebChat.renderWebChat({

        directLine: window.WebChat.createDirectLine({ token }),

        webSpeechPonyfillFactory: await createSpeechRecognitionOnlyPonyfillFactory(),
      selectVoice: ( voices, activity ) => voices.find( ( { name } )  => /BenjaminRUS/iu.test( name) ),
        store,
        styleOptions,
          styleSet


      }, document.getElementById('webchat'));



      const a = <HTMLElement>document.querySelector('#webchat > *');

      a.focus();

        }




    onClose($event) {
        this.isModelVisible = false;
        location.reload();
     }

     SelectedTheme

     toogle:boolean=false;
minimize= {height:'2.5rem',position:'fixed',bottom:0,overflow:'hidden'}
  maximize={height:'100vh'}


  onMinimize($event) {
     this.isModelVisible = false;
     location.reload();
     }





    }

    async function createSpeechRecognitionOnlyPonyfillFactory() {

        const speechServicesPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory(
          {
            credentials:  {

              region: 'WestUS',

              subscriptionKey: '84ef57380ecb45a6a3ab211758697630'}
          });

        return options => {
          const speechServicesPonyfill = speechServicesPonyfillFactory(options);
          return {
            SpeechGrammarList: speechServicesPonyfill.SpeechGrammarList,

            SpeechRecognition: speechServicesPonyfill.SpeechRecognition,

            speechSynthesis: speechServicesPonyfill.speechSynthesis,

            SpeechSynthesisUtterance: speechServicesPonyfill.SpeechSynthesisUtterance
          };
        };
      }


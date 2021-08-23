

const app = new Vue({

  el: '#app',
  data:{
    user:{
      name: 'Nome utente',
      avatar: '_io'
    },
    contacts: [
    {
      name: 'Michele',
      avatar: '_1',
      visible: true,
      messages: [
        {
          date: '10/01/2020 15:30:55',
          text: 'Hai portato a spasso il cane?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          text: 'Ricordati di dargli da mangiare',
          status: 'sent'
        },
        {
          date: '10/01/2020 16:15:22',
          text: 'Tutto fatto!',
          status: 'received'
        }
      ],
    },
    {
      name: 'Fabio',
      avatar: '_2',
      visible: true,
      messages: [
        {
          date: '20/03/2020 16:30:00',
          text: 'Ciao come stai?',
          status: 'sent'
        },
        {
          date: '20/03/2020 16:30:55',
          text: 'Bene grazie! Stasera ci vediamo?',
          status: 'received'
        },
        {
          date: '20/03/2020 16:35:00',
          text: 'Mi piacerebbe ma devo andare a fare la spesa.',
          status: 'sent'
        }
      ],
    },

    {
      name: 'Samuele',
      avatar: '_3',
      visible: true,
      messages: [
        {
          date: '28/03/2020 10:10:40',
          text: 'La Marianna va in campagna',
          status: 'received'
        },
        {
          date: '28/03/2020 10:20:10',
          text: 'Sicuro di non aver sbagliato chat?',
          status: 'sent'
        },
        {
          date: '28/03/2020 16:15:22',
          text: 'Ah scusa!',
          status: 'received'
        }
      ],
    },
    {
      name: 'Luisa',
      avatar: '_4',
      visible: true,
      messages: [
        {
          date: '10/01/2020 15:30:55',
          text: 'Lo sai che ha aperto una nuova pizzeria?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          text: 'Si, ma preferirei andare al cinema',
          status: 'received'
        }
      ],
    },
  ],
  contactActive: 0,
  contactMessage:'',
  risposte: ['Va bene','non ci penso neanche!!','Per chi mi prendi?!?!?','ooook!!!','NO!!','Questa casa non è un albergo!']


  },
  methods:{

    // funzione chiamata da @keyup-enter
    // il messaggio è trimmato da v-model-trim
    sentMessage(){

      // controllo l'esistenza del messaggio che deve essere lungo > 0
      if(this.contactMessage.length > 0){
        // richiamo la funzione dedicata a pushare il messaggio
        this.pushMessage(this.contactMessage, 'sent');
        this.contactMessage = '';

        // invio il bot
        setTimeout(()=>{
          let risp = this.risposte[Math.floor(Math.random() * this.risposte.length-1)+1]
          this.pushMessage(risp, 'received');
        },1000);
      }

    },
    pushMessage(text, status){
      this.contacts[this.contactActive].messages.push({
        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        text: text,
        status: status
      });
    },
    lastAccess(index){
      // in base all'indice trovo la data dell'ultimo messaggio
      let contactMsgs  =  this.contacts[index].messages;
      return contactMsgs[contactMsgs.length-1].date;
    },
    lastMessage(index){
      // in base all'indice trovo la data dell'ultimo messaggio
      let contactMsgs  =  this.contacts[index].messages;
      // se il messaggio è più lungo di 30 caratteri
      if(contactMsgs[contactMsgs.length-1].text.length > 30){
        // tronco il messaggio al trentesimo carattere con uno slice(0,30)
        // e concateno i puntini
        // eseguo il return della strimga generata
        let splicedMsg = contactMsgs[contactMsgs.length-1].text.slice(0, 30) + "...";
        return splicedMsg;
      }
      // questo return verrà eseguito solo se la condizione dell'if non è valida
      return contactMsgs[contactMsgs.length-1].text;
    },

    searchContact(){
      let newContacts = this.contacts.filter((object) => {

          if(!object.name.toLowerCase().includes(this.strSearch.toLowerCase())){

              return object.visible = false
          }else{
              return object.visible = true
          }
          
              
      
      })
  }

  },
  mounted(){

    
  }
});


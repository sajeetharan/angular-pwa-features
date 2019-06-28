export class NetworkStatus {

   offline:boolean;

   constructor() {
    this.offline = !navigator.onLine;
    /*
     functions to listen if the internet connection is online
     or offline and change the behavior of classes that extend
     networkstatus
    */
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));  
   }

   onNetworkStatusChange() {
    this.offline = !navigator.onLine;   
   }

}
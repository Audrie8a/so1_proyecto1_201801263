import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor( private socket: Socket ) {}

  getTop(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('top', (data: any) => {
          observer.next(data);
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
  
  getData(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('data', (data: any) => {
          observer.next(data);
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
  
  getCircle1(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('circle1', (data: any) => {
          observer.next(data);
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
  
  getCircle2(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('circle2', (data: any) => {
          observer.next(data);
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
  
  redis1(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('redis', (data: any[]) => {
          observer.next(data.slice(0, 5));
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
  
  redis2(): Observable<any> {
    return new Observable( observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado');
        });

        this.socket.on('redis', (data: any[]) => {
          observer.next(data);
        });
        
        this.socket.on('disconnect', () => {
          observer.complete();
        });
        
        this.socket.on('error', (e: any) => {
          observer.error(e);
        });
        
        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });
        
      } catch (error) {
        observer.error(error);
      }
    });
  }
}

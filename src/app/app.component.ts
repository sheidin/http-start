import { Response } from '@angular/http';
import { ServerService } from './server.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this._serverService.getAppName();
  constructor(private _serverService: ServerService) {}
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
  onSave() {
    this._serverService.storeServers(this.servers)
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onGet() {
    this._serverService.getServers()
    .subscribe(
      (servers: any[]) => {
        this.servers = servers;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Task } from './taskclass';
import { TASKS } from './mock-tasks';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private taskUrl = 'http://localhost:8080/task';

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  getMockTasks(): Observable<Task[]> {
    this.messageService.add('Mock tasks fetched');
    return of (TASKS);
  }

  getRealTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  getRealTasksForStatus(status: string): Observable<Task[]> {
    const url = `${this.taskUrl}/${status}`;
    return this.http.get<Task[]>(url);
  }

  updateTask (task: Task | number): Observable<any> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.taskUrl}/${id}`;
    return this.http.put(url, task, httpOptions);
  }

  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, httpOptions);
  }

  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.taskUrl}/${id}`;
    return this.http.delete<Task>(url, httpOptions);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}

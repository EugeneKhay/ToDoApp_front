import { Component, OnInit } from '@angular/core';
import { Task } from '../taskclass';
import { TaskService} from '../task.service';


@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.css']
})
export class InprogressComponent implements OnInit {

  tasks: Task[];

  counter = 0;

  
  onSelect(task1: Task) {
      if (this.counter > 2) this.counter = 0;
      const states = [
        'IN_PROGRESS', 'DELAYED', 'DONE'
      ]
      task1.status = states[this.counter];  
      this.counter++;
      this.save(task1);
  }

  getTasks(): void {
    this.taskService.getRealTasksForStatus('IN_PROGRESS')
    .subscribe(tasks => this.tasks = tasks);
  }

  // getTasks(): void {
  //   this.taskService.getMockTasks()
  //   .subscribe(tasks => this.tasks = tasks);
  // }

  save(task: Task): void {
    this.taskService.updateTask(task)
    .subscribe(() => console.log('saved'));
  }

  add(): void {
    this.taskService.addTask({ name } as unknown as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

}

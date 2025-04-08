import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, IEmployee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeService = inject(EmployeeService);
  router = inject(Router);

  employeeList: IEmployee[] = [];

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: IEmployee[]) => {
        this.employeeList = response;
      }
    });
  }

  onEdit(employeeId: number) {
    this.router.navigateByUrl('/edit-employee/' + employeeId);
  }

}

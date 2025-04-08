import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee, IDepartment, IDesignation } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  employeeObj: Employee = new Employee();

  employeeService = inject(EmployeeService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  deptList$: Observable<IDepartment[]> = new Observable<IDepartment[]>();
  designationList$: Observable<IDesignation[]> = new Observable<IDesignation[]>();

  constructor() {
    this.deptList$ = this.employeeService.getAllDepartments();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.employeeObj.employeeId = params['id'];
        this.getEmployeeById();
      }
    });
  }

  formatDateToYMD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSaveEmployee() {
    this.employeeService.createNewEmployee(this.employeeObj).subscribe({
      next: (response: Employee) => {
        console.log('Employee created successfully', response);
      },
      error: (error) => {
        console.error('Error creating employee', error);
      }
    });
  }

  getDesignation() {
    this.designationList$ = this.employeeService.getDesignationByDeptId(this.employeeObj.departmentId);
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.employeeObj.employeeId).subscribe({
      next: (response: Employee) => {
        this.employeeObj = response;
        this.employeeObj.dateOfJoining = this.formatDateToYMD(this.employeeObj.dateOfJoining);
        this.getDesignation();
      },
      error: (error) => {
        console.log("Error in getting employee", error);
      }
    })
  }

  onUpdateEmployee() {
    this.employeeService.updateEmployee(this.employeeObj).subscribe({
      next: (response: Employee) => {
        console.log('Employee updated successfully', response);
        this.router.navigateByUrl('/employee-list');
      },
      error:(err) => {
        console.error('Error updating employee', err);
      }
    });
  }
}

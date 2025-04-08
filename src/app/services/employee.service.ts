import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, IDepartment, IDesignation, IEmployee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string = 'https://api.freeprojectapi.com/api/EmployeeApp/';

  constructor(private _http: HttpClient) { }

  createNewEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>(this.apiUrl + 'CreateEmployee', employee);
  }

  getAllDepartments(): Observable<IDepartment[]> {
    return this._http.get<IDepartment[]>(this.apiUrl + 'GetDepartments');
  }

  getDesignationByDeptId(deptId: number): Observable<IDesignation[]> {
    return this._http.get<IDesignation[]>(this.apiUrl + 'GetDesignationsByDeptId?deptId='+deptId);
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this._http.get<IEmployee[]>(this.apiUrl + 'GetEmployees');
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this._http.get<Employee>(this.apiUrl + employeeId);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this._http.put<Employee>(this.apiUrl + 'UpdateEmployee?id='+employee.employeeId, employee);
  }
}

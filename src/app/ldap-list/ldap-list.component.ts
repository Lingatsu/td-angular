import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLdap } from '../models/user-ldap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
MatSlideToggleChange

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'],
})
export class LdapListComponent implements OnInit {
unactiveSelected: any;
unactiveChanged($event: MatSlideToggleChange) : void{
  this.unactiveSelected = $event.checked;
  this.getUsers();
}

displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
dataSource = new MatTableDataSource<UserLdap>([]);

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor() {
    this.paginator = null;
  }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
  }
  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }
  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private getUsers() : void {
    if (this.unactiveSelected) {
      this.dataSource.data = LDAP_USERS.filter (user => !user.active); // parenthèse a ajouter ?
    }
    else {
      this.dataSource.data = LDAP_USERS;
    }
  }
}
function user(value: UserLdap, index: number, array: UserLdap[]): value is UserLdap {
  throw new Error('Function not implemented.');
}


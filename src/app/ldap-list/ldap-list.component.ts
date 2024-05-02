import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLdap } from '../models/user-ldap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
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

  constructor(private usersService: UsersService, private router: Router) {
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
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter (user => user.active === false);
        }
        else {
          this.dataSource.data = users;
        }
      }
    )
  }
}
function user(value: UserLdap, index: number, array: UserLdap[]): value is UserLdap {
  throw new Error('Function not implemented.');
}


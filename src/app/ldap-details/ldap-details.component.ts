import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { UserLdap } from '../models/user-ldap';
import { UsersService } from '../service/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ldap-details',
  templateUrl: './ldap-details.component.html',
  styleUrls: ['./ldap-details.component.css']
})
export class LdapDetailsComponent implements OnInit {
  user: UserLdap | undefined;
  processLoadRunning : boolean = false;
  processValidateRunning : boolean = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void{
    this.getUser();

  }
  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    // console.log("getUser= " + login);

    if (login === null) {
      console.error("Can't retrieve user id from URL");
      return;
    }

    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log('LdapDetails getUsers ='  + user);
      }
    );
  }

  goToLdap() : void {
    this.router.navigate(['users/list']).then( (e : boolean) : void => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  onSubmitForm() : void {
    // validation des données, à voir plus tard
  }
  updateLogin() : void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("L'objet 'login' du formulaire n'existe pas");
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }
  updateMail(): void {
    const control = this.userForm.get('mail');
    if (control === null){
      console.error("L'objet 'mail' du formulaire n'existe pas");
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }
  isFormValid(): boolean {return false;}

  private formGetValue(name: string): string {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet '" + name + "' du formulaire n'existe pas");
      return "";
    }
    return control.value
  }

  userForm : FormGroup = this.fb.group({
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }),
    mail: {value:'', disabled: true},
  });

}

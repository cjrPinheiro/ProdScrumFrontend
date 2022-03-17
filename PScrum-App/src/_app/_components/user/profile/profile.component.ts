import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/_helpers/validatorField';
import { UserExisting } from '@app/_models/Identity/userExisting';
import { AccountService } from '@app/_services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  userUpdate = {} as UserExisting;
  public get f(){
    return this.form.controls;
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toatr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validate();
    this.loadUser();
  }

  public validate(): void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password','confirmPassword')
    }
    this.form = this.fb.group({
      userName: [''],
      firstName: ['NotInformed',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: [null,[Validators.minLength(4),Validators.nullValidator]],
      confirmPassword:[null, [Validators.nullValidator]],
      phoneNumber:['',Validators.required],
      function:['',Validators.required],
      description:['',Validators.required],
    },formOptions);

  }
  onSubmit(): void{
    this.updateProfile();
  }

  public clearForm(event: any): void{
    event.preventDefault();
    this.form.reset();
  }

  private loadUser(): void{
  this.spinner.show();

    this.accountService.getUser().subscribe(
      (userResponse: UserExisting) => {
        this.userUpdate = userResponse;
        this.form.patchValue(this.userUpdate);
        this.toatr.success('User loaded', 'Success');
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.toatr.error('User not loaded', 'Error');
        this.router.navigate(['/dashboard']);
      }
      ).add(this.always());

    }

    public updateProfile(): void{
      this.userUpdate = { ...this.form.value };
      this.spinner.show();

      this.accountService.updateUser(this.userUpdate).subscribe(
        () => {
          this.toatr.success('User updated!', 'Success'),
          this.spinner.hide();
          this.clearPasswords();
        },
        (err) => {
          this.toatr.error(err.err),
          console.error(err);
          this.spinner.hide();
        }
        )
      }

      clearPasswords(): void{
        this.form.controls.password!.reset();
        this.form.controls.confirmPassword!.reset();
      }

      always():void {
        //this.spinner.hide();
      }
    }

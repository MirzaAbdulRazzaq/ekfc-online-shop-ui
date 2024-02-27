import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;

  userDetails: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });

    if (this.tokenService.GetToken()) {
      this.getUserDetails();
    }
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.tokenService.SetToken(data.token);
        this.modalService.dismissAll();
        this.getUserDetails();
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  logout() {
    this.tokenService.DeleteToken();
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDetails = this.tokenService.GetPayload();
    this.router.navigate(['/home']);
  }
}

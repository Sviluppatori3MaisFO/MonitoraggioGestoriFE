import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {AccountInfo, EventMessage, EventType, InteractionStatus, RedirectRequest} from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import {NgxSpinnerService} from 'ngx-spinner';
import {resolve} from '@angular/compiler-cli';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  account: AccountInfo | null = null;
  loginDisplay = false;
  tokenExpiration: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {

  }

  public init() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();

        if (!this.loginDisplay) {
          this.spinner.show();
          this.login();
        } else {
          this.spinner.hide();
        }

        //user info
        this.getUserInfoFromIdToken()

      });

    // Used for storing and displaying token expiration
    this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)).subscribe(msg => {
      this.tokenExpiration=  (msg.payload as any).expiresOn;
      localStorage.setItem('tokenExpiration', this.tokenExpiration);
    });
  }



  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  // If the user is logged in, present the user with a "logged in" experience
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  // Log the user in and redirect them if MSAL provides a redirect URI otherwise go to the default URI
  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  // Log the user out
  logout() {
    this.authService.logoutRedirect();
  }

  getUserInfoFromIdToken(): any {
    const account = this.authService.instance.getActiveAccount() || this.authService.instance.getAllAccounts()[0];

    if (!account || !account.idTokenClaims) {
      return null;
    }
    this.account = account;
  }

}

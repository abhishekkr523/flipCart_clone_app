import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SellerService } from "./services/seller.service";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private sellerService: SellerService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isBrowser) {
      return true;
    }
    if (localStorage.getItem('seller')) {
      return true;
    }
    return this.sellerService.isSellerLoggedIn.pipe(
      take(1),
      map((isLoggedIn) => isLoggedIn ? true : this.router.createUrlTree(['/seller']))
    );
  }
}

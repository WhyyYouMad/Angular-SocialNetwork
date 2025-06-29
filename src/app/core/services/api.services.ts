import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../enviroments/enviroment';

@Injectable(
  {providedIn: 'root'}
)
export class ApiService {
  private readonly api = `${environment.apiUrl}`

  constructor(
    private http: HttpClient,
  ) {}

  post<T>(url: string, body: any) {
    console.log(url, body)

    return this.http.post<T>(`${this.api}${url}`, body);
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.api}${url}`);
  }

  // login(request: AuthModel): Observable<User> {
  //   return of<UserInfo>({
  //     token: '123456789',
  //     user: {
  //       name: 'Илья',
  //       email: 'qweqweqweqw',
  //       role: ['User']
  //     }
  //   }).pipe(
  //     tap(response => {
  //       this.tokenStorage.saveToken(response.token);
  //       this.tokenStorage.saveUser(response.user);
  //       this.userInfo$.next(response.user);
  //     }),
  //     map(response => response.user),
  //     shareReplay(1)
  //   );
  //
  //   // return this.http.post<UserInfo>(`${this.api}/login`, request)
  //   //   .pipe(
  //   //     tap(response => {
  //   //       this.tokenStorage.saveToken(response.token);
  //   //       this.tokenStorage.saveUser(response.user);
  //   //       this.userInfo$.next(response.user);
  //   //     }),
  //   //     map(response => response.user),
  //   //     shareReplay(1)
  //   //   );
  // }
  //
  // registration(request: AuthModel): Observable<any> {
  //   return this.http.post(`${this.api}/register`, request)
  //     .pipe(
  //       tap(),
  //       shareReplay(1)
  //     )
  // }
  //
  // logout() {
  //   this.tokenStorage.clear();
  // }
  //
  // isLoggedIn() {
  //   return !!this.tokenStorage.getToken();
  // }
  //
  // getCurrentUser(): Observable<User | null> {
  //   return this.userInfo$.asObservable();
  // }
}

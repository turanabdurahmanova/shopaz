import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtnLoaderComponent } from './components/btn-loader/btn-loader.component';
import { ErrorWrapperComponent } from './components/error-wrapper/error-wrapper.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { DemoMaterialModule } from './material-module';
import { BoardComponent } from './pages/board/board.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateTaskModalComponent } from './pages/modals/create-task-modal/create-task-modal.component';
import { UpdateTaskModalComponent } from './pages/modals/update-task-modal/update-task-modal.component';
import { UserCreateModalComponent } from './pages/modals/user-create-modal/user-create-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginComponent,
    LoadingComponent,
    ErrorWrapperComponent,
    CreateTaskModalComponent,
    UserCreateModalComponent,
    UpdateTaskModalComponent,
    BtnLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { BtnLoaderService } from 'src/app/services/btn-loader.service';

@Component({
  selector: 'btn-loader',
  templateUrl: './btn-loader.component.html',
  styleUrls: ['./btn-loader.component.scss'],
})
export class BtnLoaderComponent implements OnInit {
  loading: boolean = false;
  constructor(private btnLoaderService: BtnLoaderService) {}
  ngOnInit(): void {
    this.btnLoaderService.loadingValue().subscribe((res) => {
      this.loading = res;
    });
  }
}

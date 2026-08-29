import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface InfoPageLink {
  label: string;
  routerLink: string;
}

export interface InfoPageData {
  title: string;
  paragraphs?: string[];
  links?: InfoPageLink[];
}

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss'
})
export class InfoPageComponent implements OnInit {
  title = '';
  paragraphs: string[] = [];
  links: InfoPageLink[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data as InfoPageData;
    this.title = data.title;
    this.paragraphs = data.paragraphs || [];
    this.links = data.links || [];
  }
}

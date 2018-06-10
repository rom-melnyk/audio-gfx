import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node-general',
  templateUrl: './node-general.component.html',
  styleUrls: ['./node-general.component.scss']
})
export class NodeGeneralComponent implements OnInit {
  @Input() isLast = false;
  @Input() type = '';

  constructor() { }

  ngOnInit() {
  }

}

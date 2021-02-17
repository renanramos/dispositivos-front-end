import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal";
import { DeviceFormComponent } from "src/app/device/device-form/device-form.component";

@Component({
  selector: "app-add-button",
  templateUrl: "./add-button.component.html",
  styleUrls: ["./add-button.component.css"],
})
export class AddButtonComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  addNewDevice() {
    this.modalService.show(DeviceFormComponent, {
      id: 1,
      animated: true,
      ignoreBackdropClick: true,
    });
  }
}

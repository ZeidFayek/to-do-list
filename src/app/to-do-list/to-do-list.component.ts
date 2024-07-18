import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ToDoListComponent implements OnInit {
  constructor(private _Router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  itemsContainer: string[] = [];
  itemsContent: boolean = false;

  inputItems: FormGroup = new FormGroup({
    inputItem: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    if (localStorage.getItem("items") != null) {
      const items = localStorage.getItem("items");
      this.itemsContainer = items ? JSON.parse(items) : [];
      this.itemsContent = true;
    }
    else{
      this.itemsContent = false;
    }
  }

  addItemToLost() {
    const inputValue = this.inputItems.get('inputItem')?.value;
    this.itemsContainer.push(inputValue);
    localStorage.setItem("items", JSON.stringify(this.itemsContainer));
    this.inputItems.get('inputItem')?.reset();   // Clear the input
    this.itemsContent = true;
  }
  deleteItemFromList(index: number) {
    this.itemsContainer.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(this.itemsContainer));
    if (localStorage.getItem("items") == null) {
      this.itemsContent = false;
    }
  }
  clearListItems() {

    localStorage.removeItem("items");
    this.itemsContainer = [];
    this.itemsContent = false;
  }
  logout() {
    localStorage.removeItem('userEmail');
    this._Router.navigate(['/login']);
  }
  confirm() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.clearListItems();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

}
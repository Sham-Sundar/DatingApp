import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditedMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy{
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent){
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  private accountService = inject(AccountService);

  protected editedMember: EditedMember ={
    displayName: '',
    description: '',
    city: '',
    country: ''
  };
  
  ngOnInit(): void {
    this.editedMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
    }
  }
  
  updateProfile(){
    if (!this.memberService.member()) return;
    const updatedMember = { ...this.memberService.member(), ...this.editedMember}
    this.memberService.updateMember(this.editedMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName !== currentUser.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success('Profile updated successfully');
        this.memberService.isEditMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.memberService.isEditMode()){
      this.memberService.isEditMode.set(false);
    }
  }
}
